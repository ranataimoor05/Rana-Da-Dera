import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, Clock, MapPin, CreditCard, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useOrders } from '../context/OrderContext';
import { formatCurrency } from '../utils/currency';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { t, language, direction } = useI18n();
  const { getOrderById } = useOrders();
  const navigate = useNavigate();

  const order = orderId ? getOrderById(orderId) : undefined;

  if (!order) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <AlertCircle size={48} className="gold-text" style={{ margin: '0 auto 16px' }} />
        <h2 className="serif-title" style={{ fontSize: '1.8rem' }}>Order Reference Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '8px 0 24px' }}>
          We could not locate this order in our local demonstration registry.
        </p>
        <Link to="/menu" className="btn-hero-primary">Browse Royal Menu</Link>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Success Card */}
        <div className="glass-panel" style={{ padding: '36px', textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.15)',
              border: '2px solid #22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#4ade80'
            }}
          >
            <CheckCircle2 size={40} />
          </div>

          <span
            style={{
              display: 'inline-block',
              background: 'rgba(241, 199, 75, 0.15)',
              color: 'var(--color-gold-400)',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              marginBottom: '10px'
            }}
          >
            {t('demoOrderNotice')}
          </span>

          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.2rem', marginBottom: '6px' }}>
            {t('orderConfirmedTitle')}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {t('orderNumber')}: <strong style={{ color: '#fff', letterSpacing: '1px' }}>{order.id}</strong>
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
              fontSize: '0.9rem'
            }}
          >
            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>{t('estimatedDelivery')}</span>
              <strong className="gold-text">{order.estimatedTime}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>Payment Status</span>
              <strong style={{ color: order.paymentStatus === 'successful' ? '#4ade80' : '#f59e0b' }}>
                {order.paymentStatus.toUpperCase()} ({order.paymentMethod.toUpperCase()})
              </strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.78rem' }}>Fulfillment</span>
              <strong>{order.fulfillmentType === 'delivery' ? 'Home Delivery' : 'Takeaway Pickup'}</strong>
            </div>
          </div>
        </div>

        {/* Itemized Order Details */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px' }}>
          <h2 className="serif-title" style={{ fontSize: '1.3rem', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
            Itemized Culinary Order
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {order.items.map(item => (
              <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img src={item.image} alt={item.nameEn} style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                      {item.quantity}x {language === 'ur' ? item.nameUr : item.nameEn}
                    </h4>
                    {item.selectedOptions.length > 0 && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {item.selectedOptions.map(o => o.optionNameEn).join(' • ')}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--text-gold)' }}>
                  {formatCurrency(item.finalUnitPrice * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>{t('subtotal')}</span>
              <span>{formatCurrency(order.pricing.subtotal)}</span>
            </div>
            {order.pricing.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80' }}>
                <span>{t('discount')} ({order.pricing.couponCode})</span>
                <span>-{formatCurrency(order.pricing.discount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>{t('deliveryFee')}</span>
              <span>{order.pricing.deliveryFee === 0 ? t('freeDelivery') : formatCurrency(order.pricing.deliveryFee)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-glass)' }}>
              <span>{t('total')}</span>
              <span className="gold-text">{formatCurrency(order.pricing.total)}</span>
            </div>
          </div>
        </div>

        {/* Destination Information */}
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>
            {order.fulfillmentType === 'delivery' ? 'Delivery Destination' : 'Takeaway Counter'}
          </h3>
          {order.deliveryDetails ? (
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              <div><strong>Recipient:</strong> {order.deliveryDetails.fullName} ({order.deliveryDetails.phone})</div>
              <div><strong>Address:</strong> {order.deliveryDetails.addressLine}, {order.deliveryDetails.zoneName}, Rawalpindi</div>
              {order.deliveryDetails.landmark && <div><strong>Landmark:</strong> {order.deliveryDetails.landmark}</div>}
              {order.deliveryDetails.deliveryNotes && <div><strong>Instructions:</strong> {order.deliveryDetails.deliveryNotes}</div>}
            </div>
          ) : (
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div><strong>Pickup Location:</strong> Rana Da Dera Kitchen, Naseerabad, Rawalpindi</div>
              <div><strong>Contact:</strong> {order.pickupDetails?.fullName} ({order.pickupDetails?.phone})</div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link
            to={`/track/${order.id}`}
            className="btn-hero-primary"
            style={{ flex: 1, minWidth: '220px', textAlign: 'center' }}
          >
            <span>{t('trackOrder')}</span>
            {direction === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </Link>

          <Link
            to="/menu"
            className="btn-hero-secondary"
            style={{ flex: 1, minWidth: '220px', textAlign: 'center' }}
          >
            <span>{t('backToMenu')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
