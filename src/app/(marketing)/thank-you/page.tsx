import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="px-4 py-20 md:py-28">
      <div className="container max-w-2xl">
        <div className="m-glass p-8 text-center md:p-12">
          <p className="m-overline">Request Received</p>
          <h1 className="m-display mt-3 text-5xl text-[var(--m-text)] md:text-6xl">Thank You</h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--m-text-muted)]">
            Your concierge brief is in. We&apos;ll review your preferences and return with a curated next step shortly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="m-btn-glass">
              Back Home
            </Link>
            <Link href="/winelands-anniversary" className="m-btn-primary">
              Browse Collections
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
