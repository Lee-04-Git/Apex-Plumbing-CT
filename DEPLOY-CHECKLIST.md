# 🚀 Apex Plumbing CT - Pre-Deployment Checklist

## ✅ Code Ready for Production

- [x] **Build successful** - `npm run build` completes without errors
- [x] **TypeScript errors resolved** - No compilation errors
- [x] **All imports used** - No unused imports
- [x] **Images optimized** - WebP format, appropriate sizes
- [x] **Logo updated** - Apex Plumbing logo in navbar, footer, favicon
- [x] **Contact details updated** - Phone, email, address all correct
- [x] **Services list complete** - All 15 services listed
- [x] **Testimonials added** - Real Google reviews included
- [x] **Business name updated** - Changed from H2O to Apex Plumbing CT throughout

## ✅ Configuration Files

- [x] `vercel.json` - Configured with rewrites and headers
- [x] `vite.config.ts` - SEO files plugin configured
- [x] `.vercelignore` - Created
- [x] `.gitignore` - Properly configured
- [x] `package.json` - All dependencies listed

## 📋 Deployment Steps

### Quick Deploy (Recommended)

```bash
# 1. Navigate to site directory
cd site

# 2. Install Vercel CLI (if not already installed)
npm install -g vercel

# 3. Deploy to Vercel
vercel

# 4. For production deployment
vercel --prod
```

### Or Deploy via GitHub

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Vercel auto-detects settings
4. Click Deploy

## 🔍 Post-Deployment Testing

After deployment, test these:

### Critical Pages
- [ ] Home page loads
- [ ] About page loads
- [ ] Services page loads
- [ ] Our Work page loads
- [ ] Contact page loads

### Functionality
- [ ] Navigation works (desktop & mobile)
- [ ] Mobile menu opens/closes
- [ ] Logo displays correctly
- [ ] All images load
- [ ] WhatsApp button works
- [ ] Contact form (email/WhatsApp) works
- [ ] Service cards link correctly
- [ ] Footer links work

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Images load progressively
- [ ] Smooth animations
- [ ] No console errors

### SEO
- [ ] Meta titles display correctly
- [ ] Meta descriptions present
- [ ] Open Graph tags working
- [ ] Sitemap.xml accessible
- [ ] Robots.txt accessible

## 🌐 Custom Domain Setup

After deployment:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `apexplumbing.co.za` or `www.apexplumbing.co.za`
3. Configure DNS:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 48 hours)
5. SSL certificate auto-provisions

## 📊 Optional Enhancements

### Add Google Analytics
1. Get GA4 Measurement ID
2. Add tracking code to `index.html`
3. Redeploy

### Set Production URL
1. In Vercel: Settings → Environment Variables
2. Add: `VITE_SITE_URL` = `https://apexplumbing.co.za`
3. Redeploy

### Submit to Search Engines
- Submit sitemap to Google Search Console
- Submit sitemap to Bing Webmaster Tools
- Create Google My Business listing

## 📱 Contact Information (Verify Before Deploy)

- **Business Name:** Apex Plumbing CT
- **Owner:** Damien
- **Phone:** +27 71 793 3414
- **Email:** apexplumbingct@gmail.com
- **Address:** 8 Kings Road, Cape Town, 8005
- **Instagram:** @apexplumbing.ct
- **Facebook:** Apex-Plumbing-CT-100095090899342

## 🎉 Ready to Deploy!

Your project is ready for Vercel deployment. All updates have been applied:

✅ Business rebranded to Apex Plumbing CT  
✅ Logo updated throughout  
✅ 15 services listed  
✅ 14 Google reviews added  
✅ Contact details updated  
✅ New professional slogan  
✅ Build successful  
✅ Optimized for production  

**Run `vercel` from the `/site` directory to deploy!**
