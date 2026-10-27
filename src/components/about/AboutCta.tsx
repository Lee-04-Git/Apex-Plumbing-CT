import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { defaultWhatsAppMessage, telHref, whatsappHref } from '../../lib/contact'
import { buttonClass } from '../ui/buttonClass'
import { WhatsAppIcon } from '../ui/Icons'
import { LineReveal, Reveal } from '../ui/primitives'

/** Closing call to action: a navy panel with the droplet watermark and the three ways to get in touch. */
export function AboutCta() {
  return (
    <section aria-labelledby="about-cta-title" className="bg-mist-50 pb-28 sm:pb-36">
      <div className="container-site">
        <Reveal>
          <div className="cut relative isolate overflow-hidden rounded-sm bg-navy-950 px-7 py-14 text-white [--cut:3rem] sm:px-12 sm:py-16 lg:px-16">
            <div
              aria-hidden="true"
              className="absolute -right-24 -bottom-40 -z-10 size-[34rem] rounded-full bg-plum-500/35 blur-[110px]"
            />
            <img
              src={site.logo.light}
              alt=""
              aria-hidden="true"
              className="absolute -right-10 -bottom-24 -z-10 w-[22rem] -rotate-12 opacity-[0.08] sm:w-[28rem]"
            />
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 id="about-cta-title" className="display text-[clamp(2.4rem,4.6vw,4rem)]">
                  <LineReveal
                    lines={[
                      'Got a plumbing problem?',
                      <span key="s" className="text-plum-300">
                        Let’s sort it.
                      </span>,
                    ]}
                  />
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-navy-200">
                  Tell {site.owner.name} what’s going on and the job can be assessed and quoted.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
                <a href={telHref} className={buttonClass('accent', 'lg')}>
                  Call {site.phone.display}
                </a>
                <a
                  href={whatsappHref(defaultWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass('whatsapp', 'lg')}
                >
                  <WhatsAppIcon className="size-5" />
                  WhatsApp
                </a>
                <Link to="/contact" className={buttonClass('outline-light', 'lg')}>
                  Send an enquiry
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
