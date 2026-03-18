import { CollectionPage } from "@/components/marketing/CollectionPage";

export const metadata = {
  title: "Adventure & Romance | Luxury Concierge South Africa",
  description:
    "Hot air balloons, mountain hikes, canyon experiences, and secluded wilderness retreats for the bold at heart.",
};

export default function AdventurePage() {
  return (
    <CollectionPage
      title="Adventure & Romance"
      subtitle="Thrill meets intimacy"
      description="For couples who crave something beyond the ordinary. Combine adrenaline-fuelled adventures with intimate, romantic moments — from hot air balloon rides over dramatic landscapes to secluded mountain lodges accessible only by helicopter. South Africa's diverse terrain is your playground."
      highlights={[
        "Hot air balloon sunrise flights over dramatic landscapes",
        "Guided mountain hikes to secret waterfalls and viewpoints",
        "Bungee jumping and canyon swings for the thrill-seekers",
        "Secluded wilderness lodges with stargazing decks",
        "River rafting and kayaking through pristine gorges",
        "Private picnics in dramatic natural amphitheatres",
      ]}
      location="Across South Africa"
      accentFrom="rgba(5, 150, 105, 0.05)"
      accentTo="rgba(245, 250, 248, 0.8)"
    />
  );
}
