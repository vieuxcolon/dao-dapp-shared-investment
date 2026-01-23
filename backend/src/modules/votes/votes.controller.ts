// backend/src/modules/votes/votes.controller.ts
import { Request, Response } from 'express';
import { VotesService } from './votes.service';
import { VoteDto } from './dto';

export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  /* ─────────────────────────────
   * Cast a vote
   * ───────────────────────────── */
  async vote(req: Request, res: Response) {
    try {
      // Destructure expected properties from request body
      const { voter, weight } = req.body as { voter: `0x${string}`; weight: number };

      // Create VoteDto with only the expected properties
      const data: VoteDto = { weight };

      const result = await this.votesService.vote(voter, data);
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

