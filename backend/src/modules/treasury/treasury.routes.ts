// backend/src/modules/treasury/treasury.routes.ts
import { Router, Request, Response } from 'express';
import { TreasuryService } from './treasury.service';

const router = Router();
const treasuryService = new TreasuryService();

/* ─────────────────────────────────────────────
 * Deposit funds
 * ───────────────────────────────────────────── */
router.post('/deposit', async (req: Request, res: Response) => {
  try {
    const { amount, fromAddress } = req.body;
    const txHash = await treasuryService.depositFunds(
      BigInt(amount),
      fromAddress as `0x${string}`,
    );
    res.json({ success: true, txHash });
  } catch (err) {
    console.error('Deposit error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ─────────────────────────────────────────────
 * Withdraw funds
 * ───────────────────────────────────────────── */
router.post('/withdraw', async (req: Request, res: Response) => {
  try {
    const { amount, toAddress } = req.body;
    const txHash = await treasuryService.withdrawFunds(
      BigInt(amount),
      toAddress as `0x${string}`,
    );
    res.json({ success: true, txHash });
  } catch (err) {
    console.error('Withdraw error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ─────────────────────────────────────────────
 * Get treasury balance
 * ───────────────────────────────────────────── */
router.get('/balance', async (_req: Request, res: Response) => {
  try {
    const balance = await treasuryService.getBalance();
    res.json({ balance: balance.toString() });
  } catch (err) {
    console.error('Balance error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
