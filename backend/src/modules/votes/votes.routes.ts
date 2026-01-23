// backend/src/modules/votes/votes.routes.ts
import { Router } from 'express';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';

const votesService = new VotesService();
const votesController = new VotesController(votesService);

const router = Router();

/* ─────────────────────────────
 * Cast a vote (POST /vote)
 * ───────────────────────────── */
router.post('/vote', (req, res) => votesController.vote(req, res));

/* ─────────────────────────────
 * Get votes for a proposal (GET /:proposalId)
 * ───────────────────────────── */
router.get('/:proposalId', (req, res) => votesController.getVotes(req, res));

/* ─────────────────────────────
 * Get voting results for a proposal (GET /:proposalId/results)
 * ───────────────────────────── */
router.get('/:proposalId/results', (req, res) => votesController.getResults(req, res));

export default router;
