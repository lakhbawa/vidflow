package queue

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/redis/go-redis/v9"
)

func ReadQueue(ctx context.Context, redisURL string) {
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
					if err := processMessage(ctx, rdb, streamName, groupName, message); err != nil {
						log.Printf("Error processing message %s: %v", message.ID, err)
						continue
					}
				}
			}
		}
	}
}

func processMessage(ctx context.Context, rdb *redis.Client, streamName, groupName string, message redis.XMessage) error {
	fmt.Printf("Processing message ID: %s, Values: %v\n", message.ID, message.Values)

	// TODO: Add your actual message processing logic here
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
