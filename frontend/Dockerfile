# =======================================================
# Frontend Dockerfile (Vite + React + Nginx)
# =======================================================

# ---------- Stage 1: Build ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build frontend
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine AS frontend

# Copy built frontend from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY ./infra/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
