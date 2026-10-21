import { describe, it, expect } from 'vitest';
import { initialRestaurantSettings } from '../src/mocks/mockSettings';

describe('Delivery Zones, Minimum Order & Kitchen Hours Constraints', () => {
  it('correctly maps delivery zones and fee rules', () => {
    const zones = initialRestaurantSettings.deliveryZones;
    const naseerabad = zones.find(z => z.id === 'naseerabad')!;
    const westridge = zones.find(z => z.id === 'westridge')!;
    const bahria = zones.find(z => z.id === 'bahria')!;

    expect(naseerabad.fee).toBe(0);
    expect(naseerabad.minOrder).toBe(500);

    expect(westridge.fee).toBe(0);
    expect(westridge.minOrder).toBe(800);

    expect(bahria.fee).toBe(250);
    expect(bahria.minOrder).toBe(1500);
  });

  it('determines kitchen open status within 2:00 AM to 3:00 PM operating hours', () => {
    const hours = initialRestaurantSettings.hours;
    expect(hours.openHour).toBe(2);
    expect(hours.closeHour).toBe(15);

    const checkIsOpen = (hour: number) => hour >= hours.openHour && hour < hours.closeHour;

    expect(checkIsOpen(2)).toBe(true); // 2 AM (Open)
    expect(checkIsOpen(10)).toBe(true); // 10 AM (Open)
    expect(checkIsOpen(14)).toBe(true); // 2 PM (Open)
    expect(checkIsOpen(15)).toBe(false); // 3 PM (Closed)
    expect(checkIsOpen(20)).toBe(false); // 8 PM (Closed)
    expect(checkIsOpen(1)).toBe(false); // 1 AM (Closed)
  });

  it('validates minimum order shortfall calculation', () => {
    const minRequired = 1000;
    const currentCart = 750;
    const hasShortfall = currentCart < minRequired;
    const shortfall = minRequired - currentCart;

    expect(hasShortfall).toBe(true);
    expect(shortfall).toBe(250);
  });
});
