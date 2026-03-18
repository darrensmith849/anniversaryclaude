import Link from "next/link";
import { HeroReel, type HeroClip } from "@/components/marketing/HeroReel";
import { CoverageSignal } from "@/components/marketing/infographics/CoverageSignal";
import { JourneyArc } from "@/components/marketing/infographics/JourneyArc";

const heroClips: HeroClip[] = [
  {
    src: "/videos/hero/hero-01-kruger.mp4",
    poster: "/images/hero/hero-01-kruger.jpg",
    label: "Kruger",
  },
  {
    src: "/videos/hero/hero-02-cape-town.mp4",
    poster: "/images/hero/hero-02-cape-town.jpg",
    label: "Cape Town",
  },
  {
    src: "/videos/hero/hero-03-winelands.mp4",
    poster: "/images/hero/hero-03-winelands.jpg",
    label: "Winelands",
  },
];

const heroChips = [
  "Safari Escapes",
  "Winelands Retreats",
  "Coastal Luxury",
  "City Celebrations",
  "Adventure & Romance",
  "Concierge Planned",
];

const editorialCards = [
  {
    overline: "Curated",
    title: "Curated Getaways",
    text: "Luxury stays selected for milestone moments, with route and pacing built for celebration.",
    href: "/safari-anniversary",
  },
  {
    overline: "Planning",
    title: "Concierge Planning",
    text: "Seamless anniversary planning with thoughtful sequencing, reservations, and stay logistics.",
    href: "/plan",
  },
  {
    overline: "Signature",
    title: "Signature Add-Ons",
    text: "The details that elevate the stay, from private dining moments to bespoke in-room touches.",
    href: "/winelands-anniversary",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[94vh] px-4 pb-16 pt-24 md:pt-28">
        <HeroReel clips={heroClips} />

        <div className="container relative z-10 flex min-h-[72vh] items-center justify-center">
          <div className="mx-auto max-w-4xl text-center">
            <p className="m-overline">South Africa&apos;s Anniversary Concierge</p>
            <h1 className="m-display mt-4 text-5xl leading-[0.95] text-[var(--m-ink)] md:text-7xl xl:text-[5.5rem]">
              Romantic <span className="m-gradient-text">Journeys</span>,
              <br />
              Planned Beautifully
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--m-muted)] md:text-lg">
              Curated anniversary escapes across South Africa with luxury stays, thoughtful details, and seamless arrangements.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/plan" className="m-btn-primary">
                Start Your Brief
              </Link>
              <Link href="/safari-anniversary" className="m-btn-glass">
                View Collections
              </Link>
            </div>
          </div>
        </div>

        <div className="container relative z-10 pb-2">
          <div className="m-glass m-hero-strip px-3 py-3 md:px-4 md:py-4">
            {heroChips.map((chip, index) => (
              <div key={chip} className={`m-chip ${index === 0 ? "m-chip-active" : ""}`}>
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-section px-4 pt-0">
        <div className="container grid gap-8 lg:grid-cols-[1.02fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="m-overline">How It Works</p>
            <h2 className="m-display text-4xl leading-tight text-[var(--m-ink)] md:text-5xl">
              Concierge Flow,
              <br />
              Designed For Milestone Ease
            </h2>
            <p className="max-w-xl text-[var(--m-muted)]">
              From brief to celebration, every step is sequenced for clarity: destination curation, outreach, tailored perks, and a confirmed plan ready for arrival.
            </p>
          </div>
          <JourneyArc />
        </div>
      </section>

      <section className="m-section px-4 pt-0">
        <div className="container relative space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className="m-overline">What We Do</p>
            <h2 className="m-display text-4xl leading-tight text-[var(--m-ink)] md:text-6xl">
              Curated Anniversary Escapes,
              <br />
              Structured With Editorial Precision
            </h2>
            <p className="max-w-2xl text-[var(--m-muted)]">
              South Africa collections, concierge-led planning, and elevated touches designed around the way you want to celebrate.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {editorialCards.map((card) => (
              <article key={card.title} className="m-card p-7">
                <p className="m-overline">{card.overline}</p>
                <h3 className="m-display mt-3 text-3xl text-[var(--m-ink)]">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--m-muted)]">{card.text}</p>
                <Link href={card.href} className="m-link-accent mt-6 inline-flex text-xs uppercase tracking-[0.15em] text-[var(--m-amethyst)]">
                  Explore
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="m-section px-4 pt-0">
        <div className="container">
          <CoverageSignal />
        </div>
      </section>
    </div>
  );
}
