/**
 * Image pipeline: converts originals in assets/source/ into responsive WebP
 * files in public/images/. Re-run after adding or swapping photos:
 *
 *   npm run images
 *
 * Job photos: drop JPEGs into assets/source/work/ (e.g. solar-maitland-01.jpg)
 * and reference them in src/config/site.ts as '/images/work/<name>'.
 * Faint backgrounds: drop JPEGs into assets/source/backgrounds/ named after a key in BACKGROUNDS.
 */
import sharp from 'sharp'
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const src = (f) => path.join(root, 'assets/source', f)
const out = (f) => path.join(root, 'public/images', f)

// work/: the business's own job photos (from their public Facebook page), mostly 1200×1600 portrait.
// home/: professional stock photos for the home-page cards (free Unsplash License, see README).
const WORK_WIDTHS = [480, 800, 1200]
for (const folder of ['work', 'home']) {
  await mkdir(out(folder), { recursive: true })
  const files = (await readdir(src(folder))).filter((f) => /\.jpe?g$/i.test(f))
  for (const file of files) {
    const name = file.replace(/\.jpe?g$/i, '')
    for (const width of WORK_WIDTHS) {
      await sharp(src(`${folder}/${file}`))
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 74, effort: 6 })
        .toFile(out(`${folder}/${name}-${width}.webp`))
    }
    console.log(`✓ ${folder}/${name}`)
  }
}

// Page banners: a wide 16:7 crop for the top of each page. To use your own artwork (e.g. an
// AI-generated image), save it as assets/source/banners/<page>.jpg (or .png/.webp) and re-run;
// otherwise the job photo listed here is used. `top` is where the crop sits (0 = top, 1 = bottom).
// `custom` overrides the crop for your own image: `top` as above and `ratio` (height ÷ width).
const BANNERS = {
  // Sea Point from Lion's Head, by Brent Ninaber on Unsplash (free Unsplash License). The full-height
  // home hero gets a taller 16:10 crop centred on the coastline.
  home: { photo: 'solar-maitland-01', top: 0.02, custom: { top: 0.41, ratio: 10 / 16 } },
  // Bantry Bay / Sea Point coastline by Tim Johnson on Unsplash (free Unsplash License).
  about: { photo: 'jojo-tanks-01', top: 0.2, custom: { top: 0.62, ratio: 9 / 16 } },
  // Plumber at work in a bathroom (Unsplash, free licence). Same 16:9 crop as About.
  services: { photo: 'solar-diepriver-02', top: 0.42, custom: { top: 0.35, ratio: 9 / 16 } },
  showcase: { photo: 'bathroom-clawfoot-01', top: 0.5 },
  // Chrome mixer tap with splashing water (Unsplash, free licence). Same 16:9 crop as About.
  contact: { photo: 'solar-surrey-01', top: 0.08, custom: { top: 0.3, ratio: 9 / 16 } },
}
await mkdir(out('banners'), { recursive: true })
const custom = await readdir(src('banners')).catch(() => [])
for (const [key, { photo, top, custom: ownCrop = {} }] of Object.entries(BANNERS)) {
  const own = custom.find((f) => f.replace(/\.(jpe?g|png|webp)$/i, '') === key)
  const input = own ? src(`banners/${own}`) : src(`work/${photo}.jpg`)
  const img = sharp(input).rotate()
  const { width, height } = await img.metadata()
  const ratio = (own && ownCrop.ratio) || 7 / 16
  const cropH = Math.min(height, Math.round(width * ratio))
  const cropW = Math.min(width, Math.round(cropH / ratio))
  const crop = {
    left: Math.round((width - cropW) / 2),
    top: Math.round((height - cropH) * (own ? (ownCrop.top ?? 0.5) : top)),
    width: cropW,
    height: cropH,
  }
  for (const w of [960, 1600]) {
    await sharp(input)
      .rotate()
      .extract(crop)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(out(`banners/${key}-${w}.webp`))
  }
  console.log(`✓ banners/${key}${own ? ' (custom image)' : ''}`)
}

// Faint section backgrounds (footer, Services and About sections). These are shown very faintly
// in duotone, so a lower quality is fine. Save an official photo from the Apex Facebook page as
// assets/source/backgrounds/<key>.jpg (or .png/.webp) and re-run; until then the listed job photo
// stands in. Keys match `backgrounds` in src/config/site.ts.
const BACKGROUNDS = {
  footer: 'jojo-tanks-01',
  'services-overview': 'solar-maitland-01',
  'services-how': 'geyser-relocation-01',
  'services-more': 'burst-morgans-01',
  'about-values': 'water-meters-saltriver-01',
  'about-process': 'kitchen-tap-rocklands-01',
  'home-services': 'jojo-tanks-02',
  'contact-form': 'bathroom-showcase-01',
}
await mkdir(out('backgrounds'), { recursive: true })
const ownBackgrounds = await readdir(src('backgrounds')).catch(() => [])
for (const [key, photo] of Object.entries(BACKGROUNDS)) {
  const own = ownBackgrounds.find((f) => f.replace(/\.(jpe?g|png|webp)$/i, '') === key)
  const input = own ? src(`backgrounds/${own}`) : src(`work/${photo}.jpg`)
  for (const w of [960, 1600]) {
    await sharp(input)
      .rotate()
      .resize({ width: w, height: Math.round(w * 0.6), fit: 'cover', withoutEnlargement: true })
      .webp({ quality: 58, effort: 6 })
      .toFile(out(`backgrounds/${key}-${w}.webp`))
  }
  console.log(`✓ backgrounds/${key}${own ? ' (official photo)' : ' (stand-in job photo)'}`)
}

// Damien for the home hero. assets/source/damian.png is the full-resolution photo on a white
// background; assets/source/damian-mask.png is a low-res remove.bg cut-out of the same photo, used
// only as the mask. The mask is scaled up onto the full photo and the white fringe along the edges
// is removed ("un-mixing" each edge pixel from the white background).
const DAMIAN_WIDTHS = [560, 1120]
await mkdir(out('team'), { recursive: true })
{
  const photo = sharp(src('damian.png')).removeAlpha()
  const { width, height } = await photo.metadata()
  const rgb = await photo.raw().toBuffer()
  const mask = await sharp(src('damian-mask.png'))
    .ensureAlpha()
    .extractChannel(3)
    .resize(width, height, { kernel: 'lanczos3' })
    .raw()
    .toBuffer()
  const rgba = Buffer.alloc(width * height * 4)
  for (let p = 0; p < width * height; p++) {
    // Steepen the upscaled mask a little so edges stay crisp
    const a = Math.max(0, Math.min(255, Math.round((mask[p] - 24) * 1.12)))
    const f = a / 255
    for (let c = 0; c < 3; c++) {
      const observed = rgb[p * 3 + c]
      rgba[p * 4 + c] = f > 0.08 ? Math.max(0, Math.min(255, Math.round((observed - (1 - f) * 255) / f))) : observed
    }
    rgba[p * 4 + 3] = a
  }
  const cut = await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer()
  for (const w of DAMIAN_WIDTHS) {
    await sharp(cut)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 100, effort: 6 })
      .toFile(out(`team/damian-${w}.webp`))
  }
  console.log(`✓ team/damian (${width}×${height})`)
}

// Logo: the two-tone Apex droplet (navy + purple on white) → transparent PNGs. `color` keeps the
// artwork as it is, for light backgrounds; `light` turns navy into white and purple into lilac,
// for dark backgrounds.
async function logo(variant, name) {
  const { data, info } = await sharp(src('apex.jpg'))
    .trim({ threshold: 30 })
    .resize(512, 512, { fit: 'contain', background: '#ffffff' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const outBuf = Buffer.alloc(info.width * info.height * 4)
  for (let i = 0, o = 0; i < data.length; i += 3, o += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
    // Distance from white sets the opacity; the artwork's darkest channel is far below 255.
    const alpha = Math.max(0, Math.min(255, (255 - Math.min(r, g, b)) * 1.35 - 20))
    const purple = r - g > 40
    const [cr, cg, cb] = variant === 'color' ? [r, g, b] : purple ? [0xdf, 0xa6, 0xe4] : [255, 255, 255]
    outBuf.set([cr, cg, cb, alpha], o)
  }
  await sharp(outBuf, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9, palette: true, colours: 64 })
    .toFile(out(name))
  console.log(`✓ ${name}`)
}
await logo('color', 'logo-color.png')
await logo('light', 'logo-light.png')

for (const [size, name] of [
  [64, 'favicon.png'],
  [180, 'apple-touch-icon.png'],
]) {
  await sharp(src('apex.jpg'))
    .trim({ threshold: 30 })
    .resize(Math.round(size * 0.84), Math.round(size * 0.84), { fit: 'contain', background: '#ffffff' })
    .extend({ top: 1, bottom: 1, left: 1, right: 1, background: '#ffffff' })
    .resize(size, size, { fit: 'contain', background: '#ffffff' })
    .png()
    .toFile(path.join(root, 'public', name))
  console.log(`✓ ${name}`)
}

// Social share image (1200×630) from the Maitland solar install.
await sharp(src('work/solar-maitland-01.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 80 })
  .toFile(out('og-image.jpg'))
console.log('✓ og-image.jpg')
