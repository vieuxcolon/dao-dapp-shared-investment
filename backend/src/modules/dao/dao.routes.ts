import { Router } from 'express';
import { DaoController } from './dao.controller';
import { DaoService } from './dao.service';

export function createDaoRouter(daoService: DaoService) {
  const router = Router();
  const controller = new DaoController(daoService);

  router.post('/', (req, res) => controller.createInvestment(req, res));        // Create investment
  router.get('/:id', (req, res) => controller.getInvestment(req, res));        // Get single investment
  router.get('/', (req, res) => controller.getInvestments(req, res));          // Get all investments

  return router;
}
