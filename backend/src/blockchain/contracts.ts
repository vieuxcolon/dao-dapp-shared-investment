// src/blockchain/contracts.ts
import type { Abi } from 'viem';

/**
 * Contract addresses (from env)
 */
export const investmentDAOAddress = process.env.INVESTMENT_DAO_ADDRESS as `0x${string}`;
export const governanceAddress = process.env.GOVERNANCE_ADDRESS as `0x${string}`;
export const treasuryAddress = process.env.TREASURY_ADDRESS as `0x${string}`;

if (!investmentDAOAddress || !governanceAddress || !treasuryAddress) {
  throw new Error('Missing contract address environment variables');
}

/**
 * Minimal ABIs (events only for now)
 * Extend later as needed
 */

export const investmentDAOAbi = [
  {
    type: 'event',
    name: 'InvestmentCreated',
    inputs: [
      { name: 'investmentId', type: 'uint256', indexed: true },
      { name: 'creator', type: 'address', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false },
    ],
  },
] as const satisfies Abi;

export const governanceAbi = [
  {
    type: 'event',
    name: 'ProposalCreated',
    inputs: [
      { name: 'proposalId', type: 'uint256', indexed: true },
      { name: 'creator', type: 'address', indexed: true },
    ],
  },
] as const satisfies Abi;

export const treasuryAbi = [
  {
    type: 'event',
    name: 'FundsDeposited',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false },
    ],
  },
] as const satisfies Abi;

