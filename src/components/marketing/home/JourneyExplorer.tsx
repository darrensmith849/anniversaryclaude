"use client";

import Image from "next/image";
import { useState } from "react";

const steps = [
  {
    key: "brief",
    label: "Brief",
    title: "Share Your Vision",
    description: "Dates, style, and priorities are captured in one structured concierge brief.",
    imageSrc: "/images/sa/luxury-hotel-interior.jpg",
    imageAlt: "Luxury suite interior detail",
  },
  {
    key: "curate",
    label: "Curate",
    title: "Shortlist Curation",
    description: "We shape refined stay and experience options around your anniversary goals.",
    imageSrc: "/images/sa/winelands-vineyards.jpg",
    imageAlt: "Winelands vineyard landscape",
  },
  {
    key: "enquire",
    label: "Enquire",
    title: "Outreach And Availability",
    description: "Availability checks and preferred room positions are handled through concierge outreach.",
    imageSrc: "/images/sa/cape-town-table-mountain.jpg",
    imageAlt: "Table Mountain and Cape Town",
  },
  {
    key: "perks",
    label: "Perks",
    title: "Moments And Upgrades",
    description: "We request meaningful additions to elevate the stay and celebration moments.",
    imageSrc: "/images/sa/garden-route-coastal.jpg",
    imageAlt: "Garden Route coastal scenery",
  },
  {
    key: "confirm",
    label: "Confirm",
    title: "Finalise The Plan",
    description: "The full itinerary is structured clearly with timings, confirmations, and notes.",
    imageSrc: "/images/sa/drakensberg-mountains.jpg",
    imageAlt: "Drakensberg mountain ridges",
  },
  {
    key: "celebrate",
    label: "Celebrate",
    title: "Celebrate Beautifully",
    description: "You arrive to a considered plan designed for ease, romance, and unforgettable milestones.",
    imageSrc: "/images/sa/kruger-safari.jpg",
    imageAlt: "Kruger safari wildlife view",
  },
];

export function JourneyExplorer() {
  const [active, setActive] = useState(steps[0]);

  return (
    <section className="m-section px-4 pt-0">
      <div className="container">
        <div className="home-boxed-panel p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            <div>
              <p className="m-overline">Explore The Journey</p>
              <div className="mt-4 flex flex-wrap gap-2 border-b border-[var(--m-border)] pb-4">
                {steps.map((step) => (
                  <button
                    key={step.key}
                    type="button"
                    onMouseEnter={() => setActive(step)}
                    onFocus={() => setActive(step)}
                    onClick={() => setActive(step)}
                    className={`home-step-chip ${active.key === step.key ? "home-step-chip-active" : ""}`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
              <div className="mt-5">
                <h3 className="m-display text-3xl text-[var(--m-text)]">{active.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--m-text-muted)]">{active.description}</p>
              </div>
            </div>

            <div className="home-mini-box relative min-h-[14rem] overflow-hidden">
              <Image src={active.imageSrc} alt={active.imageAlt} fill className="object-cover transition-opacity duration-200" />
              <div className="m-img-overlay absolute inset-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
