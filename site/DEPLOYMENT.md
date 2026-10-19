# Apex Plumbing CT - Vercel Deployment Guide

## Prerequisites
- Vercel account (free tier works fine)
- GitHub/GitLab/Bitbucket repository (or deploy directly from local)

## Quick Deploy

### Option 1: Deploy via Vercel CLI (Fastest)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Navigate to the site directory:
```bash
cd site
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time)
   - Project name? `apex-plumbing-ct`
   - Directory? `./` (current directory)
   - Override settings? **N**

5. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [vercel.com](https://vercel.com)

3. Click "Add New Project"

4. Import your repository

5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `site`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm ci` (auto-detected)

6. Add Environment Variables (Optional):
   - `VITE_SITE_URL` - Your production domain (e.g., `https://apexplumbing.co.za`)

7. Click "Deploy"

## Environment Variables

The site works without any environment variables, but you can set:

### `VITE_SITE_URL` (Optional)
- Production URL for SEO and social sharing
- Format: `https://yourdomain.com` (no trailing slash)
- If not set, Vercel's auto-generated URL will be used
- Used for:
  - Canonical URLs
  - Open Graph tags
  - Sitemap.xml
  - Robots.txt

**To add in Vercel Dashboard:**
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add `VITE_SITE_URL` = `https://apexplumbing.co.za`
4. Redeploy

## Custom Domain Setup

1. In Vercel Dashboard, go to Project Settings → Domains

2. Add your domain (e.g., `apexplumbing.co.za`)

3. Follow Vercel's DNS configuration instructions:
   - **A Record:** Point to Vercel's IP: `76.76.21.21`
   - **CNAME:** Point to your Vercel domain

4. Wait for DNS propagation (can take up to 48 hours)

5. Vercel will automatically provision SSL certificate

## Post-Deployment Checklist

- ✅ Site loads correctly
- ✅ All pages accessible (Home, About, Services, Our Work, Contact)
- ✅ Images loading (logo, service images, etc.)
- ✅ Contact form works (opens WhatsApp/email)
- ✅ Mobile menu functions
- ✅ Navigation works
- ✅ Google Analytics (if configured)
- ✅ Test on mobile devices
- ✅ Check page speed with Google PageSpeed Insights
- ✅ Verify SEO with Google Search Console

## Performance Optimization

The site is already optimized with:
- ✅ Code splitting (React lazy loading)
- ✅ Image optimization (WebP format)
- ✅ Font subsetting (only needed characters)
- ✅ CSS optimization (Tailwind purge)
- ✅ Aggressive caching headers
- ✅ Preloading critical assets
- ✅ Lazy loading images

## Monitoring

### Analytics Setup (Optional)

Add Google Analytics:
1. Get your GA4 measurement ID
2. Add to `index.html` in the `<head>` section
3. Redeploy

### Performance Monitoring

- Use Vercel Analytics (automatic with Pro plan)
- Google PageSpeed Insights
- Lighthouse in Chrome DevTools

## Troubleshooting

### Build Fails
- Check the Vercel build logs
- Run `npm run build` locally to reproduce
- Ensure all dependencies are in `package.json`

### 404 Errors on Routes
- Verify `vercel.json` rewrites are correct
- Clear browser cache
- Check Vercel deployment logs

### Images Not Loading
- Check image paths (should be `/images/...`)
- Verify images exist in `public/images/`
- Check browser console for errors

### Fonts Not Loading
- Fonts are in `public/fonts/`
- Preloaded in `index.html`
- Check browser console for CORS issues

## Rollback

If deployment has issues:
1. Go to Vercel Dashboard
2. Navigate to Deployments
3. Find a working previous deployment
4. Click "..." menu → "Promote to Production"

## Support

- Vercel Documentation: https://vercel.com/docs
- Vite Documentation: https://vitejs.dev/
- React Documentation: https://react.dev/

## Build Output

A successful build produces:
- `dist/` folder with optimized static files
- Asset files with cache-busting hashes
- Compressed (gzip) JavaScript and CSS
- robots.txt and sitemap.xml

Total bundle size: ~92 KB (gzipped)

## Security Headers

Already configured in `vercel.json`:
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ Long-term caching for assets
- ✅ SSL/TLS (automatic with Vercel)
