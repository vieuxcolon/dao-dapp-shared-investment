// backend/src/modules/proposals/proposals.routes.ts
import { Router } from 'express';
import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './proposals.service';

const router = Router();
const proposalsService = new ProposalsService();
const controller = new ProposalsController(proposalsService);

/* ─────────────────────────────────────────────
 * Proposal routes
 * ───────────────────────────────────────────── */
router.post('/create', (req, res) => controller.createProposal(req, res));
router.post('/vote', (req, res) => controller.vote(req, res));
router.get('/:id', (req, res) => controller.getProposal(req, res));
router.get('/:id/votes', (req, res) => controller.getVotes(req, res));
router.get('/:id/results', (req, res) => controller.getResults(req, res));

export default router;
