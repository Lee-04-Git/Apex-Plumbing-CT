import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { BANNER_WIDTHS, banners, type BannerKey } from '../../config/site'
import { expo, slantPaths } from '../ui/motion'

/**
 * Full-bleed photo banner that opens every page. The fixed header floats over it, so content
 * starts below the header. A straight, tilted edge at the bottom cuts into the next section's colour.
 */
export function Banner({
  image,
  children,
  next = 'text-mist-100',
  tall = false,
  duotone = false,
}: {
  image: BannerKey
  children: ReactNode
  /** Text colour class matching the next section's background, for the slanted edge. */
  next?: string
  tall?: boolean
  /** Render the photo in navy/plum duotone with a plum glow, so a person or copy in front stands out. */
  duotone?: boolean
}) {
  const img = banners[image]
  const largest = BANNER_WIDTHS[BANNER_WIDTHS.length - 1]
  return (
    <section
      className={`relative isolate overflow-hidden bg-navy-950 text-white ${
        tall ? 'min-h-[92svh] lg:min-h-svh' : 'min-h-[34rem] sm:min-h-[38rem] lg:min-h-[45rem]'
      }`}
    >
      <motion.img
        src={`${img.base}-${BANNER_WIDTHS[0]}.webp`}
        srcSet={BANNER_WIDTHS.map((w) => `${img.base}-${w}.webp ${w}w`).join(', ')}
        sizes="100vw"
        alt={img.alt}
        width={largest}
        height={Math.round((largest * 7) / 16)}
        fetchPriority="high"
        decoding="async"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: expo }}
        className={`absolute inset-0 -z-20 size-full object-cover ${duotone ? 'opacity-55 mix-blend-luminosity grayscale contrast-[1.15]' : ''}`}
        style={img.position ? { objectPosition: img.position } : undefined}
      />
      {duotone && (
        <>
          <div
            aria-hidden="true"
            className="absolute -right-40 -bottom-40 -z-10 size-[44rem] rounded-full bg-plum-500/30 blur-[120px]"
          />
        </>
      )}
      {/* keeps the copy readable over any photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950/92 via-navy-950/70 to-plum-600/20"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-navy-950/60 to-transparent" />

      {/* inner pages share one banner height; the copy sits at the bottom */}
      <div className="relative flex min-h-[inherit] flex-col justify-end pt-[4.75rem]">{children}</div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute inset-x-0 -bottom-px h-10 w-full sm:h-16 lg:h-20 ${next}`}
      >
        <path fill="currentColor" d={slantPaths.up} />
      </svg>
    </section>
  )
}
