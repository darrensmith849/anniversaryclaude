"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

const collections = [
  {
    id: "safari",
    title: "Safari",
    subtitle: "Big Five & bush romance",
    description:
      "Sundowners on the savanna, private game drives at dawn, and star-lit dinners under ancient African skies.",
    href: "/safari-anniversary",
    accent: "from-amber-700/10 to-amber-600/5",
    location: "Greater Kruger & Beyond",
  },
  {
    id: "winelands",
    title: "Winelands",
    subtitle: "Vineyard elegance",
    description:
      "Rolling vineyards, world-class wine pairings, and Cape Dutch manor houses steeped in heritage.",
    href: "/winelands-anniversary",
    accent: "from-purple-700/10 to-purple-600/5",
    location: "Stellenbosch & Franschhoek",
  },
  {
    id: "coastal",
    title: "Coastal",
    subtitle: "Ocean & clifftop luxury",
    description:
      "Dramatic coastlines, private beach villas, whale watching, and the finest seafood the Cape has to offer.",
    href: "/coastal-luxury-anniversary",
    accent: "from-sky-700/10 to-sky-600/5",
    location: "Garden Route & Cape Coast",
  },
  {
    id: "city",
    title: "City",
    subtitle: "Urban sophistication",
    description:
      "Rooftop fine dining, art galleries, helicopter tours, and the vibrant pulse of South Africa's cities.",
    href: "/city-anniversary",
    accent: "from-neutral-700/10 to-neutral-600/5",
    location: "Cape Town & Johannesburg",
  },
  {
    id: "adventure",
    title: "Adventure & Romance",
    subtitle: "Thrill meets intimacy",
    description:
      "Hot air balloons, mountain hikes, canyon swings, and secluded wilderness retreats for the bold at heart.",
    href: "/adventure-romance",
    accent: "from-emerald-700/10 to-emerald-600/5",
    location: "Across South Africa",
  },
];

export function CollectionRail() {
  const [active, setActive] = useState(collections[0]);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-serif text-ink">Our Collections</h2>
        <p className="mt-2 text-neutral-500 max-w-xl">
          Five distinct ways to celebrate. Each tailored to your story.
        </p>

        {/* Rail */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {collections.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-lg border px-5 py-3 text-sm font-medium transition-all ${
                active.id === c.id
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Featured panel */}
        <div
          key={active.id}
          className={`mt-6 rounded-2xl border border-neutral-200 bg-gradient-to-br ${active.accent} p-8 md:p-10 animate-fade-in`}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-2xl font-serif text-ink">{active.title}</h3>
              <p className="mt-1 text-sm font-medium text-neutral-500">
                {active.subtitle}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs text-neutral-600">
              <MapPin size={12} />
              {active.location}
            </span>
          </div>
          <p className="mt-4 text-neutral-600 leading-relaxed max-w-2xl">
            {active.description}
          </p>
          <Link
            href={active.href}
            className="mt-6 inline-block rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Explore {active.title}
          </Link>
        </div>
      </div>
    </section>
  );
}
