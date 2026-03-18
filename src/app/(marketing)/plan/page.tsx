import { PlanWizard } from "@/components/marketing/PlanWizard";

export const metadata = {
  title: "Plan Your Anniversary | Luxury Concierge",
  description:
    "Tell us about your dream anniversary and we'll craft a bespoke celebration across South Africa.",
};

export default function PlanPage() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="mx-auto w-10 h-px bg-brass-400 mb-7" />
          <h1 className="text-3xl font-serif text-ink md:text-4xl">
            Plan Your Anniversary
          </h1>
          <p className="mt-4 text-stone-500 max-w-lg mx-auto leading-relaxed">
            Complete this short brief and your dedicated concierge will be in
            touch within 24 hours.
          </p>
        </div>
        <PlanWizard />
      </div>
    </section>
  );
}
