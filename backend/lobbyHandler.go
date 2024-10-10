package main

import (
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/gorilla/websocket"
)

// Generate a random lobby ID
func generateLobbyID() string {
	rand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("Lobby-%d", rand.Intn(1000000))
}

// CreateLobby creates a new lobby for the user
func (s *Server) createLobby(username, gameType string, questionList []Question, conn *websocket.Conn) {
	lobbyID := generateLobbyID()
	newLobby := Lobby{
		LobbyID:         lobbyID,
		GameType:        gameType,
		CreatedUser:     username,
		Status:          LobbyStatusSearching,
		QuestionList:    questionList,
		PlayerScores:    make(map[string]int),
		CurrentQuestion: 0,
	}

	// Add the creator to the players list
	newLobby.Players = append(newLobby.Players, Player{
		Username:  username,
		WebSocket: conn, // Assign WebSocket connection to the player
		Score:     0,
	})

	s.mutex.Lock()
	s.lobbies[lobbyID] = newLobby
	s.mutex.Unlock()

	// Send lobby information back to the client
	conn.WriteJSON(newLobby)
	fmt.Println("Created lobby with ID: ", lobbyID)
}

// JoinLobby allows a user to join an existing lobby
func (s *Server) joinLobby(username, lobbyID string, conn *websocket.Conn) {
	s.mutex.Lock()
	lobby, exists := s.lobbies[lobbyID]
	s.mutex.Unlock()

	if !exists || lobby.Status != LobbyStatusSearching {
		conn.WriteMessage(websocket.TextMessage, []byte("Lobby not found or not available"))
		return
	}

	// Add the user to the players list
	lobby.Players = append(lobby.Players, Player{
		Username:  username,
		WebSocket: conn, // Assign WebSocket connection to the player
		Score:     0,
	})

	// Update the player scores mapping
	lobby.PlayerScores[username] = 0
	lobby.Status = LobbyStatusActive

	s.mutex.Lock()
	s.lobbies[lobbyID] = lobby
	s.mutex.Unlock()

	fmt.Println("User", username, " joined lobby ", lobbyID)

	// Check if we can start the game
	if len(lobby.Players) == 2 && lobby.GameType == "FlashCards" {
		lobby.Status = LobbyStatusActive
		s.startGame(&lobby) // Start the game
	}

	// conn.WriteJSON(lobby)
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

func (s *Server) handleQuestions(lobby *Lobby) {
	for {
		time.Sleep(10 * time.Second)

		s.sendQuestionToPlayers(lobby)

		lobby.CurrentQuestion++
		if lobby.CurrentQuestion >= len(lobby.QuestionList) {
			break
		}
	}

	s.endGame(lobby)
}

// Handle player answers
func (s *Server) submitAnswer(lobbyID string, username string, answer string, startTime time.Time, conn *websocket.Conn) {
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
	lobby.PlayerScores[username] += points

	s.mutex.Lock()
	s.lobbies[lobbyID] = lobby
	s.mutex.Unlock()

	// Prepare score update message
	scoreUpdate := map[string]interface{}{
		"username": username,
		"score":    lobby.PlayerScores[username],
	}

	if err := conn.WriteJSON(scoreUpdate); err != nil {
		log.Println("Error sending score update:", err)
	}

	// // Send updated score back to the player
	// for _, player := range lobby.Players {
	// 	if player.WebSocket != nil && player.Username == username {
	// 		if err := player.WebSocket.WriteJSON(scoreUpdate); err != nil {
	// 			log.Println("Error sending score update:", err)
	// 		}
	// 	}
	// }
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
