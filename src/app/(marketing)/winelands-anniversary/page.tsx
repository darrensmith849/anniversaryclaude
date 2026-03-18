import { CollectionPage } from "@/components/marketing/CollectionPage";

export const metadata = {
  title: "Winelands Anniversary | Luxury Anniversary Concierge South Africa",
  description:
    "Vineyard elegance in Stellenbosch and Franschhoek — world-class wine, fine dining, and Cape Dutch charm for your anniversary.",
};

export default function WinelandsPage() {
  return (
    <CollectionPage
      title="Winelands"
      subtitle="Vineyard elegance & gastronomic artistry"
      description="The Cape Winelands weave together rolling vineyards, world-class gastronomy, and Cape Dutch architecture. Your anniversary unfolds among some of the world's finest wine estates — private cellar tastings, languid chef's table lunches, and golden afternoon light filtering through centuries-old oaks."
      heroGradient="linear-gradient(135deg, #2E1A3D 0%, #4A2D5C 30%, #6B4480 60%, #8B6B99 100%)"
      location="Stellenbosch, Franschhoek & Paarl"
      highlights={[
        {
          title: "Private cellar tastings",
          description: "Behind-closed-doors tastings with winemakers, including rare vintages not available to the public.",
        },
        {
          title: "Chef's table experiences",
          description: "Intimate multi-course menus with wine pairings, often in the kitchen or vineyard itself.",
        },
        {
          title: "Vineyard cycling",
          description: "Leisurely e-bike routes between estates, with tastings and cheese platters along the way.",
        },
        {
          title: "Balloon over the vines",
          description: "Dawn ascent over the Franschhoek Valley, landing among the vineyards for a champagne breakfast.",
        },
        {
          title: "Cape Dutch heritage",
          description: "Explore gabled manor houses and historical gardens, rich with centuries of winemaking tradition.",
        },
        {
          title: "Olive oil & artisan trail",
          description: "Visit boutique olive farms, chocolate studios, and artisan producers nestled in the valleys.",
        },
      ]}
      signatureExperiences={[
        "Twilight dinner in a private vineyard clearing, torchlit and intimate",
        "Couples' cooking class with a celebrated Franschhoek chef",
        "Vintage car tour through the winelands with a picnic hamper",
        "Sunset horse ride through the vineyards",
      ]}
      idealFor={[
        "Food & wine enthusiasts",
        "Relaxed pace travellers",
        "Cultural explorers",
        "Romantic weekends",
        "Gourmands",
      ]}
    />
  );
}
