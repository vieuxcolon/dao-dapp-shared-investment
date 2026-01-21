# ----------------------------
# Stage 1: Builder
# ----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy only package files first (for caching)
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY backend/ ./

# Build TypeScript
RUN npm run build   # assumes you have "build" script in backend/package.json

# ----------------------------
# Stage 2: Runtime
# ----------------------------
FROM node:22-alpine

WORKDIR /app

# Copy built backend from builder
COPY --from=builder /app/dist ./dist

# Copy package.json & package-lock.json for running
COPY backend/package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose backend port (update as needed)
EXPOSE 4000

# Default command
CMD ["node", "dist/index.js"]  # replace index.js with your main file
