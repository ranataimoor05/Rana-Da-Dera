import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bike,
  ShoppingBag,
  Clock,
  ShieldAlert,
  CreditCard,
  Banknote,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  MapPin,
  Lock
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useCart } from '../context/CartContext';
import { useRestaurant } from '../context/RestaurantContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { FulfillmentType, PaymentMethodType } from '../types/order';
import { formatCurrency } from '../utils/currency';
import './CheckoutPage.css';

export const CheckoutPage: React.FC = () => {
  const { t, language } = useI18n();
  const { items, pricing, clearCart } = useCart();
  const { settings, isKitchenOpen } = useRestaurant();
  const { placeOrder, retryOrderPayment, lastPaymentError, clearPaymentError } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  // State
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('delivery');
  const [timingType, setTimingType] = useState<'asap' | 'scheduled'>('asap');
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split('T')[0]);
  const [scheduledTime, setScheduledTime] = useState('13:00');

  // Contact Info
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '0301-4431520');
  const [email, setEmail] = useState(user?.email || '');

  // Delivery Address
  const [selectedZoneId, setSelectedZoneId] = useState(user?.savedAddress?.zoneId || 'naseerabad');
  const [addressLine, setAddressLine] = useState(user?.savedAddress?.addressLine || '');
  const [landmark, setLandmark] = useState(user?.savedAddress?.landmark || '');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('cod');
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [policyAcknowledged, setPolicyAcknowledged] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Selected Delivery Zone lookup
  const currentZone = settings.deliveryZones.find(z => z.id === selectedZoneId) || settings.deliveryZones[0];
  const activeDeliveryFee = fulfillment === 'delivery' ? currentZone.fee : 0;
  const activeMinOrder = fulfillment === 'delivery' ? currentZone.minOrder : settings.minOrderAmount;

  // Recalculate grand total with active delivery fee
  const finalGrandTotal = pricing.subtotal - pricing.discount + activeDeliveryFee + pricing.tax;

  // Minimum order validation check
  const hasMinOrderShortfall = pricing.subtotal < activeMinOrder;
  const shortfallAmount = activeMinOrder - pricing.subtotal;

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <ShoppingBag size={56} className="gold-text" style={{ margin: '0 auto 16px' }} />
          <h2 className="serif-title" style={{ fontSize: '2rem' }}>{t('cartEmptyTitle')}</h2>
          <p style={{ color: 'var(--text-muted)', margin: '10px 0 24px' }}>{t('cartEmptyDesc')}</p>
          <Link to="/menu" className="btn-hero-primary">
            <span>{t('startOrdering')}</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    clearPaymentError();

    // Validations
    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please provide a contact phone number for delivery coordination.');
      return;
    }
    if (fulfillment === 'delivery' && !addressLine.trim()) {
      setFormError('Please provide your street or house address.');
      return;
    }
    if (hasMinOrderShortfall) {
      setFormError(`Minimum order amount for ${currentZone.nameEn} is ${formatCurrency(activeMinOrder)}.`);
      return;
    }
    if (!policyAcknowledged) {
      setFormError('Please acknowledge the restaurant no-refund policy before placing the order.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await placeOrder({
        fulfillmentType: fulfillment,
        deliveryDetails: fulfillment === 'delivery' ? {
          fullName,
          phone,
          addressLine,
          zoneId: currentZone.id,
          zoneName: currentZone.nameEn,
          city: 'Rawalpindi',
          landmark,
          deliveryNotes
        } : undefined,
        pickupDetails: fulfillment === 'pickup' ? {
          fullName,
          phone,
          pickupTimePreference: timingType === 'asap' ? 'ASAP (20-30 Mins)' : `${scheduledDate} at ${scheduledTime}`,
          pickupNotes: deliveryNotes
        } : undefined,
        items,
        subtotal: pricing.subtotal,
        discount: pricing.discount,
        couponCode: pricing.couponCode,
        deliveryFee: activeDeliveryFee,
        tax: pricing.tax,
        total: finalGrandTotal,
        paymentMethod,
        simulatePaymentFailure: simulateFailure
      });

      if (res.success && res.order) {
        clearCart();
        navigate(`/order-confirmation/${res.order.id}`);
      } else if (res.error) {
        setFormError(res.error);
      }
    } catch (err: any) {
      setFormError('An unexpected error occurred while placing your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.4rem', marginBottom: '8px' }}>
          {t('checkoutTitle')}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          Freshly cooked from our Naseerabad kitchen. Review fulfillment details and confirm your feast.
        </p>

        {/* Global Error Banner */}
        {(formError || lastPaymentError) && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              color: '#fca5a5'
            }}
          >
            <AlertTriangle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                {lastPaymentError ? t('paymentFailedTitle') : 'Action Required'}
              </div>
              <div style={{ fontSize: '0.88rem', marginTop: '4px' }}>
                {formError || lastPaymentError}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="checkout-grid">
          {/* Main Checkout Form */}
          <div className="checkout-form-main">
            {/* 1. Fulfillment Selector */}
            <div className="checkout-section-box">
              <h2 className="checkout-box-title">
                <Bike size={20} className="gold-text" />
                <span>{t('fulfillmentChoice')}</span>
              </h2>

              <div className="fulfillment-toggle-grid">
                <button
                  type="button"
                  onClick={() => setFulfillment('delivery')}
                  className={`fulfillment-btn ${fulfillment === 'delivery' ? 'active' : ''}`}
                >
                  <Bike size={24} />
                  <span>{t('deliveryOption')}</span>
                  <small style={{ fontSize: '0.78rem', opacity: 0.8 }}>Hot Express across Rawalpindi</small>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillment('pickup')}
                  className={`fulfillment-btn ${fulfillment === 'pickup' ? 'active' : ''}`}
                >
                  <ShoppingBag size={24} />
                  <span>{t('pickupOption')}</span>
                  <small style={{ fontSize: '0.78rem', opacity: 0.8 }}>Pick up at Naseerabad counter</small>
                </button>
              </div>

              {/* Order Timing: ASAP vs Scheduled */}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <label className="form-label">{t('orderTiming')}</label>
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="radio"
                      name="timing"
                      checked={timingType === 'asap'}
                      onChange={() => setTimingType('asap')}
                    />
                    <span>{t('orderAsap')}</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="radio"
                      name="timing"
                      checked={timingType === 'scheduled'}
                      onChange={() => setTimingType('scheduled')}
                    />
                    <span>{t('orderScheduled')}</span>
                  </label>
                </div>

                {timingType === 'scheduled' && (
                  <div className="form-grid-2" style={{ marginTop: '14px' }}>
                    <div className="form-group">
                      <label className="form-label">{t('selectDate')}</label>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={e => setScheduledDate(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('selectTimeSlot')}</label>
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={e => setScheduledTime(e.target.value)}
                        className="form-input"
                      />
                      <small style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                        Kitchen operational between {settings.hours.labelEn}
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Customer & Address Details */}
            <div className="checkout-section-box">
              <h2 className="checkout-box-title">
                <MapPin size={20} className="gold-text" />
                <span>{fulfillment === 'delivery' ? t('deliveryAddress') : t('contactDetails')}</span>
              </h2>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">{t('fullName')} *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Chaudhry Taimoor"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('phoneNumber')} *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="0301-4431520"
                    className="form-input"
                  />
                </div>
              </div>

              {fulfillment === 'delivery' ? (
                <>
                  <div className="form-group">
                    <label className="form-label">{t('selectArea')} *</label>
                    <select
                      value={selectedZoneId}
                      onChange={e => setSelectedZoneId(e.target.value)}
                      className="form-select"
                    >
                      {settings.deliveryZones.map(zone => (
                        <option key={zone.id} value={zone.id}>
                          {language === 'ur' ? zone.nameUr : zone.nameEn} ({zone.fee === 0 ? 'FREE' : `Rs. ${zone.fee}`} - Min: Rs. {zone.minOrder})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('streetAddress')} *</label>
                    <input
                      type="text"
                      required
                      value={addressLine}
                      onChange={e => setAddressLine(e.target.value)}
                      placeholder="House / Flat / Street / Block"
                      className="form-input"
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">{t('landmark')}</label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={e => setLandmark(e.target.value)}
                        placeholder="Near Dera Chowk / School"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('deliveryNotes')}</label>
                      <input
                        type="text"
                        value={deliveryNotes}
                        onChange={e => setDeliveryNotes(e.target.value)}
                        placeholder="e.g. Ring bell twice, deliver to 2nd floor"
                        className="form-input"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ color: 'var(--color-gold-400)', marginBottom: '6px' }}>{t('pickupLocationTitle')}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    {t('pickupAddressNotice')}
                  </p>
                </div>
              )}
            </div>

            {/* 3. Payment Method */}
            <div className="checkout-section-box">
              <h2 className="checkout-box-title">
                <CreditCard size={20} className="gold-text" />
                <span>{t('paymentTitle')}</span>
              </h2>

              <div className="payment-methods-list">
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`payment-method-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                >
                  <div className="payment-method-left">
                    <Banknote size={22} className="gold-text" />
                    <div>
                      <div style={{ fontWeight: 700 }}>{t('payCod')}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t('codNotice')}</div>
                    </div>
                  </div>
                  {paymentMethod === 'cod' && <CheckCircle2 size={18} className="gold-text" />}
                </div>

                <div
                  onClick={() => setPaymentMethod('jazzcash')}
                  className={`payment-method-card ${paymentMethod === 'jazzcash' ? 'active' : ''}`}
                >
                  <div className="payment-method-left">
                    <CreditCard size={22} color="#dc2626" />
                    <div>
                      <div style={{ fontWeight: 700 }}>{t('payJazzCash')}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Instant mobile wallet transfer</div>
                    </div>
                  </div>
                  {paymentMethod === 'jazzcash' && <CheckCircle2 size={18} className="gold-text" />}
                </div>

                <div
                  onClick={() => setPaymentMethod('easypaisa')}
                  className={`payment-method-card ${paymentMethod === 'easypaisa' ? 'active' : ''}`}
                >
                  <div className="payment-method-left">
                    <CreditCard size={22} color="#16a34a" />
                    <div>
                      <div style={{ fontWeight: 700 }}>{t('payEasypaisa')}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Telenor Microfinance wallet</div>
                    </div>
                  </div>
                  {paymentMethod === 'easypaisa' && <CheckCircle2 size={18} className="gold-text" />}
                </div>

                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`payment-method-card ${paymentMethod === 'card' ? 'active' : ''}`}
                >
                  <div className="payment-method-left">
                    <Lock size={22} color="#3b82f6" />
                    <div>
                      <div style={{ fontWeight: 700 }}>{t('payCard')}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Visa / Mastercard debit or credit card</div>
                    </div>
                  </div>
                  {paymentMethod === 'card' && <CheckCircle2 size={18} className="gold-text" />}
                </div>
              </div>

              {/* Dev / QA Toggle: Simulate Payment Failure */}
              <div style={{ marginTop: '14px', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  Demo QA: Simulate Payment Gateway Failure
                </span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={simulateFailure}
                    onChange={e => setSimulateFailure(e.target.checked)}
                  />
                  <span>Trigger Decline Error</span>
                </label>
              </div>

              {/* 4. Mandatory No-Refund Policy Disclosure */}
              <div className="no-refund-callout">
                <div className="no-refund-header">
                  <ShieldAlert size={18} />
                  <span>{t('noRefundBannerTitle')}</span>
                </div>
                <p className="no-refund-text">
                  {language === 'ur' ? settings.noRefundPolicySummaryUr : settings.noRefundPolicySummaryEn}
                </p>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  <input
                    type="checkbox"
                    required
                    checked={policyAcknowledged}
                    onChange={e => setPolicyAcknowledged(e.target.checked)}
                    style={{ marginTop: '3px' }}
                  />
                  <span>{t('noRefundAcknowledgment')}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar: Order Summary & Place Order Action */}
          <aside className="order-summary-sidebar">
            <div className="checkout-section-box">
              <h3 className="serif-title" style={{ fontSize: '1.25rem', marginBottom: '14px' }}>
                Order Summary
              </h3>

              <div className="summary-items-list">
                {items.map(item => (
                  <div key={item.cartItemId} className="summary-item-row">
                    <div>
                      <span>{item.quantity}x {language === 'ur' ? item.nameUr : item.nameEn}</span>
                      {item.selectedOptions.length > 0 && (
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {item.selectedOptions.map(o => o.optionNameEn).join(', ')}
                        </div>
                      )}
                    </div>
                    <span style={{ fontWeight: 700 }}>{formatCurrency(item.finalUnitPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>{t('subtotal')}</span>
                  <span>{formatCurrency(pricing.subtotal)}</span>
                </div>
                {pricing.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80' }}>
                    <span>{t('discount')} ({pricing.couponCode})</span>
                    <span>-{formatCurrency(pricing.discount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>{t('deliveryFee')}</span>
                  <span>{activeDeliveryFee === 0 ? t('freeDelivery') : formatCurrency(activeDeliveryFee)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-glass)' }}>
                  <span>{t('total')}</span>
                  <span className="gold-text">{formatCurrency(finalGrandTotal)}</span>
                </div>
              </div>

              {/* Minimum Order Shortfall Notice */}
              {hasMinOrderShortfall && (
                <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid #ef4444', borderRadius: 'var(--radius-sm)', color: '#fca5a5', fontSize: '0.8rem' }}>
                  {t('minimumOrderShortfall')} <strong>{formatCurrency(activeMinOrder)}</strong>. Please add {formatCurrency(shortfallAmount)} more to meet zone minimum.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || hasMinOrderShortfall}
                className="btn-checkout-primary"
                style={{ marginTop: '20px', width: '100%' }}
              >
                {submitting ? t('orderSubmitting') : t('placeOrderNow')}
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '10px' }}>
                🔒 256-Bit Encrypted Demo Transaction
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};
