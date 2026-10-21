# Testing Guide — Rana Da Dera Frontend

This document explains the test strategy, frameworks used, and coverage areas for the Rana Da Dera web application.

---

## 1. Test Framework & Setup

- **Runner**: [Vitest](https://vitest.dev/)
- **Configuration**: Configured in `vite.config.ts` with `globals: true` and `environment: 'node'`.
- **Command**:
  ```bash
  npm run test
  ```

---

## 2. Test Suites Summary

The automated test suite covers all critical business logic and domain constraints:

| Test File | Focus Area | Key Invariants Tested |
|---|---|---|
| `tests/currency.test.ts` | Currency Formatting | Strict PKR output format `Rs. 1,250`, thousands separation, edge case handling (0, negative, floating point rounding). |
| `tests/pricingAndCart.test.ts` | Cart Calculation Engine | Subtotal computation, coupon discount application (percentage vs. flat), minimum order validation, delivery fee addition, tax calculations. |
| `tests/deliveryAndScheduling.test.ts` | Logistics & Hours | Zone matching, free delivery thresholds, scheduled delivery slot generation, kitchen opening/closing detection. |
| `tests/policiesAndPayment.test.ts` | Compliance & Payments | No-refund policy mandatory acknowledgment enforcement, supported payment methods (COD, JazzCash, Easypaisa, Card), simulated payment statuses. |
| `tests/i18nAndTheme.test.ts` | Localization & Theming | English vs. Urdu translations parity, RTL text direction assignment for Urdu, dark vs. light theme tokens. |

---

## 3. Running & Extending Tests

### Running Once
```bash
npm run test
```

### Running with Watch Mode
```bash
npx vitest --watch
```

### Writing New Tests
When adding new business features (e.g. dynamic surge pricing or loyalty tier calculations), add tests under `tests/`:
```typescript
import { describe, it, expect } from 'vitest';

describe('New Feature', () => {
  it('should behave according to business requirements', () => {
    expect(true).toBe(true);
  });
});
```
