// backend/src/modules/votes/votes.controller.ts
import { Request, Response } from 'express';
import { VotesService } from './votes.service';
import { VoteDto as VoteDtoService } from './votes.service';

// Define a plain interface for incoming JSON data
export interface IVoteDto {
  proposalId: bigint | number | string; // accept number/string from client, convert to bigint
  support: boolean;
  weight: bigint | number | string;     // same here
}

export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  /* ─────────────────────────────
   * Cast a vote
   * ───────────────────────────── */
  async vote(req: Request, res: Response) {
    try {
      // Expect voter as 0x address string and data with proposalId, support & weight
      const { voter, data } = req.body as { voter: `0x${string}`; data: IVoteDto };

      // Map DTO to Service's expected VoteDto
      const serviceVote: VoteDtoService = {
        proposalId: BigInt(data.proposalId), // ensure bigint
        support: data.support,
        weight: BigInt(data.weight),         // ensure bigint
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
