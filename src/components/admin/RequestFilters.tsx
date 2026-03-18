"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const STATUSES = [
  "ALL",
  "NEW",
  "QUALIFIED",
  "SHORTLIST_SENT",
  "OUTREACH_IN_PROGRESS",
  "OPTIONS_RECEIVED",
  "DECIDED",
  "BOOKED",
  "COMPLETE",
  "CANCELLED",
];

export function RequestFilters({
  currentStatus,
  currentQuery,
}: {
  currentStatus: string;
  currentQuery: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "ALL") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/admin/requests?${params.toString()}`);
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      {/* Status tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter("status", s)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              currentStatus === s
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
            }`}
          >
            {s === "ALL" ? "All" : s.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative ml-auto">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <Input
          type="search"
          placeholder="Search clients..."
          defaultValue={currentQuery}
          onChange={(e) => {
            const timer = setTimeout(() => setFilter("q", e.target.value), 300);
            return () => clearTimeout(timer);
          }}
          className="h-8 w-48 pl-8 text-xs"
        />
      </div>
    </div>
  );
}
