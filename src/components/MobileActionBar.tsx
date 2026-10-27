import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { telHref } from '../lib/contact'
import { ease } from './ui/motion'

/** Thumb-reach contact bar on small screens, shown once the hero is scrolled past. */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const item =
    'flex min-h-13 flex-1 items-center justify-center gap-2 rounded-sm font-display text-[0.9375rem] font-semibold transition-transform active:scale-[0.96]'

  return (
    <AnimatePresence>
      {visible && pathname !== '/contact' && (
        <motion.nav
          aria-label="Quick contact"
          initial={{ y: '130%' }}
          animate={{ y: 0 }}
          exit={{ y: '130%' }}
          transition={{ duration: 0.4, ease }}
          className="fixed right-20 left-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex gap-1.5 rounded-sm bg-navy-950/95 p-1.5 shadow-[0_18px_40px_-14px_rgb(13_18_56/0.6)] backdrop-blur lg:hidden"
        >
          <a href={telHref} className={`${item} text-mist-50 ring-1 ring-mist-50/15`}>
            Call
          </a>
          <Link to="/contact" className={`${item} bg-plum-500 text-white`}>
            Enquire
          </Link>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
