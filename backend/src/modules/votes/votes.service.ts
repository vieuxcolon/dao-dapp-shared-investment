import { prisma } from '../../db/prisma';

interface VoteInput {
  proposalId: number;
  voter: string;
  support: boolean;
  weight: number;
}

export class VotesService {
  // Get all votes
  async getAllVotes() {
    return prisma.vote.findMany();
  }

  // Get a single vote by ID
  async getVoteById(id: number) {
    return prisma.vote.findUnique({
      where: { id },
    });
  }

  // Create a new vote
  async createVote(data: VoteInput) {
    return prisma.vote.create({
      data: {
        proposalId: data.proposalId,
        voter: data.voter,
        support: data.support,
        weight: data.weight,
      },
    });
  }
}
