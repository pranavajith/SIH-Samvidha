package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

// Define types for the User and UserRequest structures
type CompletedLevel struct {
	LevelID int `json:"levelId"`
	Score   int `json:"score"`
}

type ProfileImage struct {
	Format string `json:"format"`
	Path   string `json:"path"`
}

type StreakDataType struct {
	LatestPlayed          time.Time `json:"latestPlayed"`
	LatestStreakStartDate time.Time `json:"latestStreakStartDate"`
}

type StreakDataRequestType struct {
	LatestPlayed          string `json:"latestPlayed"`
	LatestStreakStartDate string `json:"latestStreakStartDate"`
}

type UserRequest struct {
	FirstName        string                `json:"firstName"`
	LastName         string                `json:"lastName"`
	Username         string                `json:"username"`
	Email            string                `json:"email"`
	DOB              string                `json:"dob"`
	CompletedLevels  []CompletedLevel      `json:"completedLevels"`
	MultiPlayerScore int                   `json:"multiPlayerScore"`
	Password         string                `json:"password"`
	StreakData       StreakDataRequestType `json:"streakData"`
	UserProfileImage ProfileImage          `json:"userProfileImage"`
	OngoingLevel     float64               `json:"ongoingLevel"`
}

type User struct {
	FirstName        string           `json:"firstName"`
	LastName         string           `json:"lastName"`
	Username         string           `json:"username"`
	Email            string           `json:"email"`
	DOB              time.Time        `json:"dob"`
	CompletedLevels  []CompletedLevel `json:"completedLevels"`
	OngoingLevel     float64          `json:"ongoingLevel"`
	MultiPlayerScore int              `json:"multiPlayerScore"`
	PasswordHash     string           `json:"-"` // password is excluded from JSON
	StreakData       StreakDataType   `json:"streakData"`
	UserProfileImage ProfileImage     `json:"userProfileImage"`
}

type Server struct {
	serverAddress   string
	mongoClient     *mongo.Client
	usersCollection *mongo.Collection
	mutex           sync.Mutex // Add a mutex for concurrency safety
}

func NewServer(serverAddress string) *Server {
	return &Server{
		serverAddress: serverAddress,
	}
}

// MongoDB connection setup
func (s *Server) ConnectMongoDB() error {
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		mongoURI = os.Getenv("MONGO_URI_LOCAL")
	}

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	clientOptions := options.Client().ApplyURI(mongoURI).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return err
	}

	// Test the connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return err
	}

	s.mongoClient = client
	s.usersCollection = client.Database("game").Collection("users")
	return nil
}

// Start the server
func (s *Server) Run() {
	http.HandleFunc("/user/login", s.corsMiddleware(s.userLoginHandler))
	http.HandleFunc("/users", s.corsMiddleware(s.usersHandler))
	http.HandleFunc("/user/", s.corsMiddleware(s.userHandler))

	fmt.Println("Server running at", s.serverAddress)
	log.Fatal(http.ListenAndServe(s.serverAddress, nil))
}

// CORS middleware
func (s *Server) corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

// Handle user login
func (s *Server) userLoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var requestData struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	s.mutex.Lock()
	defer s.mutex.Unlock()

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

	// Create a response struct with formatted DOB
	type UserResponse struct {
		FirstName        string           `json:"firstName"`
		LastName         string           `json:"lastName"`
		Username         string           `json:"username"`
		Email            string           `json:"email"`
		DOB              string           `json:"dob"`
		CompletedLevels  []CompletedLevel `json:"completedLevels"`
		MultiPlayerScore int              `json:"multiPlayerScore"`
		StreakData       StreakDataType   `json:"streakData"`
		UserProfileImage ProfileImage     `json:"userProfileImage"`
		OngoingLevel     float64          `json:"ongoingLevel"`
	}

	// Remove password hash before sending user info
	user.PasswordHash = ""

	// Format DOB to yyyy-mm-dd
	formattedDOB := user.DOB.Format("2006-01-02")

	userResponse := UserResponse{
		FirstName:        user.FirstName,
		LastName:         user.LastName,
		Username:         user.Username,
		Email:            user.Email,
		DOB:              formattedDOB, // Use the formatted DOB here
		CompletedLevels:  user.CompletedLevels,
		MultiPlayerScore: user.MultiPlayerScore,
		StreakData:       user.StreakData,
		UserProfileImage: user.UserProfileImage,
		OngoingLevel:     user.OngoingLevel,
	}

	userJSON, err := json.Marshal(userResponse)
	if err != nil {
		http.Error(w, "Failed to encode user data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(userJSON)
}

// Handle getting and adding users
func (s *Server) usersHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		s.handleGetUsers(w)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// Retrieve all users
func (s *Server) handleGetUsers(w http.ResponseWriter) {
	s.mutex.Lock()
	defer s.mutex.Unlock()

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

// Update the main route handler to include password change
func (s *Server) userHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		s.handleGetUser(w, r)
	case "POST":
		path := r.URL.Path
		if path == "/user/add" {
			s.handleAddUser(w, r)
		} else if path == "/user/modify" {
			fmt.Println("userHandler has been touched")
			s.handleModifyUser(w, r)
		} else if path == "/user/change-password" {
			s.handleChangePassword(w, r)
		} else {
			http.Error(w, "Invalid POST path", http.StatusNotFound)
		}
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// Retrieve a single user by username
func (s *Server) handleGetUser(w http.ResponseWriter, r *http.Request) {
	var requestData struct {
		Username string `json:"username"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	s.mutex.Lock()
	defer s.mutex.Unlock()

	var user User
	err := s.usersCollection.FindOne(context.TODO(), bson.M{"username": requestData.Username}).Decode(&user)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	user.PasswordHash = ""
	userData, err := json.Marshal(user)
	if err != nil {
		http.Error(w, "Failed to encode user data", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(userData)
}

// Hash password for storage
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// Check if a provided password matches the stored hash
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Add a new user
func (s *Server) handleAddUser(w http.ResponseWriter, r *http.Request) {
	var newUserReq UserRequest
	if err := json.NewDecoder(r.Body).Decode(&newUserReq); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	s.mutex.Lock()
	defer s.mutex.Unlock()

	count, err := s.usersCollection.CountDocuments(context.TODO(), bson.M{"username": newUserReq.Username})
	if err != nil {
		http.Error(w, "Error checking username uniqueness", http.StatusInternalServerError)
		return
	}
	if count > 0 {
		http.Error(w, "Username already exists", http.StatusConflict)
		return
	}

	dob, err := time.Parse("2006-01-02", newUserReq.DOB)
	if err != nil {
		http.Error(w, "Invalid DOB format, should be YYYY-MM-DD", http.StatusBadRequest)
		return
	}

	passwordHash, err := HashPassword(newUserReq.Password)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	// Parse streak data dates
	latestPlayed, _ := time.Parse("2006-01-02", newUserReq.StreakData.LatestPlayed)
	latestStreakStartDate, _ := time.Parse("2006-01-02", newUserReq.StreakData.LatestStreakStartDate)

	newUser := User{
		FirstName:        newUserReq.FirstName,
		LastName:         newUserReq.LastName,
		Username:         newUserReq.Username,
		Email:            newUserReq.Email,
		DOB:              dob,
		CompletedLevels:  newUserReq.CompletedLevels,
		MultiPlayerScore: newUserReq.MultiPlayerScore,
		PasswordHash:     passwordHash,
		StreakData: StreakDataType{
			LatestPlayed:          latestPlayed,
			LatestStreakStartDate: latestStreakStartDate,
		},
		UserProfileImage: newUserReq.UserProfileImage,
		OngoingLevel:     newUserReq.OngoingLevel,
	}

	_, err = s.usersCollection.InsertOne(context.TODO(), newUser)
	if err != nil {
		http.Error(w, "Failed to add user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User added successfully"))
}

// Modify an existing user (for general updates without password change)
func (s *Server) handleModifyUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handleModifyUser has been touched")
	var modifyUserReq UserRequest
	if err := json.NewDecoder(r.Body).Decode(&modifyUserReq); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	s.mutex.Lock()
	defer s.mutex.Unlock()

	var user User
	fmt.Println("searching for user")
	err := s.usersCollection.FindOne(context.TODO(), bson.M{"username": modifyUserReq.Username}).Decode(&user)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}
	fmt.Println("user found")
	// Update the profile fields (excluding password)
	if modifyUserReq.FirstName != "" {
		user.FirstName = modifyUserReq.FirstName
	}
	if modifyUserReq.LastName != "" {
		user.LastName = modifyUserReq.LastName
	}
	if modifyUserReq.Email != "" {
		user.Email = modifyUserReq.Email
	}
	if modifyUserReq.OngoingLevel > user.OngoingLevel {
		user.OngoingLevel = modifyUserReq.OngoingLevel
	}
	if modifyUserReq.DOB != "" {
		dob, err := time.Parse("2006-01-02", modifyUserReq.DOB)
		if err != nil {
			http.Error(w, "Invalid DOB format, should be YYYY-MM-DD", http.StatusBadRequest)
			return
		}

		user.DOB = dob
	}
	// fmt.Println("DOB issue")
	if len(modifyUserReq.CompletedLevels) > 0 {
		user.CompletedLevels = modifyUserReq.CompletedLevels
	}
	if modifyUserReq.MultiPlayerScore > 0 {
		user.MultiPlayerScore = modifyUserReq.MultiPlayerScore
	}

	// Parse streak data
	if modifyUserReq.StreakData.LatestPlayed != "" {
		latestPlayed, _ := time.Parse("2006-01-02", modifyUserReq.StreakData.LatestPlayed)
		user.StreakData.LatestPlayed = latestPlayed
	}
	if modifyUserReq.StreakData.LatestStreakStartDate != "" {
		latestStreakStartDate, _ := time.Parse("2006-01-02", modifyUserReq.StreakData.LatestStreakStartDate)
		user.StreakData.LatestStreakStartDate = latestStreakStartDate
	}

	if modifyUserReq.UserProfileImage.Path != "" {
		user.UserProfileImage.Path = modifyUserReq.UserProfileImage.Path
	}
	if modifyUserReq.UserProfileImage.Format != "" {
		user.UserProfileImage.Format = modifyUserReq.UserProfileImage.Format
	}

	// Update the user document in the database
	_, err = s.usersCollection.UpdateOne(context.TODO(), bson.M{"username": modifyUserReq.Username}, bson.M{"$set": user})
	if err != nil {
		http.Error(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	// fmt.Println("Updation issue")

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User modified successfully"))
}

// Change password handler
func (s *Server) handleChangePassword(w http.ResponseWriter, r *http.Request) {
	var passwordChangeReq struct {
		Username        string `json:"username"`
		CurrentPassword string `json:"currentPassword"`
		NewPassword     string `json:"newPassword"`
	}

	if err := json.NewDecoder(r.Body).Decode(&passwordChangeReq); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	s.mutex.Lock()
	defer s.mutex.Unlock()

	var user User
	err := s.usersCollection.FindOne(context.TODO(), bson.M{"username": passwordChangeReq.Username}).Decode(&user)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Check if the current password is correct
	if !CheckPasswordHash(passwordChangeReq.CurrentPassword, user.PasswordHash) {
		http.Error(w, "Current password is incorrect", http.StatusUnauthorized)
		return
	}

	// Hash the new password
	newPasswordHash, err := HashPassword(passwordChangeReq.NewPassword)
	if err != nil {
		http.Error(w, "Failed to hash new password", http.StatusInternalServerError)
		return
	}

	// Update the password in the database
	_, err = s.usersCollection.UpdateOne(context.TODO(), bson.M{"username": passwordChangeReq.Username}, bson.M{"$set": bson.M{"passwordHash": newPasswordHash}})
	if err != nil {
		http.Error(w, "Failed to update password", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Password changed successfully"))
}
