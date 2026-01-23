// src/blockchain/eventListener.ts
import { decodeEventLog } from 'viem';
import { client, investmentDAOContract } from './contracts';

export function startListeners() {
  const address = investmentDAOContract.address;
  const abi = investmentDAOContract.abi;

  // ─────────────────────────────────────────────
  // ProposalCreated
  // ─────────────────────────────────────────────
  client.watchContractEvent({
    address,
    abi,
    eventName: 'ProposalCreated',
    onLogs(logs) {
      for (const log of logs) {
        const decoded = decodeEventLog({
          abi,
          data: log.data,
          topics: log.topics,
        });

        if (decoded.eventName !== 'ProposalCreated') continue;

        const { proposalId, proposer } = decoded.args as {
          proposalId: bigint;
          proposer: `0x${string}`;
        };

        console.log('ProposalCreated', { proposalId, proposer });
      }
    },
  });

  // ─────────────────────────────────────────────
  // VoteCast
  // ─────────────────────────────────────────────
  client.watchContractEvent({
    address,
    abi,
    eventName: 'VoteCast',
    onLogs(logs) {
      for (const log of logs) {
        const decoded = decodeEventLog({
          abi,
          data: log.data,
          topics: log.topics,
        });

        if (decoded.eventName !== 'VoteCast') continue;

        const { voter, proposalId, support, weight } = decoded.args as {
          voter: `0x${string}`;
          proposalId: bigint;
          support: boolean;
          weight: bigint;
        };

        console.log('VoteCast', {
          voter,
          proposalId,
          support,
          weight,
        });
      }
    },
  });

  // ─────────────────────────────────────────────
  // Transfer
  // ─────────────────────────────────────────────
  client.watchContractEvent({
    address,
    abi,
    eventName: 'Transfer',
    onLogs(logs) {
      for (const log of logs) {
        const decoded = decodeEventLog({
          abi,
          data: log.data,
          topics: log.topics,
        });

        if (decoded.eventName !== 'Transfer') continue;

        const { from, amount } = decoded.args as {
          from: `0x${string}`;
          amount: bigint;
        };

        console.log('Transfer', { from, amount });
      }
    },
  });
}
