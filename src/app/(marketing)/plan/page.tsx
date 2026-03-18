import { PlanWizard } from "./plan-wizard";

export const metadata = {
  title: "Plan Your Anniversary | Anniversary Concierge",
  description:
    "Share your preferences and request details for a curated anniversary plan across South Africa.",
};

export default function PlanPage() {
  return (
    <div className="flex flex-col">
      <section className="m-hero-bg px-4 py-16 md:py-20">
        <div className="container max-w-3xl text-center">
          <p className="m-overline">South Africa&apos;s Anniversary Concierge</p>
          <h1 className="m-display mt-3 text-5xl leading-tight text-[var(--m-text)] md:text-6xl">Plan Your Anniversary</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--m-text-muted)]">
            Tell us your dates, vibe, and budget band. We shape a tailored direction for your anniversary escape.
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
