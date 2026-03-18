import Link from "next/link";
import { CollectionRail } from "@/components/marketing/CollectionRail";
import { Gem, CalendarHeart, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
              South Africa&apos;s Luxury Anniversary Concierge
            </p>
            <h1 className="mt-4 text-4xl leading-tight md:text-5xl lg:text-6xl font-serif text-ink">
              Celebrations crafted <br className="hidden md:block" />
              with intention
            </h1>
            <p className="mt-6 text-lg text-neutral-500 leading-relaxed max-w-xl">
              From private game reserves to cliffside villas, we design
              bespoke anniversary experiences that honour your story —
              every detail, every moment, every sense.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/plan"
                className="rounded-lg bg-neutral-900 px-8 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                Start Planning
              </Link>
              <Link
                href="#collections"
                className="rounded-lg border border-neutral-300 px-8 py-3 text-sm font-medium text-neutral-700 hover:bg-white transition-colors"
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-lilac-100/40 to-sand-100/40 blur-3xl" />
      </section>

      {/* ─── Collection Rail ─── */}
      <div id="collections">
        <CollectionRail />
      </div>

      {/* ─── What We Do ─── */}
      <section className="py-20 bg-white/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif text-ink">What We Do</h2>
            <p className="mt-4 text-neutral-500 leading-relaxed">
              We&apos;re a dedicated concierge service specialising in luxury
              anniversary celebrations across South Africa. We handle
              everything — from finding the perfect property to arranging
              private chefs, spa treatments, and once-in-a-lifetime
              experiences.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 hover-lift">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lilac-50 text-lilac-500">
                <Gem size={22} />
              </div>
              <h3 className="mt-5 text-lg font-serif text-ink">
                Curated Getaways
              </h3>
              <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                Hand-picked properties and experiences matched to your
                preferences, budget, and anniversary vision. No generic
                packages — only bespoke itineraries.
              </p>
            </div>

            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 hover-lift">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand-50 text-amber-700">
                <CalendarHeart size={22} />
              </div>
              <h3 className="mt-5 text-lg font-serif text-ink">
                Concierge Planning
              </h3>
              <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                From initial brief to final farewell, your dedicated
                concierge manages every reservation, transfer, and
                special arrangement.
              </p>
            </div>

            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 hover-lift">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lilac-50 text-lilac-400">
                <Sparkles size={22} />
              </div>
              <h3 className="mt-5 text-lg font-serif text-ink">
                Signature Add-ons
              </h3>
              <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                Private chefs, couples&apos; spa rituals, helicopter
                transfers, sunset cruises, and personalised gifts to
                make your celebration extraordinary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Band ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-900 to-neutral-800 p-10 md:p-14 text-center">
            <h2 className="text-3xl font-serif text-white">
              Ready to begin?
            </h2>
            <p className="mt-4 text-neutral-300 max-w-lg mx-auto leading-relaxed">
              Share your vision in our quick planning brief and
              we&apos;ll start crafting your perfect anniversary.
            </p>
            <Link
              href="/plan"
              className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              Plan Your Anniversary
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
