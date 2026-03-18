import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-sand-200/60 bg-ivory/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-serif font-semibold text-ink">
              Anniversary Concierge
            </h3>
            <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
              Bespoke anniversary celebrations across South Africa.
              Safari, winelands, coastal, and beyond.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider">
              Collections
            </h4>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Safari", href: "/safari-anniversary" },
                { label: "Winelands", href: "/winelands-anniversary" },
                { label: "Coastal Luxury", href: "/coastal-luxury-anniversary" },
                { label: "City", href: "/city-anniversary" },
                { label: "Adventure & Romance", href: "/adventure-romance" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider">
              Start Planning
            </h4>
            <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
              Tell us about your dream anniversary and we&apos;ll craft something unforgettable.
            </p>
            <Link
              href="/plan"
              className="mt-4 inline-block rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              Begin Your Brief
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-sand-200/60 pt-6 text-center text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} Anniversary Concierge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
