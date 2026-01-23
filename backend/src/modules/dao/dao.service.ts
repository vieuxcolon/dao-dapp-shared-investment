import { investmentDAOContract, walletClient } from '../../blockchain/contracts';

export class DaoService {
  async createProposal(
    title: string,
    description: string,
    proposer: `0x${string}`,
    amount: bigint
  ): Promise<{ success: true; txHash: `0x${string}` }> {
    const txHash: `0x${string}` = await investmentDAOContract.write.createProposal({
      args: [title, description, amount],
      account: proposer, // required in viem v2
    });

    return { success: true, txHash };
  }

  async getProposal(proposalId: bigint) {
    return investmentDAOContract.read.getProposal([proposalId]);
  }
}
