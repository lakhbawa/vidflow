# ---------- Stage 1: Build ----------
FROM golang:1.25-bookworm AS builder

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .

# Build Go binary (static if you want)
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -v -o vidflow-worker ./cmd/api/main.go


# ---------- Stage 2: Runtime ----------
FROM debian:bookworm-slim

# Install ffmpeg + certificates
# (bookworm-slim has ffmpeg in repos)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg \
    ca-certificates \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/vidflow-worker ./vidflow-worker
RUN chmod +x vidflow-worker


CMD ["./vidflow-worker"]
