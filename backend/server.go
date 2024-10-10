package main

import (
	"context"
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
		serverAddress: serverAddress,
		lobbies:       make(map[string]Lobby),
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
	http.HandleFunc("/create", s.createLobbyHandler)
	http.HandleFunc("/join", s.joinLobbyHandler)
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

// WebSocket upgrade and connection handling
func (s *Server) handleWebSocketConnection(w http.ResponseWriter, r *http.Request) {
	// Upgrade the connection
	conn, err := websocket.Upgrade(w, r, nil, 0, 0) // Use 0 for default buffer sizes
	if err != nil {
		log.Println("Failed to upgrade connection:", err)
		return
	}
	defer conn.Close()

	// This is just an example. You would want to implement a loop to read messages from the client.
	for {
		var msg struct {
			LobbyID string `json:"lobbyId"`
			UserID  string `json:"userId"`
			Answer  string `json:"answer"`
			Start   int64  `json:"start"` // Unix time of when the question was sent
		}
		if err := conn.ReadJSON(&msg); err != nil {
			log.Println("Failed to read message:", err)
			break
		}

		// Handle the answer
		startTime := time.Unix(msg.Start, 0)
		s.handleAnswer(msg.LobbyID, msg.UserID, msg.Answer, startTime)
	}
}
