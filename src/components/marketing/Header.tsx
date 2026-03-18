"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Safari", href: "/safari-anniversary" },
  { label: "Winelands", href: "/winelands-anniversary" },
  { label: "Coastal", href: "/coastal-luxury-anniversary" },
  { label: "City", href: "/city-anniversary" },
  { label: "Adventure", href: "/adventure-romance" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/50 bg-pearl/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-serif font-semibold text-ink tracking-tight">
          Anniversary Concierge
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-stone-500 hover:text-ink transition-colors tracking-wide"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/plan"
            className="cta-primary ml-1 rounded-lg px-5 py-2 text-[13px] font-medium tracking-wide"
          >
            Plan Your Anniversary
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-stone-500"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-stone-200/50 bg-pearl px-6 pb-5 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2.5 text-[13px] text-stone-500 hover:text-ink tracking-wide"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/plan"
            className="cta-primary mt-3 block rounded-lg px-5 py-2.5 text-center text-[13px] font-medium tracking-wide"
            onClick={() => setOpen(false)}
          >
            Plan Your Anniversary
          </Link>
        </div>
      )}
    </header>
  );
}
