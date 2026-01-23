//backend/src/modules/dao/dao.controller.ts
import { Request, Response } from 'express';
import { DaoService, Investment } from './dao.service';

export class DaoController {
  constructor(private daoService: DaoService) {}

  /**
   * Create a new investment
   */
  async createInvestment(req: Request, res: Response) {
    try {
      const { signer, amount } = req.body;

      if (!signer || !amount) {
        return res.status(400).json({ error: 'Missing signer or amount' });
      }

      const result = await this.daoService.createInvestment(
        signer,
        BigInt(amount)
      );

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * Get all investments
   */
  async getInvestments(_req: Request, res: Response) {
    try {
      const investments: Investment[] = await this.daoService.getInvestments();
      res.json(investments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * Get single investment by ID
   */
  async getInvestment(req: Request, res: Response) {
    try {
      const id = BigInt(req.params.id);
      const investments: Investment[] = await this.daoService.getInvestments();
      const investment = investments.find(inv => inv.id === id) || null;
      res.json(investment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: (err as Error).message });
    }
  }
}

