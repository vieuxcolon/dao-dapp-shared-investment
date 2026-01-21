#!/bin/bash
# ===============================
# scripts/build.sh
# Builds contracts, backend, and frontend
# ===============================

set -e

echo "🔨 Starting build process for DAO DApp..."

# ----------------------------
# 1. Compile Smart Contracts
# ----------------------------
echo "📦 Compiling smart contracts..."
npx hardhat compile

# ----------------------------
# 2. Build Backend
# ----------------------------
echo "⚙️  Building backend..."
cd backend
npm install
npm run build
cd ..

# ----------------------------
# 3. Build Frontend
# ----------------------------
echo "🎨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# ----------------------------
# 4. Done
# ----------------------------
echo "✅ Build completed for contracts, backend, and frontend!"
