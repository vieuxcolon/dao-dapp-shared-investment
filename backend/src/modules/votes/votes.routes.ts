import { Router } from 'express';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';

const votesService = new VotesService();
const votesController = new VotesController(votesService);
const router = Router();

router.post('/vote', (req, res) => votesController.vote(req, res));
router.get('/:proposalId', (req, res) => votesController.getVotes(req, res));
router.get('/:proposalId/results', (req, res) => votesController.getResults(req, res));

export default router;
