import { PlanWizard } from "./plan-wizard";

export const metadata = {
  title: "Plan Your Anniversary | Anniversary Concierge",
  description:
    "Tell us about your dream anniversary celebration and our concierge team will craft a bespoke luxury experience across South Africa.",
};

export default function PlanPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="m-hero-bg px-4 py-12 md:py-16">
        <div className="container text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--m-accent)]">
            Four Quick Steps
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Plan Your Anniversary
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[var(--m-muted)]">
            Tell us your preferences and our concierge team will be in touch
            within 24 hours with a bespoke proposal.
          </p>
        </div>
      </section>

      <div className="m-divider" />

      {/* Wizard */}
      <section className="px-4 py-10 md:py-14">
        <div className="container max-w-5xl">
          <PlanWizard />
        </div>
      </section>
    </div>
  );
}
