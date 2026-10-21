import React, { useState } from 'react';
import { UtensilsCrossed, CheckCircle2, XCircle, Search, Edit3 } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { formatCurrency } from '../../utils/currency';

export const AdminMenuPage: React.FC = () => {
  const { dishes, toggleDishAvailability } = useRestaurant();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredDishes = dishes.filter(d => {
    if (selectedCat !== 'all' && d.category !== selectedCat) return false;
    if (search.trim() && !d.nameEn.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="admin-menu-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="serif-title" style={{ fontSize: '2rem' }}>Menu & Inventory Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Toggle kitchen availability, update prices, and view catalog.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            placeholder="Search dish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input"
            style={{ width: '220px' }}
          />

          <select
            value={selectedCat}
            onChange={e => setSelectedCat(e.target.value)}
            className="menu-select-filter"
          >
            <option value="all">All Categories</option>
            <option value="karahi">Karahi & Handi</option>
            <option value="bbq">Charcoal BBQ</option>
            <option value="rice">Biryani & Pulao</option>
            <option value="desi">Desi Curries & Nashta</option>
            <option value="breads">Tandoori Breads</option>
            <option value="desserts">Sweets & Lassi</option>
          </select>
        </div>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Category</th>
              <th>Base Price</th>
              <th>Spice Level</th>
              <th>Stock Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDishes.map(dish => (
              <tr key={dish.id}>
                <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={dish.image} alt={dish.nameEn} style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>{dish.nameEn}</div>
                    <small style={{ color: 'var(--text-dim)' }}>{dish.servingEn}</small>
                  </div>
                </td>
                <td style={{ textTransform: 'capitalize' }}>{dish.category}</td>
                <td style={{ fontWeight: 800, color: 'var(--text-gold)' }}>{formatCurrency(dish.price)}</td>
                <td>{dish.spiceLevel}</td>
                <td>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: dish.isAvailable ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: dish.isAvailable ? '#4ade80' : '#f87171'
                    }}
                  >
                    {dish.isAvailable ? 'In Stock (Cooking)' : 'Sold Out Today'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => toggleDishAvailability(dish.id)}
                    className="btn-hero-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    {dish.isAvailable ? 'Mark Sold Out' : 'Restore Stock'}
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
