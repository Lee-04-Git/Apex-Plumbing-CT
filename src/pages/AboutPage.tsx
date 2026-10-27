import { AboutCta } from '../components/about/AboutCta'
import { Process } from '../components/about/Process'
import { Reviews } from '../components/about/Reviews'
import { Story } from '../components/about/Story'
import { Values } from '../components/about/Values'
import { PageHero } from '../components/layout/PageHero'
import { PageShell } from '../components/layout/PageShell'
import { site } from '../config/site'

export default function AboutPage() {
  return (
    <PageShell path="/about">
      <PageHero
        banner="about"
        duotone
        next="text-mist-50"
        label="About us"
        lines={[
          'Your local',
          <span key="a" className="text-plum-300">
            Cape Town plumbers.
          </span>,
        ]}
        intro={`A ${site.location.suburb} plumbing business taking on all sorts of plumbing work across ${site.location.area}, from noisy pipes to full-on renovations.`}
      />
      <Story />
      <Values />
      <Process />
      <Reviews />
      <AboutCta />
    </PageShell>
  )
}
