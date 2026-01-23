//backend/src/modules/proposals/proposals.controller.ts
import { ProposalsService } from './proposals.service';
import { CreateProposalDto, VoteDto } from './proposals.types';
import { Request, Response } from 'express';

export class ProposalsController {
  constructor(private readonly service: ProposalsService) {}

  async createProposal(req: Request, res: Response) {
    try {
      const dto: CreateProposalDto = req.body;
      const result = await this.service.createProposal(dto);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async vote(req: Request, res: Response) {
    try {
      const dto: VoteDto = req.body;
      const result = await this.service.vote(dto);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getProposal(req: Request, res: Response) {
    const id = BigInt(req.params.id);
    const proposal = await this.service.getProposal(id);
    if (proposal) res.json(proposal);
    else res.status(404).json({ error: 'Proposal not found' });
  }

  async getVotes(req: Request, res: Response) {
    const id = BigInt(req.params.id);
    const votes = await this.service.getVotes(id);
    res.json(votes);
  }

  async getResults(req: Request, res: Response) {
    const id = BigInt(req.params.id);
    const results = await this.service.getResults(id);
    res.json(results);
  }
}
