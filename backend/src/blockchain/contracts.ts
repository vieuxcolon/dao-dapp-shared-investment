// backend/src/blockchain/contracts.ts
import { createPublicClient, createContract, http } from 'viem';
import { mainnet } from 'viem/chains';
import InvestmentDAOJson from '@artifacts/contracts/contracts/InvestmentDAO.sol/InvestmentDAO.json';
import GovernanceJson from '@artifacts/contracts/contracts/Governance.sol/Governance.json';
import TreasuryJson from '@artifacts/contracts/contracts/Treasury.sol/Treasury.json';

/**
 * Initialize Viem public client to interact with the blockchain
 */
export const client = createPublicClient({
  chain: mainnet, // Replace with your chain if needed
  transport: http(process.env.RPC_URL || 'https://rpc.ankr.com/eth'),
});

/**
 * Contract instances
 */
export const daoContract = createContract({
  address: process.env.INVESTMENT_DAO_ADDRESS as `0x${string}`,
  abi: InvestmentDAOJson.abi,
  publicClient: client,
});

export const governanceContract = createContract({
  address: process.env.GOVERNANCE_ADDRESS as `0x${string}`,
  abi: GovernanceJson.abi,
  publicClient: client,
});

export const treasuryContract = createContract({
  address: process.env.TREASURY_ADDRESS as `0x${string}`,
  abi: TreasuryJson.abi,
  publicClient: client,
});

/**
 * Optional helper export for easier imports elsewhere
 */
export const contracts = {
  daoContract,
  governanceContract,
  treasuryContract,
};
