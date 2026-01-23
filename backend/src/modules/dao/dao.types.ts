// backend/src/modules/dao/dao.types.ts

/* ─────────────────────────────────────────────
 * DAO Module Types
 * ───────────────────────────────────────────── */

/**
 * Investment object stored off-chain (in DB) for reference
 */
export interface Investment {
  id: bigint;
  investor: `0x${string}`;
  amount: bigint;
  timestamp: number;
  proposalId?: bigint;
}

/**
 * CreateInvestment DTO (data received from frontend)
 */
export interface CreateInvestmentDto {
  investor: `0x${string}`;
  amount: string; // Amount in ETH/wei as string
  proposalId?: bigint;
}

/**
 * Return type for on-chain investment creation
 */
export interface InvestmentTxResult {
  txHash: `0x${string}`;
  status: 'pending' | 'success' | 'failed';
}
