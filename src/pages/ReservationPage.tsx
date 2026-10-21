import React, { useState } from 'react';
import { CalendarDays, Users, Clock, CheckCircle2, MapPin, Sparkles, PhoneCall } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useOrders } from '../context/OrderContext';
import { useRestaurant } from '../context/RestaurantContext';
import { Reservation } from '../types/reservation';

export const ReservationPage: React.FC = () => {
  const { t, language } = useI18n();
  const { createReservation } = useOrders();
  const { settings } = useRestaurant();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('0301-4431520');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('20:00');
  const [guestCount, setGuestCount] = useState(4);
  const [occasion, setOccasion] = useState<'regular' | 'birthday' | 'anniversary' | 'business' | 'family_gathering'>('regular');
  const [seatingPreference, setSeatingPreference] = useState<'indoor_royal' | 'outdoor_courtyard' | 'private_dining' | 'no_preference'>('indoor_royal');
  const [specialRequests, setSpecialRequests] = useState('');

  const [submittedBooking, setSubmittedBooking] = useState<Reservation | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    setSubmitting(true);
    const booking = await createReservation({
      customerName,
      phone,
      email,
      date,
      time,
      guestCount,
      occasion,
      seatingPreference,
      specialRequests
    });
    setSubmittedBooking(booking);
    setSubmitting(false);
  };

  return (
    <div className="reservation-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-subtitle gold-text">Traditional Potohar Hospitality</span>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.6rem' }}>
            {t('reservationTitle')}
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '8px auto 0' }}>
            {t('reservationSubtitle')}
          </p>
        </div>

        {submittedBooking ? (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#4ade80',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h2 className="serif-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
              {t('resSuccessTitle')}
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 20px' }}>
              {t('resSuccessDesc')}
            </p>

            <div
              style={{
                background: 'var(--bg-surface-card)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                maxWidth: '480px',
                margin: '0 auto 24px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Booking Reference:</span>
                <strong className="gold-text">{submittedBooking.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Date & Time:</span>
                <strong>{submittedBooking.date} at {submittedBooking.time}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Guests:</span>
                <strong>{submittedBooking.guestCount} Persons</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Guest Name:</span>
                <strong>{submittedBooking.customerName}</strong>
              </div>
            </div>

            <button
              onClick={() => setSubmittedBooking(null)}
              className="btn-hero-secondary"
            >
              Make Another Reservation
            </button>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '36px' }}>
            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">{t('fullName')} *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Chaudhry Kamran"
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

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">{t('resDate')} *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('resTime')} *</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">{t('resGuests')} *</label>
                  <select
                    value={guestCount}
                    onChange={e => setGuestCount(Number(e.target.value))}
                    className="form-select"
                  >
                    <option value={2}>2 Guests (Table for Two)</option>
                    <option value={4}>4 Guests (Family Table)</option>
                    <option value={6}>6 Guests (Large Table)</option>
                    <option value={8}>8 Guests (Dera Royal Booth)</option>
                    <option value={12}>12+ Guests (Grand Dawat Hall)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('resOccasion')}</label>
                  <select
                    value={occasion}
                    onChange={e => setOccasion(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="regular">{t('resOccasionRegular')}</option>
                    <option value="birthday">{t('resOccasionBirthday')}</option>
                    <option value="anniversary">{t('resOccasionAnniversary')}</option>
                    <option value="family_gathering">Family Gathering</option>
                    <option value="business">{t('resOccasionBusiness')}</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('resSeating')}</label>
                <select
                  value={seatingPreference}
                  onChange={e => setSeatingPreference(e.target.value as any)}
                  className="form-select"
                >
                  <option value="indoor_royal">{t('resSeatingIndoor')}</option>
                  <option value="outdoor_courtyard">{t('resSeatingCourtyard')}</option>
                  <option value="private_dining">{t('resSeatingPrivate')}</option>
                  <option value="no_preference">No Specific Preference</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t('resSpecialRequests')}</label>
                <textarea
                  value={specialRequests}
                  onChange={e => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Traditional charpoy arrangement, high chair for toddler..."
                  className="form-textarea"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-hero-primary"
                style={{ width: '100%', marginTop: '16px' }}
              >
                <CalendarDays size={18} />
                <span>{submitting ? 'Confirming Table Slot...' : t('resSubmit')}</span>
              </button>

              <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                ℹ️ Demonstration Mode: Real table locking requires backend reservation system.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
