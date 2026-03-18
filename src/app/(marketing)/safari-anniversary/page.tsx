import { CollectionPage } from "@/components/marketing/CollectionPage";

export const metadata = {
  title: "Safari Anniversary | Luxury Concierge South Africa",
  description:
    "Private game drives, bush dinners, and starlit luxury — celebrate your anniversary in the African wilderness.",
};

export default function SafariPage() {
  return (
    <CollectionPage
      title="Safari"
      subtitle="Big Five & bush romance"
      description="Experience the raw beauty of South Africa's finest game reserves. From the Greater Kruger to the Waterberg, our safari anniversaries combine world-class wildlife encounters with intimate luxury — private game drives at dawn, sundowner cocktails on the savanna, and candlelit dinners under ancient African skies."
      highlights={[
        "Private game drives with expert rangers in Big Five territory",
        "Star-bed sleep-outs on elevated platforms above the bush",
        "Candlelit bush dinners with gourmet multi-course menus",
        "Couples' spa treatments using indigenous botanicals",
        "Hot air balloon safaris at sunrise over the reserve",
        "Personalised photography sessions capturing your celebration",
      ]}
      location="Greater Kruger & Beyond"
      accentFrom="rgba(180, 83, 9, 0.06)"
      accentTo="rgba(251, 249, 244, 0.8)"
    />
  );
}
