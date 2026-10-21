/* =====================================================
   RANA DA DERA — script.js
   Fine Dining & Restaurant | Naseerabad, Rawalpindi
   Complete Frontend Engine with Themes, Cart, Customizer & Modals
   ===================================================== */

/* ================================================
   AOS — Animate On Scroll Init
   ================================================ */
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration : 850,
        once     : true,
        offset   : 80,
        easing   : 'ease-out-cubic'
    });
}

/* ================================================
   PAGE LOADER
   ================================================ */
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }
    }, 1200);
});

/* ================================================
   FEATURE 6: THEME ENGINE (DARK / MIDNIGHT DERA)
   ================================================ */
const THEME_KEY = 'rana_da_dera_theme_v1';

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    updateThemeButtons();
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    updateThemeButtons();
    showToast(isDark ? '🌙 Midnight Dera Mode Activated' : '☀️ Royal Day Mode Activated');
}

function updateThemeButtons() {
    const isDark = document.body.classList.contains('dark-theme');
    document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
        btn.innerHTML = isDark ? '<i class="fas fa-sun" style="color:#f0c040;"></i>' : '<i class="fas fa-moon"></i>';
        btn.setAttribute('title', isDark ? 'Switch to Day Mode' : 'Switch to Midnight Dera Mode');
    });
}

/* ================================================
   FEATURE 3: LIVE KITCHEN STATUS (2:00 AM – 3:00 PM)
   ================================================ */
function updateKitchenStatus() {
    const now = new Date();
    // Use local client hours
    const currentHour = now.getHours();
    
    // Open between 2:00 AM (02:00) and 3:00 PM (15:00)
    const isOpen = currentHour >= 2 && currentHour < 15;

    document.querySelectorAll('.kitchen-status-pill').forEach(pill => {
        if (isOpen) {
            pill.className = 'kitchen-status-pill open';
            pill.innerHTML = `
                <span class="status-dot green"></span>
                <span>Kitchen Open Now (2AM–3PM)</span>
            `;
            pill.setAttribute('title', 'Kitchen is currently firing fresh orders! Naseerabad, Rawalpindi.');
        } else {
            pill.className = 'kitchen-status-pill closed';
            pill.innerHTML = `
                <span class="status-dot red"></span>
                <span>Opens at 2:00 AM (Pre-orders Active)</span>
            `;
            pill.setAttribute('title', 'Daily hours: 2:00 AM – 3:00 PM. Pre-orders on WhatsApp accepted anytime.');
        }
    });
}

/* ================================================
   NAVBAR & SCROLL
   ================================================ */
const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (navbar && backTop) {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
            backTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backTop.classList.remove('visible');
        }
    }

    const sections = ['home','about','menu','thali-section','gallery','reviews','delivery-checker','delivery','reservation','contact'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
            document.querySelectorAll('.nav-left a').forEach(a => {
                if (a.getAttribute('href') === '#' + id) {
                    a.classList.add('active');
                } else if (a.getAttribute('href').startsWith('#')) {
                    a.classList.remove('active');
                }
            });
        }
    });
});

/* ================================================
   MOBILE MENU
   ================================================ */
function openMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.remove('open');
        document.body.style.overflow = '';
    }
}

/* Reliable fallback dish image */
const FALLBACK_DISH_IMG = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80';

/* ================================================
   DISHES DATA WITH SPICE LEVELS & INGREDIENTS
   ================================================ */
const dishes = [
    {
        id         : 'mutton-karahi',
        name       : 'Mutton Karahi',
        category   : 'karahi',
        priceNum   : 2200,
        price      : '2,200',
        desc       : 'Rich, aromatic mutton cooked in fresh tomatoes, ginger, green chilies, and traditional desi spices in iron wok.',
        badge      : '🔥 Best Seller',
        spiceLevel : '🌶️🌶️ Medium Hot',
        serving    : 'Serves 2-3 Persons',
        ingredients: ['Pure Desi Ghee', 'Fresh Potohar Mutton', 'Fresh Tomatoes', 'Green Chilies', 'Crushed Ginger'],
        img        : 'images/mutton-karahi.jpg',
        isPopular  : true
    },
    {
        id         : 'chicken-handi',
        name       : 'Chicken Handi (Boneless)',
        category   : 'karahi',
        priceNum   : 1600,
        price      : '1,600',
        desc       : 'Tender boneless chicken simmered in rich creamy butter gravy with crushed black pepper in an authentic clay pot.',
        badge      : '🫙 Must Try',
        spiceLevel : '🌶️ Mild Creamy',
        serving    : 'Serves 2-3 Persons',
        ingredients: ['Boneless Chicken', 'Dairy Butter', 'Dairy Fresh Cream', 'Black Pepper', 'Clay Pot Cooked'],
        img        : 'images/chicken-handi.jpg',
        isPopular  : true
    },
    {
        id         : 'beef-seekh-kebab',
        name       : 'Beef Seekh Kebab (4 Pcs)',
        category   : 'bbq',
        priceNum   : 1400,
        price      : '1,400',
        desc       : 'Hand-crafted seekh kebabs with minced beef, fresh coriander, and spices — charcoal-grilled to juicy perfection.',
        badge      : '⭐ Popular',
        spiceLevel : '🌶️🌶️ Medium Spicy',
        serving    : 'Serves 1-2 Persons',
        ingredients: ['Fresh Minced Beef', 'Charcoal Smoked', 'Fresh Mint & Coriander', 'Secret Masala'],
        img        : 'images/beef-seekh-kebab.jpg',
        isPopular  : true
    },
    {
        id         : 'mix-bbq-platter',
        name       : 'Royal Mix BBQ Platter',
        category   : 'bbq',
        priceNum   : 3500,
        price      : '3,500',
        desc       : 'Grand platter of seekh kebabs, chicken boti, lamb chops, and malai tikka served with pudina chutney & fresh roghni naan.',
        badge      : '👨‍👩‍👧 Family Fav',
        spiceLevel : '🌶️🌶️ Assorted Spices',
        serving    : 'Serves 4-5 Persons',
        ingredients: ['Mutton Chops', 'Chicken Boti', 'Beef Seekh Kebabs', 'Malai Tikka', 'Tandoori Naan'],
        img        : 'images/mix-bbq-platter.jpg',
        isPopular  : true
    },
    {
        id         : 'chicken-tikka',
        name       : 'Tandoori Chicken Tikka',
        category   : 'bbq',
        priceNum   : 1200,
        price      : '1,200',
        desc       : 'Juicy bone-in chicken quarter marinated in strained yogurt and tandoori spices, char-grilled over natural coals.',
        badge      : '🔥 Grilled',
        spiceLevel : '🌶️🌶️🌶️ Spicy & Smoky',
        serving    : 'Serves 1 Person',
        ingredients: ['Chicken Quarter', 'Strained Yogurt', 'Red Chili Tandoori Rub', 'Coal Smoked'],
        img        : 'images/chicken-tikka.jpg',
        isPopular  : true
    },
    {
        id         : 'chicken-biryani',
        name       : 'Special Chicken Biryani',
        category   : 'rice',
        priceNum   : 950,
        price      : '950',
        desc       : 'Fragrant long-grain basmati rice layered with spiced chicken, caramelized onions, fresh mint, and saffron essence.',
        badge      : '🍚 Classic',
        spiceLevel : '🌶️🌶️ Traditional Spice',
        serving    : 'Serves 1-2 Persons',
        ingredients: ['XXL Basmati Rice', 'Chicken Gravy', 'Pure Saffron', 'Fried Onions', 'Plum & Mint'],
        img        : 'images/chicken-biryani.jpg',
        isPopular  : true
    },
    {
        id         : 'mutton-pulao',
        name       : 'Bannu Mutton Pulao',
        category   : 'rice',
        priceNum   : 1800,
        price      : '1,800',
        desc       : 'Aromatic yakhni pulao prepared with tender mutton cuts, whole garam masala, beef tallow and raisins.',
        badge      : '✨ Special',
        spiceLevel : '🌶️ Mild & Savory',
        serving    : 'Serves 2 Persons',
        ingredients: ['Mutton Yakhni Stock', 'Aged Basmati Rice', 'Beef Fat Tallow', 'Golden Raisins'],
        img        : 'images/mutton-pulao.jpg',
        isPopular  : true
    },
    {
        id         : 'nihari-special',
        name       : 'Dera Special Beef Nihari',
        category   : 'desi',
        priceNum   : 1100,
        price      : '1,100',
        desc       : 'Overnight slow-cooked shank in a velvety spiced gravy, garnished with fried onions, julienned ginger, and fresh lemon.',
        badge      : '🌙 Morning Fav',
        spiceLevel : '🌶️🌶️ Rich & Warm',
        serving    : 'Serves 1-2 Persons',
        ingredients: ['Beef Shank Bong', 'Slow-cooked 8 Hours', 'Nihari Tarka', 'Julienned Ginger & Lemon'],
        img        : 'images/nihari-special.jpg',
        isPopular  : true
    },
    {
        id         : 'paye-trotters',
        name       : 'Punjabi Beef Paye',
        category   : 'desi',
        priceNum   : 900,
        price      : '900',
        desc       : 'Traditional slow-cooked beef trotters in a gelatinous herbal broth — the quintessential Rawalpindi breakfast specialty.',
        badge      : '🌅 Breakfast',
        spiceLevel : '🌶️ Mild Gelatinous Broth',
        serving    : 'Serves 1 Person',
        ingredients: ['Beef Trotters', 'Slow-simmered Overnight', 'Bone Marrow Essence', 'Garam Masala'],
        img        : 'images/paye-trotters.jpg',
        isPopular  : true
    },
    {
        id         : 'chicken-shinwari',
        name       : 'Shinwari Chicken Karahi',
        category   : 'karahi',
        priceNum   : 1800,
        price      : '1,800',
        desc       : 'Pashtun style chicken karahi cooked solely in animal fat, fresh tomatoes, salt and green chilies with zero red powder.',
        badge      : '🧂 Authentic',
        spiceLevel : '🌶️ Green Chili Only',
        serving    : 'Serves 2-3 Persons',
        ingredients: ['Fresh Chicken', 'Plump Tomatoes', 'Whole Green Chilies', 'Rock Salt'],
        img        : 'images/chicken-shinwari.jpg',
        isPopular  : false
    },
    {
        id         : 'malai-boti',
        name       : 'Chicken Malai Boti (8 Pcs)',
        category   : 'bbq',
        priceNum   : 1350,
        price      : '1,350',
        desc       : 'Melt-in-mouth boneless chicken cubes marinated in heavy fresh cream, white pepper, cheese and mild green cardamom.',
        badge      : '🧀 Melt-in-Mouth',
        spiceLevel : '🌶️ Mild Cream Cheese',
        serving    : 'Serves 1-2 Persons',
        ingredients: ['Boneless Chicken Cubes', 'Heavy Fresh Cream', 'White Pepper', 'Melted Cheese'],
        img        : 'images/malai-boti.jpg',
        isPopular  : false
    },
    {
        id         : 'mutton-chops',
        name       : 'Charcoal Mutton Chops',
        category   : 'bbq',
        priceNum   : 2400,
        price      : '2,400',
        desc       : 'Tender lamb chops seasoned with raw papaya, garlic, cumin, and cracked coriander, smoked over hot acacia charcoal.',
        badge      : '🥩 Premium',
        spiceLevel : '🌶️🌶️ Medium Smoky',
        serving    : 'Serves 2 Persons',
        ingredients: ['Prime Mutton Ribs', 'Cracked Coriander', 'Raw Papaya Tenderizer', 'Charcoal Grilled'],
        img        : 'images/mutton-chops.jpg',
        isPopular  : false
    },
    {
        id         : 'haleem-special',
        name       : 'Shahi Daleem / Haleem',
        category   : 'desi',
        priceNum   : 800,
        price      : '800',
        desc       : 'Slow-simmered blend of seven grains, lentils and shredded beef, infused with aromatic tarka and served with condiments.',
        badge      : '🥣 Traditional',
        spiceLevel : '🌶️ Warm & Savory',
        serving    : 'Serves 1-2 Persons',
        ingredients: ['7 Grains & Lentils', 'Shredded Beef Resha', 'Crispy Golden Onions', 'Desi Ghee Tarka'],
        img        : 'images/haleem-special.jpg',
        isPopular  : false
    },
    {
        id         : 'daal-makhni',
        name       : 'Dera Daal Makhni Tarka',
        category   : 'desi',
        priceNum   : 650,
        price      : '650',
        desc       : 'Creamy black lentils slow-cooked on gentle flame with pure butter and finished with crispy garlic-cumin tarka.',
        badge      : '🌿 Desi Ghee',
        spiceLevel : '🌶️ Mild Buttery',
        serving    : 'Serves 1-2 Persons',
        ingredients: ['Black Urad Dal', 'Fresh Cream', 'White Butter', 'Garlic Cumin Tarka'],
        img        : 'images/daal-makhni.jpg',
        isPopular  : false
    },
    {
        id         : 'roghni-naan',
        name       : 'Roghni Naan Basket (3 Pcs)',
        category   : 'breads',
        priceNum   : 250,
        price      : '250',
        desc       : 'Soft fluffy tandoori naans brushed with pure desi ghee and sprinkled with toasted sesame seeds and kalonji.',
        badge      : '🥖 Tandoori',
        spiceLevel : 'Non-Spicy Bread',
        serving    : 'Serves 2-3 Persons',
        ingredients: ['Refined Flour Dough', 'Pure Desi Ghee', 'White Sesame Seeds', 'Kalonji Seeds'],
        img        : 'images/roghni-naan.jpg',
        isPopular  : false
    },
    {
        id         : 'garlic-cheese-naan',
        name       : 'Stuffed Garlic Cheese Naan',
        category   : 'breads',
        priceNum   : 450,
        price      : '450',
        desc       : 'Crispy outer crust filled with melted mozzarella and cheddar cheese, topped with roasted garlic and fresh coriander.',
        badge      : '🧀 Cheesy',
        spiceLevel : 'Mild Garlic',
        serving    : 'Serves 1-2 Persons',
        ingredients: ['Mozzarella Cheese', 'Cheddar Cheese', 'Roasted Garlic', 'Fresh Herbs'],
        img        : 'images/garlic-cheese-naan.jpg',
        isPopular  : false
    },
    {
        id         : 'kulfa-falooda',
        name       : 'Shahi Rabri Falooda Kulfa',
        category   : 'desserts',
        priceNum   : 550,
        price      : '550',
        desc       : 'Dense handmade malai kulfa topped with chilled rabri, rose syrup, basil seeds (tukh malanga) and cornflour vermicelli.',
        badge      : '🍨 Royal Sweet',
        spiceLevel : 'Sweet Dessert',
        serving    : 'Serves 1-2 Persons',
        ingredients: ['Hand-churned Malai Kulfa', 'Slow-cooked Thick Rabri', 'Pure Rooh Afza', 'Basil Seeds'],
        img        : 'images/kulfa-falooda.jpg',
        isPopular  : false
    },
    {
        id         : 'punjabi-lassi',
        name       : 'Makhani Malai Lassi (Clay Glass)',
        category   : 'desserts',
        priceNum   : 300,
        price      : '300',
        desc       : 'Thick, creamy churned sweet yogurt drink served in traditional clay glass topped with a dollop of fresh buffalo malai.',
        badge      : '🥛 Chilled',
        spiceLevel : 'Sweet Chilled',
        serving    : 'Serves 1 Person',
        ingredients: ['Fresh Curd Dahi', 'Buffalo Milk Malai', 'Crushed Ice', 'Served in Mitti Matka'],
        img        : 'images/punjabi-lassi.jpg',
        isPopular  : false
    }
];

/* =====================================================
   FEATURE 2: DISH QUICK-VIEW MODAL ENGINE
   ===================================================== */
function openQuickView(dishName) {
    const dish = dishes.find(d => d.name === dishName);
    if (!dish) return;

    const modal = document.getElementById('quickviewModal');
    const backdrop = document.getElementById('quickviewBackdrop');
    if (!modal || !backdrop) return;

    document.getElementById('qvImage').src = dish.img;
    document.getElementById('qvBadge').textContent = dish.badge;
    document.getElementById('qvTitle').textContent = dish.name;
    document.getElementById('qvDesc').textContent = dish.desc;
    document.getElementById('qvSpice').textContent = dish.spiceLevel;
    document.getElementById('qvServing').textContent = dish.serving;
    document.getElementById('qvPrice').textContent = 'PKR ' + dish.price;

    const ingContainer = document.getElementById('qvIngredients');
    if (ingContainer) {
        ingContainer.innerHTML = dish.ingredients.map(ing => `
            <span class="quickview-pill"><i class="fas fa-check"></i> ${ing}</span>
        `).join('');
    }

    const addBtn = document.getElementById('qvAddBtn');
    if (addBtn) {
        addBtn.onclick = () => {
            addToCart(dish.name);
            closeQuickView();
        };
    }

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const backdrop = document.getElementById('quickviewBackdrop');
    if (backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* =====================================================
   FEATURE 1: "MAKE YOUR OWN DERA THALI" BUILDER
   ===================================================== */
const thaliState = {
    main  : { name: 'Mutton Karahi', price: 950, icon: '🥘' },
    bbq   : { name: 'Beef Seekh Kebab', price: 450, icon: '🍢' },
    rice  : { name: 'Special Chicken Biryani', price: 350, icon: '🍚' },
    bread : { name: 'Roghni Naan', price: 100, icon: '🥖' },
    drink : { name: 'Makhani Malai Lassi', price: 200, icon: '🥛' }
};

function selectThaliItem(category, name, price, icon, btn) {
    thaliState[category] = { name, price, icon };

    // Update active button state in group
    const parent = btn.closest('.thali-options-grid');
    if (parent) {
        parent.querySelectorAll('.thali-opt-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    updateThaliVisual();
}

function updateThaliVisual() {
    // Center bowl
    const centerKatori = document.getElementById('thaliCenterKatori');
    if (centerKatori) {
        centerKatori.innerHTML = `
            <div class="thali-katori-icon">${thaliState.main.icon}</div>
            <div class="thali-katori-label">${thaliState.main.name}</div>
        `;
    }

    // Satellite bowls
    const slotTop = document.getElementById('thaliSlotTop');
    if (slotTop) {
        slotTop.innerHTML = `
            <div style="font-size:18px;">${thaliState.bbq.icon}</div>
            <div style="font-size:10px; font-weight:700; color:var(--dark);">${thaliState.bbq.name}</div>
        `;
    }

    const slotRight = document.getElementById('thaliSlotRight');
    if (slotRight) {
        slotRight.innerHTML = `
            <div style="font-size:18px;">${thaliState.rice.icon}</div>
            <div style="font-size:10px; font-weight:700; color:var(--dark);">${thaliState.rice.name}</div>
        `;
    }

    const slotBottom = document.getElementById('thaliSlotBottom');
    if (slotBottom) {
        slotBottom.innerHTML = `
            <div style="font-size:18px;">${thaliState.bread.icon}</div>
            <div style="font-size:10px; font-weight:700; color:var(--dark);">${thaliState.bread.name}</div>
        `;
    }

    const slotLeft = document.getElementById('thaliSlotLeft');
    if (slotLeft) {
        slotLeft.innerHTML = `
            <div style="font-size:18px;">${thaliState.drink.icon}</div>
            <div style="font-size:10px; font-weight:700; color:var(--dark);">${thaliState.drink.name}</div>
        `;
    }

    // Calculate total price
    const total = thaliState.main.price + thaliState.bbq.price + thaliState.rice.price + thaliState.bread.price + thaliState.drink.price;
    const priceEl = document.getElementById('thaliTotalPrice');
    if (priceEl) {
        priceEl.textContent = 'PKR ' + total.toLocaleString();
    }
}

function addCustomThaliToCart() {
    const total = thaliState.main.price + thaliState.bbq.price + thaliState.rice.price + thaliState.bread.price + thaliState.drink.price;
    const thaliFullName = `Custom Dera Royal Thali (${thaliState.main.name} + ${thaliState.bbq.name} + ${thaliState.rice.name} + ${thaliState.bread.name} + ${thaliState.drink.name})`;

    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.name === thaliFullName);

    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            name    : thaliFullName,
            priceNum: total,
            price   : total.toLocaleString(),
            img     : 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80',
            qty     : 1
        });
    }

    saveCart(cart);
    showToast('🍱 Custom Royal Thali added to your cart!');
    openCart();
}

/* =====================================================
   FEATURE 5: RAWALPINDI DELIVERY ZONE CHECKER
   ===================================================== */
const deliveryZones = {
    'naseerabad': { name: 'Naseerabad (Local Dera Area)', time: '15–25 Mins', fee: 'FREE Delivery', coverage: 'Immediate Hot Express' },
    'westridge' : { name: 'Westridge I, II & III', time: '20–30 Mins', fee: 'FREE Delivery', coverage: 'Regular Hot Delivery' },
    'saddar'    : { name: 'Saddar / Rawalpindi Cantt', time: '25–35 Mins', fee: 'FREE Delivery', coverage: 'Regular Hot Delivery' },
    'peshawar'  : { name: 'Peshawar Road & Chur Chowk', time: '20–30 Mins', fee: 'FREE Delivery', coverage: 'Regular Hot Delivery' },
    'tench'     : { name: 'Tench Bhatta / Dhok Syedan', time: '25–35 Mins', fee: 'FREE Delivery', coverage: 'Regular Hot Delivery' },
    'chaklala'  : { name: 'Chaklala Scheme III', time: '35–45 Mins', fee: 'FREE Delivery', coverage: 'Full Area Delivery' },
    'bahria'    : { name: 'Bahria Town (Phase 1 to 8)', time: '40–50 Mins', fee: 'Standard Delivery', coverage: 'Express Thermal Delivery' },
    'islamabad' : { name: 'Islamabad (I & F Sectors)', time: '35–45 Mins', fee: 'Express Delivery', coverage: 'Express Thermal Delivery' }
};

function checkDeliveryZone() {
    const select = document.getElementById('deliveryZoneSelect');
    const resultBox = document.getElementById('zoneResultBox');
    if (!select || !resultBox) return;

    const val = select.value;
    const zone = deliveryZones[val];
    if (!zone) return;

    resultBox.className = 'zone-result-box active';
    resultBox.innerHTML = `
        <div class="zone-result-icon"><i class="fas fa-motorcycle"></i></div>
        <div class="zone-result-text">
            <h4>${zone.name} — ${zone.time}</h4>
            <p><strong>${zone.fee}</strong> • ${zone.coverage} straight from Naseerabad kitchen.</p>
        </div>
    `;
}

/* =====================================================
   FEATURE 4: COUPON CODE SYSTEM & CELEBRATION CONFETTI
   ===================================================== */
let appliedCoupon = null;

const VALID_COUPONS = {
    'DERA10'     : { type: 'percent', value: 10, label: '10% OFF on Entire Order' },
    'FIRSTORDER' : { type: 'flat', value: 200, label: 'PKR 200 OFF Welcome Treat' },
    'FREEGHEE'   : { type: 'flat', value: 150, label: 'PKR 150 OFF Desi Ghee Voucher' }
};

function applyCoupon() {
    const input = document.getElementById('cartCouponInput');
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    if (!code) {
        alert('Please enter a coupon code (e.g. DERA10, FIRSTORDER)');
        return;
    }

    if (VALID_COUPONS[code]) {
        appliedCoupon = { code, ...VALID_COUPONS[code] };
        input.value = '';
        renderCartDrawer();
        fireConfetti();
        showToast(`🎉 Coupon "${code}" Applied Successfully!`);
    } else {
        alert('❌ Invalid coupon code. Try DERA10 or FIRSTORDER.');
    }
}

function removeCoupon() {
    appliedCoupon = null;
    renderCartDrawer();
    showToast('Coupon removed');
}

/* Pure Canvas Confetti */
function fireConfetti() {
    let canvas = document.getElementById('confettiCanvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'confettiCanvas';
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#D4AF37', '#1b5e20', '#2e7d32', '#f0c040', '#ffffff', '#ff9800'];

    for (let i = 0; i < 90; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 4 + 3,
            speedX: Math.random() * 4 - 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 8 - 4
        });
    }

    let animationFrame;
    const startTime = Date.now();

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });

        if (Date.now() - startTime < 2600) {
            animationFrame = requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animationFrame);
        }
    }

    render();
}

/* =====================================================
   FEATURE 8: PRINTABLE ROYAL MENU (PDF/PRINT)
   ===================================================== */
function printRoyalMenu() {
    window.print();
}

/* =====================================================
   CART STATE ENGINE (localStorage)
   ===================================================== */
const CART_STORAGE_KEY = 'rana_da_dera_cart_v1';

function getCart() {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
        console.error('Failed to save cart to localStorage', e);
    }
    updateCartUI();
}

function updateCartUI() {
    const cart = getCart();
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

    document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = totalItems;
        badge.classList.remove('pop');
        void badge.offsetWidth;
        badge.classList.add('pop');
    });

    const headerCount = document.getElementById('cartCountHeader');
    if (headerCount) {
        headerCount.textContent = totalItems;
    }

    renderCartDrawer();
}

/* Add Dish to Cart */
function addToCart(dishName) {
    const dish = dishes.find(d => d.name === dishName);
    if (!dish) return;

    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.name === dishName);

    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            name    : dish.name,
            priceNum: dish.priceNum,
            price   : dish.price,
            img     : dish.img,
            qty     : 1
        });
    }

    saveCart(cart);
    showToast(`Added "${dish.name}" to cart! 🛒`);
}

/* Update Quantity */
function updateCartQty(dishName, delta) {
    let cart = getCart();
    const index = cart.findIndex(item => item.name === dishName);
    if (index === -1) return;

    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
        showToast('Removed from cart');
    }

    saveCart(cart);
}

/* Remove Item */
function removeFromCart(dishName) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== dishName);
    saveCart(cart);
    showToast('Removed from cart');
}

/* Clear Cart */
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        saveCart([]);
        appliedCoupon = null;
        showToast('Cart cleared!');
    }
}

/* Open / Close Cart Drawer */
function openCart() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    if (drawer && backdrop) {
        drawer.classList.add('open');
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
        renderCartDrawer();
    }
}

function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    if (drawer && backdrop) {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
    }
}

/* Render Drawer Contents */
function renderCartDrawer() {
    const container = document.getElementById('cartItemsContainer');
    const footer = document.getElementById('cartFooter');
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');
    const discountRow = document.getElementById('cartDiscountRow');
    const discountVal = document.getElementById('cartDiscountValue');
    const couponBadge = document.getElementById('couponAppliedBadge');

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">
                    <i class="fas fa-shopping-basket"></i>
                </div>
                <h4>Your Cart is Empty</h4>
                <p>Add some delicious sizzling Karahi, BBQ, or Biryani from our menu!</p>
                <a href="menu.html" class="btn-browse-menu" onclick="closeCart()">
                    <i class="fas fa-utensils"></i> Explore Full Menu
                </a>
            </div>
        `;
        if (footer) footer.style.display = 'none';
        return;
    }

    if (footer) footer.style.display = 'block';

    let subtotalAmount = 0;

    container.innerHTML = cart.map(item => {
        const itemSubtotal = item.priceNum * item.qty;
        subtotalAmount += itemSubtotal;

        return `
            <div class="cart-item">
                <img
                    src="${item.img}"
                    alt="${item.name}"
                    class="cart-item-img"
                    onerror="this.onerror=null; this.src='${FALLBACK_DISH_IMG}';"
                >
                <div class="cart-item-details">
                    <div class="cart-item-name" title="${item.name}">${item.name}</div>
                    <div class="cart-item-price">PKR ${item.price} each</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateCartQty('${item.name}', -1)" title="Decrease quantity">−</button>
                        <span class="qty-val">${item.qty}</span>
                        <button class="qty-btn" onclick="updateCartQty('${item.name}', 1)" title="Increase quantity">+</button>
                    </div>
                </div>
                <div class="cart-item-right">
                    <div class="cart-item-subtotal">PKR ${itemSubtotal.toLocaleString()}</div>
                    <button class="cart-remove-btn" onclick="removeFromCart('${item.name}')" title="Remove item">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Calculate Discount
    let discountAmount = 0;
    if (appliedCoupon) {
        if (appliedCoupon.type === 'percent') {
            discountAmount = Math.round((subtotalAmount * appliedCoupon.value) / 100);
        } else if (appliedCoupon.type === 'flat') {
            discountAmount = appliedCoupon.value;
        }
        if (discountAmount > subtotalAmount) discountAmount = subtotalAmount;

        if (discountRow) discountRow.style.display = 'flex';
        if (discountVal) discountVal.textContent = '- PKR ' + discountAmount.toLocaleString();

        if (couponBadge) {
            couponBadge.style.display = 'flex';
            couponBadge.innerHTML = `
                <span><i class="fas fa-tag"></i> <strong>${appliedCoupon.code}</strong> (${appliedCoupon.label})</span>
                <button class="btn-remove-coupon" onclick="removeCoupon()" title="Remove coupon">&times;</button>
            `;
        }
    } else {
        if (discountRow) discountRow.style.display = 'none';
        if (couponBadge) couponBadge.style.display = 'none';
    }

    const grandTotal = Math.max(0, subtotalAmount - discountAmount);

    if (subtotalEl) subtotalEl.textContent = 'PKR ' + subtotalAmount.toLocaleString();
    if (totalEl) totalEl.textContent = 'PKR ' + grandTotal.toLocaleString();
}

/* Checkout via WhatsApp with Full Order Summary & Discount */
function checkoutWhatsApp() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty! Please add some dishes first.');
        return;
    }

    const nameInput = document.getElementById('cartCustomerName');
    const addrInput = document.getElementById('cartCustomerAddress');

    const customerName = nameInput ? nameInput.value.trim() : '';
    const customerAddr = addrInput ? addrInput.value.trim() : '';

    let itemsList = '';
    let subtotalAmount = 0;

    cart.forEach(item => {
        const lineTotal = item.priceNum * item.qty;
        subtotalAmount += lineTotal;
        itemsList += `• ${item.qty}x *${item.name}* (PKR ${lineTotal.toLocaleString()})\n`;
    });

    let discountAmount = 0;
    let couponText = '';
    if (appliedCoupon) {
        if (appliedCoupon.type === 'percent') {
            discountAmount = Math.round((subtotalAmount * appliedCoupon.value) / 100);
        } else if (appliedCoupon.type === 'flat') {
            discountAmount = appliedCoupon.value;
        }
        if (discountAmount > subtotalAmount) discountAmount = subtotalAmount;
        couponText = `🎟️ *Promo Code Applied:* ${appliedCoupon.code} (-PKR ${discountAmount.toLocaleString()})\n`;
    }

    const finalAmount = Math.max(0, subtotalAmount - discountAmount);

    const msg = encodeURIComponent(
        `🍽️ *NEW ORDER — RANA DA DERA*\n` +
        `📍 *Naseerabad, Rawalpindi*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Customer Name:* ${customerName || 'Guest'}\n` +
        `🏠 *Delivery / Table Address:* ${customerAddr || 'Takeaway / Naseerabad'}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `📦 *ORDER ITEMS:*\n${itemsList}` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `💵 *Subtotal:* PKR ${subtotalAmount.toLocaleString()}\n` +
        (couponText ? couponText : '') +
        `💰 *FINAL TOTAL: PKR ${finalAmount.toLocaleString()}*\n` +
        `🚗 *Delivery:* Free to Naseerabad & Rawalpindi Areas\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Please confirm order preparation time. Shukriya! 🙏`
    );

    window.open(`https://wa.me/923014431520?text=${msg}`, '_blank');
}

/* Toast Alert Notification */
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('cartToast');
    const toastMsg = document.getElementById('cartToastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2400);
}

/* ================================================
   HOME PAGE: RENDER POPULAR DISHES WITH QUICK-VIEW
   ================================================ */
function renderDishes(filter = 'all') {
    const grid = document.getElementById('dishesGrid');
    if (!grid) return;

    const popularOnly = dishes.filter(d => d.isPopular);
    const filtered = filter === 'all'
        ? popularOnly
        : dishes.filter(d => d.category === filter);

    grid.innerHTML = filtered.map((d, i) => `
        <div class="dish-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
            <div class="dish-img-wrap" onclick="openQuickView('${d.name}')">
                <img
                    src="${d.img}"
                    alt="${d.name}"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='${FALLBACK_DISH_IMG}';"
                >
                <span class="dish-badge">${d.badge}</span>
            </div>
            <div class="dish-info">
                <h3 class="dish-name" onclick="openQuickView('${d.name}')">${d.name}</h3>
                <p class="dish-desc">${d.desc}</p>
                <div class="dish-footer">
                    <div class="dish-price">PKR ${d.price} <span>/ serving</span></div>
                    <div class="dish-actions">
                        <button
                            class="quickview-btn"
                            onclick="openQuickView('${d.name}')"
                            title="Quick View Details & Spices"
                            aria-label="View ${d.name} details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button
                            class="add-btn"
                            onclick="addToCart('${d.name}')"
                            title="Add to Cart"
                            aria-label="Add ${d.name} to Cart">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

function filterDishes(cat, btn) {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderDishes(cat);
}

/* =====================================================
   DEDICATED MENU PAGE ENGINE (#fullMenuGrid on menu.html)
   ===================================================== */
let currentMenuFilter = 'all';
let currentMenuQuery = '';
let currentMenuSort = 'default';

function renderFullMenu() {
    const grid = document.getElementById('fullMenuGrid');
    const countEl = document.getElementById('menuResultsCount');
    if (!grid) return;

    let items = [...dishes];

    // Filter by Category
    if (currentMenuFilter !== 'all') {
        items = items.filter(d => d.category === currentMenuFilter);
    }

    // Filter by Query
    if (currentMenuQuery.trim() !== '') {
        const q = currentMenuQuery.toLowerCase().trim();
        items = items.filter(d =>
            d.name.toLowerCase().includes(q) ||
            d.desc.toLowerCase().includes(q) ||
            d.category.toLowerCase().includes(q)
        );
    }

    // Sort
    if (currentMenuSort === 'price-low') {
        items.sort((a, b) => a.priceNum - b.priceNum);
    } else if (currentMenuSort === 'price-high') {
        items.sort((a, b) => b.priceNum - a.priceNum);
    } else if (currentMenuSort === 'popular') {
        items.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    if (countEl) {
        countEl.innerHTML = `Showing <strong>${items.length}</strong> items in royal collection`;
    }

    if (items.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <div style="font-size: 48px; color: var(--gold); margin-bottom: 12px;">🔍</div>
                <h3 style="font-family:'Playfair Display', serif; font-size: 24px; margin-bottom: 8px;">No Dishes Found</h3>
                <p style="color: var(--gray); font-size: 15px;">Try searching for another dish or choose a different category.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map((d, i) => `
        <div class="dish-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 80}">
            <div class="dish-img-wrap" onclick="openQuickView('${d.name}')">
                <img
                    src="${d.img}"
                    alt="${d.name}"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='${FALLBACK_DISH_IMG}';"
                >
                <span class="dish-badge">${d.badge}</span>
            </div>
            <div class="dish-info">
                <h3 class="dish-name" onclick="openQuickView('${d.name}')">${d.name}</h3>
                <p class="dish-desc">${d.desc}</p>
                <div class="dish-footer">
                    <div class="dish-price">PKR ${d.price} <span>/ serving</span></div>
                    <div class="dish-actions">
                        <button
                            class="quickview-btn"
                            onclick="openQuickView('${d.name}')"
                            title="Quick View Details & Spices"
                            aria-label="View ${d.name} details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button
                            class="add-btn"
                            onclick="addToCart('${d.name}')"
                            title="Add to Cart"
                            aria-label="Add ${d.name} to Cart">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

function filterFullMenuCategory(cat, btn) {
    currentMenuFilter = cat;
    document.querySelectorAll('.menu-cat-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderFullMenu();
}

function handleMenuSearch(e) {
    currentMenuQuery = e.target.value;
    renderFullMenu();
}

function handleMenuSort(e) {
    currentMenuSort = e.target.value;
    renderFullMenu();
}

/* ================================================
   GALLERY LIGHTBOX
   ================================================ */
function openLightbox(el) {
    const img = el.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

const lightboxElem = document.getElementById('lightbox');
if (lightboxElem) {
    lightboxElem.addEventListener('click', function (e) {
        if (e.target === this || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });
}

/* Close dialogs on escape */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeCart();
        closeLightbox();
        closeQuickView();
        closeMobileMenu();
    }
});

/* ================================================
   RESERVATION FORM → WHATSAPP
   ================================================ */
function sendReservation() {
    const nameEl     = document.getElementById('resName');
    const phoneEl    = document.getElementById('resPhone');
    const dateEl     = document.getElementById('resDate');
    const timeEl     = document.getElementById('resTime');
    const guestsEl   = document.getElementById('resGuests');
    const occasionEl = document.getElementById('resOccasion');
    const msgEl      = document.getElementById('resMessage');

    const name     = nameEl ? nameEl.value.trim() : '';
    const phone    = phoneEl ? phoneEl.value.trim() : '';
    const date     = dateEl ? dateEl.value : '';
    const time     = timeEl ? timeEl.value : '';
    const guests   = guestsEl ? guestsEl.value : '2 People';
    const occasion = occasionEl ? occasionEl.value : 'Regular Dining';
    const message  = msgEl ? msgEl.value.trim() : '';

    if (!name || !phone || !date || !time) {
        alert('⚠️ Please fill in all required fields:\nName, Phone, Date & Time');
        return;
    }

    const formattedDate = new Date(date).toLocaleDateString('en-PK', {
        weekday : 'long',
        year    : 'numeric',
        month   : 'long',
        day     : 'numeric'
    });

    const msg = encodeURIComponent(
        `🍽️ *TABLE RESERVATION REQUEST*\n` +
        `📍 *Rana Da Dera — Naseerabad, Rawalpindi*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 Name     : *${name}*\n` +
        `📞 Phone    : *${phone}*\n` +
        `📅 Date     : *${formattedDate}*\n` +
        `🕐 Time     : *${time}*\n` +
        `👥 Guests   : *${guests}*\n` +
        `🎉 Occasion : *${occasion}*\n` +
        `📝 Requests : *${message || 'None'}*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Please confirm my reservation. Shukriya! 🙏`
    );

    window.open(`https://wa.me/923014431520?text=${msg}`, '_blank');
}

/* ================================================
   NEWSLETTER SUBSCRIBE
   ================================================ */
function subscribeNewsletter() {
    const emailEl = document.getElementById('nlEmail');
    const email = emailEl ? emailEl.value.trim() : '';

    if (!email || !email.includes('@') || !email.includes('.')) {
        alert('⚠️ Please enter a valid email address!');
        return;
    }

    alert(
        '🎉 Subscribed Successfully!\n\n' +
        'You will now receive exclusive offers & updates from Rana Da Dera. Shukriya!'
    );

    if (emailEl) emailEl.value = '';
}

/* Min Date Setup */
(function setMinDate() {
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
})();

/* ================================================
   INITIALIZATION
   ================================================ */
function init() {
    // 1. Theme engine
    initTheme();

    // 2. Kitchen status (2 AM - 3 PM)
    updateKitchenStatus();
    setInterval(updateKitchenStatus, 60000); // Check every minute

    // 3. Cart & badges
    updateCartUI();

    // 4. Cart icon triggers
    document.querySelectorAll('.nav-cart').forEach(cartIcon => {
        cartIcon.addEventListener('click', openCart);
    });

    // 5. Thali visual initial update
    if (document.getElementById('thaliCenterKatori')) {
        updateThaliVisual();
    }

    // 6. Home page dishes
    if (document.getElementById('dishesGrid')) {
        renderDishes();
    }

    // 7. Menu page engine
    if (document.getElementById('fullMenuGrid')) {
        renderFullMenu();

        const searchInput = document.getElementById('menuSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', handleMenuSearch);
        }

        const sortSelect = document.getElementById('menuSortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', handleMenuSort);
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
