#!/bin/bash
set -e

echo "🚀 Starting DAO DApp orchestration..."

# ----------------------------
# 1. Build locally (sanity)
# ----------------------------
./scripts/build.sh

# ----------------------------
# 2. Docker build & up
# ----------------------------
docker compose build
docker compose up -d

echo "✅ DAO DApp is running!"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:4000"
