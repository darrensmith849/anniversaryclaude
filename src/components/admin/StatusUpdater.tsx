"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { REQUEST_STATUSES, statusLabel } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function StatusUpdater({
  requestId,
  currentStatus,
}: {
  requestId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    if (newStatus === currentStatus) return;

    setUpdating(true);
    try {
      const res = await fetch("/api/admin/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: requestId, status: newStatus }),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch {
      // silently fail — user can retry
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="relative">
      <select
        value={currentStatus}
        onChange={handleChange}
        disabled={updating}
        className="h-8 rounded-lg border border-neutral-200 bg-white px-3 pr-8 text-xs font-medium text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-300 disabled:opacity-50 cursor-pointer appearance-none"
      >
        {REQUEST_STATUSES.map((s) => (
          <option key={s} value={s}>
            {statusLabel(s)}
          </option>
        ))}
      </select>
      {updating && (
        <Loader2 size={12} className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-neutral-400" />
      )}
    </div>
  );
}
