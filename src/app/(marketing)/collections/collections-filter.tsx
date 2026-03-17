"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Venue = {
  id: string;
  name: string;
  region: string;
  vibe: string;
  budget: string;
  description: string;
  tags: string[];
};

const VIBE_OPTIONS = [
  { id: "all", label: "All" },
  { id: "romantic", label: "Romantic" },
  { id: "adventure", label: "Adventure" },
  { id: "wine", label: "Wine & Culinary" },
  { id: "beach", label: "Beach" },
  { id: "urban", label: "City" },
];

const REGION_OPTIONS = [
  { id: "all", label: "All Regions" },
  { id: "Western Cape", label: "Western Cape" },
  { id: "Gauteng", label: "Gauteng" },
  { id: "Limpopo", label: "Limpopo" },
  { id: "Eastern Cape", label: "Eastern Cape" },
];

const BUDGET_OPTIONS = [
  { id: "all", label: "Any Budget" },
  { id: "25k-50k", label: "R25k – R50k" },
  { id: "50k-100k", label: "R50k – R100k" },
  { id: "100k-250k", label: "R100k – R250k" },
];

export function CollectionsFilter({ venues }: { venues: Venue[] }) {
  const [vibe, setVibe] = useState("all");
  const [region, setRegion] = useState("all");
  const [budget, setBudget] = useState("all");

  const filtered = venues.filter((v) => {
    const matchesVibe = vibe === "all" || v.vibe === vibe;
    const matchesRegion = region === "all" || v.region === region;
    const matchesBudget = budget === "all" || v.budget === budget;
    return matchesVibe && matchesRegion && matchesBudget;
  });

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-muted/30 p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Vibe:
          </span>
          <div className="flex flex-wrap gap-1">
            {VIBE_OPTIONS.map((opt) => (
              <Button
                key={opt.id}
                variant={vibe === opt.id ? "default" : "outline"}
                size="sm"
                onClick={() => setVibe(opt.id)}
                className="h-7 text-xs"
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Region:
          </span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="h-8 rounded-md border border-input bg-background px-2 text-xs"
          >
            {REGION_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Budget:
          </span>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="h-8 rounded-md border border-input bg-background px-2 text-xs"
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {(vibe !== "all" || region !== "all" || budget !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={() => {
              setVibe("all");
              setRegion("all");
              setBudget("all");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((venue) => (
          <Card
            key={venue.id}
            className="overflow-hidden transition-all hover:shadow-md"
          >
            <div className="h-40 bg-gradient-to-br from-primary/10 to-primary/5" />
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{venue.name}</CardTitle>
              </div>
              <CardDescription>{venue.region}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {venue.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {venue.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button asChild size="sm" variant="outline" className="w-full">
                <Link href="/plan">Enquire About This Venue</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No venues match your filters. Try adjusting your criteria.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setVibe("all");
              setRegion("all");
              setBudget("all");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Featured venues from our concierge network. Availability and pricing
        confirmed at time of enquiry.
      </p>
    </div>
  );
}
