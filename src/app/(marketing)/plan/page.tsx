import { PlanWizard } from "@/components/marketing/PlanWizard";

export const metadata = {
  title: "Plan Your Anniversary | Luxury Concierge",
  description:
    "Tell us about your dream anniversary and we'll craft a bespoke celebration across South Africa.",
};

export default function PlanPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-serif text-ink md:text-4xl">
            Plan Your Anniversary
          </h1>
          <p className="mt-3 text-neutral-500 max-w-lg mx-auto">
            Complete this short brief and your dedicated concierge will be in
            touch within 24 hours.
          </p>
        </div>
        <PlanWizard />
      </div>
    </section>
  );
}
