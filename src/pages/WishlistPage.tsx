import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useWishlist } from '../context/WishlistContext';
import { useRestaurant } from '../context/RestaurantContext';
import { DishCard } from '../components/menu/DishCard';
import { DishCustomizerModal } from '../components/menu/DishCustomizerModal';
import { Dish } from '../types/menu';

export const WishlistPage: React.FC = () => {
  const { t, direction } = useI18n();
  const { wishlistIds, clearWishlist } = useWishlist();
  const { dishes } = useRestaurant();
  const [customizingDish, setCustomizingDish] = useState<Dish | null>(null);

  const favoriteDishes = dishes.filter(d => wishlistIds.includes(d.id));

  return (
    <div className="wishlist-page" style={{ padding: '40px 0 80px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="section-subtitle gold-text">Saved Favorites</span>
            <h1 className="serif-title" style={{ fontSize: '2.4rem' }}>
              {t('navWishlist')} ({favoriteDishes.length})
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>
              Your personally curated collection of royal feasts, karahis, and charcoal BBQ.
            </p>
          </div>

          {favoriteDishes.length > 0 && (
            <button
              onClick={clearWishlist}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '0.88rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Trash2 size={16} />
              <span>Clear All Favorites</span>
            </button>
          )}
        </div>

        {favoriteDishes.length === 0 ? (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <Heart size={56} style={{ color: 'var(--color-gold-400)', margin: '0 auto 16px' }} />
            <h2 className="serif-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
              No Favorites Saved Yet
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Tap the heart icon on any dish in our menu to save it to your personal feast list.
            </p>
            <Link to="/menu" className="btn-hero-primary">
              <span>{t('startOrdering')}</span>
              {direction === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          </div>
        ) : (
          <div className="menu-dishes-grid">
            {favoriteDishes.map(dish => (
              <DishCard
                key={dish.id}
                dish={dish}
                onOpenCustomizer={d => setCustomizingDish(d)}
              />
            ))}
          </div>
        )}
      </div>

      <DishCustomizerModal
        dish={customizingDish}
        isOpen={!!customizingDish}
        onClose={() => setCustomizingDish(null)}
      />
    </div>
  );
};
