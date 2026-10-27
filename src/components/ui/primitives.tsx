import { motion, type HTMLMotionProps } from 'framer-motion'
import { Star } from 'lucide-react'
import type { ReactNode } from 'react'
import { BACKGROUND_WIDTHS, backgrounds, WORK_WIDTHS, type BackgroundKey } from '../../config/site'
import { expo, slantPaths } from './motion'

/** Small fade-and-lift for supporting content (8–16px). */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: expo, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Headline lines slide up from behind a mask. Each entry is one line, so wraps stay intentional. */
export function LineReveal({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  onLoad = false,
}: {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  onLoad?: boolean
}) {
  const trigger = onLoad ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.6 } }
  return (
    <motion.span initial="hidden" {...trigger} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <motion.span
            className={`block will-change-transform ${lineClassName}`}
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 0.95, ease: expo, delay: delay + i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/**
 * Image wipes up into view (clip-path) while its contents settle from a slight zoom.
 * The in-view trigger sits on an unclipped wrapper: Chrome's IntersectionObserver
 * treats a fully clipped element as invisible, so it would never fire.
 */
export function ClipReveal({
  children,
  className = '',
  delay = 0,
  onLoad = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  onLoad?: boolean
}) {
  const trigger = onLoad ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.25 } }
  return (
    <motion.div
      initial="hidden"
      {...trigger}
      className={className.split(' ').includes('absolute') ? className : `relative ${className}`}
    >
      <motion.div
        variants={{
          hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, ease: expo, delay } },
        }}
        className="absolute inset-0 overflow-hidden rounded-[inherit] bg-mist-200"
      >
        <motion.div
          className="size-full"
          variants={{ hidden: { scale: 1.15 }, show: { scale: 1, transition: { duration: 1.5, ease: expo, delay } } }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/** Mono eyebrow led by two slanted bars, echoing the tilted section edges. */
export function Eyebrow({
  children,
  tone = 'light',
  className = '',
}: {
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <p className={`label flex items-center gap-3 ${tone === 'dark' ? 'text-plum-300' : 'text-brand-600'} ${className}`}>
      <span aria-hidden="true" className="flex gap-[3px]">
        <span className="h-3 w-[5px] -skew-x-[24deg] bg-current" />
        <span className="h-3 w-[5px] -skew-x-[24deg] bg-current opacity-50" />
      </span>
      {children}
    </p>
  )
}

/** Straight, slightly rising stroke that draws itself under a word. */
export function Underline({ delay = 0, onLoad = false, className = '' }: { delay?: number; onLoad?: boolean; className?: string }) {
  const trigger = onLoad ? { animate: { pathLength: 1 } } : { whileInView: { pathLength: 1 }, viewport: { once: true } }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute -bottom-[0.1em] left-0 h-[0.2em] w-full overflow-visible ${className}`}
    >
      <motion.path
        d="M2 18 L298 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="butt"
        initial={{ pathLength: 0 }}
        {...trigger}
        transition={{ duration: 0.9, ease: expo, delay }}
      />
    </svg>
  )
}

/** Straight section edge with a slight tilt, so colour blocks meet on an angle instead of a flat cut. */
export function SlantEdge({ className = '', dir = 'up' }: { className?: string; dir?: keyof typeof slantPaths }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 top-px h-8 w-full -translate-y-full sm:h-12 lg:h-16 ${className}`}
    >
      <path fill="currentColor" d={slantPaths[dir]} />
    </svg>
  )
}

export function Stars({ rating = 5, className = '' }: { rating?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`size-4 ${i < rating ? 'fill-plum-400 text-plum-400' : 'text-mist-300'}`}
        />
      ))}
    </span>
  )
}

/**
 * A photo shown very faintly in duotone behind a section; the section needs `relative isolate`.
 * `side` is where the photo shows most; it fades out towards the other side so text stays clean.
 */
export function FaintImage({
  image,
  tone = 'light',
  side = 'right',
  strength = 'soft',
  className = '',
}: {
  image: BackgroundKey
  tone?: 'light' | 'dark'
  side?: 'left' | 'right' | 'full'
  /** `medium` shows the photo a little more clearly. */
  strength?: 'soft' | 'medium'
  className?: string
}) {
  const { base, position } = backgrounds[image]
  // Two fades, intersected: across (towards the text) and down (so the photo never ends in a hard line).
  const across = {
    right: 'linear-gradient(to left, black 15%, transparent 85%)',
    left: 'linear-gradient(to right, black 15%, transparent 85%)',
    full: 'linear-gradient(black, black)',
  }[side]
  const fade = `${across}, linear-gradient(to bottom, transparent, black 20%, black 45%, transparent 90%)`
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <img
        src={`${base}-${BACKGROUND_WIDTHS[0]}.webp`}
        srcSet={BACKGROUND_WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', ')}
        sizes="100vw"
        alt=""
        loading="lazy"
        decoding="async"
        className={`size-full object-cover grayscale ${
          tone === 'dark'
            ? `${strength === 'medium' ? 'opacity-[0.24]' : 'opacity-[0.16]'} mix-blend-luminosity`
            : `${strength === 'medium' ? 'opacity-[0.18]' : 'opacity-[0.1]'} mix-blend-multiply contrast-[1.15]`
        }`}
        style={{
          objectPosition: position,
          maskImage: fade,
          WebkitMaskImage: fade,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />
    </div>
  )
}

/** Responsive WebP image produced by scripts/optimize-images.mjs */
export function Photo({
  base,
  widths = WORK_WIDTHS,
  alt,
  sizes,
  className,
  position,
  priority = false,
}: {
  base: string
  widths?: number[]
  alt: string
  sizes: string
  className?: string
  position?: string
  priority?: boolean
}) {
  const largest = widths[widths.length - 1]
  return (
    <img
      src={`${base}-${widths[Math.min(1, widths.length - 1)]}.webp`}
      srcSet={widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      width={largest}
      height={Math.round(largest * 1.333)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      style={position ? { objectPosition: position } : undefined}
    />
  )
}
