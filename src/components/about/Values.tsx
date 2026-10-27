import { motion } from 'framer-motion'
import { site } from '../../config/site'
import { expo } from '../ui/motion'
import { Eyebrow, FaintImage, LineReveal, Reveal, SlantEdge } from '../ui/primitives'

const values: { title: string; text: string }[] = [
  {
    title: 'Honest quotes',
    text: 'Every job is assessed first and quoted clearly before any work begins.',
  },
  {
    title: 'Responsive communication',
    text: 'Getting back to you promptly, and explaining the work in plain language.',
  },
  {
    title: 'Quality workmanship',
    text: 'Neat, genuine work, done properly, whether it’s a noisy pipe or a full renovation.',
  },
  {
    title: 'Local and approachable',
    text: `A ${site.location.area} business, looking after homes and properties across the city.`,
  },
]

/**
 * Our approach: the heading across the top, then each value as a full-width row (title, text)
 * whose title shifts and turns plum on hover. A faint photo sits behind the section.
 */
export function Values() {
  return (
    <section aria-labelledby="values-title" className="relative isolate bg-navy-950 py-24 text-mist-50 sm:py-32">
      <SlantEdge className="text-navy-950" dir="down" />
      <FaintImage image="about-values" tone="dark" side="right" />
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow tone="dark">Our approach</Eyebrow>
            <h2 id="values-title" className="display mt-5 text-[clamp(2.6rem,5vw,4.25rem)]">
              <LineReveal
                lines={[
                  'Straight talk.',
                  <span key="p" className="text-plum-300">
                    Proper work.
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="text-lg leading-relaxed text-navy-200">
              What you can expect when you call {site.name}, from the first message to the finished job.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-white/10 lg:mt-20">
          {values.map((v, i) => (
            <motion.li
              key={v.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: expo, delay: i * 0.06 }}
              className="group grid gap-4 border-b border-white/10 py-7 transition-colors duration-300 hover:bg-white/[0.03] sm:grid-cols-12 sm:items-center sm:gap-6 sm:py-9"
            >
              <h3 className="text-[clamp(1.6rem,2.6vw,2.35rem)] leading-[1.05] font-extrabold text-white transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-plum-300 sm:col-span-5">
                {v.title}
              </h3>
              <p className="text-lg leading-relaxed text-navy-200 sm:col-span-7 lg:col-span-6 lg:col-start-7">
                {v.text}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
