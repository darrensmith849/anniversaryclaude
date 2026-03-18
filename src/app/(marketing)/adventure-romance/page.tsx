import { CollectionPage } from "@/components/marketing/CollectionPage";

export const metadata = {
  title: "Adventure & Romance | Luxury Anniversary Concierge South Africa",
  description:
    "Hot air balloons, mountain hikes, canyon experiences, and secluded wilderness retreats — for couples who want adventure with intimacy.",
};

export default function AdventurePage() {
  return (
    <CollectionPage
      title="Adventure & Romance"
      subtitle="Where adrenaline meets intimacy"
      description="For couples who crave something beyond the ordinary. Combine heart-racing adventures with deeply romantic moments — from hot air balloon rides over dramatic landscapes to helicopter-access mountain lodges and wild swimming in hidden gorges. South Africa's terrain is extraordinarily diverse, and this collection uses every bit of it."
      heroGradient="linear-gradient(135deg, #1A2E1A 0%, #2D4A2D 30%, #3D6B3D 60%, #5A8B5A 100%)"
      location="Drakensberg, Cederberg & Wild Places"
      highlights={[
        {
          title: "Hot air ballooning",
          description: "Sunrise ascent over dramatic landscapes — from the Magaliesberg to the Pilanesberg.",
        },
        {
          title: "Mountain retreats",
          description: "Secluded lodges in the Drakensberg or Cederberg, accessible only by 4x4 or helicopter.",
        },
        {
          title: "Canyon adventures",
          description: "Guided abseiling, kloofing, and zip-lining through ancient sandstone gorges.",
        },
        {
          title: "Stargazing decks",
          description: "Remote wilderness stays with zero light pollution — Southern Hemisphere skies at their most spectacular.",
        },
        {
          title: "River & trail",
          description: "Private guided hikes to waterfalls, wild swimming spots, and river kayaking through pristine valleys.",
        },
        {
          title: "Horseback exploration",
          description: "Multi-day riding trails through mountains and plains, ending at luxury tented camps.",
        },
      ]}
      signatureExperiences={[
        "Helicopter drop to a private mountaintop for a surprise picnic",
        "Tandem paragliding over the coast followed by a beachside dinner",
        "Multi-day horseback safari ending at a secluded luxury camp",
        "Night hike to a hidden waterfall with a fire-lit dinner setup",
      ]}
      idealFor={[
        "Active couples",
        "Thrill seekers",
        "Nature lovers",
        "Off-grid romantics",
        "Milestone celebrations",
      ]}
    />
  );
}
