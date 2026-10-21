import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useCart } from '../context/CartContext';
import { initialCoupons } from '../mocks/mockSettings';
import { formatCurrency } from '../utils/currency';
import { Link } from 'react-router-dom';

export const OffersPage: React.FC = () => {
  const { t, language, direction } = useI18n();
  const { applyCoupon, openCartDrawer } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="offers-page" style={{ padding: '40px 0 80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-subtitle gold-text">Royal Vouchers & Promotions</span>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.6rem' }}>
            {t('navOffers')}
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '8px auto 0' }}>
            Exclusive seasonal discounts, welcome treats, and authentic Punjabi feast deals.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {initialCoupons.map(coupon => (
            <div
              key={coupon.code}
              className="glass-panel"
              style={{
                padding: '28px',
                border: '1px solid var(--color-gold-400)',
                background: 'radial-gradient(circle at top right, rgba(223, 178, 53, 0.12), var(--bg-surface-elevated))',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span
                    style={{
                      background: 'var(--color-gold-400)',
                      color: 'var(--color-primary-950)',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    Active Deal
                  </span>
                  <Tag size={20} className="gold-text" />
                </div>

                <h3 className="serif-title" style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
                  {language === 'ur' ? coupon.labelUr : coupon.labelEn}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  {language === 'ur' ? coupon.descriptionUr : coupon.descriptionEn}
                </p>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '20px' }}>
                  • Minimum spend: {formatCurrency(coupon.minSpend)}<br />
                  • Valid on both delivery and takeaway orders across Rawalpindi.
                </div>
              </div>

              {/* Coupon Box & Action */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--bg-app)',
                  border: '1px dashed var(--color-gold-400)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>VOUCHER CODE</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '1px', color: 'var(--color-gold-400)' }}>
                    {coupon.code}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="btn-hero-primary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check size={16} />
                      <span>Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy & Apply</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link to="/menu" className="btn-hero-primary">
            <span>Explore Menu & Use Vouchers</span>
            {direction === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </Link>
        </div>
      </div>
    </div>
  );
};
