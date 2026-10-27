export type Variant = 'accent' | 'navy' | 'outline' | 'outline-light' | 'light' | 'whatsapp'

// Each variant pairs a base colour with a hover colour that sweeps in from the
// left (a background-size transition) on a square-cornered button.
const variants: Record<Variant, string> = {
  accent:
    'bg-plum-500 text-white bg-linear-to-r from-navy-950 to-navy-950 shadow-[0_12px_28px_-12px_rgb(139_42_148/0.65)] hover:shadow-[0_14px_30px_-12px_rgb(13_18_56/0.5)]',
  navy: 'bg-navy-950 text-white bg-linear-to-r from-plum-500 to-plum-500',
  outline:
    'text-navy-950 ring-[1.5px] ring-inset ring-navy-950/80 bg-linear-to-r from-navy-950 to-navy-950 hover:text-white',
  'outline-light':
    'text-white ring-[1.5px] ring-inset ring-white/50 bg-linear-to-r from-white to-white hover:text-navy-950 hover:ring-white',
  light: 'bg-white text-navy-950 bg-linear-to-r from-plum-500 to-plum-500 hover:text-white',
  whatsapp:
    'bg-whatsapp text-navy-950 bg-linear-to-r from-whatsapp-dark to-whatsapp-dark shadow-[0_12px_28px_-14px_rgb(31_180_87/0.8)]',
}

export const buttonClass = (variant: Variant = 'navy', size: 'md' | 'lg' = 'md') =>
  `group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-sm font-display font-semibold whitespace-nowrap bg-no-repeat bg-left bg-size-[0%_100%] hover:bg-size-[100%_100%] transition-[background-size,color,box-shadow,transform] duration-500 ease-out-expo active:scale-[0.97] ${
    size === 'lg' ? 'min-h-14 px-7 text-[1.0625rem]' : 'min-h-11 px-5 text-[0.9375rem]'
  } ${variants[variant]}`
