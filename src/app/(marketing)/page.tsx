import Link from "next/link";
import { CollectionRail } from "@/components/marketing/CollectionRail";
import { HeroImage } from "@/components/marketing/HeroImage";
import { Gem, CalendarHeart, Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <HeroImage
            src="/images/home/home-hero-cape-town.jpg"
            alt="Dramatic Cape Town coastline at golden hour"
            fallbackGradient="linear-gradient(135deg, #1A1A2E 0%, #2C2C3A 30%, #3D3528 55%, #4A3520 75%, #2C2C3A 100%)"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/85 via-charcoal-900/50 to-charcoal-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-charcoal-900/15" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-36 w-full">
          <div className="max-w-2xl">
            <div className="w-10 h-px bg-brass-400 mb-7" />
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-stone-300/80">
              South Africa&apos;s Luxury Anniversary Concierge
            </p>
            <h1 className="mt-6 text-4xl leading-[1.08] md:text-5xl lg:text-[3.75rem] font-serif text-white">
              Celebrations crafted
              <br />
              with intention
            </h1>
            <p className="mt-7 text-[15px] text-stone-300/85 leading-relaxed max-w-lg">
              From private game reserves to cliffside villas, we design
              bespoke anniversary experiences that honour your story —
              every detail considered, every moment curated.
            </p>
            <div className="mt-11 flex flex-wrap gap-4">
              <Link
                href="/plan"
                className="cta-light inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 text-sm font-medium tracking-wide"
              >
                Start Planning
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
              <Link
                href="#collections"
                className="rounded-lg border border-white/15 px-7 py-3.5 text-sm font-medium text-white/80 hover:bg-white/8 transition-colors backdrop-blur-sm tracking-wide"
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

      {/* ─── How It Works ─── */}
      <section className="py-32 surface-warm">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto w-10 h-px bg-brass-400 mb-7" />
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-stone-400">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-serif text-ink md:text-4xl">
              Your anniversary, our expertise
            </h2>
            <p className="mt-5 text-stone-500 leading-relaxed">
              We specialise in luxury anniversary celebrations across South Africa.
              From initial vision to final detail, your dedicated concierge
              handles every element.
            </p>
          </div>

          <div className="mt-18 grid gap-10 md:grid-cols-3" style={{ marginTop: "4.5rem" }}>
            {[
              { icon: Gem, title: "Curated Getaways", num: "01",
                text: "Hand-selected properties and experiences matched to your preferences, style, and anniversary vision. No generic packages — only bespoke itineraries." },
              { icon: CalendarHeart, title: "Concierge Planning", num: "02",
                text: "From initial brief to final farewell, your dedicated concierge manages every reservation, transfer, and special arrangement." },
              { icon: Sparkles, title: "Signature Experiences", num: "03",
                text: "Private chefs, couples' spa rituals, helicopter transfers, sunset cruises, and personalised touches that elevate your celebration." },
            ].map((card) => (
              <div key={card.num} className="group">
                <div className="rounded-2xl border border-stone-200/80 bg-white p-8 lg:p-10 hover-lift">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 border border-stone-200/60">
                      <card.icon size={18} className="text-brass-500" />
                    </div>
                    <span className="text-[11px] font-medium tracking-[0.2em] text-stone-300">{card.num}</span>
                  </div>
                  <h3 className="text-lg font-serif text-ink">{card.title}</h3>
                  <p className="mt-4 text-sm text-stone-500 leading-[1.7]">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Service Tiers ─── */}
      <section className="py-32 surface-champagne">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="mx-auto w-10 h-px bg-brass-400 mb-7" />
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-stone-400">
              Concierge services
            </p>
            <h2 className="mt-4 text-3xl font-serif text-ink">
              Tailored to your celebration
            </h2>
            <p className="mt-5 text-sm text-stone-500 leading-relaxed max-w-md mx-auto">
              Every anniversary is different. Four levels of concierge service,
              each designed for the scale and ambition of your celebration.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Spark",
                tagline: "Inspiration & guidance",
                price: "From R1,500",
                desc: "Curated recommendations and a personalised itinerary outline to inspire your celebration.",
              },
              {
                name: "Signature",
                tagline: "Weekend perfection",
                price: "From R4,500",
                desc: "Full concierge planning for a weekend anniversary — accommodation, dining, and special touches.",
                featured: true,
              },
              {
                name: "Elite",
                tagline: "Multi-day luxury",
                price: "From R9,500",
                desc: "End-to-end planning for a multi-day celebration with premium properties and bespoke experiences.",
              },
              {
                name: "Icon",
                tagline: "The ultimate journey",
                price: "From R18,000",
                desc: "Our most comprehensive service — safari, coastal, or multi-destination with every detail perfected.",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`group relative rounded-xl p-7 lg:p-8 hover-lift ${
                  tier.featured
                    ? "bg-white border border-stone-200/80 shadow-[0_2px_8px_rgba(26,26,46,0.04),0_8px_24px_rgba(26,26,46,0.06)]"
                    : "bg-white/70 border border-stone-200/50"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-2.5 left-7 rounded-full bg-charcoal-900 px-3 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-white">
                    Most popular
                  </span>
                )}
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-400">{tier.tagline}</p>
                <h3 className="mt-3 font-serif text-xl text-ink">{tier.name}</h3>
                <p className="mt-1.5 text-[13px] font-medium text-brass-600">{tier.price}</p>
                <div className="my-5 divider-fade" />
                <p className="text-[13px] text-stone-500 leading-[1.7]">{tier.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-xs text-stone-400 tracking-wide">
            Planning fees may be credited toward final bookings. All services include a dedicated concierge.
          </p>
        </div>
      </section>

      {/* ─── CTA Band ─── */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <HeroImage
                src="/images/home/home-cta-winelands.jpg"
                alt="Cape Winelands at golden hour"
                fallbackGradient="linear-gradient(135deg, #1A1A2E 0%, #2E1A3D 40%, #3D2B1A 70%, #1A1A2E 100%)"
              />
              <div className="absolute inset-0 bg-charcoal-900/75" />
            </div>

            <div className="relative px-10 py-16 md:px-16 md:py-20 text-center">
              <div className="mx-auto w-10 h-px bg-brass-400 mb-7" />
              <h2 className="text-3xl md:text-4xl font-serif text-white">Ready to begin?</h2>
              <p className="mt-5 text-stone-300/75 max-w-lg mx-auto leading-relaxed">
                Share your vision in a short planning brief and your dedicated concierge
                will be in touch within 24 hours.
              </p>
              <Link
                href="/plan"
                className="cta-light mt-9 inline-flex items-center gap-2.5 rounded-lg px-8 py-3.5 text-sm font-medium tracking-wide"
              >
                Plan Your Anniversary
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
