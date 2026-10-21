# UI Component Conventions & Design Standards — Rana Da Dera

## 1. Color Palette Tokens
| Token | Dark Theme (Midnight Dera) | Light Theme (Royal Day) | Usage |
| :--- | :--- | :--- | :--- |
| `--color-primary-950` | `#05140d` | `#0c2014` | Deep forest brand background |
| `--color-primary-800` | `#123d29` | `#1e6645` | Primary buttons, active tabs |
| `--color-gold-400` | `#f1c74b` | `#cca02c` | Gold highlights, borders, prices |
| `--bg-app` | `#06110a` | `#f9f8f4` | Page background |
| `--bg-surface-elevated` | `#11291b` | `#f4efe4` | Modals, drawers, cards |
| `--text-main` | `#f5f8f6` | `#0c2014` | Primary headings & body |
| `--text-muted` | `#9bb5a6` | `#3a5344` | Secondary text, descriptions |

## 2. Typography Rules
- **English Headings**: `font-family: var(--font-serif);` (`Playfair Display`, serif).
- **Body & Controls**: `font-family: var(--font-sans);` (`Plus Jakarta Sans`, sans-serif).
- **Urdu Headings & Body**: `font-family: var(--font-urdu), var(--font-sans);` (`Noto Nastaliq Urdu`, serif).
- **Line Heights**: Headings `1.25` (English) / `1.5` (Urdu). Body text `1.6`.

## 3. Glassmorphism Conventions
- Always apply both `backdrop-filter: blur(16px)` and `-webkit-backdrop-filter: blur(16px)` for Safari compatibility.
- Borders must utilize translucent gold or subtle green lines: `1px solid var(--border-glass)`.
- Cards must feature subtle hover transitions: `transform: translateY(-3px)` and increased gold shadow.

## 4. Accessibility & Focus Indicators
- Visible focus outline: `2px solid var(--color-gold-400)` with `outline-offset: 3px`.
- Minimum interactive button target size: `44px x 44px`.
- All modals and drawers must lock keyboard focus and trap interactions with `role="dialog"` and `aria-modal="true"`.
