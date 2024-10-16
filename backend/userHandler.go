package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

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
		Badges:           user.Badges,
		LongestStreak:    user.LongestStreak,
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
			s.handleModifyUser(w, r)
		} else if path == "/user/change-password" {
			s.handleChangePassword(w, r)
		} else if path == "/user/streak-update" {
			s.UserStreakUpdate(w, r)
		} else {
			http.Error(w, "Invalid POST path", http.StatusNotFound)
		}
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// Retrieve a single user by username
func (s *Server) handleGetUser(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")
	if username == "" {
		http.Error(w, "Username query parameter is missing", http.StatusBadRequest)
		return
	}
	s.mutex.Lock()
	defer s.mutex.Unlock()

	var user User
	err := s.usersCollection.FindOne(context.TODO(), bson.M{"username": username}).Decode(&user)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

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
		Badges:           user.Badges,
		LongestStreak:    user.LongestStreak,
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
		Badges:           newUserReq.Badges,
		LongestStreak:    newUserReq.LongestStreak,
	}

	_, err = s.usersCollection.InsertOne(context.TODO(), newUser)
	if err != nil {
		http.Error(w, "Failed to add user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User added successfully"))
}

func (s *Server) UserModifier(modifyUserReq UserRequest) {
	s.mutex.Lock()
	defer s.mutex.Unlock()

	var user User
	fmt.Println("searching for user")
	err := s.usersCollection.FindOne(context.TODO(), bson.M{"username": modifyUserReq.Username}).Decode(&user)
	if err != nil {
		fmt.Println("user not found")
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
			fmt.Println("DOB issue. Wrong formatting")
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
	if modifyUserReq.Badges != nil {
		user.Badges = modifyUserReq.Badges
	}
	if modifyUserReq.LongestStreak > user.LongestStreak {
		user.LongestStreak = modifyUserReq.LongestStreak
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
		fmt.Println("Falied to update user")
		return
	}

}

// Modify an existing user (for general updates without password change)
func (s *Server) handleModifyUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handleModifyUser has been touched")
	var modifyUserReq UserRequest
	if err := json.NewDecoder(r.Body).Decode(&modifyUserReq); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
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

func (s *Server) UserScoreUpdate(scoreUpdateReq ScoreUpdateData) error {
	s.mutex.Lock()
	defer s.mutex.Unlock()

	var user User
	fmt.Println("Searching for user to update score...")

	// Find the user by username
	err := s.usersCollection.FindOne(context.TODO(), bson.M{"username": scoreUpdateReq.Username}).Decode(&user)
	if err != nil {
		fmt.Println("User not found")
		return err // Return the error
	}
	fmt.Println("User found, updating multiplayer score")

	// Update the multiplayer score by adding the diff
	user.MultiPlayerScore += scoreUpdateReq.Diff

	// Store the updated user data in the database
	_, err = s.usersCollection.UpdateOne(context.TODO(), bson.M{"username": scoreUpdateReq.Username}, bson.M{"$set": user})
	if err != nil {
		fmt.Println("Failed to update user's multiplayer score")
		return err // Return the error
	}

	fmt.Printf("User %s's multiplayer score updated by %d, new score: %d\n", scoreUpdateReq.Username, scoreUpdateReq.Diff, user.MultiPlayerScore)
	return nil // Return nil if successful
}

func (s *Server) UserStreakUpdate(w http.ResponseWriter, r *http.Request) {
	// Step 1: Parse the request body to get the username
	var requestData struct {
		Username string `json:"username"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Update the streak for the user
	err := s.UpdateStreak(requestData.Username)
	if err != nil {
		http.Error(w, "Failed to update streak", http.StatusInternalServerError)
		return
	}

	// Send a success response
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Streak updated successfully"))
}

func (s *Server) UpdateStreak(username string) error {

	// Step 2: Retrieve the user from the database
	s.mutex.Lock()
	defer s.mutex.Unlock()

	var user User
	err := s.usersCollection.FindOne(context.TODO(), bson.M{"username": username}).Decode(&user)
	if err != nil {
		fmt.Println("User not found")
		return err
	}

	// Step 3: Get current time (today's date)
	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location())

	// Step 4: Check if the LatestPlayed date is today or yesterday
	latestPlayedDate := user.StreakData.LatestPlayed
	latestPlayed := time.Date(latestPlayedDate.Year(), latestPlayedDate.Month(), latestPlayedDate.Day(), 0, 0, 0, 0, latestPlayedDate.Location())

	// Calculate "yesterday"
	yesterday := today.AddDate(0, 0, -1)

	// Step 5: Update the streak logic
	if latestPlayed.Equal(today) || latestPlayed.Equal(yesterday) {
		// If LatestPlayed is today or yesterday, update it to today
		user.StreakData.LatestPlayed = today
	} else {
		// If not, reset the streak by setting both LatestPlayed and LatestStreakStartDate to today
		user.StreakData.LatestPlayed = today
		user.StreakData.LatestStreakStartDate = today
	}

	// also set user.LongestStreak to the maximum of the current streak and the longest streak
	currentStreak := int(today.Sub(user.StreakData.LatestStreakStartDate).Hours()/24) + 1
	if currentStreak > user.LongestStreak {
		user.LongestStreak = currentStreak
	}

	// Step 6: Update the user document in the database with the new streak data
	_, err = s.usersCollection.UpdateOne(context.TODO(), bson.M{"username": username}, bson.M{
		"$set": bson.M{
			"streakData.latestPlayed":          user.StreakData.LatestPlayed,
			"streakData.latestStreakStartDate": user.StreakData.LatestStreakStartDate,
		},
	})
	if err != nil {
		fmt.Println("Failed to update streak data")
		return err
	}
	return nil
}
