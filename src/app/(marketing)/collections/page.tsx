import { collections, budgetBands } from "@/data/collections";
import { CollectionsFilter } from "./collections-filter";
import Link from "next/link";

export const metadata = {
  title: "Collections | Anniversary Concierge",
  description:
    "Explore curated anniversary experiences across South Africa — from vineyard retreats to coastal escapes and safari adventures.",
};

export default function CollectionsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="m-hero-bg px-4 py-16 md:py-24">
        <div className="container text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--m-accent)]">
            Curated Experiences
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            Our Collections
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[var(--m-muted)]">
            Handpicked destinations from our concierge network. Every option is
            vetted for unforgettable celebrations.
          </p>
        </div>
      </section>

      <div className="m-divider" />

      {/* Filter + Grid */}
      <section className="px-4 py-12 md:py-16">
        <div className="container">
          <CollectionsFilter collections={collections} />
        </div>
      </section>

      <div className="m-divider" />

      {/* Budget bands */}
      <section className="px-4 py-16 md:py-20">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--m-accent)]">
              Investment
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              Typical Budget Bands
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-[var(--m-muted)]">
              Every celebration is unique. These bands help us curate the right
              tier of experiences.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-5">
            {budgetBands.map((b) => (
              <div
                key={b.id}
                className="m-glass rounded-2xl p-5 text-center transition-all hover:border-[var(--m-accent)]/30"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--m-accent-2)]">
                  {b.label}
                </p>
                <p className="mt-2 text-lg font-bold">{b.range}</p>
                <p className="mt-1 text-xs text-[var(--m-muted)]">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="m-divider" />

      {/* CTA (dark contrast) */}
      <section className="relative overflow-hidden bg-[var(--m-dark)] px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--m-accent)]/15 via-transparent to-[var(--m-accent-2)]/10" />
        <div className="container relative z-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Found something you love?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/60">
            Tell us your preferences and we&apos;ll craft a bespoke itinerary
            around your chosen destinations.
          </p>
          <div className="mt-8">
            <Link
              href="/plan"
              className="m-btn-primary inline-flex h-12 items-center rounded-full px-10 text-base"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
