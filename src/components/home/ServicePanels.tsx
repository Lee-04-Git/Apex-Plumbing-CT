import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../../config/site'
import { expo } from '../ui/motion'
import { Photo } from '../ui/primitives'

/** On large screens the cards step up from left to right, rising to a peak like the name. */
const rise = ['lg:mt-28', 'lg:mt-14', 'lg:mt-0']

/**
 * The core services as tall photo cards side by side. Each card links to that service's
 * details; hovering zooms the photo and draws a plum bar along the bottom.
 */
export function ServicePanels() {
  return (
    <ol className="mt-14 grid gap-5 md:grid-cols-3 md:items-start lg:mt-16 lg:gap-6">
      {services.map((s, i) => (
        <motion.li
          key={s.id}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: expo, delay: i * 0.12 }}
          className={rise[i]}
        >
          <Link
            to={`/services#${s.id}`}
            className="group cut relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-sm bg-navy-800 p-6 [--cut:2.5rem] focus-visible:ring-4 focus-visible:ring-plum-300 focus-visible:outline-none focus-visible:ring-inset sm:p-7 lg:min-h-[34rem]"
          >
            <Photo
              {...s.image}
              sizes="(min-width: 768px) 32vw, 100vw"
              className="absolute inset-0 -z-10 size-full object-cover contrast-[1.05] transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.07]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/70 to-navy-950/10 transition-colors duration-500 group-hover:via-navy-950/60"
            />
            <h3 className="text-[1.75rem] leading-[1.08] font-extrabold text-white">{s.title}</h3>
            <p className="mt-3 leading-relaxed text-navy-100">{s.body}</p>
            <span className="mt-6 inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-white">
              Explore {s.short.toLowerCase()}
              <span className="flex size-9 items-center justify-center rounded-sm bg-plum-500 transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-plum-400 transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
            />
          </Link>
        </motion.li>
      ))}
    </ol>
  )
}
