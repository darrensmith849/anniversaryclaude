import Link from "next/link";

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
    <div className="home-editorial-root flex flex-col">
      <section className="home-hero relative min-h-screen px-4 pb-12 pt-24 md:pt-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero/hero-02-cape-town.jpg')" }}
          aria-hidden="true"
        />

        <div className="home-hero-overlay absolute inset-0" aria-hidden="true" />

        <div className="container relative z-10 flex min-h-[74vh] items-center justify-center">
          <div className="mx-auto max-w-[54rem] text-center">
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

      <section className="m-section px-4">
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
        <div className="container relative space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className="m-overline">How It Works</p>
            <h2 className="m-display text-4xl leading-tight text-[var(--m-text)] md:text-5xl">
              Every Anniversary Itinerary,
              <br />
              Curated End To End
            </h2>
            <p className="max-w-xl text-[var(--m-text-muted)]">
              Discover recommended stays, shape your preferred mood, and move from first brief to confirmed celebration with concierge guidance at each step.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {editorialCards.map((card) => (
              <article key={card.title} className="home-card p-7">
                <p className="m-overline">{card.overline}</p>
                <h3 className="m-display mt-3 text-3xl text-[var(--m-text)]">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--m-text-muted)]">{card.text}</p>
                <Link href={card.href} className="home-link mt-6 inline-flex text-xs uppercase tracking-[0.15em]">
                  Explore
                </Link>
              </article>
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
