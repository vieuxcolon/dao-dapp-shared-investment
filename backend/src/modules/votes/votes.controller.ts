import { Router, Request, Response } from 'express';
import { VotesService } from './votes.service';

const router = Router();
const votesService = new VotesService();

// GET all votes
router.get('/', async (_req: Request, res: Response) => {
  try {
    const votes = await votesService.getAllVotes();
    res.json(votes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch votes' });
  }
});

// GET a single vote by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const vote = await votesService.getVoteById(Number(req.params.id));
    if (!vote) {
      return res.status(404).json({ message: 'Vote not found' });
    }
    res.json(vote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch vote' });
  }
});

// POST a new vote
router.post('/', async (req: Request, res: Response) => {
  try {
    const vote = await votesService.createVote(req.body);
    res.status(201).json(vote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create vote' });
  }
});

export default router;
