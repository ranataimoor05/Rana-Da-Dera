import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  CalendarDays,
  Heart,
  Award,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  Settings,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/currency';

export const CustomerDashboardPage: React.FC = () => {
  const { t, language, direction } = useI18n();
  const { user, updateProfile, updateSavedAddress } = useAuth();
  const { orders, reservations } = useOrders();
  const { wishlistIds } = useWishlist();

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'reservations' | 'profile'>('overview');

  // Edit Profile form state
  const [name, setName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [addressLine, setAddressLine] = useState(user?.savedAddress?.addressLine || '');
  const [profileSaved, setProfileSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName: name, phone, email });
    if (addressLine) {
      updateSavedAddress({
        id: user?.savedAddress?.id || 'addr-1',
        label: 'Home',
        addressLine,
        zoneId: 'naseerabad',
        city: 'Rawalpindi',
        isDefault: true
      });
    }
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  return (
    <div className="dashboard-page" style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Welcome Banner */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-subtitle gold-text">Customer Portal</span>
            <h1 className="serif-title" style={{ fontSize: '2rem' }}>
              Welcome back, {user?.fullName || 'Valued Guest'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Member since {user?.createdAt || '2026'} • Potohar Royal Dining Club
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(241, 199, 75, 0.1)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '12px 20px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'block' }}>Loyalty Points</span>
              <strong className="gold-text" style={{ fontSize: '1.4rem' }}>{user?.loyaltyPoints || 0} pts</strong>
            </div>
            <Link to="/loyalty" className="btn-hero-secondary" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
              <Award size={16} />
              <span>Redeem</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '30px', overflowX: 'auto', paddingBottom: '8px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`category-chip ${activeTab === 'overview' ? 'active' : ''}`}
          >
            {t('dashboardOverview')}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`category-chip ${activeTab === 'orders' ? 'active' : ''}`}
          >
            {t('recentOrders')} ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`category-chip ${activeTab === 'reservations' ? 'active' : ''}`}
          >
            {t('activeBookings')} ({reservations.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`category-chip ${activeTab === 'profile' ? 'active' : ''}`}
          >
            {t('editProfile')}
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div className="glass-card" style={{ padding: '20px' }}>
                <ShoppingBag size={24} className="gold-text" style={{ marginBottom: '10px' }} />
                <h3 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>Total Feasts Ordered</h3>
                <p style={{ fontSize: '1.6rem', fontWeight: 800 }}>{orders.length}</p>
              </div>

              <div className="glass-card" style={{ padding: '20px' }}>
                <CalendarDays size={24} className="gold-text" style={{ marginBottom: '10px' }} />
                <h3 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>Table Reservations</h3>
                <p style={{ fontSize: '1.6rem', fontWeight: 800 }}>{reservations.length}</p>
              </div>

              <div className="glass-card" style={{ padding: '20px' }}>
                <Heart size={24} color="#ef4444" style={{ marginBottom: '10px' }} />
                <h3 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>Favorite Dishes</h3>
                <p style={{ fontSize: '1.6rem', fontWeight: 800 }}>{wishlistIds.length}</p>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="serif-title" style={{ fontSize: '1.3rem' }}>{t('recentOrders')}</h3>
                <button onClick={() => setActiveTab('orders')} style={{ color: 'var(--color-gold-400)', fontSize: '0.9rem', fontWeight: 700 }}>
                  View All Orders
                </button>
              </div>

              {orders.slice(0, 3).map(order => (
                <div
                  key={order.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 0',
                    borderBottom: '1px solid var(--border-subtle)',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      Order #{order.id}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      {order.items.length} dishes • {order.fulfillmentType === 'delivery' ? 'Delivery' : 'Pickup'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="gold-text" style={{ fontWeight: 700 }}>
                      {formatCurrency(order.pricing.total)}
                    </span>
                    <Link
                      to={`/track/${order.id}`}
                      className="btn-hero-secondary"
                      style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                    >
                      <span>Track</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS */}
        {activeTab === 'orders' && (
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 className="serif-title" style={{ fontSize: '1.4rem', marginBottom: '18px' }}>
              {t('recentOrders')}
            </h2>
            {orders.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No orders placed yet.</p>
            ) : (
              orders.map(order => (
                <div
                  key={order.id}
                  style={{
                    background: 'var(--bg-surface-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Order #{order.id}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                        Status: <strong style={{ color: '#4ade80' }}>{order.currentStage.replace(/_/g, ' ').toUpperCase()}</strong> • Placed on {order.createdAt.split('T')[0]}
                      </p>
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-gold)' }}>
                      {formatCurrency(order.pricing.total)}
                    </div>
                  </div>

                  <div style={{ margin: '12px 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    {order.items.map(item => `${item.quantity}x ${item.nameEn}`).join(', ')}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <Link to={`/track/${order.id}`} className="btn-hero-primary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                      Live Status
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 className="serif-title" style={{ fontSize: '1.4rem', marginBottom: '18px' }}>
              {t('activeBookings')}
            </h2>
            {reservations.map(res => (
              <div
                key={res.id}
                style={{
                  background: 'var(--bg-surface-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  marginBottom: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <h4 style={{ fontWeight: 700 }}>Booking #{res.id}</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {res.date} at {res.time} • {res.guestCount} Guests • {res.seatingPreference.replace(/_/g, ' ')}
                  </div>
                </div>

                <span
                  style={{
                    background: 'rgba(34, 197, 94, 0.15)',
                    color: '#4ade80',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                >
                  {res.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="glass-panel" style={{ padding: '32px', maxWidth: '640px' }}>
            <h2 className="serif-title" style={{ fontSize: '1.4rem', marginBottom: '18px' }}>
              {t('editProfile')}
            </h2>

            {profileSaved && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.85rem' }}>
                <CheckCircle2 size={18} />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleProfileSave}>
              <div className="form-group">
                <label className="form-label">{t('fullName')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('phoneNumber')}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('emailAddress')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('savedAddress')}</label>
                <input
                  type="text"
                  value={addressLine}
                  onChange={e => setAddressLine(e.target.value)}
                  placeholder="House, Street, Sector, Rawalpindi"
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn-hero-primary" style={{ marginTop: '16px' }}>
                {t('saveChanges')}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
