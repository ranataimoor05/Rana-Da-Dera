# Changelog — Rana Da Dera Frontend

All notable changes to the Rana Da Dera restaurant web frontend are documented in this file.

---

## [1.0.0] — 2026-10-21

### Complete Frontend Modernization & Migration
- **Architectural Overhaul**:
  - Migrated legacy static HTML (`index.html`, `menu.html`, `script.js`, `styles.css`) to a modern React 18 + Vite 5 + TypeScript single-page application.
  - Backed up all genuine legacy source assets in `legacy_backup/`.
  - Preserved all 18 authentic dishes, categories, and verified prices (e.g. Mutton Karahi Rs. 2,200, Chicken Handi Rs. 1,600).
  - Preserved authentic restaurant location (Naseerabad, Rawalpindi) and phone number (`0301-4431520`).

### Visual Identity & Design System
- Implemented "Midnight Dera" luxury dark theme (`#0A2417` forest green with `#F1C74B` gold accents) and "Royal Day" luxury light theme with instant switching.
- Introduced selective glassmorphism, gold gradients, and typography pairings (Playfair Display + Plus Jakarta Sans + Noto Nastaliq Urdu).
- Implemented signature **Floating Capsule Navigation** (fixed side capsule on desktop, compact expandable bottom bar on mobile).

### Bilingual English & Urdu (RTL)
- Full bidirectional support with complete English and Urdu translations.
- Instant language toggle updating `dir="rtl"` / `dir="ltr"` and fonts dynamically.
- Culturally accurate Urdu translations for dishes, descriptions, policies, and checkout notices.

### E-Commerce & Ordering Features
- **Interactive Cart Drawer**: Real-time pricing, add-ons calculation, coupon code application (`DERA10`, `FIRSTORDER`, `FREEGHEE`), and progress bar toward free delivery.
- **Dish Customization Modal**: Selection of portion sizes (Half/Full), spice level (Mild/Medium/Spicy), and optional sides (Raita, Salad, Roghani Naan).
- **Checkout Engine**:
  - Fulfillment switcher: Home Delivery vs. Self-Pickup.
  - Live Delivery Zone Fee Checker across 8 Rawalpindi/Islamabad sectors.
  - Delivery scheduling (Now vs. Later time slots).
  - Multiple payment adapters: Cash on Delivery (COD), JazzCash, Easypaisa, Credit/Debit Card.
  - **Mandatory No-Refund Policy** disclosure and acknowledgment checkbox before placing orders.
- **Order Tracking**: Visual stage timeline (`received` → `preparing` → `on_the_way` → `delivered`) with demo stage simulator.

### Table Reservations & Customer Experience
- Table reservation system with guest count, indoor/outdoor courtyard selection, smoking preference, and special occasion notes.
- Customer Dashboard with 4 tabs: Overview, Orders History, Reservations, and Saved Addresses.
- Wishlist, Offers & Loyalty Points tracker, and verified Customer Reviews feed.
- Support Hub with FAQ accordion, WhatsApp link, and interactive customer support chat simulator.

### Back-Office Staff & Admin Portal
- Admin Dashboard (`/admin`) with revenue metrics, live order queue, and status management.
- Menu management with instant availability toggle (In Stock / Sold Out).
- Reservations approval and decline workflow.
- Coupon creator and delivery zone fee editor.
- Demo staff role simulator (Admin / Manager / Cashier / Kitchen Staff).

### Automated Testing & Documentation
- Comprehensive Vitest automated test suite (15 unit and integration tests passing).
- Complete 21-document technical documentation suite covering architecture, APIs, data models, a11y, and deployment.
