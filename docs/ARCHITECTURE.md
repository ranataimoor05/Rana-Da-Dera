# Software Architecture & Engineering Standards — Rana Da Dera

## 1. Directory Structure Overview
```
Rana Da Dera/
├── dist/                     # Optimized production bundle
├── docs/                     # 24 standard handover documentation files
├── images/                   # Original restaurant assets
├── public/                   # Static assets & public image directory
├── src/
│   ├── app/
│   │   └── App.tsx           # Global routing setup & Context providers
│   ├── components/
│   │   ├── cart/             # Slide-out CartDrawer & pricing controls
│   │   ├── footer/           # Verified contact details, hours, policy links
│   │   ├── menu/             # DishCard, DishCustomizerModal
│   │   └── navigation/       # FloatingCapsuleNav (side desktop & mobile bottom)
│   ├── context/              # Modular React Context state providers
│   ├── i18n/                 # English & Urdu translations dictionary & context
│   ├── mocks/                # Authentic menu data, zones, coupons, reviews
│   ├── pages/                # Public & Customer-facing route components
│   │   └── admin/            # Administrative suite nested components
│   ├── styles/               # Design tokens, global CSS, theme styles
│   ├── types/                # Domain models (menu, order, reservation, auth)
│   ├── utils/                # Currency formatter (Rs. 1,250), storage abstraction
│   └── main.tsx              # Application entrypoint
├── tests/                    # Vitest automated test suite
├── index.html                # Vite root HTML template
├── package.json              # Dependencies and lifecycle scripts
├── tsconfig.json             # TypeScript compiler configuration
└── vite.config.ts            # Vite bundler configuration
```

## 2. Separation of Concerns & Clean Boundaries
- **UI Components** consume domain models through typed hooks (`useCart`, `useOrders`, `useRestaurant`, `useI18n`).
- **Repository / Service Abstraction**: Components do not depend on raw hardcoded arrays. Mock repositories (`mockMenu.ts`, `mockSettings.ts`) provide typed records that are replaceable by REST or GraphQL APIs in future backend phases.
- **Frontend-Backend Authorization Boundary**: The frontend provides demo role switching (`customer`, `owner_admin`, `manager`, `staff`) for UI evaluation; real production authorization must be verified by backend session JWTs.
- **Authoritative Calculations**: While the client performs instant calculations for user feedback, production order totals, payment confirmations, and discounts must be verified authoritatively on the backend.
