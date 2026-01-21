// backend/src/blockchain/contracts.ts
import { createPublicClient, createContract, http } from 'viem';
import { mainnet } from 'viem/chains';
import InvestmentDAOJson from '../../../contracts/artifacts/contracts/InvestmentDAO.sol/InvestmentDAO.json';
import GovernanceJson from '../../../contracts/artifacts/contracts/Governance.sol/Governance.json';
import TreasuryJson from '../../../contracts/artifacts/contracts/Treasury.sol/Treasury.json';

/**
 * Viem client to interact with the blockchain
 */
export const client = createPublicClient({
  chain: mainnet, // Change to your chain, e.g., goerli, polygon, etc.
  transport: http('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'), // Replace with your RPC
});

/**
 * Contract instances
 */
export const daoContract = createContract({
  address: '0xYourDAOContractAddress', // replace with deployed DAO contract address
  abi: InvestmentDAOJson.abi,
  publicClient: client,
});

export const governanceContract = createContract({
  address: '0xYourGovernanceContractAddress', // replace with deployed Governance contract
  abi: GovernanceJson.abi,
  publicClient: client,
});

export const treasuryContract = createContract({
  address: '0xYourTreasuryContractAddress', // replace with deployed Treasury contract
  abi: TreasuryJson.abi,
  publicClient: client,
});
