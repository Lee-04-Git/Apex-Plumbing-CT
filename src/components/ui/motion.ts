/** Shared motion tokens. Timings follow UI/UX Pro Max presets (text: expo-out 0.5–0.9s; lists: ≤8 staggered children). */
export const ease = [0.22, 1, 0.36, 1] as const
export const expo = [0.16, 1, 0.3, 1] as const

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
export const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: expo } },
}

/** Delay for on-load animations so they start as the page fades in. */
export const PAGE_IN = 0.1

/** Tilted straight edges (viewBox 0 0 1440 60): `up` rises from left to right, `down` falls. */
export const slantPaths = { up: 'M0 60 L1440 0 V60 H0 Z', down: 'M0 0 L1440 60 H0 Z' } as const
