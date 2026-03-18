import Image from "next/image";
import Link from "next/link";
import { collectionsMetadata } from "@/config/concierge";

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
    text: "Hand-selected anniversary stays across South Africa with premium pacing and refined itinerary flow.",
    href: "/safari-anniversary",
  },
  {
    overline: "Planning",
    title: "Concierge Planning",
    text: "From request to confirmed itinerary, we coordinate details quietly so the experience feels effortless.",
    href: "/plan",
  },
  {
    overline: "Signature",
    title: "Signature Add-Ons",
    text: "Private dining, celebration styling, and tailored moments integrated into each recommended stay.",
    href: "/winelands-anniversary",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="m-hero-bg relative min-h-[88vh] px-4 pb-24 pt-24 md:pt-32">
        <div className="container grid items-end gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="m-animate-in max-w-2xl space-y-6">
            <p className="m-overline">South Africa&apos;s Anniversary Concierge</p>
            <h1 className="m-display text-5xl leading-[0.96] tracking-[0.01em] text-[var(--m-text)] md:text-7xl">
              Curated Anniversary Escapes With Cinematic Detail
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[var(--m-text-muted)] md:text-lg">
              Anniversary experiences across South Africa, shaped around your pace, your preferences, and your most important dates.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/plan" className="m-btn-primary">
                Start Your Brief
              </Link>
              <Link href="/city-anniversary" className="m-btn-glass">
                Browse Collections
              </Link>
            </div>
          </div>

          <div className="m-card relative hidden min-h-[27rem] overflow-hidden lg:block">
            <Image
              src={collectionsMetadata[0].imageSrc}
              alt={collectionsMetadata[0].imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
            <div className="m-img-overlay absolute inset-0" />
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
              <p className="m-overline">Featured Collection</p>
              <p className="m-display mt-2 text-3xl text-[var(--m-text)]">{collectionsMetadata[0].title}</p>
              <p className="mt-1 text-sm text-[var(--m-text-muted)]">{collectionsMetadata[0].subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="container">
          <div className="m-hero-strip">
            {heroChips.map((chip) => (
              <div key={chip} className="m-chip">
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="m-divider" />

      <section className="m-section px-4">
        <div className="container relative space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className="m-overline">Editorial Overview</p>
            <h2 className="m-display text-4xl leading-tight text-[var(--m-text)] md:text-6xl">
              Concierge Planning For Anniversary Travel, Done Quietly Well
            </h2>
            <p className="max-w-2xl text-[var(--m-text-muted)]">
              A premium planning layer across safari, winelands, coastal, city, and adventure routes.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {editorialCards.map((card) => (
              <article key={card.title} className="m-card p-7">
                <p className="m-overline">{card.overline}</p>
                <h3 className="m-display mt-3 text-3xl text-[var(--m-text)]">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--m-text-muted)]">{card.text}</p>
                <Link href={card.href} className="mt-6 inline-flex text-xs uppercase tracking-[0.15em] text-[var(--m-accent-2)] hover:text-[var(--m-text)]">
                  Explore
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="m-divider" />

      <section className="m-section px-4">
        <div className="container relative space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="m-overline">Collections</p>
              <h2 className="m-display text-4xl text-[var(--m-text)] md:text-5xl">Featured Venues And Recommended Stays</h2>
            </div>
            <Link href="/winelands-anniversary" className="m-btn-glass">
              View All Collections
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {collectionsMetadata.map((collection) => (
              <Link key={collection.slug} href={collection.href} className="m-card group relative min-h-[20rem]">
                <div className="m-img-overlay absolute inset-0">
                  <Image src={collection.imageSrc} alt={collection.imageAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                  <p className="m-overline">{collection.region}</p>
                  <p className="m-display mt-2 text-3xl text-[var(--m-text)]">{collection.title}</p>
                  <p className="mt-1 text-sm text-[var(--m-text-muted)]">{collection.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="m-section px-4 pt-6">
        <div className="container relative">
          <div className="m-glass p-10 text-center md:p-14">
            <p className="m-overline">Private Brief</p>
            <h2 className="m-display mt-3 text-4xl text-[var(--m-text)] md:text-5xl">Begin Your Anniversary Plan</h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--m-text-muted)]">
              Tell us your dates, budget band, and preferred atmosphere. We return with a curated direction and next-step shortlist.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/plan" className="m-btn-primary">
                Start Planning
              </Link>
              <Link href="/adventure-romance" className="m-btn-glass">
                Explore Adventure
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
