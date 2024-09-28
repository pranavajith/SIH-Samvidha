package main

import (
	"context"
	"log"
)

// Main function
func main() {
	server := NewServer(":3000")

	if err := server.ConnectMongoDB(); err != nil {
		log.Fatal(err)
	}
	defer server.mongoClient.Disconnect(context.TODO())

	server.Run()
}
