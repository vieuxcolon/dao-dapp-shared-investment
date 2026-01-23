// backend/src/modules/dao/dao.controller.ts
import { Router, Request, Response } from 'express';
import { DaoService } from './dao.service';

export class DaoController {
  public router: Router;
  private daoService: DaoService;

  constructor(daoService: DaoService) {
    this.router = Router();
    this.daoService = daoService;
    this.registerRoutes();
  }

  private registerRoutes() {
    // ─────────────────────────────
    // Create investment
    // ─────────────────────────────
    this.router.post('/investments', async (req: Request, res: Response) => {
      try {
        const { name, amount, signer } = req.body;
        const result = await this.daoService.createInvestment(
          name,
          BigInt(amount),
          signer
        );
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create investment' });
      }
    });

    // ─────────────────────────────
    // Get single investment
    // ─────────────────────────────
    this.router.get('/investments/:id', async (req: Request, res: Response) => {
      try {
        const investmentId = BigInt(req.params.id);
        const result = await this.daoService.getInvestment(investmentId);
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch investment' });
      }
    });

    // ─────────────────────────────
    // Get all investments
    // ─────────────────────────────
    this.router.get('/investments', async (_req: Request, res: Response) => {
      try {
        const result = await this.daoService.getAllInvestments();
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch investments' });
      }
    });
  }
}
