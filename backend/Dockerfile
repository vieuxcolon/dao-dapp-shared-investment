# =========================
# Backend Dockerfile
# =========================
FROM node:22-alpine

WORKDIR /app

# Copy package.json and package-lock.json if exists
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Build TypeScript backend
RUN npm run build

EXPOSE 4000
CMD ["node", "dist/main.js"]
