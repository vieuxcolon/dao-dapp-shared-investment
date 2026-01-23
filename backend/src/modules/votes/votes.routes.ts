// backend/src/modules/votes/votes.routes.ts
import { Router, Request, Response } from 'express';
import { VotesService } from './votes.service';
import { VoteDto } from './dto';

const router = Router();
const votesService = new VotesService();

/* ─────────────────────────────────────────────
 * Cast a vote
 * ───────────────────────────────────────────── */
router.post('/cast', async (req: Request, res: Response) => {
  try {
    const { voter, data } = req.body as { voter: `0x${string}`; data: VoteDto };
    const result = await votesService.vote(voter, data);
    res.json(result);
  } catch (err: any) {
    console.error('Cast vote error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ─────────────────────────────────────────────
 * Get votes for a proposal
 * ───────────────────────────────────────────── */
router.get('/:proposalId', async (req: Request, res: Response) => {
  try {
    const proposalId = BigInt(req.params.proposalId);
    const votes = await votesService.getVotes(proposalId);
    res.json(votes);
  } catch (err: any) {
    console.error('Get votes error:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────
 * Get results for a proposal
 * ───────────────────────────────────────────── */
router.get('/:proposalId/results', async (req: Request, res: Response) => {
  try {
    const proposalId = BigInt(req.params.proposalId);
    const results = await votesService.getResults(proposalId);
    res.json(results);
  } catch (err: any) {
    console.error('Get results error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
