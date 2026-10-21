import React, { useState, useEffect } from 'react';
import { Dish, CustomizationOption, CustomizationGroup } from '../../types/menu';
import { SelectedOption } from '../../types/order';
import { X, Plus, Minus, Check, ShoppingBag, AlertCircle } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/currency';
import './DishCustomizerModal.css';

interface DishCustomizerModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DishCustomizerModal: React.FC<DishCustomizerModalProps> = ({
  dish,
  isOpen,
  onClose
}) => {
  const { t, language } = useI18n();
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptionsMap, setSelectedOptionsMap] = useState<Record<string, CustomizationOption[]>>({});
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Initialize defaults whenever dish changes
  useEffect(() => {
    if (dish && dish.customizationGroups) {
      const initialMap: Record<string, CustomizationOption[]> = {};
      dish.customizationGroups.forEach(group => {
        const defaultOpt = group.options.find(opt => opt.isDefault);
        if (defaultOpt) {
          initialMap[group.id] = [defaultOpt];
        } else if (group.required && group.options.length > 0) {
          initialMap[group.id] = [group.options[0]];
        } else {
          initialMap[group.id] = [];
        }
      });
      setSelectedOptionsMap(initialMap);
      setQuantity(1);
      setSpecialInstructions('');
      setValidationError(null);
    }
  }, [dish]);

  if (!isOpen || !dish) return null;

  const handleSingleSelect = (group: CustomizationGroup, option: CustomizationOption) => {
    setSelectedOptionsMap(prev => ({
      ...prev,
      [group.id]: [option]
    }));
    setValidationError(null);
  };

  const handleMultiSelect = (group: CustomizationGroup, option: CustomizationOption) => {
    setSelectedOptionsMap(prev => {
      const currentList = prev[group.id] || [];
      const exists = currentList.some(o => o.id === option.id);
      if (exists) {
        return {
          ...prev,
          [group.id]: currentList.filter(o => o.id !== option.id)
        };
      }
      if (currentList.length >= group.maxSelections) {
        return prev; // limit reached
      }
      return {
        ...prev,
        [group.id]: [...currentList, option]
      };
    });
    setValidationError(null);
  };

  // Calculate live price
  const basePrice = dish.price;
  let optionsDeltaTotal = 0;
  Object.values(selectedOptionsMap).forEach(list => {
    list.forEach(opt => {
      optionsDeltaTotal += opt.priceDelta;
    });
  });
  const unitPrice = basePrice + optionsDeltaTotal;
  const grandTotal = unitPrice * quantity;

  const handleAddToCart = () => {
    // Validate required groups
    if (dish.customizationGroups) {
      for (const group of dish.customizationGroups) {
        const chosen = selectedOptionsMap[group.id] || [];
        if (group.required && chosen.length < group.minSelections) {
          setValidationError(`Please select an option for "${group.titleEn}".`);
          return;
        }
      }
    }

    // Convert options map to SelectedOption array
    const flattenedOptions: SelectedOption[] = [];
    if (dish.customizationGroups) {
      dish.customizationGroups.forEach(group => {
        const chosen = selectedOptionsMap[group.id] || [];
        chosen.forEach(opt => {
          flattenedOptions.push({
            groupId: group.id,
            groupTitleEn: group.titleEn,
            optionId: opt.id,
            optionNameEn: opt.nameEn,
            priceDelta: opt.priceDelta
          });
        });
      });
    }

    addItem({
      dishId: dish.id,
      nameEn: dish.nameEn,
      nameUr: dish.nameUr,
      basePrice: dish.price,
      image: dish.image,
      quantity,
      selectedOptions: flattenedOptions,
      specialInstructions: specialInstructions.trim()
    });

    onClose();
  };

  return (
    <div className={`customizer-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} aria-hidden="true">
      <div
        className="customizer-dialog"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Customize ${dish.nameEn}`}
      >
        {/* Header with image */}
        <div className="customizer-header">
          <img src={dish.image} alt={dish.nameEn} className="customizer-header-img" />
          <button onClick={onClose} className="customizer-close-btn" aria-label="Close dialog">
            <X size={18} />
          </button>
          <div className="customizer-header-gradient">
            <div>
              <h2 className="serif-title" style={{ fontSize: '1.4rem', color: '#fff' }}>
                {language === 'ur' ? dish.nameUr : dish.nameEn}
              </h2>
              <span className="gold-text" style={{ fontWeight: 700 }}>
                {formatCurrency(basePrice)} (Base)
              </span>
            </div>
          </div>
        </div>

        {/* Options Body */}
        <div className="customizer-body">
          {validationError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                color: '#fca5a5',
                fontSize: '0.85rem'
              }}
            >
              <AlertCircle size={18} />
              <span>{validationError}</span>
            </div>
          )}

          {dish.customizationGroups?.map(group => {
            const isSingle = group.maxSelections === 1;
            const chosen = selectedOptionsMap[group.id] || [];

            return (
              <div key={group.id} className="customizer-group">
                <div className="customizer-group-title">
                  <span className="group-name">
                    {language === 'ur' ? group.titleUr : group.titleEn}
                  </span>
                  <span className={`group-required-tag ${group.required ? 'required' : 'optional'}`}>
                    {group.required ? 'Required' : 'Optional'}
                  </span>
                </div>

                <div>
                  {group.options.map(option => {
                    const isSelected = chosen.some(o => o.id === option.id);
                    return (
                      <div
                        key={option.id}
                        onClick={() =>
                          isSingle ? handleSingleSelect(group, option) : handleMultiSelect(group, option)
                        }
                        className={`option-row ${isSelected ? 'selected' : ''}`}
                        role={isSingle ? 'radio' : 'checkbox'}
                        aria-checked={isSelected}
                        tabIndex={0}
                      >
                        <div className="option-label-wrapper">
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: isSingle ? '50%' : '4px',
                              border: isSelected ? '2px solid var(--color-gold-400)' : '2px solid var(--border-glass)',
                              background: isSelected ? 'var(--color-gold-400)' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--color-primary-950)'
                            }}
                          >
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className="option-name">
                            {language === 'ur' ? option.nameUr : option.nameEn}
                          </span>
                        </div>

                        {option.priceDelta > 0 && (
                          <span className="option-delta">+{formatCurrency(option.priceDelta)}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Special Instructions */}
          <div className="customizer-group">
            <label className="group-name" style={{ display: 'block', marginBottom: '8px' }}>
              {t('specialInstructions')}
            </label>
            <textarea
              value={specialInstructions}
              onChange={e => setSpecialInstructions(e.target.value)}
              placeholder={t('specialInstructionsPlaceholder')}
              maxLength={200}
              className="instructions-textarea"
            />
          </div>
        </div>

        {/* Footer with Quantity & Add to Cart button */}
        <div className="customizer-footer">
          <div className="qty-controls" style={{ padding: '4px 10px' }}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="qty-btn"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="qty-val" style={{ fontSize: '1rem', minWidth: '24px' }}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="qty-btn"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="customizer-footer-total">
            <span className="customizer-footer-label">{t('total')}</span>
            <span className="customizer-footer-price">{formatCurrency(grandTotal)}</span>
          </div>

          <button onClick={handleAddToCart} className="btn-checkout-primary" style={{ flex: 1 }}>
            <ShoppingBag size={18} />
            <span>{t('addToCart')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
