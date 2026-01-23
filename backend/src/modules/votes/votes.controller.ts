// backend/src/modules/votes/votes.controller.ts
import { Request, Response } from 'express';
import { VotesService } from './votes.service';
import { VoteDto as VoteDtoService } from './votes.service';

// Plain interface for incoming JSON
export interface IVoteDto {
  proposalId: bigint | number | string;
  support: boolean;
  weight: bigint | number | string;
}

export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  /* ─────────────────────────────
   * Cast a vote with runtime validation
   * ───────────────────────────── */
  async vote(req: Request, res: Response) {
    try {
      const { voter, data } = req.body as { voter: string; data: IVoteDto };

      // Validate voter address
      if (typeof voter !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(voter)) {
        return res.status(400).json({ success: false, error: 'Invalid voter address' });
      }

      // Validate support
      if (typeof data.support !== 'boolean') {
        return res.status(400).json({ success: false, error: '`support` must be boolean' });
      }

      // Validate proposalId
      let proposalId: bigint;
      try {
        proposalId = BigInt(data.proposalId);
      } catch {
        return res.status(400).json({ success: false, error: '`proposalId` must be a valid integer' });
      }

      // Validate weight
      let weight: bigint;
      try {
        weight = BigInt(data.weight);
        if (weight < 0n) throw new Error();
      } catch {
        return res.status(400).json({ success: false, error: '`weight` must be a non-negative integer' });
      }

      const serviceVote: VoteDtoService = { proposalId, support: data.support, weight };

      const result = await this.votesService.vote(voter as `0x${string}`, serviceVote);
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
   * Get voting results for a proposal
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
