# Backend Dockerfile
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy backend source
COPY . .

# Expose backend port
EXPOSE 4000

# Start the backend
CMD ["npm", "run", "start"]
