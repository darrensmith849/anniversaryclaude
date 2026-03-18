import { PlanWizard } from "./plan-wizard";

export const metadata = {
  title: "Plan Your Anniversary | Anniversary Concierge",
  description:
    "Share your preferences and request details for a curated anniversary plan across South Africa.",
};

export default function PlanPage() {
  return (
    <div className="flex flex-col">
      <section className="m-hero-bg px-4 py-12 md:py-16">
        <div className="container text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--m-accent)]">
            South Africa&apos;s Anniversary Concierge
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Plan Your Anniversary
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[var(--m-muted)]">
            Anniversary experiences across South Africa, starting with a concise private brief.
          </p>
        </div>
      </section>

      <div className="m-divider" />

      <section className="px-4 py-10 md:py-14">
        <div className="container max-w-5xl">
          <PlanWizard />
        </div>
      </section>
    </div>
  );
}
