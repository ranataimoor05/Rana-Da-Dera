import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Flame, UtensilsCrossed, Award, Users, HeartHandshake } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export const AboutPage: React.FC = () => {
  const { t, language } = useI18n();

  return (
    <div className="about-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-subtitle gold-text">Heritage & Soul</span>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.8rem' }}>
            About Rana Da Dera
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '10px auto 0', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Rooted in the timeless culinary customs of Punjab and the Potohar plateau, Rana Da Dera was founded to preserve authentic cooking methods: heavy iron woks, clay handis, natural acacia charcoal, and 100% pure desi ghee.
          </p>
        </div>

        {/* Story Section */}
        <div className="glass-panel" style={{ padding: '36px', marginBottom: '36px' }}>
          <h2 className="serif-title" style={{ fontSize: '1.8rem', marginBottom: '16px' }}>
            The Essence of Our Potohar Kitchen
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
            Situated in Naseerabad, Rawalpindi, Rana Da Dera is more than a restaurant — it is a sanctuary for true food connoisseurs. We do not use commercial flavor enhancers, artificial tenderizers, or processed oils. Every karahi is simmered in small batches with fresh tomatoes, hand-crushed ginger, whole green chilies, and pure ghee.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            Our 2:00 AM dawn opening is a proud tribute to Rawalpindi's nocturnal food culture, welcoming travelers, night owls, and early-morning risers for steaming bone-shank Nihari, gelatinous Punjabi Paye, and clay tandoor roghni naans.
          </p>
        </div>

        {/* Pillars of Excellence */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <Flame size={32} color="#f97316" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Pure Desi Ghee</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              We source farm-fresh butter churned into clarified desi ghee, delivering rich aroma and digestive goodness.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <Award size={32} className="gold-text" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Potohar Prime Cuts</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Only tender local mutton and prime beef shanks, charcoal-grilled or wok-cooked fresh every day.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <HeartHandshake size={32} color="#22c55e" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Rawalpindi Hospitality</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Traditional takht, charpoy, and family dining environments with warm welcoming service.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/reservations" className="btn-hero-primary" style={{ marginRight: '12px' }}>
            <span>Reserve a Table in Naseerabad</span>
          </Link>
          <Link to="/menu" className="btn-hero-secondary">
            <span>Explore Full Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
