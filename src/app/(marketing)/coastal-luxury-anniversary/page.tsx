import { CollectionPage } from "@/components/marketing/CollectionPage";

export const metadata = {
  title: "Coastal Luxury Anniversary | Luxury Concierge South Africa",
  description:
    "Dramatic coastlines, private beach villas, whale watching, and the finest seafood the Cape has to offer.",
};

export default function CoastalPage() {
  return (
    <CollectionPage
      title="Coastal Luxury"
      subtitle="Ocean & clifftop indulgence"
      description="South Africa's coastline stretches from the wild Atlantic to the warm Indian Ocean. Whether it's a clifftop villa in Hermanus, a private beach house in Plettenberg Bay, or a luxury retreat along the Garden Route, our coastal anniversaries immerse you in the rhythm of the sea."
      highlights={[
        "Private beach villa stays with panoramic ocean views",
        "Whale watching boat excursions (seasonal)",
        "Sunset catamaran cruises with champagne service",
        "Fresh seafood feasts prepared by private chefs",
        "Couples' thalassotherapy and ocean-view spa treatments",
        "Guided coastal hikes and marine wildlife encounters",
      ]}
      location="Garden Route & Cape Coast"
      accentFrom="rgba(14, 116, 144, 0.05)"
      accentTo="rgba(248, 250, 252, 0.8)"
    />
  );
}
