import { EnquiryForm } from '../components/contact/EnquiryForm'
import { PageHero } from '../components/layout/PageHero'
import { PageShell } from '../components/layout/PageShell'
import { buttonClass } from '../components/ui/buttonClass'
import { WhatsAppIcon } from '../components/ui/Icons'
import { FaintImage, Reveal } from '../components/ui/primitives'
import { site } from '../config/site'
import { defaultWhatsAppMessage, mailtoHref, telHref, whatsappHref } from '../lib/contact'

/** Long email addresses wrap before the @, never mid-word. */
const breakEmail = (value: string) => (
  <>
    {value.slice(0, value.indexOf('@'))}
    <wbr />
    {value.slice(value.indexOf('@'))}
  </>
)

const details = [
  { label: 'Phone & WhatsApp', value: site.phone.display, href: telHref },
  { label: 'Email', value: breakEmail(site.email.address), href: mailtoHref },
  { label: 'Based in', value: `${site.location.suburb}, ${site.location.area}` },
  { label: 'Areas', value: 'Atlantic Seaboard, Southern Suburbs & greater Cape Town' },
]

/**
 * One split card below the hero: contact details on a dark panel on the left, the enquiry form on a
 * white panel on the right.
 */
function ContactCard() {
  return (
    <section aria-labelledby="contact-title" className="relative bg-mist-50 pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-24">
      <div className="container-site">
        <Reveal className="relative">
          <div className="grid overflow-hidden rounded-sm bg-white shadow-[0_40px_80px_-40px_rgb(13_18_56/0.45)] ring-1 ring-navy-950/[0.06] lg:grid-cols-12">
            {/* details */}
            <div className="relative isolate overflow-hidden bg-navy-950 p-8 text-white sm:p-10 lg:col-span-5 lg:p-12">
              <div
                aria-hidden="true"
                className="absolute -bottom-40 -left-32 -z-10 size-[30rem] rounded-full bg-plum-500/30 blur-[100px]"
              />
              <img
                src={site.logo.light}
                alt=""
                aria-hidden="true"
                className="absolute -right-16 -bottom-20 -z-10 w-72 -rotate-12 opacity-[0.07]"
              />

              <h2 id="contact-title" className="display text-[clamp(2rem,3.4vw,2.75rem)]">
                Get in touch
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-navy-200">
                Call or message {site.owner.name} for a quick answer, or send the details of your job with the form.
              </p>

              <dl className="mt-10 space-y-6">
                {details.map((d) => (
                  <div key={d.label}>
                    <dt className="text-sm text-navy-300">{d.label}</dt>
                    <dd className="mt-1 font-display text-[1.375rem] leading-snug font-bold">
                      {d.href ? (
                        <a
                          href={d.href}
                          className="underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:decoration-plum-400"
                        >
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={whatsappHref(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClass('whatsapp', 'lg')} mt-10 w-full sm:w-auto`}
              >
                <WhatsAppIcon className="size-5" />
                Chat on WhatsApp
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            {/* form */}
            <div className="relative isolate overflow-hidden bg-white p-8 sm:p-10 lg:col-span-7 lg:p-12">
              <FaintImage image="contact-form" side="right" strength="medium" />
              <EnquiryForm bare />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <PageShell path="/contact">
      <PageHero
        banner="contact"
        duotone
        next="text-mist-50"
        label="Contact"
        lines={[
          'Talk to a',
          <span key="t" className="text-plum-300">
            plumber today.
          </span>,
        ]}
        intro="Call, email or send a WhatsApp message. Tell us what’s going on and the job can be assessed and quoted."
      />
      <ContactCard />
    </PageShell>
  )
}
