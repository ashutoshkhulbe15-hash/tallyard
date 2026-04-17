/**
 * Number formatting utilities. All user-facing numbers go through these
 * to avoid JS float artifacts (0.1 + 0.2 = 0.30000000000000004).
 */

/** Round to N decimal places. Use for most display numbers. */
export function round(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Round up to the nearest practical purchase unit. */
export function roundUp(value: number, decimals: number = 1): number {
  const factor = Math.pow(10, decimals);
  return Math.ceil(value * factor) / factor;
}

/** Format a number with thousand separators. */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/** Format as integer with commas. */
export function formatInt(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}

/** Format for currency (USD). */
export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
