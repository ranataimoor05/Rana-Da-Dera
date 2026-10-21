# Frontend Security Notes — Rana Da Dera

This document describes client-side security measures implemented in the Rana Da Dera frontend application and operational guidelines for backend handoff.

---

## 1. Client-Side Sanitization & XSS Prevention

- **React Virtual DOM**: React automatically escapes strings before rendering, protecting against classic innerHTML script injection attacks.
- **Form Input Validation**: All forms (Checkout, Reservation, Support Chat, Login, Profile) enforce strict input types, length limits, and character constraints before submission.
- **Controlled Components**: Every input is controlled through React state, preventing DOM pollution.

---

## 2. Token & Credential Storage

- Current mock authentication stores tokens in scoped `localStorage` (`rdd_v1_auth_token`).
- **Production Recommendation**: When integrating the real API, transition session tokens to `HttpOnly`, `Secure`, `SameSite=Strict` cookies. This prevents malicious scripts from accessing session credentials.

---

## 3. Financial & Price Tampering Protection

- **Client Presentation Only**: Prices displayed on the frontend (`Rs. 2,200`, etc.) are for user interface clarity.
- **Rule of Backend Truth**: During backend integration, the server **MUST** recalculate the subtotal, taxes, delivery fees, and discount codes independently using stored dish prices. Never trust subtotal or item price fields sent directly from client payloads.

---

## 4. Content Security Policy (CSP) Directives

When deploying to production, configure the web server to emit the following CSP headers:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.ranadadera.pk;
```

---

## 5. Privacy & Cookie Compliance

- The application features a dedicated **Cookie Preferences** modal and policy page (`/privacy/cookies`).
- Users can toggle functional, analytics, and marketing cookies.
- No third-party trackers are executed without explicit user consent.
