package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/gorilla/websocket"
)

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

	s.ShowLobbiesToAllClients()

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

	s.ShowLobbiesToAllClients()

	// send a message to the conn connection that they have been added to the lobby. the message content must be lobby details, and the message type must be LobbyJoined
	messageContent, err := json.Marshal(lobby)
	if err != nil {
		log.Println("Error marshalling lobby details:", err)
		return
	}

	socketMessage := SocketMessage{
		MessageType:    "LobbyJoined",
		MessageContent: messageContent,
		LobbyID:        lobbyID,
	}

	for _, player := range lobby.Players {
		if player.WebSocket != nil {
			fmt.Println("Sending lobby joined message to player:", player.Username)
			if err := player.WebSocket.WriteJSON(socketMessage); err != nil {
				log.Println("Error sending lobby joined message to player:", err)
			}
		}
	}

	fmt.Println("User", username, " joined lobby ", lobbyID)

	// Check if we can start the game
	if len(lobby.Players) == 2 && lobby.GameType == "FlashCards" {
		s.startGame(&lobby) // Start the game
	}
}

// Start the game and send the first question
func (s *Server) startGame(lobby *Lobby) {
	fmt.Println("Game associated with lobby", lobby.LobbyID, "has started")
	// Notify all players of the first question
	// s.sendQuestionToPlayers(lobby)

	// Start a goroutine to handle the game questions
	go s.handleQuestions(lobby)
}

// Send the current question to all players
func (s *Server) sendQuestionToPlayers(lobby *Lobby) {
	fmt.Println("Handling question number: ", lobby.CurrentQuestion, " for lobby ", lobby.LobbyID)
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

		s.lobbies[lobby.LobbyID] = *lobby
		lobby.CurrentQuestion++
		if lobby.CurrentQuestion >= len(lobby.QuestionList) {
			break
		}
	}
	// set a delay of 10 seconds before endgame is called
	time.Sleep(10 * time.Second)

	s.endGame(lobby)
}

// Handle player answers
func (s *Server) submitAnswer(lobbyID string, username string, answer string, startTime time.Time) {
	s.mutex.Lock()
	lobby, exists := s.lobbies[lobbyID]

	s.mutex.Unlock()
	// fmt.Println("Reached 1")
	fmt.Println(lobbyID)

	fmt.Println(exists)
	fmt.Println(lobby.Status)

	if !exists || lobby.Status != LobbyStatusActive {
		return
	}
	// fmt.Println("Reached 2")

	currentQuestion := lobby.QuestionList[lobby.CurrentQuestion]
	fmt.Println(currentQuestion.Question)
	fmt.Println(lobby.CurrentQuestion)
	correctAnswer := false

	// Check if the answer is correct
	for _, option := range currentQuestion.Options {
		// fmt.Println("Option value: ", option.Value, ", Value Status: ", option.CorrectStatus, ", Answer: ", answer)
		if option.Value == answer && option.CorrectStatus {
			correctAnswer = true
			break
		}
	}
	// fmt.Println("Reached 3")

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
	// fmt.Println("Reached 4")

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
	// fmt.Println("Reached 5")
	// Print in fmt the current score of all players in the lobby
	for player, score := range lobby.PlayerScores {
		fmt.Printf("Player: %s, Score: %d\n", player, score)
	}
	// fmt.Println("Reached 6")

	socketMessage := SocketMessage{
		MessageType:    "ScoreUpdate",
		MessageContent: json.RawMessage(messageContent),
		LobbyID:        lobbyID,
		Username:       username,
	}

	// send socketMessage to every player in the lobby
	for _, player := range lobby.Players {
		if player.WebSocket != nil {
			if err := player.WebSocket.WriteJSON(socketMessage); err != nil {
				log.Println("Error sending score update to player:", err)
			}
		}
	}

	fmt.Println("User", username, "submitted answer:", answer, "for lobby", lobbyID)
}

// End the game and update scores
func (s *Server) endGame(lobby *Lobby) {

	socketMessage := SocketMessage{
		MessageType: "EndGame",
	}

	// send socketMessage to every player in the lobby
	for _, player := range lobby.Players {
		if player.WebSocket != nil {
			if err := player.WebSocket.WriteJSON(socketMessage); err != nil {
				log.Println("Error sending score update to player:", err)
			}
		}
	}
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

	for userID, score := range lobby.PlayerScores {
		diff := score // The points to be added to the user's multiplayer score

		// Prepare the score update data
		scoreUpdateData := ScoreUpdateData{
			Username: userID,
			Diff:     diff,
		}

		// Update the user's multiplayer score in the database
		s.UserScoreUpdate(scoreUpdateData)
	}
	s.mutex.Lock()
	s.lobbies[lobby.LobbyID] = *lobby
	s.mutex.Unlock()
}
