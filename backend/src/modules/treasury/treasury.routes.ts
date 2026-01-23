import { Router } from 'express';
import { TreasuryController } from './treasury.controller';
import { TreasuryService } from './treasury.service';

export function createTreasuryRouter(treasuryService: TreasuryService) {
  const router = Router();
  const controller = new TreasuryController(treasuryService);

  // ─────────────────────────────
  // Treasury routes
  // ─────────────────────────────
  router.post('/deposit', (req, res) => controller.deposit(req, res));
  router.post('/withdraw', (req, res) => controller.withdraw(req, res));
  router.get('/balance', (req, res) => controller.getBalance(req, res));

  return router;
}
