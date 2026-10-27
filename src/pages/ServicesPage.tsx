import { motion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PageHero } from '../components/layout/PageHero'
import { PageShell } from '../components/layout/PageShell'
import { SendPhotoSection } from '../components/services/SendPhotoSection'
import { buttonClass } from '../components/ui/buttonClass'
import { expo } from '../components/ui/motion'
import { ClipReveal, Eyebrow, FaintImage, LineReveal, Photo, Reveal, SlantEdge } from '../components/ui/primitives'
import { moreServices, services } from '../config/site'
import { quoteHref, whatsappHref } from '../lib/contact'
import { scrollToId } from '../lib/scroll'

/* ─────────────────────────── Data ─────────────────────────── */

const sections = [
  ...services.map((s) => ({ id: s.id as string, label: s.short })),
  { id: 'more', label: 'Also available' },
  { id: 'how', label: 'How it works' },
]

const steps = [
  { when: 'Step one', title: 'Get in touch', text: 'Call, send a WhatsApp message or use the enquiry form with a short description of the job.' },
  { when: 'Step two', title: 'Assessment & quotation', text: 'Your plumbing requirements are assessed and you receive a clear quotation.' },
  { when: 'Step three', title: 'The work gets done', text: 'Once you’re happy to go ahead, the work is carried out and the site left neat and clean.' },
]

/** Plain-text link that jumps to a section on this page. */
function JumpLink({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault()
        scrollToId(id)
      }}
      className={className}
    >
      {children}
    </a>
  )
}

/* ─────────────────────────── Overview ─────────────────────────── */

/** The three core services as large text links beside a short introduction. */
function Overview() {
  return (
    <section aria-labelledby="overview-title" className="relative isolate bg-mist-50 py-20 sm:py-28">
      <FaintImage image="services-overview" side="right" strength="medium" />
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>What we can help with</Eyebrow>
          <h2 id="overview-title" className="display mt-5 text-[clamp(2.4rem,4.6vw,3.75rem)] text-navy-950">
            <LineReveal
              lines={[
                'Three areas,',
                <span key="b" className="text-brand-600">
                  one trusted team.
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-steel-600">
              Most jobs fall into one of these. Choose one to see what’s involved, or scroll down for everything else
              Apex can help with.
            </p>
          </Reveal>
        </div>

        <ul className="border-t border-navy-950/10 lg:col-span-7">
          {services.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: expo, delay: i * 0.08 }}
              className="border-b border-navy-950/10"
            >
              <JumpLink id={s.id} className="group block py-7 sm:py-8">
                <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <span className="font-display text-[clamp(1.6rem,2.8vw,2.25rem)] leading-tight font-extrabold text-navy-950 transition-colors duration-300 group-hover:text-brand-600">
                    {s.title}
                  </span>
                  <span className="text-sm font-semibold text-navy-950 underline decoration-plum-500 decoration-2 underline-offset-[6px] transition-colors group-hover:text-brand-600">
                    See details
                  </span>
                </span>
                <span className="mt-2 block max-w-xl leading-relaxed text-steel-600">{s.body}</span>
              </JumpLink>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ─────────────────────────── Sticky section switcher ─────────────────────────── */

function SectionNav() {
  const [active, setActive] = useState(sections[0].id)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return (
    <nav
      aria-label="Services on this page"
      className="sticky top-[4.75rem] z-30 border-y border-navy-950/[0.07] bg-white/90 backdrop-blur-xl"
    >
      {/* on narrow screens the list scrolls sideways; the right edge fades to hint at more */}
      <ul className="container-site flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] max-lg:[mask-image:linear-gradient(to_right,black_80%,transparent)] lg:justify-center">
        {sections.map((s) => (
          <li key={s.id} className="shrink-0">
            <JumpLink
              id={s.id}
              className={`relative flex min-h-10 items-center rounded-sm px-4 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors ${
                active === s.id ? 'text-white' : 'text-steel-600 hover:bg-navy-950/[0.05] hover:text-navy-950'
              }`}
            >
              {active === s.id && (
                <motion.span
                  layoutId="services-nav"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  className="absolute inset-0 rounded-sm bg-navy-950"
                />
              )}
              <span className="relative">{s.label}</span>
            </JumpLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* ─────────────────────────── One service in detail ─────────────────────────── */

/**
 * One service: a large photo with a smaller overlapping inset on one side, and the details on the
 * other (what's included, a "good to know" note, ways to enquire). Sides alternate.
 */
function ServiceDetail({ s, i }: { s: (typeof services)[number]; i: number }) {
  const flip = i % 2 === 1
  const bg = flip ? 'bg-mist-50' : 'bg-white'
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className={`relative py-20 sm:py-28 ${bg}`}>
      {i > 0 && <SlantEdge className={flip ? 'text-mist-50' : 'text-white'} dir={flip ? 'down' : 'up'} />}
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        {/* photos */}
        <div className={`relative pb-16 lg:col-span-6 lg:pb-20 ${flip ? 'lg:order-2' : ''}`}>
          <ClipReveal className={`cut aspect-[5/4] rounded-sm [--cut:3rem] ${flip ? 'lg:ml-10' : 'lg:mr-10'}`}>
            <Photo {...s.image} sizes="(min-width: 1024px) 45vw, 92vw" className="size-full object-cover contrast-[1.05]" />
          </ClipReveal>
          <Reveal delay={0.25} className={`absolute bottom-0 w-[46%] ${flip ? 'left-0 lg:-left-2' : 'right-0 lg:-right-2'}`}>
            <div
              className={`aspect-square overflow-hidden rounded-sm shadow-[0_24px_50px_-24px_rgb(13_18_56/0.55)] ring-8 ${
                flip ? 'ring-mist-50' : 'ring-white'
              }`}
            >
              <Photo {...s.inset} sizes="(min-width: 1024px) 22vw, 44vw" className="size-full object-cover" />
            </div>
          </Reveal>
        </div>

        {/* details */}
        <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
          <Eyebrow>{s.short}</Eyebrow>
          <h2 id={`${s.id}-title`} className="display mt-5 text-[clamp(2.3rem,4.2vw,3.5rem)] text-navy-950">
            <LineReveal lines={[s.title]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-xl leading-relaxed text-navy-950/85">{s.body}</p>

            <h3 className="label mt-10 text-steel-500">What’s included</h3>
            <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
              {s.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-navy-950/10 py-3 text-navy-950">
                  <span aria-hidden="true" className="mt-2 size-2 shrink-0 bg-plum-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 border-l-4 border-plum-500 bg-lilac-100 px-5 py-4">
              <p className="label text-plum-600">Good to know</p>
              <p className="mt-1.5 leading-relaxed text-navy-950/85">{s.detail}</p>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link to={quoteHref(s.id)} className={buttonClass('accent', 'lg')}>
                Enquire about this
              </Link>
              <a
                href={whatsappHref(`Hi, I would like to enquire about ${s.title.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start font-display font-semibold text-navy-950 underline decoration-plum-500 decoration-2 underline-offset-[6px] transition-colors hover:text-brand-600 sm:self-auto"
              >
                Or ask on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Also available ─────────────────────────── */

/** The other services on a dark band; each card starts an enquiry about it. */
function MoreServices() {
  return (
    <section id="more" aria-labelledby="more-title" className="relative isolate bg-navy-950 py-20 text-white sm:py-28">
      <SlantEdge className="text-navy-950" dir="up" />
      <FaintImage image="services-more" tone="dark" side="right" />
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow tone="dark">More services</Eyebrow>
            <h2 id="more-title" className="display mt-5 text-[clamp(2.4rem,4.6vw,3.75rem)]">
              <LineReveal
                lines={[
                  'Also',
                  <span key="j" className="text-plum-300">
                    available.
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="text-lg leading-relaxed text-navy-200">
              Plumbing work beyond the three core services. Choose one to start an enquiry about it.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {moreServices.map((m, i) => (
            <motion.li
              key={m.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: expo, delay: (i % 3) * 0.08 }}
            >
              <Link
                to={`/contact?service=other&about=${encodeURIComponent(m.title)}`}
                className="group flex h-full flex-col border-t-2 border-plum-400 bg-white/[0.04] p-7 ring-1 ring-white/10 transition-colors duration-300 ring-inset hover:bg-white/[0.08]"
              >
                <h3 className="font-display text-xl font-bold text-white">{m.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-navy-200">{m.text}</p>
                <span className="mt-6 self-start text-sm font-semibold text-white underline decoration-plum-400 decoration-2 underline-offset-[6px] transition-colors group-hover:text-plum-300">
                  Enquire about this
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ─────────────────────────── How it works ─────────────────────────── */

function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="relative isolate bg-lilac-100 py-20 sm:py-28">
      <SlantEdge className="text-lilac-100" />
      <FaintImage image="services-how" side="left" strength="medium" />
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>How it works</Eyebrow>
            <h2 id="how-title" className="display mt-5 text-[clamp(2.4rem,4.6vw,3.75rem)] text-navy-950">
              <LineReveal
                lines={[
                  'Simple from',
                  <span key="w" className="text-brand-600">
                    start to finish.
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5 lg:flex lg:justify-end lg:pb-2">
            <Link to="/contact" className={buttonClass('navy', 'lg')}>
              Start with step one
            </Link>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-3 lg:mt-16">
          {steps.map((step, n) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: expo, delay: n * 0.12 }}
              className="border-t-4 border-plum-500 pt-6"
            >
              <p className="label text-brand-600">{step.when}</p>
              <h3 className="mt-3 text-2xl font-extrabold text-navy-950">{step.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-steel-600">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function ServicesPage() {
  const { hash } = useLocation()
  // Arriving from a link like /services#geysers: scroll there once the new page has faded in.
  useEffect(() => {
    if (!hash) return
    const id = setTimeout(() => scrollToId(hash.slice(1)), 350)
    return () => clearTimeout(id)
  }, [hash])

  return (
    <PageShell path="/services">
      <PageHero
        banner="services"
        duotone
        next="text-mist-50"
        label="Services"
        lines={[
          'Plumbing,',
          <span key="a" className="text-plum-300">
            done properly.
          </span>,
        ]}
        intro="From noisy pipes and blocked drains to geyser installations and full renovations. Here’s how Apex can help."
      />
      <Overview />
      <SectionNav />
      {services.map((s, i) => (
        <ServiceDetail key={s.id} s={s} i={i} />
      ))}
      <MoreServices />
      <HowItWorks />
      <SendPhotoSection />
    </PageShell>
  )
}
