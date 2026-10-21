import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Cookie, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export const NoRefundPolicyPage: React.FC = () => {
  const { t, language } = useI18n();

  return (
    <div className="policy-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <ShieldAlert size={36} />
          </div>
          <span className="section-subtitle gold-text">Customer Terms & Conditions</span>
          <h1 className="serif-title" style={{ fontSize: '2.4rem', color: '#f87171' }}>
            Strict No-Refund & Cancellation Policy
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '8px auto 0' }}>
            Mandatory Culinary Disclosure for Rana Da Dera Patrons
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '36px', lineHeight: '1.8', color: 'var(--text-main)', fontSize: '0.95rem' }}>
          <h2 className="serif-title" style={{ fontSize: '1.4rem', marginBottom: '14px', color: 'var(--color-gold-400)' }}>
            1. Perishable Food Nature & Kitchen Commitment
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '18px' }}>
            At Rana Da Dera (Naseerabad, Rawalpindi), all culinary dishes — including our Mutton Karahi, Handis, Charcoal BBQ, Yakhni Pulao, and freshly baked naans — are prepared to order using fresh, perishable ingredients and pure desi ghee. Once an order is confirmed and queued for preparation in our live kitchen, the raw ingredients and specialized labor are immediately committed.
          </p>

          <h2 className="serif-title" style={{ fontSize: '1.4rem', marginBottom: '14px', color: 'var(--color-gold-400)' }}>
            2. Complete Non-Refundable Scope
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '18px' }}>
            Under this finalized business rule, Rana Da Dera does NOT entertain:
          </p>
          <ul style={{ paddingLeft: '24px', color: 'var(--text-muted)', marginBottom: '18px' }}>
            <li>Customer-initiated refund requests after payment or order dispatch.</li>
            <li>Partial refunds for unconsumed items or changes of personal taste preference.</li>
            <li>Self-service online order cancellation once transmission to the kitchen is complete.</li>
            <li>Cancellations due to courier transit delays during unexpected peak traffic conditions in Rawalpindi.</li>
          </ul>

          <h2 className="serif-title" style={{ fontSize: '1.4rem', marginBottom: '14px', color: 'var(--color-gold-400)' }}>
            3. Order Changes & Corrections
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '18px' }}>
            Customers cannot modify or reduce item quantities after submitting their order. Any urgent address corrections or critical dietary warnings must be relayed verbally to our Naseerabad reception team at <strong>0301-4431520</strong> prior to food dispatch.
          </p>

          <h2 className="serif-title" style={{ fontSize: '1.4rem', marginBottom: '14px', color: 'var(--color-gold-400)' }}>
            4. Statutory & Mandatory Consumer Rights
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Nothing contained in this restaurant policy shall be construed to waive or override any mandatory statutory rights granted under the applicable consumer protection laws of Pakistan. In the rare circumstance that an entirely incorrect dish is delivered due to kitchen error, our management will promptly replace the dish with hot fresh food.
          </p>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="policy-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.4rem' }}>
            {t('privacyPolicyTitle')}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Data protection and confidentiality standards at Rana Da Dera.</p>
        </div>

        <div className="glass-panel" style={{ padding: '36px', lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          <h2 className="serif-title" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Information We Collect</h2>
          <p style={{ marginBottom: '16px' }}>
            We collect patron contact details (name, delivery address, phone number, and optional email) solely to facilitate food delivery, table reservations, and loyalty point accrual in Naseerabad, Rawalpindi.
          </p>

          <h2 className="serif-title" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Payment Credentials Protection</h2>
          <p style={{ marginBottom: '16px' }}>
            Rana Da Dera frontend does NOT store bank passwords, credit card numbers, or mobile wallet PINs on our servers or client browser storage. Digital payment processing is routed through verified payment gateways.
          </p>

          <h2 className="serif-title" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Data Retention & Access</h2>
          <p>
            Patrons may view, modify, or clear their local session data and address records anytime through the Customer Dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="policy-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.4rem' }}>
            {t('termsTitle')}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Customer dining agreement and online platform terms.</p>
        </div>

        <div className="glass-panel" style={{ padding: '36px', lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          <h2 className="serif-title" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Acceptance of Terms</h2>
          <p style={{ marginBottom: '16px' }}>
            By placing an order, booking a table, or creating an account with Rana Da Dera, you agree to these operational terms and our non-refundable food policy.
          </p>

          <h2 className="serif-title" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Pricing & Currency</h2>
          <p style={{ marginBottom: '16px' }}>
            All prices are denominated in Pakistani Rupees (PKR) and formatted consistently as <code>Rs. 1,250</code>. Prices reflect authentic quality ingredients and pure desi ghee preparation.
          </p>

          <h2 className="serif-title" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Service Area & Delivery Timing</h2>
          <p>
            Delivery timings displayed on the website are realistic operational estimates straight from our Naseerabad kitchen. We reserve the right to suspend ordering outside configured hours (2:00 AM – 3:00 PM).
          </p>
        </div>
      </div>
    </div>
  );
};

export const CookiePreferencesPage: React.FC = () => {
  const { t } = useI18n();
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [preferencesConsent, setPreferencesConsent] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="policy-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Cookie size={40} className="gold-text" style={{ margin: '0 auto 12px' }} />
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.4rem' }}>
            {t('cookiesTitle')}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your browser storage and tracking preferences.</p>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          {saved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.9rem' }}>
              <CheckCircle2 size={18} />
              <span>Cookie preferences updated successfully.</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>Essential & Technical Storage</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Required for cart persistence, guest session, and theme/language selection.</p>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-400)', fontWeight: 700 }}>Always Active</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>Performance & Analytics</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Helps us measure popular dish views and optimize page loading speeds.</p>
              </div>
              <input
                type="checkbox"
                checked={analyticsConsent}
                onChange={e => setAnalyticsConsent(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>Personalized Experience</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Remembers your saved delivery zone and favorite dishes.</p>
              </div>
              <input
                type="checkbox"
                checked={preferencesConsent}
                onChange={e => setPreferencesConsent(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>

            <button onClick={handleSave} className="btn-hero-primary" style={{ marginTop: '16px' }}>
              Save Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
