import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  CalendarDays,
  Tag,
  MapPin,
  Settings,
  BarChart3,
  Users,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  LogOut,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

export const AdminLayout: React.FC = () => {
  const { t, language, toggleLanguage, direction } = useI18n();
  const { isDark, toggleTheme } = useTheme();
  const { user, switchRole } = useAuth();
  const navigate = useNavigate();

  const adminNav = [
    { to: '/admin', end: true, icon: <LayoutDashboard size={18} />, label: t('adminOverview') },
    { to: '/admin/orders', icon: <ShoppingBag size={18} />, label: t('adminOrders') },
    { to: '/admin/menu', icon: <UtensilsCrossed size={18} />, label: t('adminMenu') },
    { to: '/admin/reservations', icon: <CalendarDays size={18} />, label: t('adminReservations') },
    { to: '/admin/coupons', icon: <Tag size={18} />, label: t('adminCoupons') },
    { to: '/admin/delivery-zones', icon: <MapPin size={18} />, label: t('adminDeliveryZones') },
    { to: '/admin/settings', icon: <Settings size={18} />, label: t('adminSettings') },
    { to: '/admin/reports', icon: <BarChart3 size={18} />, label: t('adminReports') },
    { to: '/admin/staff', icon: <Users size={18} />, label: t('adminStaff') }
  ];

  return (
    <div className="admin-layout-root">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar" aria-label="Admin Navigation Sidebar">
        <div className="admin-sidebar-header">
          <div className="brand-crest" style={{ width: '34px', height: '34px', fontSize: '0.85rem' }}>RDD</div>
          <div>
            <div className="serif-title gold-gradient-text" style={{ fontWeight: 800, fontSize: '1.1rem' }}>
              RANA DA DERA
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-gold-400)', fontWeight: 700 }}>
              Staff & Operations Portal
            </div>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {adminNav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Bottom: Back to Public Website */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-subtle)' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              color: 'var(--text-gold)',
              fontWeight: 700
            }}
          >
            {direction === 'rtl' ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>Back to Customer Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Administrative Container */}
      <div className="admin-main-container">
        {/* Admin Top Bar */}
        <header className="admin-top-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                background: 'rgba(241, 199, 75, 0.15)',
                color: 'var(--color-gold-400)',
                fontWeight: 800,
                fontSize: '0.75rem',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              {user?.role.toUpperCase() || 'DEMO ADMIN'}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Naseerabad Branch • Live Orders System
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={toggleLanguage} className="capsule-btn" aria-label="Toggle language">
              <Globe size={18} />
            </button>
            <button onClick={toggleTheme} className="capsule-btn" aria-label="Toggle theme">
              {isDark ? <Sun size={18} color="#f1c74b" /> : <Moon size={18} />}
            </button>
            <Link to="/dashboard" className="btn-hero-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              Customer View
            </Link>
          </div>
        </header>

        {/* Dynamic Nested Admin Pages */}
        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
