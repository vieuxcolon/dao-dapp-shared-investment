// backend/src/modules/votes/votes.routes.ts
import { Router, Request, Response } from 'express';
import { VotesService } from './votes.service';
import { VoteDto } from './dto';

export function createVotesRouter(votesService: VotesService) {
  const router = Router();

  /* ─────────────────────────────
   * Vote on a proposal (POST /vote)
   * ───────────────────────────── */
  router.post('/vote', async (req: Request, res: Response) => {
    try {
      const { voter, data } = req.body as { voter: `0x${string}`; data: VoteDto };
      const result = await votesService.vote(voter, data);
      res.json({ success: true, data: result });
    } catch (err: any) {
      console.error('Vote error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /* ─────────────────────────────
   * Get votes for a proposal (GET /:proposalId)
   * ───────────────────────────── */
  router.get('/:proposalId', async (req: Request, res: Response) => {
    try {
      const proposalId = BigInt(req.params.proposalId);
      const votes = await votesService.getVotes(proposalId);
      res.json({ success: true, data: votes });
    } catch (err: any) {
      console.error('Get votes error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /* ─────────────────────────────
   * Get proposal results (GET /:proposalId/results)
   * ───────────────────────────── */
  router.get('/:proposalId/results', async (req: Request, res: Response) => {
    try {
      const proposalId = BigInt(req.params.proposalId);
      const results = await votesService.getResults(proposalId);
      res.json({ success: true, data: results });
    } catch (err: any) {
      console.error('Get results error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
}
