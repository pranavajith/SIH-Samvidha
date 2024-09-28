package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	// "sync"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

type UserRequest struct {
	FirstName       string           `json:"firstName"`
	LastName        string           `json:"lastName"`
	Username        string           `json:"username"`
	Email           string           `json:"email"`
	DOB             string           `json:"dob"`             // Expecting DOB as a string in JSON
	CompletedLevels []CompletedLevel `json:"completedLevels"` // List of completed levels
	HighScore       int              `json:"highScore"`
	Password        string           `json:"password"` // Plain text password in the request
}

type CompletedLevel struct {
	LevelID int
	Score   int
}

type User struct {
	FirstName       string           `json:"firstName"`
	LastName        string           `json:"lastName"`
	Username        string           `json:"username"`
	Email           string           `json:"email"`
	DOB             time.Time        `json:"dob"`
	CompletedLevels []CompletedLevel `json:"completedLevels"`
	HighScore       int              `json:"highScore"`
	ImageUrl        string           `json:"imageUrl"`
	PasswordHash    string           `json:"-"` // Do not expose password hash in JSON responses
}

type Server struct {
	serverAddress   string
	mongoClient     *mongo.Client
	usersCollection *mongo.Collection
}

func NewServer(serverAddress string) *Server {
	return &Server{
		serverAddress: serverAddress,
	}
}

func (s *Server) ConnectMongoDB() error {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return err
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return err
	}

	s.mongoClient = client
	s.usersCollection = client.Database("game").Collection("users")
	return nil
}

func (s *Server) Run() {
	http.HandleFunc("/user/login", s.corsMiddleware(s.userLoginHandler))
	http.HandleFunc("/users", s.corsMiddleware(s.usersHandler))
	http.HandleFunc("/user/", s.corsMiddleware(s.userHandler))

	fmt.Println("Server running at localhost", s.serverAddress)
	log.Fatal(http.ListenAndServe(s.serverAddress, nil))
}

// corsMiddleware adds CORS headers to responses
func (s *Server) corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*") // Allow all origins
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func (s *Server) userLoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var requestData struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	// Decode request body
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	var user User
	err := s.usersCollection.FindOne(context.TODO(), bson.M{"username": requestData.Username}).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	if !CheckPasswordHash(requestData.Password, user.PasswordHash) {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// Return user data (excluding password hash)
	user.PasswordHash = "" // Remove password hash from response
	userJSON, _ := json.Marshal(user)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(userJSON)
}

func (s *Server) usersHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		s.handleGetUsers(w)
	default:
		http.Error(w, "Method not catered to", http.StatusMethodNotAllowed)
	}
}

func (s *Server) handleGetUsers(w http.ResponseWriter) {
	cursor, err := s.usersCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		http.Error(w, "Failed to retrieve users", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.TODO())

	var users []User
	if err = cursor.All(context.TODO(), &users); err != nil {
		http.Error(w, "Failed to decode users list", http.StatusInternalServerError)
		return
	}

	usersJSON, err := json.Marshal(users)
	if err != nil {
		http.Error(w, "Failed to marshal users list", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(usersJSON)
}

func (s *Server) userHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		s.handleGetUser(w, r)
	case "POST":
		path := r.URL.Path

		if path == "/user/add" {
			s.handleAddUser(w, r)
		} else if path == "/user/modify" {
			s.handleModifyUser(w, r)
		} else {
			http.Error(w, "Invalid POST path (Not Add or Modify)", http.StatusNotFound)
		}
	default:
		http.Error(w, "Method not catered to", http.StatusMethodNotAllowed)
	}
}

func (s *Server) handleGetUser(w http.ResponseWriter, r *http.Request) {
	var requestData struct {
		Username string `json:"username"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var user User
	err := s.usersCollection.FindOne(context.TODO(), bson.M{"username": requestData.Username}).Decode(&user)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	user.PasswordHash = "" // Remove password hash from response
	userData, err := json.Marshal(user)
	if err != nil {
		http.Error(w, "Failed to encode user data", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(userData)
}

// HashPassword hashes the given password using bcrypt
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// CheckPasswordHash compares the hashed password with the plain text password
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Handle adding a new user
func (s *Server) handleAddUser(w http.ResponseWriter, r *http.Request) {
	var newUserReq UserRequest
	if err := json.NewDecoder(r.Body).Decode(&newUserReq); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Validate that the username is unique
	count, err := s.usersCollection.CountDocuments(context.TODO(), bson.M{"username": newUserReq.Username})
	if err != nil {
		http.Error(w, "Error checking username uniqueness", http.StatusInternalServerError)
		return
	}
	if count > 0 {
		http.Error(w, "Username already exists", http.StatusConflict)
		return
	}

	// Parse DOB from string to time.Time
	dob, err := time.Parse("2006-01-02", newUserReq.DOB) // Assuming DOB is in YYYY-MM-DD format
	if err != nil {
		http.Error(w, "Invalid DOB format, should be YYYY-MM-DD", http.StatusBadRequest)
		return
	}

	// Hash the password before storing
	passwordHash, err := HashPassword(newUserReq.Password)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	// Create a new User instance
	newUser := User{
		FirstName:       newUserReq.FirstName,
		LastName:        newUserReq.LastName,
		Username:        newUserReq.Username,
		Email:           newUserReq.Email,
		DOB:             dob,
		CompletedLevels: newUserReq.CompletedLevels,
		HighScore:       newUserReq.HighScore,
		PasswordHash:    passwordHash, // Store hashed password
	}

	// Add new user to the MongoDB
	_, err = s.usersCollection.InsertOne(context.TODO(), newUser)
	if err != nil {
		http.Error(w, "Failed to add user", http.StatusInternalServerError)
		return
	}

	// Respond with success message
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User added successfully"))
}

// Handle modifying an existing user
func (s *Server) handleModifyUser(w http.ResponseWriter, r *http.Request) {
	var modifyUserReq UserRequest
	if err := json.NewDecoder(r.Body).Decode(&modifyUserReq); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Search for the user to modify by username
	var user User
	err := s.usersCollection.FindOne(context.TODO(), bson.M{"username": modifyUserReq.Username}).Decode(&user)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Update fields if provided
	if modifyUserReq.FirstName != "" {
		user.FirstName = modifyUserReq.FirstName
	}
	if modifyUserReq.LastName != "" {
		user.LastName = modifyUserReq.LastName
	}
	if modifyUserReq.Email != "" {
		user.Email = modifyUserReq.Email
	}
	if modifyUserReq.DOB != "" {
		// Parse DOB from string to time.Time
		dob, err := time.Parse("2006-01-02", modifyUserReq.DOB) // Expecting YYYY-MM-DD format
		if err != nil {
			http.Error(w, "Invalid DOB format, should be YYYY-MM-DD", http.StatusBadRequest)
			return
		}
		user.DOB = dob
	}
	if len(modifyUserReq.CompletedLevels) > 0 {
		user.CompletedLevels = modifyUserReq.CompletedLevels
	}
	if modifyUserReq.HighScore > 0 {
		user.HighScore = modifyUserReq.HighScore
	}
	// If a new password is provided, hash it before updating
	if modifyUserReq.Password != "" {
		passwordHash, err := HashPassword(modifyUserReq.Password)
		if err != nil {
			http.Error(w, "Failed to hash password", http.StatusInternalServerError)
			return
		}
		user.PasswordHash = passwordHash
	}

	// Update the user in the MongoDB
	_, err = s.usersCollection.UpdateOne(context.TODO(), bson.M{"username": modifyUserReq.Username}, bson.M{"$set": user})
	if err != nil {
		http.Error(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	// Respond with success message
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User modified successfully"))
}
