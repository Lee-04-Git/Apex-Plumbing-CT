import clsx from 'clsx'

/**
 * The Apex Plumbing CT logo with business name.
 * Logo icon + "Apex Plumbing" text styled to match the design system.
 */
export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; compact?: boolean; className?: string }) {
  const light = tone === 'light'
  return (
    <span className={clsx('inline-flex items-center gap-3', className)}>
      <img
        src="/images/apex-logo.webp"
        alt=""
        width={400}
        height={394}
        decoding="async"
        draggable={false}
        className={clsx('w-auto select-none', light ? 'h-8' : 'h-9')}
      />
      <span className={clsx('flex flex-col leading-none')}>
        <span className={clsx('text-[1.15rem] font-bold tracking-tight', light ? 'text-paper' : 'text-ink')}>
          Apex Plumbing
        </span>
        <span className={clsx('mono text-[0.65rem] font-medium tracking-wide', light ? 'text-marigold' : 'text-teal')}>
          CAPE TOWN
        </span>
      </span>
    </span>
  )
}
