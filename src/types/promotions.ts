export interface Coupon {
  code: string;
  type: 'percent' | 'flat';
  value: number; // e.g. 10 for 10%, or 200 for Rs. 200
  minSpend: number;
  labelEn: string;
  labelUr: string;
  descriptionEn: string;
  descriptionUr: string;
  expiresAt?: string;
  applicableCategories?: string[];
  isActive: boolean;
}

export interface LoyaltyReward {
  id: string;
  titleEn: string;
  titleUr: string;
  pointsCost: number;
  discountValue: number; // in PKR
  descriptionEn: string;
  descriptionUr: string;
  icon: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1-5
  date: string;
  commentEn: string;
  commentUr: string;
  dishName?: string;
  location: string;
  isVerifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'rejected';
}
