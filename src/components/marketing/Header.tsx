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
    <header className="sticky top-0 z-50 border-b border-sand-200/60 bg-ivory/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-serif font-semibold text-ink tracking-tight">
          Anniversary Concierge
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-neutral-600 hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/plan"
            className="ml-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Plan Your Anniversary
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-sand-200/60 bg-ivory px-6 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-sm text-neutral-600 hover:text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/plan"
            className="mt-2 block rounded-lg bg-neutral-900 px-5 py-2 text-center text-sm font-medium text-white"
            onClick={() => setOpen(false)}
          >
            Plan Your Anniversary
          </Link>
        </div>
      )}
    </header>
  );
}
