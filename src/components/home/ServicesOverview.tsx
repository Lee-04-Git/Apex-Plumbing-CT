import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { moreServices } from '../../config/site'
import { buttonClass } from '../ui/buttonClass'
import { expo } from '../ui/motion'
import { Eyebrow, FaintImage, LineReveal, Reveal, SlantEdge } from '../ui/primitives'
import { ServicePanels } from './ServicePanels'

/**
 * A dark band: the three core services as rising photo cards, then the other services as text
 * tiles beside a short heading. A faint photo sits behind the heading.
 */
export function ServicesOverview() {
  return (
    <section aria-labelledby="services-title" className="relative isolate bg-navy-900 py-24 text-mist-50 sm:py-32">
      <SlantEdge className="text-navy-900" dir="down" />
      <FaintImage image="home-services" tone="dark" side="right" className="h-[48rem]" />
      <div className="container-site">
        {/* heading */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow tone="dark">What we do</Eyebrow>
            <h2 id="services-title" className="display mt-5 text-[clamp(2.6rem,5.6vw,4.75rem)] text-white">
              <LineReveal
                lines={[
                  'Hot water.',
                  <span key="p" className="text-plum-300">
                    Working pipes.
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="text-lg leading-relaxed text-navy-200">
              Geysers, leaks and bathrooms are the core of the work, with drains, water tanks and emergencies covered too.
            </p>
            <Link
              to="/services"
              className="group mt-5 inline-flex min-h-11 items-center gap-2 font-display font-semibold text-white"
            >
              <span className="bg-linear-to-r from-plum-400 to-plum-400 bg-[length:100%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:0%_2px]">
                All services
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <ServicePanels />

        {/* the other services: heading and enquiry button beside a grid of text tiles */}
        <div className="mt-24 grid gap-10 lg:mt-32 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow tone="dark">More services</Eyebrow>
            <h3 className="display mt-5 text-[clamp(2.1rem,3.6vw,3.25rem)] text-white">
              Big job or <span className="text-plum-300">small fix.</span>
            </h3>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-navy-200">
              Everything else Apex can help with. Choose one to start an enquiry about it.
            </p>
            <Link to="/contact" className={`${buttonClass('accent')} mt-8`}>
              Ask about a job
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {moreServices.map((m, i) => {
              return (
                <motion.li
                  key={m.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: expo, delay: (i % 2) * 0.08 }}
                >
                  <Link
                    to={`/contact?service=other&about=${encodeURIComponent(m.title)}`}
                    className="group flex h-full border-l-2 border-plum-400 bg-white/[0.04] p-6 ring-1 ring-white/10 transition-[background-color,box-shadow,transform] duration-300 ring-inset hover:-translate-y-0.5 hover:bg-white/[0.07] hover:ring-plum-300/40"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3 font-display text-lg font-bold tracking-[-0.015em] text-white">
                        {m.title}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-5 shrink-0 text-navy-300 transition-[transform,color] duration-300 group-hover:rotate-45 group-hover:text-plum-300"
                        />
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-navy-200">{m.text}</span>
                    </span>
                  </Link>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
