// backend/src/config/env.ts
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  BLOCKCHAIN_RPC_URL: process.env.BLOCKCHAIN_RPC_URL || '',
  WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY || '',
  GOVERNANCE_CONTRACT_ADDRESS: process.env.GOVERNANCE_CONTRACT_ADDRESS || '',
  TREASURY_CONTRACT_ADDRESS: process.env.TREASURY_CONTRACT_ADDRESS || '',
  DAO_CONTRACT_ADDRESS: process.env.DAO_CONTRACT_ADDRESS || '',
};
