import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useRestaurant } from '../context/RestaurantContext';

export const ContactPage: React.FC = () => {
  const { t, language } = useI18n();
  const { settings } = useRestaurant();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSent(true);
    setName('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="contact-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-subtitle gold-text">Get in Touch</span>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.6rem' }}>
            {t('navContact')}
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '8px auto 0' }}>
            Reach out for table inquiries, catering arrangements, large family dawats, or delivery coordination in Rawalpindi.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          {/* Contact Details Card */}
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h2 className="serif-title" style={{ fontSize: '1.4rem', marginBottom: '20px' }}>
              Restaurant Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <MapPin size={22} className="gold-text" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.98rem' }}>Our Location</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {language === 'ur' ? settings.addressUr : settings.addressEn}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Clock size={22} className="gold-text" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.98rem' }}>Opening Hours</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {settings.hours.labelEn} • {settings.hours.daysEn}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Phone size={22} className="gold-text" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.98rem' }}>Direct Helpline</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {settings.phone}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <MessageSquare size={22} color="#25D366" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.98rem' }}>Instant WhatsApp</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {settings.phone} (Orders & Table Booking)
                  </p>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${settings.whatsapp}?text=Hello!%20I%20have%20an%20inquiry%20regarding%20Rana%20Da%20Dera.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-footer"
              style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}
            >
              <MessageSquare size={18} />
              <span>Message on WhatsApp</span>
            </a>
          </div>

          {/* Interactive Message Form */}
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h2 className="serif-title" style={{ fontSize: '1.4rem', marginBottom: '20px' }}>
              Send an Inquiry
            </h2>

            {sent && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.88rem' }}>
                <CheckCircle2 size={18} />
                <span>Thank you! Your message has been sent to our Naseerabad reception team.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">{t('fullName')} *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your Name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('phoneNumber')}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="0301-4431520"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message / Special Inquiry *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Describe your event, catering, or query..."
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="btn-hero-primary" style={{ width: '100%', marginTop: '10px' }}>
                <Send size={16} />
                <span>Transmit Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="glass-panel" style={{ padding: '16px', overflow: 'hidden' }}>
          <iframe
            src="https://maps.google.com/maps?q=Naseerabad+Rawalpindi+Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="360"
            style={{ border: 0, borderRadius: 'var(--radius-md)' }}
            allowFullScreen={false}
            loading="lazy"
            title="Rana Da Dera Location Map"
          />
        </div>
      </div>
    </div>
  );
};
