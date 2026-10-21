import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useRestaurant } from '../context/RestaurantContext';
import { useCart } from '../context/CartContext';
import { DishCard } from '../components/menu/DishCard';
import { DishCustomizerModal } from '../components/menu/DishCustomizerModal';
import { mockCategories } from '../mocks/mockMenu';
import { Dish, ComboDeal, CategoryId } from '../types/menu';
import { formatCurrency } from '../utils/currency';
import './MenuPage.css';

export const MenuPage: React.FC = () => {
  const { t, language } = useI18n();
  const { dishes, combos } = useRestaurant();
  const { addItem } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = (searchParams.get('cat') as CategoryId) || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'spicy'>('all');
  const [hideSoldOut, setHideSoldOut] = useState(false);
  const [customizingDish, setCustomizingDish] = useState<Dish | null>(null);

  const handleCategorySelect = (catId: CategoryId) => {
    if (catId === 'all') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat: catId });
    }
  };

  // Filter & Search Logic
  const filteredDishes = useMemo(() => {
    return dishes.filter(dish => {
      // Category filter
      if (activeCategory !== 'all' && activeCategory !== 'combos' && dish.category !== activeCategory) {
        return false;
      }
      // Availability filter
      if (hideSoldOut && !dish.isAvailable) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && !dish.dietary.isVegetarian) {
        return false;
      }
      if (dietaryFilter === 'spicy' && dish.spiceLevel !== 'Hot' && dish.spiceLevel !== 'Extra Hot') {
        return false;
      }
      // Bilingual search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchEn = dish.nameEn.toLowerCase().includes(q) || dish.descriptionEn.toLowerCase().includes(q);
        const matchUr = dish.nameUr.includes(q) || dish.descriptionUr.includes(q);
        const matchIng = dish.ingredientsEn.some(ing => ing.toLowerCase().includes(q));
        if (!matchEn && !matchUr && !matchIng) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      return 0;
    });
  }, [dishes, activeCategory, hideSoldOut, dietaryFilter, searchQuery, sortBy]);

  const showCombos = activeCategory === 'all' || activeCategory === 'combos';

  const handleAddCombo = (combo: ComboDeal) => {
    addItem({
      dishId: combo.id,
      nameEn: combo.titleEn,
      nameUr: combo.titleUr,
      basePrice: combo.price,
      image: combo.image,
      quantity: 1
    });
  };

  return (
    <div className="menu-page">
      <div className="container">
        {/* Banner */}
        <div className="menu-header-banner">
          <span className="section-subtitle gold-text">Naseerabad, Rawalpindi • Desi Cuisine</span>
          <h1 className="serif-title gold-gradient-text" style={{ fontSize: '2.6rem' }}>
            {t('navMenu')}
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '8px auto 0' }}>
            Cooked in genuine iron karahis, clay handis, and acacia charcoal with 100% pure desi ghee.
          </p>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="menu-search-filter-bar">
          <div className="menu-search-box">
            <Search size={18} className="menu-search-icon" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="menu-search-input"
              aria-label="Search dishes"
            />
          </div>

          <div className="menu-controls-group">
            {/* Dietary */}
            <select
              value={dietaryFilter}
              onChange={e => setDietaryFilter(e.target.value as any)}
              className="menu-select-filter"
              aria-label="Filter by dietary preference"
            >
              <option value="all">{t('filterAll')}</option>
              <option value="veg">{t('filterVegetarian')}</option>
              <option value="spicy">{t('filterSpicy')}</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="menu-select-filter"
              aria-label="Sort dishes"
            >
              <option value="default">{t('sortDefault')}</option>
              <option value="priceAsc">{t('sortPriceAsc')}</option>
              <option value="priceDesc">{t('sortPriceDesc')}</option>
            </select>

            {/* Hide Sold Out Checkbox */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={hideSoldOut}
                onChange={e => setHideSoldOut(e.target.checked)}
              />
              <span>{t('filterAvailableOnly')}</span>
            </label>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Category Chips */}
        <div className="category-chips-scroll" role="tablist">
          {mockCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
              role="tab"
              aria-selected={activeCategory === cat.id}
            >
              {language === 'ur' ? cat.nameUr : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Main Content Layout with Desktop Sidebar */}
        <div className="menu-layout has-sidebar">
          {/* Desktop Category Sidebar */}
          <aside className="menu-sidebar" aria-label="Menu categories">
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
              Categories
            </h3>
            {mockCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`sidebar-category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <span>{language === 'ur' ? cat.nameUr : cat.nameEn}</span>
              </button>
            ))}
          </aside>

          {/* Dishes & Combos Grid */}
          <main>
            {/* Dishes */}
            {filteredDishes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                <AlertCircle size={40} style={{ margin: '0 auto 12px', color: 'var(--color-gold-400)' }} />
                <h3 className="serif-title" style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>
                  No dishes match your search
                </h3>
                <p style={{ marginTop: '6px' }}>Try adjusting your keyword or reset filters to browse full menu.</p>
              </div>
            ) : (
              <div className="menu-dishes-grid">
                {filteredDishes.map(dish => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    onOpenCustomizer={d => setCustomizingDish(d)}
                  />
                ))}
              </div>
            )}

            {/* Combos & Family Deals Section */}
            {showCombos && combos.length > 0 && (
              <div style={{ marginTop: '60px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <span className="section-subtitle gold-text">Value Bundles</span>
                  <h2 className="serif-title" style={{ fontSize: '1.8rem' }}>
                    Family Deals & Royal Combos
                  </h2>
                </div>

                <div className="combos-banner-grid">
                  {combos.map(combo => (
                    <div key={combo.id} className="combo-deal-card">
                      <div className="combo-media">
                        <img src={combo.image} alt={combo.titleEn} />
                        <span className="combo-badge">Family Pack</span>
                      </div>
                      <div className="combo-content">
                        <h3 className="combo-title serif-title">
                          {language === 'ur' ? combo.titleUr : combo.titleEn}
                        </h3>
                        <p className="combo-desc">
                          {language === 'ur' ? combo.descriptionUr : combo.descriptionEn}
                        </p>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-gold)', marginBottom: '12px' }}>
                          ✓ {combo.customizationSummaryEn}
                        </div>
                        <div className="combo-footer">
                          <div>
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-gold)' }}>
                              {formatCurrency(combo.price)}
                            </span>
                            {combo.originalPrice && (
                              <span style={{ fontSize: '0.85rem', textDecoration: 'line-through', color: 'var(--text-dim)', marginLeft: '8px' }}>
                                {formatCurrency(combo.originalPrice)}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleAddCombo(combo)}
                            className="btn-hero-primary"
                            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                          >
                            <ShoppingBag size={15} />
                            <span>{t('addToCart')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Dish Customizer Modal */}
      <DishCustomizerModal
        dish={customizingDish}
        isOpen={!!customizingDish}
        onClose={() => setCustomizingDish(null)}
      />
    </div>
  );
};
