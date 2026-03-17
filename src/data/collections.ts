export type Collection = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  region: string;
  vibe: string;
  budget: string;
  tags: string[];
};

export const collections: Collection[] = [
  {
    slug: "cape-town",
    title: "Cape Town Skyline Escape",
    subtitle: "Table Mountain & the Atlantic Seaboard",
    description:
      "Iconic mountain-meets-ocean panoramas, rooftop sundowners at the V&A Waterfront, and world-class dining in one of Africa's most beautiful cities.",
    href: "/plan",
    imageSrc: "/images/collections/cape-town.svg",
    imageAlt:
      "Cinematic view of Table Mountain silhouette against a sunset sky over the Atlantic Ocean",
    region: "Western Cape",
    vibe: "urban",
    budget: "50k-100k",
    tags: ["City", "Iconic", "Waterfront"],
  },
  {
    slug: "winelands",
    title: "Cape Winelands Retreat",
    subtitle: "Franschhoek, Stellenbosch & Paarl",
    description:
      "Rolling vineyards beneath dramatic mountain peaks, private cellar tastings, and candlelit dinners at award-winning estates.",
    href: "/plan",
    imageSrc: "/images/collections/winelands.svg",
    imageAlt:
      "Vineyard rows leading to mountain silhouettes under a warm dusk sky in the Cape Winelands",
    region: "Western Cape",
    vibe: "wine",
    budget: "50k-100k",
    tags: ["Wine", "Culinary", "Mountain"],
  },
  {
    slug: "kruger-safari",
    title: "Kruger Safari Lodge",
    subtitle: "Greater Kruger & Sabi Sands",
    description:
      "Wake to the sounds of the bush, track the Big Five on sunrise drives, and dine under a canopy of stars at a luxury private reserve.",
    href: "/plan",
    imageSrc: "/images/collections/kruger-safari.svg",
    imageAlt:
      "African sunset with acacia trees and an elephant silhouette on the Kruger savanna",
    region: "Limpopo",
    vibe: "adventure",
    budget: "100k-250k",
    tags: ["Safari", "Wildlife", "Adventure"],
  },
  {
    slug: "coastal-luxury",
    title: "Coastal Luxury Retreat",
    subtitle: "Garden Route, Hermanus & KwaZulu-Natal",
    description:
      "Pristine beaches, whale-watching from your terrace, and barefoot-luxury lodges where the fynbos meets the Indian Ocean.",
    href: "/plan",
    imageSrc: "/images/collections/coastal-luxury.svg",
    imageAlt:
      "Turquoise ocean waves meeting golden sand dunes under a teal-toned coastal sky",
    region: "Eastern Cape",
    vibe: "beach",
    budget: "25k-50k",
    tags: ["Beach", "Coastal", "Spa"],
  },
  {
    slug: "adventure-romance",
    title: "Mountain & Adventure",
    subtitle: "Drakensberg, Cederberg & Wild Coast",
    description:
      "Dramatic peaks, starlit hot-spring soaks, and trails through ancient rock-art country — for couples who love the wild.",
    href: "/plan",
    imageSrc: "/images/collections/adventure-romance.svg",
    imageAlt:
      "Moonlit mountain range with hiking trail winding through peaks under a starry night sky",
    region: "KwaZulu-Natal",
    vibe: "adventure",
    budget: "25k-50k",
    tags: ["Adventure", "Mountains", "Stargazing"],
  },
];

export const budgetBands = [
  { id: "10k-25k", label: "Spark", range: "R10k – R25k", description: "Weekend escapes & intimate dinners" },
  { id: "25k-50k", label: "Signature", range: "R25k – R50k", description: "Multi-day retreats & curated experiences" },
  { id: "50k-100k", label: "Elite", range: "R50k – R100k", description: "Premium lodges & private excursions" },
  { id: "100k-250k", label: "Icon", range: "R100k – R250k", description: "Once-in-a-lifetime luxury celebrations" },
  { id: "250k+", label: "Bespoke", range: "R250k+", description: "No limits — your dream, our craft" },
];
