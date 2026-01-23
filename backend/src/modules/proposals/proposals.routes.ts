// backend/src/modules/proposals/proposals.routes.ts
import { Router, Request, Response } from 'express';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto, VoteDto } from './dto';

const router = Router();
const proposalsService = new ProposalsService();

/* ─────────────────────────────────────────────
 * Create a new proposal
 * ───────────────────────────────────────────── */
router.post('/create', async (req: Request, res: Response) => {
  try {
    const { signer, data } = req.body as { signer: `0x${string}`; data: CreateProposalDto };
    const result = await proposalsService.createProposal(signer, data);
    res.json(result);
  } catch (err: any) {
    console.error('Create proposal error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ─────────────────────────────────────────────
 * Vote on a proposal
 * ───────────────────────────────────────────── */
router.post('/vote', async (req: Request, res: Response) => {
  try {
    const { voter, data } = req.body as { voter: `0x${string}`; data: VoteDto };
    const result = await proposalsService.vote(voter, data);
    res.json(result);
  } catch (err: any) {
    console.error('Vote error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ─────────────────────────────────────────────
 * Get proposal details
 * ───────────────────────────────────────────── */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const proposalId = BigInt(req.params.id);
    const proposal = await proposalsService.getProposal(proposalId);
    res.json(proposal);
  } catch (err: any) {
    console.error('Get proposal error:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────
 * Get votes for a proposal
 * ───────────────────────────────────────────── */
router.get('/:id/votes', async (req: Request, res: Response) => {
  try {
    const proposalId = BigInt(req.params.id);
    const votes = await proposalsService.getVotes(proposalId);
    res.json(votes);
  } catch (err: any) {
    console.error('Get votes error:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ─────────────────────────────────────────────
 * Get proposal results
 * ───────────────────────────────────────────── */
router.get('/:id/results', async (req: Request, res: Response) => {
  try {
    const proposalId = BigInt(req.params.id);
    const results = await proposalsService.getResults(proposalId);
    res.json(results);
  } catch (err: any) {
    console.error('Get results error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
