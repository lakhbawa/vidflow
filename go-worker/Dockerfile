# ---------- Stage 1: Build ----------
FROM golang:1.22-bullseye AS builder

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .

# Build the Go binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -v -o ./vidflow-worker ./main.go

# ---------- Stage 2: Runtime ----------
FROM debian:bookworm-slim

# Install ca-certificates for HTTPS / Redis
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/vidflow-worker ./vidflow-worker
RUN chmod +x vidflow-worker
RUN ls -la

ENV REDIS_URL=redis:6379
ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/vidflow

CMD ["./vidflow-worker"]
