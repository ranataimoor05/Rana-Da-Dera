import React from 'react';
import { BarChart3, TrendingUp, PieChart, Users, ShoppingBag } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { formatCurrency } from '../../utils/currency';

export const AdminReportsPage: React.FC = () => {
  const { orders, reservations } = useOrders();
  const { dishes } = useRestaurant();

  const totalSales = orders.reduce((sum, o) => sum + o.pricing.total, 0);

  const topDishes = [
    { name: 'Mutton Karahi Desi Ghee', ordersCount: 42, revenue: 92400 },
    { name: 'Chicken Handi (Boneless)', ordersCount: 38, revenue: 60800 },
    { name: 'Royal Mix BBQ Platter', ordersCount: 26, revenue: 91000 },
    { name: 'Dera Special Beef Nihari', ordersCount: 31, revenue: 34100 },
    { name: 'Special Chicken Biryani', ordersCount: 29, revenue: 27550 }
  ];

  return (
    <div className="admin-reports-page">
      <div style={{ marginBottom: '24px' }}>
        <h1 className="serif-title" style={{ fontSize: '2rem' }}>Analytics & Sales Reports</h1>
        <p style={{ color: 'var(--text-muted)' }}>Demonstration analytics covering order volumes, revenue, and popular culinary specialties.</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon"><TrendingUp size={24} /></div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Total Processed Revenue</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-gold)' }}>
              {formatCurrency(totalSales)}
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon"><ShoppingBag size={24} /></div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Completed Orders</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{orders.length}</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon"><BarChart3 size={24} /></div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Avg Ticket Size</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              {formatCurrency(orders.length ? Math.round(totalSales / orders.length) : 0)}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 className="serif-title" style={{ fontSize: '1.3rem', marginBottom: '18px' }}>
          Top Selling Dishes (Weekly Volume)
        </h3>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Dish Title</th>
                <th>Units Sold</th>
                <th>Generated Revenue</th>
                <th>Popularity Share</th>
              </tr>
            </thead>
            <tbody>
              {topDishes.map((dish, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{dish.name}</td>
                  <td>{dish.ordersCount} servings</td>
                  <td style={{ fontWeight: 800, color: 'var(--text-gold)' }}>{formatCurrency(dish.revenue)}</td>
                  <td>
                    <div style={{ width: '100%', maxWidth: '160px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ width: `${dish.ordersCount * 2}%`, height: '100%', background: 'var(--color-gold-400)' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '16px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          ℹ️ Note: Statistics generated from demonstration order repository. Backend synchronization required for production auditing.
        </div>
      </div>
    </div>
  );
};
