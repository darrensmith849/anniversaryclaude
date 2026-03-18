import Link from "next/link";
import { Heart } from "lucide-react";

export const metadata = {
  title: "Thank You | Anniversary Concierge",
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="mx-auto max-w-lg px-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lilac-50 text-lilac-500">
          <Heart size={28} />
        </div>
        <h1 className="mt-6 text-3xl font-serif text-ink">
          Thank you for your brief
        </h1>
        <p className="mt-4 text-neutral-500 leading-relaxed">
          Your dedicated concierge will review your anniversary brief and
          be in touch within 24 hours to start crafting your perfect
          celebration.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-700 hover:bg-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
