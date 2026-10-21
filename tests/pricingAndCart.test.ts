import { describe, it, expect } from 'vitest';
import { initialCoupons } from '../src/mocks/mockSettings';
import { mockDishes } from '../src/mocks/mockMenu';

describe('Pricing, Customizations & Cart Behavior', () => {
  it('calculates dish customization price deltas accurately', () => {
    const karahi = mockDishes.find(d => d.id === 'mutton-karahi')!;
    const portionGroup = karahi.customizationGroups?.find(g => g.id === 'portion-size')!;
    const halfKgOption = portionGroup.options.find(o => o.id === 'half-kg')!;
    const fullKgOption = portionGroup.options.find(o => o.id === 'full-kg')!;

    expect(karahi.price + halfKgOption.priceDelta).toBe(2200);
    expect(karahi.price + fullKgOption.priceDelta).toBe(4200);
  });

  it('validates coupon eligibility and minimum spend requirements', () => {
    const dera10 = initialCoupons.find(c => c.code === 'DERA10')!;
    expect(dera10.minSpend).toBe(1000);

    const subtotalBelow = 800;
    const isEligibleBelow = subtotalBelow >= dera10.minSpend;
    expect(isEligibleBelow).toBe(false);

    const subtotalAbove = 2500;
    const isEligibleAbove = subtotalAbove >= dera10.minSpend;
    expect(isEligibleAbove).toBe(true);

    const calculatedDiscount = Math.round((subtotalAbove * dera10.value) / 100);
    expect(calculatedDiscount).toBe(250);
  });

  it('handles flat discount coupon caps correctly', () => {
    const firstOrder = initialCoupons.find(c => c.code === 'FIRSTORDER')!;
    expect(firstOrder.value).toBe(200);
    expect(firstOrder.minSpend).toBe(1200);

    const cartTotal = 1500;
    const finalTotal = cartTotal - firstOrder.value;
    expect(finalTotal).toBe(1300);
  });
});
