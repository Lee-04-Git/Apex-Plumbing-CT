import type { LucideIcon } from 'lucide-react'
import { Bath, Droplets, Flame, Gauge, ShowerHead, Waves, Wrench } from 'lucide-react'

/* ------------------------------------------------------------------
   Business + contact
   Every button and link that points at one of these updates when the value changes.
------------------------------------------------------------------- */

export const business = {
  name: 'Apex Plumbing CT',
  fullName: 'Apex Plumbing CT Cape Town',
  owner: 'Damien',
  instagram: 'https://www.instagram.com/apexplumbing.ct/',
  facebook: 'https://www.facebook.com/p/Apex-Plumbing-CT-100095090899342/',
}

export const contact = {
  email: 'apexplumbingct@gmail.com',
  phone: '+27 71 793 3414',
  phoneHref: 'tel:+27717933414',
  whatsappHref: 'https://wa.me/27717933414',
  location: 'Cape Town',
  address: ['8 Kings Road', 'Cape Town, 8005'],
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=8+Kings+Road%2C+Cape+Town%2C+8005',
}

/** WhatsApp link with a message already typed in. */
export const whatsappWith = (text: string) => `${contact.whatsappHref}?text=${encodeURIComponent(text)}`

/* ------------------------------------------------------------------
   Navigation
------------------------------------------------------------------- */

export type NavLeaf = { label: string; to: string; description?: string; icon?: LucideIcon }
export type NavGroup = { label: string; items: NavLeaf[] }
export type NavEntry = NavLeaf | NavGroup

export const isGroup = (e: NavEntry): e is NavGroup => 'items' in e

export const nav: NavEntry[] = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Our Work', to: '/our-work' },
]

export const footerLinks = {
  quick: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Our Work', to: '/our-work' },
    { label: 'Contact', to: '/contact' },
  ],
}

/* ------------------------------------------------------------------
   Services
------------------------------------------------------------------- */

export type Offer = { title: string; text: string; icon: LucideIcon; image?: string; alt?: string; to?: string }

export type ServiceKey = 'leak-detection' | 'pipe-repair' | 'leak-repair' | 'shower-install' | 'shower-repair' | 'tap-install' | 'tap-repair' | 'toilet-install' | 'toilet-repair' | 'water-heater' | 'geyser-install' | 'drain-cleaning' | 'outdoor-plumbing' | 'water-tank-install' | 'water-tank-repair'

export const services: (Offer & { key: ServiceKey; image: string; alt: string })[] = [
  {
    key: 'leak-detection',
    title: 'Plumbing Leak Detection',
    text: 'Professional leak detection services to identify hidden water leaks in your plumbing system.',
    icon: Droplets,
    image: '/images/dripping-tap.webp',
    alt: 'Water dripping from a tap',
  },
  {
    key: 'pipe-repair',
    title: 'Plumbing Pipe Repair',
    text: 'Expert repair of damaged, burst and leaking pipes for residential and commercial properties.',
    icon: Wrench,
    image: '/images/burst-pipe.webp',
    alt: 'Water spraying from a burst pipe joint',
  },
  {
    key: 'leak-repair',
    title: 'Plumbing Leak Repair',
    text: 'Fast and reliable leak repair services to stop water damage and reduce water waste.',
    icon: Wrench,
    image: '/images/plumber-pipes.webp',
    alt: 'Plumber repairing pipes',
  },
  {
    key: 'shower-install',
    title: 'Shower Installation',
    text: 'Professional shower installation services including all plumbing and fixtures.',
    icon: ShowerHead,
    image: '/images/shower-head.webp',
    alt: 'Showerhead with water running',
  },
  {
    key: 'shower-repair',
    title: 'Shower Repair',
    text: 'Repair services for leaking showers, broken valves and faulty shower fixtures.',
    icon: ShowerHead,
    image: '/images/bathroom-modern.webp',
    alt: 'Modern bathroom shower',
  },
  {
    key: 'tap-install',
    title: 'Tap Installation',
    text: 'Installation of kitchen and bathroom taps with expert plumbing work.',
    icon: Droplets,
    image: '/images/kitchen-tap.webp',
    alt: 'Chrome kitchen mixer tap',
  },
  {
    key: 'tap-repair',
    title: 'Tap Repair',
    text: 'Fixing dripping taps, replacing washers and repairing faulty tap mechanisms.',
    icon: Wrench,
    image: '/images/dripping-tap.webp',
    alt: 'Dripping tap fixture',
  },
  {
    key: 'toilet-install',
    title: 'Toilet Installation',
    text: 'Complete toilet installation including cistern, pan and all plumbing connections.',
    icon: Bath,
    image: '/images/dual-flush-toilet.webp',
    alt: 'Dual-flush button on toilet cistern',
  },
  {
    key: 'toilet-repair',
    title: 'Toilet Repair',
    text: 'Repair services for running toilets, faulty cisterns and blocked toilet systems.',
    icon: Wrench,
    image: '/images/bathroom-modern.webp',
    alt: 'Modern bathroom toilet',
  },
  {
    key: 'water-heater',
    title: 'Water Heater Installation',
    text: 'Installation of electric and gas water heaters with professional plumbing.',
    icon: Flame,
    image: '/images/geyser-bathroom.webp',
    alt: 'Wall-mounted water heater in bathroom',
  },
  {
    key: 'geyser-install',
    title: 'Geyser Installation',
    text: 'Professional geyser installation and replacement services for homes and businesses.',
    icon: Flame,
    image: '/images/geyser-bathroom.webp',
    alt: 'Wall-mounted electric geyser',
  },
  {
    key: 'drain-cleaning',
    title: 'Drain Cleaning',
    text: 'Professional drain cleaning to clear blockages and restore proper drainage.',
    icon: Waves,
    image: '/images/sink-drain.webp',
    alt: 'Close-up of a chrome sink drain',
  },
  {
    key: 'outdoor-plumbing',
    title: 'Outdoor Plumbing System Repair',
    text: 'Repair and maintenance of outdoor plumbing including pipes, taps and irrigation systems.',
    icon: Wrench,
    image: '/images/plumbing-fittings.webp',
    alt: 'Outdoor plumbing fittings and pipes',
  },
  {
    key: 'water-tank-install',
    title: 'Water Tank Installation',
    text: 'Installation of water storage tanks with all necessary plumbing connections.',
    icon: Gauge,
    image: '/images/water-meter.webp',
    alt: 'Water system installation',
  },
  {
    key: 'water-tank-repair',
    title: 'Water Tank Repair',
    text: 'Repair services for leaking water tanks and faulty tank connections.',
    icon: Wrench,
    image: '/images/plumber-tools-hands.webp',
    alt: 'Plumber with tools',
  },
]

export const whyChoose = [
  `Professional plumber ${business.owner} and a skilled team`,
  'Services for homes, flats and commercial buildings',
  'Reliable and professional plumbing work',
  'Cape Town based with local expertise',
]

/* ------------------------------------------------------------------
   About
------------------------------------------------------------------- */

/** About page cards. Images can be swapped for others at the same paths. */
export const whatWeDo: { text: string; icon: LucideIcon; image: string; alt: string }[] = [
  { text: 'Plumbing leak detection and repair', icon: Wrench, image: '/images/plumber-pipes.webp', alt: 'Plumber tightening a fitting on water pipes' },
  { text: 'Drain cleaning services', icon: Waves, image: '/images/sink-drain.webp', alt: 'Chrome sink drain' },
  { text: 'Geyser and water heater installations', icon: Flame, image: '/images/geyser-bathroom.webp', alt: 'Wall-mounted geyser in a bathroom' },
  { text: 'Water tank installations', icon: Gauge, image: '/images/water-meter.webp', alt: 'Water meter with valves and pipework' },
  { text: 'Shower and tap installations', icon: ShowerHead, image: '/images/kitchen-tap.webp', alt: 'Chrome kitchen mixer tap over a sink' },
  { text: 'Toilet installation and repair', icon: Bath, image: '/images/dual-flush-toilet.webp', alt: 'Dual-flush button on toilet' },
]

/* ------------------------------------------------------------------
   Customer reviews
------------------------------------------------------------------- */

export type Review = { quote: string; name: string; who: string }

export const reviews: Review[] = [
  {
    quote:
      'All PRAISE to DAMIEN who finally conquered our toilet woes. Over a month ago he did the entire install himself. I will never use another company again. NO more leaks, and GRRRRRRRREAT FLUSHES. He deserves more than 5 stars.',
    name: 'Annette Frerichs',
    who: 'Customer, Cape Town',
  },
  {
    quote:
      'Amazing 10/10 work done in my bathroom. Fixing of pipes and installing a toilet. I highly recommend professional plumber Damien for all your plumbing needs.',
    name: 'Colt Dwyer',
    who: 'Customer, Cape Town',
  },
  {
    quote:
      'After 12 years of searching, we are so relieved and grateful to have found the most amazing plumber - Damien at Apex Plumbing is excellent. Highly skilled, always reliable, efficient, knowledgeable, and incredibly fair and honest.',
    name: 'Gary Silbermann',
    who: 'Customer, Cape Town',
  },
  {
    quote:
      'I have relied on Damien and Apex Plumbing to fix a broken shower handle and to replace a leaking pipe in the roof. Damien and Team were prompt, professional, thorough and ultimately fixed the problem. They left the place neat and clean.',
    name: 'Kevin Neeson',
    who: 'Customer, Cape Town',
  },
]

/* Google reviews from Apex Plumbing CT */
export const googleReviews: { name: string; highlight: string; quote: string }[] = [
  { 
    name: 'Annette Frerichs', 
    highlight: 'All PRAISE to DAMIEN who finally conquered our toilet woes.', 
    quote: 'All PRAISE to DAMIEN who finally conquered our toilet woes. Over a month ago he did the entire install himself. I will never use another company again. NO more leaks, and GRRRRRRRREAT FLUSHES. He deserves more than 5 stars.' 
  },
  { 
    name: 'Colt Dwyer', 
    highlight: 'Amazing 10/10 work done in my bathroom.', 
    quote: 'Amazing 10/10 work done in my bathroom. Fixing of pipes and installing a toilet. I highly recommend professional plumber Damien for all your plumbing needs.' 
  },
  { 
    name: 'Gary Silbermann', 
    highlight: 'After 12 years of searching, we are so relieved and grateful to have found the most amazing plumber.', 
    quote: 'After 12 years of searching, we are so relieved and grateful to have found the most amazing plumber - Damien at Apex Plumbing is excellent. Highly skilled, always reliable, efficient, knowledgeable, and incredibly fair and honest. Thank you Damien. I cannot recommend this company highly enough!' 
  },
  { 
    name: 'Kevin Neeson', 
    highlight: 'Damien and Team were prompt, professional, thorough and ultimately fixed the problem.', 
    quote: 'I have relied on Damien and Apex Plumbing to fix a broken shower handle and to replace a leaking pipe in the roof. Damien and Team were prompt, professional, thorough and ultimately fixed the problem. They left the place neat and clean. I would highly recommend Apex Plumbing and will use them again in the future.' 
  },
  { 
    name: 'Keri-Ann Passmore', 
    highlight: 'I honestly couldn\'t be happier with the service I got from Apex Plumbing Cape Town.', 
    quote: 'I honestly couldn\'t be happier with the service I got from Apex Plumbing Cape Town. Damien and his colleague Darren were brilliant. I had a pipe leak in my ceiling on Sunday and Damien even offered to come out that same afternoon if things got worse. Highly professional service!' 
  },
  { 
    name: 'Anong Boonruenganan', 
    highlight: 'He was professional and took great care to ensure everything was done neatly.', 
    quote: 'I recently used Damien to repair a leaking toilet. He was professional and took great care to ensure everything was done neatly. His pricing was very reasonable, and I would highly recommend him to anyone.' 
  },
  { 
    name: 'Louise Reister', 
    highlight: 'He answers your call straight away, even on weekends.', 
    quote: 'Highly recommend Damien from Apex Plumbing. He answers your call straight away, even on weekends and makes sure your plumbing problem is sorted. I\'ve used him on a number of occasions and he is very consistent and reliable and will continue to use him and refer him to others.' 
  },
  { 
    name: 'Nizam Biscombe', 
    highlight: 'Reliability and good workmanship, 100%!', 
    quote: 'Reliability and good workmanship, 100%! A professional gentleman to work with. He did all our emergency plumbing work timeously both, home and business, to our entire satisfaction. Will definitely recommend Damien!' 
  },
  { 
    name: 'Maris', 
    highlight: 'Fast, common sense, affordable, no stories, easy solutions.', 
    quote: 'All 5 stars for this guy! Fast, common sense, affordable, no stories, easy solutions. We used him for our guest house. I have had some very mediocre experiences with these sort of services. Damien is a breath of fresh air and I wish I could find a Handyman and electrician with the same work ethic. HIGHLY RECOMMEND HIM!' 
  },
  { 
    name: 'Eon Janse Van Vuuren', 
    highlight: 'Damien was legendary!', 
    quote: 'Damien was legendary! He sorted a leak out for us when we drilled into a water pipe. Fast efficient and clean. What a legend! Will recommend him anytime.' 
  },
  { 
    name: 'Thomas Sugden', 
    highlight: 'Damien and the team are top notch.', 
    quote: 'Damien and the team are top notch, no problem is unsolvable and the prices are fair and consistent.' 
  },
  { 
    name: 'Johanci Bingle', 
    highlight: 'Damien is honest and reliable!', 
    quote: 'Damien is honest and reliable! He communicates well and will find solutions when problems arise. He will also go the extra mile in sourcing materials and products, should you need that.' 
  },
  { 
    name: 'Rene Niske', 
    highlight: 'Great service, quick response and super professional.', 
    quote: 'Damien connected my new dishwasher, sorted out my blocked drain and toilets. Great service, quick response and super professional. Very happy and would highly recommend him!' 
  },
  { 
    name: 'Customer Review', 
    highlight: 'He replaced our geyser and a number of other adhoc plumbing requirements.', 
    quote: 'High praise for Damien and the team from Apex. He replaced our geyser and a number of other adhoc plumbing requirements, all well executed with accompanying professional CoC docs, great service and well priced.' 
  },
]

/** Home page strip: short words from the reviews, each with its source. */
export const reasons: { short: string; text: string }[] = [
  { short: 'Reliable', text: '"Always reliable" — Gary Silbermann' },
  { short: 'Professional', text: '"Prompt and professional" — Kevin Neeson' },
  { short: 'Honest', text: '"Fair and honest" — Gary Silbermann' },
]

/* ------------------------------------------------------------------
   Water-saving tips (home page rail). General guidance, not service claims.
------------------------------------------------------------------- */

export type Tip = { title: string; text: string; area: string }

export const tips: Tip[] = [
  { title: 'Fix dripping taps early', text: 'A steady drip wastes more water than you\'d think — usually a worn washer or cartridge.', area: 'Taps' },
  { title: 'Check your meter for hidden leaks', text: 'Close every tap and note the meter. If it moves within an hour, something is leaking.', area: 'Leaks' },
  { title: 'Test the toilet cistern', text: 'Add food colouring to the cistern. Colour in the bowl without flushing means a leak.', area: 'Toilets' },
  { title: 'Use the half flush', text: 'On a dual-flush toilet, the smaller button uses less water. Use it when it does the job.', area: 'Toilets' },
  { title: 'Fit an efficient showerhead', text: 'Water-efficient showerheads reduce the flow while still giving a comfortable shower.', area: 'Showers' },
  { title: 'Add tap aerators', text: 'Aerators mix air into the stream, cutting the flow at basins and sinks.', area: 'Taps' },
  { title: 'Insulate hot-water pipes', text: 'Lagging geyser pipes keeps water hot on the way, so less runs to waste while you wait.', area: 'Geysers' },
  { title: 'Know where your stopcock is', text: 'If a pipe bursts, shutting off the main supply quickly limits damage and water loss.', area: 'Pipes' },
]

/* ------------------------------------------------------------------
   Our Work — the kinds of jobs we take on.
------------------------------------------------------------------- */

export type WorkCategory = 'Repairs' | 'Drains' | 'Geysers' | 'Water tanks' | 'Installations' | 'Outdoor'

export const workCategories: WorkCategory[] = ['Repairs', 'Drains', 'Geysers', 'Water tanks', 'Installations', 'Outdoor']

export const work: { title: string; text: string; category: WorkCategory; service: ServiceKey; image: string; alt: string }[] = [
  {
    title: 'Leak detection & repair',
    text: 'Finding and fixing leaks to prevent water damage and waste.',
    category: 'Repairs',
    service: 'leak-detection',
    image: '/images/dripping-tap.webp',
    alt: 'Dripping tap fixture',
  },
  {
    title: 'Pipe repairs',
    text: 'Repairing or replacing burst and damaged pipes.',
    category: 'Repairs',
    service: 'pipe-repair',
    image: '/images/burst-pipe.webp',
    alt: 'Water spraying from a burst pipe joint',
  },
  {
    title: 'Tap repairs',
    text: 'Fixing dripping taps and replacing worn washers and cartridges.',
    category: 'Repairs',
    service: 'tap-repair',
    image: '/images/dripping-tap.webp',
    alt: 'Dripping tap fixture',
  },
  {
    title: 'Toilet repairs',
    text: 'Repairing running toilets, faulty cisterns and blocked systems.',
    category: 'Repairs',
    service: 'toilet-repair',
    image: '/images/dual-flush-toilet.webp',
    alt: 'Toilet cistern',
  },
  {
    title: 'Shower repairs',
    text: 'Fixing leaking showers, broken valves and faulty fixtures.',
    category: 'Repairs',
    service: 'shower-repair',
    image: '/images/shower-head.webp',
    alt: 'Showerhead',
  },
  {
    title: 'Drain cleaning',
    text: 'Clearing blocked drains and fixing what caused the blockage.',
    category: 'Drains',
    service: 'drain-cleaning',
    image: '/images/sink-drain.webp',
    alt: 'Close-up of a chrome sink drain',
  },
  {
    title: 'Geyser installations',
    text: 'Installing new geysers and water heaters with professional setup.',
    category: 'Geysers',
    service: 'geyser-install',
    image: '/images/geyser-bathroom.webp',
    alt: 'Bathroom with a wall-mounted electric geyser',
  },
  {
    title: 'Water heater installations',
    text: 'Professional installation of electric and gas water heaters.',
    category: 'Geysers',
    service: 'water-heater',
    image: '/images/geyser-bathroom.webp',
    alt: 'Wall-mounted water heater',
  },
  {
    title: 'Shower installations',
    text: 'Complete shower installations including all plumbing and fixtures.',
    category: 'Installations',
    service: 'shower-install',
    image: '/images/shower-head.webp',
    alt: 'Showerhead with water running',
  },
  {
    title: 'Tap installations',
    text: 'Installing kitchen and bathroom taps with expert plumbing.',
    category: 'Installations',
    service: 'tap-install',
    image: '/images/kitchen-tap.webp',
    alt: 'Chrome kitchen mixer tap',
  },
  {
    title: 'Toilet installations',
    text: 'Complete toilet installations including cistern and all connections.',
    category: 'Installations',
    service: 'toilet-install',
    image: '/images/dual-flush-toilet.webp',
    alt: 'Close-up of a dual-flush button on a white toilet cistern',
  },
  {
    title: 'Bathroom plumbing',
    text: 'Full bathroom plumbing installations and renovations.',
    category: 'Installations',
    service: 'shower-install',
    image: '/images/bathroom-modern.webp',
    alt: 'Modern bathroom',
  },
  {
    title: 'Water tank installations',
    text: 'Installing water storage tanks with all necessary plumbing connections.',
    category: 'Water tanks',
    service: 'water-tank-install',
    image: '/images/water-meter.webp',
    alt: 'Water system installation',
  },
  {
    title: 'Water tank repairs',
    text: 'Repairing leaking tanks and faulty connections.',
    category: 'Water tanks',
    service: 'water-tank-repair',
    image: '/images/plumber-tools-hands.webp',
    alt: 'Plumber with tools',
  },
  {
    title: 'Outdoor plumbing repairs',
    text: 'Repair and maintenance of outdoor plumbing systems and pipes.',
    category: 'Outdoor',
    service: 'outdoor-plumbing',
    image: '/images/plumbing-fittings.webp',
    alt: 'Outdoor plumbing fittings and pipes',
  },
  {
    title: 'Emergency plumbing',
    text: 'Fast response to plumbing emergencies and burst pipes.',
    category: 'Repairs',
    service: 'pipe-repair',
    image: '/images/burst-pipe.webp',
    alt: 'Emergency pipe repair',
  },
]

/* ------------------------------------------------------------------
   Contact form
------------------------------------------------------------------- */

export const contactServices: { value: string; label: string }[] = [
  ...services.map((s) => ({ value: s.key, label: s.title })),
  { value: 'other', label: 'Something else' },
]

export const contactMethods = ['Phone call', 'WhatsApp', 'Email'] as const
