import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, OrderPricing, SelectedOption } from '../types/order';
import { Coupon } from '../types/promotions';
import { initialCoupons } from '../mocks/mockSettings';
import { useRestaurant } from './RestaurantContext';
import { storage } from '../utils/storage';

interface AddToCartParams {
  dishId: string;
  nameEn: string;
  nameUr: string;
  basePrice: number;
  image: string;
  quantity?: number;
  selectedOptions?: SelectedOption[];
  specialInstructions?: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  pricing: OrderPricing;
  isCartDrawerOpen: boolean;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  addItem: (params: AddToCartParams) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { settings } = useRestaurant();
  const [items, setItems] = useState<CartItem[]>(() => {
    return storage.get<CartItem[]>('cart_items', []);
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    return storage.get<Coupon | null>('applied_coupon', null);
  });
  const [couponError, setCouponError] = useState<string | null>(null);

  // Sync to storage
  useEffect(() => {
    storage.set('cart_items', items);
  }, [items]);

  useEffect(() => {
    storage.set('applied_coupon', appliedCoupon);
  }, [appliedCoupon]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal calculation
  const subtotal = items.reduce((sum, item) => sum + item.finalUnitPrice * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minSpend) {
    if (appliedCoupon.type === 'percent') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  // Delivery fee (default 0 or standard)
  const deliveryFee = 0; // calculated at checkout according to selected zone

  // Tax and service charge
  const tax = Math.round(((subtotal - discount) * settings.taxRatePercent) / 100);
  const serviceFee = Math.round(((subtotal - discount) * settings.serviceFeePercent) / 100);

  const total = Math.max(0, subtotal - discount + deliveryFee + tax + serviceFee);

  const pricing: OrderPricing = {
    subtotal,
    discount,
    couponCode: appliedCoupon?.code,
    deliveryFee,
    tax: tax + serviceFee,
    total
  };

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);
  const toggleCartDrawer = () => setIsCartDrawerOpen(prev => !prev);

  const addItem = ({
    dishId,
    nameEn,
    nameUr,
    basePrice,
    image,
    quantity = 1,
    selectedOptions = [],
    specialInstructions = ''
  }: AddToCartParams) => {
    // Generate signature for item customizations to merge identical custom items
    const optionKey = selectedOptions
      .map(o => o.optionId)
      .sort()
      .join('-');
    const cartItemId = `${dishId}_${optionKey}_${specialInstructions.trim().toLowerCase()}`;

    const optionSum = selectedOptions.reduce((acc, opt) => acc + opt.priceDelta, 0);
    const finalUnitPrice = basePrice + optionSum;

    setItems(prevItems => {
      const existing = prevItems.find(i => i.cartItemId === cartItemId);
      if (existing) {
        return prevItems.map(i =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prevItems,
        {
          cartItemId,
          dishId,
          nameEn,
          nameUr,
          basePrice,
          finalUnitPrice,
          quantity,
          image,
          selectedOptions,
          specialInstructions
        }
      ];
    });

    openCartDrawer();
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeItem = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const cleanCode = code.trim().toUpperCase();
    const coupon = initialCoupons.find(c => c.code === cleanCode && c.isActive);

    if (!coupon) {
      setCouponError('Invalid coupon code.');
      return false;
    }

    if (subtotal < coupon.minSpend) {
      setCouponError(`Minimum spend of Rs. ${coupon.minSpend} required for this coupon.`);
      return false;
    }

    setAppliedCoupon(coupon);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        pricing,
        isCartDrawerOpen,
        appliedCoupon,
        couponError,
        openCartDrawer,
        closeCartDrawer,
        toggleCartDrawer,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
