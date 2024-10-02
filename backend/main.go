package main

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// Load the .env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Check if environment variables are being loaded correctly
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Fatal("MONGO_URI is not set")
	}

	// Create a new server
	server := NewServer(":8080")

	// Connect to MongoDB
	if err := server.ConnectMongoDB(); err != nil {
		log.Fatal(err)
	}
	defer server.mongoClient.Disconnect(context.TODO())

	// Run the server
	server.Run()
}
