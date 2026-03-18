import { CollectionPage } from "@/components/marketing/CollectionPage";

export const metadata = {
  title: "City Anniversary | Luxury Anniversary Concierge South Africa",
  description:
    "Urban sophistication in Cape Town and Johannesburg — rooftop dining, art galleries, helicopter tours, and vibrant culture.",
};

export default function CityPage() {
  return (
    <CollectionPage
      title="City"
      subtitle="Urban energy & refined sophistication"
      description="South Africa's cities pulse with creativity, culture, and world-class dining. A city anniversary delivers rooftop cocktails at golden hour, private gallery viewings, helicopter rides over the peninsula, and the electric energy of Cape Town's waterfront or Johannesburg's Maboneng. Ideal when you want luxury with a vibrant, cultural heartbeat."
      heroGradient="linear-gradient(135deg, #1A1A2E 0%, #2D2D44 30%, #3F3F5A 60%, #6B6B80 100%)"
      location="Cape Town, Johannesburg & Durban"
      highlights={[
        {
          title: "Rooftop fine dining",
          description: "Tables at award-winning restaurants with skyline views — tasting menus, sommelier-led pairings.",
        },
        {
          title: "Private art tours",
          description: "Gallery walkthroughs and studio visits with local curators, from Zeitz MOCAA to Maboneng.",
        },
        {
          title: "Helicopter experiences",
          description: "Scenic flights over Table Mountain, the Twelve Apostles, and the Cape Peninsula.",
        },
        {
          title: "Penthouse luxury",
          description: "Premier suite stays in the city's finest hotels — ocean-facing, mountain-view, or skyline.",
        },
        {
          title: "Cultural immersion",
          description: "Market tours, jazz clubs, theatre shows, and neighbourhood walks with local insiders.",
        },
        {
          title: "Shopping & style",
          description: "Curated experiences with personal stylists, bespoke jewellers, and design district visits.",
        },
      ]}
      signatureExperiences={[
        "Private rooftop dinner with a personal chef and Table Mountain as your backdrop",
        "Guided graffiti and street art walk through Woodstock ending at a hidden speakeasy",
        "Sunset helicopter flight followed by a clifftop champagne landing",
        "VIP jazz evening at a legendary Cape Town venue",
      ]}
      idealFor={[
        "Culture lovers",
        "Foodies",
        "Art enthusiasts",
        "Short break anniversaries",
        "Couples who love energy",
      ]}
    />
  );
}
