/* =====================================================
   RANA DA DERA — script.js
   Fine Dining & Restaurant | Naseerabad, Rawalpindi
   ===================================================== */

/* ================================================
   AOS — Animate On Scroll Init
   ================================================ */
AOS.init({
    duration : 850,
    once     : true,
    offset   : 80,
    easing   : 'ease-out-cubic'
});

/* ================================================
   PAGE LOADER
   ================================================ */
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600);
    }, 2300);
});

/* ================================================
   NAVBAR — Scroll Shrink + Active Link Highlight
   ================================================ */
const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    /* Shrink navbar on scroll */
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
        backTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        backTop.classList.remove('visible');
    }

    /* Highlight active nav link */
    const sections = ['home','about','menu','gallery','reviews','delivery','reservation','contact'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
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
    document.getElementById('mobileMenu').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
}

/* ================================================
   DISHES DATA
   ================================================ */
const dishes = [
    {
        name     : 'Mutton Karahi',
        desc     : 'Rich, aromatic mutton cooked in fresh tomatoes, green chilies, and traditional spices. A true signature dish.',
        price    : '2,200',
        category : 'karahi',
        badge    : '🔥 Best Seller',
        img      : 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80'
    },
    {
        name     : 'Beef Seekh Kebab',
        desc     : 'Hand-crafted seekh kebabs with minced beef, fresh herbs and spices — grilled to smoky perfection.',
        price    : '1,400',
        category : 'bbq',
        badge    : '⭐ Popular',
        img      : 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80'
    },
    {
        name     : 'Chicken Biryani',
        desc     : 'Fragrant basmati rice layered with spiced chicken, fried onions, mint, and saffron.',
        price    : '950',
        category : 'rice',
        badge    : '🍚 Classic',
        img      : 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80'
    },
    {
        name     : 'Mix BBQ Platter',
        desc     : 'A grand platter of seekh kebab, boti, chops, and tikka — perfect for groups and families.',
        price    : '3,500',
        category : 'bbq',
        badge    : '👨‍👩‍👧 Family Fav',
        img      : 'https://images.unsplash.com/photo-1563379091339-03246963d775?w=500&q=80'
    },
    {
        name     : 'Nihari Special',
        desc     : 'Slow-cooked nihari with tender beef shank, rich gravy, ginger, and lemon — served with naan.',
        price    : '1,100',
        category : 'desi',
        badge    : '🌙 Morning Fav',
        img      : 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80'
    },
    {
        name     : 'Chicken Handi',
        desc     : 'Creamy, mildly spiced chicken cooked in a traditional clay handi with fresh cream and spices.',
        price    : '1,600',
        category : 'karahi',
        badge    : '🫙 Must Try',
        img      : 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&q=80'
    },
    {
        name     : 'Mutton Pulao',
        desc     : 'Slow-cooked aromatic rice with tender mutton pieces, whole spices, and caramelised onions.',
        price    : '1,800',
        category : 'rice',
        badge    : '✨ Special',
        img      : 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=80'
    },
    {
        name     : 'Paye (Trotters)',
        desc     : 'Traditional slow-cooked beef trotters in a rich, gelatinous broth — a true Punjabi breakfast.',
        price    : '900',
        category : 'desi',
        badge    : '🌅 Breakfast',
        img      : 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80'
    },
    {
        name     : 'Chicken Tikka',
        desc     : 'Juicy chicken marinated in yogurt and spices, skewered and cooked in a charcoal tandoor.',
        price    : '1,200',
        category : 'bbq',
        badge    : '🔥 Grilled',
        img      : 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&q=80'
    }
];

/* ================================================
   CART COUNTER
   ================================================ */
let cartCount = 0;

function updateCartBadge() {
    document.querySelector('.cart-badge').textContent = cartCount;
}

/* ================================================
   RENDER DISHES
   ================================================ */
function renderDishes(filter = 'all') {
    const grid     = document.getElementById('dishesGrid');
    const filtered = filter === 'all'
        ? dishes
        : dishes.filter(d => d.category === filter);

    /* Fade-out transition */
    grid.style.opacity   = '0';
    grid.style.transform = 'translateY(20px)';

    setTimeout(() => {
        grid.innerHTML = filtered.map((d, i) => `
            <div class="dish-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
                <div class="dish-img-wrap">
                    <img src="${d.img}" alt="${d.name}" loading="lazy">
                    <span class="dish-badge">${d.badge}</span>
                </div>
                <div class="dish-info">
                    <div class="dish-name">${d.name}</div>
                    <div class="dish-desc">${d.desc}</div>
                    <div class="dish-footer">
                        <div class="dish-price">PKR ${d.price} <span>/serving</span></div>
                        <button
                            class="add-btn"
                            onclick="orderDish('${d.name}', 'PKR ${d.price}')"
                            title="Order via WhatsApp"
                            aria-label="Order ${d.name}">
                            <i class="fas fa-shopping-cart" style="font-size:14px;"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        /* Fade-in */
        grid.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        grid.style.opacity    = '1';
        grid.style.transform  = 'translateY(0)';

        AOS.refresh();
    }, 250);
}

/* ================================================
   FILTER DISHES
   ================================================ */
function filterDishes(cat, btn) {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
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
        `I want to order from *Rana Da Dera*:\n\n` +
        `🥘 Dish: *${name}*\n` +
        `💰 Price: *${price}*\n\n` +
        `Please confirm my order. Thank you!`
    );

    window.open(`https://wa.me/923014431520?text=${msg}`, '_blank');
}

/* ================================================
   GALLERY LIGHTBOX
   ================================================ */
function openLightbox(el) {
    const src = el.querySelector('img').src;
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

/* Close lightbox on backdrop click */
document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this || e.target === document.querySelector('.lightbox-close')) {
        closeLightbox();
    }
});

/* Close lightbox with Escape key */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

/* ================================================
   RESERVATION FORM → WHATSAPP
   ================================================ */
function sendReservation() {
    const name     = document.getElementById('resName').value.trim();
    const phone    = document.getElementById('resPhone').value.trim();
    const date     = document.getElementById('resDate').value;
    const time     = document.getElementById('resTime').value;
    const guests   = document.getElementById('resGuests').value;
    const occasion = document.getElementById('resOccasion').value;
    const message  = document.getElementById('resMessage').value.trim();

    /* Basic validation */
    if (!name || !phone || !date || !time) {
        alert('⚠️ Please fill in all required fields:\nName, Phone, Date & Time');
        return;
    }

    /* Format date nicely */
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
    const email = document.getElementById('nlEmail').value.trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
        alert('⚠️ Please enter a valid email address!');
        return;
    }

    /* Success message */
    alert(
        '🎉 Subscribed Successfully!\n\n' +
        'You\'ll now receive exclusive offers & updates from Rana Da Dera. Shukriya!'
    );

    document.getElementById('nlEmail').value = '';
}

/* ================================================
   SET MIN DATE FOR RESERVATION (today)
   ================================================ */
(function setMinDate() {
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
})();

/* ================================================
   INIT ON DOM READY
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
    renderDishes(); /* Render all dishes on page load */
});
