import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RestaurantSettings, DeliveryZone } from '../types/settings';
import { Dish, ComboDeal } from '../types/menu';
import { initialRestaurantSettings } from '../mocks/mockSettings';
import { mockDishes, mockCombos } from '../mocks/mockMenu';
import { storage } from '../utils/storage';

interface RestaurantContextType {
  settings: RestaurantSettings;
  dishes: Dish[];
  combos: ComboDeal[];
  isKitchenOpen: boolean;
  updateSettings: (newSettings: Partial<RestaurantSettings>) => void;
  updateDeliveryZone: (zoneId: string, updates: Partial<DeliveryZone>) => void;
  toggleDishAvailability: (dishId: string) => void;
  toggleComboAvailability: (comboId: string) => void;
  resetToDefaults: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<RestaurantSettings>(() => {
    return storage.get<RestaurantSettings>('settings', initialRestaurantSettings);
  });

  const [dishes, setDishes] = useState<Dish[]>(() => {
    return storage.get<Dish[]>('dishes', mockDishes);
  });

  const [combos, setCombos] = useState<ComboDeal[]>(() => {
    return storage.get<ComboDeal[]>('combos', mockCombos);
  });

  // Check if current local hour falls in 2:00 AM (02:00) to 3:00 PM (15:00)
  const [isKitchenOpen, setIsKitchenOpen] = useState<boolean>(() => {
    const currentHour = new Date().getHours();
    return currentHour >= settings.hours.openHour && currentHour < settings.hours.closeHour;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentHour = new Date().getHours();
      setIsKitchenOpen(currentHour >= settings.hours.openHour && currentHour < settings.hours.closeHour);
    }, 60000);
    return () => clearInterval(interval);
  }, [settings.hours]);

  useEffect(() => {
    storage.set('settings', settings);
  }, [settings]);

  useEffect(() => {
    storage.set('dishes', dishes);
  }, [dishes]);

  useEffect(() => {
    storage.set('combos', combos);
  }, [combos]);

  const updateSettings = (newSettings: Partial<RestaurantSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateDeliveryZone = (zoneId: string, updates: Partial<DeliveryZone>) => {
    setSettings(prev => ({
      ...prev,
      deliveryZones: prev.deliveryZones.map(z => (z.id === zoneId ? { ...z, ...updates } : z))
    }));
  };

  const toggleDishAvailability = (dishId: string) => {
    setDishes(prev =>
      prev.map(d => (d.id === dishId ? { ...d, isAvailable: !d.isAvailable } : d))
    );
  };

  const toggleComboAvailability = (comboId: string) => {
    setCombos(prev =>
      prev.map(c => (c.id === comboId ? { ...c, isAvailable: !c.isAvailable } : c))
    );
  };

  const resetToDefaults = () => {
    setSettings(initialRestaurantSettings);
    setDishes(mockDishes);
    setCombos(mockCombos);
    storage.remove('settings');
    storage.remove('dishes');
    storage.remove('combos');
  };

  return (
    <RestaurantContext.Provider
      value={{
        settings,
        dishes,
        combos,
        isKitchenOpen,
        updateSettings,
        updateDeliveryZone,
        toggleDishAvailability,
        toggleComboAvailability,
        resetToDefaults
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
