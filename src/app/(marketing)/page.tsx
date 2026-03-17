import Link from "next/link";
import Image from "next/image";
import { collections } from "@/data/collections";
import { Heart, Sparkles, Wine, Camera, Flower2, Star } from "lucide-react";

const perks = [
  { icon: Wine, label: "Private tastings" },
  { icon: Flower2, label: "Floral surprises" },
  { icon: Camera, label: "Photographer" },
  { icon: Star, label: "Room upgrades" },
  { icon: Sparkles, label: "Turndown treats" },
  { icon: Heart, label: "Custom vows setup" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ────────────────────────────────────── */}
      <section className="m-hero-bg relative overflow-hidden px-4 py-20 md:py-32">
        <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="m-animate-in max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--m-border)] bg-[var(--m-surface)] px-4 py-1.5 text-xs text-[var(--m-muted)]">
              <Sparkles className="h-3 w-3 text-[var(--m-accent-2)]" />
              Luxury anniversary planning across South Africa
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
              Unforgettable{" "}
              <span className="bg-gradient-to-r from-[var(--m-accent)] via-[var(--m-rose)] to-[var(--m-accent-2)] bg-clip-text text-transparent">
                Anniversaries
              </span>
              , Effortlessly Planned
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[var(--m-muted)] md:text-lg">
              From vineyard escapes in Franschhoek to safari sunsets in the
              Kruger — our concierge team handles every detail so you can focus
              on each other.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/plan"
                className="m-btn-primary inline-flex h-12 items-center rounded-full px-8 text-base"
              >
                Start Planning
              </Link>
              <Link
                href="/collections"
                className="m-btn-glass inline-flex h-12 items-center rounded-full px-8 text-base font-medium"
              >
                Browse Collections
              </Link>
            </div>
          </div>
          {/* Right — hero image card */}
          <div className="m-animate-in m-animate-in-delay-2 hidden lg:block">
            <div className="m-card m-glow-ring relative overflow-hidden">
              <div className="m-img-overlay relative aspect-[4/3]">
                <Image
                  src="/images/collections/cape-town.svg"
                  alt="Cape Town skyline at sunset — Table Mountain silhouette over the Atlantic"
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                <p className="text-xs font-medium uppercase tracking-widest text-[var(--m-accent-2)]">
                  Featured
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  Cape Town Skyline Escape
                </p>
                <p className="text-sm text-[var(--m-muted)]">
                  Table Mountain & the Atlantic Seaboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="m-divider" />

      {/* ── Collections Grid ─────────────────────────── */}
      <section className="px-4 py-16 md:py-24">
        <div className="container">
          <div className="m-animate-in mb-12 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--m-accent)]">
              Curated Experiences
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Our Collections
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[var(--m-muted)]">
              Handpicked destinations from our concierge network, each crafted
              for unforgettable celebrations.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((c, i) => (
              <Link
                key={c.slug}
                href={c.href}
                className={`m-card group m-animate-in m-animate-in-delay-${Math.min(i + 1, 3)}`}
              >
                <div className="m-img-overlay relative aspect-[16/10]">
                  <Image
                    src={c.imageSrc}
                    alt={c.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                  <div className="mb-2 flex gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {c.title}
                  </p>
                  <p className="text-sm text-[var(--m-muted)]">
                    {c.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="m-divider" />

      {/* ── How It Works ─────────────────────────────── */}
      <section className="px-4 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--m-accent)]">
              Simple Process
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              How It Works
            </h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tell Us Your Story",
                desc: "Share your preferences, dates, and dream vibe. We listen to every detail.",
              },
              {
                step: "02",
                title: "We Curate & Propose",
                desc: "Our concierge team designs a bespoke itinerary with handpicked venues.",
              },
              {
                step: "03",
                title: "Celebrate & Enjoy",
                desc: "Arrive to a seamless experience. Every moment crafted, every detail covered.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--m-accent)]/20 to-[var(--m-rose)]/10 text-lg font-bold text-[var(--m-accent)]">
                  {item.step}
                </div>
                <h3 className="mb-2 text-base font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--m-muted)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="m-divider" />

      {/* ── Perks Strip ──────────────────────────────── */}
      <section className="px-4 py-12">
        <div className="container">
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-[var(--m-muted)]">
            Perks We Arrange
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {perks.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-2 rounded-full border border-[var(--m-border)] bg-[var(--m-surface)] px-4 py-2 text-sm text-[var(--m-muted)]"
              >
                <p.icon className="h-3.5 w-3.5 text-[var(--m-accent-2)]" />
                {p.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="m-divider" />

      {/* ── CTA Band ─────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--m-accent)]/10 via-[var(--m-rose)]/5 to-transparent" />
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Create Something{" "}
            <span className="bg-gradient-to-r from-[var(--m-accent-2)] to-[var(--m-rose)] bg-clip-text text-transparent">
              Extraordinary
            </span>
            ?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[var(--m-muted)]">
            Four quick steps and our concierge team will be in touch within 24
            hours with a bespoke proposal.
          </p>
          <div className="mt-8">
            <Link
              href="/plan"
              className="m-btn-primary inline-flex h-12 items-center rounded-full px-10 text-base"
            >
              Plan Your Anniversary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
