# Known Limitations & Demo Mode Specifications — Rana Da Dera

This document details the boundaries between client-side simulation and production backend capabilities in the current frontend release.

---

## 1. Demo Mode vs. Production Backend

Because this is a frontend-first architecture, server-dependent actions are simulated using strongly-typed services and browser storage (`localStorage` with prefix `rdd_v1_`).

### 1.1 Authentication
- **Current Behavior**: Simulated login, registration, and role switching (Admin / Staff / Customer). Passwords are not hashed or sent across the network.
- **Production Requirement**: Connect to an OAuth2 / JWT backend (Node.js/Express, Django, or Firebase Auth) with secure HTTP-only cookies and bcrypt password hashing.

### 1.2 Payments
- **Current Behavior**: JazzCash, Easypaisa, and Credit/Debit Card payments are simulated with instant authorization or test failure simulation.
- **Production Requirement**: Real integration with JazzCash Merchant API, Easypaisa Open API, PayFast, or Stripe Checkout.

### 1.3 Order Dispatch & Live GPS Tracking
- **Current Behavior**: Order stages (`received` → `preparing` → `on_the_way` → `delivered`) are advanced via a simulated stage progressor or Admin dashboard actions.
- **Production Requirement**: WebSockets or Server-Sent Events (SSE) connecting rider mobile apps and kitchen display systems (KDS).

### 1.4 SMS / WhatsApp Notifications
- **Current Behavior**: Order confirmations and OTP codes appear as on-screen toasts and formatted receipt pages.
- **Production Requirement**: Integration with Twilio or local Pakistani SMS gateways (e.g. Zong, Telenor, Brandverse) for automated order notification.

---

## 2. Browser Storage Durability

- Data stored in `localStorage` persists across page reloads on the same device and browser profile.
- Clearing browser cache or switching devices will reset cart state and mock order histories back to initial mock seeds.
- A **Reset Demo State** button is provided in the Admin Settings panel to quickly restore initial factory mocks.
