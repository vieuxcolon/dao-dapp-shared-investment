import { decodeEventLog } from 'viem';
import { client, DAO_ABI, DAO_ADDRESS } from './contracts';

export function startListeners() {
  // ─────────────────────────────────────────────
  // ProposalCreated
  // ─────────────────────────────────────────────
  client.watchContractEvent({
    address: DAO_ADDRESS,
    abi: DAO_ABI,
    eventName: 'ProposalCreated',
    onLogs(logs) {
      for (const log of logs) {
        const decoded = decodeEventLog({
          abi: DAO_ABI,
          data: log.data,
          topics: log.topics,
        });

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
    address: DAO_ADDRESS,
    abi: DAO_ABI,
    eventName: 'VoteCast',
    onLogs(logs) {
      for (const log of logs) {
        const decoded = decodeEventLog({
          abi: DAO_ABI,
          data: log.data,
          topics: log.topics,
        });

        const { voter, proposalId, support, weight } = decoded.args as {
          voter: `0x${string}`;
          proposalId: bigint;
          support: boolean;
          weight: bigint;
        };

        console.log('VoteCast', { voter, proposalId, support, weight });
      }
    },
  });

  // ─────────────────────────────────────────────
  // Transfer
  // ─────────────────────────────────────────────
  client.watchContractEvent({
    address: DAO_ADDRESS,
    abi: DAO_ABI,
    eventName: 'Transfer',
    onLogs(logs) {
      for (const log of logs) {
        const decoded = decodeEventLog({
          abi: DAO_ABI,
          data: log.data,
          topics: log.topics,
        });

        const { from, amount } = decoded.args as {
          from: `0x${string}`;
          amount: bigint;
        };

        console.log('Transfer', { from, amount });
      }
    },
  });
}
