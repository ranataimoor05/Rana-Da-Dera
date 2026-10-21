import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  UtensilsCrossed,
  Home,
  BookOpen,
  CalendarDays,
  Tag,
  Star,
  Info,
  PhoneCall,
  ShoppingBag,
  Moon,
  Sun,
  Globe,
  User,
  Shield,
  Heart,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { useAuth } from '../../context/AuthContext';
import './FloatingCapsuleNav.css';

export const FloatingCapsuleNav: React.FC = () => {
  const { t, language, toggleLanguage } = useI18n();
  const { isDark, toggleTheme } = useTheme();
  const { itemCount, openCartDrawer } = useCart();
  const { isKitchenOpen, settings } = useRestaurant();
  const { user, isStaff } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', icon: <Home size={20} />, label: t('navHome') },
    { to: '/menu', icon: <BookOpen size={20} />, label: t('navMenu') },
    { to: '/offers', icon: <Tag size={20} />, label: t('navOffers') },
    { to: '/reservations', icon: <CalendarDays size={20} />, label: t('navReservations') },
    { to: '/reviews', icon: <Star size={20} />, label: t('navReviews') },
    { to: '/wishlist', icon: <Heart size={20} />, label: t('navWishlist') },
    { to: '/about', icon: <Info size={20} />, label: t('navAbout') },
    { to: '/contact', icon: <PhoneCall size={20} />, label: t('navContact') }
  ];

  return (
    <>
      {/* TOP SITE HEADER */}
      <header className="site-top-bar" role="banner">
        <div className="top-bar-left">
          <Link to="/" className="top-bar-brand" aria-label="Rana Da Dera Home">
            <div className="brand-crest">RDD</div>
            <span className="serif-title gold-gradient-text">{t('brandName')}</span>
          </Link>

          {/* Kitchen Live Status Pill */}
          <Link to="/hours" title={t('liveStatusTooltip')} className={`kitchen-status-pill ${isKitchenOpen ? 'open' : 'closed'}`}>
            <span className={`status-dot ${isKitchenOpen ? 'green' : 'red'}`} aria-hidden="true" />
            <span>{isKitchenOpen ? t('openNow') : t('closedNow')}</span>
          </Link>
        </div>

        <div className="top-bar-right">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="capsule-btn"
            title={language === 'en' ? 'اردو میں تبدیل کریں' : 'Switch to English'}
            aria-label="Switch Language"
          >
            <Globe size={18} />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="capsule-btn"
            title={isDark ? 'Switch to Royal Day Theme' : 'Switch to Midnight Dera Theme'}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} color="#f1c74b" /> : <Moon size={18} />}
          </button>

          {/* Staff / Admin link if staff or demo */}
          {isStaff ? (
            <Link
              to="/admin"
              className="capsule-btn"
              title="Admin & Operations Suite"
              aria-label="Admin Suite"
              style={{ borderColor: 'var(--color-gold-400)', color: 'var(--color-gold-400)' }}
            >
              <Shield size={18} />
            </Link>
          ) : (
            <Link
              to="/admin"
              className="capsule-btn"
              title="Staff Portal (Demo Access)"
              aria-label="Staff Portal"
            >
              <Shield size={18} />
            </Link>
          )}

          {/* Customer Profile / Dashboard */}
          <Link
            to={user ? '/dashboard' : '/login'}
            className="capsule-btn"
            title={user ? `${user.fullName} (${t('navDashboard')})` : t('navLogin')}
            aria-label="User Account"
          >
            <User size={18} />
          </Link>

          {/* Slide-out Cart Trigger */}
          <button
            onClick={openCartDrawer}
            className="btn-cart-trigger"
            aria-label={`Open shopping cart with ${itemCount} items`}
          >
            <ShoppingBag size={18} />
            <span className="cart-btn-label">{t('navCart')}</span>
            {itemCount > 0 && <span className="cart-count-badge">{itemCount}</span>}
          </button>
        </div>
      </header>

      {/* DESKTOP SIDE CAPSULE NAVIGATION */}
      <nav
        className={`desktop-side-capsule ${isExpanded ? 'expanded' : ''}`}
        aria-label="Primary Navigation Capsule"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div
          className="capsule-brand-icon"
          onClick={() => navigate('/')}
          title="Rana Da Dera Home"
          role="button"
          tabIndex={0}
        >
          <UtensilsCrossed size={20} />
        </div>

        <div className="capsule-nav-items">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `capsule-nav-link ${isActive ? 'active' : ''}`}
              title={link.label}
            >
              <span className="capsule-nav-icon">{link.icon}</span>
              <span className="capsule-nav-label">{link.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="capsule-divider" />

        <div className="capsule-actions">
          <NavLink
            to="/help"
            className={({ isActive }) => `capsule-nav-link ${isActive ? 'active' : ''}`}
            title={t('navHelp')}
          >
            <span className="capsule-nav-icon"><HelpCircle size={19} /></span>
            <span className="capsule-nav-label">{t('navHelp')}</span>
          </NavLink>
        </div>
      </nav>

      {/* MOBILE / TABLET BOTTOM FLOATING CAPSULE BAR */}
      <nav className="mobile-bottom-capsule" aria-label="Mobile Navigation Bar">
        <NavLink to="/" className={({ isActive }) => `mobile-capsule-link ${isActive ? 'active' : ''}`}>
          <Home size={18} />
          <span>{t('navHome')}</span>
        </NavLink>
        <NavLink to="/menu" className={({ isActive }) => `mobile-capsule-link ${isActive ? 'active' : ''}`}>
          <BookOpen size={18} />
          <span>{t('navMenu')}</span>
        </NavLink>
        <NavLink to="/reservations" className={({ isActive }) => `mobile-capsule-link ${isActive ? 'active' : ''}`}>
          <CalendarDays size={18} />
          <span>{t('navReservations')}</span>
        </NavLink>
        <NavLink to="/offers" className={({ isActive }) => `mobile-capsule-link ${isActive ? 'active' : ''}`}>
          <Tag size={18} />
          <span>{t('navOffers')}</span>
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `mobile-capsule-link ${isActive ? 'active' : ''}`}>
          <User size={18} />
          <span>{t('navDashboard')}</span>
        </NavLink>
      </nav>
    </>
  );
};
