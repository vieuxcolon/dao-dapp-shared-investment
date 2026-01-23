/* ─────────────────────────────────────────────
 * DAO Module Types
 * ───────────────────────────────────────────── */

/**
 * Investment object stored off-chain (in DB) for reference
 */
export interface Investment {
  id: bigint;                 // Unique investment ID
  investor: `0x${string}`;    // Ethereum address of the investor
  amount: bigint;             // Amount invested (on-chain, in wei)
  timestamp: number;          // Unix timestamp of the investment
  proposalId?: bigint;        // Optional linked proposal ID
}

/**
 * DTO received from frontend to create a new investment
 */
export interface CreateInvestmentDto {
  investor: `0x${string}`;   // Ethereum address of the investor
  amount: string;            // Amount as string (ETH/wei), will be converted to bigint in service
  proposalId?: bigint;       // Optional linked proposal ID
}

/**
 * Return type for on-chain investment creation
 */
export interface InvestmentTxResult {
  txHash: `0x${string}`;     // Transaction hash of the blockchain operation
  status: 'pending' | 'success' | 'failed'; // Status of the transaction
}

