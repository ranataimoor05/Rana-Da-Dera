import { Category, Dish, ComboDeal } from '../types/menu';

export const mockCategories: Category[] = [
  {
    id: 'all',
    nameEn: 'All Dishes',
    nameUr: 'تمام پکوان',
    iconName: 'Utensils',
    descriptionEn: 'Explore our complete royal Punjabi feast collection',
    descriptionUr: 'ہمارا مکمل شاہی پنجابی مینو ملاحظہ فرمائیں'
  },
  {
    id: 'karahi',
    nameEn: 'Desi Karahi & Handi',
    nameUr: 'دیسی کڑاہی اور ہانڈی',
    iconName: 'Flame',
    descriptionEn: 'Simmered in pure desi ghee with tomatoes, ginger, and green chilies',
    descriptionUr: 'خالص دیسی گھی، ٹماٹر، ادرک اور ہری مرچوں میں پکی ہوئی لذیذ کڑاہی'
  },
  {
    id: 'bbq',
    nameEn: 'Charcoal BBQ',
    nameUr: 'کوئلہ باربی کیو',
    iconName: 'Sparkles',
    descriptionEn: 'Smoked over acacia charcoal with secret spices and mint chutney',
    descriptionUr: 'قدرتی کوئلے پر پکے ہوئے رسیلے سیخ کباب، بوٹی اور چاپ'
  },
  {
    id: 'rice',
    nameEn: 'Biryani & Pulao',
    nameUr: 'بریانی اور پلاؤ',
    iconName: 'Wheat',
    descriptionEn: 'Aged XXL basmati rice cooked in rich yakhni stock and saffron',
    descriptionUr: 'خالص زعفران اور یخنی میں تیار کردہ خوشبودار باسمتی چاول'
  },
  {
    id: 'desi',
    nameEn: 'Desi Breakfast & Curries',
    nameUr: 'دیسی ناشتہ اور سالن',
    iconName: 'Coffee',
    descriptionEn: 'Overnight simmered Nihari, Punjabi paye, Daleem, and Daal Makhni',
    descriptionUr: 'ساری رات دھیمی آنچ پر پکی ہوئی نہاری، پائے اور مکھنی دال'
  },
  {
    id: 'breads',
    nameEn: 'Tandoori Breads',
    nameUr: 'تندوری نان و روٹی',
    iconName: 'CircleDot',
    descriptionEn: 'Freshly baked in hot clay tandoor with sesame seeds and desi ghee',
    descriptionUr: 'مٹی کے گرم تندور کے تازہ روغنی نان اور گارلک چیز نان'
  },
  {
    id: 'desserts',
    nameEn: 'Sweets & Lassi',
    nameUr: 'میٹھے اور لسی',
    iconName: 'GlassWater',
    descriptionEn: 'Thick malai lassi in clay glasses and rich rabri falooda kulfa',
    descriptionUr: 'مٹی کے گلاس میں مکھی ملائی لسی اور شاہی ربڑی فالودہ'
  },
  {
    id: 'combos',
    nameEn: 'Family Combos',
    nameUr: 'فیملی ڈیلز',
    iconName: 'Users',
    descriptionEn: 'Value bundles crafted for family dinners, friends, and gatherings',
    descriptionUr: 'پورے خاندان کے لیے شاندار ذائقے دار کمبو ڈیلز'
  }
];

export const mockDishes: Dish[] = [
  {
    id: 'mutton-karahi',
    nameEn: 'Mutton Karahi',
    nameUr: 'مٹن کڑاہی دیسی گھی',
    category: 'karahi',
    price: 2200,
    descriptionEn: 'Rich, aromatic mutton cooked in fresh tomatoes, ginger, green chilies, and traditional desi spices in iron wok.',
    descriptionUr: 'خالص دیسی گھی، تازہ ٹماٹر، ہری مرچ اور لوہے کی کڑاہی میں تیار شدہ تازہ پوٹھوہار مٹن۔',
    badgeEn: 'Best Seller',
    badgeUr: 'سب سے زیادہ مقبول',
    spiceLevel: 'Medium',
    servingEn: 'Serves 2-3 Persons',
    servingUr: '2 سے 3 افراد کے لیے',
    ingredientsEn: ['Pure Desi Ghee', 'Fresh Potohar Mutton', 'Fresh Tomatoes', 'Green Chilies', 'Crushed Ginger'],
    ingredientsUr: ['خالص دیسی گھی', 'تازہ مٹن', 'ٹماٹر', 'ہری مرچیں', 'ادرک'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: false,
      containsDairy: true,
      containsNuts: false
    },
    image: '/images/mutton-karahi.jpg',
    isPopular: true,
    isAvailable: true,
    customizationGroups: [
      {
        id: 'portion-size',
        titleEn: 'Portion Size',
        titleUr: 'مقدار منتخب کریں',
        required: true,
        minSelections: 1,
        maxSelections: 1,
        options: [
          { id: 'half-kg', nameEn: 'Half KG (Standard)', nameUr: 'آدھا کلو', priceDelta: 0, isDefault: true },
          { id: 'full-kg', nameEn: 'Full KG (+Rs. 2,000)', nameUr: 'ایک کلو (+2000 روپے)', priceDelta: 2000 }
        ]
      },
      {
        id: 'spice-prep',
        titleEn: 'Spice Preparation',
        titleUr: 'مرچ کی تیزی',
        required: false,
        minSelections: 0,
        maxSelections: 1,
        options: [
          { id: 'spice-mild', nameEn: 'Mild (Low Spice)', nameUr: 'ہلکی مرچ', priceDelta: 0 },
          { id: 'spice-reg', nameEn: 'Regular Dera Masala', nameUr: 'معمول کا مصالحہ', priceDelta: 0, isDefault: true },
          { id: 'spice-hot', nameEn: 'Spicy / Extra Green Chilies', nameUr: 'تیز مرچ / اضافی ہری مرچیں', priceDelta: 0 }
        ]
      },
      {
        id: 'extras',
        titleEn: 'Tarka & Ghee Add-ons',
        titleUr: 'اضافی تڑکہ اور گھی',
        required: false,
        minSelections: 0,
        maxSelections: 2,
        options: [
          { id: 'extra-ghee', nameEn: 'Extra Desi Ghee Tarka', nameUr: 'اضافی دیسی گھی تڑکہ', priceDelta: 180 },
          { id: 'extra-ginger', nameEn: 'Extra Julienne Ginger & Coriander', nameUr: 'اضافی ادرک اور دھنیا', priceDelta: 50 }
        ]
      }
    ]
  },
  {
    id: 'chicken-handi',
    nameEn: 'Chicken Handi (Boneless)',
    nameUr: 'چکن بون لیس ہانڈی',
    category: 'karahi',
    price: 1600,
    descriptionEn: 'Tender boneless chicken simmered in rich creamy butter gravy with crushed black pepper in an authentic clay pot.',
    descriptionUr: 'مٹی کی ہانڈی میں مکھن، کریم اور کالی مرچ کی لذیذ گریوی میں تیار شدہ نرم چکن بون لیس۔',
    badgeEn: 'Must Try',
    badgeUr: 'خاص تحفہ',
    spiceLevel: 'Mild',
    servingEn: 'Serves 2-3 Persons',
    servingUr: '2 سے 3 افراد کے لیے',
    ingredientsEn: ['Boneless Chicken', 'Dairy Butter', 'Dairy Fresh Cream', 'Black Pepper', 'Clay Pot Cooked'],
    ingredientsUr: ['چکن بون لیس', 'مکھن', 'تازہ کریم', 'کالی مرچ', 'مٹی کی ہانڈی'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: false,
      containsDairy: true,
      containsNuts: false
    },
    image: '/images/chicken-handi.jpg',
    isPopular: true,
    isAvailable: true,
    customizationGroups: [
      {
        id: 'portion-size',
        titleEn: 'Portion Size',
        titleUr: 'مقدار منتخب کریں',
        required: true,
        minSelections: 1,
        maxSelections: 1,
        options: [
          { id: 'half-handi', nameEn: 'Half Handi', nameUr: 'آدھی ہانڈی', priceDelta: 0, isDefault: true },
          { id: 'full-handi', nameEn: 'Full Handi (+Rs. 1,400)', nameUr: 'مکمل ہانڈی (+1400 روپے)', priceDelta: 1400 }
        ]
      },
      {
        id: 'gravy-style',
        titleEn: 'Gravy Richness',
        titleUr: 'گریوی کی قسم',
        required: false,
        minSelections: 0,
        maxSelections: 1,
        options: [
          { id: 'cream-standard', nameEn: 'Classic Cream Gravy', nameUr: 'کلاسک کریمی', priceDelta: 0, isDefault: true },
          { id: 'extra-cream', nameEn: 'Extra Rich Cream & Butter', nameUr: 'اضافی مکھن اور ملائی', priceDelta: 150 }
        ]
      }
    ]
  },
  {
    id: 'beef-seekh-kebab',
    nameEn: 'Beef Seekh Kebab (4 Pcs)',
    nameUr: 'بیف سیخ کباب (4 عدد)',
    category: 'bbq',
    price: 1400,
    descriptionEn: 'Hand-crafted seekh kebabs with minced beef, fresh coriander, and spices — charcoal-grilled to juicy perfection.',
    descriptionUr: 'تازہ قیمہ، دھنیا اور مخصوص مصالحہ جات سے تیار کردہ، کوئلے پر سکے ہوئے رسیلے سیخ کباب۔',
    badgeEn: 'Popular',
    badgeUr: 'ہر دلعزیز',
    spiceLevel: 'Medium',
    servingEn: 'Serves 1-2 Persons',
    servingUr: '1 سے 2 افراد کے لیے',
    ingredientsEn: ['Fresh Minced Beef', 'Charcoal Smoked', 'Fresh Mint & Coriander', 'Secret Masala'],
    ingredientsUr: ['تازہ بیف قیمہ', 'کوئلے کا دھواں', 'پودینہ و دھنیا', 'شاہی مصالحہ'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: false,
      containsDairy: false,
      containsNuts: false
    },
    image: '/images/beef-seekh-kebab.jpg',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'mix-bbq-platter',
    nameEn: 'Royal Mix BBQ Platter',
    nameUr: 'شاہی مکس باربی کیو پلیٹر',
    category: 'bbq',
    price: 3500,
    originalPrice: 3800,
    descriptionEn: 'Grand platter of seekh kebabs, chicken boti, lamb chops, and malai tikka served with pudina chutney & fresh roghni naan.',
    descriptionUr: 'سیخ کباب، چکن بوٹی، مٹن چاپ، اور ملائی ٹکہ کا شاہی پلیٹر معہ پودینہ چٹنی اور تازہ روغنی نان۔',
    badgeEn: 'Family Platter',
    badgeUr: 'فیملی پلیٹر',
    spiceLevel: 'Medium',
    servingEn: 'Serves 4-5 Persons',
    servingUr: '4 سے 5 افراد کے لیے',
    ingredientsEn: ['Mutton Chops', 'Chicken Boti', 'Beef Seekh Kebabs', 'Malai Tikka', 'Tandoori Naan'],
    ingredientsUr: ['مٹن چاپس', 'چکن بوٹی', 'بیف سیخ کباب', 'ملائی ٹکہ', 'روغنی نان'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: true,
      containsDairy: true,
      containsNuts: false
    },
    image: '/images/mix-bbq-platter.jpg',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'chicken-tikka',
    nameEn: 'Tandoori Chicken Tikka',
    nameUr: 'تندوری چکن ٹکہ (چیسٹ / لیگ)',
    category: 'bbq',
    price: 1200,
    descriptionEn: 'Juicy bone-in chicken quarter marinated in strained yogurt and tandoori spices, char-grilled over natural coals.',
    descriptionUr: 'دہی اور روایتی تندوری مصالحوں میں تیار، کوئلے پر بھنا ہوا خوش ذائقہ چکن پیس۔',
    badgeEn: 'Charcoal Grilled',
    badgeUr: 'کوئلہ بھنا',
    spiceLevel: 'Hot',
    servingEn: 'Serves 1 Person',
    servingUr: '1 فرد کے لیے',
    ingredientsEn: ['Chicken Quarter', 'Strained Yogurt', 'Red Chili Tandoori Rub', 'Coal Smoked'],
    ingredientsUr: ['چکن کوارٹر', 'دہی', 'سرخ مرچ تندوری مصالحہ', 'کوئلے کی آنچ'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: false,
      containsDairy: true,
      containsNuts: false
    },
    image: '/images/chicken-tikka.jpg',
    isPopular: true,
    isAvailable: true,
    customizationGroups: [
      {
        id: 'piece-choice',
        titleEn: 'Piece Cut Preference',
        titleUr: 'پیس کا انتخاب',
        required: true,
        minSelections: 1,
        maxSelections: 1,
        options: [
          { id: 'chest-piece', nameEn: 'Chest / Breast Piece', nameUr: 'سینے کا پیس (چیسٹ)', priceDelta: 0, isDefault: true },
          { id: 'leg-piece', nameEn: 'Leg Piece', nameUr: 'ران کا پیس (لیگ)', priceDelta: 0 }
        ]
      }
    ]
  },
  {
    id: 'chicken-biryani',
    nameEn: 'Special Chicken Biryani',
    nameUr: 'خاص چکن بریانی دم دار',
    category: 'rice',
    price: 950,
    descriptionEn: 'Fragrant long-grain basmati rice layered with spiced chicken, caramelized onions, fresh mint, and saffron essence.',
    descriptionUr: 'طویل باسمتی چاول، رسیلا چکن، تلی پیاز، پودینہ اور زعفرانی خوشبو کے ساتھ دم کی گئی دیسی بریانی۔',
    badgeEn: 'Classic Feast',
    badgeUr: 'کلاسک دیسی',
    spiceLevel: 'Medium',
    servingEn: 'Serves 1-2 Persons',
    servingUr: '1 سے 2 افراد کے لیے',
    ingredientsEn: ['XXL Basmati Rice', 'Chicken Gravy', 'Pure Saffron', 'Fried Onions', 'Plum & Mint'],
    ingredientsUr: ['باسمتی چاول', 'چکن قورمہ گریوی', 'زعفران', 'تلی پیاز', 'آلو بخارا و پودینہ'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: false,
      containsDairy: false,
      containsNuts: false
    },
    image: '/images/chicken-biryani.jpg',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'mutton-pulao',
    nameEn: 'Bannu Mutton Pulao',
    nameUr: 'بنوں مٹن پلاؤ دیسی گھی',
    category: 'rice',
    price: 1800,
    descriptionEn: 'Aromatic yakhni pulao prepared with tender mutton cuts, whole garam masala, beef tallow and raisins.',
    descriptionUr: 'مٹن کی اصل یخنی، ثابت گرم مصالحہ اور کشمش کے ساتھ پکا ہوا روایتی بنوں پلاؤ۔',
    badgeEn: 'Potohar Special',
    badgeUr: 'پوٹھوہار خاص',
    spiceLevel: 'Mild',
    servingEn: 'Serves 2 Persons',
    servingUr: '2 افراد کے لیے',
    ingredientsEn: ['Mutton Yakhni Stock', 'Aged Basmati Rice', 'Beef Fat Tallow', 'Golden Raisins'],
    ingredientsUr: ['مٹن یخنی', 'پرانے چاول', 'دیسی روایتی چکنائی', 'سنہری کشمش'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: false,
      containsDairy: false,
      containsNuts: false
    },
    image: '/images/mutton-pulao.jpg',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'nihari-special',
    nameEn: 'Dera Special Beef Nihari',
    nameUr: 'ڈیرہ اسپیشل بیف نہاری',
    category: 'desi',
    price: 1100,
    descriptionEn: 'Overnight slow-cooked shank in a velvety spiced gravy, garnished with fried onions, julienned ginger, and fresh lemon.',
    descriptionUr: 'ساری رات دھیمی آنچ پر پکی ہوئی بونگ کی رسیلی نہاری، معہ باریک ادرک، لیموں اور گرم تڑکہ۔',
    badgeEn: 'Breakfast / 2AM Fav',
    badgeUr: 'رات 2 بجے کا خاص تحفہ',
    spiceLevel: 'Medium',
    servingEn: 'Serves 1-2 Persons',
    servingUr: '1 سے 2 افراد کے لیے',
    ingredientsEn: ['Beef Shank Bong', 'Slow-cooked 8 Hours', 'Nihari Tarka', 'Julienned Ginger & Lemon'],
    ingredientsUr: ['بیف بونگ گوشت', '8 گھنٹے دھیمی آنچ', 'نہاری روغنی تڑکہ', 'ادرک و ہری مرچ'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: true,
      containsDairy: false,
      containsNuts: false
    },
    image: '/images/nihari-special.jpg',
    isPopular: true,
    isAvailable: true,
    customizationGroups: [
      {
        id: 'marrow-maghaz',
        titleEn: 'Nali & Maghaz Topping',
        titleUr: 'نلی اور مغز کا اضافہ',
        required: false,
        minSelections: 0,
        maxSelections: 2,
        options: [
          { id: 'add-nali', nameEn: 'Add Bone Marrow (Nali)', nameUr: 'اضافی نلی کا گودا', priceDelta: 250 },
          { id: 'add-maghaz', nameEn: 'Add Fresh Maghaz (Brain)', nameUr: 'تازہ مغز فرائی', priceDelta: 350 }
        ]
      }
    ]
  },
  {
    id: 'paye-trotters',
    nameEn: 'Punjabi Beef Paye',
    nameUr: 'پنجابی بیف پائے (شوربہ دار)',
    category: 'desi',
    price: 900,
    descriptionEn: 'Traditional slow-cooked beef trotters in a gelatinous herbal broth — the quintessential Rawalpindi breakfast specialty.',
    descriptionUr: 'روایتی راولپنڈی ناشتہ! رات بھر پکے ہوئے پائے کا گاڑھا یخنی شوربہ۔',
    badgeEn: 'Desi Nashta',
    badgeUr: 'دیسی ناشتہ',
    spiceLevel: 'Mild',
    servingEn: 'Serves 1 Person',
    servingUr: '1 فرد کے لیے',
    ingredientsEn: ['Beef Trotters', 'Slow-simmered Overnight', 'Bone Marrow Essence', 'Garam Masala'],
    ingredientsUr: ['بیف پائے', 'رات بھر پکوائی', 'مخلوط ہڈیوں کا رس', 'گرم مصالحہ'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: false,
      containsDairy: false,
      containsNuts: false
    },
    image: '/images/paye-trotters.jpg',
    isPopular: true,
    isAvailable: true
  },
  {
    id: 'chicken-shinwari',
    nameEn: 'Shinwari Chicken Karahi',
    nameUr: 'شنواری چکن کڑاہی (نمکین نمونہ)',
    category: 'karahi',
    price: 1800,
    descriptionEn: 'Pashtun style chicken karahi cooked solely in animal fat, fresh tomatoes, salt and green chilies with zero red powder.',
    descriptionUr: 'پشتون شنواری انداز، بغیر سرخ مرچ کے، صرف ٹماٹر، ہری مرچ، نمک اور دیسی چربی میں تیار۔',
    badgeEn: 'Shinwari Authentic',
    badgeUr: 'اصلی شنواری',
    spiceLevel: 'Mild',
    servingEn: 'Serves 2-3 Persons',
    servingUr: '2 سے 3 افراد کے لیے',
    ingredientsEn: ['Fresh Chicken', 'Plump Tomatoes', 'Whole Green Chilies', 'Rock Salt'],
    ingredientsUr: ['تازہ چکن', 'رسیلے ٹماٹر', 'ثابت ہری مرچ', 'دیسی نمک'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: false,
      containsDairy: false,
      containsNuts: false
    },
    image: '/images/chicken-shinwari.jpg',
    isPopular: false,
    isAvailable: true
  },
  {
    id: 'malai-boti',
    nameEn: 'Chicken Malai Boti (8 Pcs)',
    nameUr: 'چکن ملائی بوٹی (8 عدد)',
    category: 'bbq',
    price: 1350,
    descriptionEn: 'Melt-in-mouth boneless chicken cubes marinated in heavy fresh cream, white pepper, cheese and mild green cardamom.',
    descriptionUr: 'تازہ بالائی کریم، سفید مرچ، پنیر اور سبز الائچی میں ڈوبی ہوئی بے حد نرم چکن بوٹی۔',
    badgeEn: 'Melt-in-Mouth',
    badgeUr: 'مکھن جیسی نرم',
    spiceLevel: 'Mild',
    servingEn: 'Serves 1-2 Persons',
    servingUr: '1 سے 2 افراد کے لیے',
    ingredientsEn: ['Boneless Chicken Cubes', 'Heavy Fresh Cream', 'White Pepper', 'Melted Cheese'],
    ingredientsUr: ['بون لیس چکن بوٹی', 'دودھ کی ملائی', 'سفید مرچ', 'چیز مصالحہ'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: false,
      containsDairy: true,
      containsNuts: false
    },
    image: '/images/malai-boti.jpg',
    isPopular: false,
    isAvailable: true
  },
  {
    id: 'mutton-chops',
    nameEn: 'Charcoal Mutton Chops',
    nameUr: 'کوئلہ مٹن چاپس (4 عدد)',
    category: 'bbq',
    price: 2400,
    descriptionEn: 'Tender lamb chops seasoned with raw papaya, garlic, cumin, and cracked coriander, smoked over hot acacia charcoal.',
    descriptionUr: 'کچے پپیتے، لہسن اور دھنیے سے مسالے دار بنی ہوئی، کوئلے پر سکی رسیلی بکرے کی چاپس۔',
    badgeEn: 'Royal Cut',
    badgeUr: 'شاہی ذائقہ',
    spiceLevel: 'Medium',
    servingEn: 'Serves 2 Persons',
    servingUr: '2 افراد کے لیے',
    ingredientsEn: ['Prime Mutton Ribs', 'Cracked Coriander', 'Raw Papaya Tenderizer', 'Charcoal Grilled'],
    ingredientsUr: ['مٹن چاپس', 'کٹا دھنیا', 'پپیتا مصالحہ', 'کوئلے کی بھپک'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: false,
      containsDairy: false,
      containsNuts: false
    },
    image: '/images/mutton-chops.jpg',
    isPopular: false,
    isAvailable: true
  },
  {
    id: 'haleem-special',
    nameEn: 'Shahi Daleem / Haleem',
    nameUr: 'شاہی دلیم / حلیم دیسی گھی',
    category: 'desi',
    price: 800,
    descriptionEn: 'Slow-simmered blend of seven grains, lentils and shredded beef, infused with aromatic tarka and served with condiments.',
    descriptionUr: 'سات اناجوں، دالوں اور بیف ریشہ سے گھنٹوں پکا ہوا دیسی گھی تڑکے دار شاہی دلیم۔',
    badgeEn: 'Traditional',
    badgeUr: 'روایتی',
    spiceLevel: 'Mild',
    servingEn: 'Serves 1-2 Persons',
    servingUr: '1 سے 2 افراد کے لیے',
    ingredientsEn: ['7 Grains & Lentils', 'Shredded Beef Resha', 'Crispy Golden Onions', 'Desi Ghee Tarka'],
    ingredientsUr: ['7 دالیں و غلہ', 'بیف ریشہ', 'تلی براؤن پیاز', 'دیسی گھی تڑکہ'],
    dietary: {
      isHalal: true,
      isVegetarian: false,
      isVegan: false,
      containsGluten: true,
      containsDairy: true,
      containsNuts: false
    },
    image: '/images/haleem-special.jpg',
    isPopular: false,
    isAvailable: true
  },
  {
    id: 'daal-makhni',
    nameEn: 'Dera Daal Makhni Tarka',
    nameUr: 'ڈیرہ دال مکھنی تڑکہ',
    category: 'desi',
    price: 650,
    descriptionEn: 'Creamy black lentils slow-cooked on gentle flame with pure butter and finished with crispy garlic-cumin tarka.',
    descriptionUr: 'ثابت کالی ماش دال، مکھن اور کریم میں پکی ہوئی معہ لہسن زیرہ تڑکہ۔',
    badgeEn: 'Desi Butter',
    badgeUr: 'دیسی مکھن',
    spiceLevel: 'Mild',
    servingEn: 'Serves 1-2 Persons',
    servingUr: '1 سے 2 افراد کے لیے',
    ingredientsEn: ['Black Urad Dal', 'Fresh Cream', 'White Butter', 'Garlic Cumin Tarka'],
    ingredientsUr: ['کالی ماش دال', 'تازہ کریم', 'سفید مکھن', 'لہسن زیرہ تڑکہ'],
    dietary: {
      isHalal: true,
      isVegetarian: true,
      isVegan: false,
      containsGluten: false,
      containsDairy: true,
      containsNuts: false
    },
    image: '/images/daal-makhni.jpg',
    isPopular: false,
    isAvailable: true
  },
  {
    id: 'roghni-naan',
    nameEn: 'Roghni Naan Basket (3 Pcs)',
    nameUr: 'روغنی نان ٹوکری (3 عدد)',
    category: 'breads',
    price: 250,
    descriptionEn: 'Soft fluffy tandoori naans brushed with pure desi ghee and sprinkled with toasted sesame seeds and kalonji.',
    descriptionUr: 'مٹی کے تندور سے تازہ نکلے ہوئے نرم نان، دیسی گھی، تل اور کلونجی کا روغن۔',
    badgeEn: 'Clay Tandoor',
    badgeUr: 'گرم تندور',
    spiceLevel: 'None',
    servingEn: 'Serves 2-3 Persons',
    servingUr: '2 سے 3 افراد کے لیے',
    ingredientsEn: ['Refined Flour Dough', 'Pure Desi Ghee', 'White Sesame Seeds', 'Kalonji Seeds'],
    ingredientsUr: ['میدہ خمیر', 'خالص دیسی گھی', 'سفید تل', 'کلونجی'],
    dietary: {
      isHalal: true,
      isVegetarian: true,
      isVegan: false,
      containsGluten: true,
      containsDairy: true,
      containsNuts: false
    },
    image: '/images/roghni-naan.jpg',
    isPopular: false,
    isAvailable: true
  },
  {
    id: 'garlic-cheese-naan',
    nameEn: 'Stuffed Garlic Cheese Naan',
    nameUr: 'اسٹفڈ گارلک چیز نان',
    category: 'breads',
    price: 450,
    descriptionEn: 'Crispy outer crust filled with melted mozzarella and cheddar cheese, topped with roasted garlic and fresh coriander.',
    descriptionUr: 'پگھلی ہوئی موزریلا اور چیڈر چیز سے بھرا ہوا، اوپر بھنا لہسن اور ہرا دھنیا۔',
    badgeEn: 'Melted Cheese',
    badgeUr: 'چیزی نان',
    spiceLevel: 'Mild',
    servingEn: 'Serves 1-2 Persons',
    servingUr: '1 سے 2 افراد کے لیے',
    ingredientsEn: ['Mozzarella Cheese', 'Cheddar Cheese', 'Roasted Garlic', 'Fresh Herbs'],
    ingredientsUr: ['موزریلا چیز', 'چیڈر چیز', 'بھنا لہسن', 'دھنیا پودینہ'],
    dietary: {
      isHalal: true,
      isVegetarian: true,
      isVegan: false,
      containsGluten: true,
      containsDairy: true,
      containsNuts: false
    },
    image: '/images/garlic-cheese-naan.jpg',
    isPopular: false,
    isAvailable: true
  },
  {
    id: 'kulfa-falooda',
    nameEn: 'Shahi Rabri Falooda Kulfa',
    nameUr: 'شاہی ربڑی فالودہ قلفہ',
    category: 'desserts',
    price: 550,
    descriptionEn: 'Dense handmade malai kulfa topped with chilled rabri, rose syrup, basil seeds (tukh malanga) and cornflour vermicelli.',
    descriptionUr: 'کھویا ملائی قلفہ، گاڑھی ربڑی، روح افزا، تخم ملنگا اور فالودہ سویاں۔',
    badgeEn: 'Royal Sweet',
    badgeUr: 'شاہی میٹھا',
    spiceLevel: 'None',
    servingEn: 'Serves 1-2 Persons',
    servingUr: '1 سے 2 افراد کے لیے',
    ingredientsEn: ['Hand-churned Malai Kulfa', 'Slow-cooked Thick Rabri', 'Pure Rooh Afza', 'Basil Seeds'],
    ingredientsUr: ['ہاتھ کا قلفہ', 'گاڑھی ربڑی', 'روح افزا شربت', 'تخم ملنگا و فالودہ'],
    dietary: {
      isHalal: true,
      isVegetarian: true,
      isVegan: false,
      containsGluten: false,
      containsDairy: true,
      containsNuts: true
    },
    image: '/images/kulfa-falooda.jpg',
    isPopular: false,
    isAvailable: true
  },
  {
    id: 'punjabi-lassi',
    nameEn: 'Makhani Malai Lassi (Clay Glass)',
    nameUr: 'مکھنی ملائی لسی (مٹی کا گلاس)',
    category: 'desserts',
    price: 300,
    descriptionEn: 'Thick, creamy churned sweet yogurt drink served in traditional clay glass topped with a dollop of fresh buffalo malai.',
    descriptionUr: 'دہی کو مدھانی سے متھ کر مٹی کے گلاس میں تیار کی گئی میٹھی لسی معہ موٹی ملائی کا پیڑا۔',
    badgeEn: 'Chilled Matka',
    badgeUr: 'ٹھنڈی ملائی دار',
    spiceLevel: 'None',
    servingEn: 'Serves 1 Person',
    servingUr: '1 فرد کے لیے',
    ingredientsEn: ['Fresh Curd Dahi', 'Buffalo Milk Malai', 'Crushed Ice', 'Served in Mitti Matka'],
    ingredientsUr: ['تازہ دہی', 'بھینس کی موٹی بالائی', 'برف', 'مٹی کا کٹورا'],
    dietary: {
      isHalal: true,
      isVegetarian: true,
      isVegan: false,
      containsGluten: false,
      containsDairy: true,
      containsNuts: false
    },
    image: '/images/punjabi-lassi.jpg',
    isPopular: false,
    isAvailable: true
  }
];

export const mockCombos: ComboDeal[] = [
  {
    id: 'royal-family-feast',
    titleEn: 'Rana Da Dera Royal Family Feast',
    titleUr: 'رانا دا ڈیرہ شاہی فیملی دعوت ڈیل',
    descriptionEn: '1KG Mutton Karahi Desi Ghee + Royal Mix BBQ Platter + 2 Bannu Mutton Pulao + 6 Roghni Naans + 4 Makhani Lassi Glasses.',
    descriptionUr: '1 کلو مٹن کڑاہی دیسی گھی + شاہی مکس باربی کیو پلیٹر + 2 بنوں مٹن پلاؤ + 6 روغنی نان + 4 گلاس مکھنی لسی۔',
    servingEn: 'Ideal for 6-8 Persons',
    servingUr: '6 سے 8 افراد کے لیے بہترین',
    price: 7800,
    originalPrice: 8950,
    includedDishes: ['Mutton Karahi (1KG)', 'Mix BBQ Platter', 'Bannu Mutton Pulao (x2)', 'Roghni Naan (x6)', 'Makhani Lassi (x4)'],
    customizationSummaryEn: 'Includes complimentary mint raita, fresh salad, and special achar',
    customizationSummaryUr: 'رائتہ، سلاد اور اچار مفت شامل ہے',
    image: '/images/mix-bbq-platter.jpg',
    isAvailable: true
  },
  {
    id: 'dera-bbq-karahi-combo',
    titleEn: 'Dera Karahi & BBQ Duo',
    titleUr: 'ڈیرہ کڑاہی اور باربی کیو ڈیو',
    descriptionEn: 'Half KG Chicken Handi + Beef Seekh Kebabs (4 Pcs) + 3 Roghni Naans + Fresh Salad & Mint Raita.',
    descriptionUr: 'آدھا کلو چکن ہانڈی + 4 بیف سیخ کباب + 3 روغنی نان + سلاد اور رائتہ۔',
    servingEn: 'Serves 2-3 Persons',
    servingUr: '2 سے 3 افراد کے لیے',
    price: 3100,
    originalPrice: 3450,
    includedDishes: ['Chicken Handi', 'Beef Seekh Kebab', 'Roghni Naan Basket'],
    customizationSummaryEn: 'Perfect for couples and small dinners',
    customizationSummaryUr: 'دو سے تین دوستوں یا جوڑے کے لیے شاندار',
    image: '/images/chicken-handi.jpg',
    isAvailable: true
  },
  {
    id: 'midnight-nashta-deal',
    titleEn: '2AM Midnight Desi Nashta Combo',
    titleUr: 'رات 2 بجے کا دیسی ناشتہ کمبو',
    descriptionEn: 'Dera Special Beef Nihari + Punjabi Beef Paye + 4 Roghni Naans + 2 Chilled Makhani Lassi Glasses.',
    descriptionUr: 'ڈیرہ اسپیشل بیف نہاری + پنجابی بیف پائے + 4 روغنی نان + 2 گلاس مکھنی لسی۔',
    servingEn: 'Serves 2-3 Persons',
    servingUr: '2 سے 3 افراد کے لیے',
    price: 2450,
    originalPrice: 2800,
    includedDishes: ['Dera Special Beef Nihari', 'Punjabi Beef Paye', 'Roghni Naan (x4)', 'Punjabi Lassi (x2)'],
    customizationSummaryEn: 'Served sizzling hot straight from our Naseerabad dawn kitchen',
    customizationSummaryUr: 'نصیر آباد کی کچن سے تازہ گرم گرم',
    image: '/images/nihari-special.jpg',
    isAvailable: true
  }
];
