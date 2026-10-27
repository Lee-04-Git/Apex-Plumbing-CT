import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'
import { navLinks, site, type NavPath } from '../../config/site'
import { expo } from '../ui/motion'

/**
 * Wraps each page with a simple transition: the old page fades out, the view jumps to the top
 * (see App), then the new page fades in while rising slightly. Reduced-motion users get the fade only.
 */
export function PageShell({ path, children }: { path: NavPath | '404'; children: ReactNode }) {
  const reduce = useReducedMotion()
  const link = navLinks.find((l) => l.path === path)

  useEffect(() => {
    document.title = link ? `${link.title} | ${site.name}` : `Page not found | ${site.name}`
  }, [link])

  return (
    <motion.div
      className="bg-mist-100"
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: expo } }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
    >
      {children}
    </motion.div>
  )
}
