// backend/src/utils/helpers.ts
// Common helper functions for backend

/**
 * Safely parse a JSON string, return null if invalid
 */
export function safeParseJSON<T>(json: string | undefined | null): T | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch (err) {
    console.error("JSON parse error:", err);
    return null;
  }
}

/**
 * Format a BigInt or string number from smart contract to readable string
 */
export function formatTokenAmount(amount: bigint | string, decimals = 18): string {
  const bigAmount = typeof amount === "string" ? BigInt(amount) : amount;
  const divisor = BigInt(10) ** BigInt(decimals);
  const integer = bigAmount / divisor;
  const fraction = bigAmount % divisor;
  return `${integer.toString()}.${fraction.toString().padStart(decimals, "0")}`;
}

/**
 * Sleep / delay helper
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generic error handler for async routes
 */
export async function handleAsync<T>(fn: () => Promise<T>): Promise<[T | null, any | null]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (err) {
    console.error("Async handler error:", err);
    return [null, err];
  }
}

/**
 * Convert wei to ether (for readability)
 */
export function weiToEther(wei: bigint | string): string {
  return formatTokenAmount(wei, 18);
}

/**
 * Convert ether to wei (as BigInt)
 */
export function etherToWei(ether: number | string): bigint {
  const [whole, fraction = "0"] = ether.toString().split(".");
  const wei = BigInt(whole) * BigInt(10 ** 18) + BigInt(fraction.padEnd(18, "0"));
  return wei;
}
