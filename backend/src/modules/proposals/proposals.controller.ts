//backend/src/modules/proposals/proposals.controller.ts
// backend/src/modules/proposals/proposals.controller.ts
import { Request, Response } from 'express';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto, VoteDto } from './proposals.types';

export class ProposalsController {
  constructor(private readonly service: ProposalsService) {}

  /** ─────────────────────────────
   * Create a new proposal
   * POST /proposals
   * ───────────────────────────── */
  async createProposal(req: Request, res: Response) {
    try {
      const data: CreateProposalDto = req.body;
      const result = await this.service.createProposal(data);
      res.status(201).json(result); // 201 = Created
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  }

  /** ─────────────────────────────
   * Cast a vote for a proposal
   * POST /proposals/:id/vote
   * ───────────────────────────── */
  async vote(req: Request, res: Response) {
    try {
      const data: VoteDto = req.body;
      const result = await this.service.vote(data);
      res.json(result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  }

  /** ─────────────────────────────
   * Get a single proposal by ID
   * GET /proposals/:id
   * ───────────────────────────── */
  async getProposal(req: Request, res: Response) {
    try {
      const id = BigInt(req.params.id);
      const proposal = await this.service.getProposal(id);
      if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
      res.json(proposal);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  }

  /** ─────────────────────────────
   * Get all votes for a proposal
   * GET /proposals/:id/votes
   * ───────────────────────────── */
  async getVotes(req: Request, res: Response) {
    try {
      const id = BigInt(req.params.id);
      const votes = await this.service.getVotes(id);
      res.json(votes);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  }

  /** ─────────────────────────────
   * Get voting results for a proposal
   * GET /proposals/:id/results
   * ───────────────────────────── */
  async getResults(req: Request, res: Response) {
    try {
      const id = BigInt(req.params.id);
      const results = await this.service.getResults(id);
      res.json(results);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  }
}

