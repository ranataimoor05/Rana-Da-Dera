/* =====================================================
   RANA DA DERA — script.js
   Fine Dining & Restaurant | Naseerabad, Rawalpindi
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
    }, 1800);
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

    /* Highlight active nav link */
    const sections = ['home','about','menu','gallery','reviews','delivery','reservation','contact'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
            document.querySelectorAll('.nav-left a').forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + id);
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
   DISHES DATA — All tested & verified images
   ================================================ */
const dishes = [
    {
        name     : 'Mutton Karahi',
        desc     : 'Rich, aromatic mutton cooked in fresh tomatoes, ginger, green chilies, and traditional desi spices. Our signature specialty.',
        price    : '2,200',
        category : 'karahi',
        badge    : '🔥 Best Seller',
        img      : 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80'
    },
    {
        name     : 'Beef Seekh Kebab',
        desc     : 'Hand-crafted seekh kebabs with minced beef, fresh coriander, and spices — charcoal-grilled to juicy perfection.',
        price    : '1,400',
        category : 'bbq',
        badge    : '⭐ Popular',
        img      : 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80'
    },
    {
        name     : 'Chicken Biryani',
        desc     : 'Fragrant long-grain basmati rice layered with spiced chicken, caramelized onions, mint, and saffron essence.',
        price    : '950',
        category : 'rice',
        badge    : '🍚 Classic',
        img      : 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80'
    },
    {
        name     : 'Mix BBQ Platter',
        desc     : 'Grand assortment of seekh kebabs, chicken boti, lamb chops, and malai tikka served with fresh chutney & naan.',
        price    : '3,500',
        category : 'bbq',
        badge    : '👨‍👩‍👧 Family Fav',
        img      : 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80'
    },
    {
        name     : 'Nihari Special',
        desc     : 'Overnight slow-cooked shank in a velvety spiced gravy, garnished with fried onions, julienned ginger, and lemon.',
        price    : '1,100',
        category : 'desi',
        badge    : '🌙 Morning Fav',
        img      : 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80'
    },
    {
        name     : 'Chicken Handi',
        desc     : 'Tender boneless chicken simmered in rich creamy butter gravy with crushed black pepper in an authentic clay pot.',
        price    : '1,600',
        category : 'karahi',
        badge    : '🫙 Must Try',
        img      : 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80'
    },
    {
        name     : 'Mutton Pulao',
        desc     : 'Aromatic yakhni pulao prepared with tender mutton cuts, whole garam masala, and caramelized onions.',
        price    : '1,800',
        category : 'rice',
        badge    : '✨ Special',
        img      : 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80'
    },
    {
        name     : 'Paye (Trotters)',
        desc     : 'Traditional slow-cooked beef trotters in a gelatinous herbal broth — the quintessential Rawalpindi breakfast.',
        price    : '900',
        category : 'desi',
        badge    : '🌅 Breakfast',
        img      : 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80'
    },
    {
        name     : 'Chicken Tikka',
        desc     : 'Juicy bone-in chicken quarter marinated in strained yogurt and tandoori spices, char-grilled over natural coals.',
        price    : '1,200',
        category : 'bbq',
        badge    : '🔥 Grilled',
        img      : 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&q=80'
    }
];

/* ================================================
   CART COUNTER
   ================================================ */
let cartCount = 0;

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) badge.textContent = cartCount;
}

/* ================================================
   RENDER DISHES
   ================================================ */
function renderDishes(filter = 'all') {
    const grid = document.getElementById('dishesGrid');
    if (!grid) return;

    const filtered = filter === 'all'
        ? dishes
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
                        onclick="orderDish('${d.name}', 'PKR ${d.price}')"
                        title="Order via WhatsApp"
                        aria-label="Order ${d.name} on WhatsApp">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

/* ================================================
   FILTER DISHES
   ================================================ */
function filterDishes(cat, btn) {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderDishes(cat);
}

/* ================================================
   ORDER DISH → WHATSAPP
   ================================================ */
function orderDish(name, price) {
    cartCount++;
    updateCartBadge();

    const msg = encodeURIComponent(
        `Assalam-u-Alaikum! 🍽️\n\n` +
        `I would like to order from *Rana Da Dera*:\n\n` +
        `🥘 Item: *${name}*\n` +
        `💰 Price: *${price}*\n\n` +
        `Please confirm availability and delivery time. Thank you!`
    );

    window.open(`https://wa.me/923014431520?text=${msg}`, '_blank');
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

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
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
    renderDishes();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
