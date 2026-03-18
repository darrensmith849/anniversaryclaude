"use client";

import Image from "next/image";
import { useState } from "react";

type RailItem = {
  id: string;
  label: string;
  imageSrc: string;
  imageAlt: string;
  bullets: string[];
};

const railItems: RailItem[] = [
  {
    id: "safari",
    label: "Safari",
    imageSrc: "/images/sa/kruger-safari.jpg",
    imageAlt: "Kruger safari reserve scenery",
    bullets: ["Private reserve stays", "Sunrise game drives", "Starlit dining setups"],
  },
  {
    id: "winelands",
    label: "Winelands",
    imageSrc: "/images/sa/winelands-vineyards.jpg",
    imageAlt: "Vineyards across South African winelands",
    bullets: ["Estate suites", "Private cellar tastings", "Mountain-view lunches"],
  },
  {
    id: "coastal",
    label: "Coastal",
    imageSrc: "/images/sa/garden-route-coastal.jpg",
    imageAlt: "Garden Route ocean cliffs and shoreline",
    bullets: ["Sea-facing luxury stays", "Sunset catamaran moments", "Spa and shoreline downtime"],
  },
  {
    id: "city",
    label: "City",
    imageSrc: "/images/sa/cape-town-table-mountain.jpg",
    imageAlt: "Cape Town skyline and Table Mountain",
    bullets: ["Rooftop dining reservations", "Culture and design routes", "Editorial city stays"],
  },
  {
    id: "adventure",
    label: "Adventure",
    imageSrc: "/images/sa/drakensberg-mountains.jpg",
    imageAlt: "Drakensberg mountain adventure routes",
    bullets: ["Scenic mountain trails", "Helicopter viewpoints", "Adventure-paced itineraries"],
  },
];

export function CollectionRail() {
  const [activeId, setActiveId] = useState(railItems[0].id);
  const active = railItems.find((item) => item.id === activeId) ?? railItems[0];

  return (
    <div className="space-y-4">
      <div className="home-rail-interactive flex flex-wrap gap-2 p-2">
        {railItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={`home-rail-trigger ${active.id === item.id ? "home-rail-trigger-active" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="home-boxed-panel grid gap-5 p-4 md:p-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[14rem] overflow-hidden rounded-sm border border-[var(--m-border)]">
          <Image
            key={active.imageSrc}
            src={active.imageSrc}
            alt={active.imageAlt}
            fill
            className="object-cover transition-opacity duration-200"
          />
          <div className="m-img-overlay absolute inset-0" />
        </div>

        <div className="home-mini-box flex flex-col justify-center">
          <p className="m-overline">Featured Direction</p>
          <h3 className="m-display mt-2 text-3xl text-[var(--m-text)]">{active.label} Anniversary</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--m-text-muted)]">
            {active.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
