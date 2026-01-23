import { Request, Response } from 'express';
import { VotesService } from './votes.service';
import { VoteDto as VoteDtoDTO } from './dto';
import { VoteDto as VoteDtoService } from './votes.service';

export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  /* ─────────────────────────────
   * Cast a vote
   * ───────────────────────────── */
  async vote(req: Request, res: Response) {
    try {
      // Expect voter as 0x address string and data with support & weight from DTO
      const { voter, data } = req.body as { voter: `0x${string}`; data: VoteDtoDTO };

      // Map DTO to Service's expected VoteDto
      const serviceVote: VoteDtoService = {
        support: data.support,       // boolean or whatever type service expects
        weight: data.weight,         // number or bigint as expected by service
      };

      const result = await this.votesService.vote(voter, serviceVote);
      res.json({ success: true, data: result });
    } catch (err: any) {
      console.error('Vote error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  /* ─────────────────────────────
   * Get votes for a proposal
   * ───────────────────────────── */
  async getVotes(req: Request, res: Response) {
    try {
      const proposalId = BigInt(req.params.proposalId);
      const votes = await this.votesService.getVotes(proposalId);
      res.json({ success: true, data: votes });
    } catch (err: any) {
      console.error('Get votes error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  /* ─────────────────────────────
   * Get results for a proposal
   * ───────────────────────────── */
  async getResults(req: Request, res: Response) {
    try {
      const proposalId = BigInt(req.params.proposalId);
      const results = await this.votesService.getResults(proposalId);
      res.json({ success: true, data: results });
    } catch (err: any) {
      console.error('Get results error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

