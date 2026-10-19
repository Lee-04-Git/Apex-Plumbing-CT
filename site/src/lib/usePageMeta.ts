import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'Apex Plumbing CT Cape Town'
const DEFAULT_DESCRIPTION =
  'Professional plumber in Cape Town for plumbing leak detection, pipe repair, shower and tap installation, toilet installation, geyser installation, drain cleaning and water tank installation. Call or WhatsApp +27 71 793 3414.'

export function usePageMeta(title: string, description?: string) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Plumber in Cape Town`
    // Reset to the default when a page has no description of its own, so one page's
    // description doesn't linger after navigating to another.
    document.querySelector('meta[name="description"]')?.setAttribute('content', description ?? DEFAULT_DESCRIPTION)
    // Production address from .env (VITE_SITE_URL); falls back to whichever domain serves the site.
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    const origin = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/+$/, '') || window.location.origin
    canonical.href = origin + (pathname === '/' ? '/' : pathname)
  }, [title, description, pathname])
}
