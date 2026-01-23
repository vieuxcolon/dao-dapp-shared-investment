# ----------------------------
# Stage 1: Build
# ----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first for caching
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY backend/ ./

# Compile TypeScript
RUN npm run build

# ----------------------------
# Stage 2: Production runtime
# ----------------------------
FROM node:22-alpine

WORKDIR /app

# Copy compiled backend and node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Copy package.json for runtime scripts (optional)
COPY backend/package*.json ./

# Expose backend port
EXPOSE 4000

# Start the backend
CMD ["node", "dist/main.js"]
