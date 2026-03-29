export const client = {
  // Business Details
  name: "Hartwood Landscapes",
  tagline: "Crafting Outdoor Spaces That Inspire",
  description: "Premium landscaping and garden design services across Cheshire and the North West.",
  category: "Landscaping",
  yearEstablished: "2015",

  // Contact
  phone: "07700 900123",
  email: "info@hartwoodlandscapes.co.uk",
  website: "https://hartwoodlandscapes.co.uk",

  // Location
  address: "12 Oak Lane",
  city: "Prestbury",
  county: "Cheshire",
  postcode: "SK10 4BT",
  basedIn: "Prestbury, Cheshire",

  // People
  founderName: "James",
  founderSurname: "Hartwood",
  founderRole: "Director & Lead Designer",

  // Social
  facebook: "",
  instagram: "",
  linkedin: "",
  twitter: "",

  // Reviews
  googleRating: "4.9",
  reviewCount: "32",

  // Services (displayed in the services section)
  services: [
    {
      title: "Garden Design",
      description: "Bespoke garden designs tailored to your lifestyle and space.",
      icon: "tree",
    },
    {
      title: "Landscaping",
      description: "Complete hard and soft landscaping to transform your outdoor area.",
      icon: "shovel",
    },
    {
      title: "Paving & Patios",
      description: "Beautiful paving solutions using premium natural stone and porcelain.",
      icon: "wall",
    },
    {
      title: "Planting Schemes",
      description: "Year-round colour and interest with expertly curated planting plans.",
      icon: "flower",
    },
  ],

  // Cinematic video settings
  cinematic: {
    frameCount: 181,
    frameDir: "/frames/",
    framePrefix: "frame_",
    frameExtension: ".jpg",
    framePadding: 4,
    scrollLength: "500vh",
    mobileFrameCount: 181,
    mobileFrameDir: "/frames-mobile/",
    scrubSpeed: 0.5,
    heroStillImage: "/images/hero-still.jpg",
    heroStillImageMobile: "/images/hero-still-mobile.jpg",
  },

  // Before/After comparison images
  beforeAfter: {
    beforeImage: "/images/before.jpg",
    afterImage: "/images/after.jpg",
    beforeLabel: "Current Garden",
    afterLabel: "Our Vision",
  },

  // Multiple transformation examples (grid of before/after sliders)
  // When spin-up-demo populates this with real client photos, the grid renders automatically
  transformations: [
    { before: "/images/before.jpg", after: "/images/after.jpg", label: "Complete Garden Renovation" },
    { before: "/images/patio-before.jpg", after: "/images/patio-after.jpg", label: "Patio & Fencing" },
    { before: "/images/front-before.jpg", after: "/images/front-after.jpg", label: "Front Garden" },
    { before: "/images/lawn-before.jpg", after: "/images/lawn-after.jpg", label: "Lawn Restoration" },
    { before: "/images/fence-before.jpg", after: "/images/fence-after.jpg", label: "New Fencing" },
    { before: "/images/deck-before.jpg", after: "/images/deck-after.jpg", label: "Decking & Furniture" },
    { before: "/images/path-before.jpg", after: "/images/path-after.jpg", label: "Garden Path" },
    { before: "/images/border-before.jpg", after: "/images/border-after.jpg", label: "Planting Borders" },
    { before: "/images/drive-before.jpg", after: "/images/drive-after.jpg", label: "Driveway" },
  ] as { before: string; after: string; label: string }[],

  // Google Reviews (populated by /spin-up-demo or /extract-reviews skill)
  reviews: [
    { name: "Sarah Mitchell", rating: 5, text: "Absolutely transformed our garden. Professional from start to finish. The team were tidy, punctual, and the quality is outstanding. Couldn't recommend more highly.", date: "2 weeks ago", badge: "Local Guide" },
    { name: "James Thompson", rating: 5, text: "Brilliant work on our patio and fencing. They took the time to understand exactly what we wanted and delivered beyond expectations.", date: "1 month ago" },
    { name: "Karen Davies", rating: 5, text: "Best landscapers we've ever used. Turned our tired old garden into something we're genuinely proud of. The lawn stripes are perfection.", date: "3 weeks ago", badge: "Local Guide" },
    { name: "David Roberts", rating: 5, text: "From the initial consultation to the final clean-up, everything was handled professionally. Fair pricing, great communication throughout.", date: "2 months ago" },
    { name: "Emma Watson", rating: 5, text: "We wanted a low-maintenance garden with year-round interest. They delivered exactly that with a beautiful planting scheme. Love the box balls.", date: "1 month ago" },
    { name: "Paul Harrison", rating: 5, text: "Had our driveway and front garden done. Neighbours keep stopping to compliment it. The Indian sandstone paving is gorgeous.", date: "3 weeks ago", badge: "Local Guide" },
  ] as { name: string; rating: number; text: string; date: string; badge?: string }[],

  // SEO
  seo: {
    title: "Hartwood Landscapes | Premium Garden Design in Cheshire",
    description: "Award-winning landscaping and garden design in Prestbury, Cheshire. Transform your outdoor space with Hartwood Landscapes.",
  },
};
