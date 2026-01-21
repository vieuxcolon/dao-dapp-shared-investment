#!/bin/bash
set -e

echo "🔨 Starting build process for DAO DApp..."

# ----------------------------
# 1. Compile Smart Contracts
# ----------------------------
echo "📦 Compiling smart contracts..."
cd contracts
npm install
npx hardhat compile
cd ..

# ----------------------------
# 2. Build Backend
# ----------------------------
echo "⚙️  Building backend..."
cd backend
npm install
# Only run build if script exists
if npm run | grep -q "build"; then
  npm run build
else
  echo "ℹ️  No backend build step defined (OK for dev)"
fi
cd ..

# ----------------------------
# 3. Build Frontend
# ----------------------------
echo "🎨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "✅ Build completed!"
