// backend/src/modules/proposals/proposals.service.ts
import { readContract, writeContract } from 'viem';
import { governanceContract, client } from '../../blockchain/contracts';

export interface ProposalInput {
  title: string;
  description: string;
  proposer: string; // wallet address submitting the proposal
  amount: bigint; // in wei
}

export class ProposalsService {
  // Get all proposals from the blockchain
  async getAllProposals() {
    const proposalCount = await readContract(client, {
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getProposalCount',
    });

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

  // Get a single proposal by its index (ID)
  async getProposalById(id: bigint) {
    return readContract(client, {
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'getProposal',
      args: [id],
    });
  }

  // Create a new proposal on-chain
  async createProposal(data: ProposalInput, signer: `0x${string}`) {
    const tx = await writeContract({
      client,
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'createProposal',
      args: [data.title, data.description, data.amount],
      account: signer,
    });

    await tx.wait(); // wait for confirmation
    return { success: true, txHash: tx.hash };
  }
}

