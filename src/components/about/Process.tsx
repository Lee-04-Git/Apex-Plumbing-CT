import { motion } from 'framer-motion'
import { expo } from '../ui/motion'
import { Eyebrow, FaintImage, LineReveal, Reveal, SlantEdge } from '../ui/primitives'

const steps: { when: string; title: string; text: string }[] = [
  {
    when: 'Step one',
    title: 'Get in touch',
    text: 'Call, send a WhatsApp message or use the enquiry form with a short description of the job.',
  },
  {
    when: 'Step two',
    title: 'Assessment & quotation',
    text: 'Your plumbing or geyser requirements are assessed and you receive a quotation.',
  },
  {
    when: 'Step three',
    title: 'The work gets done',
    text: 'Once you’re happy to go ahead, the installation or maintenance work is carried out.',
  },
]

/** How a job works: three cut-corner cards with a plum top edge, over a faint photo. */
export function Process() {
  return (
    <section aria-labelledby="how-title" className="relative isolate bg-mist-100 py-24 sm:py-32">
      <SlantEdge className="text-mist-100" />
      <FaintImage image="about-process" side="right" strength="medium" />
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>How a job works</Eyebrow>
            <h2 id="how-title" className="display mt-5 text-[clamp(2.6rem,5vw,4.25rem)] text-navy-950">
              <LineReveal
                lines={[
                  'From first call',
                  <span key="f" className="text-brand-600">
                    to finished job.
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="text-lg leading-relaxed text-steel-600">
              The same simple process for every job, so you always know what happens next.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3 md:gap-8 lg:mt-20">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: expo, delay: i * 0.12 }}
              className="relative"
            >
              <div className="cut relative h-full rounded-sm border-t-4 border-plum-500 bg-white p-7 shadow-[0_24px_50px_-34px_rgb(13_18_56/0.45)] ring-1 ring-navy-950/[0.06] [--cut:1.75rem] sm:p-8">
                <p className="label text-brand-600">{step.when}</p>
                <h3 className="mt-4 text-[1.625rem] leading-tight font-extrabold text-navy-950">{step.title}</h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-steel-600">{step.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
