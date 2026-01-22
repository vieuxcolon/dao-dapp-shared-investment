import { VotesService } from './votes.service';
import { Request, Response } from 'express';

export class VotesController {
  constructor(private votesService: VotesService) {}

  async getVotes(req: Request, res: Response) {
    const proposalId = BigInt(req.params.proposalId);
    const votes = await this.votesService.getVotes(proposalId);
    res.json(votes);
  }

  async castVote(req: Request, res: Response) {
    const vote = await this.votesService.castVote(req.body);
    res.json(vote);
  }
}
