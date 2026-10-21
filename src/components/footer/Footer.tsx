import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, MessageSquare, ShieldCheck, Heart, ShieldAlert } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import { useRestaurant } from '../../context/RestaurantContext';
import './Footer.css';

export const Footer: React.FC = () => {
  const { t, language } = useI18n();
  const { settings } = useRestaurant();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Story */}
          <div className="footer-col-brand">
            <h3 className="footer-brand-title serif-title gold-gradient-text">{t('brandName')}</h3>
            <p className="footer-desc">{t('footerTagline')}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-400)', fontSize: '0.85rem' }}>
              <ShieldCheck size={18} />
              <span>100% Halal & Pure Desi Ghee Guaranteed</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">{t('quickLinks')}</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><Link to="/">{t('navHome')}</Link></li>
              <li className="footer-link-item"><Link to="/menu">{t('navMenu')}</Link></li>
              <li className="footer-link-item"><Link to="/offers">{t('navOffers')}</Link></li>
              <li className="footer-link-item"><Link to="/reservations">{t('navReservations')}</Link></li>
              <li className="footer-link-item"><Link to="/reviews">{t('navReviews')}</Link></li>
              <li className="footer-link-item"><Link to="/loyalty">{t('navLoyalty')}</Link></li>
              <li className="footer-link-item"><Link to="/about">{t('navAbout')}</Link></li>
            </ul>
          </div>

          {/* Policies & Help */}
          <div>
            <h4 className="footer-col-title">Customer Care & Policies</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><Link to="/help">{t('navHelp')}</Link></li>
              <li className="footer-link-item"><Link to="/support">Live Chat Support</Link></li>
              <li className="footer-link-item"><Link to="/no-refund-policy" style={{ color: '#f87171' }}>Strict No-Refund Policy</Link></li>
              <li className="footer-link-item"><Link to="/privacy">{t('privacyPolicyTitle')}</Link></li>
              <li className="footer-link-item"><Link to="/terms">{t('termsTitle')}</Link></li>
              <li className="footer-link-item"><Link to="/cookies">{t('cookiesTitle')}</Link></li>
              <li className="footer-link-item"><Link to="/admin">Staff Administration Portal</Link></li>
            </ul>
          </div>

          {/* Verified Contact Details & Hours */}
          <div>
            <h4 className="footer-col-title">{t('navContact')}</h4>
            <div className="footer-contact-item">
              <MapPin size={18} className="footer-contact-icon" />
              <span>{language === 'ur' ? settings.addressUr : settings.addressEn}</span>
            </div>
            <div className="footer-contact-item">
              <Clock size={18} className="footer-contact-icon" />
              <span>{language === 'ur' ? settings.hours.labelUr : settings.hours.labelEn} • {language === 'ur' ? settings.hours.daysUr : settings.hours.daysEn}</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} className="footer-contact-icon" />
              <span>Call: {settings.phone}</span>
            </div>

            <a
              href={`https://wa.me/${settings.whatsapp}?text=Hello!%20I%20want%20to%20order%20from%20Rana%20Da%20Dera.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-footer"
            >
              <MessageSquare size={16} />
              <span>WhatsApp: {settings.phone}</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>{t('copyright')}</div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>
            Naseerabad, Rawalpindi • Desi Ghee Karahi & Charcoal BBQ
          </div>
        </div>
      </div>
    </footer>
  );
};
