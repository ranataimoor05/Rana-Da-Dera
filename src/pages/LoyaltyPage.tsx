import React, { useState } from 'react';
import { Award, Gift, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useAuth } from '../context/AuthContext';
import { initialLoyaltyRewards } from '../mocks/mockSettings';
import { LoyaltyReward } from '../types/promotions';
import { formatCurrency } from '../utils/currency';

export const LoyaltyPage: React.FC = () => {
  const { t, language } = useI18n();
  const { user, updateProfile } = useAuth();
  const [redeemedNotice, setRedeemedNotice] = useState<string | null>(null);

  const points = user?.loyaltyPoints || 340;

  const handleRedeem = (reward: LoyaltyReward) => {
    if (points < reward.pointsCost) {
      alert(`You need ${reward.pointsCost - points} more points to redeem this treat.`);
      return;
    }
    updateProfile({ loyaltyPoints: points - reward.pointsCost });
    setRedeemedNotice(`Successfully redeemed "${reward.titleEn}"! Voucher code added to your account.`);
    setTimeout(() => setRedeemedNotice(null), 4000);
  };

  return (
    <div className="loyalty-page" style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-subtitle gold-text">Dera Royal Dining Club</span>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.6rem' }}>
            {t('navLoyalty')}
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '8px auto 0' }}>
            Earn 1 point for every Rs. 50 spent on authentic Karahi, BBQ, and desi delicacies. Redeem points for complimentary treats and royal discounts.
          </p>
        </div>

        {/* Current Points Balance Card */}
        <div
          className="glass-panel"
          style={{
            padding: '36px',
            textAlign: 'center',
            background: 'radial-gradient(circle, rgba(241, 199, 75, 0.15) 0%, var(--bg-surface-elevated) 100%)',
            border: '1px solid var(--color-gold-400)',
            marginBottom: '40px'
          }}
        >
          <Award size={48} className="gold-text" style={{ margin: '0 auto 12px' }} />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Available Points Balance
          </span>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-gold-400)', margin: '4px 0' }}>
            {points} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>PTS</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Registered Guest: <strong>{user?.fullName || 'Valued Patron'}</strong>
          </p>
        </div>

        {redeemedNotice && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#4ade80', padding: '14px 18px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
            <CheckCircle2 size={20} />
            <span>{redeemedNotice}</span>
          </div>
        )}

        {/* Rewards Catalog */}
        <h2 className="serif-title" style={{ fontSize: '1.6rem', marginBottom: '20px' }}>
          Available Rewards Catalog
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {initialLoyaltyRewards.map(reward => {
            const canAfford = points >= reward.pointsCost;

            return (
              <div
                key={reward.id}
                className="glass-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <Gift size={22} className="gold-text" />
                    <span style={{ background: 'rgba(241, 199, 75, 0.12)', color: 'var(--color-gold-400)', fontWeight: 800, fontSize: '0.82rem', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                      {reward.pointsCost} PTS
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                    {language === 'ur' ? reward.titleUr : reward.titleEn}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                    {language === 'ur' ? reward.descriptionUr : reward.descriptionEn}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford}
                    className="btn-hero-primary"
                    style={{
                      width: '100%',
                      padding: '10px',
                      fontSize: '0.88rem',
                      opacity: canAfford ? 1 : 0.5,
                      cursor: canAfford ? 'pointer' : 'not-allowed'
                    }}
                  >
                    <span>{canAfford ? 'Redeem Reward' : `Need ${reward.pointsCost - points} More Pts`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
