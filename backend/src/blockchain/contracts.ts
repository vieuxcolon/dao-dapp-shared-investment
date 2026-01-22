import { createPublicClient, getContract, http, PublicClient } from 'viem';

// ✅ CORRECT relative paths (3 levels up to repo root)
import InvestmentDAOJson from '../../../artifacts/contracts/contracts/InvestmentDAO.sol/InvestmentDAO.json';
import GovernanceJson from '../../../artifacts/contracts/contracts/Governance.sol/Governance.json';
import TreasuryJson from '../../../artifacts/contracts/contracts/Treasury.sol/Treasury.json';

// Public client
export const client: PublicClient = createPublicClient({
  transport: http('http://127.0.0.1:8545'),
});

// Contracts
export const investmentDAOContract = getContract({
  address: process.env.INVESTMENT_DAO_ADDRESS as `0x${string}`,
  abi: InvestmentDAOJson.abi,
  publicClient: client,
});

export const governanceContract = getContract({
  address: process.env.GOVERNANCE_ADDRESS as `0x${string}`,
  abi: GovernanceJson.abi,
  publicClient: client,
});

export const treasuryContract = getContract({
  address: process.env.TREASURY_ADDRESS as `0x${string}`,
  abi: TreasuryJson.abi,
  publicClient: client,
});

// ────────────────
// NEW EXPORTS FOR EVENT LISTENER
// ────────────────
export const DAO_ABI = InvestmentDAOJson.abi;
export const DAO_ADDRESS = pr_
