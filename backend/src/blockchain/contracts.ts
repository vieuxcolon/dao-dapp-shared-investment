// backend/src/blockchain/contracts.ts
import { Abi } from 'viem';

// Example ABIs (replace with your actual ABI JSONs)
export const investmentDAOAbi: Abi = [
  {
    type: 'event',
    name: 'Deposit',
    inputs: [
      { name: 'user', type: 'address', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false },
    ],
  },
  // add other events/functions as needed
];

export const governanceAbi: Abi = [
  {
    type: 'event',
    name: 'ProposalCreated',
    inputs: [
      { name: 'proposalId', type: 'uint256', indexed: true },
      { name: 'creator', type: 'address', indexed: true },
    ],
  },
  // add other events/functions as needed
];

export const treasuryAbi: Abi = [
  {
    type: 'event',
    name: 'TreasuryFunded',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false },
    ],
  },
  // add other events/functions as needed
];
