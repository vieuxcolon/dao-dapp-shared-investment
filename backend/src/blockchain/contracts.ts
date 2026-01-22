// backend/src/blockchain/contracts.ts
import { createPublicClient, getContract, http, PublicClient } from 'viem';
import InvestmentDAOJson from '../../artifacts/contracts/contracts/InvestmentDAO.sol/InvestmentDAO.json';
import GovernanceJson from '../../artifacts/contracts/contracts/Governance.sol/Governance.json';
import TreasuryJson from '../../artifacts/contracts/contracts/Treasury.sol/Treasury.json';

// Public client to connect to your blockchain (local or testnet)
export const client: PublicClient = createPublicClient({
  transport: http('http://localhost:8545'), // replace with your RPC URL
});

// Contracts
export const investmentDAOContract = getContract({
  address: '0xYourInvestmentDAOAddressHere', // replace with deployed address
  abi: InvestmentDAOJson.abi,
  publicClient: client,
});

export const governanceContract = getContract({
  address: '0xYourGovernanceAddressHere', // replace with deployed address
  abi: GovernanceJson.abi,
  publicClient: client,
});

export const treasuryContract = getContract({
  address: '0xYourTreasuryAddressHere', // replace with deployed address
  abi: TreasuryJson.abi,
  publicClient: client,
});

