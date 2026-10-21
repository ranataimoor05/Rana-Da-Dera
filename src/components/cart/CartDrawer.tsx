import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useI18n } from '../../i18n/I18nContext';
import { formatCurrency } from '../../utils/currency';
import './CartDrawer.css';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeItem,
    pricing,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError
  } = useCart();
  const { t, language, direction } = useI18n();
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const ok = applyCoupon(couponCodeInput);
    if (ok) {
      setCouponCodeInput('');
    }
  };

  const handleCheckoutClick = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  return (
    <>
      {/* Drawer Backdrop */}
      <div
        className={`cart-drawer-backdrop ${isCartDrawerOpen ? 'open' : ''}`}
        onClick={closeCartDrawer}
        aria-hidden="true"
      />

      {/* Cart Drawer */}
      <aside
        className={`cart-drawer ${isCartDrawerOpen ? 'open' : ''}`}
        aria-label="Shopping Cart Drawer"
        role="dialog"
        aria-modal="true"
      >
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <ShoppingBag size={22} className="gold-text" />
            <span>{t('cartTitle')}</span>
          </div>
          <button
            onClick={closeCartDrawer}
            className="cart-drawer-close"
            aria-label="Close cart drawer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">
                <ShoppingBag size={36} />
              </div>
              <h3 className="serif-title">{t('cartEmptyTitle')}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('cartEmptyDesc')}</p>
              <button
                onClick={() => {
                  closeCartDrawer();
                  navigate('/menu');
                }}
                className="btn-checkout-primary"
                style={{ marginTop: '12px' }}
              >
                <span>{t('startOrdering')}</span>
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.cartItemId} className="cart-item-card">
                <img src={item.image} alt={language === 'ur' ? item.nameUr : item.nameEn} className="cart-item-img" />
                <div className="cart-item-info">
                  <div>
                    <h4 className="cart-item-name">{language === 'ur' ? item.nameUr : item.nameEn}</h4>
                    {item.selectedOptions.length > 0 && (
                      <div className="cart-item-customizations">
                        {item.selectedOptions.map(opt => (
                          <div key={opt.optionId}>
                            • {opt.optionNameEn} {opt.priceDelta > 0 && `(+${formatCurrency(opt.priceDelta)})`}
                          </div>
                        ))}
                      </div>
                    )}
                    {item.specialInstructions && (
                      <div className="cart-item-instructions">"{item.specialInstructions}"</div>
                    )}
                  </div>

                  <div className="cart-item-bottom">
                    <span className="cart-item-price">{formatCurrency(item.finalUnitPrice * item.quantity)}</span>
                    <div className="qty-controls">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        {item.quantity === 1 ? <Trash2 size={13} color="#ef4444" /> : <Minus size={13} />}
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Coupon Code Section */}
            {appliedCoupon ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(34, 197, 94, 0.1)',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80' }}>
                  <Tag size={16} />
                  <span>{appliedCoupon.code} applied (-{formatCurrency(pricing.discount)})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  style={{ color: '#ef4444', fontSize: '0.8rem', textDecoration: 'underline' }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="coupon-section">
                <input
                  type="text"
                  placeholder={t('enterCoupon')}
                  value={couponCodeInput}
                  onChange={e => setCouponCodeInput(e.target.value)}
                  className="coupon-input"
                  aria-label="Coupon code input"
                />
                <button type="submit" className="btn-coupon">
                  {t('applyCoupon')}
                </button>
              </form>
            )}

            {couponError && (
              <div style={{ color: 'var(--color-danger)', fontSize: '0.78rem', marginTop: '-4px' }}>
                {couponError}
              </div>
            )}

            {/* Pricing Breakdown */}
            <div className="pricing-summary">
              <div className="pricing-row">
                <span>{t('subtotal')}</span>
                <span>{formatCurrency(pricing.subtotal)}</span>
              </div>
              {pricing.discount > 0 && (
                <div className="pricing-row" style={{ color: '#4ade80' }}>
                  <span>{t('discount')}</span>
                  <span>-{formatCurrency(pricing.discount)}</span>
                </div>
              )}
              <div className="pricing-row">
                <span>{t('deliveryFee')}</span>
                <span style={{ color: '#4ade80' }}>Calculated at checkout</span>
              </div>
              <div className="pricing-row total-row">
                <span>{t('total')}</span>
                <span className="gold-text">{formatCurrency(pricing.total)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button onClick={handleCheckoutClick} className="btn-checkout-primary">
              <span>{t('proceedToCheckout')}</span>
              {direction === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
