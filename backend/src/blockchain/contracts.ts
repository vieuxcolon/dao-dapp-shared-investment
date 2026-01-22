// backend/src/blockchain/contracts.ts
import { createPublicClient, getContract, http, PublicClient } from 'viem';
import InvestmentDAOJson from '@artifacts/contracts/contracts/InvestmentDAO.sol/InvestmentDAO.json';
import GovernanceJson from '@artifacts/contracts/contracts/Governance.sol/Governance.json';
import TreasuryJson from '@artifacts/contracts/contracts/Treasury.sol/Treasury.json';

// ----------------------
// Public client
// ----------------------
export const client: PublicClient = createPublicClient({
  transport: http('http://localhost:8545'), // Replace with your local or testnet RPC URL
});

// ----------------------
// Contracts
// ----------------------

// InvestmentDAO contract
export const investmentDAOContract = getContract({
  address: '0xYourInvestmentDAOAddressHere', // Replace with deployed address
  abi: InvestmentDAOJson.abi,
  publicClient: client,
});

// Governance contract
export const governanceContract = getContract({
  address: '0xYourGovernanceAddressHere', // Replace with deployed address
  abi: GovernanceJson.abi,
  publicClient: client,
});

// Treasury contract
export const treasuryContract = getContract({
  address: '0xYourTreasuryAddressHere', // Replace with deployed address
  abi: TreasuryJson.abi,
  publicClient: client,
});

