import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  Flame,
  Bike,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useOrders } from '../context/OrderContext';
import { OrderStageType } from '../types/order';
import { formatCurrency } from '../utils/currency';

export const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { t, language, direction } = useI18n();
  const { getOrderById, updateOrderStatus } = useOrders();

  const order = orderId ? getOrderById(orderId) : undefined;

  if (!order) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <AlertCircle size={48} className="gold-text" style={{ margin: '0 auto 16px' }} />
        <h2 className="serif-title" style={{ fontSize: '1.8rem' }}>Order Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '8px 0 24px' }}>
          Please verify the order ID from your confirmation screen or order history.
        </p>
        <Link to="/dashboard" className="btn-hero-primary">Go to Dashboard</Link>
      </div>
    );
  }

  const stages: { key: OrderStageType; labelEn: string; labelUr: string; icon: React.ReactNode }[] = [
    { key: 'received', labelEn: t('stageReceived'), labelUr: 'آرڈر موصول ہو گیا', icon: <Clock size={18} /> },
    { key: 'confirmed', labelEn: t('stageConfirmed'), labelUr: 'کچن تصدیق شدہ', icon: <CheckCircle2 size={18} /> },
    { key: 'preparing', labelEn: t('stagePreparing'), labelUr: 'کڑاہی تیار ہو رہی ہے', icon: <Flame size={18} /> },
    { key: 'out_for_delivery', labelEn: t('stageOutForDelivery'), labelUr: 'ڈیلیوری کے لیے روانہ', icon: <Bike size={18} /> },
    { key: 'completed', labelEn: t('stageCompleted'), labelUr: 'مکمل ہو چکا', icon: <CheckCircle2 size={18} /> }
  ];

  const stageOrder: OrderStageType[] = ['received', 'confirmed', 'preparing', 'out_for_delivery', 'completed'];
  const currentIndex = stageOrder.indexOf(order.currentStage);

  return (
    <div className="order-tracking-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div style={{ marginBottom: '24px' }}>
          <span className="section-subtitle gold-text">Live Status Tracker</span>
          <h1 className="serif-title" style={{ fontSize: '2.2rem' }}>
            Tracking Order #{order.id}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Fulfillment: {order.fulfillmentType === 'delivery' ? 'Express Delivery' : 'Takeaway Pickup'} • Naseerabad Kitchen
          </p>
        </div>

        {/* Visual Progress Timeline */}
        <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '24px' }}>{t('timelineTitle')}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            {stages.map((stage, idx) => {
              const isPassed = idx <= currentIndex;
              const isCurrent = idx === currentIndex;

              return (
                <div key={stage.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: isPassed ? 'var(--color-gold-400)' : 'rgba(255,255,255,0.06)',
                      color: isPassed ? 'var(--color-primary-950)' : 'var(--text-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontWeight: 800,
                      border: isCurrent ? '2px solid #fff' : '1px solid var(--border-subtle)',
                      boxShadow: isCurrent ? '0 0 15px rgba(241, 199, 75, 0.4)' : 'none'
                    }}
                  >
                    {stage.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: isCurrent ? 800 : 600, color: isPassed ? 'var(--text-main)' : 'var(--text-dim)', fontSize: '0.98rem' }}>
                        {language === 'ur' ? stage.labelUr : stage.labelEn}
                      </span>
                      {isCurrent && (
                        <span style={{ fontSize: '0.78rem', background: 'rgba(241, 199, 75, 0.15)', color: 'var(--color-gold-400)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Demo Progression Controller for testing stages */}
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px dashed var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Demo Stage Simulator (Test Live Updates):
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => updateOrderStatus(order.id, 'preparing')}
                className="btn-hero-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                Set Preparing
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                className="btn-hero-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                Set Out for Delivery
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, 'completed')}
                className="btn-hero-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                Set Completed
              </button>
            </div>
          </div>
        </div>

        {/* Order Details & Summary */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>Items in this order</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {order.items.map(i => (
              <div key={i.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span>{i.quantity}x {language === 'ur' ? i.nameUr : i.nameEn}</span>
                <span className="gold-text" style={{ fontWeight: 700 }}>{formatCurrency(i.finalUnitPrice * i.quantity)}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
            <span>Total Paid ({order.paymentMethod.toUpperCase()})</span>
            <span className="gold-text">{formatCurrency(order.pricing.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
