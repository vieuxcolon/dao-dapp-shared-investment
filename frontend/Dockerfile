# =========================
# Frontend Dockerfile
# =========================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package.json (and package-lock.json if it exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build frontend
RUN npm run build

# ----------------------------
# Stage 2: Nginx to serve the built frontend
# ----------------------------
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy optional nginx config if exists
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

