// src/blockchain/contracts.ts
import InvestmentDAOJson from '../../../artifacts/contracts/InvestmentDAO.sol/InvestmentDAO.json';
import GovernanceJson from '../../../artifacts/contracts/Governance.sol/Governance.json';
import TreasuryJson from '../../../artifacts/contracts/Treasury.sol/Treasury.json';

/**
 * Contract addresses
 * Loaded from env to avoid hard-coding per network
 */
export const CONTRACT_ADDRESSES = {
  investmentDAO: process.env.INVESTMENT_DAO_ADDRESS as `0x${string}`,
  governance: process.env.GOVERNANCE_ADDRESS as `0x${string}`,
  treasury: process.env.TREASURY_ADDRESS as `0x${string}`,
};

/**
 * Contract ABIs
 */
export const CONTRACT_ABIS = {
  investmentDAO: InvestmentDAOJson.abi,
  governance: GovernanceJson.abi,
  treasury: TreasuryJson.abi,
};

/**
 * Typed contract descriptors
 * (used by readContract / writeContract)
 */
export const investmentDAOContract = {
  address: CONTRACT_ADDRESSES.investmentDAO,
  abi: CONTRACT_ABIS.investmentDAO,
} as const;

export const governanceContract = {
  address: CONTRACT_ADDRESSES.governance,
  abi: CONTRACT_ABIS.governance,
} as const;

export const treasuryContract = {
  address: CONTRACT_ADDRESSES.treasury,
  abi: CONTRACT_ABIS.treasury,
} as const;
