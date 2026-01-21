import { prisma } from '../../db/prisma';

export interface ProposalInput {
  title: string;
  description: string;
  proposer: string;
  amount: number;
}

export class ProposalsService {
  async getAllProposals() {
    return prisma.proposal.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProposalById(id: number) {
    return prisma.proposal.findUnique({
      where: { id },
    });
  }

  async createProposal(data: ProposalInput) {
    return prisma.proposal.create({
      data: {
        title: data.title,
        description: data.description,
        proposer: data.proposer,
        amount: data.amount,
      },
    });
  }
}
