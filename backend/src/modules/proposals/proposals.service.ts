// backend/src/modules/proposals/proposals.service.ts
import { readContract, writeContract } from 'viem';
import { governanceContract, client, walletClient } from '../../blockchain/contracts';

export interface ProposalInput {
  title: string;
  description: string;
  proposer: string; // wallet address
  amount: bigint;   // in wei
}

export class ProposalsService {
  // ─────────────────────────────────────────────
  // Get all proposals
  // ─────────────────────────────────────────────
  async getAllProposals() {
    // Cast proposalCount explicitly to bigint
    const proposalCount = (await readContract(client, {
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getProposalCount',
    })) as bigint;

    const proposals = [];
    for (let i = 0n; i < proposalCount; i++) {
      const p = await readContract(client, {
        address: governanceContract.address,
        abi: governanceContract.abi,
        functionName: 'getProposal',
        args: [i],
      });
      proposals.push(p);
    }
    return proposals;
  }

  // ─────────────────────────────────────────────
  // Get a proposal by ID
  // ─────────────────────────────────────────────
  async getProposalById(id: bigint) {
    return readContract(client, {
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getProposal',
      args: [id],
    });
  }

  // ─────────────────────────────────────────────
  // Create a new proposal
  // ─────────────────────────────────────────────
  async createProposal(data: ProposalInput, signer: `0x${string}`) {
    const tx = await walletClient.writeContract({
      client: walletClient, // use walletClient for writes
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'createProposal',
      args: [data.title, data.description, data.amount],
      account: signer,
    });

    await client.waitForTransactionReceipt({ hash: tx.hash });
    return { success: true, txHash: tx.hash };
  }
}
