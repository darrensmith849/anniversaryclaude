import Link from "next/link";
import { Heart, Clock, Mail, Phone } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center px-4 py-20 md:py-28">
      <div className="m-animate-in max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[var(--m-accent)] to-[var(--m-rose)] shadow-lg shadow-[var(--m-accent)]/20">
          <Heart className="h-9 w-9 text-white" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Thank You!
        </h1>
        <p className="mt-3 text-[var(--m-muted)]">
          We&apos;ve received your enquiry and our concierge team is already
          getting excited about crafting your perfect celebration.
        </p>

        {/* Next steps */}
        <div className="m-glass mt-8 space-y-4 p-6 text-left">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--m-accent)]">
            What Happens Next
          </p>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--m-accent-2)]" />
            <p className="text-sm text-[var(--m-muted)]">
              Our team will review your preferences and begin curating options
              within <span className="font-medium text-[var(--m-text)]">24 hours</span>.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--m-accent-2)]" />
            <p className="text-sm text-[var(--m-muted)]">
              You&apos;ll receive a bespoke proposal with handpicked venues and
              experiences tailored to your vibe.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--m-accent-2)]" />
            <p className="text-sm text-[var(--m-muted)]">
              We may reach out by phone to clarify any details — so keep an eye
              on your inbox.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="m-btn-glass inline-flex h-11 items-center rounded-full px-6 text-sm font-medium"
          >
            Back to Home
          </Link>
          <Link
            href="/winelands-anniversary"
            className="m-btn-primary inline-flex h-11 items-center rounded-full px-6 text-sm"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
