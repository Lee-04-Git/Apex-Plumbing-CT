import { motion } from 'framer-motion'
import { reviews } from '../../config/site'
import { expo } from '../ui/motion'
import { Eyebrow, LineReveal, Reveal, SlantEdge, Stars } from '../ui/primitives'

/**
 * Customer reviews: heading with the average rating beside it, then a simple grid of equal
 * cards (stars, the review in plain text, name and when).
 */
export function Reviews() {
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  return (
    <section aria-labelledby="reviews-title" className="relative bg-mist-50 py-24 sm:py-32">
      <SlantEdge className="text-mist-50" dir="down" />
      <div className="container-site">
        <div className="grid gap-6 border-b border-navy-950/10 pb-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>Testimonials</Eyebrow>
            <h2 id="reviews-title" className="display mt-5 text-[clamp(2.4rem,4.6vw,3.75rem)] text-navy-950">
              <LineReveal
                lines={[
                  'What our customers',
                  <span key="c" className="text-brand-600">
                    say about us.
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1} className="flex items-center gap-4 lg:col-span-5 lg:justify-end lg:pb-2">
            <span className="font-display text-4xl font-extrabold text-navy-950">{average.toFixed(1)}</span>
            <Stars rating={Math.round(average)} className="[&_svg]:size-5" />
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.li
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: expo, delay: (i % 3) * 0.06 }}
            >
              <figure className="flex h-full flex-col rounded-sm bg-white p-7 ring-1 ring-navy-950/[0.08]">
                <Stars rating={r.rating} />
                <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-navy-950">
                  {r.kind === 'quote' ? `“${r.text}”` : r.text}
                </blockquote>
                <figcaption className="mt-6 border-t border-navy-950/[0.08] pt-4">
                  <span className="block font-display font-bold text-navy-950">{r.name}</span>
                  <span className="mt-0.5 block text-sm text-steel-500">
                    {r.topic ?? 'Customer review'}
                    {r.timeAgo && ` · ${r.timeAgo}`}
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
