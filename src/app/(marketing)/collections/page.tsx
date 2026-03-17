import { CollectionsFilter } from "./collections-filter";

export const metadata = {
  title: "Collections | Anniversary Concierge",
  description:
    "Explore curated anniversary experiences across South Africa — from vineyard retreats to coastal escapes and safari adventures.",
};

const VENUES = [
  {
    id: "1",
    name: "Cape Winelands Retreat",
    region: "Western Cape",
    vibe: "wine",
    budget: "50k-100k",
    description:
      "Intimate vineyard estate with private tastings, sunset dinners, and rolling mountain views.",
    tags: ["Wine", "Culinary", "Mountain"],
  },
  {
    id: "2",
    name: "Kruger Safari Lodge",
    region: "Limpopo",
    vibe: "adventure",
    budget: "100k-250k",
    description:
      "Luxury bush lodge with game drives, starlit dinners, and private plunge pool suites.",
    tags: ["Safari", "Wildlife", "Adventure"],
  },
  {
    id: "3",
    name: "Clifton Beach Villa",
    region: "Western Cape",
    vibe: "beach",
    budget: "100k-250k",
    description:
      "Beachfront villa with panoramic Atlantic views, private chef, and spa treatments.",
    tags: ["Beach", "Coastal", "Luxury"],
  },
  {
    id: "4",
    name: "Franschhoek Boutique Hotel",
    region: "Western Cape",
    vibe: "romantic",
    budget: "25k-50k",
    description:
      "Charming boutique hotel in the heart of Franschhoek with award-winning dining.",
    tags: ["Romantic", "Culinary", "Village"],
  },
  {
    id: "5",
    name: "Garden Route Eco-Lodge",
    region: "Eastern Cape",
    vibe: "adventure",
    budget: "25k-50k",
    description:
      "Eco-luxury treehouse lodge nestled in indigenous forest along the Garden Route.",
    tags: ["Nature", "Eco", "Forest"],
  },
  {
    id: "6",
    name: "Johannesburg Penthouse Suite",
    region: "Gauteng",
    vibe: "urban",
    budget: "50k-100k",
    description:
      "Skyline penthouse with rooftop terrace, art gallery access, and fine dining.",
    tags: ["City", "Culture", "Nightlife"],
  },
];

export default function CollectionsPage() {
  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Curated Collections
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore featured venues and experiences from our concierge network.
          Every option is handpicked for unforgettable celebrations.
        </p>
      </div>
      <CollectionsFilter venues={VENUES} />
    </div>
  );
}
