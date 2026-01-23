/* ─────────────────────────────────────────────
 * DAO Module Types
 * ───────────────────────────────────────────── */

/**
 * Investment object stored off-chain (in DB) for reference
 */
export interface Investment {
  id: bigint;                     // Unique investment ID
  investor: `0x${string}`;        // Ethereum address
  amount: bigint;                  // Amount in wei
  timestamp: bigint;               // Timestamp in milliseconds or seconds as bigint
  proposalId?: bigint;             // Optional associated proposal
}

/**
 * CreateInvestment DTO (data received from frontend)
 */
export interface CreateInvestmentDto {
  investor: `0x${string}`;        // Ethereum address
  amount: string;                  // Amount in ETH/wei as string
  proposalId?: bigint;             // Optional associated proposal
}

/**
 * Return type for on-chain investment creation
 */
export interface InvestmentTxResult {
  txHash: `0x${string}`;          // Transaction hash
  status: InvestmentTxStatus;      // Transaction status
}

/**
 * Transaction status enum
 */
export type InvestmentTxStatus = 'pending' | 'success' | 'failed';
