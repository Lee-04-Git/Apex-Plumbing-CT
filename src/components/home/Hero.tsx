import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { Banner } from '../layout/Banner'
import { Magnetic } from '../ui/Button'
import { buttonClass } from '../ui/buttonClass'
import { expo, PAGE_IN } from '../ui/motion'
import { Eyebrow, LineReveal, Underline } from '../ui/primitives'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: expo, delay: PAGE_IN + delay },
})

const facts = [
  { label: 'Speciality', value: 'Geysers, leaks & bathrooms' },
  { label: 'Based in', value: `${site.location.suburb}, ${site.location.area}` },
]

export function Hero() {
  return (
    <Banner image="home" next="text-mist-50" tall duotone>
      <div className="container-site grid gap-6 pt-10 lg:grid-cols-12 lg:items-end lg:pt-12">
        <div className="min-w-0 lg:col-span-7 lg:self-center lg:pb-28">
          <motion.div {...fadeUp(0)}>
            <Eyebrow tone="dark">Plumbing specialists · Cape Town</Eyebrow>
          </motion.div>
          {/* sized by viewport height too, so the whole hero fits on shorter laptop screens */}
          <h1 id="hero-title" className="display mt-6 text-[clamp(3rem,min(7vw,11svh),7.25rem)] text-white">
            <LineReveal
              onLoad
              delay={PAGE_IN + 0.05}
              lines={[
                'At the Top',
                <span key="r">
                  of Our{' '}
                  <span className="relative inline-block text-plum-300">
                    Game
                    <Underline onLoad delay={PAGE_IN + 0.75} className="text-plum-400" />
                  </span>
                </span>,
              ]}
            />
          </h1>
          <motion.p {...fadeUp(0.35)} className="mt-7 max-w-xl text-lg leading-relaxed text-navy-100 sm:text-xl">
            We offer residential & commercial plumbing services throughout Cape Town.
          </motion.p>

          <motion.div {...fadeUp(0.45)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <Link to="/contact" className={`${buttonClass('accent', 'lg')} w-full sm:w-auto`}>
                Enquire about a job
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/services" className={`${buttonClass('outline-light', 'lg')} w-full sm:w-auto`}>
                Explore our services
              </Link>
            </Magnetic>
          </motion.div>

          <motion.dl {...fadeUp(0.65)} className="mt-8 grid max-w-xl grid-cols-2 gap-5 border-t border-white/20 pt-6 sm:mt-10 lg:mt-12">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="label text-navy-200">{f.label}</dt>
                <dd className="mt-1.5 font-display text-[1.0625rem] leading-snug font-bold text-white">{f.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Damien stands on the bottom of the banner; its slanted edge passes in front of his waist */}
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: expo, delay: PAGE_IN + 0.25 }}
          className="relative flex min-w-0 justify-center self-end lg:col-span-5 lg:-mr-6 lg:justify-end xl:-mr-14"
        >
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 aspect-square w-[140%] max-w-[54rem] -translate-x-1/2 translate-y-1/4 rounded-full bg-[radial-gradient(closest-side,rgb(139_42_148/0.65),rgb(139_42_148/0.2)_55%,transparent)] lg:left-auto lg:-right-[18%] lg:translate-x-0"
          />
          <img
            src={site.logo.light}
            alt=""
            aria-hidden="true"
            className="absolute top-0 left-1/2 w-[80%] max-w-[32rem] -translate-x-1/2 -rotate-6 opacity-[0.1] lg:left-auto lg:right-[4%] lg:translate-x-0"
          />
          <img
            src={`${site.owner.photo.base}-${site.owner.photo.widths[0]}.webp`}
            srcSet={site.owner.photo.widths.map((w) => `${site.owner.photo.base}-${w}.webp ${w}w`).join(', ')}
            sizes="(min-width: 1024px) 40vw, 80vw"
            alt={`${site.owner.name} from ${site.name}, arms folded, in a branded Apex shirt`}
            width={site.owner.photo.width}
            height={site.owner.photo.height}
            fetchPriority="high"
            className="relative h-auto w-full max-w-[24rem] [filter:drop-shadow(0_0_1px_rgb(223_166_228/0.75))_drop-shadow(0_0_26px_rgb(199_122_208/0.35))] lg:h-[clamp(30rem,84svh,50rem)] lg:w-auto lg:max-w-none"
          />
        </motion.figure>
      </div>
    </Banner>
  )
}
