package queue

import (
	"context"
	"database/sql"
	"fmt"
	"go-worker/internal/database"
	"go-worker/internal/services"
	"log"
	"time"

	"github.com/redis/go-redis/v9"
)

func ReadQueue(ctx context.Context, db database.Service, redisURL string) {
	rdb := redis.NewClient(&redis.Options{
		Addr:         redisURL,
		DialTimeout:  10 * time.Second,
		ReadTimeout:  0, // ✅ CRITICAL: Set to 0 to disable read timeout
		WriteTimeout: 10 * time.Second,
	})

	defer func() {
		if err := rdb.Close(); err != nil {
			log.Printf("Error closing Redis connection: %v", err)
		}
		fmt.Println("Redis connection closed")
	}()

	streamName := "conversions"
	groupName := "vidflow-workers"
	consumerName := "consumer-1"

	// Create consumer group if not exists
	_, err := rdb.XGroupCreateMkStream(ctx, streamName, groupName, "0").Result()
	if err != nil && err.Error() != "BUSYGROUP Consumer Group name already exists" {
		log.Fatalf("Error creating consumer group: %v", err)
	}

	log.Printf("Worker started - Group: %s, Consumer: %s", groupName, consumerName)

	for {
		select {
		case <-ctx.Done():
			fmt.Println("Queue reader received shutdown signal")
			return
		default:
			streams, err := rdb.XReadGroup(ctx, &redis.XReadGroupArgs{
				Group:    groupName,
				Consumer: consumerName,
				Streams:  []string{streamName, ">"},
				Count:    10,
				Block:    5 * time.Second,
			}).Result()

			if err != nil {
				if err == redis.Nil {
					// No messages available - completely normal
					continue
				}
				// Only log actual errors (shouldn't see timeouts anymore)
				log.Printf("Error reading from stream: %v", err)
				time.Sleep(1 * time.Second)
				continue
			}

			for _, stream := range streams {
				for _, message := range stream.Messages {
					if err := processMessage(ctx, db, rdb, streamName, groupName, message); err != nil {
						log.Printf("Error processing message %s: %v", message.ID, err)
						continue
					}
				}
			}
		}
	}
}

func processMessage(ctx context.Context, db database.Service, rdb *redis.Client, streamName, groupName string, message redis.XMessage) error {
	fmt.Printf("Processing message ID: %s, Values: %v\n", message.ID, message.Values)

	// TODO: Add your actual message processing logic here
	now := time.Now()

	conversionID, _ := message.Values["conversion_id"].(string)
	originalFilePath, ok := message.Values["original_path"].(string)
	if !ok {
		return fmt.Errorf("missing conversion_id in stream message")
	}
	finalFilePath, ok := message.Values["final_path"].(string)
	if !ok {
		return fmt.Errorf("missing conversion_id in stream message")
	}

	update := conversionUpdate{
		Status:      "completed",
		FinalPath:   &finalFilePath,
		ConvertedAt: &now,
	}

	conversionError := services.ConvertToMP3(originalFilePath, finalFilePath)
	if conversionError != nil {
		return fmt.Errorf("conversion failed: %w", conversionError)
	} else {
		fmt.Println("Conversion successful")
	}
	err := updateConversion(ctx, db.DB(), conversionID, update)
	if err != nil {
		return fmt.Errorf("failed to run db query: %w", err)
	}
	time.Sleep(100 * time.Millisecond)

	// Acknowledge the message
	ackCount, err := rdb.XAck(ctx, streamName, groupName, message.ID).Result()
	if err != nil {
		return fmt.Errorf("failed to acknowledge message: %w", err)
	}

	if ackCount == 0 {
		log.Printf("Warning: message %s was not acknowledged (already acked?)", message.ID)
	}

	fmt.Printf("Successfully processed and acknowledged message: %s\n", message.ID)
	return nil
}

type conversionUpdate struct {
	Status      string
	FinalPath   *string // Use pointer for optional fields
	ConvertedAt *time.Time
}

func updateConversion(ctx context.Context, db *sql.DB, conversionID string, update conversionUpdate) error {
	fmt.Println("Running query")
	query := `
		UPDATE conversions 
		SET 
			status = $1,
			final_path = COALESCE($2, final_path),
			converted_at = COALESCE($3, converted_at)
		WHERE id = $4
	`

	result, err := db.ExecContext(ctx, query,
		update.Status,
		update.FinalPath,
		update.ConvertedAt,
		conversionID,
	)
	if err != nil {
		return fmt.Errorf("failed to update conversion: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("conversion with ID %s not found", conversionID)
	}

	return nil
}
