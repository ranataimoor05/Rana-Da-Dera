import React, { useState } from 'react';
import { Tag, Plus, CheckCircle2 } from 'lucide-react';
import { initialCoupons } from '../../mocks/mockSettings';
import { Coupon } from '../../types/promotions';
import { formatCurrency } from '../../utils/currency';

export const AdminCouponsPage: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  // New coupon state
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percent' | 'flat'>('percent');
  const [value, setValue] = useState(15);
  const [minSpend, setMinSpend] = useState(1200);
  const [desc, setDesc] = useState('');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    const newCoupon: Coupon = {
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      minSpend: Number(minSpend),
      labelEn: `${code} Promo Voucher`,
      labelUr: `${code} پروموشنل واؤچر`,
      descriptionEn: desc || `Enjoy discount on orders above Rs. ${minSpend}`,
      descriptionUr: `خصوصی رعایت`,
      isActive: true
    };
    setCoupons([newCoupon, ...coupons]);
    setCode('');
    setDesc('');
  };

  const toggleStatus = (codeToToggle: string) => {
    setCoupons(prev =>
      prev.map(c => (c.code === codeToToggle ? { ...c, isActive: !c.isActive } : c))
    );
  };

  return (
    <div className="admin-coupons-page">
      <div style={{ marginBottom: '24px' }}>
        <h1 className="serif-title" style={{ fontSize: '2rem' }}>Coupons & Promotions</h1>
        <p style={{ color: 'var(--text-muted)' }}>Configure promotional codes, percentage or flat discounts, and minimum spend rules.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Create Coupon Form */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 className="serif-title" style={{ fontSize: '1.25rem', marginBottom: '16px' }}>
            Create New Promotional Voucher
          </h3>

          <form onSubmit={handleAddCoupon} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Coupon Code *</label>
              <input
                type="text"
                required
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="e.g. AUTUMN15"
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Discount Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as any)}
                className="form-select"
              >
                <option value="percent">Percentage Discount (%)</option>
                <option value="flat">Flat Amount (PKR)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Value</label>
              <input
                type="number"
                required
                value={value}
                onChange={e => setValue(Number(e.target.value))}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Min Spend (PKR)</label>
              <input
                type="number"
                required
                value={minSpend}
                onChange={e => setMinSpend(Number(e.target.value))}
                className="form-input"
              />
            </div>

            <button type="submit" className="btn-hero-primary" style={{ padding: '11px', height: 'fit-content' }}>
              <Plus size={16} />
              <span>Add Coupon</span>
            </button>
          </form>
        </div>

        {/* Coupons List */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Type</th>
                <th>Discount</th>
                <th>Min Spend</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(c => (
                <tr key={c.code}>
                  <td style={{ fontWeight: 800, color: 'var(--color-gold-400)', fontFamily: 'monospace', fontSize: '1rem' }}>
                    {c.code}
                  </td>
                  <td>{c.type === 'percent' ? 'Percentage' : 'Flat Cash'}</td>
                  <td style={{ fontWeight: 700 }}>
                    {c.type === 'percent' ? `${c.value}% OFF` : formatCurrency(c.value)}
                  </td>
                  <td>{formatCurrency(c.minSpend)}</td>
                  <td>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: c.isActive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: c.isActive ? '#4ade80' : '#f87171'
                      }}
                    >
                      {c.isActive ? 'ACTIVE' : 'DISABLED'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleStatus(c.code)}
                      className="btn-hero-secondary"
                      style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                    >
                      {c.isActive ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
