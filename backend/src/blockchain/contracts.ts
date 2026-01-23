// src/blockchain/contracts.ts
import { createPublicClient, createWalletClient, getContract, http } from 'viem';
import { foundry } from 'viem/chains';
import InvestmentDAOJson from '../../../artifacts/contracts/contracts/InvestmentDAO.sol/InvestmentDAO.json';
import GovernanceJson from '../../../artifacts/contracts/contracts/Governance.sol/Governance.json';
import TreasuryJson from '../../../artifacts/contracts/contracts/Treasury.sol/Treasury.json';

// Public client (read-only)
export const client = createPublicClient({
  chain: foundry,
  transport: http('http://127.0.0.1:8545'),
});

// Wallet client (write / signing)
export const walletClient = createWalletClient({
  chain: foundry,
  transport: http('http://127.0.0.1:8545'),
});

// Contracts
export const investmentDAOContract = getContract({
  address: process.env.INVESTMENT_DAO_ADDRESS as `0x${string}`,
  abi: InvestmentDAOJson.abi,
  transport: walletClient.transport,
});

export const governanceContract = getContract({
  address: process.env.GOVERNANCE_ADDRESS as `0x${string}`,
  abi: GovernanceJson.abi,
  transport: walletClient.transport,
});

export const treasuryContract = getContract({
  address: process.env.TREASURY_ADDRESS as `0x${string}`,
  abi: TreasuryJson.abi,
  transport: walletClient.transport,
});

