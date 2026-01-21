# ----------------------------
# Stage 1: Builder
# ----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy only package files first for caching
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY frontend/ ./

# Build the frontend
RUN npm run build

# ----------------------------
# Stage 2: Nginx
# ----------------------------
FROM nginx:alpine

# Copy the built frontend from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY infra/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
