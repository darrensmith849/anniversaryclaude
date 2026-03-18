import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { HeroImage } from "@/components/marketing/HeroImage";

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
  heroImage?: string;
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
  heroImage,
  signatureExperiences,
  idealFor,
}: CollectionPageProps) {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[58vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <HeroImage
            src={heroImage ?? `/images/collections/${title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}-hero.jpg`}
            alt={`${title} anniversary experience`}
            fallbackGradient={heroGradient}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-charcoal-900/25 to-charcoal-900/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-36 w-full">
          {/* Editorial panel — composed readability over cinematic image */}
          <div className="max-w-xl rounded-2xl editorial-panel border border-white/8 p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100/80 px-3 py-1 text-[11px] text-stone-500 mb-5 border border-stone-200/60">
              <MapPin size={11} />
              {location}
            </span>
            <h1 className="text-3xl font-serif text-ink md:text-4xl lg:text-[2.75rem] leading-[1.1]">{title}</h1>
            <p className="mt-2 text-[15px] text-stone-500 font-serif italic">{subtitle}</p>
            <p className="mt-4 text-sm text-stone-500/90 leading-[1.7] max-w-md">{description}</p>
            <Link
              href="/plan"
              className="cta-primary mt-7 inline-flex items-center gap-2.5 rounded-lg px-6 py-2.5 text-sm font-medium tracking-wide"
            >
              Plan This Experience
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── What to Expect ─── */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="w-10 h-px bg-brass-400 mb-7" />
          <h2 className="text-2xl font-serif text-ink">What to expect</h2>
          <p className="mt-2 text-sm text-stone-400">Curated moments that define this collection.</p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <div key={i} className="rounded-xl border border-stone-200/70 bg-white p-7 hover-lift">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-stone-50 text-[11px] font-semibold text-stone-400 border border-stone-200/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-ink">{h.title}</h3>
                <p className="mt-2 text-[13px] text-stone-500 leading-[1.7]">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Signature Experiences ─── */}
      {signatureExperiences && signatureExperiences.length > 0 && (
        <section className="py-24 surface-warm">
          <div className="mx-auto max-w-6xl px-6">
            <div className="w-10 h-px bg-brass-400 mb-7" />
            <h2 className="text-2xl font-serif text-ink">Signature experiences</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {signatureExperiences.map((exp, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl border border-stone-200/60 bg-white p-6">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500" />
                  <p className="text-[13px] text-stone-600 leading-[1.7]">{exp}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Ideal For ─── */}
      {idealFor && idealFor.length > 0 && (
        <section className="py-24 surface-champagne">
          <div className="mx-auto max-w-6xl px-6">
            <div className="w-10 h-px bg-brass-400 mb-7" />
            <h2 className="text-2xl font-serif text-ink">Ideal for</h2>
            <div className="mt-7 flex flex-wrap gap-3">
              {idealFor.map((tag) => (
                <span key={tag} className="rounded-full border border-stone-200/70 bg-white px-5 py-2 text-[13px] text-stone-600 tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0" style={{ background: heroGradient }} />
            <div className="absolute inset-0 bg-charcoal-900/65" />

            <div className="relative px-10 py-14 md:px-16 md:py-18 text-center" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
              <div className="mx-auto w-10 h-px bg-brass-400 mb-7" />
              <h2 className="text-2xl md:text-3xl font-serif text-white">
                Ready to plan your {title.toLowerCase()} anniversary?
              </h2>
              <p className="mt-4 text-stone-300/75 max-w-md mx-auto leading-relaxed">
                Share your vision and we&apos;ll craft a bespoke celebration.
              </p>
              <Link
                href="/plan"
                className="cta-light mt-8 inline-flex items-center gap-2.5 rounded-lg px-8 py-3 text-sm font-medium tracking-wide"
              >
                Start Planning
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
