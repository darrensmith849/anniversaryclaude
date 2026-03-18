import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

interface CollectionPageProps {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  location: string;
  accentFrom: string;
  accentTo: string;
}

export function CollectionPage({
  title,
  subtitle,
  description,
  highlights,
  location,
  accentFrom,
  accentTo,
}: CollectionPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(135deg, ${accentFrom} 0%, ${accentTo} 100%)`,
          }}
        />
        <div className="mx-auto max-w-6xl px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs text-neutral-600">
            <MapPin size={12} />
            {location}
          </span>
          <h1 className="mt-4 text-4xl font-serif text-ink md:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-lg text-neutral-600 font-serif italic">
            {subtitle}
          </p>
          <p className="mt-6 text-neutral-500 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-serif text-ink">What to expect</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-200 bg-white p-6 hover-lift"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-sm font-medium text-neutral-500">
                  {i + 1}
                </div>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {h}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
            <h2 className="text-2xl font-serif text-ink">
              Ready to plan your {title.toLowerCase()} anniversary?
            </h2>
            <p className="mt-3 text-neutral-500 max-w-md mx-auto">
              Share your vision and we&apos;ll craft a bespoke celebration.
            </p>
            <Link
              href="/plan"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-8 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              Start Planning
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
