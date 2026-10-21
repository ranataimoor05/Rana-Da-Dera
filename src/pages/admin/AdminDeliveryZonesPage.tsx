import React from 'react';
import { MapPin, CheckCircle2, Clock } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { formatCurrency } from '../../utils/currency';

export const AdminDeliveryZonesPage: React.FC = () => {
  const { settings, updateDeliveryZone } = useRestaurant();

  return (
    <div className="admin-delivery-zones-page">
      <div style={{ marginBottom: '24px' }}>
        <h1 className="serif-title" style={{ fontSize: '2rem' }}>Delivery Zones & Charges</h1>
        <p style={{ color: 'var(--text-muted)' }}>Configure coverage areas across Rawalpindi, delivery charges, and minimum order requirements.</p>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Zone / Area</th>
              <th>Estimated Time</th>
              <th>Delivery Fee (PKR)</th>
              <th>Min Order (PKR)</th>
              <th>Coverage Level</th>
              <th>Status</th>
              <th>Toggle</th>
            </tr>
          </thead>
          <tbody>
            {settings.deliveryZones.map(zone => (
              <tr key={zone.id}>
                <td>
                  <div style={{ fontWeight: 700 }}>{zone.nameEn}</div>
                  <small style={{ color: 'var(--text-dim)' }}>{zone.nameUr}</small>
                </td>
                <td>{zone.estimatedTimeEn}</td>
                <td>
                  <input
                    type="number"
                    value={zone.fee}
                    onChange={e => updateDeliveryZone(zone.id, { fee: Number(e.target.value) })}
                    className="form-input"
                    style={{ width: '90px', padding: '4px 8px' }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={zone.minOrder}
                    onChange={e => updateDeliveryZone(zone.id, { minOrder: Number(e.target.value) })}
                    className="form-input"
                    style={{ width: '100px', padding: '4px 8px' }}
                  />
                </td>
                <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {zone.coverageEn}
                </td>
                <td>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: zone.isActive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: zone.isActive ? '#4ade80' : '#f87171'
                    }}
                  >
                    {zone.isActive ? 'SERVICEABLE' : 'PAUSED'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => updateDeliveryZone(zone.id, { isActive: !zone.isActive })}
                    className="btn-hero-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                  >
                    {zone.isActive ? 'Pause' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
