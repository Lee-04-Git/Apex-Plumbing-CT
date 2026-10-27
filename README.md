# Apex Plumbing CT: website concept

A website concept for **Apex Plumbing CT**, a plumbing business in Sea Point, Cape Town. It was built independently as a proposal for the owner (Damien). It is **not** the official site and the owner has not yet approved it.

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react

```bash
npm install
npm run dev       # local preview at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build
npm run images    # regenerate optimised images from assets/source/
```

## Editing content

All business details live in **`src/config/site.ts`**: phone, WhatsApp, Facebook, location, service area, hours, services, reviews and photo credits. Components read from this file, so most updates don't touch any component code.

| To change… | Edit |
| --- | --- |
| Phone / WhatsApp number | `site.phone`, `site.whatsapp` |
| Service area, street address | `site.serviceArea`, `site.location` (`showStreetAddress`) |
| Business hours | `site.hours` (hidden while `null`) |
| Services (add or remove) | `services` / `moreServices` arrays (photos for the Services page are listed in `src/pages/ServicesPage.tsx`) |
| Reviews (About Us page) | `reviews` array |
| Showcase projects | `projects` array |
| Logo | replace `assets/source/apex.jpg`, run `npm run images` |
| Photos | replace the matching file in `assets/source/` (same name), run `npm run images` |

## Awaiting owner confirmation

These details are shown on the site but still need the owner's sign-off (tracked with `confirmed: false` in `src/config/site.ts`, not shown to visitors).

- [x] Phone number and WhatsApp **071 793 3414**
- [x] Email address **apexplumbingct@gmail.com**
- [ ] **Service area** wording ("Cape Town & surrounding areas")
- [ ] Business hours, full list of services
- [ ] Permission to use the reviews, logo and Facebook photos on the website

**Before launch:** mark the confirmed fields `confirmed: true` and remove the `<meta name="robots" content="noindex, nofollow">` line from `index.html`.

## Content principles

Nothing has been invented. No registration details, qualifications, years in business, guarantees, prices or extra services appear on the site. The "Why choose" points come directly from the supplied reviews and the business's own Facebook description. 

## Page banners

Every page opens with a full-width photo banner (`src/components/layout/Banner.tsx`). The images are wide crops of the business's own job photos, made by `npm run images` (see `BANNERS` in `scripts/optimize-images.mjs`).

To use your own artwork instead, for example AI-generated images:

1. Save it as `assets/source/banners/<page>.jpg` (`home`, `about`, `services`, `showcase` or `contact`). A wide image of at least 1600px works best.
2. Run `npm run images`.
3. Update that banner's `alt` text in `banners` in `src/config/site.ts`.

## Pages

Home · About Us · Services · Showcase · Contact. Old `/projects` and `/testimonials` URLs redirect to Showcase and About Us. The Contact page shows only the phone number and email as contact details, plus a WhatsApp button (`https://wa.me/27815832999`, with a prefilled message).

## Enquiry form

There is no backend. The form validates the input, then opens **WhatsApp** or the visitor's **email** app with the enquiry written out. It clearly tells the visitor that nothing is sent until they press Send in that app. No fake success message is shown. To collect enquiries directly later, connect a form service (e.g. Formspree or Netlify Forms) in `src/components/contact/EnquiryForm.tsx`.

## Look and feel

The design is built from the Apex logo: indigo navy and plum purple (no orange), Archivo headings, Figtree body text and IBM Plex Mono labels. Sections meet on **straight, tilted edges** (`SlantEdge` in `src/components/ui/primitives.tsx`, paths in `slantPaths` in `src/components/ui/motion.ts`), and feature photos use a cut "apex" corner (the `.cut` class in `src/index.css`). Colour tokens and their contrast ratios are listed at the top of `src/index.css`.

## Images

- **Logo:** the Apex droplet from the Facebook profile (`assets/source/apex.jpg`). `npm run images` cuts it out to `logo-color.png` (light backgrounds) and `logo-light.png` (dark backgrounds), and makes the favicons.
- **Home banner:** Sea Point from Lion's Head by [Brent Ninaber](https://unsplash.com/@brentninaber) on [Unsplash](https://unsplash.com/photos/pT0kLFSgDPo), free under the Unsplash License (`assets/source/banners/home.jpg`, given a taller 16:10 crop in `BANNERS`). It is shown in navy/plum duotone.
- **About banner:** Bantry Bay / Sea Point coastline by [Tim Johnson](https://unsplash.com/photos/d_hu_nASUhU) on Unsplash, free under the Unsplash License (`assets/source/banners/about.jpg`, 16:9 crop in `BANNERS`), shown in navy/plum duotone. The About page's faint backgrounds (`about-values`, `about-process`) reuse the bathroom and plumbing-maintenance stock photos.
- **Services and Contact banners:** a [plumber at work](https://unsplash.com/photos/jaP5ClBdIyU) and a [kitchen mixer tap](https://unsplash.com/photos/Vve7XkiUq_Y), both free under the Unsplash License (`assets/source/banners/services.jpg`, `contact.jpg`). About, Services and Contact all use a 16:9 crop, the navy/plum duotone and the same banner height (set in `Banner.tsx`).
- **Home-page cards:** professional stock photos in `assets/source/home/`, all free under the Unsplash License: [electric geyser](https://unsplash.com/photos/C-oYJoIfgCs), [solar geyser](https://unsplash.com/photos/9KtfYT7t8Eo), [plumbing maintenance](https://unsplash.com/photos/c314Gh8dXAo) [bathroom renovation](https://unsplash.com/photos/ZDB00w2d5hY), [phone call](https://unsplash.com/photos/pb_lF8VWaPU), [copper pipework](https://unsplash.com/photos/c5aW5Xy-O7c) and [modern bathroom](https://unsplash.com/photos/g51F6-WYzyU). The three core services in `services` (`src/config/site.ts`) use these too, as their main and inset photos on the Services page. They are listed in `homeImages` in `src/config/site.ts`; point an entry at `/images/work/…` to use one of the business's own photos instead.
- **Contact form background:** a [brushed-steel designer tap over a white basin](https://unsplash.com/photos/zHWdhQ0Jubg), free under the Unsplash License (`assets/source/backgrounds/contact-form.jpg`).
- **Footer and "What we do" backgrounds:** two crops of the Sea Point photo (`assets/source/backgrounds/footer.jpg`, `home-services.jpg`).
- **Damien (home hero):** `assets/source/damian.png` is the full-resolution photo on white and `assets/source/damian-mask.png` a remove.bg cut-out of the same photo. `npm run images` uses the cut-out as a mask on the full photo, removes the white fringe and writes 560px and 1120px WebPs to `public/images/team/`.
- **Faint backgrounds:** the footer, the Services page ("Three things", "How a job works", "Also on the job sheet") and About ("Our approach") show a photo very faintly in duotone (`FaintImage` in `src/components/ui/primitives.tsx`). To use an official Facebook photo, save it as `assets/source/backgrounds/<key>.jpg` with a key from `backgrounds` in `src/config/site.ts` (`footer`, `services-overview`, `services-how`, `services-more`, `about-values`), then run `npm run images`. The footer also carries a large faint Apex droplet watermark.
- **Job photos:** should be the business's own photos from the [Apex Plumbing CT Facebook page](https://www.facebook.com/p/Apex-Plumbing-CT-100095090899342/). Save each one as a JPEG in `assets/source/work/`, list it in `projects` / `services` in `src/config/site.ts`, set the banner crops in `BANNERS` in `scripts/optimize-images.mjs`, then run `npm run images`.

## Deploying

`npm run build` type-checks the code and writes a static site to `dist/` (about 8 MB, mostly photos). Upload that folder to any static host, or connect the project and let the host build it. Node **20.19+** or **22.12+** is required (set in `package.json`).

| Host | Build command | Output folder | Already configured |
| --- | --- | --- | --- |
| Vercel | `npm run build` | `dist` | `vercel.json`: page routing, caching, missing files return 404 |
| Netlify | `npm run build` | `dist` | `public/_redirects` and `public/_headers`: the same rules |
| Cloudflare Pages | `npm run build` | `dist` | page routing works out of the box |

Check a build locally with `npm run preview`.

### Before going live

- [ ] **Search engines:** `index.html` contains `<meta name="robots" content="noindex, nofollow">`, which keeps the site out of Google. Remove that line when the owner approves the site.
- [ ] **Social previews:** change `og:image` in `index.html` to the full address once the domain is known, e.g. `https://example.co.za/images/og-image.jpg`. Facebook and WhatsApp need the full address to show the preview image.
- [ ] Confirm the email address and the other details listed under "Awaiting owner confirmation".
