// src/modules/dao/dao.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DaoService } from './dao.service';

@Controller('dao')
export class DaoController {
  constructor(private readonly daoService: DaoService) {}

  /* ─────────────────────────────────────────────
   * Create investment
   * ───────────────────────────────────────────── */
  @Post('investments')
  async createInvestment(
    @Body()
    body: {
      name: string;
      amount: string;
      signer: `0x${string}`;
    },
  ) {
    const { name, amount, signer } = body;

    return this.daoService.createInvestment(
      name,
      BigInt(amount),
      signer,
    );
  }

  /* ─────────────────────────────────────────────
   * Get single investment
   * ───────────────────────────────────────────── */
  @Get('investments/:id')
  async getInvestment(@Param('id') id: string) {
    return this.daoService.getInvestment(BigInt(id));
  }

  /* ─────────────────────────────────────────────
   * Get all investments
   * ───────────────────────────────────────────── */
  @Get('investments')
  async getAllInvestments() {
    return this.daoService.getAllInvestments();
  }
}
