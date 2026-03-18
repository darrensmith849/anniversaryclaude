import { CollectionPage } from "@/components/marketing/CollectionPage";

export const metadata = {
  title: "Winelands Anniversary | Luxury Concierge South Africa",
  description:
    "Vineyard elegance in Stellenbosch and Franschhoek — world-class wine, fine dining, and Cape Dutch charm.",
};

export default function WinelandsPage() {
  return (
    <CollectionPage
      title="Winelands"
      subtitle="Vineyard elegance"
      description="The Cape Winelands offer a tapestry of rolling vineyards, world-class gastronomy, and Cape Dutch architecture. Celebrate your anniversary among some of the world's finest wine estates, with private tastings, chef's table experiences, and the warm hospitality that defines this region."
      highlights={[
        "Private wine tastings at award-winning estates",
        "Chef's table experiences with wine pairing menus",
        "Hot air balloon flights over the vineyards at dawn",
        "Couples' cooking classes with celebrated local chefs",
        "Scenic cycling tours through Franschhoek Valley",
        "Luxury estate accommodation with mountain views",
      ]}
      location="Stellenbosch & Franschhoek"
      accentFrom="rgba(107, 33, 168, 0.05)"
      accentTo="rgba(248, 246, 252, 0.8)"
    />
  );
}
