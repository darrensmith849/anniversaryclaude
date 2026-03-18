import Link from "next/link";
import { collections, budgetBands } from "@/data/collections";
import { CollectionsFilter } from "./collections-filter";

export const metadata = {
  title: "Collections | Anniversary Concierge",
  description:
    "Explore curated anniversary experiences across South Africa.",
};

export default function CollectionsPage() {
  return (
    <div className="flex flex-col">
      <section className="m-hero-bg px-4 py-16 md:py-22">
        <div className="container max-w-3xl text-center">
          <p className="m-overline">Curated Collections</p>
          <h1 className="m-display mt-3 text-5xl text-[var(--m-text)] md:text-6xl">Featured Venues And Recommended Stays</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--m-text-muted)]">
            Safari, winelands, coastal, city, and adventure collections designed for anniversary travel.
          </p>
        </div>
      </section>

      <div className="m-divider" />

      <section className="m-section px-4 py-12 md:py-16">
        <div className="container relative">
          <CollectionsFilter collections={collections} />
        </div>
      </section>

      <div className="m-divider" />

      <section className="m-section px-4 py-16 md:py-20">
        <div className="container relative">
          <div className="mb-10 text-center">
            <p className="m-overline">Investment Bands</p>
            <h2 className="m-display mt-3 text-4xl text-[var(--m-text)] md:text-5xl">Planning Tiers</h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-5">
            {budgetBands.map((band) => (
              <div key={band.id} className="m-card p-5 text-center">
                <p className="m-overline">{band.label}</p>
                <p className="mt-2 text-base font-semibold text-[var(--m-text)]">{band.range}</p>
                <p className="mt-2 text-xs text-[var(--m-text-muted)]">{band.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-section px-4 pt-4">
        <div className="container relative text-center">
          <div className="m-glass p-10 md:p-14">
            <p className="m-overline">Concierge Brief</p>
            <h2 className="m-display mt-3 text-4xl text-[var(--m-text)] md:text-5xl">Found Your Direction?</h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--m-text-muted)]">
              Share your preferences and we&apos;ll curate the right collection fit for your celebration.
            </p>
            <Link href="/plan" className="m-btn-primary mt-8">
              Start Planning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
