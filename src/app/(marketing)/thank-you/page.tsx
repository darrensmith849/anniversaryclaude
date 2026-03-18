import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Thank You | Anniversary Concierge",
  description: "Your anniversary brief has been received. Your concierge will be in touch within 24 hours.",
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-[65vh] items-center justify-center py-20">
      <div className="mx-auto max-w-lg px-6 text-center animate-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand-50 text-amber-700">
          <Heart size={28} />
        </div>
        <h1 className="mt-8 text-3xl font-serif text-ink">
          Thank you for your brief
        </h1>
        <p className="mt-5 text-neutral-500 leading-relaxed">
          Your dedicated concierge will review your anniversary brief
          and be in touch within 24 hours to begin shaping your
          celebration.
        </p>
        <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
          In the meantime, you&apos;re welcome to explore our collections
          for inspiration — or simply sit back and let us handle the rest.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-700 hover:bg-white transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/safari-anniversary"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Explore Safari
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
