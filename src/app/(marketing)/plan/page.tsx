import { PlanWizard } from "./plan-wizard";

export const metadata = {
  title: "Plan Your Anniversary | Anniversary Concierge",
  description:
    "Tell us about your dream anniversary celebration and our concierge team will craft a bespoke luxury experience across South Africa.",
};

export default function PlanPage() {
  return (
    <div className="container max-w-5xl py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Plan Your Anniversary
        </h1>
        <p className="mt-2 text-muted-foreground">
          Four quick steps and our concierge team will be in touch within 24
          hours with a bespoke proposal.
        </p>
      </div>
      <PlanWizard />
    </div>
  );
}
