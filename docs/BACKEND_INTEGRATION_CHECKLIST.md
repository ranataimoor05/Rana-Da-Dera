# Backend Integration Checklist — Rana Da Dera

This checklist outlines the specific steps required to transition the frontend from mock services to a live production backend.

---

## Phase 1: Environment & API Endpoints

- [ ] Set `VITE_ENABLE_MOCKS=false` in `.env.production`.
- [ ] Set `VITE_API_BASE_URL=https://api.ranadadera.pk/v1`.
- [ ] Configure CORS on the backend to allow requests from `https://ranadadera.pk`.

---

## Phase 2: Authentication & Sessions

- [ ] Implement `POST /api/auth/login` returning `{ token, user }`.
- [ ] Implement `POST /api/auth/register` with mobile phone verification (OTP via SMS).
- [ ] Implement `POST /api/auth/forgot-password`.
- [ ] Store JWT in secure `HttpOnly`, `SameSite=Strict` cookies or client auth headers.
- [ ] Implement token refresh mechanism via interceptors.

---

## Phase 3: Menu & Inventory

- [ ] Replace `mockMenu.ts` with `GET /api/menu/dishes` and `GET /api/menu/categories`.
- [ ] Implement real-time dish availability toggle (`PATCH /api/admin/dishes/:id/status`).
- [ ] Integrate image uploading to Cloudinary / AWS S3 for dish photography.

---

## Phase 4: Orders & Payments

- [ ] Implement `POST /api/orders` to persist checkout orders with server-side price validation.
- [ ] Implement JazzCash HTTP POST redirect / server-to-server callback IPN.
- [ ] Implement Easypaisa Direct API integration.
- [ ] Add idempotency keys to order submission to prevent double billing.

---

## Phase 5: Kitchen & Live Tracking

- [ ] Set up WebSocket or Socket.io gateway for real-time kitchen order updates.
- [ ] Emit `order:status_updated` events to trigger timeline transitions in `OrderTrackingPage`.
- [ ] Connect rider GPS tracking coordinates for map visualization.

---

## Phase 6: Table Reservations

- [ ] Implement `POST /api/reservations` with capacity limits per timeslot.
- [ ] Implement SMS / WhatsApp booking confirmation to customer.
- [ ] Implement Admin auto-approval or manual approval workflow.
