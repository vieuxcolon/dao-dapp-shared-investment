// src/blockchain/contracts.ts
import { Abi } from 'viem';

import InvestmentDAOJson from '../../../artifacts/contracts/contracts/InvestmentDAO.sol/InvestmentDAO.json';
import GovernanceJson from '../../../artifacts/contracts/contracts/Governance.sol/Governance.json';
import TreasuryJson from '../../../artifacts/contracts/contracts/Treasury.sol/Treasury.json';

/* ─────────────────────────────────────────────
 * Contract Addresses
 * ───────────────────────────────────────────── */
export const INVESTMENT_DAO_ADDRESS =
  process.env.INVESTMENT_DAO_ADDRESS as `0x${string}`;

export const GOVERNANCE_ADDRESS =
  process.env.GOVERNANCE_ADDRESS as `0x${string}`;

export const TREASURY_ADDRESS =
  process.env.TREASURY_ADDRESS as `0x${string}`;

/* ─────────────────────────────────────────────
 * Contract ABIs
 * ───────────────────────────────────────────── */
export const investmentDAOAbi = InvestmentDAOJson.abi as Abi;
export const governanceAbi = GovernanceJson.abi as Abi;
export const treasuryAbi = TreasuryJson.abi as Abi;

/* ─────────────────────────────────────────────
 * Contract Descriptors (Viem 2.x style)
 * ───────────────────────────────────────────── */
export const investmentDAOContract = {
  address: INVESTMENT_DAO_ADDRESS,
  abi: investmentDAOAbi,
} as const;

export const governanceContract = {
  address: GOVERNANCE_ADDRESS,
  abi: governanceAbi,
} as const;

export const treasuryContract = {
  address: TREASURY_ADDRESS,
  abi: treasuryAbi,
} as const;

