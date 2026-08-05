# Next.js Trailing Slash & .htaccess Infinite Loop Fix Guide

## 🚨 Problem Overview
When deploying a Next.js Static Export (`output: 'export'`) on Apache web servers (e.g. Hostinger, cPanel), you often get an **Infinite 301 Redirect Loop (`ERR_TOO_MANY_REDIRECTS`)**.

### Why does this happen?
1. **Apache `mod_dir` Default Behavior**: When a request comes for `/about-us`, Apache checks if a folder named `about-us` exists. If it does, Apache's `mod_dir` automatically issues a `301 Redirect` to `/about-us/` (adding a trailing slash).
2. **`.htaccess` or Next.js Strip Rule**: If you have a rule stripping trailing slashes (e.g. redirecting `/about-us/` to `/about-us`), Apache and `.htaccess` get stuck in a ping-pong match:
   - Request `/about-us` ➔ Apache redirects to `/about-us/` (301)
   - Request `/about-us/` ➔ `.htaccess` redirects to `/about-us` (301)
   - **Result**: `ERR_TOO_MANY_REDIRECTS`

---

## 🛠️ Complete Solution

### 1️⃣ Update `next.config.mjs` / `next.config.js`
Ensure `trailingSlash` is set to `false`.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false, // Force Next.js to generate routes without trailing slashes
  // ... other configs
};

export default nextConfig;
```

---

### 2️⃣ Update `.htaccess` (placed in `public/.htaccess`)
Add the following rules to your `.htaccess` file. The **`DirectorySlash Off`** directive is the critical fix that disables Apache's automatic folder trailing slash redirects.

```apache
# ================================================================
# TRAILING SLASH STRIPPING & STATIC FILE RESOLUTION (NO PING-PONG LOOP)
# ================================================================

# 1. CRITICAL: Disable Apache mod_dir automatic directory trailing slash redirection
DirectorySlash Off

<IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /

     # 2. HTTP to HTTPS (Cloudflare & Hostinger SSL Proxy safe)
     RewriteCond %{HTTP:X-Forwarded-Proto} !https
     RewriteCond %{HTTPS} off
     RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

     # 3. Serve static real files directly (CSS, JS, images)
     RewriteCond %{REQUEST_FILENAME} -f
     RewriteRule ^ - [L]

     # 4. Redirect URL with trailing slash (/about-us/) to clean URL (/about-us) ONLY if target .html exists
     RewriteCond %{REQUEST_FILENAME} -d
     RewriteCond %{REQUEST_FILENAME}/index.html -f
     RewriteRule ^(.+)/$ /$1 [R=301,L]

     RewriteCond %{REQUEST_FILENAME}.html -f
     RewriteRule ^(.+)/$ /$1 [R=301,L]

     # 5. Serve root /
     RewriteRule ^$? /index.html [L]

     # 6. Serve static .html files internally for clean URLs (e.g. /about-us -> serves about-us.html)
     RewriteCond %{REQUEST_FILENAME}.html -f
     RewriteRule ^(.+)$ /$1.html [L]

     # 7. Serve subfolder index.html (e.g. /blog -> serves /blog/index.html)
     RewriteCond %{REQUEST_FILENAME} -d
     RewriteCond %{REQUEST_FILENAME}/index.html -f
     RewriteRule ^(.+)$ /$1/index.html [L]

     # 8. Fallback non-existent requests to custom 404 page
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule ^ /404.html [L]
</IfModule>
```

---

## 📋 Action Plan for applying in another project

When fixing in the new project:
1. Set `trailingSlash: false` in `next.config.js` / `next.config.mjs`.
2. Add `DirectorySlash Off` and the exact `mod_rewrite` block above into `public/.htaccess`.
3. Rebuild Next.js (`npm run build`).
4. Upload contents of `out/` (including `out/.htaccess`) to your server.
