import React from 'react';
import { CalendarDays, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { ReservationStatus } from '../../types/reservation';

export const AdminReservationsPage: React.FC = () => {
  const { reservations, updateReservationStatus } = useOrders();

  return (
    <div className="admin-reservations-page">
      <div style={{ marginBottom: '24px' }}>
        <h1 className="serif-title" style={{ fontSize: '2rem' }}>Table Bookings Management</h1>
        <p style={{ color: 'var(--text-muted)' }}>Review incoming table requests, assign booths, and update booking status.</p>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ref</th>
              <th>Customer</th>
              <th>Date & Time</th>
              <th>Guests</th>
              <th>Occasion</th>
              <th>Seating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-gold)' }}>#{res.id}</td>
                <td>
                  <div>{res.customerName}</div>
                  <small style={{ color: 'var(--text-dim)' }}>{res.phone}</small>
                </td>
                <td>{res.date} at {res.time}</td>
                <td style={{ fontWeight: 700 }}>{res.guestCount} Guests</td>
                <td style={{ textTransform: 'capitalize' }}>{res.occasion.replace(/_/g, ' ')}</td>
                <td style={{ textTransform: 'capitalize' }}>{res.seatingPreference.replace(/_/g, ' ')}</td>
                <td>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: res.status === 'confirmed' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(241, 199, 75, 0.15)',
                      color: res.status === 'confirmed' ? '#4ade80' : 'var(--color-gold-400)'
                    }}
                  >
                    {res.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {res.status !== 'confirmed' && (
                      <button
                        onClick={() => updateReservationStatus(res.id, 'confirmed')}
                        className="btn-hero-primary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        Approve
                      </button>
                    )}
                    {res.status !== 'cancelled' && (
                      <button
                        onClick={() => updateReservationStatus(res.id, 'cancelled')}
                        className="btn-hero-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#ef4444' }}
                      >
                        Decline
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
