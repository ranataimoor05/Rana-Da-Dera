# Rana Da Dera — Complete Restaurant Web Frontend

> **Authentic Punjabi Fine Dining & Charcoal Barbecue**  
> Naseerabad, Rawalpindi, Pakistan • Phone: `0301-4431520`

A production-grade, modern React 18 + Vite 5 + TypeScript single-page application (SPA) featuring bilingual English/Urdu (with RTL layout), online food ordering, table reservations, live delivery fee verification across Rawalpindi & Islamabad, and an administrative staff portal.

---

## 🌟 Highlights

- **Bilingual English & Urdu**: Full RTL (Right-to-Left) typography and layout switching powered by `Noto Nastaliq Urdu`.
- **Authentic Legacy Preservation**: All 18 authentic dishes, categories, and verified prices preserved in exact PKR formatting (`Rs. 1,250`).
- **Luxury Design System**: Forest green (`#0A2417`) and gold (`#F1C74B`) luxury branding with "Midnight Dera" (dark) and "Royal Day" (light) themes.
- **Floating Capsule Navigation**: Distinctive desktop side capsule and mobile bottom bar.
- **Ordering & Checkout**: Interactive Cart Drawer, dish customization modal (portion size, spice level, add-ons), delivery scheduling, coupon engine (`DERA10`, `FIRSTORDER`, `FREEGHEE`), and mandatory No-Refund Policy disclosure.
- **Live Order Tracking**: Visual 4-stage tracking timeline with demo simulator.
- **Table Reservations**: Indoor/outdoor courtyard selection, guest count, and occasion handling.
- **Admin & Staff Back-Office**: Live orders queue, menu availability toggling, reservations management, delivery zones, coupons, and role switching.
- **Quality Assured**: 15 Vitest automated test suites passing; 0 TypeScript errors.
- **Comprehensive Documentation**: 21 technical guides in `docs/`.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js v18 or higher (v20 LTS recommended).
- npm, pnpm, or yarn.

*If using portable Node.js on Windows:*
```powershell
$env:Path = "$env:LOCALAPPDATA\nodejs;$env:Path"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Automated Tests
```bash
npm run test
```

### 5. Build for Production
```bash
npm run build
```
Optimized static bundle is emitted to `dist/`.

---

## 📂 Project Structure

```
Rana Da Dera/
├── public/                 # Static assets and original restaurant photos
├── src/
│   ├── app/                # Root App & Router configuration
│   ├── components/         # Reusable UI (Capsule Nav, Cart Drawer, Modals, Footer)
│   ├── context/            # React Context providers (Auth, Cart, Order, Theme, i18n)
│   ├── i18n/               # EN/UR translations & RTL handler
│   ├── mocks/              # Typed mock database (dishes, zones, coupons)
│   ├── pages/              # 28 Customer and Admin views
│   ├── styles/             # Design tokens and global CSS
│   ├── types/              # TypeScript domain models
│   └── utils/              # Pure currency and storage helpers
├── tests/                  # Vitest automated test suite
├── docs/                   # 21 architectural and operational documents
└── dist/                   # Production-ready minified build
```

---

## 📖 Documentation Suite

All technical documentation is located in the [`docs/`](file:///c:/Users/MIS/Desktop/My%20Projects/My%20Frontend%20Deigns/Rana%20Da%20Dera/docs) folder:
- [PRD.md](file:///c:/Users/MIS/Desktop/My%20Projects/My%20Frontend%20Deigns/Rana%20Da%20Dera/docs/PRD.md) — Product Requirements Document
- [ARCHITECTURE.md](file:///c:/Users/MIS/Desktop/My%20Projects/My%20Frontend%20Deigns/Rana%20Da%20Dera/docs/ARCHITECTURE.md) — System Architecture & Component Hierarchy
- [DEV_SETUP.md](file:///c:/Users/MIS/Desktop/My%20Projects/My%20Frontend%20Deigns/Rana%20Da%20Dera/docs/DEV_SETUP.md) — Local Development & Environment Setup
- [DEPLOYMENT_GUIDE.md](file:///c:/Users/MIS/Desktop/My%20Projects/My%20Frontend%20Deigns/Rana%20Da%20Dera/docs/DEPLOYMENT_GUIDE.md) — Hosting (Vercel, Netlify, cPanel, Nginx)
- [MENU_CATALOG.md](file:///c:/Users/MIS/Desktop/My%20Projects/My%20Frontend%20Deigns/Rana%20Da%20Dera/docs/MENU_CATALOG.md) — Complete 18-Dish Verified Catalog
- [DELIVERY_ZONES.md](file:///c:/Users/MIS/Desktop/My%20Projects/My%20Frontend%20Deigns/Rana%20Da%20Dera/docs/DELIVERY_ZONES.md) — Rawalpindi/Islamabad Delivery Zones
- [BACKEND_INTEGRATION_CHECKLIST.md](file:///c:/Users/MIS/Desktop/My%20Projects/My%20Frontend%20Deigns/Rana%20Da%20Dera/docs/BACKEND_INTEGRATION_CHECKLIST.md) — Production API Readiness
- [HANDOVER_SUMMARY.md](file:///c:/Users/MIS/Desktop/My%20Projects/My%20Frontend%20Deigns/Rana%20Da%20Dera/docs/HANDOVER_SUMMARY.md) — Executive Handover Document

---

## 🔒 Security & Policies

- **Price Presentation**: Exact Pakistani rupee display `Rs. 1,250`. Backend must re-verify subtotal and pricing before settlement.
- **No-Refund Policy**: Explicitly disclosed and acknowledged before order submission on `/checkout` and detailed on `/policies/no-refund`.
- **Demo State Management**: All data stored under localStorage key `rdd_v1_*`. Can be reset at any time via Admin Settings.
