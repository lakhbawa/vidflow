# ---------- Stage 1: Build ----------
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Copy go.mod first
COPY go.mod ./

# Download dependencies (this will create go.sum)
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -v -o ./vidflow-worker ./main.go

# Verify build succeeded
RUN ls -la && ls -la vidflow-worker

# ---------- Stage 2: Runtime ----------
FROM debian:bookworm-slim

# Install ca-certificates
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/vidflow-worker ./vidflow-worker

# Ensure executable permissions
RUN chmod +x vidflow-worker

# Verify the binary is there
RUN ls -la

# Set environment variables
ENV REDIS_URL=redis:6379
ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/vidflow

# Run the application
CMD ["./vidflow-worker"]