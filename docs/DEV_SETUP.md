# Local Development & Setup Guide — Rana Da Dera

This document details prerequisites, environment setup, and steps to run, test, and build the **Rana Da Dera** frontend application.

---

## 1. Prerequisites

- **Node.js**: v18.0.0 or higher (v20 LTS recommended).
- **Package Manager**: `npm` (v9 or v10) or `yarn` / `pnpm`.
- **Operating System**: Windows, macOS, or Linux.

*Note for Portable Windows Environment:*
If Node.js is located in `%LOCALAPPDATA%\nodejs`, prepend it to your PowerShell session path:
```powershell
$env:Path = "$env:LOCALAPPDATA\nodejs;$env:Path"
```

---

## 2. Quickstart Commands

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
By default, the Vite server starts on `http://localhost:3000` (or `http://localhost:5173` if configured as default). Vite provides instantaneous Hot Module Replacement (HMR).

### Step 3: Run Automated Test Suite
```bash
npm run test
```
Runs the Vitest test suite checking currency formatters, pricing algorithms, delivery zones, order scheduling, and i18n logic.

### Step 4: Run Static Type Checking & Production Build
```bash
npm run build
```
Executes `tsc` (TypeScript compiler) followed by `vite build`. Outputs minified, tree-shaken static assets to the `/dist` directory.

### Step 5: Preview Production Build Locally
```bash
npm run preview
```
Spins up a lightweight local server serving the optimized files from `/dist`.

---

## 3. Directory Structure Overview

```
Rana Da Dera/
├── public/                 # Static public assets (images, favicon, manifest)
│   └── images/             # Authentic restaurant food photography & badges
├── src/
│   ├── app/                # Root Application component & Router config
│   ├── components/         # Shared presentation & navigation components
│   │   ├── cart/           # CartDrawer, CartSummary
│   │   ├── footer/         # Footer with contact & policy links
│   │   ├── menu/           # DishCard, DishCustomizerModal
│   │   └── navigation/     # FloatingCapsuleNav (Desktop & Mobile)
│   ├── context/            # Global React Context providers (Auth, Cart, Order, etc.)
│   ├── i18n/               # Translation dictionaries (EN / UR) & RTL context
│   ├── mocks/              # Strongly-typed mock database (dishes, zones, coupons)
│   ├── pages/              # Customer-facing & Admin route views
│   │   └── admin/          # Admin back-office views
│   ├── styles/             # Design tokens & global CSS styles
│   ├── types/              # Domain TypeScript interfaces & types
│   ├── utils/              # Pure utility functions (currency, storage)
│   └── main.tsx            # Application entrypoint
├── tests/                  # Automated Vitest unit & integration test suites
├── docs/                   # Architectural & technical documentation suite
└── package.json            # Scripts & project metadata
```

---

## 4. Useful Environment Variables

Copy `.env.example` to `.env` if custom endpoints or keys are needed in the future:
```env
VITE_APP_TITLE="Rana Da Dera — Authentic Punjabi Fine Dining"
VITE_ENABLE_MOCKS=true
VITE_RESTAURANT_PHONE="0301-4431520"
```
