#!/bin/bash
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

echo "✅ Tests completed successfully!"
