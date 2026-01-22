// backend/src/blockchain/contracts.ts
import { createPublicClient, createContract, http } from 'viem';
import { mainnet } from 'viem/chains';

import InvestmentDAOJson from '../../../artifacts/contracts/contracts/InvestmentDAO.sol/InvestmentDAO.json';
import GovernanceJson from '../../../artifacts/contracts/contracts/Governance.sol/Governance.json';
import TreasuryJson from '../../../artifacts/contracts/contracts/Treasury.sol/Treasury.json';

/**
 * Public Viem client to interact with Ethereum (or your chain)
 */
export const client = createPublicClient({
  chain: mainnet, // Replace with your network if not mainnet
  transport: http(process.env.RPC_URL || 'https://rpc.ankr.com/eth'),
});

/**
 * Contract instances
 */
export const daoContract = createContract({
  address: (process.env.INVESTMENT_DAO_ADDRESS as `0x${string}`) || '0x0000000000000000000000000000000000000000',
  abi: InvestmentDAOJson.abi,
  publicClient: client,
});

export const governanceContract = createContract({
  address: (process.env.GOVERNANCE_ADDRESS as `0x${string}`) || '0x0000000000000000000000000000000000000000',
  abi: GovernanceJson.abi,
  publicClient: client,
});

export const treasuryContract = createContract({
  address: (process.env.TREASURY_ADDRESS as `0x${string}`) || '0x0000000000000000000000000000000000000000',
  abi: TreasuryJson.abi,
  publicClient: client,
});
