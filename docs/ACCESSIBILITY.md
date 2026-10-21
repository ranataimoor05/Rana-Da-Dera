# Accessibility (a11y) & Usability Guide — Rana Da Dera

This document details accessibility considerations, WCAG 2.1 AA compliance features, and keyboard navigation implemented in the Rana Da Dera frontend.

---

## 1. Bilingual Typography & RTL Support

- **Urdu Right-to-Left (RTL)**:
  When switching to Urdu, the root HTML `dir="rtl"` attribute is set dynamically. Layout grids, side capsules, drawer animations, and text alignment seamlessly reverse.
- **Font Stack**:
  - Urdu: `Noto Nastaliq Urdu`, `Jameel Noori Nastaleeq`, serif.
  - English Headings: `Playfair Display`, serif.
  - English Body: `Plus Jakarta Sans`, sans-serif.
- **Line Heights**: Elevated line-heights are applied for Urdu characters to avoid glyph clipping in diacritics (A'rab).

---

## 2. Color Contrast & Legibility

- **High Contrast Ratios**:
  - Gold accents on Dark Green background: `#F1C74B` on `#0A2417` yields a contrast ratio of > 8.5:1 (exceeds WCAG AAA requirement of 7:1).
  - Body text `#F3F4F6` on dark surfaces yields a contrast ratio > 12:1.
  - All form inputs maintain clear borders and focus states.
- **Focus Rings**:
  A dedicated high-visibility gold focus outline (`:focus-visible`) with offset ensures keyboard users always know which element is active.

---

## 3. Keyboard Navigation

- **Navigation Capsule**: The floating navigation items are accessible via `Tab` / `Shift+Tab`.
- **Modals & Drawers**:
  - The Cart Drawer and Dish Customization Modal can be closed using the `Escape` key.
  - Focus is trapped within active modals to prevent background interaction.
- **Form Controls**: All inputs, selects, radio buttons, and checkboxes use standard semantic HTML elements, allowing full navigation without a mouse.

---

## 4. Screen Reader Support & ARIA

- **Semantic HTML**: Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
- **Buttons vs. Links**: Actions use `<button>`, navigation destinations use `<a>` (React Router `<Link>`).
- **Interactive State**: `aria-expanded`, `aria-label`, and `aria-hidden` are applied to icons, drawers, and modal backdrops.
