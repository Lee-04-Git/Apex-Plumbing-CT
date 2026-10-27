import { reviews, site } from '../../config/site'
import { Eyebrow, LineReveal, Reveal } from '../ui/primitives'

const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

const facts = [
  { label: 'Based in', value: `${site.location.suburb}, ${site.location.area}` },
  { label: 'Customer rating', value: `${average.toFixed(1)} from ${reviews.length} reviews` },
  { label: 'Working across', value: site.serviceArea.label },
]

/** Who we are: Damien on a lilac panel, beside the story and key facts. */
export function Story() {
  const { photo } = site.owner
  return (
    <section aria-labelledby="story-title" className="bg-mist-50 py-24 sm:py-32">
      <div className="container-site grid items-center gap-16 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <figure>
            <div className="cut relative aspect-[4/5] overflow-hidden rounded-sm bg-linear-to-br from-lilac-200 via-lilac-100 to-plum-200 [--cut:4rem]">
              <img
                src={site.logo.color}
                alt=""
                aria-hidden="true"
                className="absolute -top-6 -right-10 w-[78%] -rotate-12 opacity-[0.12]"
              />
              <img
                src={`${photo.base}-${photo.widths[0]}.webp`}
                srcSet={photo.widths.map((w) => `${photo.base}-${w}.webp ${w}w`).join(', ')}
                sizes="(min-width: 1024px) 34vw, 90vw"
                alt={`${site.owner.name} from ${site.name}, arms folded, in a branded Apex shirt`}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                className="absolute inset-x-0 bottom-0 mx-auto h-[94%] w-auto max-w-none"
              />
            </div>
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <Eyebrow>Who we are</Eyebrow>
          <h2 id="story-title" className="display mt-5 text-[clamp(2.6rem,5vw,4.25rem)] text-navy-950">
            <LineReveal
              lines={[
                'Meet the team',
                <span key="b" className="text-brand-600">
                  behind Apex.
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-navy-950 sm:text-[1.375rem] sm:leading-relaxed">
              Apex Plumbing CT provides comprehensive plumbing maintenance and specialises in advanced water leak
              detection, turnkey bathroom renovations, and certified electrical and solar geyser installations.
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-600">
              With a focus on rapid response times, transparent pricing, and quality workmanship, the business helps
              residential and commercial properties across the Cape Peninsula keep their water systems safe and fully
              compliant. Customers know it best through {site.owner.name}: reviews mention his quick replies, tidy work
              and reasonable pricing.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="rounded-sm border-t-2 border-plum-500 bg-white p-5 ring-1 ring-navy-950/[0.07]">
                  <dt className="label text-steel-500">{f.label}</dt>
                  <dd className="mt-1.5 font-display text-[1.0625rem] leading-snug font-bold text-navy-950">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
