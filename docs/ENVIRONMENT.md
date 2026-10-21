# Environment Configuration — Rana Da Dera

## 1. Environment Variables
The application reads configuration through Vite's `import.meta.env` system. Create a local `.env` file from `.env.example`:

```bash
cp .env.example .env
```

### Supported Variables
| Key | Default | Description |
| :--- | :--- | :--- |
| `VITE_APP_NAME` | `Rana Da Dera` | Visible brand header title |
| `VITE_RESTAURANT_BRANCH` | `Naseerabad, Rawalpindi` | Physical kitchen location |
| `VITE_CONTACT_PHONE` | `0301-4431520` | Customer support telephone |
| `VITE_WHATSAPP_NUMBER` | `923014431520` | Direct WhatsApp ordering number |
| `VITE_CURRENCY` | `PKR` | Base operating currency |
| `VITE_CURRENCY_SYMBOL` | `Rs.` | Currency presentation symbol |
| `VITE_API_BASE_URL` | `https://api.ranadadera.com/v1` | Future REST API gateway |
| `VITE_ENABLE_MOCK_SERVICES` | `true` | Toggle mock repositories |
| `VITE_DEFAULT_LOCALE` | `en` | Initial fallback locale |
| `VITE_THEME_DEFAULT` | `dark` | Initial fallback theme |

## 2. Safe Secrets Policy
- No live payment secrets, merchant private keys, or database credentials exist in client code.
- `.env` is ignored by `.gitignore`.
