// src/modules/treasury/treasury.routes.ts
import { Router } from 'express';
import { TreasuryService } from './treasury.service';

export function createTreasuryRoutes(treasuryService: TreasuryService) {
  const router = Router();

  // ─────────────────────────────────────────────
  // Deposit funds
  // ─────────────────────────────────────────────
  router.post('/deposit', async (req, res) => {
    const { depositor, amount } = req.body;
    if (!depositor || !amount) {
      return res.status(400).json({ error: 'Missing depositor or amount' });
    }

    try {
      const result = await treasuryService.depositFunds(
        depositor as `0x${string}`,
        BigInt(amount),
      );
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─────────────────────────────────────────────
  // Withdraw funds
  // ─────────────────────────────────────────────
  router.post('/withdraw', async (req, res) => {
    const { recipient, amount } = req.body;
    if (!recipient || !amount) {
      return res.status(400).json({ error: 'Missing recipient or amount' });
    }

    try {
      const result = await treasuryService.withdrawFunds(
        recipient as `0x${string}`,
        BigInt(amount),
      );
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─────────────────────────────────────────────
  // Get treasury balance
  // ─────────────────────────────────────────────
  router.get('/balance', async (_req, res) => {
    try {
      const balance = await treasuryService.getBa
