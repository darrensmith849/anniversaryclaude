import Link from "next/link";
import { CollectionRail } from "@/components/marketing/CollectionRail";
import { Gem, CalendarHeart, Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Cinematic backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(169,143,219,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(180,83,9,0.08),transparent_50%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 w-full">
          {/* Editorial panel */}
          <div className="max-w-2xl rounded-2xl editorial-panel border border-white/10 p-8 md:p-12 shadow-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              South Africa&apos;s Luxury Anniversary Concierge
            </p>
            <h1 className="mt-5 text-4xl leading-[1.15] md:text-5xl lg:text-[3.5rem] font-serif text-ink">
              Celebrations crafted
              <br />
              with intention
            </h1>
            <p className="mt-5 text-base text-neutral-600 leading-relaxed max-w-lg">
              From private game reserves to cliffside villas, we design
              bespoke anniversary experiences that honour your story —
              every detail considered, every moment curated.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-7 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors shadow-lg"
              >
                Start Planning
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#collections"
                className="rounded-lg border border-neutral-300 px-7 py-3 text-sm font-medium text-neutral-700 hover:bg-white/80 transition-colors"
              >
                Explore Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Collection Rail ─── */}
      <div id="collections">
        <CollectionRail />
      </div>

      {/* ─── What We Do ─── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-serif text-ink md:text-4xl">
              Your anniversary, our expertise
            </h2>
            <p className="mt-4 text-neutral-500 leading-relaxed">
              We specialise in luxury anniversary celebrations across South Africa.
              From initial vision to final detail, your dedicated concierge
              handles every element of your celebration.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 hover-lift">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand-50 text-amber-700">
                <Gem size={20} />
              </div>
              <h3 className="mt-5 text-lg font-serif text-ink">Curated Getaways</h3>
              <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                Hand-selected properties and experiences matched to your preferences,
                style, and anniversary vision. No generic packages — only bespoke itineraries.
              </p>
            </div>

            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 hover-lift">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lilac-50 text-lilac-500">
                <CalendarHeart size={20} />
              </div>
              <h3 className="mt-5 text-lg font-serif text-ink">Concierge Planning</h3>
              <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                From initial brief to final farewell, your dedicated concierge manages
                every reservation, transfer, and special arrangement.
              </p>
            </div>

            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 hover-lift">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand-50 text-amber-700">
                <Sparkles size={20} />
              </div>
              <h3 className="mt-5 text-lg font-serif text-ink">Signature Experiences</h3>
              <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                Private chefs, couples&apos; spa rituals, helicopter transfers,
                sunset cruises, and personalised touches that elevate your celebration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Service Framing ─── */}
      <section className="py-20 bg-white/60">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              Concierge services
            </p>
            <h2 className="mt-3 text-3xl font-serif text-ink">
              Choose your level of service
            </h2>
            <p className="mt-3 text-sm text-neutral-500">
              Every anniversary is different. Our tiered planning ensures the right
              level of attention for your celebration.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Spark",
                price: "From R1,500",
                desc: "Curated recommendations and a personalised itinerary outline to inspire your celebration.",
              },
              {
                name: "Signature Weekend",
                price: "From R4,500",
                desc: "Full concierge planning for a weekend anniversary — accommodation, dining, and special touches.",
              },
              {
                name: "Elite Anniversary",
                price: "From R9,500",
                desc: "End-to-end planning for a multi-day celebration with premium properties and bespoke experiences.",
              },
              {
                name: "Icon Collection",
                price: "From R18,000",
                desc: "Our most comprehensive service — safari, coastal, or multi-destination with every detail perfected.",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 hover-lift"
              >
                <h3 className="font-serif text-lg text-ink">{tier.name}</h3>
                <p className="mt-1 text-sm font-medium text-amber-700">{tier.price}</p>
                <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-neutral-400">
            Planning fees may be credited toward final bookings. All services include a dedicated concierge.
          </p>
        </div>
      </section>

      {/* ─── CTA Band ─── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl bg-neutral-900 p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(169,143,219,0.1),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-serif text-white">Ready to begin?</h2>
              <p className="mt-4 text-neutral-400 max-w-lg mx-auto leading-relaxed">
                Share your vision in a short planning brief and your dedicated concierge
                will be in touch within 24 hours.
              </p>
              <Link
                href="/plan"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition-colors shadow-lg"
              >
                Plan Your Anniversary
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
