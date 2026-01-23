import { Request, Response } from 'express';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto, VoteDto } from './dto';

export class ProposalsController {
  private proposalsService: ProposalsService;

  constructor(proposalsService: ProposalsService) {
    this.proposalsService = proposalsService;
  }

  async createProposal(req: Request, res: Response) {
    try {
      const { signer, data } = req.body as { signer: `0x${string}`; data: CreateProposalDto };
      const result = await this.proposalsService.createProposal(signer, data);
      res.json({ success: true, data: result });
    } catch (err: any) {
      console.error('Create proposal error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async vote(req: Request, res: Response) {
    try {
      const { voter, data } = req.body as { voter: `0x${string}`; data: VoteDto };
      const result = await this.proposalsService.vote(voter, data);
      res.json({ success: true, data: result });
    } catch (err: any) {
      console.error('Vote error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getProposal(req: Request, res: Response) {
    try {
      const proposalId = BigInt(req.params.id);
      const proposal = await this.proposalsService.getProposal(proposalId);
      res.json({ success: true, data: proposal });
    } catch (err: any) {
      console.error('Get proposal error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getVotes(req: Request, res: Response) {
    try {
      const proposalId = BigInt(req.params.id);
      const votes = await this.proposalsService.getVotes(proposalId);
      res.json({ success: true, data: votes });
    } catch (err: any) {
      console.error('Get votes error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getResults(req: Request, res: Response) {
    try {
      const proposalId = BigInt(req.params.id);
      const results = await this.proposalsService.getResults(proposalId);
      res.json({ success: true, data: results });
    } catch (err: any) {
      console.error('Get results error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
