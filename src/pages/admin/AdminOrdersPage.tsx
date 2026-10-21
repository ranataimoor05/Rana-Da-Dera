import React, { useState } from 'react';
import { ShoppingBag, Eye, CheckCircle2, Clock, Filter, AlertTriangle } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { Order, OrderStageType } from '../../types/order';
import { formatCurrency } from '../../utils/currency';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [stageFilter, setStageFilter] = useState<string>('all');

  const filteredOrders = orders.filter(o => {
    if (stageFilter === 'all') return true;
    return o.currentStage === stageFilter;
  });

  return (
    <div className="admin-orders-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="serif-title" style={{ fontSize: '2rem' }}>Order Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Inspect items, special instructions, and advance status pipeline.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Filter size={16} className="gold-text" />
          <select
            value={stageFilter}
            onChange={e => setStageFilter(e.target.value)}
            className="menu-select-filter"
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="received">Received</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-table-wrapper" style={{ marginBottom: '24px' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order Ref</th>
              <th>Customer</th>
              <th>Destination</th>
              <th>Total (PKR)</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-gold)' }}>#{order.id}</td>
                <td>
                  <div>{order.deliveryDetails?.fullName || order.pickupDetails?.fullName || 'Guest'}</div>
                  <small style={{ color: 'var(--text-dim)' }}>{order.deliveryDetails?.phone || order.pickupDetails?.phone}</small>
                </td>
                <td>
                  {order.fulfillmentType === 'delivery' ? (
                    <div>{order.deliveryDetails?.zoneName}</div>
                  ) : (
                    <span style={{ color: 'var(--color-gold-400)' }}>Takeaway Counter</span>
                  )}
                </td>
                <td style={{ fontWeight: 800 }}>{formatCurrency(order.pricing.total)}</td>
                <td>
                  <span style={{ fontSize: '0.8rem', color: order.paymentStatus === 'successful' ? '#4ade80' : '#f59e0b' }}>
                    {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
                  </span>
                </td>
                <td>
                  <select
                    value={order.currentStage}
                    onChange={e => updateOrderStatus(order.id, e.target.value as OrderStageType)}
                    className="menu-select-filter"
                    style={{ fontSize: '0.78rem', padding: '4px 8px' }}
                  >
                    <option value="received">Received</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="btn-hero-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <Eye size={14} />
                    <span>Inspect</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspection Modal */}
      {selectedOrder && (
        <div className="customizer-backdrop open" onClick={() => setSelectedOrder(null)}>
          <div className="customizer-dialog" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <h3 className="serif-title" style={{ fontSize: '1.3rem' }}>
                Order #{selectedOrder.id} Inspection
              </h3>
              <button onClick={() => setSelectedOrder(null)} className="cart-drawer-close">✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <strong>Customer:</strong> {selectedOrder.deliveryDetails?.fullName || selectedOrder.pickupDetails?.fullName} ({selectedOrder.deliveryDetails?.phone || selectedOrder.pickupDetails?.phone})
              </div>
              {selectedOrder.deliveryDetails && (
                <div>
                  <strong>Address:</strong> {selectedOrder.deliveryDetails.addressLine}, {selectedOrder.deliveryDetails.zoneName}, Rawalpindi
                </div>
              )}
              {selectedOrder.deliveryDetails?.deliveryNotes && (
                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
                  <strong>Special Instructions:</strong> "{selectedOrder.deliveryDetails.deliveryNotes}"
                </div>
              )}

              <h4 style={{ marginTop: '10px' }}>Itemized Dishes:</h4>
              {selectedOrder.items.map(item => (
                <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                  <div>
                    <div>{item.quantity}x {item.nameEn}</div>
                    {item.selectedOptions.map(o => (
                      <small key={o.optionId} style={{ color: 'var(--text-muted)', display: 'block' }}>• {o.optionNameEn}</small>
                    ))}
                    {item.specialInstructions && (
                      <small style={{ color: 'var(--text-gold)', display: 'block' }}>Note: {item.specialInstructions}</small>
                    )}
                  </div>
                  <strong className="gold-text">{formatCurrency(item.finalUnitPrice * item.quantity)}</strong>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800 }}>
              <span>Grand Total:</span>
              <span className="gold-text">{formatCurrency(selectedOrder.pricing.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
