/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT: edit this file to update the website.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every business detail shown on the site lives here. Sources:
 *   • "FB flyer": the business's own services flyer posted on Facebook (Mar 2026)
 *   • "FB posts": captions and photos from the business's Facebook timeline
 *   • "listing": a public business directory listing
 *  Values marked `confirmed: false` still need the owner's confirmation (not shown on the site).
 */

export type ServiceId = 'geysers' | 'leaks' | 'bathrooms'

/** Responsive widths produced by scripts/optimize-images.mjs for job photos */
export const WORK_WIDTHS = [480, 800, 1200]
export type Img = { base: string; alt: string; position?: string }
const work = (name: string, alt: string, position?: string): Img => ({ base: `/images/work/${name}`, alt, position })

export const site = {
  name: 'Apex Plumbing CT',
  /** The business's own words on its ProCompare profile (Oct 2026). */
  description: 'We deal with all sorts of plumbing issues, from noisy pipes to full-on renovations.',
  tagline: 'At the top of our game', // ProCompare profile
  /** The business's own words in its Aug 2026 Facebook post. Confirm before launch. */
  team: { text: 'trade tested plumbers', confirmed: false },

  logo: {
    /** The Apex droplet from the Facebook profile, cut out to transparent PNGs by `npm run images`. */
    color: '/images/logo-color.png',
    light: '/images/logo-light.png',
  },

  /**
   * The plumber customers name in their reviews. Photo supplied by the client
   * (assets/source/damian.png + damian-mask.png), cut out by `npm run images` at these widths.
   */
  owner: {
    name: 'Damien',
    photo: { base: '/images/team/damian', widths: [560, 1120], width: 1119, height: 1405 },
  },

  /** Primary business number, confirmed (Oct 2026). */
  phone: { display: '071 793 3414', international: '+27 71 793 3414', tel: '+27717933414', confirmed: true },

  /**
   * Named contacts as printed on the FB flyer. Not shown on the site: the client asked for a
   * single contact number. Kept here for reference.
   */
  contacts: [
    { name: 'Main', display: '071 793 3414', tel: '+27717933414' },
  ],

  /** WhatsApp on the business number, in international format for wa.me links. Confirmed by the client. */
  whatsapp: { number: '27717933414', confirmed: true },

  /** Business email address. */
  email: { address: 'apexplumbingct@gmail.com', confirmed: true },

  /** Instagram profile. */
  instagram: { url: 'https://www.instagram.com/apexplumbing.ct/', handle: '@apexplumbing.ct' },

  facebook: {
    url: 'https://www.facebook.com/p/Apex-Plumbing-CT-100095090899342/',
    followers: 840,
    followersCheckedOn: 'October 2026',
  },

  /** LinkedIn profile. */
  linkedin: {
    url: 'https://za.linkedin.com/in/apex-plumbing-ct-3744b728b',
    confirmed: true,
  },

  location: {
    suburb: 'Sea Point',
    area: "Cape Town",
    city: 'Cape Town',
    province: 'Western Cape',
    /** From a business listing. Hidden until the owner confirms it should be public. */
    street: 'Nile Way',
    postalCode: '7785',
    showStreetAddress: false,
  },

  serviceArea: { label: "Cape Town & surrounding areas", confirmed: false },

  /** Unknown: add e.g. [{ days: 'Mon – Fri', time: '08:00 – 17:00' }] once confirmed. */
  hours: null as { days: string; time: string }[] | null,
}

const stock = (name: string, alt: string, position?: string): Img => ({ base: `/images/home/${name}`, alt, position })

/**
 * The three core services. Sources: the business's Google listing (leak detection, pipe and leak
 * repair, shower, tap and toilet installation and repair, geyser and water heater installation),
 * its About text (water leak detection, turnkey bathroom renovations, electrical and solar geyser
 * installations) and its ProCompare profile. Photos are professional stock (free Unsplash License,
 * see README) until the business's own photos are added.
 */
export const services: {
  id: ServiceId
  title: string
  short: string
  body: string
  detail: string
  /** What the service covers: only items from the sources above. */
  includes: string[]
  image: Img
  /** Smaller second photo shown overlapping the main one on the Services page. */
  inset: Img
}[] = [
  {
    id: 'geysers',
    title: 'Geysers & Water Heaters',
    short: 'Geysers',
    body: 'Installation and replacement of electric and solar geysers and water heaters, for homes and businesses.',
    detail:
      'Tell us about your current geyser and where it’s installed, and the job can be assessed and quoted before any work starts.',
    includes: [
      'Electric geyser installations',
      'Solar geyser installations',
      'Geyser replacements',
      'Water heater installations',
    ],
    image: stock('electrical-geyser', 'Plumber tightening a fitting on an electric geyser with a wrench', '50% 40%'),
    inset: stock('solar-geyser', 'Solar geyser tanks and flat-panel collectors on a rooftop', '70% 75%'),
  },
  {
    id: 'leaks',
    title: 'Leak Detection & Pipe Repairs',
    short: 'Leaks & pipes',
    body: 'Finding hidden water leaks and repairing damaged, burst and leaking pipes before they cause more damage.',
    detail:
      'If your water bill has jumped, or you can hear water running when everything is off, leak detection can track down where it’s going.',
    includes: ['Water leak detection', 'Leak repairs', 'Burst and damaged pipe repairs', 'Noisy pipes'],
    image: stock('plumbing-maintenance', 'Plumber fitting a waste pipe under a basin', '38% 60%'),
    inset: stock('copper-pipework', 'Two neatly run copper pipes in an opened wall', '50% 45%'),
  },
  {
    id: 'bathrooms',
    title: 'Bathrooms, Taps & Toilets',
    short: 'Bathrooms',
    body: 'Turnkey bathroom renovations, plus installing and repairing showers, taps and toilets.',
    detail: 'From a leaking cistern to a full bathroom renovation, the job is assessed and quoted first.',
    includes: [
      'Turnkey bathroom renovations',
      'Shower installation and repairs',
      'Tap installation and repairs',
      'Toilet installation and repairs',
    ],
    image: stock('modern-bathroom', 'Modern bathroom with a glass shower, vanity and wooden floor', '50% 50%'),
    inset: stock('bathroom-renovation', 'Renovated bathroom with a glass shower, marble tiles and brass fittings', '40% 55%'),
  },
]

/**
 * Other services. Sources: the Google listing (drain cleaning, outdoor plumbing system repair, water
 * tank installation and repair), a customer review (emergency plumbing), the About text (residential
 * and commercial properties, comprehensive plumbing maintenance).
 */
export const moreServices: { title: string; text: string }[] = [
  { title: 'Drain cleaning', text: 'Clearing blocked drains so water runs away freely again.' },
  { title: 'Outdoor plumbing', text: 'Repairs and maintenance of outdoor pipes, taps and plumbing systems.' },
  { title: 'Water tanks', text: 'Installing water storage tanks with their plumbing connections, and repairing leaking tanks.' },
  { title: 'Emergency plumbing', text: 'Urgent plumbing problems, from burst pipes to major leaks.' },
  { title: 'Commercial plumbing', text: 'Plumbing work for commercial properties as well as homes.' },
  { title: 'General maintenance', text: 'Everyday plumbing maintenance to keep your water systems safe and working.' },
]

/** Photos for the home-page "Why call Apex" cards (free Unsplash License; see README). */
export const homeImages: Record<'renovation' | 'communication' | 'workmanship', Img> = {
  renovation: stock('bathroom-renovation', 'Renovated bathroom with a glass shower, marble tiles and brass fittings', '40% 55%'),
  communication: stock('phone-call', 'Close-up of hands holding a smartphone', '55% 50%'),
  workmanship: stock('copper-pipework', 'Two neatly run copper pipes in an opened wall', '50% 45%'),
}

export type Project = {
  slug: string
  title: string
  place: string
  date: string
  category: 'Solar geysers' | 'Electric geysers' | 'Repairs & maintenance' | 'Bathrooms' | 'Water supply'
  summary: string
  images: Img[]
}

/** Jobs posted on the business's Facebook page. Photos are the business's own. */
export const projects: Project[] = [
  {
    slug: 'solar-maitland',
    title: 'Solar geyser replacement',
    place: 'Maitland',
    date: 'Aug 2026',
    category: 'Solar geysers',
    summary: 'Evacuated-tube solar geysers on a commercial rooftop, with Table Mountain in the background.',
    images: [
      work(
        'solar-maitland-01',
        'Row of evacuated-tube solar geysers on a rooftop with Table Mountain behind',
        '50% 30%',
      ),
      work('solar-maitland-02', 'Solar geyser tank mounted on a steel stand'),
      work('solar-maitland-03', 'Close-up of a solar geyser element and thermostat'),
    ],
  },
  {
    slug: 'solar-diepriver',
    title: 'Solar geyser installation',
    place: 'Diep River',
    date: 'Sep 2025',
    category: 'Solar geysers',
    summary: 'A flat-panel solar geyser installed on a tiled roof.',
    images: [
      work('solar-diepriver-01', 'Flat-panel solar geyser on a tiled roof under a blue sky'),
      work('solar-diepriver-02', 'Solar geyser tank and panel seen from above the roofline'),
    ],
  },
  {
    slug: 'geyser-relocation',
    title: 'Geyser relocation & installation',
    place: "Sea Point, Cape Town",
    date: 'Apr 2025',
    category: 'Electric geysers',
    summary: 'A 150 litre electric geyser installed on an outside wall, with new copper pipework and element wiring.',
    images: [
      work('geyser-relocation-01', 'Electric geyser on an outside wall with copper pipework', '50% 40%'),
      work('geyser-relocation-02', 'Close-up of the geyser element and thermostat wiring'),
    ],
  },
  {
    slug: 'solar-surrey',
    title: 'Electric-to-solar conversion',
    place: 'Surrey Estate',
    date: 'Apr 2025',
    category: 'Solar geysers',
    summary:
      'Conversion of an existing electric geyser to a solar system, including a solar panel, pump system and Geyserwise control unit.',
    images: [
      work('solar-surrey-01', 'Flat solar collector panel on a slate roof'),
      work('solar-surrey-02', 'Geyserwise controller wiring'),
    ],
  },
  {
    slug: 'bathroom-showcase',
    title: 'Bathroom renovation',
    place: 'Plattekloof',
    date: 'Oct 2025',
    category: 'Bathrooms',
    summary: 'A modern bathroom with a wall-hung toilet, compact basin and a walk-in rain shower.',
    images: [
      work('bathroom-showcase-02', 'Walk-in shower with ceiling rain head and large-format tiles'),
      work('bathroom-showcase-01', 'Wall-hung toilet and compact basin'),
    ],
  },
  {
    slug: 'bathroom-clawfoot',
    title: 'Bathroom renovation & master box',
    place: 'Kuils River',
    date: 'Apr 2025',
    category: 'Bathrooms',
    summary:
      'A completed bathroom renovation with a master box installed: clawfoot bath, brass mixer and a black subway-tile shower.',
    images: [
      work('bathroom-clawfoot-01', 'Clawfoot bath with brass taps beside a feature tile niche'),
      work('bathroom-clawfoot-02', 'Shower with black subway tiles and a brass rain head'),
    ],
  },
  {
    slug: 'jojo-tanks',
    title: 'JoJo tank feed & supply lines',
    place: 'Tokai',
    date: 'Apr 2025',
    category: 'Water supply',
    summary: 'Feed and supply lines completed for a bank of JoJo tanks, with Table Mountain in view.',
    images: [
      work('jojo-tanks-01', 'Blue supply pipes running along a gabion wall towards water tanks, Table Mountain behind'),
      work('jojo-tanks-02', 'Pipe junction on a gabion wall'),
    ],
  },
  {
    slug: 'burst-seapoint',
    title: 'Burst pipe repair',
    place: 'Sea Point',
    date: 'Apr 2025',
    category: 'Repairs & maintenance',
    summary: 'An underground burst pipe excavated and repaired in Sea Point.',
    images: [
      work('burst-portlands-01', 'New flexible supply pipe being connected in an excavated trench'),
      work('burst-portlands-02', 'Excavated area beside a house where the burst pipe was found'),
    ],
  },
  {
    slug: 'burst-morgans',
    title: 'Burst pipe repair',
    place: "Morgan's Village",
    date: 'Apr 2025',
    category: 'Repairs & maintenance',
    summary: 'Trench dug along a wall to reach and replace a burst supply pipe.',
    images: [work('burst-morgans-01', 'Trench along a wall exposing a water supply pipe')],
  },
  {
    slug: 'water-meters',
    title: 'Smart water installation',
    place: 'Salt River',
    date: 'Aug 2026',
    category: 'Water supply',
    summary: 'Smart water meters installed in a meter cabinet.',
    images: [work('water-meters-saltriver-01', 'Two smart water meters installed in a meter cabinet')],
  },
  {
    slug: 'gas-geyser',
    title: 'Gas geyser installation',
    place: 'Tafelsig',
    date: 'Apr 2025',
    category: 'Repairs & maintenance',
    summary: 'A wall-mounted gas geyser installed with neat external pipe runs.',
    images: [work('gas-geyser-tafelsig-01', 'Wall-mounted gas geyser with pipes running down an exterior wall')],
  },
  {
    slug: 'outdoor-sink',
    title: 'Outdoor double sink',
    place: 'Elsies River',
    date: 'May 2025',
    category: 'Repairs & maintenance',
    summary: 'A steel double-bowl outdoor sink plumbed with supply and drainage.',
    images: [work('outdoor-sink-01', 'Outdoor stainless steel double sink with drainage pipes')],
  },
  {
    slug: 'kitchen-tap',
    title: 'Kitchen mixer tap replacement',
    place: 'Rocklands',
    date: 'Apr 2025',
    category: 'Repairs & maintenance',
    summary: 'A new kitchen mixer tap fitted to a stainless steel sink.',
    images: [work('kitchen-tap-rocklands-01', 'New chrome mixer tap on a stainless steel kitchen sink')],
  },
  {
    slug: 'float-valve',
    title: 'Float valve & basin taps replaced',
    place: 'Kuils River',
    date: 'May 2025',
    category: 'Repairs & maintenance',
    summary: 'A bottom-inlet float valve and basin taps replaced.',
    images: [work('float-valve-01', 'Inside of a toilet cistern with a new float valve')],
  },
]


/**
 * Customer reviews, kept faithful to the supplied material. Each showed a
 * five-star rating. Theo Oliver's review was truncated, so only its visible
 * content is summarised (and labelled as a summary).
 */
export const reviews: {
  name: string
  rating: number
  text: string
  kind: 'quote' | 'summary'
  topic?: string
  timeAgo?: string
}[] = [
  {
    name: 'Annette Frerichs',
    rating: 5,
    kind: 'quote',
    text: 'All PRAISE to DAMIEN who finally conquered our toilet woes. I will never use another company again. NO more leaks, and GREAT FLUSHES. He deserves more than 5 stars.',
    timeAgo: '3 months ago',
  },
  {
    name: 'Colt Dwyer',
    rating: 5,
    kind: 'quote',
    topic: 'Bathroom work',
    text: 'Amazing 10/10 work done in my bathroom. Fixing of pipes and installing a toilet. I highly recommend professional plumber Damien for all your plumbing needs.',
    timeAgo: 'a year ago',
  },
  {
    name: 'Kevin Neeson',
    rating: 5,
    kind: 'quote',
    text: 'Damien and Team were prompt, professional, thorough and ultimately fixed the problem. They left the place neat and clean. I would highly recommend Apex Plumbing.',
    timeAgo: 'a year ago',
  },
  {
    name: 'Anong Boonruenganan',
    rating: 5,
    kind: 'quote',
    text: 'I recently used Damien to repair a leaking toilet. He was professional and took great care to ensure everything was done neatly. His pricing was very reasonable.',
    timeAgo: 'a year ago',
  },
  {
    name: 'Louise Reister',
    rating: 5,
    kind: 'quote',
    text: "Highly recommend Damien from Apex Plumbing. He answers your call straight away, even on weekends. Very consistent and reliable.",
    timeAgo: 'a year ago',
  },
  {
    name: 'Nizam Biscombe',
    rating: 5,
    kind: 'quote',
    text: 'Reliability and good workmanship, 100%! A professional gentleman to work with. He did all our emergency plumbing work to our entire satisfaction.',
    timeAgo: 'a year ago',
  },
]

export type BannerKey = 'home' | 'about' | 'services' | 'showcase' | 'contact'

/** Widths produced for page banners by scripts/optimize-images.mjs */
export const BANNER_WIDTHS = [960, 1600]

/**
 * Background banner at the top of each page. The images are made by `npm run images` from the
 * job photos listed in BANNERS (scripts/optimize-images.mjs). To use your own artwork, such as an
 * AI-generated image, save it as assets/source/banners/<page>.jpg, re-run `npm run images`, and
 * update the alt text here.
 */
export const banners: Record<BannerKey, Img> = {
  /** Sea Point from Lion's Head. Photo: Brent Ninaber on Unsplash (free Unsplash License). */
  home: { base: '/images/banners/home', alt: 'Sea Point and the Atlantic coastline seen from Lion’s Head', position: '40% 50%' },
  /** Bantry Bay and Sea Point at golden hour. Photo: Tim Johnson on Unsplash (free Unsplash License). */
  about: { base: '/images/banners/about', alt: 'Apartment blocks above the rocky Atlantic coastline near Sea Point at sunset', position: '50% 65%' },
  /** Plumber at work in a modern bathroom. Photo: Unsplash (free Unsplash License). */
  services: { base: '/images/banners/services', alt: 'Plumber in overalls with a toolbox, working in a modern bathroom', position: '70% 40%' },
  showcase: { base: '/images/banners/showcase', alt: 'Renovated bathroom with a clawfoot bath and brass taps' },
  /** Chrome kitchen mixer tap with water splashing into a glass. Photo: Unsplash (free Unsplash License). */
  contact: { base: '/images/banners/contact', alt: 'Chrome kitchen mixer tap with water splashing into a glass', position: '65% 50%' },
}

export type BackgroundKey =
  | 'footer'
  | 'services-overview'
  | 'services-how'
  | 'services-more'
  | 'about-values'
  | 'about-process'
  | 'home-services'
  | 'contact-form'

/** Widths produced for faint backgrounds by scripts/optimize-images.mjs */
export const BACKGROUND_WIDTHS = [960, 1600]

/**
 * Photos shown very faintly (duotone, low opacity) behind the footer and some sections. They are
 * decorative, so they have no alt text. To use an official photo from the Apex Facebook page, save
 * it as assets/source/backgrounds/<key>.jpg and run `npm run images`; until then a job photo
 * stands in (see BACKGROUNDS in scripts/optimize-images.mjs). `position` sets the framing.
 */
export const backgrounds: Record<BackgroundKey, { base: string; position?: string }> = {
  footer: { base: '/images/backgrounds/footer', position: '50% 55%' },
  'services-overview': { base: '/images/backgrounds/services-overview', position: '50% 30%' },
  'services-how': { base: '/images/backgrounds/services-how' },
  'services-more': { base: '/images/backgrounds/services-more' },
  'about-values': { base: '/images/backgrounds/about-values', position: '50% 50%' },
  'about-process': { base: '/images/backgrounds/about-process', position: '40% 50%' },
  'home-services': { base: '/images/backgrounds/home-services', position: '50% 40%' },
  /** Brushed-steel designer tap over a white basin. Photo: Unsplash (free Unsplash License). */
  'contact-form': { base: '/images/backgrounds/contact-form', position: '0% 40%' },
}

export const navLinks = [
  { path: '/', label: 'Home', title: 'Plumber in Sea Point, Cape Town' },
  { path: '/about', label: 'About Us', title: 'About Us' },
  { path: '/services', label: 'Services', title: 'Geyser Installations & Plumbing Services' },
  { path: '/contact', label: 'Contact', title: 'Contact Us' },
] as const

export type NavPath = (typeof navLinks)[number]['path']
