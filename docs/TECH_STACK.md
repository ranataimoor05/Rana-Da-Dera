# Technology Stack — Rana Da Dera

## 1. Core Framework & Build Tooling
- **React 18.3.1**: Component-driven UI framework with hooks and functional components.
- **Vite 5.4.11**: Fast ES-module development server and production Rollup bundler.
- **TypeScript 5.6.3**: Strict static typing for domain models, state, context interfaces, and API contracts.
- **React Router DOM 6.28.0**: Client-side declarative routing with nested admin routes.

## 2. Styling & Design System
- **CSS Custom Properties (Tokens)**: Structured design tokens defined in `src/styles/tokens.css` for primary forest greens (`#0A2417`, `#123D29`), gold accents (`#F1C74B`, `#CCA02C`), dark surfaces, and day mode surfaces.
- **Glassmorphism & Backdrop Blur**: Refined translucent glass panels with accessible contrast.
- **Web Fonts**:
  - `Playfair Display`: Elegant luxury serif headings.
  - `Plus Jakarta Sans`: Clean modern body typography.
  - `Noto Nastaliq Urdu`: Authentic Urdu nastaliq script rendering for RTL mode.
- **Lucide React 0.475.0**: Scalable, accessible iconography.

## 3. State Management & Storage
- **Context API Architecture**:
  - `I18nContext`: Manages language (`en` / `ur`) and text direction (`ltr` / `rtl`).
  - `ThemeContext`: Luxury dark ("Midnight Dera") vs light ("Royal Day") mode with persistence.
  - `RestaurantContext`: Configurable opening hours, delivery zones, dish availability, and minimum order rules.
  - `CartContext`: Cart items, quantity controls, customization signatures, coupons, and pricing breakdown.
  - `OrderContext`: Submitted orders, tracking timeline, reservations, and payment recovery.
  - `AuthContext`: Patron profiles, addresses, loyalty points, and role simulation.
  - `WishlistContext`: Favorited dishes list.
- **Storage Abstraction**: `src/utils/storage.ts` provides a versioned, error-safe wrapper around `localStorage` with prefix `rdd_v1_`.

## 4. Testing & Quality Assurance
- **Vitest 2.1.5**: Fast unit and integration test runner for business rules, pricing, currency formatting, and policies.
