/**
 * Exact presentation style required: "Rs. 1,250"
 * Formats numeric values to Pakistani Rupees with thousands separators.
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return 'Rs. 0';
  }
  const rounded = Math.round(amount);
  const formattedNumber = new Intl.NumberFormat('en-PK').format(rounded);
  return `Rs. ${formattedNumber}`;
}

/**
 * Parses numeric price from currency string or raw number
 */
export function parsePrice(val: string | number): number {
  if (typeof val === 'number') return val;
  // Remove commas
  const withoutCommas = val.replace(/,/g, '');
  // Match first valid float/integer number
  const match = withoutCommas.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}
