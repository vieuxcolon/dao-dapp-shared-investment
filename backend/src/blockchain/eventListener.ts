import { decodeEventLog } from 'viem';
import { publicClient } from './client';
import { DAO_ADDRESS, daoAbi } from './contracts';

export function startEventListeners() {
  // ─────────────────────────────────────────────
  // ProposalCreated
  // ─────────────────────────────────────────────
  publicClient.watchEvent({
    address: DAO_ADDRESS,
    abi: daoAbi,
    eventName: 'ProposalCreated',
    onLogs(logs) {
      for (const log of logs) {
        const decoded = decodeEventLog({
          abi: daoAbi,
          data: log.data,
          topics: log.topics,
        });

        if (decoded.eventName !== 'ProposalCreated') return;

        const { proposalId, proposer } = decoded.args as {
          proposalId: bigint;
          proposer: `0x${string}`;
        };

        console.log('ProposalCreated', { proposalId, proposer });
        // persist to DB here
      }
    },
  });

  // ─────────────────────────────────────────────
  // VoteCast
  // ─────────────────────────────────────────────
  publicClient.watchEvent({
    address: DAO_ADDRESS,
    abi: daoAbi,
    eventName: 'VoteCast',
    onLogs(logs) {
      for (const log of logs) {
        const decoded = decodeEventLog({
          abi: daoAbi,
          data: log.data,
          topics: log.topics,
        });

        if (decoded.eventName !== 'VoteCast') return;

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
  // Transfer (Treasury)
  // ─────────────────────────────────────────────
  publicClient.watchEvent({
    address: DAO_ADDRESS,
    abi: daoAbi,
    eventName: 'Transfer',
    onLogs(logs) {
      for (const log of logs) {
        const decoded = decodeEventLog({
          abi: daoAbi,
          data: log.data,
          topics: log.topics,
        });

        if (decoded.eventName !== 'Transfer') return;

        const { from, amount } = decoded.args as {
          from: `0x${string}`;
          amount: bigint;
        };

        console.log('Transfer', { from, amount });
      }
    },
  });
}
