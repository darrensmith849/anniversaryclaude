import { CollectionPage } from "@/components/marketing/CollectionPage";

export const metadata = {
  title: "Coastal Luxury Anniversary | Luxury Anniversary Concierge South Africa",
  description:
    "Dramatic coastlines, private beach villas, and the finest seafood — celebrate your anniversary along South Africa's stunning coast.",
};

export default function CoastalPage() {
  return (
    <CollectionPage
      title="Coastal Luxury"
      subtitle="Where ocean meets opulence"
      description="South Africa's coastline stretches from the wild Atlantic to the warm Indian Ocean — each stretch with its own character and drama. Whether it's a clifftop suite in Hermanus, a private beach house on the Garden Route, or a barefoot villa in the Overberg, coastal anniversaries are defined by salt air, endless horizons, and the restoring rhythm of the sea."
      heroGradient="linear-gradient(135deg, #0C2D3F 0%, #164B60 30%, #1B6B8A 60%, #2B90B0 100%)"
      location="Garden Route, Hermanus & Cape Coast"
      highlights={[
        {
          title: "Clifftop villa stays",
          description: "Wake to crashing waves and unbroken ocean views from your private terrace or infinity pool.",
        },
        {
          title: "Whale watching",
          description: "Seasonal boat excursions in Walker Bay — some of the best land-based whale viewing in the world.",
        },
        {
          title: "Sunset sailing",
          description: "Private catamaran cruise along the coast with champagne, platters, and the sinking sun.",
        },
        {
          title: "Seafood feasts",
          description: "Fresh catches prepared by private chefs — lobster on the deck, oysters at sunset, beach braais.",
        },
        {
          title: "Thalassotherapy spa",
          description: "Ocean-view treatments using marine extracts and local botanicals, designed for two.",
        },
        {
          title: "Marine encounters",
          description: "Guided kayak and snorkel experiences, seal colony visits, and marine big-five boat safaris.",
        },
      ]}
      signatureExperiences={[
        "Private beach picnic with a chef-prepared seafood platter and chilled wine",
        "Guided cliff-path walk ending at a hidden cove for a champagne surprise",
        "Helicopter transfer along the coastline with a scenic lunch stop",
        "Full-moon beach dinner with live acoustic music",
      ]}
      idealFor={[
        "Beach lovers",
        "Wellness seekers",
        "Seafood enthusiasts",
        "Slow-pace romantics",
        "Couples seeking restoration",
      ]}
    />
  );
}
