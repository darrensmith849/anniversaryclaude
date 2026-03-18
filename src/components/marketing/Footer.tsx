import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200/50 bg-stone-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-serif font-semibold text-ink">
              Anniversary Concierge
            </h3>
            <p className="mt-4 text-[13px] text-stone-500 leading-[1.7]">
              Bespoke anniversary celebrations across South Africa.
              Safari, winelands, coastal, and beyond.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-stone-400 uppercase tracking-[0.2em]">
              Collections
            </h4>
            <ul className="mt-5 space-y-3">
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
                    className="text-[13px] text-stone-500 hover:text-ink transition-colors tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-stone-400 uppercase tracking-[0.2em]">
              Start Planning
            </h4>
            <p className="mt-5 text-[13px] text-stone-500 leading-[1.7]">
              Tell us about your dream anniversary and we&apos;ll craft something unforgettable.
            </p>
            <Link
              href="/plan"
              className="cta-primary mt-6 inline-block rounded-lg px-6 py-2.5 text-[13px] font-medium tracking-wide"
            >
              Begin Your Brief
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-stone-200/50 pt-7 text-center text-[11px] text-stone-400 tracking-wide">
          &copy; {new Date().getFullYear()} Anniversary Concierge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
