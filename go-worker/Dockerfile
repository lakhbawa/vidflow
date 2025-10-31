# ---------- Stage 1: Build ----------
FROM golang:1.22 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum first for caching
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the Go binary (static)
RUN CGO_ENABLED=0 GOOS=linux go build -o vidflow-worker ./main.go

# ---------- Stage 2: Runtime ----------
FROM debian:bookworm-slim

# Install ffmpeg (since worker will execute video processing)
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy the compiled binary from builder
COPY --from=builder /app/vidflow-worker .

# Expose nothing — this is a background job runner
# EXPOSE (none)

# Set environment variables
ENV REDIS_URL=redis:6379
ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/vidflow
ENV FFMPEG_PATH=/usr/bin/ffmpeg

# Default command
CMD ["./vidflow-worker"]
