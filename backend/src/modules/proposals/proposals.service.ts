// backend/src/modules/proposals/proposals.service.ts
import {
  governanceContract,
  client,
  walletClient,
} from '../../blockchain/contracts';

export interface ProposalInput {
  title: string;
  description: string;
  amount: bigint;
}

export class ProposalsService {
  // ⚠️ Acceptable for now, but not scalable
  async getAllProposals() {
    const proposalCount = await governanceContract.read.getProposalCount();

    const proposals = [];
    for (let i = 0n; i < proposalCount; i++) {
      const proposal = await governanceContract.read.getProposal([i]);
      proposals.push(proposal);
    }

    return proposals;
  }

  async getProposalById(id: bigint) {
    return governanceContract.read.getProposal([id]);
  }

  async createProposal(
    data: ProposalInput,
    signer: `0x${string}`,
  ) {
    const hash = await walletClient.writeContract({
      address: governanceContract.address,
      abi: governanceContract.abi,
      functionName: 'createProposal',
      args: [data.title, data.description, data.amount],
      account: signer,
    });

    const receipt = await client.waitForTransactionReceipt({ hash });

    return {
      success: true,
      txHash: receipt.transactionHash,
    };
  }
}
