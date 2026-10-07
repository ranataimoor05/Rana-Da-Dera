/* =====================================================
   RANA DA DERA — script.js
   Fine Dining & Restaurant | Naseerabad, Rawalpindi
   Complete Frontend Cart System & Royal Menu Engine
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
   NAVBAR — Scroll Shrink + Active Link Highlight
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

    /* Highlight active nav link on one-page sections */
    const sections = ['home','about','menu','gallery','reviews','delivery','reservation','contact'];
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
   ALL DISHES DATA — 18 Authentic Royal Items
   ================================================ */
const dishes = [
    {
        id       : 'mutton-karahi',
        name     : 'Mutton Karahi',
        category : 'karahi',
        priceNum : 2200,
        price    : '2,200',
        desc     : 'Rich, aromatic mutton cooked in fresh tomatoes, ginger, green chilies, and traditional desi spices in iron wok.',
        badge    : '🔥 Best Seller',
        img      : 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80',
        isPopular: true
    },
    {
        id       : 'chicken-handi',
        name     : 'Chicken Handi (Boneless)',
        category : 'karahi',
        priceNum : 1600,
        price    : '1,600',
        desc     : 'Tender boneless chicken simmered in rich creamy butter gravy with crushed black pepper in an authentic clay pot.',
        badge    : '🫙 Must Try',
        img      : 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80',
        isPopular: true
    },
    {
        id       : 'beef-seekh-kebab',
        name     : 'Beef Seekh Kebab (4 Pcs)',
        category : 'bbq',
        priceNum : 1400,
        price    : '1,400',
        desc     : 'Hand-crafted seekh kebabs with minced beef, fresh coriander, and spices — charcoal-grilled to juicy perfection.',
        badge    : '⭐ Popular',
        img      : 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
        isPopular: true
    },
    {
        id       : 'mix-bbq-platter',
        name     : 'Royal Mix BBQ Platter',
        category : 'bbq',
        priceNum : 3500,
        price    : '3,500',
        desc     : 'Grand platter of seekh kebabs, chicken boti, lamb chops, and malai tikka served with pudina chutney & fresh roghni naan.',
        badge    : '👨‍👩‍👧 Family Fav',
        img      : 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
        isPopular: true
    },
    {
        id       : 'chicken-tikka',
        name     : 'Tandoori Chicken Tikka',
        category : 'bbq',
        priceNum : 1200,
        price    : '1,200',
        desc     : 'Juicy bone-in chicken quarter marinated in strained yogurt and tandoori spices, char-grilled over natural coals.',
        badge    : '🔥 Grilled',
        img      : 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&q=80',
        isPopular: true
    },
    {
        id       : 'chicken-biryani',
        name     : 'Special Chicken Biryani',
        category : 'rice',
        priceNum : 950,
        price    : '950',
        desc     : 'Fragrant long-grain basmati rice layered with spiced chicken, caramelized onions, fresh mint, and saffron essence.',
        badge    : '🍚 Classic',
        img      : 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
        isPopular: true
    },
    {
        id       : 'mutton-pulao',
        name     : 'Bannu Mutton Pulao',
        category : 'rice',
        priceNum : 1800,
        price    : '1,800',
        desc     : 'Aromatic yakhni pulao prepared with tender mutton cuts, whole garam masala, beef tallow and raisins.',
        badge    : '✨ Special',
        img      : 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80',
        isPopular: true
    },
    {
        id       : 'nihari-special',
        name     : 'Dera Special Beef Nihari',
        category : 'desi',
        priceNum : 1100,
        price    : '1,100',
        desc     : 'Overnight slow-cooked shank in a velvety spiced gravy, garnished with fried onions, julienned ginger, and fresh lemon.',
        badge    : '🌙 Morning Fav',
        img      : 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80',
        isPopular: true
    },
    {
        id       : 'paye-trotters',
        name     : 'Punjabi Beef Paye',
        category : 'desi',
        priceNum : 900,
        price    : '900',
        desc     : 'Traditional slow-cooked beef trotters in a gelatinous herbal broth — the quintessential Rawalpindi breakfast specialty.',
        badge    : '🌅 Breakfast',
        img      : 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
        isPopular: true
    },
    {
        id       : 'chicken-shinwari',
        name     : 'Shinwari Chicken Karahi',
        category : 'karahi',
        priceNum : 1800,
        price    : '1,800',
        desc     : 'Pashtun style chicken karahi cooked solely in animal fat, fresh tomatoes, salt and green chilies with zero red powder.',
        badge    : '🧂 Authentic',
        img      : 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80',
        isPopular: false
    },
    {
        id       : 'malai-boti',
        name     : 'Chicken Malai Boti (8 Pcs)',
        category : 'bbq',
        priceNum : 1350,
        price    : '1,350',
        desc     : 'Melt-in-mouth boneless chicken cubes marinated in heavy fresh cream, white pepper, cheese and mild green cardamom.',
        badge    : '🧀 Melt-in-Mouth',
        img      : 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
        isPopular: false
    },
    {
        id       : 'mutton-chops',
        name     : 'Charcoal Mutton Chops',
        category : 'bbq',
        priceNum : 2400,
        price    : '2,400',
        desc     : 'Tender lamb chops seasoned with raw papaya, garlic, cumin, and cracked coriander, smoked over hot acacia charcoal.',
        badge    : '🥩 Premium',
        img      : 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
        isPopular: false
    },
    {
        id       : 'haleem-special',
        name     : 'Shahi Shahi Daleem / Haleem',
        category : 'desi',
        priceNum : 800,
        price    : '800',
        desc     : 'Slow-simmered blend of seven grains, lentils and shredded beef, infused with aromatic tarka and served with condiments.',
        badge    : '🥣 Traditional',
        img      : 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
        isPopular: false
    },
    {
        id       : 'daal-makhni',
        name     : 'Dera Daal Makhni Tarka',
        category : 'desi',
        priceNum : 650,
        price    : '650',
        desc     : 'Creamy black lentils slow-cooked on gentle flame with pure butter and finished with crispy garlic-cumin tarka.',
        badge    : '🌿 Desi Ghee',
        img      : 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80',
        isPopular: false
    },
    {
        id       : 'roghni-naan',
        name     : 'Roghni Naan Basket (3 Pcs)',
        category : 'breads',
        priceNum : 250,
        price    : '250',
        desc     : 'Soft fluffy tandoori naans brushed with pure desi ghee and sprinkled with toasted sesame seeds and kalonji.',
        badge    : '🥖 Tandoori',
        img      : 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
        isPopular: false
    },
    {
        id       : 'garlic-cheese-naan',
        name     : 'Stuffed Garlic Cheese Naan',
        category : 'breads',
        priceNum : 450,
        price    : '450',
        desc     : 'Crispy outer crust filled with melted mozzarella and cheddar cheese, topped with roasted garlic and fresh coriander.',
        badge    : '🧀 Cheesy',
        img      : 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
        isPopular: false
    },
    {
        id       : 'kulfa-falooda',
        name     : 'Shahi Rabri Falooda Kulfa',
        category : 'desserts',
        priceNum : 550,
        price    : '550',
        desc     : 'Dense handmade malai kulfa topped with chilled rabri, rose syrup, basil seeds (tukh malanga) and cornflour vermicelli.',
        badge    : '🍨 Royal Sweet',
        img      : 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
        isPopular: false
    },
    {
        id       : 'punjabi-lassi',
        name     : 'Makhani Malai Lassi (Clay Glass)',
        category : 'desserts',
        priceNum : 300,
        price    : '300',
        desc     : 'Thick, creamy churned sweet yogurt drink served in traditional clay glass topped with a dollop of fresh buffalo malai.',
        badge    : '🥛 Chilled',
        img      : 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80',
        isPopular: false
    }
];

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

    /* Update all cart badges across navbar & mobile */
    document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = totalItems;
        badge.classList.remove('pop');
        void badge.offsetWidth; /* Trigger reflow */
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

/* Update Quantity (+1 or -1) */
function updateCartQty(dishName, delta) {
    let cart = getCart();
    const index = cart.findIndex(item => item.name === dishName);
    if (index === -1) return;

    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
        showToast(`Removed from cart`);
    }

    saveCart(cart);
}

/* Remove Item Entirely */
function removeFromCart(dishName) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== dishName);
    saveCart(cart);
    showToast(`Removed from cart`);
}

/* Clear Entire Cart */
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        saveCart([]);
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

/* Close cart on Escape */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeCart();
        closeLightbox();
        closeMobileMenu();
    }
});

/* Render Drawer Contents */
function renderCartDrawer() {
    const container = document.getElementById('cartItemsContainer');
    const footer = document.getElementById('cartFooter');
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');

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

    let totalAmount = 0;

    container.innerHTML = cart.map(item => {
        const itemSubtotal = item.priceNum * item.qty;
        totalAmount += itemSubtotal;

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

    const formattedTotal = 'PKR ' + totalAmount.toLocaleString();
    if (subtotalEl) subtotalEl.textContent = formattedTotal;
    if (totalEl) totalEl.textContent = formattedTotal;
}

/* Checkout via WhatsApp with Full Order Summary */
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
    let grandTotal = 0;

    cart.forEach(item => {
        const lineTotal = item.priceNum * item.qty;
        grandTotal += lineTotal;
        itemsList += `• ${item.qty}x *${item.name}* (PKR ${lineTotal.toLocaleString()})\n`;
    });

    const msg = encodeURIComponent(
        `🍽️ *NEW ORDER — RANA DA DERA*\n` +
        `📍 *Naseerabad, Rawalpindi*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Customer Name:* ${customerName || 'Guest'}\n` +
        `🏠 *Delivery / Table Address:* ${customerAddr || 'Takeaway / Naseerabad'}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `📦 *ORDER ITEMS:*\n${itemsList}` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `💰 *TOTAL AMOUNT: PKR ${grandTotal.toLocaleString()}*\n` +
        `🚗 *Delivery:* Free to Naseerabad / Rawalpindi\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `Please confirm order availability and preparation time. Shukriya! 🙏`
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
   HOME PAGE: RENDER POPULAR DISHES (#dishesGrid)
   ================================================ */
function renderDishes(filter = 'all') {
    const grid = document.getElementById('dishesGrid');
    if (!grid) return;

    /* On home page, we show dishes with isPopular: true or category match */
    const popularOnly = dishes.filter(d => d.isPopular);
    const filtered = filter === 'all'
        ? popularOnly
        : dishes.filter(d => d.category === filter);

    grid.innerHTML = filtered.map((d, i) => `
        <div class="dish-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
            <div class="dish-img-wrap">
                <img
                    src="${d.img}"
                    alt="${d.name}"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='${FALLBACK_DISH_IMG}';"
                >
                <span class="dish-badge">${d.badge}</span>
            </div>
            <div class="dish-info">
                <h3 class="dish-name">${d.name}</h3>
                <p class="dish-desc">${d.desc}</p>
                <div class="dish-footer">
                    <div class="dish-price">PKR ${d.price} <span>/ serving</span></div>
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

    /* 1. Category Filter */
    if (currentMenuFilter !== 'all') {
        items = items.filter(d => d.category === currentMenuFilter);
    }

    /* 2. Search Query Filter */
    if (currentMenuQuery.trim() !== '') {
        const q = currentMenuQuery.toLowerCase().trim();
        items = items.filter(d =>
            d.name.toLowerCase().includes(q) ||
            d.desc.toLowerCase().includes(q) ||
            d.category.toLowerCase().includes(q)
        );
    }

    /* 3. Sort Order */
    if (currentMenuSort === 'price-low') {
        items.sort((a, b) => a.priceNum - b.priceNum);
    } else if (currentMenuSort === 'price-high') {
        items.sort((a, b) => b.priceNum - a.priceNum);
    } else if (currentMenuSort === 'popular') {
        items.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    /* Update count indicator */
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
            <div class="dish-img-wrap">
                <img
                    src="${d.img}"
                    alt="${d.name}"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='${FALLBACK_DISH_IMG}';"
                >
                <span class="dish-badge">${d.badge}</span>
            </div>
            <div class="dish-info">
                <h3 class="dish-name">${d.name}</h3>
                <p class="dish-desc">${d.desc}</p>
                <div class="dish-footer">
                    <div class="dish-price">PKR ${d.price} <span>/ serving</span></div>
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

/* ================================================
   MIN DATE FOR RESERVATION (today)
   ================================================ */
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
    /* 1. Update Cart state and Badges */
    updateCartUI();

    /* 2. Attach click handlers to any cart icons */
    document.querySelectorAll('.nav-cart').forEach(cartIcon => {
        cartIcon.addEventListener('click', openCart);
    });

    /* 3. If on Home Page, render curated popular dishes */
    if (document.getElementById('dishesGrid')) {
        renderDishes();
    }

    /* 4. If on Dedicated Menu Page, render full menu & attach search/sort */
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
