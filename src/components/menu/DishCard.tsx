import React from 'react';
import { Dish } from '../../types/menu';
import { Heart, Plus, Flame, Users, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/currency';
import './DishCard.css';

interface DishCardProps {
  dish: Dish;
  onOpenCustomizer: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onOpenCustomizer }) => {
  const { t, language } = useI18n();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(dish.id);
  const hasCustomizations = dish.customizationGroups && dish.customizationGroups.length > 0;

  const handleActionClick = () => {
    if (!dish.isAvailable) return;
    if (hasCustomizations) {
      onOpenCustomizer(dish);
    } else {
      addItem({
        dishId: dish.id,
        nameEn: dish.nameEn,
        nameUr: dish.nameUr,
        basePrice: dish.price,
        image: dish.image,
        quantity: 1
      });
    }
  };

  const badgeText = language === 'ur' ? dish.badgeUr || dish.badgeEn : dish.badgeEn;

  return (
    <article className="dish-card" aria-label={dish.nameEn}>
      {/* Sold Out Overlay if unavailable */}
      {!dish.isAvailable && (
        <div className="dish-sold-out-overlay" aria-live="polite">
          <span style={{ fontWeight: 800, color: '#ef4444', letterSpacing: '1px' }}>
            {t('soldOut')}
          </span>
          <span style={{ fontSize: '0.8rem' }}>Check back tomorrow at 2:00 AM</span>
        </div>
      )}

      {/* Media Image & Wishlist Button */}
      <div className="dish-card-media">
        <img
          src={dish.image}
          alt={language === 'ur' ? dish.nameUr : dish.nameEn}
          className="dish-card-img"
          loading="lazy"
        />
        {badgeText && <span className="dish-badge-pill">{badgeText}</span>}
        <button
          onClick={() => toggleWishlist(dish.id)}
          className={`btn-wishlist-toggle ${isFavorited ? 'active' : ''}`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isFavorited ? '#ef4444' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="dish-card-content">
        <div className="dish-card-header">
          <h3 className="dish-card-title">{language === 'ur' ? dish.nameUr : dish.nameEn}</h3>
          <span className="dish-card-price">{formatCurrency(dish.price)}</span>
        </div>

        <p className="dish-card-desc">{language === 'ur' ? dish.descriptionUr : dish.descriptionEn}</p>

        {/* Dish Metadata (Serving & Spice) */}
        <div className="dish-card-meta">
          <div className="dish-meta-item" title="Serving Size">
            <Users size={14} className="gold-text" />
            <span>{language === 'ur' ? dish.servingUr : dish.servingEn}</span>
          </div>
          {dish.spiceLevel !== 'None' && (
            <div className="dish-meta-item" title={`Spice level: ${dish.spiceLevel}`}>
              <Flame size={14} color="#f97316" />
              <span>{dish.spiceLevel}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="dish-card-actions">
          <button
            onClick={handleActionClick}
            disabled={!dish.isAvailable}
            className="btn-add-dish"
            aria-label={hasCustomizations ? `Customize ${dish.nameEn}` : `Add ${dish.nameEn} to cart`}
          >
            {hasCustomizations ? (
              <>
                <SlidersHorizontal size={16} />
                <span>{t('customizeDish')}</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>{t('addToCart')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
