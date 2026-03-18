"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Loader2 } from "lucide-react";

const STAY_STATUSES = ["DRAFT", "PROPOSED", "CONFIRMED", "CANCELLED", "COMPLETED"];

export function StayForm({
  requests,
}: {
  requests: Array<{ id: string; label: string }>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [requestId, setRequestId] = useState(requests[0]?.id ?? "");
  const [propertyName, setPropertyName] = useState("");
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [confirmationRef, setConfirmationRef] = useState("");
  const [costEstimate, setCostEstimate] = useState("");
  const [notes, setNotes] = useState("");

  function reset() {
    setPropertyName("");
    setLocation("");
    setCheckIn("");
    setCheckOut("");
    setStatus("DRAFT");
    setConfirmationRef("");
    setCostEstimate("");
    setNotes("");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!propertyName || !requestId) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/stays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          propertyName,
          location: location || undefined,
          checkIn: checkIn || undefined,
          checkOut: checkOut || undefined,
          status,
          confirmationRef: confirmationRef || undefined,
          costEstimate: costEstimate || undefined,
          notes: notes || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create stay");
      }

      reset();
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} size="sm" className="gap-1.5">
        <Plus size={14} />
        Add Stay
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-serif text-ink">New Stay</h2>
          <button onClick={() => { setOpen(false); reset(); }} className="text-neutral-400 hover:text-neutral-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Request *</label>
            <select
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              className="mt-1 flex h-9 w-full rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm"
            >
              {requests.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Property name *</label>
            <Input value={propertyName} onChange={(e) => setPropertyName(e.target.value)} placeholder="e.g. Safari Lodge" className="mt-1" required />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Location</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Greater Kruger" className="mt-1" />
          </div>

          <div className="grid gap-4 grid-cols-2">
            <div>
              <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Check-in</label>
              <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Check-out</label>
              <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="mt-1" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 flex h-9 w-full rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm"
            >
              {STAY_STATUSES.map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 grid-cols-2">
            <div>
              <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Confirmation ref</label>
              <Input value={confirmationRef} onChange={(e) => setConfirmationRef(e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Cost estimate</label>
              <Input value={costEstimate} onChange={(e) => setCostEstimate(e.target.value)} placeholder="e.g. R45,000" className="mt-1" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Notes</label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => { setOpen(false); reset(); }}>Cancel</Button>
            <Button type="submit" disabled={saving || !propertyName}>
              {saving && <Loader2 size={14} className="mr-1.5 animate-spin" />}
              Create Stay
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
