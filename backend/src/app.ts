import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Import routers
import { createProposalsRouter } from './modules/proposals/proposals.routes';
import { createVotesRouter } from './modules/votes/votes.routes';
import { createDaoRouter } from './modules/dao/dao.routes';
import { createTreasuryRouter } from './modules/treasury/treasury.routes';

// App configuration
export function createApp(): Express {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // ─────────────────────────────
  // Routes
  // ─────────────────────────────
  app.use('/api/proposals', createProposalsRouter());
  app.use('/api/votes', createVotesRouter());
  app.use('/api/dao', createDaoRouter());
  app.use('/api/treasury', createTreasuryRouter());

  // Health check
  app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

  // 404 handler
  app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

  // Error handler
  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  });

  return app;
}

