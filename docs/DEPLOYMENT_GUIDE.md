# Deployment Guide — Rana Da Dera Frontend

This guide describes how to deploy the Rana Da Dera React + Vite single-page application (SPA) to major production environments.

---

## 1. Production Build Creation

Before deploying to any host, generate the optimized production assets:

```bash
npm run build
```

This generates the static bundle inside the `dist/` directory:
- `dist/index.html` — Entry point
- `dist/assets/*.js` — Minified code bundles
- `dist/assets/*.css` — Processed styles
- `dist/images/*` — Copied static assets

---

## 2. Deploying to Vercel

Vercel is the recommended platform for Vite applications.

### Option A: Using Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: GitHub Integration
1. Push your repository to GitHub.
2. Log into [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**.

### SPA Routing Rule (`vercel.json`)
To ensure deep links (e.g. `/menu`, `/track/ORD-1001`) route to `index.html`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 3. Deploying to Netlify

### Option A: Drag & Drop
Drag the compiled `dist/` folder into the Netlify web dashboard.

### Option B: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### SPA Routing Rule (`public/_redirects`)
Create `public/_redirects` (or in `dist/`):
```text
/*    /index.html   200
```

---

## 4. Deploying to Apache / cPanel / Shared Hosting

1. Build the project: `npm run build`.
2. Connect to your host via cPanel File Manager or FTP/SFTP.
3. Upload the contents of `dist/` into `public_html/` (or the target subfolder).
4. Add an `.htaccess` file in the root to handle client-side routing:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 5. Deploying with Nginx

Sample server block for production Nginx servers:

```nginx
server {
    listen 80;
    server_name ranadadera.pk www.ranadadera.pk;
    root /var/www/rana-da-dera/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
}
```
