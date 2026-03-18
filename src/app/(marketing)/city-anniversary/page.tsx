import { CollectionPage } from "@/components/marketing/CollectionPage";

export const metadata = {
  title: "City Anniversary | Luxury Concierge South Africa",
  description:
    "Urban sophistication — rooftop dining, art galleries, helicopter tours, and vibrant nightlife in Cape Town and Johannesburg.",
};

export default function CityPage() {
  return (
    <CollectionPage
      title="City"
      subtitle="Urban sophistication"
      description="South Africa's cities pulse with creativity, culture, and world-class dining. From Cape Town's waterfront glamour to Johannesburg's art scene, a city anniversary delivers rooftop cocktails, private gallery tours, helicopter rides over the peninsula, and the electric energy of urban celebration."
      highlights={[
        "Rooftop fine dining at award-winning restaurants",
        "Private art gallery and street art walking tours",
        "Helicopter flights over Table Mountain and the peninsula",
        "Luxury penthouse suite stays in prime locations",
        "Exclusive shopping experiences with personal stylists",
        "Live jazz evenings and curated nightlife itineraries",
      ]}
      location="Cape Town & Johannesburg"
      accentFrom="rgba(64, 64, 64, 0.04)"
      accentTo="rgba(250, 250, 250, 0.8)"
    />
  );
}
