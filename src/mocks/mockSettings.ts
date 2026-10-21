import { RestaurantSettings } from '../types/settings';
import { Coupon, LoyaltyReward, Review } from '../types/promotions';

export const initialRestaurantSettings: RestaurantSettings = {
  restaurantName: 'Rana Da Dera',
  branchName: 'Naseerabad, Rawalpindi',
  addressEn: 'Naseerabad, Rawalpindi, Punjab, Pakistan',
  addressUr: 'نصیر آباد، راولپنڈی، پنجاب، پاکستان',
  phone: '0301-4431520',
  whatsapp: '923014431520',
  email: 'info@ranadadera.com',
  hours: {
    openHour: 2, // 2:00 AM
    closeHour: 15, // 3:00 PM
    labelEn: '2:00 AM – 3:00 PM',
    labelUr: 'صبح 2:00 بجے تا دوپہر 3:00 بجے',
    daysEn: 'Open Daily (7 Days a Week)',
    daysUr: 'روزانہ کھلا ہے (ہفتے کے ساتوں دن)',
    acceptPreordersOutsideHours: true
  },
  minOrderAmount: 500, // PKR 500
  schedulingWindowHours: 24, // Up to 24 hours in advance
  taxRatePercent: 0, // 0% configured initial tax rate
  serviceFeePercent: 0, // 0% initial
  deliveryZones: [
    {
      id: 'naseerabad',
      nameEn: 'Naseerabad (Local Dera Area)',
      nameUr: 'نصیر آباد (مقامی ڈیرہ علاقہ)',
      estimatedTimeEn: '15–25 Mins',
      estimatedTimeUr: '15 تا 25 منٹ',
      fee: 0,
      minOrder: 500,
      coverageEn: 'Immediate Express Hot Delivery',
      coverageUr: 'فوری گرم ایکسپریس ڈیلیوری',
      isActive: true
    },
    {
      id: 'westridge',
      nameEn: 'Westridge I, II & III',
      nameUr: 'ویسٹریج 1، 2 اور 3',
      estimatedTimeEn: '20–30 Mins',
      estimatedTimeUr: '20 تا 30 منٹ',
      fee: 0,
      minOrder: 800,
      coverageEn: 'Direct Hot Thermal Delivery',
      coverageUr: 'براہ راست گرم ڈیلیوری',
      isActive: true
    },
    {
      id: 'saddar',
      nameEn: 'Saddar / Rawalpindi Cantt',
      nameUr: 'صدر / راولپنڈی کینٹ',
      estimatedTimeEn: '25–35 Mins',
      estimatedTimeUr: '25 تا 35 منٹ',
      fee: 0,
      minOrder: 1000,
      coverageEn: 'Regular Hot Delivery',
      coverageUr: 'باقاعدہ گرم ڈیلیوری',
      isActive: true
    },
    {
      id: 'peshawar',
      nameEn: 'Peshawar Road & Chur Chowk',
      nameUr: 'پشاور روڈ اور چوہڑ چوک',
      estimatedTimeEn: '20–30 Mins',
      estimatedTimeUr: '20 تا 30 منٹ',
      fee: 0,
      minOrder: 800,
      coverageEn: 'Regular Hot Delivery',
      coverageUr: 'باقاعدہ گرم ڈیلیوری',
      isActive: true
    },
    {
      id: 'tench',
      nameEn: 'Tench Bhatta / Dhok Syedan',
      nameUr: 'ٹینچ بھاٹہ / ڈھوک سیداں',
      estimatedTimeEn: '25–35 Mins',
      estimatedTimeUr: '25 تا 35 منٹ',
      fee: 0,
      minOrder: 800,
      coverageEn: 'Regular Hot Delivery',
      coverageUr: 'باقاعدہ گرم ڈیلیوری',
      isActive: true
    },
    {
      id: 'chaklala',
      nameEn: 'Chaklala Scheme III',
      nameUr: 'چکلالہ اسکیم 3',
      estimatedTimeEn: '35–45 Mins',
      estimatedTimeUr: '35 تا 45 منٹ',
      fee: 150,
      minOrder: 1200,
      coverageEn: 'Express Thermal Box Delivery',
      coverageUr: 'تھرمل باکس ڈیلیوری',
      isActive: true
    },
    {
      id: 'bahria',
      nameEn: 'Bahria Town (Phase 1 to 8)',
      nameUr: 'بحریہ ٹاؤن (فیز 1 تا 8)',
      estimatedTimeEn: '40–50 Mins',
      estimatedTimeUr: '40 تا 50 منٹ',
      fee: 250,
      minOrder: 1500,
      coverageEn: 'Long Distance Thermal Box Delivery',
      coverageUr: 'تھرمل باکس محفوظ ڈیلیوری',
      isActive: true
    },
    {
      id: 'islamabad',
      nameEn: 'Islamabad (I & F Sectors)',
      nameUr: 'اسلام آباد (آئی اور ایف سیکٹرز)',
      estimatedTimeEn: '35–45 Mins',
      estimatedTimeUr: '35 تا 45 منٹ',
      fee: 250,
      minOrder: 1500,
      coverageEn: 'Express Highway Delivery',
      coverageUr: 'ایکسپریس ہائی وے ڈیلیوری',
      isActive: true
    }
  ],
  noRefundPolicySummaryEn: 'All culinary orders and bookings at Rana Da Dera are non-refundable once confirmed and transmitted to our live kitchen. Perishable fresh desi food cannot be returned or refunded.',
  noRefundPolicySummaryUr: 'رانا دا ڈیرہ میں تمام آرڈرز کچن کی تیاری کے بعد ناقابل واپسی ہیں۔ تازہ کھانے اور بکنگ کی رقم واپس نہیں کی جاتی۔'
};

export const initialCoupons: Coupon[] = [
  {
    code: 'DERA10',
    type: 'percent',
    value: 10,
    minSpend: 1000,
    labelEn: '10% OFF on Entire Order',
    labelUr: 'مکمل آرڈر پر 10 فیصد رعایت',
    descriptionEn: 'Valid on all orders above Rs. 1,000 across our entire authentic menu.',
    descriptionUr: 'ایک ہزار روپے سے زائد کے تمام آرڈرز پر لاگو۔',
    isActive: true
  },
  {
    code: 'FIRSTORDER',
    type: 'flat',
    value: 200,
    minSpend: 1200,
    labelEn: 'Rs. 200 Welcome Treat',
    labelUr: '200 روپے کا خوش آمدیدی تحفہ',
    descriptionEn: 'Special flat discount of Rs. 200 for your first online dining experience.',
    descriptionUr: 'پہلے آن لائن آرڈر پر دو سو روپے کی خصوصی بچت۔',
    isActive: true
  },
  {
    code: 'FREEGHEE',
    type: 'flat',
    value: 150,
    minSpend: 800,
    labelEn: 'Rs. 150 Desi Ghee Voucher',
    labelUr: '150 روپے دیسی گھی واؤچر',
    descriptionEn: 'Enjoy Rs. 150 discount on your favorite Karahi and Handi dishes.',
    descriptionUr: 'اپنی پسندیدہ کڑاہی اور ہانڈی پر 150 روپے کی رعایت۔',
    isActive: true
  }
];

export const initialLoyaltyRewards: LoyaltyReward[] = [
  {
    id: 'rew-lassi',
    titleEn: 'Complimentary Makhani Lassi',
    titleUr: 'مفت مکھنی ملائی لسی',
    pointsCost: 150,
    discountValue: 300,
    descriptionEn: 'Redeem 150 points for a chilled clay glass of traditional Makhani Lassi.',
    descriptionUr: '150 پوائنٹس پر ایک گلاس مکھنی لسی مفت حاصل کریں۔',
    icon: 'GlassWater'
  },
  {
    id: 'rew-naan-basket',
    titleEn: 'Free Roghni Naan Basket (3 Pcs)',
    titleUr: 'مفت روغنی نان ٹوکری',
    pointsCost: 120,
    discountValue: 250,
    descriptionEn: 'Redeem 120 points for freshly baked tandoori roghni naans.',
    descriptionUr: '120 پوائنٹس پر گرم روغنی نان کی ٹوکری حاصل کریں۔',
    icon: 'Wheat'
  },
  {
    id: 'rew-voucher-500',
    titleEn: 'Rs. 500 Royal Dining Voucher',
    titleUr: '500 روپے کا شاہی واؤچر',
    pointsCost: 350,
    discountValue: 500,
    descriptionEn: 'Apply Rs. 500 flat discount on your next Karahi or BBQ feast.',
    descriptionUr: 'اپنے اگلے کڑاہی یا باربی کیو آرڈر پر 500 روپے کی رعایت۔',
    icon: 'Award'
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Chaudhry Kamran',
    rating: 5,
    date: '2026-10-14',
    commentEn: 'Best karahi in Rawalpindi! The mutton karahi is cooked in pure desi ghee and melts in your mouth. Truly unbeatable taste in Naseerabad.',
    commentUr: 'راولپنڈی کی سب سے بہترین مٹن کڑاہی! خالص دیسی گھی کی خوشبو اور گوشت اتنا نرم کہ منہ میں گھل جائے۔',
    dishName: 'Mutton Karahi',
    location: 'Naseerabad, Rawalpindi',
    isVerifiedPurchase: true,
    status: 'approved'
  },
  {
    id: 'rev-2',
    customerName: 'Dr. Hamza Malik',
    rating: 5,
    date: '2026-10-11',
    commentEn: 'Ordered the 2AM Beef Nihari and Paye for early morning family nashta. The packaging was steaming hot and delivery was super fast.',
    commentUr: 'صبح سویرے ناشتے کے لیے بیف نہاری اور پائے منگوائے۔ کھانا بالکل گرم تھا اور ذائقہ لاجواب۔',
    dishName: 'Dera Special Beef Nihari',
    location: 'Westridge, Rawalpindi',
    isVerifiedPurchase: true,
    status: 'approved'
  },
  {
    id: 'rev-3',
    customerName: 'Sardar Zain Ali',
    rating: 5,
    date: '2026-10-08',
    commentEn: 'The Royal Mix BBQ Platter and Malai Boti are sheer perfection. Tandoori Mumbai naan with garlic butter was incredible.',
    commentUr: 'مکس باربی کیو پلیٹر اور ملائی بوٹی کا کوئی مقابلہ نہیں۔ فیملی ڈنر کے لیے سب سے بہترین جگہ۔',
    dishName: 'Royal Mix BBQ Platter',
    location: 'Saddar Cantt, Rawalpindi',
    isVerifiedPurchase: true,
    status: 'approved'
  }
];
