export const SALON_INFO = {
  name: 'FACEBOOK-3 UNISEX FAMILY SALON',
  shortName: 'Fb3 Unisex Salon',
  alsoKnownAs: ['Facebook Unisex Salon', 'Fb3 Unisex Salon'],
  city: 'Bharuch, Gujarat',
  tagline: 'Precision Cuts, Radiant Style in Bharuch.',
  rating: '4.8',
  ratingPlatform: 'Justdial',
  hoursShort: 'Open Daily · Until 9:00 PM',
  hoursDetailed: 'Monday – Sunday: 10:00 AM – 9:00 PM',
  addressLine1: '1st Floor (Shop No. 164–175), City Centre Mall',
  addressLine2: 'Station Road / Mangal Bazar Area, Bharuch, Gujarat',
  fullAddress:
    '1st Floor (Shop No. 164–175), City Centre Mall, Station Road / Mangal Bazar area, Bharuch, Gujarat',
  phones: [
    { display: '+91 78348 83868', href: 'tel:+917834883868', label: 'Primary Desk' },
    { display: '+91 2642 314 716', href: 'tel:+912642314716', label: 'Salon Landline' },
  ],
  whatsappNumber: '917834883868',
  mapsQueryUrl:
    'https://www.google.com/maps/search/?api=1&query=City+Centre+Mall+Station+Road+Mangal+Bazar+Bharuch+Gujarat',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=City+Centre+Mall,+Station+Road,+Bharuch,+Gujarat&output=embed',
  socials: {
    instagram: {
      handle: '@fb3unisexsalon.bharuch',
      url: 'https://www.instagram.com/',
      label: 'Instagram',
    },
    facebook: {
      handle: 'Facebook-3 Unisex Family Salon',
      url: 'https://www.facebook.com/',
      label: 'Facebook',
    },
  },
};

export const SERVICE_CATEGORIES = ['All', 'Hair', 'Skin & Makeup', 'Relaxation'];

export const SERVICES = [
  {
    id: 'haircuts-styling',
    title: 'Haircuts & Styling',
    category: 'Hair',
    badge: 'Family Favorite',
    image: '/images/service-haircut.jpg',
    alt: 'Precision haircut and designer styling at FACEBOOK-3 UNISEX FAMILY SALON in Bharuch',
    startingPrice: '₹299*',
    priceValue: 299,
    duration: '30 – 60 min*',
    minMins: 30,
    maxMins: 60,
    summary:
      'Tailored cuts for men, women, and children—from razor-sharp fades and beard sculpting to voluminous layers and signature blowouts.',
    highlights: [
      'Men’s Precision Cut & Beard Grooming',
      'Women’s Designer Cut & Luxury Blowout',
      'Kids & Family Haircut Sessions',
      'Wash, Conditioning & Event Styling',
    ],
  },
  {
    id: 'hair-coloring',
    title: 'Hair Coloring',
    category: 'Hair',
    badge: null,
    image: '/images/service-coloring.jpg',
    alt: 'Dimensional balayage and glossy hair coloring transformation',
    startingPrice: '₹1,499*',
    priceValue: 1499,
    duration: '90 – 150 min*',
    minMins: 90,
    maxMins: 150,
    summary:
      'Luminous, ammonia-free global shades, hand-painted caramel balayage, seamless root touch-ups, and bold fashion tones crafted for Indian hair.',
    highlights: [
      'Global Rich Color & Gloss Finish',
      'Sun-Kissed Balayage & Highlights',
      'Express Root Touch-Up & Grey Coverage',
      'Custom Fashion & Dimensional Shades',
    ],
  },
  {
    id: 'keratin-smoothing',
    title: 'Keratin & Smoothing',
    category: 'Hair',
    badge: 'Most Popular',
    image: '/images/service-keratin.jpg',
    alt: 'Silky smooth mirror-shine hair after keratin treatment',
    startingPrice: '₹3,499*',
    priceValue: 3499,
    duration: '120 – 180 min*',
    minMins: 120,
    maxMins: 180,
    summary:
      'Transform humid-weather frizz into effortless, mirror-like silkiness with deeply nourishing keratin infusions and gentle smoothing rituals.',
    highlights: [
      'Intensive Frizz-Control Keratin Treatment',
      'Silk Hair Smoothing & Shine Restoration',
      'Deep Repair Hair Spa & Protein Mask',
      'Post-Treatment Moisture Seal',
    ],
  },
  {
    id: 'skin-care',
    title: 'Skin Care',
    category: 'Skin & Makeup',
    badge: null,
    image: '/images/service-skincare.jpg',
    alt: 'Glowing facial and skin rejuvenation ritual in serene salon suite',
    startingPrice: '₹799*',
    priceValue: 799,
    duration: '45 – 75 min*',
    minMins: 45,
    maxMins: 75,
    summary:
      'Restorative facials, gentle clean-ups, and brightening de-tan therapies designed to leave every skin type refreshed, calm, and naturally luminous.',
    highlights: [
      'Signature Radiance & Gold Glow Facials',
      'Deep Pore Clean-Up & Exfoliation',
      'Instant De-Tan & Skin Brightening',
      'Hydrating Rejuvenation Rituals',
    ],
  },
  {
    id: 'makeup',
    title: 'Makeup',
    category: 'Skin & Makeup',
    badge: 'Festive Ready',
    image: '/images/service-makeup.jpg',
    alt: 'Festive party and occasion makeup artistry for women in Bharuch',
    startingPrice: '₹2,499*',
    priceValue: 2499,
    duration: '60 – 120 min*',
    minMins: 60,
    maxMins: 120,
    summary:
      'Refined, camera-ready makeup artistry for weddings, garba nights, festive gatherings, and milestone celebrations—skin-like, breathable, and long-lasting.',
    highlights: [
      'Party, Festive & Event Glam Makeup',
      'Engagement & Sider Makeup Packages',
      'HD & Soft-Glow Editorial Finish',
      'Hairstyling & Saree / Dupatta Draping',
    ],
  },
  {
    id: 'foot-massage',
    title: 'Foot Massage',
    category: 'Relaxation',
    badge: null,
    image: '/images/service-footmassage.jpg',
    alt: 'Soothing foot reflexology and spa relaxation therapy',
    startingPrice: '₹499*',
    priceValue: 499,
    duration: '30 – 45 min*',
    minMins: 30,
    maxMins: 45,
    summary:
      'Melt away shopping fatigue and daily tension with soothing foot reflexology, aromatic botanical oils, and warm towel relaxation therapy.',
    highlights: [
      'Targeted Foot Reflexology Therapy',
      'Aromatic Warm Oil Foot & Calf Massage',
      'Warm Towel & Pressure-Point Relief',
      'Ideal Add-On During Hair & Color Visits',
    ],
  },
];

export const TRANSFORMATIONS = [
  {
    id: 'trans-keratin',
    tabLabel: 'Keratin Silk',
    title: 'Mirror-Shine Keratin Smoothing',
    serviceTitle: 'Keratin & Smoothing',
    image: '/images/service-keratin.jpg',
    beforeLabel: 'Before · Humid Frizz & Dullness',
    afterLabel: 'After · Liquid-Glass Keratin Silk',
    beforeFilter: 'saturate(0.42) contrast(0.86) brightness(0.92) sepia(0.18)',
    duration: '150 min Session',
    resultNote: 'Up to 4 months of weightless, frizz-free softness and natural mirror luster.',
  },
  {
    id: 'trans-balayage',
    tabLabel: 'Caramel Balayage',
    title: 'Hand-Painted Dimensional Balayage',
    serviceTitle: 'Hair Coloring',
    image: '/images/service-coloring.jpg',
    beforeLabel: 'Before · Flat Single-Tone Base',
    afterLabel: 'After · Sun-Kissed Caramel Dimension',
    beforeFilter: 'saturate(0.28) contrast(0.9) brightness(0.84)',
    duration: '120 min Session',
    resultNote: 'Ammonia-free warm ribbons blended seamlessly for effortless, low-maintenance grow-out.',
  },
  {
    id: 'trans-glam',
    tabLabel: 'Festive Glam',
    title: 'Dewy Editorial & Festive Artistry',
    serviceTitle: 'Makeup',
    image: '/images/service-makeup.jpg',
    beforeLabel: 'Before · Bare Prepped Skin',
    afterLabel: 'After · Soft-Glow Camera-Ready Finish',
    beforeFilter: 'saturate(0.48) contrast(0.88) brightness(0.93) sepia(0.12)',
    duration: '90 min Session',
    resultNote: 'Breathable HD skin finish crafted to stay luminous through Bharuch’s wedding & festive nights.',
  },
];

export const GALLERY_CATEGORIES = ['All', 'Women', 'Men', 'Family', 'Beauty & Spa'];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Signature Salon Blowout & Waves',
    subtitle: 'Bouncy layered styling with mirror-like luster',
    category: 'Women',
    serviceTitle: 'Haircuts & Styling',
    image: '/images/gallery-womens-style.jpg',
    alt: 'Woman with bouncy glossy blowout waves styled at Fb3 Unisex Salon',
    span: 'md:row-span-2',
  },
  {
    id: 'gal-2',
    title: 'Precision Fade & Beard Sculpt',
    subtitle: 'Tailored men’s grooming with crisp edgework',
    category: 'Men',
    serviceTitle: 'Haircuts & Styling',
    image: '/images/gallery-mens-cut.jpg',
    alt: 'Stylish young man with modern textured fade haircut and neat beard',
    span: 'md:row-span-2',
  },
  {
    id: 'gal-3',
    title: 'Warm Family Grooming Lounge',
    subtitle: 'Welcoming space for parents, kids & everyone in between',
    category: 'Family',
    serviceTitle: 'Family Combo / Multiple Services',
    image: '/images/gallery-family-salon.jpg',
    alt: 'Happy modern family refreshed after haircuts inside Fb3 Unisex Family Salon',
    span: 'md:col-span-2',
  },
  {
    id: 'gal-4',
    title: 'Caramel & Honey Balayage',
    subtitle: 'Dimensional hand-painted color artistry',
    category: 'Women',
    serviceTitle: 'Hair Coloring',
    image: '/images/service-coloring.jpg',
    alt: 'Caramel and honey dimensional balayage hair coloring',
    span: '',
  },
  {
    id: 'gal-5',
    title: 'Festive & Occasion Artistry',
    subtitle: 'Soft-glow party & bridal event makeup',
    category: 'Beauty & Spa',
    serviceTitle: 'Makeup',
    image: '/images/service-makeup.jpg',
    alt: 'Festive party makeup look with glowing skin',
    span: '',
  },
  {
    id: 'gal-6',
    title: 'Keratin Silk Transformation',
    subtitle: 'Frizz-free smoothness with lasting brilliance',
    category: 'Women',
    serviceTitle: 'Keratin & Smoothing',
    image: '/images/service-keratin.jpg',
    alt: 'Sleek silky straight hair after keratin smoothing treatment',
    span: 'lg:col-span-2',
  },
  {
    id: 'gal-7',
    title: 'Botanical Foot Reflexology',
    subtitle: 'Quiet luxury relaxation right inside City Centre Mall',
    category: 'Beauty & Spa',
    serviceTitle: 'Foot Massage',
    image: '/images/service-footmassage.jpg',
    alt: 'Relaxing foot spa and reflexology massage session',
    span: 'lg:col-span-2',
  },
];

export const WHY_CHOOSE_FEATURES = [
  {
    title: 'Warm Family-First Ambience',
    description:
      'Designed so men, women, and children feel genuinely relaxed—whether it’s a quick trim or a full festive pampering afternoon together.',
    metric: 'Unisex & Kids Welcome',
  },
  {
    title: 'Seasoned Stylists & Artists',
    description:
      'Our hairstylists, colorists, and skincare professionals stay sharp on modern techniques while listening closely to what suits your daily routine.',
    metric: 'Consultation Led',
  },
  {
    title: 'Hospital-Grade Hygiene & Products',
    description:
      'Sanitized shears and tools between every guest, fresh linens, and trusted salon-grade hair and skin formulations gentle on hair & scalp.',
    metric: '100% Sanitized Tools',
  },
  {
    title: 'Prime City Centre Mall Access',
    description:
      'Conveniently located on the 1st Floor (Shop No. 164–175) on Station Road / Mangal Bazar—easy parking, air-conditioned comfort, open until 9 PM.',
    metric: 'Shop 164–175 · 1st Floor',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Priya Patel',
    service: 'Keratin & Layered Haircut',
    quote:
      'The stylists genuinely listen before picking up the scissors. My hair felt weightless, glossy, and completely frizz-free even weeks later.',
    rating: 5,
  },
  {
    name: 'Rohan Desai',
    service: 'Men’s Grooming & Family Visit',
    quote:
      'Cleanest family salon in Bharuch. I bring my wife and son together on weekends—great fade, warm staff, and super convenient at City Centre Mall.',
    rating: 5,
  },
  {
    name: 'Meera Shah',
    service: 'Festive Makeup & Glow Facial',
    quote:
      'Loved how natural and radiant my festive makeup looked all evening. Their pre-event facial and foot massage made the whole experience feel like a retreat.',
    rating: 5,
  },
];

export const SOCIAL_POSTS = [
  {
    id: 'soc-1',
    platform: 'Instagram',
    tag: 'Hair Transformation Reel',
    title: 'Soft Caramel Balayage + Signature Blowout',
    caption:
      'Warm dimension crafted without harsh damage—swipe-worthy shine for Bharuch’s festive season.',
    image: '/images/service-coloring.jpg',
    likes: '428',
    meta: 'New Style Reel · @fb3unisexsalon.bharuch',
  },
  {
    id: 'soc-2',
    platform: 'Facebook',
    tag: 'Family Weekend Special',
    title: 'Refresh Together at City Centre Mall',
    caption:
      'Men’s cuts, women’s styling, kids trims & soothing foot reflexology—all under one warm roof daily until 9:00 PM.',
    image: '/images/gallery-family-salon.jpg',
    likes: '312',
    meta: 'Community Update · Facebook-3 Unisex Family Salon',
  },
  {
    id: 'soc-3',
    platform: 'Instagram',
    tag: 'Festive Glam Diary',
    title: 'Dewy Sider & Party Makeup Looks',
    caption:
      'Bookings open for weddings, receptions, and family celebrations across Bharuch. Call to reserve your slot!',
    image: '/images/service-makeup.jpg',
    likes: '519',
    meta: 'Makeup Showcase · @fb3unisexsalon.bharuch',
  },
];
