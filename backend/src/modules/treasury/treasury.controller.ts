// backend/src/modules/treasury/treasury.controller.ts
import { Router, Request, Response } from 'express';
import { TreasuryService } from './treasury.service';

export class TreasuryController {
  public router: Router;
  private treasuryService: TreasuryService;

  constructor(treasuryService: TreasuryService) {
    this.router = Router();
    this.treasuryService = treasuryService;
    this.registerRoutes();
  }

  private registerRoutes() {
    // ─────────────────────────────
    // Deposit funds
    // ─────────────────────────────
    this.router.post('/deposit', async (req: Request, res: Response) => {
      try {
        const { depositor, amount } = req.body as { depositor: `0x${string}`, amount: string };
        const result = await this.treasuryService.deposit(depositor, BigInt(amount));
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to deposit funds' });
      }
    });

    // ─────────────────────────────
    // Withdraw funds
    // ─────────────────────────────
    this.router.post('/withdraw', async (req: Request, res: Response) => {
      try {
        const { recipient, amount } = req.body as { recipient: `0x${string}`, amount: string };
        const result = await this.treasuryService.withdraw(recipient, BigInt(amount));
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to withdraw funds' });
      }
    });

    // ─────────────────────────────
    // Get treasury balance
    // ─────────────────────────────
    this.router.get('/balance', async (req: Request, res: Response) => {
      try {
        const balance = await this.treasuryService.getBalance();
        res.json({ balance });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch balance' });
      }
    });
  }
}
