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
  { id: "beach", label: "Coastal" },
];

const REGION_OPTIONS = [
  { id: "all", label: "All Regions" },
  { id: "Western Cape", label: "Western Cape" },
  { id: "Limpopo", label: "Limpopo" },
  { id: "Eastern Cape", label: "Eastern Cape" },
  { id: "KwaZulu-Natal", label: "KwaZulu-Natal" },
];

export function CollectionsFilter({ collections }: { collections: Collection[] }) {
  const [vibe, setVibe] = useState("all");
  const [region, setRegion] = useState("all");

  const filtered = collections.filter((collection) => {
    const matchesVibe = vibe === "all" || collection.vibe === vibe;
    const matchesRegion = region === "all" || collection.region === region;
    return matchesVibe && matchesRegion;
  });

  return (
    <div className="space-y-8">
      <div className="m-glass flex flex-wrap items-center gap-4 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="m-overline">Vibe</span>
          {VIBE_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setVibe(option.id)}
              className={
                "rounded border px-3 py-2 text-[11px] uppercase tracking-[0.12em] transition-colors " +
                (vibe === option.id
                  ? "border-[var(--m-border-strong)] bg-[rgba(201,149,99,0.18)] text-[var(--m-text)]"
                  : "border-[var(--m-border)] bg-[rgba(16,13,11,0.6)] text-[var(--m-text-muted)] hover:text-[var(--m-text)]")
              }
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="m-overline">Region</span>
          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="h-10 rounded border border-[var(--m-border)] bg-[rgba(16,13,11,0.8)] px-3 text-xs text-[var(--m-text)]"
          >
            {REGION_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((collection) => (
          <Link key={collection.slug} href={collection.href} className="m-card group relative min-h-[20rem]">
            <div className="m-img-overlay absolute inset-0">
              <Image
                src={collection.imageSrc}
                alt={collection.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
              <p className="m-overline">{collection.region}</p>
              <p className="m-display mt-2 text-3xl text-[var(--m-text)]">{collection.title}</p>
              <p className="mt-1 text-sm text-[var(--m-text-muted)]">{collection.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="m-glass py-12 text-center">
          <p className="text-[var(--m-text-muted)]">No collections match this filter set.</p>
        </div>
      ) : null}
    </div>
  );
}
