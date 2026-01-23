// backend/src/modules/votes/votes.controller.ts
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
      // Ensure correct types for voter and vote data
      const { voter, data } = req.body as { voter: `0x${string}`; data: VoteDto };
      const result = await this.votesService.vote(voter, data);
      res.json({ success: true, data: result });
    } catch (err) {
      console.error('Vote error:', err);
      res.status(500).json({ success: false, error: (err as Error).message });
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
    } catch (err) {
      console.error('Get votes error:', err);
      res.status(500).json({ success: false, error: (err as Error).message });
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
    } catch (err) {
      console.error('Get results error:', err);
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  }
}
