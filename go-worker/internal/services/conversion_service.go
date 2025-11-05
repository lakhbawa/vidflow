package services

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"time"
)

func ConvertToMP3(inputFile, outputFile string) error {

	inputFile = "/app/media/" + inputFile
	outputFile = "/app/media/" + outputFile
	// Add timeout for safety (e.g., 2 minutes)
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	cmd := exec.CommandContext(ctx, "ffmpeg",
		"-i", inputFile,
		"-vn", // disable video output
		"-acodec", "mp3",
		outputFile,
	)

	// Optional: show ffmpeg logs in terminal
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	fmt.Println("Running command:", cmd.String())

	if err := cmd.Run(); err != nil {
		return fmt.Errorf("conversion failed: %w", err)
	}

	return nil
}
