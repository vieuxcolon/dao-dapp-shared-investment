// backend/src/modules/treasury/treasury.routes.ts
import { Router, Request, Response } from 'express';
import { TreasuryService } from './treasury.service';

export function createTreasuryRouter(treasuryService: TreasuryService) {
  const router = Router();

  /* ─────────────────────────────
   * Get treasury balance (GET /balance)
   * ───────────────────────────── */
  router.get('/balance', async (req: Request, res: Response) => {
    try {
      const balance = await treasuryService.getBalance();
      res.json({ success: true, data: balance });
    } catch (err: any) {
      console.error('Get balance error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /* ─────────────────────────────
   * Deposit funds (POST /deposit)
   * ───────────────────────────── */
  router.post('/deposit', async (req: Request, res: Response) => {
    try {
      const { amount, signer } = req.body as { amount: string; signer: `0x${string}` };
      const result = await treasuryService.deposit(BigInt(amount), signer);
      res.json({ success: true, data: result });
    } catch (err: any) {
      console.error('Deposit error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /* ─────────────────────────────
   * Withdraw funds (POST /withdraw)
   * ───────────────────────────── */
  router.post('/withdraw', async (req: Request, res: Response) => {
    try {
      const { amount, signer } = req.body as { amount: string; signer: `0x${string}` };
      const result = await treasuryService.withdraw(BigInt(amount), signer);
      res.json({ success: true, data: result });
    } catch (err: any) {
      console.error('Withdraw error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
}
