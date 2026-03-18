export type ServiceTier = {
  id: string;
  name: string;
  feeZar: number;
  label: string;
};

export type BudgetBand = {
  id: string;
  label: string;
  range: string;
  description: string;
};

export type CollectionMeta = {
  slug: string;
  href: string;
  title: string;
  subtitle: string;
  region: string;
  imageSrc: string;
  imageAlt: string;
  vibe: string;
  tags: string[];
  description: string;
};

export const planningFeeCreditPercentage = 40;

export const serviceTiers: ServiceTier[] = [
  { id: "spark", name: "Spark", feeZar: 1500, label: "Starter" },
  { id: "signature-weekend", name: "Signature Weekend", feeZar: 4500, label: "Curated" },
  { id: "elite-anniversary", name: "Elite Anniversary", feeZar: 9000, label: "Premium" },
  { id: "icon", name: "Icon", feeZar: 18000, label: "R18,000+" },
];

export const budgetBands: BudgetBand[] = [
  {
    id: "starter",
    label: "Spark",
    range: "R10,000 - R25,000",
    description: "Starter anniversary options",
  },
  {
    id: "signature",
    label: "Signature Weekend",
    range: "R25,000 - R50,000",
    description: "Curated weekend itineraries",
  },
  {
    id: "elite",
    label: "Elite Anniversary",
    range: "R50,000 - R100,000",
    description: "Premium anniversary planning",
  },
  {
    id: "icon",
    label: "Icon",
    range: "R100,000 - R250,000",
    description: "High-touch luxury execution",
  },
  {
    id: "ultra",
    label: "Ultra",
    range: "R250,000+",
    description: "Bespoke ultra-luxury scope",
  },
];

export const vibeTags = [
  "Romantic",
  "Safari",
  "Winelands",
  "Coastal",
  "City",
  "Adventure",
  "Wellness",
  "Private Dining",
] as const;

export const requestStatuses = [
  "NEW",
  "QUALIFIED",
  "SHORTLIST_SENT",
  "OUTREACH_IN_PROGRESS",
  "OPTIONS_RECEIVED",
  "DECIDED",
  "BOOKED",
  "COMPLETE",
] as const;

export const stayStatuses = [
  "DRAFT",
  "PROPOSED",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
] as const;

export const marketingCopy = {
  heroEyebrow: "South Africa's Anniversary Concierge",
  heroTitle: "Curated anniversary escapes across South Africa",
  heroDescription:
    "Anniversary experiences across South Africa, planned with precision for couples who want every detail handled.",
  collectionsTitle: "Featured venues and recommended stays",
  collectionsDescription:
    "A calm shortlist to inspire your celebration, from safari lodges to coastal suites.",
  ctaTitle: "Start with a private concierge brief",
  ctaDescription:
    "Share your dates, preferences, and budget band. We return with a tailored shortlist.",
};

export const collectionsMetadata: CollectionMeta[] = [
  {
    slug: "safari-anniversary",
    href: "/safari-anniversary",
    title: "Safari Anniversary",
    subtitle: "Greater Kruger and private reserves",
    region: "Limpopo",
    imageSrc: "/images/sa/kruger-safari.jpg",
    imageAlt: "Kruger safari reserve scene",
    vibe: "Safari",
    tags: ["Big Five", "Sunset", "Private Guide"],
    description:
      "Bush luxury with game drives, private decks, and golden-hour celebrations.",
  },
  {
    slug: "winelands-anniversary",
    href: "/winelands-anniversary",
    title: "Winelands Anniversary",
    subtitle: "Franschhoek and Stellenbosch",
    region: "Western Cape",
    imageSrc: "/images/sa/winelands-vineyards.jpg",
    imageAlt: "South African winelands vineyards",
    vibe: "Winelands",
    tags: ["Cellar", "Estate Dining", "Mountain"],
    description:
      "Estate stays, private tastings, and elevated culinary experiences.",
  },
  {
    slug: "coastal-luxury-anniversary",
    href: "/coastal-luxury-anniversary",
    title: "Coastal Luxury Anniversary",
    subtitle: "Garden Route and Indian Ocean edge",
    region: "Eastern Cape",
    imageSrc: "/images/sa/garden-route-coastal.jpg",
    imageAlt: "Garden Route coastline and cliffs",
    vibe: "Coastal",
    tags: ["Ocean View", "Spa", "Sunset Dinner"],
    description:
      "Sea-facing suites and polished coastal itineraries for two.",
  },
  {
    slug: "city-anniversary",
    href: "/city-anniversary",
    title: "City Anniversary",
    subtitle: "Cape Town and urban culture",
    region: "Western Cape",
    imageSrc: "/images/sa/cape-town-table-mountain.jpg",
    imageAlt: "Cape Town skyline and Table Mountain",
    vibe: "City",
    tags: ["Rooftop", "Culture", "Fine Dining"],
    description:
      "Editorial city escapes with iconic backdrops and curated reservations.",
  },
  {
    slug: "adventure-romance",
    href: "/adventure-romance",
    title: "Adventure Romance",
    subtitle: "Mountain and wilderness routes",
    region: "KwaZulu-Natal",
    imageSrc: "/images/sa/drakensberg-mountains.jpg",
    imageAlt: "Drakensberg mountain adventure landscape",
    vibe: "Adventure",
    tags: ["Trails", "Scenic", "Stargazing"],
    description:
      "For couples who celebrate with movement, nature, and dramatic views.",
  },
];
