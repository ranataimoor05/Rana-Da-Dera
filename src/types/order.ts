export type FulfillmentType = 'delivery' | 'pickup';

export type PaymentMethodType = 'cod' | 'jazzcash' | 'easypaisa' | 'card';

export type PaymentStatusType = 'pending' | 'successful' | 'failed' | 'cancelled' | 'refunded';

export type OrderStageType = 'received' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'ready_for_pickup' | 'completed' | 'cancelled';

export interface SelectedOption {
  groupId: string;
  groupTitleEn: string;
  optionId: string;
  optionNameEn: string;
  priceDelta: number;
}

export interface CartItem {
  cartItemId: string; // unique item instance ID (accounts for different customizations)
  dishId: string;
  nameEn: string;
  nameUr: string;
  basePrice: number;
  finalUnitPrice: number; // base + sum of selected options
  quantity: number;
  image: string;
  selectedOptions: SelectedOption[];
  specialInstructions?: string;
}

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  addressLine: string;
  zoneId: string;
  zoneName: string;
  city: string;
  landmark?: string;
  deliveryNotes?: string;
}

export interface PickupDetails {
  fullName: string;
  phone: string;
  pickupTimePreference?: string;
  pickupNotes?: string;
}

export interface OrderPricing {
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  tax: number;
  total: number;
}

export interface Order {
  id: string; // e.g. "RDD-74921"
  createdAt: string;
  fulfillmentType: FulfillmentType;
  deliveryDetails?: DeliveryDetails;
  pickupDetails?: PickupDetails;
  items: CartItem[];
  pricing: OrderPricing;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatusType;
  currentStage: OrderStageType;
  estimatedTime: string;
  customerNote?: string;
  isDemoOrder: boolean;
  history: {
    stage: OrderStageType;
    timestamp: string;
    note: string;
  }[];
}
