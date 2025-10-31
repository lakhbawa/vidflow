FROM golang:1.22-alpine AS builder

WORKDIR /app


COPY go.mod ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -v -o ./vidflow-worker ./main.go

RUN ls -la && ls -la vidflow-worker

FROM debian:bookworm-slim

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