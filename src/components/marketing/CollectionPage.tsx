import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

interface Highlight {
  title: string;
  description: string;
}

interface CollectionPageProps {
  title: string;
  subtitle: string;
  description: string;
  highlights: Highlight[];
  location: string;
  heroGradient: string;
  signatureExperiences?: string[];
  idealFor?: string[];
}

export function CollectionPage({
  title,
  subtitle,
  description,
  highlights,
  location,
  heroGradient,
  signatureExperiences,
  idealFor,
}: CollectionPageProps) {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0" style={{ background: heroGradient }} />

        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32 w-full">
          <div className="max-w-2xl rounded-2xl editorial-panel border border-white/10 p-8 md:p-10 shadow-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 text-xs text-neutral-600 mb-4">
              <MapPin size={12} />
              {location}
            </span>
            <h1 className="text-3xl font-serif text-ink md:text-4xl lg:text-5xl">{title}</h1>
            <p className="mt-2 text-base text-neutral-600 font-serif italic">{subtitle}</p>
            <p className="mt-4 text-sm text-neutral-500 leading-relaxed max-w-lg">{description}</p>
            <Link
              href="/plan"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              Plan This Experience
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── What to Expect ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-serif text-ink">What to expect</h2>
          <p className="mt-2 text-sm text-neutral-500">Curated moments that define this collection.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <div key={i} className="rounded-xl border border-neutral-200 bg-white p-6 hover-lift">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-sm font-semibold text-neutral-500">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-sm font-semibold text-ink">{h.title}</h3>
                <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Signature Experiences ─── */}
      {signatureExperiences && signatureExperiences.length > 0 && (
        <section className="py-16 bg-white/60">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-serif text-ink">Signature experiences</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {signatureExperiences.map((exp, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-neutral-100 bg-white p-5">
                  <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                  <p className="text-sm text-neutral-600 leading-relaxed">{exp}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Ideal For ─── */}
      {idealFor && idealFor.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-serif text-ink">Ideal for</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {idealFor.map((tag) => (
                <span key={tag} className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl bg-neutral-900 p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(169,143,219,0.08),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-serif text-white">
                Ready to plan your {title.toLowerCase()} anniversary?
              </h2>
              <p className="mt-3 text-neutral-400 max-w-md mx-auto">
                Share your vision and we&apos;ll craft a bespoke celebration.
              </p>
              <Link
                href="/plan"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition-colors"
              >
                Start Planning
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
