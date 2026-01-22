import { Router, Request, Response } from 'express';
import { VotesService } from './votes.service';

const router = Router();
const votesService = new VotesService();

/**
 * GET votes for a proposal
 * /votes/:proposalId
 */
router.get('/:proposalId', async (req: Request, res: Response) => {
  try {
    const proposalId = BigInt(req.params.proposalId);
    const votes = await votesService.getVotes(proposalId);
    res.json(votes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch votes' });
  }
});

/**
 * Cast a vote
 * POST /votes
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const vote = await votesService.castVote(req.body);
    res.status(201).json(vote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to cast vote' });
  }
});

export default router;
