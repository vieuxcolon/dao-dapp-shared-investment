// backend/src/config/env.ts
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
  PORT: process.env.PORT || 4000,

  // Database
  DATABASE_URL: process.env.DATABASE_URL || '',

  // Blockchain
  BLOCKCHAIN_RPC_URL: process.env.RPC_URL || '',
  WALLET_PRIVATE_KEY: process.env.PRIVATE_KEY || '',

  // Smart Contract Addresses
  GOVERNANCE_CONTRACT_ADDRESS: process.env.GOVERNANCE_ADDRESS || '',
  TREASURY_CONTRACT_ADDRESS: process.env.TREASURY_ADDRESS || '',
  DAO_CONTRACT_ADDRESS: process.env.INVESTMENT_DAO_ADDRESS || '',
};
