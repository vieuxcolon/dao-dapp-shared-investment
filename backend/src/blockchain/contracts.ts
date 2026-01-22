// backend/src/blockchain/contracts.ts
import { createPublicClient, createContract, http } from 'viem';
import { mainnet } from 'viem/chains';

// Import compiled ABIs (ensure paths match your repo)
import InvestmentDAOJson from '../../../contracts/artifacts/contracts/InvestmentDAO.sol/InvestmentDAO.json';
import GovernanceJson from '../../../contracts/artifacts/contracts/Governance.sol/Governance.json';
import TreasuryJson from '../../../contracts/artifacts/contracts/Treasury.sol/Treasury.json';

// Ensure required environment variables are set
const { INVESTMENT_DAO_ADDRESS, GOVERNANCE_ADDRESS, TREASURY_ADDRESS, RPC_URL } = process.env;

if (!INVESTMENT_DAO_ADDRESS || !GOVERNANCE_ADDRESS || !TREASURY_ADDRESS || !RPC_URL) {
  throw new Error('Missing contract address environment variables');
}

// Public client to interact with blockchain
export const client = createPublicClient({
  transport: http(RPC_URL),
  chain: mainnet // replace with your chain if different
});

// Contract instances
export const daoContract = createContract({
  address: INVESTMENT_DAO_ADDRESS as `0x${string}`,
  abi: InvestmentDAOJson.abi,
  publicClient: client
});

export const governanceContract = createContract({
  address: GOVERNANCE_ADDRESS as `0x${string}`,
  abi: GovernanceJson.abi,
  publicClient: client
});

export const treasuryContract = createContract({
  address: TREASURY_ADDRESS as `0x${string}`,
  abi: TreasuryJson.abi,
  publicClient: client
});

// Optional helper export
export const contracts = {
  daoContract,
  governanceContract,
  treasuryContract
};
