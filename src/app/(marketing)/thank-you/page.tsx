import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Thank You | Anniversary Concierge",
  description: "Your anniversary brief has been received. Your concierge will be in touch within 24 hours.",
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-[65vh] items-center justify-center py-24">
      <div className="mx-auto max-w-lg px-6 text-center animate-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-champagne-100 text-brass-600">
          <Heart size={28} />
        </div>
        <h1 className="mt-9 text-3xl font-serif text-ink">
          Thank you for your brief
        </h1>
        <p className="mt-5 text-stone-500 leading-relaxed">
          Your dedicated concierge will review your anniversary brief
          and be in touch within 24 hours to begin shaping your
          celebration.
        </p>
        <p className="mt-4 text-sm text-stone-400 leading-relaxed">
          In the meantime, you&apos;re welcome to explore our collections
          for inspiration — or simply sit back and let us handle the rest.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg border border-stone-200/70 bg-white px-6 py-2.5 text-[13px] font-medium text-stone-600 hover:border-stone-300 transition-colors tracking-wide"
          >
            Back to Home
          </Link>
          <Link
            href="/safari-anniversary"
            className="cta-primary inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-[13px] font-medium tracking-wide"
          >
            Explore Safari
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
