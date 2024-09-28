package main

func main() {
	server := NewServer(":3000")
	server.Run()
}
