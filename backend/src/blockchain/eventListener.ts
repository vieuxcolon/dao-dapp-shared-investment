import { watchContractEvent } from 'viem/actions';
import {
  client,
  investmentDAOContract,
  governanceContract,
  treasuryContract,
} from './contracts';

export function startListeners() {
  console.log('Starting blockchain event listeners…');

  // ----------------------------
  // ProposalCreated (InvestmentDAO)
  // ----------------------------
  watchContractEvent(client, {
    address: investmentDAOContract.address,
    abi: investmentDAOContract.abi,
    eventName: 'ProposalCreated',
    onLogs(logs) {
      for (const log of logs) {
        const { proposalId, proposer } = log.args as {
          proposalId: bigint;
          proposer: `0x${string}`;
        };

        console.log('ProposalCreated:', {
          proposalId: proposalId.toString(),
          proposer,
        });

        // TODO: persist to DB if needed
      }
    },
  });

  // ----------------------------
  // VoteCast (Governance)
  // ----------------------------
  watchContractEvent(client, {
    address: governanceContract.address,
    abi: governanceContract.abi,
    eventName: 'VoteCast',
    onLogs(logs) {
      for (const log of logs) {
        const { voter, proposalId, support, weight } = log.args as {
          voter: `0x${string}`;
          proposalId: bigint;
          support: boolean;
          weight: bigint;
        };

        console.log('VoteCast:', {
          voter,
          proposalId: proposalId.toString(),
          support,
          weight: weight.toString(),
        });

        // TODO: persist to DB
      }
    },
  });

  // ----------------------------
  // Deposit (Treasury)
  // ----------------------------
  watchContractEvent(client, {
    address: treasuryContract.address,
    abi: treasuryContract.abi,
    eventName: 'Deposit',
    onLogs(logs) {
      for (const log of logs) {
        const { from, amount } = log.args as {
          from: `0x${string}`;
          amount: bigint;
        };

        console.log('Deposit:', {
          from,
          amount: amount.toString(),
        });

        // TODO: update treasury balance in DB
      }
    },
  });
}
