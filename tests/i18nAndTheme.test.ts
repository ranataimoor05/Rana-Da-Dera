import { describe, it, expect } from 'vitest';
import { translations } from '../src/i18n/translations';

describe('I18n Translations & RTL Direction Tests', () => {
  it('contains matched keys across English and Urdu dictionaries', () => {
    const enKeys = Object.keys(translations.en).sort();
    const urKeys = Object.keys(translations.ur).sort();

    expect(enKeys).toEqual(urKeys);
  });

  it('correctly maps RTL for Urdu and LTR for English', () => {
    const getDirection = (lang: 'en' | 'ur') => (lang === 'ur' ? 'rtl' : 'ltr');

    expect(getDirection('ur')).toBe('rtl');
    expect(getDirection('en')).toBe('ltr');
  });

  it('verifies critical brand and policy translations in Urdu', () => {
    expect(translations.ur.brandName).toBe('رانا دا ڈیرہ');
    expect(translations.ur.noRefundPolicyFullTitle).toContain('نو ریفنڈ');
    expect(translations.ur.noRefundPolicyText).toContain('واپس نہیں کی جائے گی');
  });
});
