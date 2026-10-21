import { describe, it, expect } from 'vitest';
import { formatCurrency, parsePrice } from '../src/utils/currency';

describe('Currency Utility Tests', () => {
  it('formats exact presentation style "Rs. 1,250" with thousands separator', () => {
    expect(formatCurrency(1250)).toBe('Rs. 1,250');
    expect(formatCurrency(2200)).toBe('Rs. 2,200');
    expect(formatCurrency(3500)).toBe('Rs. 3,500');
    expect(formatCurrency(650)).toBe('Rs. 650');
    expect(formatCurrency(0)).toBe('Rs. 0');
  });

  it('handles negative or null values gracefully', () => {
    expect(formatCurrency(NaN)).toBe('Rs. 0');
    expect(formatCurrency(null as any)).toBe('Rs. 0');
    expect(formatCurrency(undefined as any)).toBe('Rs. 0');
  });

  it('parses numeric price correctly from string representations', () => {
    expect(parsePrice('Rs. 1,250')).toBe(1250);
    expect(parsePrice('2,200')).toBe(2200);
    expect(parsePrice(3500)).toBe(3500);
  });
});
