import loungeChairsImg from '../assets/images/femelia_real_1.jpg';
import femeliaRingFloralImg from '../assets/images/femelia_real_2.jpg';
import rubyManiPediImg from '../assets/images/femelia_real_3.jpg';
import rosePedicureExperienceImg from '../assets/images/femelia_real_4.jpg';
import frenchHandsPairImg from '../assets/images/femelia_real_5.jpg';
import frenchCloseUpImg from '../assets/images/femelia_real_6.jpg';
import citrusJellyBathImg from '../assets/images/femelia_real_7.jpg';
import rosePetalBathImg from '../assets/images/femelia_real_8.jpg';
import spaBasinRitualImg from '../assets/images/femelia_real_9.jpg';
import espressoSwirlNailsImg from '../assets/images/femelia_real_10.jpg';

export type ServiceCategory =
  | 'All'
  | 'Nails & Extensions'
  | 'Spa & Jelly Pedicure'
  | 'Lashes & Brows'
  | 'Henna Art';

export interface SalonService {
  id: string;
  name: string;
  category: Exclude<ServiceCategory, 'All'>;
  durationMin: number;
  price: number;
  description: string;
  finishNote: string;
  masterIds: string[];
}

export interface SalonMaster {
  id: string;
  name: string;
  firstName: string;
  role: string;
  focusTag: string;
  specialty: string;
  bio: string;
  image: string;
  imagePosition?: string;
  categories: Exclude<ServiceCategory, 'All'>[];
}

export interface GalleryLook {
  id: string;
  title: string;
  category: 'Nails' | 'Spa Pedicure' | 'Lounge';
  image: string;
  imagePosition?: string;
  caption: string;
  serviceId: string;
  masterId: string;
}

export interface ClientTestimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
  servicePerformed: string;
  outcome: string;
}

export const CURRENCY = 'AED';

export function formatAed(amount: number): string {
  return `AED ${amount.toLocaleString('en-AE')}`;
}

/**
 * 100% authentic photography from Femelia Beauty Lounge (Al Jiwa Street, Al Nahyan, Abu Dhabi)
 */
export const SALON_IMAGES = {
  loungeChairs: loungeChairsImg,
  femeliaRingFloral: femeliaRingFloralImg,
  rubyManiPedi: rubyManiPediImg,
  rosePedicureExperience: rosePedicureExperienceImg,
  frenchHandsPair: frenchHandsPairImg,
  frenchCloseUp: frenchCloseUpImg,
  citrusJellyBath: citrusJellyBathImg,
  rosePetalBath: rosePetalBathImg,
  spaBasinRitual: spaBasinRitualImg,
  espressoSwirlNails: espressoSwirlNailsImg,
} as const;

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'All',
  'Nails & Extensions',
  'Spa & Jelly Pedicure',
  'Lashes & Brows',
  'Henna Art',
];

export const SALON_SERVICES: SalonService[] = [
  {
    id: 'russian-gel-manicure',
    name: 'Signature Russian Gel Manicure',
    category: 'Nails & Extensions',
    durationMin: 75,
    price: 155,
    description:
      'Detailed dry cuticle refinement, structured leveling base, and glossy under-the-cuticle gel polish crafted for long, chip-free wear.',
    finishNote: 'Incl. 5% VAT · Clean cuticle finish',
    masterIds: ['hazel', 'aisha'],
  },
  {
    id: 'french-gel-manicure',
    name: 'Classic French Tip Gel Manicure',
    category: 'Nails & Extensions',
    durationMin: 80,
    price: 175,
    description:
      'Sheer natural blush base paired with hand-painted crisp white smile lines and a high-shine sealed topcoat.',
    finishNote: 'As featured in our Al Nahyan portfolio',
    masterIds: ['hazel', 'aisha'],
  },
  {
    id: 'biab-hard-gel',
    name: 'BIAB / Structured Hard Gel Overlay',
    category: 'Nails & Extensions',
    durationMin: 90,
    price: 200,
    description:
      'Feather-light builder-in-a-bottle reinforcement engineered to protect natural nail length with a balanced, natural apex.',
    finishNote: 'Ideal for strengthening natural nails',
    masterIds: ['hazel'],
  },
  {
    id: 'sculpted-nail-extensions',
    name: 'Bespoke Nail Extensions & Custom Art',
    category: 'Nails & Extensions',
    durationMin: 120,
    price: 280,
    description:
      'Custom almond, coffin, or oval extensions sculpted for weightless comfort—finished with floral detailing, espresso swirls, or sheer gloss.',
    finishNote: 'Precision shaping & gentle cuticle prep',
    masterIds: ['hazel', 'aisha'],
  },
  {
    id: 'classic-manicure',
    name: 'Classic Manicure & Polish',
    category: 'Nails & Extensions',
    durationMin: 45,
    price: 75,
    description:
      'Precision shaping, gentle cuticle care, nourishing hand massage, and classic glossy lacquer or bare buff finish.',
    finishNote: 'Incl. 5% VAT · Everyday refinement',
    masterIds: ['aisha', 'hazel'],
  },
  {
    id: 'rose-petal-spa-pedicure',
    name: 'Signature Rose Petal Botanical Spa Pedicure',
    category: 'Spa & Jelly Pedicure',
    durationMin: 75,
    price: 210,
    description:
      'Warm rose-petal infusion soak in our stone basins, pink Himalayan salt & botanical sugar scrub exfoliation, cuticle refinement, and gel or classic polish.',
    finishNote: 'Velvet wingback suite · Botanical ritual tray',
    masterIds: ['hazel', 'aisha'],
  },
  {
    id: 'citrus-jelly-pedicure',
    name: 'Warm Citrus Jelly Spa Pedicure',
    category: 'Spa & Jelly Pedicure',
    durationMin: 80,
    price: 220,
    description:
      'Heat-retaining translucent jelly foot bath that deeply hydrates tired feet, followed by exfoliating crystals, heel smoothing, and glossy polish.',
    finishNote: 'Deep thermal hydration · Signature ritual',
    masterIds: ['aisha', 'hazel'],
  },
  {
    id: 'gel-pedicure',
    name: 'Luxury Gel Pedicure',
    category: 'Spa & Jelly Pedicure',
    durationMin: 65,
    price: 165,
    description:
      'Thorough cuticle grooming, smooth heel resurfacing, relaxing foot massage, and mirror-gloss gel color built to last weeks.',
    finishNote: 'Matching mani-pedi shades available',
    masterIds: ['hazel', 'aisha'],
  },
  {
    id: 'classic-spa-pedicure',
    name: 'Classic Spa Pedicure',
    category: 'Spa & Jelly Pedicure',
    durationMin: 50,
    price: 95,
    description:
      'Soothing warm soak, gentle exfoliation, cuticle and nail care, hydrating balm massage, and classic polish.',
    finishNote: 'Incl. 5% VAT · Relaxing studio care',
    masterIds: ['aisha', 'hazel'],
  },
  {
    id: 'classic-lash-extensions',
    name: 'Weightless Classic Eyelash Extensions',
    category: 'Lashes & Brows',
    durationMin: 90,
    price: 230,
    description:
      'Individual 1:1 ultra-light silk lashes mapped to your eye shape for soft, natural-looking length that feels effortless on the eye.',
    finishNote: '10/10 guest-rated comfort · Refills AED 140',
    masterIds: ['lash-brow'],
  },
  {
    id: 'hybrid-lash-extensions',
    name: 'Hybrid Soft-Volume Lash Extensions',
    category: 'Lashes & Brows',
    durationMin: 105,
    price: 295,
    description:
      'Bespoke blend of classic singles and wispy handmade fans delivering airy fullness with gentle isolation for natural lash health.',
    finishNote: 'Customized curl & length · 3–4 week retention',
    masterIds: ['lash-brow'],
  },
  {
    id: 'brow-lamination-tint',
    name: 'Architectural Brow Lamination & Tint',
    category: 'Lashes & Brows',
    durationMin: 55,
    price: 175,
    description:
      'Proportion-mapped brow sculpting, gentle hair-setting lamination, custom natural tint, and nourishing keratin conditioning.',
    finishNote: 'Feathered shape lasting 6–8 weeks',
    masterIds: ['lash-brow'],
  },
  {
    id: 'brow-shaping-tint',
    name: 'Bespoke Eyebrow Shaping & Tint',
    category: 'Lashes & Brows',
    durationMin: 35,
    price: 90,
    description:
      'Clean threading, wax, or tweezer framing tailored to your natural brow arch with custom shade-matched tinting.',
    finishNote: 'Clean framing · Incl. 5% VAT',
    masterIds: ['lash-brow'],
  },
  {
    id: 'keratin-lash-lift',
    name: 'Keratin Lash Lift & Gloss Tint',
    category: 'Lashes & Brows',
    durationMin: 60,
    price: 210,
    description:
      'Root-lifting keratin treatment that curls and darkens your natural lashes without extensions for 6–7 weeks of low-maintenance lift.',
    finishNote: 'Zero extensions · Keratin-infused finish',
    masterIds: ['lash-brow'],
  },
  {
    id: 'minimalist-henna',
    name: 'Bespoke Minimalist & Floral Henna',
    category: 'Henna Art',
    durationMin: 45,
    price: 120,
    description:
      'Delicate hand-drawn botanical vines and refined modern patterns applied with fresh, 100% natural organic henna paste.',
    finishNote: 'Both hands · Rich natural stain',
    masterIds: ['lash-brow'],
  },
  {
    id: 'bridal-khaleeji-henna',
    name: 'Signature Khaleeji & Occasion Henna',
    category: 'Henna Art',
    durationMin: 90,
    price: 260,
    description:
      'Intricate celebratory henna artistry tailored for Eid, engagements, and bridal mornings in a calm private lounge setting.',
    finishNote: 'Custom consultations available via WhatsApp',
    masterIds: ['lash-brow'],
  },
];

export const SALON_MASTERS: SalonMaster[] = [
  {
    id: 'hazel',
    name: 'Hazel',
    firstName: 'Hazel',
    role: 'Senior Nail & Extensions Technician',
    focusTag: 'Guest Favorite · 5.0★ Reviewed',
    specialty: 'Sculpted nail extensions, floral almond sets & Russian gel manicures',
    bio: 'Praised by returning Al Nahyan guests for her gentle precision and calm attention to detail, Hazel specializes in bespoke nail extensions, clean French tips, and structured gel overlays.',
    image: SALON_IMAGES.femeliaRingFloral,
    imagePosition: 'object-center',
    categories: ['Nails & Extensions', 'Spa & Jelly Pedicure'],
  },
  {
    id: 'aisha',
    name: 'Aisha',
    firstName: 'Aisha',
    role: 'Nail Art & Spa Pedicure Specialist',
    focusTag: 'Guest Favorite · 5.0★ Reviewed',
    specialty: 'Swirl & custom nail art, ruby gel sets & botanical spa pedicures',
    bio: 'Beloved by loyal clients who return week after week for her creative polish work, Aisha combines expressive custom nail art with deeply restorative rose and citrus jelly pedicure rituals.',
    image: SALON_IMAGES.espressoSwirlNails,
    imagePosition: 'object-center',
    categories: ['Nails & Extensions', 'Spa & Jelly Pedicure'],
  },
  {
    id: 'lash-brow',
    name: 'Femelia Eye & Henna Team',
    firstName: 'Our Specialists',
    role: 'Lash, Brow & Henna Artists',
    focusTag: 'Weightless Comfort · Custom Artistry',
    specialty: 'Ultra-light eyelash extensions, brow lamination & organic henna art',
    bio: 'Dedicated to feather-light lash extensions that feel completely comfortable on the eye, proportion-first brow framing, and fresh organic henna designed to elevate every occasion.',
    image: SALON_IMAGES.spaBasinRitual,
    imagePosition: 'object-center',
    categories: ['Lashes & Brows', 'Henna Art'],
  },
];

export const CRAFT_PILLARS = [
  {
    index: '01',
    title: 'Beauty Is All About the Details',
    summary:
      'From exact almond nail symmetry and crisp French smile lines to gentle, thorough cuticle preparation, every appointment is unhurried and tailored to your natural nail and eye shape.',
    metric: '5.0★ rating across 16 verified Google reviews in Abu Dhabi.',
  },
  {
    index: '02',
    title: 'Botanical Rose & Jelly Spa Rituals',
    summary:
      'Relax in plush velvet wingback armchairs with warm stone basins, brushed brass fixtures, fresh rose petals, pink mineral salts, botanical sugar scrubs, and heat-retaining citrus jelly baths.',
    metric: 'Private, spotless sanctuary curated for complete relaxation.',
  },
  {
    index: '03',
    title: 'Weightless Lashes, Brows & Organic Henna',
    summary:
      'Our specialists craft ultra-light, comfortable lash sets, clean brow architecture, and fresh hand-drawn henna designs using skin-kind formulations in an immaculate, welcoming setting.',
    metric: 'Open daily 11:00 – 22:00 on Al Jiwa Street, Al Nahyan.',
  },
];

/**
 * Verified 5.0★ Google Maps guest reviews for Femelia Beauty Lounge, Abu Dhabi
 */
export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'r1',
    quote:
      'I had a really lovely experience at this salon! The place is beautiful, clean, and has such a welcoming atmosphere. I got my nails done by Hazel, and she was absolutely lovely, professional, and did a great job. The owner was also very kind and welcoming.',
    author: 'Eli',
    context: 'Verified Google Review · 5.0★',
    servicePerformed: 'Manicure with Hazel',
    outcome: 'Spotless, welcoming lounge',
  },
  {
    id: 'r2',
    quote:
      'The loveliest most clean salon ever. I did my lashes—10/10 experience, they are very light on the eye and comfortable. I did my nails also and I will let the photos speak on their own.',
    author: 'Walaa',
    context: 'Verified Google Review · 5.0★',
    servicePerformed: 'Lashes & Nails',
    outcome: '10/10 weightless lash comfort',
  },
  {
    id: 'r3',
    quote:
      'I had an amazing experience getting my nail extensions done here! My technician did an absolute masterpiece—the shape, length, and design turned out even better than I imagined. They were so detailed, precise, and gentle throughout the whole process.',
    author: 'Emerald',
    context: 'Verified Google Review · 5.0★',
    servicePerformed: 'Bespoke Nail Extensions',
    outcome: 'Precision shape & gentle prep',
  },
];

export const GALLERY_LOOKS: GalleryLook[] = [
  {
    id: 'look-femelia-floral',
    title: 'Signature Floral Almond Extensions',
    category: 'Nails',
    image: SALON_IMAGES.femeliaRingFloral,
    imagePosition: 'object-center',
    caption:
      'Delicate hand-finished floral rose-and-pearl almond nail extensions photographed with our signature gold Femelia ring.',
    serviceId: 'sculpted-nail-extensions',
    masterId: 'hazel',
  },
  {
    id: 'look-lounge-interior',
    title: 'Al Nahyan Velvet Pedicure Suite',
    category: 'Lounge',
    image: SALON_IMAGES.loungeChairs,
    imagePosition: 'object-center',
    caption:
      'Sunlit wingback velvet armchairs, brushed brass taps, stone soaking bowls, bouclé footstools, and fresh roses on Al Jiwa Street.',
    serviceId: 'rose-petal-spa-pedicure',
    masterId: 'hazel',
  },
  {
    id: 'look-rose-spa-experience',
    title: 'Rose Botanical Spa Pedicure Ritual',
    category: 'Spa Pedicure',
    image: SALON_IMAGES.rosePedicureExperience,
    imagePosition: 'object-[50%_62%]',
    caption:
      'Steaming rose-infused foot bath accompanied by our six-bowl botanical scrub, mineral salt, and dried rose petal tray.',
    serviceId: 'rose-petal-spa-pedicure',
    masterId: 'aisha',
  },
  {
    id: 'look-espresso-swirl',
    title: 'Espresso Gloss with Cream Swirl Accent',
    category: 'Nails',
    image: SALON_IMAGES.espressoSwirlNails,
    imagePosition: 'object-center',
    caption:
      'Deep chocolate-espresso glossy almond manicure accented with hand-painted warm mocha and cream ribbons.',
    serviceId: 'russian-gel-manicure',
    masterId: 'aisha',
  },
  {
    id: 'look-classic-french',
    title: 'Crisp Classic French Gel Manicure',
    category: 'Nails',
    image: SALON_IMAGES.frenchCloseUp,
    imagePosition: 'object-center',
    caption:
      'Clean sheer-nude builder base finished with razor-sharp white French tips and high-luster topcoat.',
    serviceId: 'french-gel-manicure',
    masterId: 'hazel',
  },
  {
    id: 'look-citrus-jelly',
    title: 'Warm Citrus Jelly Spa Foot Bath',
    category: 'Spa Pedicure',
    image: SALON_IMAGES.citrusJellyBath,
    imagePosition: 'object-center',
    caption:
      'Translucent aromatic citrus jelly bath that locks in warmth to deeply soften heels and soothe tired feet.',
    serviceId: 'citrus-jelly-pedicure',
    masterId: 'aisha',
  },
  {
    id: 'look-ruby-manipedi',
    title: 'Classic Ruby Red Gel Mani-Pedi',
    category: 'Nails',
    image: SALON_IMAGES.rubyManiPedi,
    imagePosition: 'object-center',
    caption:
      'Coordinated deep crimson gel manicure and pedicure finished with sleek short-squoval shaping and glass shine.',
    serviceId: 'gel-pedicure',
    masterId: 'aisha',
  },
  {
    id: 'look-rose-petal-bowl',
    title: 'Fresh Rose Petal Botanical Soak',
    category: 'Spa Pedicure',
    image: SALON_IMAGES.rosePetalBath,
    imagePosition: 'object-center',
    caption:
      'Fragrant rose petals steeped in warm mineral-rich water inside our white stone soaking basins.',
    serviceId: 'rose-petal-spa-pedicure',
    masterId: 'hazel',
  },
];

export const TIME_SLOTS = [
  '11:00',
  '12:15',
  '13:30',
  '14:45',
  '16:00',
  '17:15',
  '18:30',
  '19:45',
  '20:45',
];

export const LOUNGE_INFO = {
  brandName: 'Femelia Beauty Lounge',
  shortWordmark: 'Femelia',
  cityLabel: 'Al Nahyan, Abu Dhabi',
  addressLine1: 'Al Jiwa Street, Al Nahyan – Zone 1',
  addressLine2: 'Abu Dhabi, United Arab Emirates (C9XR+GP)',
  phone: '+971 56 304 3400',
  phoneRaw: '+971563043400',
  whatsappUrl: 'https://wa.me/971563043400',
  instagram: '@femelialounge',
  instagramUrl: 'https://www.instagram.com/femelialounge',
  googleMapsUrl:
    'https://www.google.com/maps/place/Femelia+Beauty+Lounge/@24.4488745,54.3917838,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e69a22c205493:0x1277e8bd943bd2b6!8m2!3d24.4488745!4d54.3917838',
  ratingScore: '5.0',
  reviewCount: 16,
  hours: [
    { days: 'Monday – Thursday', time: '11:00 – 22:00' },
    { days: 'Friday – Saturday', time: '11:00 – 22:00' },
    { days: 'Sunday', time: '11:00 – 22:00' },
  ],
};
