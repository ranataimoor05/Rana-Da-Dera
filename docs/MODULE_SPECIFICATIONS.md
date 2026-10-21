# Module Specifications — Rana Da Dera

## 1. Floating Capsule Navigation
- **Desktop**: Fixed side capsule positioned at 50% vertical height. Compact icon-first presentation expanding to 200px on hover or focus.
- **Mobile / Tablet**: Floating bottom capsule bar offering quick one-tap access to Home, Menu, Reservations, Offers, and Dashboard.
- **Top Header Bar**: Houses the Rana Da Dera royal crest, live Kitchen Status pill (2AM–3PM), language toggle (EN/UR), theme switcher (Day/Night), staff portal shortcut, user account, and cart drawer trigger with counter badge.

## 2. Menu Catalog & Customizer
- **Dishes Catalog**: Displays 18 genuine Punjabi dishes with high-res photography, prices, portion sizes, ingredients, spice indicators, and dietary metadata.
- **Customization Modal**:
  - Required portion size selection (e.g. Half KG vs. Full KG).
  - Spice preparation preference (Mild, Regular Dera Masala, Spicy).
  - Add-ons and extras (Extra Desi Ghee Tarka, Julienne Ginger, Bone Marrow Nali, Maghaz).
  - Special instructions free text (up to 200 chars).
  - Live unit price and total price updates.

## 3. Cart & Checkout Engine
- **Slide-out Drawer**: Accessible right-side slide-out drawer (left-side in RTL mode).
- **Voucher Validation**: Supports percentage (`DERA10`) and flat (`FIRSTORDER`, `FREEGHEE`) discounts with minimum spend constraints.
- **Fulfillment Modes**:
  - Home Delivery: Address line, zone selection, city, landmark, rider notes.
  - Takeaway Pickup: Shows Naseerabad kitchen counter address and 20-30 minute prep notice.
- **Timing Selection**: ASAP vs. Scheduled date and time within the configured scheduling window (default 24h).
- **Payment Adapters**: Cash on Delivery, JazzCash, Easypaisa, Debit/Credit Card. Includes payment failure simulation and retry recovery.
- **Policy Enforcement**: Explicit acknowledgment of the mandatory No-Refund Policy prior to order confirmation.

## 4. Administrative Operations Suite
- **Orders Manager**: Filter orders by stage, inspect items, customizations, and special requests, and advance statuses through the kitchen pipeline.
- **Inventory & Availability**: Mark dishes sold out or in-stock in real-time.
- **Reservations**: Review booking details, guest counts, and occasions, and approve or decline reservations.
- **Settings**: Modify kitchen opening and closing hours, global minimum order thresholds, and scheduling advance limits.
