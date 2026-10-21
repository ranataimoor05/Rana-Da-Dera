export type CategoryId = 'all' | 'karahi' | 'bbq' | 'rice' | 'desi' | 'breads' | 'desserts' | 'combos';

export interface Category {
  id: CategoryId;
  nameEn: string;
  nameUr: string;
  iconName: string;
  descriptionEn: string;
  descriptionUr: string;
}

export interface CustomizationOption {
  id: string;
  nameEn: string;
  nameUr: string;
  priceDelta: number;
  isDefault?: boolean;
}

export interface CustomizationGroup {
  id: string;
  titleEn: string;
  titleUr: string;
  required: boolean;
  minSelections: number;
  maxSelections: number;
  options: CustomizationOption[];
}

export interface Dish {
  id: string;
  nameEn: string;
  nameUr: string;
  category: CategoryId;
  price: number;
  originalPrice?: number; // for promotional pricing
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

export interface ComboDeal {
  id: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  servingEn: string;
  servingUr: string;
  price: number;
  originalPrice: number;
  includedDishes: string[];
  customizationSummaryEn: string;
  customizationSummaryUr: string;
  image: string;
  isAvailable: boolean;
}
