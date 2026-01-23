// backend/src/modules/proposals/proposals.routes.ts
import { Router, Request, Response } from 'express';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto, VoteDto } from './dto';

export function createProposalsRouter(proposalsService: ProposalsService) {
  const router = Router();

  /* ─────────────────────────────
   * Create a new proposal (POST /)
   * ───────────────────────────── */
  router.post('/', async (req: Request, res: Response) => {
    try {
      const { signer, data } = req.body as {
        signer: `0x${string}`;
        data: CreateProposalDto;
      };
      const result = await proposalsService.createProposal(signer, data);
      res.json({ success: true, data: result });
    } catch (err: any) {
      console.error('Create proposal error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /* ─────────────────────────────
   * Vote on a proposal (POST /vote)
   * ───────────────────────────── */
  router.post('/vote', async (req: Request, res: Response) => {
    try {
      const { voter, data } = req.body as { voter: `0x${string}`; data: VoteDto };
      const result = await proposalsService.vote(voter, data);
      res.json({ success: true, data: result });
    } catch (err: any) {
      console.error('Vote error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /* ─────────────────────────────
   * Get proposal details (GET /:id)
   * ───────────────────────────── */
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const proposalId = BigInt(req.params.id);
      const proposal = await proposalsService.getProposal(proposalId);
      res.json({ success: true, data: proposal });
    } catch (err: any) {
      console.error('Get proposal error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /* ─────────────────────────────
   * Get votes for a proposal (GET /:id/votes)
   * ───────────────────────────── */
  router.get('/:id/votes', async (req: Request, res: Response) => {
    try {
      const proposalId = BigInt(req.params.id);
      const votes = await proposalsService.getVotes(proposalId);
      res.json({ success: true, data: votes });
    } catch (err: any) {
      console.error('Get votes error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /* ─────────────────────────────
   * Get proposal results (GET /:id/results)
   * ───────────────────────────── */
  router.get('/:id/results', async (req: Request, res: Response) => {
    try {
      const proposalId = BigInt(req.params.id);
      const results = await proposalsService.getResults(proposalId);
      res.json({ success: true, data: results });
    } catch (err: any) {
      console.error('Get results error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
}

