import Link from "next/link";
import { Heart } from "lucide-react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketing-theme flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--m-border)] bg-[var(--m-bg)]/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold tracking-tight text-[var(--m-text)]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--m-accent)] to-[var(--m-rose)]">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span>Anniversary Concierge</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/collections"
              className="text-[var(--m-muted)] transition-colors hover:text-[var(--m-text)]"
            >
              Collections
            </Link>
            <Link
              href="/plan"
              className="m-btn-primary inline-flex h-9 items-center rounded-full px-5 text-sm"
            >
              Start Planning
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[var(--m-border)] bg-[var(--m-bg)]">
        <div className="container py-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 text-[var(--m-muted)]">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Anniversary Concierge</span>
            </div>
            <p className="max-w-md text-xs text-[var(--m-muted)]/70">
              Bespoke luxury anniversary planning across South Africa.
              Featured venues are part of our curated concierge network.
            </p>
            <p className="text-xs text-[var(--m-muted)]/50">
              &copy; {new Date().getFullYear()} Anniversary Concierge. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
