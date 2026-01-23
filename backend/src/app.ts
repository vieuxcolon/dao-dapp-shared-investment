/* ─────────────────────────────────────────────
 * app.ts
 * ───────────────────────────────────────────── */

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan'; // ensure @types/morgan installed

// Routes
import { createProposalsRouter } from './modules/proposals/proposals.routes';
import createVotesRouter from './modules/votes/votes.routes'; // default export
import { createDaoRouter } from './modules/dao/dao.routes';
import { createTreasuryRouter } from './modules/treasury/treasury.routes';

// Services
import { ProposalsService } from './modules/proposals/proposals.service';
import { TreasuryService } from './modules/treasury/treasury.service';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.use(morgan('dev'));

  // Initialize services
  const proposalsService = new ProposalsService();
  const treasuryService = new TreasuryService();

  // Mount routers
  app.use('/api/proposals', createProposalsRouter(proposalsService));
  app.use('/api/votes', createVotesRouter()); // default export returns Router
  app.use('/api/dao', createDaoRouter());     // default or named export returns Router
  app.use('/api/treasury', createTreasuryRouter(treasuryService));

  app.get('/', (_, res) => {
    res.send('DAO Dapp Backend Running 🚀');
  });

  return app;
}
