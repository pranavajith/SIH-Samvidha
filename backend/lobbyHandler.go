package main

import (
	"encoding/json"
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

	messageContent, err := json.Marshal(newLobby)
	if err != nil {
		log.Println("Error marshalling new lobby:", err)
		return

	}

	// Send lobby information back to the client
	socketMessage := SocketMessage{
		MessageType:    "LobbyInfo",
		MessageContent: messageContent,
		LobbyID:        newLobby.LobbyID,
		Username:       username,
	}
	if err := conn.WriteJSON(socketMessage); err != nil {
		log.Println("Error sending lobby info:", err)
	}
	fmt.Println("Created lobby with ID: ", lobbyID)
}

func (s *Server) ShowLobbies(conn *websocket.Conn) {
	lobbies := make([]Lobby, 0)

	s.mutex.Lock()
	for _, lobby := range s.lobbies {
		if lobby.Status == LobbyStatusSearching {
			lobbies = append(lobbies, lobby)
		}
	}
	s.mutex.Unlock()

	messageContent, err := json.Marshal(lobbies)
	if err != nil {
		log.Println("Error marshalling lobbies:", err)
		return
	}

	socketMessage := SocketMessage{
		MessageType:    "LobbyListUpdate",
		MessageContent: messageContent,
	}

	if err := conn.WriteJSON(socketMessage); err != nil {
		log.Println("Error sending lobby list update:", err)
	}
}
func (s *Server) ShowLobbiesToAllClients() {
	lobbies := make([]Lobby, 0)

	s.mutex.Lock()
	for _, lobby := range s.lobbies {
		if lobby.Status == LobbyStatusSearching {
			lobbies = append(lobbies, lobby)
		}
	}
	s.mutex.Unlock()

	messageContent, err := json.Marshal(lobbies)
	if err != nil {
		log.Println("Error marshalling lobbies:", err)
		return
	}

	socketMessage := SocketMessage{
		MessageType:    "LobbyListUpdate",
		MessageContent: messageContent,
	}

	for conn := range s.activeConnections {
		if err := conn.WriteJSON(socketMessage); err != nil {
			log.Println("Error sending lobby list update to connection:", err)
		}
	}
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

		// Marshal the question into JSON bytes
		questionJSON, err := json.Marshal(question)
		if err != nil {
			// Handle the error, perhaps log it or send an error response
			log.Println("Error marshaling question:", err)
			return
		}

		socketMessage := SocketMessage{
			MessageType:    "QuestionUpdate",
			MessageContent: json.RawMessage(questionJSON), // Now assign the marshaled question JSON
			LobbyID:        lobby.LobbyID,
		}

		// Send the current question to all players in the lobby
		for _, player := range lobby.Players {
			if player.WebSocket != nil {
				err := player.WebSocket.WriteJSON(socketMessage) // Send the current question
				if err != nil {
					// Handle any errors in sending the message
					log.Println("Error sending question to player:", err)
				}
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

	messageContent, err := json.Marshal(scoreUpdate)
	if err != nil {
		log.Println("Error marshalling score update:", err)
		return
	}

	socketMessage := SocketMessage{
		MessageType:    "ScoreUpdate",
		MessageContent: json.RawMessage(messageContent),
		LobbyID:        lobbyID,
		Username:       username,
	}

	if err := conn.WriteJSON(socketMessage); err != nil {
		log.Println("Error sending score update:", err)
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
