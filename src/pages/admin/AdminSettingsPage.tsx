import React, { useState } from 'react';
import { Settings, Save, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, resetToDefaults } = useRestaurant();

  const [phone, setPhone] = useState(settings.phone);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [minOrder, setMinOrder] = useState(settings.minOrderAmount);
  const [scheduleWindow, setScheduleWindow] = useState(settings.schedulingWindowHours);
  const [taxRate, setTaxRate] = useState(settings.taxRatePercent);
  const [serviceFee, setServiceFee] = useState(settings.serviceFeePercent);
  const [openHour, setOpenHour] = useState(settings.hours.openHour);
  const [closeHour, setCloseHour] = useState(settings.hours.closeHour);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      phone,
      whatsapp,
      minOrderAmount: Number(minOrder),
      schedulingWindowHours: Number(scheduleWindow),
      taxRatePercent: Number(taxRate),
      serviceFeePercent: Number(serviceFee),
      hours: {
        ...settings.hours,
        openHour: Number(openHour),
        closeHour: Number(closeHour)
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-settings-page" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="serif-title" style={{ fontSize: '2rem' }}>General Restaurant Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Configure kitchen timings, contact helpline, scheduling windows, and order parameters.</p>
      </div>

      {saved && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px' }}>
          <CheckCircle2 size={18} />
          <span>Restaurant settings updated successfully!</span>
        </div>
      )}

      <div className="glass-panel" style={{ padding: '32px' }}>
        <form onSubmit={handleSave}>
          <h3 className="serif-title" style={{ fontSize: '1.2rem', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            Operating Hours & Scheduling
          </h3>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Kitchen Open Hour (24h format, e.g. 2 for 2:00 AM)</label>
              <input
                type="number"
                min={0}
                max={23}
                value={openHour}
                onChange={e => setOpenHour(Number(e.target.value))}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kitchen Close Hour (24h format, e.g. 15 for 3:00 PM)</label>
              <input
                type="number"
                min={0}
                max={23}
                value={closeHour}
                onChange={e => setCloseHour(Number(e.target.value))}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Global Minimum Order (PKR)</label>
              <input
                type="number"
                value={minOrder}
                onChange={e => setMinOrder(Number(e.target.value))}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Advance Scheduling Window (Hours)</label>
              <input
                type="number"
                value={scheduleWindow}
                onChange={e => setScheduleWindow(Number(e.target.value))}
                className="form-input"
              />
            </div>
          </div>

          <h3 className="serif-title" style={{ fontSize: '1.2rem', margin: '24px 0 14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            Helplines & Tax Rates
          </h3>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Phone Helpline</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">WhatsApp Contact Number</label>
              <input
                type="text"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Tax Rate Percentage (%)</label>
              <input
                type="number"
                value={taxRate}
                onChange={e => setTaxRate(Number(e.target.value))}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Service Fee Percentage (%)</label>
              <input
                type="number"
                value={serviceFee}
                onChange={e => setServiceFee(Number(e.target.value))}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
            <button type="submit" className="btn-hero-primary">
              <Save size={16} />
              <span>Save Configurations</span>
            </button>
            <button
              type="button"
              onClick={resetToDefaults}
              className="btn-hero-secondary"
            >
              <RotateCcw size={16} />
              <span>Reset to Verified Defaults</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
