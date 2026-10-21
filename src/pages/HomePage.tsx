import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UtensilsCrossed,
  CalendarDays,
  Flame,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Clock,
  MapPin,
  Bike,
  Tag
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useRestaurant } from '../context/RestaurantContext';
import { DishCard } from '../components/menu/DishCard';
import { DishCustomizerModal } from '../components/menu/DishCustomizerModal';
import { Dish } from '../types/menu';
import { initialCoupons } from '../mocks/mockSettings';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const { t, language, direction } = useI18n();
  const { dishes, settings, isKitchenOpen } = useRestaurant();
  const navigate = useNavigate();

  const [customizingDish, setCustomizingDish] = useState<Dish | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>('naseerabad');

  const popularDishes = dishes.filter(d => d.isPopular).slice(0, 6);
  const activeZone = settings.deliveryZones.find(z => z.id === selectedArea) || settings.deliveryZones[0];

  return (
    <div className="home-page">
      {/* SPLIT-SCREEN HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-split-grid">
            {/* Hero Left: Identity & Actions */}
            <div className="hero-content">
              <div className="hero-tag-badge">
                <Sparkles size={16} className="gold-text" />
                <span>{t('heroBadge')}</span>
              </div>

              <h1 className="hero-title serif-title">
                {t('heroTitlePrefix')}{' '}
                <span className="gold-gradient-text">{t('heroTitleHighlight')}</span>
              </h1>

              <p className="hero-desc">{t('heroDescription')}</p>

              <div className="hero-actions">
                <Link to="/menu" className="btn-hero-primary">
                  <UtensilsCrossed size={18} />
                  <span>{t('orderNow')}</span>
                  {direction === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </Link>
                <Link to="/reservations" className="btn-hero-secondary">
                  <CalendarDays size={18} />
                  <span>{t('reserveTable')}</span>
                </Link>
              </div>

              {/* Key Trust Stats */}
              <div className="hero-stats-grid">
                <div className="hero-stat-card">
                  <div className="stat-icon-wrapper"><Clock size={20} className="gold-text" /></div>
                  <div>
                    <div className="stat-title">{settings.hours.labelEn}</div>
                    <div className="stat-sub">{t('heroStatKitchenSub')}</div>
                  </div>
                </div>
                <div className="hero-stat-card">
                  <div className="stat-icon-wrapper"><ShieldCheck size={20} className="gold-text" /></div>
                  <div>
                    <div className="stat-title">{t('heroStatQuality')}</div>
                    <div className="stat-sub">{t('heroStatQualitySub')}</div>
                  </div>
                </div>
                <div className="hero-stat-card">
                  <div className="stat-icon-wrapper"><Bike size={20} className="gold-text" /></div>
                  <div>
                    <div className="stat-title">Express Delivery</div>
                    <div className="stat-sub">{t('heroStatServiceSub')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right: Featured Imagery */}
            <div className="hero-visual">
              <div className="hero-image-frame">
                <img
                  src="/images/mutton-karahi.jpg"
                  alt="Rana Da Dera Mutton Karahi"
                  className="hero-main-img"
                />
                <div className="hero-badge-overlay">
                  <div className="hero-badge-inner">
                    <span className="hero-badge-top">POTOHAR</span>
                    <span className="hero-badge-mid">SPECIAL</span>
                    <span className="hero-badge-sub">RAWALPINDI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK MENU CATEGORIES */}
      <section className="section-categories">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle gold-text">Royal Heritage Flavors</span>
            <h2 className="section-title serif-title">Cuisine Specialties</h2>
          </div>

          <div className="categories-grid">
            <div className="category-shortcut-card" onClick={() => navigate('/menu?cat=karahi')}>
              <img src="/images/mutton-karahi.jpg" alt="Karahi" className="cat-bg-img" />
              <div className="cat-overlay">
                <h3>Desi Karahi & Handi</h3>
                <p>Pure desi ghee & Potohar mutton</p>
              </div>
            </div>
            <div className="category-shortcut-card" onClick={() => navigate('/menu?cat=bbq')}>
              <img src="/images/mix-bbq-platter.jpg" alt="BBQ" className="cat-bg-img" />
              <div className="cat-overlay">
                <h3>Charcoal BBQ</h3>
                <p>Acacia wood smoked perfection</p>
              </div>
            </div>
            <div className="category-shortcut-card" onClick={() => navigate('/menu?cat=desi')}>
              <img src="/images/nihari-special.jpg" alt="Desi Nashta" className="cat-bg-img" />
              <div className="cat-overlay">
                <h3>2AM Midnight Nihari</h3>
                <p>8-hour slow simmered shank</p>
              </div>
            </div>
            <div className="category-shortcut-card" onClick={() => navigate('/menu?cat=combos')}>
              <img src="/images/chicken-handi.jpg" alt="Family Combos" className="cat-bg-img" />
              <div className="cat-overlay">
                <h3>Family Feasts</h3>
                <p>Value packages for gatherings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DISHES GRID */}
      <section className="section-featured">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="section-subtitle gold-text">Handcrafted with Heart</span>
              <h2 className="section-title serif-title">Featured Royal Dishes</h2>
            </div>
            <Link to="/menu" className="btn-view-all">
              <span>{t('viewMenu')}</span>
              {direction === 'rtl' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Link>
          </div>

          <div className="featured-dishes-grid">
            {popularDishes.map(dish => (
              <DishCard
                key={dish.id}
                dish={dish}
                onOpenCustomizer={d => setCustomizingDish(d)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS BANNER PREVIEW */}
      <section className="section-offers-preview">
        <div className="container">
          <div className="offers-banner-card glass-panel">
            <div className="offers-banner-content">
              <span className="offers-tag">Special Promos</span>
              <h3 className="serif-title" style={{ fontSize: '1.8rem', marginTop: '6px' }}>
                Save on Your First Feast at Rana Da Dera
              </h3>
              <p style={{ color: 'var(--text-muted)', margin: '10px 0 16px' }}>
                Use coupon code <strong className="gold-text">FIRSTORDER</strong> to get Rs. 200 off your welcome order, or <strong className="gold-text">DERA10</strong> for 10% off.
              </p>
              <Link to="/offers" className="btn-hero-secondary">
                <Tag size={16} />
                <span>View All Active Vouchers</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY ZONE CHECKER WIDGET */}
      <section className="section-zone-checker">
        <div className="container">
          <div className="zone-checker-wrapper glass-panel">
            <div className="zone-checker-left">
              <div className="stat-icon-wrapper" style={{ width: '48px', height: '48px' }}>
                <Bike size={24} className="gold-text" />
              </div>
              <div>
                <h3 className="serif-title" style={{ fontSize: '1.4rem' }}>
                  Rawalpindi Delivery Serviceability Checker
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Select your area below to check instant delivery timing and charges from our Naseerabad kitchen.
                </p>
              </div>
            </div>

            <div className="zone-checker-right">
              <select
                value={selectedArea}
                onChange={e => setSelectedArea(e.target.value)}
                className="zone-select"
                aria-label="Select delivery area"
              >
                {settings.deliveryZones.map(zone => (
                  <option key={zone.id} value={zone.id}>
                    {language === 'ur' ? zone.nameUr : zone.nameEn}
                  </option>
                ))}
              </select>

              {activeZone && (
                <div className="zone-result-pill">
                  <span className="gold-text" style={{ fontWeight: 700 }}>
                    {activeZone.fee === 0 ? 'FREE Delivery' : `Rs. ${activeZone.fee}`}
                  </span>
                  <span>•</span>
                  <span>{activeZone.estimatedTimeEn}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TABLE RESERVATION BANNER */}
      <section className="section-reservation-cta">
        <div className="container">
          <div className="reservation-cta-card">
            <div className="res-cta-content">
              <span className="section-subtitle gold-text">Traditional Potohar Hospitality</span>
              <h2 className="serif-title" style={{ fontSize: '2.2rem', margin: '8px 0 14px' }}>
                Dine with Family in Royal Punjabi Atmosphere
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '24px' }}>
                Enjoy traditional charpoy and takht seating or private royal dining halls in Naseerabad. Free parking and warm hospitality for all guests.
              </p>
              <Link to="/reservations" className="btn-hero-primary">
                <CalendarDays size={18} />
                <span>{t('reserveTable')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dish Customizer Modal */}
      <DishCustomizerModal
        dish={customizingDish}
        isOpen={!!customizingDish}
        onClose={() => setCustomizingDish(null)}
      />
    </div>
  );
};
