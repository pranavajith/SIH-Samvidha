package main

import (
	"encoding/json"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/mongo"
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
	Badges           []Badge               `json:"badges"`
	LongestStreak    int                   `json:"longestStreak"`
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
	Badges           []Badge          `json:"badges"`
	LongestStreak    int              `json:"longestStreak"`
}

type Badge struct {
	BadgeID          int    `json:"badgeId"`
	BadgeName        string `json:"badgeName"`
	BadgeDescription string `json:"badgeDescription"`
	BadgeImage       string `json:"badgeImage"`
}

type Server struct {
	serverAddress     string
	mongoClient       *mongo.Client
	usersCollection   *mongo.Collection
	lobbies           map[string]Lobby
	activeConnections map[*websocket.Conn]bool // Map to keep track of active WebSocket connections
	mutex             sync.Mutex               // Add a mutex for concurrency safety
}

// type Server struct {
// 	serverAddress         string
// 	mongoClient           *mongo.Client
// 	usersCollection       *mongo.Collection
// 	lobbiesCollection     *mongo.Collection
// 	connectionsCollection *mongo.Collection
// 	mutex                 sync.Mutex // Add a mutex for concurrency safety
// }

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
	Badges           []Badge          `json:"badges"`
	LongestStreak    int              `json:"longestStreak"`
}

// Define the different possible states of the lobby
type LobbyStatus string

const (
	LobbyStatusSearching LobbyStatus = "Searching"
	LobbyStatusActive    LobbyStatus = "Active"
	LobbyStatusInactive  LobbyStatus = "Inactive"
)

// Represents a single question in the game
type Question struct {
	Question string   `json:"question"`
	Options  []Option `json:"options"`
}

// Represents an option for a given question
type Option struct {
	Value         string `json:"value"`
	CorrectStatus bool   `json:"correctStatus"`
}

// Represents a player participating in a lobby
type Player struct {
	Username  string          `json:"username"` // Username for display
	Score     int             `json:"score"`    // Player's score in the game
	WebSocket *websocket.Conn // WebSocket connection for real-time updates
}

// SocketMessage represents a WebSocket message with a type and associated data
type SocketMessage struct {
	MessageType    string          `json:"messageType"`
	MessageContent json.RawMessage `json:"messageContent"`
	LobbyID        string          `json:"lobbyId"`
	Username       string          `json:"username"`
}

// Represents a game lobby
type Lobby struct {
	LobbyID         string         `json:"lobbyId"`         // Unique lobby ID
	GameType        string         `json:"gameType"`        // e.g., FlashCards
	CreatedUser     string         `json:"createdUser"`     // UserID of the user who created the lobby
	Players         []Player       `json:"players"`         // List of players in the lobby
	Status          LobbyStatus    `json:"status"`          // Searching, Active, Inactive
	QuestionList    []Question     `json:"questionList"`    // List of questions for the game
	PlayerScores    map[string]int `json:"playerScores"`    // Mapping from UserID to Score
	CurrentQuestion int            `json:"currentQuestion"` // Index of the current question being asked
}

type ScoreUpdateData struct {
	Username string
	Diff     int // The difference to add to the multiplayer score
}
