# Domain Data Models — Rana Da Dera

## 1. Dish Model
```typescript
interface Dish {
  id: string; // e.g. "mutton-karahi"
  nameEn: string;
  nameUr: string;
  category: 'karahi' | 'bbq' | 'rice' | 'desi' | 'breads' | 'desserts' | 'combos';
  price: number; // e.g. 2200
  originalPrice?: number;
  descriptionEn: string;
  descriptionUr: string;
  badgeEn?: string;
  badgeUr?: string;
  spiceLevel: 'None' | 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  servingEn: string;
  servingUr: string;
  ingredientsEn: string[];
  ingredientsUr: string[];
  dietary: {
    isHalal: boolean;
    isVegetarian: boolean;
    isVegan: boolean;
    containsGluten: boolean;
    containsDairy: boolean;
    containsNuts: boolean;
  };
  image: string;
  isPopular: boolean;
  isAvailable: boolean;
  customizationGroups?: CustomizationGroup[];
}
```

## 2. Order Model
```typescript
interface Order {
  id: string; // "RDD-74921"
  createdAt: string;
  fulfillmentType: 'delivery' | 'pickup';
  deliveryDetails?: DeliveryDetails;
  pickupDetails?: PickupDetails;
  items: CartItem[];
  pricing: {
    subtotal: number;
    discount: number;
    couponCode?: string;
    deliveryFee: number;
    tax: number;
    total: number;
  };
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'card';
  paymentStatus: 'pending' | 'successful' | 'failed' | 'cancelled' | 'refunded';
  currentStage: 'received' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'completed' | 'cancelled';
  estimatedTime: string;
  isDemoOrder: boolean;
  history: {
    stage: string;
    timestamp: string;
    note: string;
  }[];
}
```

## 3. Table Reservation Model
```typescript
interface Reservation {
  id: string; // "RES-3821"
  customerName: string;
  phone: string;
  email?: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
  guestCount: number;
  occasion: 'regular' | 'birthday' | 'anniversary' | 'business' | 'family_gathering';
  seatingPreference: 'indoor_royal' | 'outdoor_courtyard' | 'private_dining' | 'no_preference';
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'seated' | 'completed';
  createdAt: string;
  isDemoBooking: boolean;
}
```
