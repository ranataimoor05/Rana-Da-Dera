import React from 'react';
import { Clock, CheckCircle2, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useRestaurant } from '../context/RestaurantContext';
import { Link } from 'react-router-dom';

export const OpeningHoursPage: React.FC = () => {
  const { t, language } = useI18n();
  const { settings, isKitchenOpen } = useRestaurant();

  const days = [
    { dayEn: 'Monday', dayUr: 'پیر', hours: settings.hours.labelEn },
    { dayEn: 'Tuesday', dayUr: 'منگل', hours: settings.hours.labelEn },
    { dayEn: 'Wednesday', dayUr: 'بدھ', hours: settings.hours.labelEn },
    { dayEn: 'Thursday', dayUr: 'جمعرات', hours: settings.hours.labelEn },
    { dayEn: 'Friday', dayUr: 'جمعہ', hours: settings.hours.labelEn },
    { dayEn: 'Saturday', dayUr: 'ہفتہ', hours: settings.hours.labelEn },
    { dayEn: 'Sunday', dayUr: 'اتوار', hours: settings.hours.labelEn }
  ];

  return (
    <div className="hours-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-subtitle gold-text">Kitchen Operations</span>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.6rem' }}>
            {t('openingHoursTitle')}
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '8px auto 0' }}>
            Serving hot authentic desi food daily across Naseerabad and Rawalpindi.
          </p>
        </div>

        {/* Live Status Pill Card */}
        <div
          className="glass-panel"
          style={{
            padding: '28px',
            textAlign: 'center',
            border: isKitchenOpen ? '1px solid #22c55e' : '1px solid var(--border-glass)',
            marginBottom: '32px'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: 'var(--radius-full)', background: isKitchenOpen ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: isKitchenOpen ? '#4ade80' : '#f87171', fontWeight: 800, fontSize: '0.95rem', marginBottom: '12px' }}>
            <span className={`status-dot ${isKitchenOpen ? 'green' : 'red'}`} />
            <span>{isKitchenOpen ? 'KITCHEN CURRENTLY FIRING FRESH ORDERS' : 'KITCHEN OPENS AT 2:00 AM (PRE-ORDERS ACTIVE)'}</span>
          </div>

          <h3 className="serif-title" style={{ fontSize: '1.4rem' }}>
            Standard Operating Hours: {settings.hours.labelEn}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '520px', margin: '8px auto 0' }}>
            You may browse our menu anytime. Outside active hours, scheduled orders for future delivery slots are welcome.
          </p>
        </div>

        {/* Day-by-day table */}
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
            Weekly Schedule
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {days.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: idx !== days.length - 1 ? '1px dashed var(--border-subtle)' : 'none',
                  fontSize: '0.95rem'
                }}
              >
                <strong style={{ color: 'var(--text-main)' }}>
                  {language === 'ur' ? item.dayUr : item.dayEn}
                </strong>
                <span className="gold-text" style={{ fontWeight: 600 }}>{item.hours}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/menu" className="btn-hero-primary" style={{ marginRight: '14px' }}>
            Explore Menu & Pre-order
          </Link>
          <Link to="/reservations" className="btn-hero-secondary">
            Book Table
          </Link>
        </div>
      </div>
    </div>
  );
};
