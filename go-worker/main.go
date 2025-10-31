package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	fmt.Println("Vidflow worker is starting...")

	redisURL := os.Getenv("REDIS_URL")
	dbURL := os.Getenv("DATABASE_URL")
	
	fmt.Printf("Redis URL: %s\n", redisURL)
	fmt.Printf("Database URL: %s\n", dbURL)

	// Creating context that listens for shutdown signals
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	fmt.Println("Worker is running. Press Ctrl+C to stop.")

	// Keeping it running until shutdown signal
	<-ctx.Done()
	
	fmt.Println("Shutting down gracefully...")
	time.Sleep(1 * time.Second) // time for cleanup
	fmt.Println("Worker stopped.")
}