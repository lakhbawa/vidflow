# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the Next.js app for production
RUN npm run build

# ---------- Stage 2: Runtime ----------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the necessary build output & dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./

# Environment variables (can be overridden by docker-compose/.env)
ENV NODE_ENV=dev
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "start"]
