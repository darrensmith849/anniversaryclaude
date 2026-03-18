"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const collections = [
  {
    id: "safari",
    title: "Safari",
    subtitle: "Big Five & bush romance",
    description:
      "Sundowners on the savanna, private game drives at dawn, and star-lit dinners under ancient African skies. The ultimate anniversary for nature lovers.",
    href: "/safari-anniversary",
    location: "Greater Kruger & Beyond",
  },
  {
    id: "winelands",
    title: "Winelands",
    subtitle: "Vineyard elegance & gastronomy",
    description:
      "Rolling vineyards, world-class wine pairings, and Cape Dutch manor houses. A celebration steeped in beauty and flavour.",
    href: "/winelands-anniversary",
    location: "Stellenbosch & Franschhoek",
  },
  {
    id: "coastal",
    title: "Coastal",
    subtitle: "Ocean & clifftop luxury",
    description:
      "Dramatic coastlines, private beach villas, and the finest seafood the Cape has to offer. Where the sea sets the pace.",
    href: "/coastal-luxury-anniversary",
    location: "Garden Route & Cape Coast",
  },
  {
    id: "city",
    title: "City",
    subtitle: "Urban sophistication",
    description:
      "Rooftop fine dining, gallery tours, helicopter flights, and the vibrant pulse of South Africa's most exciting cities.",
    href: "/city-anniversary",
    location: "Cape Town & Johannesburg",
  },
  {
    id: "adventure",
    title: "Adventure",
    subtitle: "Thrill meets intimacy",
    description:
      "Hot air balloons, mountain retreats, canyon adventures, and secluded wilderness lodges for the bold at heart.",
    href: "/adventure-romance",
    location: "Drakensberg & Wild Places",
  },
];

export function CollectionRail() {
  const [active, setActive] = useState(collections[0]);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
          Curated collections
        </p>
        <h2 className="mt-3 text-3xl font-serif text-ink">Five ways to celebrate</h2>
        <p className="mt-2 text-neutral-500 max-w-lg">
          Each collection is a different lens on South Africa. All tailored to your story.
        </p>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {collections.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-lg border px-5 py-2.5 text-sm font-medium transition-all ${
                active.id === c.id
                  ? "border-neutral-900 bg-neutral-900 text-white shadow-md"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Featured panel */}
        <div key={active.id} className="mt-6 rounded-2xl border border-neutral-200 bg-white p-8 md:p-10 shadow-sm animate-fade-in">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-2xl font-serif text-ink">{active.title}</h3>
              <p className="mt-1 text-sm text-neutral-500 italic">{active.subtitle}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500">
              <MapPin size={12} />
              {active.location}
            </span>
          </div>
          <p className="mt-4 text-neutral-600 leading-relaxed max-w-2xl">{active.description}</p>
          <Link
            href={active.href}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Explore {active.title}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
