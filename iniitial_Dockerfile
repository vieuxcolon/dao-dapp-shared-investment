# ===============================
# Dockerfile (root)
# Tooling image for DAO DApp
# - Used for one-time manual bootstrap
# - Reused safely by docker compose build
# ===============================

FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /app

# ----------------------------
# 1. System dependencies
# ----------------------------
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# ----------------------------
# 2. Node.js 22.x + npm
# ----------------------------
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@10.9.4

# ----------------------------
# 3. Install Hardhat globally
# ----------------------------
RUN npm install -g hardhat@3.1.4

# ----------------------------
# 4. Copy repo
# ----------------------------
COPY . /app

# ----------------------------
# 5. Install dependencies
# ----------------------------
RUN cd contracts && npm install
RUN cd backend && npm install
RUN cd frontend && npm install

# ----------------------------
# 6. Compile & test contracts
#    (assumes Hardhat already initialized)
# ----------------------------
RUN cd contracts && npx hardhat clean
RUN cd contracts && npx hardhat compile
RUN cd contracts && npx hardhat test

# ----------------------------
# 7. Default command
# ----------------------------
CMD ["bash"]
