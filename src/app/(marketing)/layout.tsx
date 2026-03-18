import Link from "next/link";
import { Cormorant_Garamond, Manrope } from "next/font/google";

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
      <header className="sticky top-0 z-50 border-b border-[var(--m-border)] bg-[rgba(10,8,7,0.82)] backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="m-display text-2xl leading-none tracking-wide text-[var(--m-text)]">
            Anniversary Concierge
          </Link>
          <nav className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.16em] text-[var(--m-text-muted)] md:flex">
            <Link href="/safari-anniversary" className="transition-colors hover:text-[var(--m-text)]">
              Safari
            </Link>
            <Link href="/winelands-anniversary" className="transition-colors hover:text-[var(--m-text)]">
              Winelands
            </Link>
            <Link href="/coastal-luxury-anniversary" className="transition-colors hover:text-[var(--m-text)]">
              Coastal
            </Link>
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

      <footer className="border-t border-[var(--m-border)] bg-[rgba(8,7,6,0.88)]">
        <div className="container py-10 text-center text-xs uppercase tracking-[0.12em] text-[var(--m-text-muted)]">
          <p>South Africa&apos;s Anniversary Concierge</p>
          <p className="mt-2 normal-case tracking-normal">Curated anniversary escapes, concierge-planned.</p>
        </div>
      </footer>
    </div>
  );
}
