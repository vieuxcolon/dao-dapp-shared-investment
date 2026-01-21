#!/bin/bash
# ===============================
# scripts/run-all.sh
# Orchestrates the build, test, and launch of the DAO DApp
# ===============================

set -e

echo "🚀 Starting DAO DApp orchestration..."

# ----------------------------
# 1. Build everything
# ----------------------------
echo "🔨 Step 1: Building contracts, backend, and frontend..."
./scripts/build.sh

# ----------------------------
# 2. Launch Docker containers
# ----------------------------
echo "🐳 Step 2: Building and starting Docker containers..."
docker compose build
docker compose up -d

# ----------------------------
# 3. Run tests
# ----------------------------
echo "🧪 Step 3: Running tests..."
./scripts/test.sh

# ----------------------------
# 4. Done
# ----------------------------
echo "✅ DAO DApp setup, build, and tests complete!"
echo "You can now access the frontend and backend services."
