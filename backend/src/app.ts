// backend/src/app.ts
import express, { Application, json } from 'express';
import { PrismaClient } from '@prisma/client';
import { json as bodyParserJson } from 'body-parser';
import { DaoController } from './modules/dao/dao.controller';
import { ProposalsController } from './modules/proposals/proposals.controller';
import { VotesController } from './modules/votes/votes.controller';
import { TreasuryController } from './modules/treasury/treasury.controller';

export class App {
  public app: Application;
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.app = express();
    this.prisma = prisma;
    this.setupMiddleware();
    this.setupControllers();
  }

  private setupMiddleware() {
    this.app.use(bodyParserJson());
    this.app.use(json());
    // Add other global middleware here (CORS, logging, etc.)
  }

  private setupControllers() {
    // Initialize controllers with prisma client
    const daoController = new DaoController(this.prisma);
    const proposalsController = new ProposalsController(this.prisma);
    const votesController = new VotesController(this.prisma);
    const treasuryController = new TreasuryController(this.prisma);

    this.app.use('/api/dao', daoController.router);
    this.app.use('/api/proposals', proposalsController.router);
    this.app.use('/api/votes', votesController.router);
    this.app.use('/api/treasury', treasuryController.router);
  }

  public async init() {
    // Add any async initialization if needed
    // e.g., blockchain clients, background tasks
  }
}
