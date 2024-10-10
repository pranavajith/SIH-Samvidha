package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"
)

// Generate a random lobby ID
func generateLobbyID() string {
	rand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("Lobby-%d", rand.Intn(1000000))
}

// HTTP handler for creating a lobby
func (s *Server) createLobbyHandler(w http.ResponseWriter, r *http.Request) {
	var lobbyReq struct {
		UserID       string     `json:"userId"`
		GameType     string     `json:"gameType"`
		QuestionList []Question `json:"questionList"`
	}

	if err := json.NewDecoder(r.Body).Decode(&lobbyReq); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	lobbyID := generateLobbyID()
	newLobby := Lobby{
		LobbyID:         lobbyID,
		GameType:        lobbyReq.GameType,
		CreatedUser:     lobbyReq.UserID,
		Status:          LobbyStatusSearching,
		QuestionList:    lobbyReq.QuestionList,
		PlayerScores:    make(map[string]int),
		CurrentQuestion: 0,
	}

	// Add the creator to the players list
	newLobby.Players = append(newLobby.Players, Player{
		UserID:   lobbyReq.UserID,
		Username: "CreatorName", // Fetch username from User object if needed
		Score:    0,
	})

	s.mutex.Lock()
	s.lobbies[newLobby.LobbyID] = newLobby
	s.mutex.Unlock()

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newLobby)
}

// HTTP handler for joining a lobby
func (s *Server) joinLobbyHandler(w http.ResponseWriter, r *http.Request) {
	var joinReq struct {
		UserID  string `json:"userId"`
		LobbyID string `json:"lobbyId"`
	}

	if err := json.NewDecoder(r.Body).Decode(&joinReq); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	s.mutex.Lock()
	lobby, exists := s.lobbies[joinReq.LobbyID]
	s.mutex.Unlock()

	if !exists || lobby.Status != LobbyStatusSearching {
		http.Error(w, "Lobby not found or not available", http.StatusNotFound)
		return
	}

	// Add the user to the players list
	lobby.Players = append(lobby.Players, Player{
		UserID:   joinReq.UserID,
		Username: "PlayerName", // Fetch username from User object if needed
		Score:    0,
	})

	// Update the player scores mapping
	lobby.PlayerScores[joinReq.UserID] = 0

	// Check if we can start the game
	if len(lobby.Players) == 2 && lobby.GameType == "FlashCards" {
		lobby.Status = LobbyStatusActive
		s.startGame(&lobby) // Start the game
	}

	s.mutex.Lock()
	s.lobbies[lobby.LobbyID] = lobby
	s.mutex.Unlock()

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(lobby)
}

// Start the game and send the first question
func (s *Server) startGame(lobby *Lobby) {
	// Notify all players of the first question
	s.sendQuestionToPlayers(lobby)

	// Start a goroutine to handle the game questions
	go s.handleQuestions(lobby)
}

// Send the current question to all players
func (s *Server) sendQuestionToPlayers(lobby *Lobby) {
	if lobby.CurrentQuestion < len(lobby.QuestionList) {
		question := lobby.QuestionList[lobby.CurrentQuestion]
		for _, player := range lobby.Players {
			if player.WebSocket != nil {
				player.WebSocket.WriteJSON(question) // Send the current question
			}
		}
	}
}

// Handle the timing of questions and player responses
func (s *Server) handleQuestions(lobby *Lobby) {
	for {
		time.Sleep(10 * time.Second) // Wait for 10 seconds for the next question

		s.sendQuestionToPlayers(lobby) // Send the current question to all players

		lobby.CurrentQuestion++
		if lobby.CurrentQuestion >= len(lobby.QuestionList) {
			break // Exit the loop when there are no more questions
		}
	}

	// Game is over, update scores and finish the lobby
	s.endGame(lobby)
}

// Handle player answers
func (s *Server) handleAnswer(lobbyID string, userID string, answer string, startTime time.Time) {
	s.mutex.Lock()
	lobby, exists := s.lobbies[lobbyID]
	s.mutex.Unlock()

	if !exists || lobby.Status != LobbyStatusActive {
		return
	}

	currentQuestion := lobby.QuestionList[lobby.CurrentQuestion]
	correctAnswer := false

	// Check if the answer is correct
	for _, option := range currentQuestion.Options {
		if option.Value == answer && option.CorrectStatus {
			correctAnswer = true
			break
		}
	}

	// Calculate score
	var points int
	elapsedTime := int(time.Since(startTime).Seconds())
	if correctAnswer {
		points = 10 - elapsedTime
	} else {
		points = -5
	}

	// Update player score
	lobby.PlayerScores[userID] += points

	s.mutex.Lock()
	s.lobbies[lobbyID] = lobby
	s.mutex.Unlock()

	// Prepare score update message
	scoreUpdate := map[string]interface{}{
		"userId": userID,
		"score":  lobby.PlayerScores[userID],
	}

	// Send updated score back to the player
	for _, player := range lobby.Players {
		if player.WebSocket != nil && player.UserID == userID {
			if err := player.WebSocket.WriteJSON(scoreUpdate); err != nil {
				log.Println("Error sending score update:", err)
			}
		}
	}
}

// End the game and update scores
func (s *Server) endGame(lobby *Lobby) {
	// Award bonus points to the winner
	var maxScore int
	var winnerID string

	for userID, score := range lobby.PlayerScores {
		if score > maxScore {
			maxScore = score
			winnerID = userID
		}
	}

	// Give bonus points to the winner
	if winnerID != "" {
		lobby.PlayerScores[winnerID] += 10
	}

	// Update the lobby status
	lobby.Status = LobbyStatusInactive

	// Update user multiplayer scores in the database (if needed)
	// UpdateUserMultiplayerScore(winnerID, lobby.PlayerScores[winnerID])
	fmt.Println("Assume we changed the user's multiplayer score in the database")

	s.mutex.Lock()
	s.lobbies[lobby.LobbyID] = *lobby
	s.mutex.Unlock()
}
