"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { HeroImage } from "@/components/marketing/HeroImage";

const collections = [
  {
    id: "safari",
    title: "Safari",
    subtitle: "Big Five & bush romance",
    description:
      "Sundowners on the savanna, private game drives at dawn, and star-lit dinners under ancient African skies. The ultimate anniversary for nature lovers.",
    href: "/safari-anniversary",
    location: "Greater Kruger & Beyond",
    image: "/images/home/home-collection-safari.jpg",
    gradient: "linear-gradient(135deg, #2D1B0E 0%, #4A3520 40%, #6B4D2E 70%, #3D2B1A 100%)",
  },
  {
    id: "winelands",
    title: "Winelands",
    subtitle: "Vineyard elegance & gastronomy",
    description:
      "Rolling vineyards, world-class wine pairings, and Cape Dutch manor houses. A celebration steeped in beauty and flavour.",
    href: "/winelands-anniversary",
    location: "Stellenbosch & Franschhoek",
    image: "/images/collections/winelands-hero.jpg",
    gradient: "linear-gradient(135deg, #2E1A3D 0%, #4A2D5C 40%, #6B4480 70%, #3D2044 100%)",
  },
  {
    id: "coastal",
    title: "Coastal",
    subtitle: "Ocean & clifftop luxury",
    description:
      "Dramatic coastlines, private beach villas, and the finest seafood the Cape has to offer. Where the sea sets the pace.",
    href: "/coastal-luxury-anniversary",
    location: "Garden Route & Cape Coast",
    image: "/images/collections/coastal-luxury-hero.jpg",
    gradient: "linear-gradient(135deg, #0C2D3F 0%, #164B60 40%, #1B6B8A 70%, #0F3347 100%)",
  },
  {
    id: "city",
    title: "City",
    subtitle: "Urban sophistication",
    description:
      "Rooftop fine dining, gallery tours, helicopter flights, and the vibrant pulse of South Africa's most exciting cities.",
    href: "/city-anniversary",
    location: "Cape Town & Johannesburg",
    image: "/images/collections/city-hero.jpg",
    gradient: "linear-gradient(135deg, #1A1A2E 0%, #2D2D44 40%, #3F3F5A 70%, #252538 100%)",
  },
  {
    id: "adventure",
    title: "Adventure",
    subtitle: "Thrill meets intimacy",
    description:
      "Hot air balloons, mountain retreats, canyon adventures, and secluded wilderness lodges for the bold at heart.",
    href: "/adventure-romance",
    location: "Drakensberg & Wild Places",
    image: "/images/collections/adventure-romance-hero.jpg",
    gradient: "linear-gradient(135deg, #1A2E1A 0%, #2D4A2D 40%, #3D6B3D 70%, #253525 100%)",
  },
];

export function CollectionRail() {
  const [active, setActive] = useState(collections[0]);

  return (
    <section className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="w-10 h-px bg-brass-400 mb-7" />
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-stone-400">
          Curated collections
        </p>
        <h2 className="mt-4 text-3xl font-serif text-ink">Five ways to celebrate</h2>
        <p className="mt-2.5 text-stone-500 max-w-lg leading-relaxed">
          Each collection is a different lens on South Africa. All tailored to your story.
        </p>

        {/* Tabs */}
        <div className="mt-10 flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {collections.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-lg border px-5 py-2.5 text-[13px] font-medium transition-all ${
                active.id === c.id
                  ? "border-charcoal-900 bg-charcoal-900 text-white shadow-sm"
                  : "border-stone-200/70 bg-white text-stone-500 hover:border-stone-300 hover:text-stone-700"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Featured panel — editorial split with image */}
        <div
          key={active.id}
          className="mt-6 rounded-2xl border border-stone-200/70 bg-white shadow-[0_2px_8px_rgba(26,26,46,0.03),0_8px_24px_rgba(26,26,46,0.05)] overflow-hidden animate-fade-in"
        >
          <div className="grid md:grid-cols-[1fr_1.1fr]">
            {/* Text side */}
            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/70 bg-stone-50/80 px-3 py-1 text-[11px] text-stone-500 w-fit mb-5">
                <MapPin size={11} />
                {active.location}
              </span>
              <h3 className="text-2xl font-serif text-ink lg:text-[1.75rem]">{active.title}</h3>
              <p className="mt-1.5 text-sm text-stone-400 font-serif italic">{active.subtitle}</p>
              <p className="mt-5 text-[14px] text-stone-600 leading-[1.75] max-w-md">{active.description}</p>
              <Link
                href={active.href}
                className="cta-primary mt-7 inline-flex items-center gap-2.5 rounded-lg px-6 py-2.5 text-sm font-medium tracking-wide w-fit"
              >
                Explore {active.title}
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>

            {/* Image side */}
            <div className="relative min-h-[240px] md:min-h-0">
              <HeroImage
                src={active.image}
                alt={`${active.title} collection`}
                fallbackGradient={active.gradient}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
