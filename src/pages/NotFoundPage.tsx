import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export const NotFoundPage: React.FC = () => {
  const { direction } = useI18n();

  return (
    <div style={{ padding: '80px 20px', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--color-gold-400)', fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
          404
        </div>
        <h1 className="serif-title" style={{ fontSize: '2rem', margin: '14px 0 10px' }}>
          Feast Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          The page or culinary recipe you are looking for does not exist or has been relocated in our kitchen.
        </p>

        <Link to="/" className="btn-hero-primary" style={{ display: 'inline-flex' }}>
          <UtensilsCrossed size={18} />
          <span>Return to Homepage</span>
          {direction === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
        </Link>
      </div>
    </div>
  );
};
