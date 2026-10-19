import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const inputPath = join(__dirname, '../../assets/Apex Plumbers Logo.jpg')
const publicDir = join(__dirname, '../public')
const imagesDir = join(publicDir, 'images')

async function convertLogo() {
  console.log('Converting Apex logo to various formats...')

  // Read the original image
  const image = sharp(inputPath)
  
  // Get metadata to check dimensions
  const metadata = await image.metadata()
  console.log(`Original image: ${metadata.width}x${metadata.height}`)

  // Convert to PNG for navbar (high quality)
  await image
    .resize(800, null, { fit: 'inside', withoutEnlargement: true })
    .png({ quality: 95 })
    .toFile(join(imagesDir, 'apex-logo.png'))
  console.log('✓ Created apex-logo.png')

  // Convert to WebP for navbar (optimized)
  await image
    .resize(800, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(join(imagesDir, 'apex-logo.webp'))
  console.log('✓ Created apex-logo.webp')

  // Create square version for favicon
  await sharp(inputPath)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(join(publicDir, 'favicon-512.png'))
  console.log('✓ Created favicon-512.png')

  await sharp(inputPath)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(join(publicDir, 'favicon-192.png'))
  console.log('✓ Created favicon-192.png')

  await sharp(inputPath)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'))
  console.log('✓ Created apple-touch-icon.png')

  await sharp(inputPath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(join(publicDir, 'favicon-32.png'))
  console.log('✓ Created favicon-32.png')

  await sharp(inputPath)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(join(publicDir, 'favicon-16.png'))
  console.log('✓ Created favicon-16.png')

  // Create ICO file (simplified - just use 32x32)
  const favicon32Buffer = await sharp(inputPath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toBuffer()
  
  writeFileSync(join(publicDir, 'favicon.ico'), favicon32Buffer)
  console.log('✓ Created favicon.ico')

  console.log('\n✅ All logo conversions complete!')
}

convertLogo().catch(console.error)
