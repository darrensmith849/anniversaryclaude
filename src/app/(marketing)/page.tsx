import Link from "next/link";
import Image from "next/image";
import { CollectionRail } from "@/components/marketing/home/CollectionRail";
import { HeroMedia, type HeroMediaClip } from "@/components/marketing/home/HeroMedia";
import { JourneyExplorer } from "@/components/marketing/home/JourneyExplorer";
import { PhotoCard } from "@/components/marketing/home/PhotoCard";

const heroClips: HeroMediaClip[] = [
  { src: "/videos/hero/hero-01-kruger.mp4", poster: "/images/hero/hero-01-kruger.jpg" },
  { src: "/videos/hero/hero-02-cape-town.mp4", poster: "/images/hero/hero-02-cape-town.jpg" },
  { src: "/videos/hero/hero-03-winelands.mp4", poster: "/images/hero/hero-03-winelands.jpg" },
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
    imageSrc: "/images/sa/kruger-safari.jpg",
    imageAlt: "Safari reserve image",
  },
  {
    overline: "Planning",
    title: "Concierge Planning",
    text: "Seamless anniversary planning with thoughtful sequencing, reservations, and stay logistics.",
    href: "/plan",
    imageSrc: "/images/sa/cape-town-table-mountain.jpg",
    imageAlt: "Cape Town and Table Mountain",
  },
  {
    overline: "Signature",
    title: "Signature Add-Ons",
    text: "The details that elevate the stay, from private dining moments to bespoke in-room touches.",
    href: "/winelands-anniversary",
    imageSrc: "/images/sa/luxury-hotel-interior.jpg",
    imageAlt: "Luxury hotel interior detail",
  },
];

export default function HomePage() {
  return (
    <div className="home-editorial-root flex flex-col">
      <section className="home-hero relative min-h-screen px-4 pb-12 pt-24 md:pt-28">
        <HeroMedia clips={heroClips} />

        <div className="container relative z-10 flex min-h-[72vh] items-center justify-center">
          <div className="home-hero-panel mx-auto max-w-[54rem] text-center">
            <p className="m-overline">South Africa&apos;s Anniversary Concierge</p>
            <h1 className="m-display mt-4 text-5xl leading-[0.95] text-[var(--m-text)] md:text-7xl xl:text-[5.5rem]">
              Romantic <span className="home-hero-accent">Journeys</span>,
              <br />
              Planned Beautifully
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--m-text-muted)] md:text-lg">
              Curated anniversary escapes across South Africa with luxury stays, thoughtful details, and seamless arrangements.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/plan" className="home-btn-primary">
                Start your brief
              </Link>
              <Link href="/collections" className="home-btn-secondary">
                View collections
              </Link>
            </div>
          </div>
        </div>

        <div className="container relative z-10">
          <div className="home-rail grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {heroChips.map((chip) => (
              <div key={chip} className="home-rail-item">
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-section px-4 pt-10">
        <div className="container">
          <CollectionRail />
        </div>
      </section>

      <JourneyExplorer />

      <section className="m-section px-4 pt-0">
        <div className="container">
          <div className="home-boxed-panel grid gap-10 p-7 md:p-10 lg:grid-cols-[1.25fr_0.9fr]">
            <div className="space-y-4">
              <p className="m-overline">What We Do</p>
              <h2 className="m-display text-4xl leading-tight text-[var(--m-text)] md:text-6xl">
                Curated Anniversary Escapes,
                <br />
                Structured With Editorial Precision
              </h2>
              <p className="max-w-2xl text-[var(--m-text-muted)]">
                South Africa collections, concierge-led planning, and elevated touches designed around the way you want to celebrate.
              </p>
            </div>
            <div className="home-mini-box self-center">
              <ul className="space-y-3 text-sm leading-relaxed text-[var(--m-text-muted)]">
                <li>Curated shortlists in 24-48h</li>
                <li>Partner outreach and perks requests handled for you</li>
                <li>A seamless plan, beautifully delivered</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="m-section px-4 pt-0">
        <div className="container relative">
          <div className="grid gap-5 lg:grid-cols-3">
            {editorialCards.map((card) => (
              <PhotoCard key={card.title}>
                <article className="home-card overflow-hidden p-0">
                  <div className="relative h-44 w-full overflow-hidden border-b border-[var(--m-border)]">
                    {/* Keeping imagery inside boxed cards for readability */}
                    <Image src={card.imageSrc} alt={card.imageAlt} fill className="object-cover" />
                    <div className="m-img-overlay absolute inset-0" />
                  </div>
                  <div className="p-7">
                    <p className="m-overline">{card.overline}</p>
                    <h3 className="m-display mt-3 text-3xl text-[var(--m-text)]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--m-text-muted)]">{card.text}</p>
                    <Link href={card.href} className="home-link mt-6 inline-flex text-xs uppercase tracking-[0.15em]">
                      Explore
                    </Link>
                  </div>
                </article>
              </PhotoCard>
            ))}
          </div>
        </div>
      </section>

      <section className="m-section px-4 pt-0">
        <div className="container">
          <div className="home-cta-band flex flex-col items-start justify-between gap-5 p-7 md:flex-row md:items-center md:p-9">
            <div>
              <p className="m-overline">Plan Your Anniversary</p>
              <h3 className="m-display mt-2 text-3xl text-[var(--m-text)] md:text-4xl">Ready to plan something unforgettable?</h3>
            </div>
            <Link href="/plan" className="home-btn-primary">
              Start your brief
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
