import Link from "next/link";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { MarketingNavLink } from "@/components/marketing/MarketingNavLink";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--m-serif",
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--m-sans",
  weight: ["400", "500", "600", "700"],
});

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`marketing-theme ${serif.variable} ${sans.variable} m-body flex min-h-screen flex-col`}>
      <header className="m-nav-shell sticky top-0 z-50 border-b border-[var(--m-border)] backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="m-display text-2xl leading-none tracking-wide text-[var(--m-ink)]">
            Anniversary Concierge
          </Link>
          <nav className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.16em] text-[var(--m-muted)] md:flex">
            <MarketingNavLink href="/safari-anniversary" label="Safari" />
            <MarketingNavLink href="/winelands-anniversary" label="Winelands" />
            <MarketingNavLink href="/coastal-luxury-anniversary" label="Coastal" />
            <Link href="/plan" className="m-btn-glass px-4">
              Plan
            </Link>
          </nav>
          <Link href="/plan" className="m-btn-primary px-4 md:hidden">
            Plan
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[var(--m-border)] bg-[rgba(255,255,255,0.82)]">
        <div className="container py-10 text-center text-xs uppercase tracking-[0.12em] text-[var(--m-muted)]">
          <p>South Africa&apos;s Anniversary Concierge</p>
          <p className="mt-2 normal-case tracking-normal">Curated anniversary escapes, concierge-planned.</p>
        </div>
      </footer>
    </div>
  );
}
