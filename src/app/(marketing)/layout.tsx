import Link from "next/link";
import { Heart } from "lucide-react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketing-theme flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-[var(--m-border)] bg-[var(--m-bg)]/90 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-[var(--m-text)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--m-accent)] to-[var(--m-rose)]">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span>Anniversary Concierge</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/safari-anniversary" className="text-[var(--m-muted)] transition-colors hover:text-[var(--m-text)]">
              Collections
            </Link>
            <Link href="/plan" className="m-btn-primary inline-flex h-9 items-center rounded-full px-5 text-sm">
              Start Planning
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[var(--m-border)] bg-[var(--m-bg)]">
        <div className="container py-10 text-center text-xs text-[var(--m-muted)]">
          <p>South Africa&apos;s Anniversary Concierge</p>
          <p className="mt-1">Featured venues and recommended stays from our concierge network.</p>
        </div>
      </footer>
    </div>
  );
}
