package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

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

type LevelInfo struct {
}

type Server struct {
	serverAddress string
	users         []User
	levelInfoList []LevelInfo
	serverMutex   sync.Mutex
}

func NewServer(ServerAddress string) *Server {
	return &Server{
		serverAddress: ServerAddress,
		users:         []User{},
		levelInfoList: []LevelInfo{},
	}
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

	s.serverMutex.Lock()
	defer s.serverMutex.Unlock()
	a, _ := HashPassword(requestData.Password)
	fmt.Println("Temphash2: ", a, " and the pwd is '", requestData.Password, "'")
	// fmt.Println("The request username is ", requestData.Username, " and the request password is ", requestData.Password, " the hash of which is ", a)
	for _, user := range s.users {
		fmt.Println("Checking for user: ", user.FirstName, ". Their username is ", user.Username, ", and their hashed password is ", user.PasswordHash)
		if user.Username == requestData.Username && CheckPasswordHash(requestData.Password, user.PasswordHash) {
			// Return user data (excluding password hash)
			userData := User{
				FirstName:       user.FirstName,
				LastName:        user.LastName,
				Username:        user.Username,
				Email:           user.Email,
				DOB:             user.DOB,
				CompletedLevels: user.CompletedLevels,
				HighScore:       user.HighScore,
			}
			userJSON, _ := json.Marshal(userData)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			w.Write(userJSON)
			return
		}
	}

	// If no user was found or password didn't match
	http.Error(w, "Invalid username or password zzz", http.StatusUnauthorized)
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
	s.serverMutex.Lock()
	defer s.serverMutex.Unlock()

	usersJSON, err := json.Marshal(s.users)
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
	s.serverMutex.Lock()
	defer s.serverMutex.Unlock()

	var requestData struct {
		Username string `json:"username"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	for _, user := range s.users {
		if user.Username == requestData.Username {
			userData, err := json.Marshal(user)
			if err != nil {
				http.Error(w, "Failed to encode user data", http.StatusInternalServerError)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			w.Write(userData)
			return
		}
	}

	http.Error(w, "User not found", http.StatusNotFound)
}

// HashPassword hashes the given password using bcrypt
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// CheckPasswordHash compares the hashed password with the plain text password
func CheckPasswordHash(password, hash string) bool {
	// fmt.Println("Here is password", password)
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Handle adding a new user
func (s *Server) handleAddUser(w http.ResponseWriter, r *http.Request) {
	// Parse the request body into UserRequest struct
	var newUserReq UserRequest
	if err := json.NewDecoder(r.Body).Decode(&newUserReq); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Validate that the username is unique
	for _, user := range s.users {
		if user.Username == newUserReq.Username {
			http.Error(w, "Username already exists", http.StatusConflict)
			return
		}
	}

	// Parse DOB from string to time.Time
	dob, err := time.Parse("2006-01-02", newUserReq.DOB) // Assuming DOB is in YYYY-MM-DD format
	if err != nil {
		http.Error(w, "Invalid DOB format, should be YYYY-MM-DD", http.StatusBadRequest)
		return
	}

	// Hash the password before storing
	passwordHash, err := HashPassword(newUserReq.Password)
	fmt.Println("Temphash1: ", passwordHash, " and the pwd is '", newUserReq.Password, "'")
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

	// Add new user to the server's user list (thread-safe)
	s.serverMutex.Lock()
	s.users = append(s.users, newUser)
	s.serverMutex.Unlock()

	// Respond with success message
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User added successfully"))
}

// Handle modifying an existing user
func (s *Server) handleModifyUser(w http.ResponseWriter, r *http.Request) {
	// Parse the request body into UserRequest struct
	var modifyUserReq UserRequest
	if err := json.NewDecoder(r.Body).Decode(&modifyUserReq); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	s.serverMutex.Lock()
	defer s.serverMutex.Unlock()

	// Search for the user to modify by username
	var foundUser *User
	for i, user := range s.users {
		if user.Username == modifyUserReq.Username {
			foundUser = &s.users[i]
			break
		}
	}

	if foundUser == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Update fields if provided
	if modifyUserReq.FirstName != "" {
		foundUser.FirstName = modifyUserReq.FirstName
	}
	if modifyUserReq.LastName != "" {
		foundUser.LastName = modifyUserReq.LastName
	}
	if modifyUserReq.Email != "" {
		foundUser.Email = modifyUserReq.Email
	}
	if modifyUserReq.DOB != "" {
		// Parse DOB from string to time.Time
		dob, err := time.Parse("2006-01-02", modifyUserReq.DOB) // Expecting YYYY-MM-DD format
		if err != nil {
			http.Error(w, "Invalid DOB format, should be YYYY-MM-DD", http.StatusBadRequest)
			return
		}
		foundUser.DOB = dob
	}
	if len(modifyUserReq.CompletedLevels) > 0 {
		foundUser.CompletedLevels = modifyUserReq.CompletedLevels
	}
	if modifyUserReq.HighScore > 0 {
		foundUser.HighScore = modifyUserReq.HighScore
	}
	// If a new password is provided, hash it before updating
	if modifyUserReq.Password != "" {
		passwordHash, err := HashPassword(modifyUserReq.Password)
		if err != nil {
			http.Error(w, "Failed to hash password", http.StatusInternalServerError)
			return
		}
		foundUser.PasswordHash = passwordHash
	}

	// Respond with success message
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User modified successfully"))
}
