import { CollectionPage } from "@/components/marketing/CollectionPage";

export const metadata = {
  title: "Safari Anniversary | Luxury Anniversary Concierge South Africa",
  description:
    "Private game drives, bush dinners, and starlit luxury — celebrate your anniversary in the African wilderness with our dedicated concierge.",
};

export default function SafariPage() {
  return (
    <CollectionPage
      title="Safari"
      subtitle="Big Five encounters & bush romance"
      description="Experience the raw beauty of South Africa's finest game reserves. From the Greater Kruger to the Waterberg and Madikwe, our safari anniversaries combine world-class wildlife encounters with intimate luxury — private traversing rights, candlelit bomas, and mornings that begin with birdsong and coffee on the deck."
      heroGradient="linear-gradient(135deg, #2D1B0E 0%, #4A3520 30%, #6B4D2E 60%, #8B6914 100%)"
      location="Greater Kruger, Sabi Sand & Beyond"
      highlights={[
        {
          title: "Private game drives",
          description: "Exclusive vehicle with your own ranger and tracker, timed for golden-hour light and optimal sightings.",
        },
        {
          title: "Star-bed sleep-outs",
          description: "Elevated platforms above the bush, mosquito-netted and lantern-lit, with the Southern Cross overhead.",
        },
        {
          title: "Candlelit bush dinners",
          description: "Multi-course menus prepared in the open air, surrounded by the sounds of the African night.",
        },
        {
          title: "Spa in the wild",
          description: "Couples' treatments using indigenous botanicals — overlooking a waterhole or riverbed.",
        },
        {
          title: "Sunrise balloon flights",
          description: "Drift over the reserve at dawn, followed by a champagne breakfast in the bush.",
        },
        {
          title: "Conservation encounters",
          description: "Behind-the-scenes wildlife conservation experiences — tracking, anti-poaching briefings, and community visits.",
        },
      ]}
      signatureExperiences={[
        "Private sundowner on a kopje with panoramic savanna views",
        "Guided bush walk ending at a hidden waterfall picnic",
        "Night drive with thermal imaging to spot nocturnal wildlife",
        "Personalised photo safari with a professional wildlife photographer",
      ]}
      idealFor={[
        "Nature lovers",
        "First-time safari visitors",
        "Milestone anniversaries",
        "Couples seeking seclusion",
        "Photography enthusiasts",
      ]}
    />
  );
}
