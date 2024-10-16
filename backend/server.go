package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func NewServer(serverAddress string) *Server {
	return &Server{
		serverAddress:     serverAddress,
		lobbies:           make(map[string]Lobby),
		activeConnections: make(map[*websocket.Conn]bool),
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
	http.HandleFunc("/ws", s.handleWebSocketConnection)
	http.HandleFunc("/user/login", s.corsMiddleware(s.userLoginHandler))
	http.HandleFunc("/users", s.corsMiddleware(s.usersHandler))
	http.HandleFunc("/user/", s.corsMiddleware(s.userHandler))
	http.HandleFunc("/user", s.corsMiddleware(s.userHandler))

	fmt.Println("Server running at", s.serverAddress)
	log.Fatal(http.ListenAndServe(s.serverAddress, nil))
}

// CORS middleware
func (s *Server) corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*") // Change '*' to a specific origin if needed
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		w.Header().Set("Access-Control-Max-Age", "86400") // Cache preflight response for 24 hours

		// Handle preflight (OPTIONS) requests
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Call the next handler
		next(w, r)
	}
}

func (s *Server) handleWebSocketConnection(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")
	if username == "" {
		http.Error(w, "Username is required", http.StatusBadRequest)
		return
	}
	// Upgrade the connection
	conn, err := websocket.Upgrade(w, r, nil, 0, 0) // Use 0 for default buffer sizes
	if err != nil {
		log.Println("Failed to upgrade connection:", err)
		return
	}
	defer conn.Close()

	// Add the connection to the activeConnections map
	s.mutex.Lock()
	s.activeConnections[conn] = true
	s.mutex.Unlock()

	defer func() {
		// Remove the connection from the activeConnections map
		s.mutex.Lock()
		delete(s.activeConnections, conn)
		s.mutex.Unlock()
	}()

	fmt.Println("User", username, "connected to the server")

	for {
		var msg SocketMessage
		if err := conn.ReadJSON(&msg); err != nil {
			log.Println("Failed to read message:", err)
			break
		}

		switch msg.MessageType {
		case "CreateLobby":
			var lobbyReq struct {
				GameType     string     `json:"gameType"`
				QuestionList []Question `json:"questionList"`
			}
			if err := json.Unmarshal(msg.MessageContent, &lobbyReq); err != nil {
				log.Println("Failed to parse lobby creation message:", err)
				break
			}

			// Call create lobby function
			s.createLobby(username, lobbyReq.GameType, lobbyReq.QuestionList, conn)

		case "JoinLobby":
			var joinReq struct {
				LobbyID string `json:"lobbyId"`
			}
			if err := json.Unmarshal(msg.MessageContent, &joinReq); err != nil {
				log.Println("Failed to parse join lobby message:", err)
				break
			}

			// Call join lobby function
			s.joinLobby(username, joinReq.LobbyID, conn)

		case "ShowLobbies":
			s.ShowLobbies(conn)

		// Add more message types as needed
		case "SubmitAnswer":
			var answerReq struct {
				LobbyID   string `json:"lobbyId"`
				Answer    string `json:"answer"`
				StartTime int64  `json:"startTime"`
			}
			if err := json.Unmarshal(msg.MessageContent, &answerReq); err != nil {
				log.Println("Failed to parse submit answer message:", err)
				break
			}

			// Convert StartTime from int64 to time.Time
			startTime := time.Unix(answerReq.StartTime, 0)

			// Call submit answer function
			s.submitAnswer(answerReq.LobbyID, username, answerReq.Answer, startTime)
		case "Dummy":
			// conn.WriteJSON("lol")
			fmt.Println("Got Dummy.")
		}
	}
}
