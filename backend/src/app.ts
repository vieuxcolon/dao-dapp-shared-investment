/* ─────────────────────────────────────────────
 * app.ts
 * ───────────────────────────────────────────── */

import express from 'express';
import helmet from 'helmet';  // make sure to install: npm install helmet
import morgan from 'morgan';  // make sure to install: npm install morgan

// Routes
import { createProposalsRouter } from './modules/proposals/proposals.routes';
import createVotesRouter from './modules/votes/votes.routes'; // default export assumed
import { createDaoRouter } from './modules/dao/dao.routes';   // make sure dao.routes exports this
import { createTreasuryRouter } from './modules/treasury/treasury.routes';

import { ProposalsService } from './modules/proposals/proposals.service';
import { TreasuryService } from './modules/treasury/treasury.service';

export const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Initialize services
const proposalsService = new ProposalsService();
const treasuryService = new TreasuryService();

// Mount routers with services
app.use('/api/proposals', createProposalsRouter(proposalsService));
app.use('/api/votes', createVotesRouter()); // default export assumed
app.use('/api/dao', createDaoRouter());     // adjust if dao router requires service
app.use('/api/treasury', createTreasuryRouter(treasuryService));

app.get('/', (_, res) => {
  res.send('DAO Dapp Backend Running 🚀');
});
