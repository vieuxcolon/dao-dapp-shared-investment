// backend/src/blockchain/contracts.ts
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  type PublicClient,
} from 'viem';
import { foundry } from 'viem/chains';

// ─────────────────────────────────────────────
// Contract ABIs
// ─────────────────────────────────────────────
import InvestmentDAOJson from '../../../artifacts/contracts/contracts/InvestmentDAO.sol/InvestmentDAO.json';
import GovernanceJson from '../../../artifacts/contracts/contracts/Governance.sol/Governance.json';
import TreasuryJson from '../../../artifacts/contracts/contracts/Treasury.sol/Treasury.json';

// ─────────────────────────────────────────────
// Public client (READ-ONLY)
// ─────────────────────────────────────────────
export const client: PublicClient = createPublicClient({
  chain: foundry,
  transport: http('http://127.0.0.1:8545'),
});

// ─────────────────────────────────────────────
// Wallet client (WRITE / TX SIGNING)
// ─────────────────────────────────────────────
export const walletClient = createWalletClient({
  chain: foundry,
  transport: http('http://127.0.0.1:8545'),
});

// ─────────────────────────────────────────────
// Contracts (typed, safe, viem v2)
// ─────────────────────────────────────────────
export const investmentDAOContract = getContract({
  address: process.env.INVESTMENT_DAO_ADDRESS as `0x${string}`,
  abi: InvestmentDAOJson.abi,
  publicClient: client,
  walletClient,
});

export const governanceContract = getContract({
  address: process.env.GOVERNANCE_ADDRESS as `0x${string}`,
  abi: GovernanceJson.abi,
  publicClient: client,
  walletClient,
});

export const treasuryContract = getContract({
  address: process.env.TREASURY_ADDRESS as `0x${string}`,
  abi: TreasuryJson.abi,
  publicClient: client,
  walletClient,
});
