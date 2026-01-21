#!/bin/bash
# ===============================
# scripts/test.sh
# Runs all tests for DAO DApp
# ===============================

set -e

echo "🧪 Starting test suite for DAO DApp..."

# ----------------------------
# 1. Smart Contract Tests
# ----------------------------
echo "📜 Running smart contract tests..."
cd contracts
npm install
npx hardhat test
cd ..

# ----------------------------
# 2. Backend Tests
# ----------------------------
echo "⚙️  Running backend tests..."
cd backend
npm install
npm run test
cd ..

# ----------------------------
# 3. Frontend Tests
# ----------------------------
echo "🎨 Running frontend tests..."
cd frontend
npm install
npm run test
cd ..

# ----------------------------
# 4. Done
# ----------------------------
echo "✅ All tests completed successfully!"
