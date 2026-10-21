import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '../utils/storage';

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (dishId: string) => boolean;
  toggleWishlist: (dishId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    return storage.get<string[]>('wishlist_ids', ['mutton-karahi', 'chicken-handi', 'nihari-special']);
  });

  useEffect(() => {
    storage.set('wishlist_ids', wishlistIds);
  }, [wishlistIds]);

  const isInWishlist = (dishId: string): boolean => {
    return wishlistIds.includes(dishId);
  };

  const toggleWishlist = (dishId: string) => {
    setWishlistIds(prev =>
      prev.includes(dishId) ? prev.filter(id => id !== dishId) : [...prev, dishId]
    );
  };

  const clearWishlist = () => {
    setWishlistIds([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, isInWishlist, toggleWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
