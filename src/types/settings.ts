export interface DeliveryZone {
  id: string;
  nameEn: string;
  nameUr: string;
  estimatedTimeEn: string;
  estimatedTimeUr: string;
  fee: number; // 0 for FREE
  minOrder: number;
  coverageEn: string;
  coverageUr: string;
  isActive: boolean;
}

export interface OperatingHours {
  openHour: number; // 2 (meaning 2:00 AM)
  closeHour: number; // 15 (meaning 3:00 PM)
  labelEn: string;
  labelUr: string;
  daysEn: string;
  daysUr: string;
  acceptPreordersOutsideHours: boolean;
}

export interface RestaurantSettings {
  restaurantName: string;
  branchName: string;
  addressEn: string;
  addressUr: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: OperatingHours;
  minOrderAmount: number; // in PKR
  schedulingWindowHours: number; // max hours into future customers can schedule (e.g. 24)
  taxRatePercent: number; // configurable tax rate
  serviceFeePercent: number; // configurable service charge
  deliveryZones: DeliveryZone[];
  noRefundPolicySummaryEn: string;
  noRefundPolicySummaryUr: string;
}
