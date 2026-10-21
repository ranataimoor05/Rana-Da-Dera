import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingBag,
  CalendarDays,
  UtensilsCrossed,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import { useOrders } from '../../context/OrderContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { formatCurrency } from '../../utils/currency';

export const AdminOverviewPage: React.FC = () => {
  const { t, language, direction } = useI18n();
  const { orders, reservations, updateOrderStatus } = useOrders();
  const { dishes, isKitchenOpen } = useRestaurant();

  const totalGrossSales = orders.reduce((sum, ord) => sum + ord.pricing.total, 0);
  const activeOrders = orders.filter(o => o.currentStage !== 'completed' && o.currentStage !== 'cancelled');
  const pendingReservations = reservations.filter(r => r.status === 'pending');

  return (
    <div className="admin-overview-page">
      <div style={{ marginBottom: '24px' }}>
        <h1 className="serif-title" style={{ fontSize: '2rem' }}>
          Operations & Executive Dashboard
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Real-time metrics, live kitchen pipeline, and dining reservations in Naseerabad.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Gross Sales (Demo Total)</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-gold)' }}>
              {formatCurrency(totalGrossSales)}
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <ShoppingBag size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Active Pipeline Orders</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {activeOrders.length}
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <CalendarDays size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Table Bookings</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {reservations.length}
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <UtensilsCrossed size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Dishes in Catalog</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {dishes.length}
            </div>
          </div>
        </div>
      </div>

      {/* Live Active Orders Queue */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 className="serif-title" style={{ fontSize: '1.3rem' }}>
            Live Orders Pipeline (Kitchen Queue)
          </h2>
          <Link to="/admin/orders" style={{ color: 'var(--color-gold-400)', fontSize: '0.88rem', fontWeight: 700 }}>
            Manage All Orders →
          </Link>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order Ref</th>
                <th>Recipient</th>
                <th>Items Summary</th>
                <th>Method</th>
                <th>Total</th>
                <th>Current Stage</th>
                <th>Quick Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(ord => (
                <tr key={ord.id}>
                  <td style={{ fontWeight: 700, color: 'var(--text-gold)' }}>#{ord.id}</td>
                  <td>{ord.deliveryDetails?.fullName || ord.pickupDetails?.fullName || 'Guest'}</td>
                  <td style={{ fontSize: '0.82rem', maxWidth: '240px' }}>
                    {ord.items.map(i => `${i.quantity}x ${i.nameEn}`).join(', ')}
                  </td>
                  <td>{ord.fulfillmentType === 'delivery' ? 'Delivery' : 'Pickup'} ({ord.paymentMethod.toUpperCase()})</td>
                  <td style={{ fontWeight: 800 }}>{formatCurrency(ord.pricing.total)}</td>
                  <td>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: ord.currentStage === 'completed' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(241, 199, 75, 0.15)',
                        color: ord.currentStage === 'completed' ? '#4ade80' : 'var(--color-gold-400)'
                      }}
                    >
                      {ord.currentStage.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {ord.currentStage !== 'completed' ? (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'completed')}
                        className="btn-hero-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        Mark Done
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: '#4ade80' }}>✓ Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
