"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/data/collections";

const VIBE_OPTIONS = [
  { id: "all", label: "All" },
  { id: "urban", label: "City" },
  { id: "wine", label: "Wine" },
  { id: "adventure", label: "Adventure" },
  { id: "beach", label: "Beach" },
];

const REGION_OPTIONS = [
  { id: "all", label: "All Regions" },
  { id: "Western Cape", label: "Western Cape" },
  { id: "Limpopo", label: "Limpopo" },
  { id: "Eastern Cape", label: "Eastern Cape" },
  { id: "KwaZulu-Natal", label: "KwaZulu-Natal" },
];

export function CollectionsFilter({
  collections,
}: {
  collections: Collection[];
}) {
  const [vibe, setVibe] = useState("all");
  const [region, setRegion] = useState("all");

  const filtered = collections.filter((c) => {
    const matchesVibe = vibe === "all" || c.vibe === vibe;
    const matchesRegion = region === "all" || c.region === region;
    return matchesVibe && matchesRegion;
  });

  return (
    <div className="space-y-8">
      {/* Filter bar */}
      <div className="m-glass flex flex-wrap items-center gap-4 p-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--m-muted)]">
            Vibe
          </span>
          <div className="flex gap-1">
            {VIBE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setVibe(opt.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  vibe === opt.id
                    ? "m-btn-primary"
                    : "text-[var(--m-muted)] hover:bg-[var(--m-surface-2)] hover:text-[var(--m-text)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--m-muted)]">
            Region
          </span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="h-8 rounded-lg border border-[var(--m-border)] bg-[var(--m-surface)] px-3 text-xs text-[var(--m-text)]"
          >
            {REGION_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {(vibe !== "all" || region !== "all") && (
          <button
            onClick={() => {
              setVibe("all");
              setRegion("all");
            }}
            className="text-xs text-[var(--m-accent)] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link key={c.slug} href={c.href} className="m-card group">
            <div className="m-img-overlay relative aspect-[16/10]">
              <Image
                src={c.imageSrc}
                alt={c.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
              <div className="mb-2 flex gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-lg font-semibold text-white">{c.title}</p>
              <p className="text-sm text-[var(--m-muted)]">{c.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-[var(--m-muted)]">
            No collections match your filters.
          </p>
          <button
            onClick={() => {
              setVibe("all");
              setRegion("all");
            }}
            className="mt-4 text-sm text-[var(--m-accent)] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      <p className="text-center text-xs text-[var(--m-muted)]/60">
        Featured venues from our concierge network. Availability confirmed at
        time of enquiry.
      </p>
    </div>
  );
}
