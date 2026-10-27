import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { BANNER_WIDTHS, banners, homeImages, reviews, site } from '../../config/site'
import { expo } from '../ui/motion'
import { Eyebrow, LineReveal, Photo, Reveal, Stars } from '../ui/primitives'

/**
 * Reasons drawn only from verified material: the business's own words on its ProCompare
 * profile and the supplied customer reviews.
 */
const reasons = [
  {
    tag: 'Range',
    title: 'Noisy pipes to full renovations',
    text: 'All sorts of plumbing issues, from noisy pipes to full-on renovations, with geyser installations covered too.',
  },
  {
    tag: 'Communication',
    title: 'Answers the call',
    text: `Customers say ${site.owner.name} “answers your call straight away, even on weekends.”`,
  },
  {
    tag: 'Workmanship',
    title: 'Neat, thorough work',
    text: '“Prompt, professional, thorough … they left the place neat and clean.”',
  },
  {
    tag: 'Local',
    title: `Rooted in ${site.location.area}`,
    text: `Based in ${site.location.suburb}, but we travel all over Cape Town, the Atlantic Seaboard, and the Southern Suburbs to help out clients wherever we're needed.`,
  },
]

const featured = reviews.find((r) => r.name === 'Kevin Neeson') ?? reviews[0]

function CardText({ i, tone }: { i: number; tone: 'light' | 'dark' }) {
  const r = reasons[i]
  return (
    <>
      <p className={`label ${tone === 'dark' ? 'text-plum-300' : 'text-plum-200'}`}>{r.tag}</p>
      <h3 className="mt-3 text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] font-extrabold text-white">{r.title}</h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-navy-100">{r.text}</p>
    </>
  )
}

/**
 * Each card wipes in from the left. The in-view trigger sits on the (unclipped) list: Chrome's
 * IntersectionObserver treats a fully clipped element as invisible, so it would never fire.
 */
function Card({
  children,
  bg,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  /** Background class for the card itself (kept off the outer element so the cut corner stays clear). */
  bg: string
  className?: string
  delay?: number
}) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 30, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        shown: {
          opacity: 1,
          y: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          transition: { duration: 1, ease: expo, delay },
        },
      }}
      className={`group flex ${className}`}
    >
      {/* the wipe animates clip-path on the outer element, so the cut corner lives on this one */}
      <div className={`cut relative isolate flex min-h-[22rem] w-full flex-col justify-end overflow-hidden rounded-sm p-7 sm:p-9 [--cut:2.25rem] lg:min-h-[inherit] ${bg}`}>
        {children}
      </div>
    </motion.li>
  )
}

/**
 * Four reasons as an angled bento grid that zig-zags: photo, solid, solid, photo. A real
 * customer quote sits beside the heading.
 */
export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="bg-mist-50 py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Why choose us?</Eyebrow>
            <h2 id="why-title" className="display mt-5 text-[clamp(2.6rem,5.6vw,4.75rem)] text-navy-950">
              <LineReveal
                lines={[
                  'Why call',
                  <span key="p" className="text-brand-600">
                    Apex Plumbing CT?
                  </span>,
                ]}
              />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-steel-600">
                A local plumbing business that focuses on doing the job properly and keeping you in the loop.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-5">
            <figure className="relative border-l-4 border-plum-500 bg-white py-6 pr-6 pl-7 shadow-[0_20px_40px_-28px_rgb(13_18_56/0.35)]">
              <Stars rating={featured.rating} />
              <blockquote className="mt-3 font-display text-xl leading-snug font-bold text-navy-950">
                “{featured.text}”
              </blockquote>
              <figcaption className="label mt-4 text-steel-500">{featured.name} · Customer review</figcaption>
            </figure>
          </Reveal>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-4 sm:gap-5 lg:mt-20 lg:grid-cols-12"
        >
          <Card bg="bg-navy-950" className="lg:col-span-7 lg:min-h-[26rem]">
            <Photo
              {...homeImages.renovation}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/70 to-navy-950/10" />
            <CardText i={0} tone="dark" />
          </Card>

          <Card delay={0.1} bg="bg-navy-950" className="lg:col-span-5">
            <Photo
              {...homeImages.communication}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="absolute inset-0 -z-10 size-full object-cover brightness-150 contrast-[1.1] transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/45 to-transparent" />
            <CardText i={1} tone="dark" />
          </Card>

          <Card delay={0.05} bg="bg-plum-600" className="lg:col-span-5">
            <Photo
              {...homeImages.workmanship}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="absolute inset-0 -z-10 size-full object-cover grayscale-[0.3] transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-plum-600 via-plum-600/80 to-plum-500/35" />
            <CardText i={2} tone="light" />
          </Card>

          <Card delay={0.15} bg="bg-navy-950" className="lg:col-span-7 lg:min-h-[26rem]">
            <Photo
              base={banners.home.base}
              widths={BANNER_WIDTHS}
              alt={banners.home.alt}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
              position="50% 55%"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/60 to-plum-600/20" />
            <CardText i={3} tone="dark" />
          </Card>
        </motion.ul>
      </div>
    </section>
  )
}
