"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Building,
  Compass,
  Flower2,
  Heart,
  Sparkles,
  Sun,
  Users,
  Wine,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { budgetBands, vibeTags } from "@/config/concierge";
import { submitPlan, type PlanInput } from "@/lib/plan-actions";

const vibeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Romantic: Heart,
  Safari: Compass,
  Winelands: Wine,
  Coastal: Sun,
  City: Building,
  Adventure: Compass,
  Wellness: Flower2,
  "Private Dining": Sparkles,
};

export function PlanWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [form, setForm] = useState<PlanInput>({
    name: "",
    email: "",
    phone: "",
    anniversaryDate: "",
    city: "",
    vibeTags: [],
    startDate: "",
    endDate: "",
    datesFlexible: false,
    budgetBand: "",
    dietaryAllergies: "",
    notes: "",
  });

  function update(patch: Partial<PlanInput>): void {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function toggleVibe(value: string): void {
    setForm((prev) => ({
      ...prev,
      vibeTags: prev.vibeTags.includes(value)
        ? prev.vibeTags.filter((item) => item !== value)
        : [...prev.vibeTags, value],
    }));
  }

  function canAdvance(): boolean {
    if (step === 0) {
      return form.vibeTags.length > 0;
    }
    if (step === 1) {
      return true;
    }
    if (step === 2) {
      return form.budgetBand !== "";
    }
    return form.name.trim() !== "" && form.email.trim() !== "";
  }

  function handleSubmit(): void {
    setError("");
    startTransition(async () => {
      try {
        await submitPlan(form);
        router.push("/thank-you");
      } catch (submitError: unknown) {
        setError(submitError instanceof Error ? submitError.message : "Something went wrong");
      }
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-8 flex items-center gap-3">
          {["Vibe", "Dates", "Budget", "Details"].map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (index < step) {
                    setStep(index);
                  }
                }}
                className={
                  "flex h-9 w-9 items-center justify-center rounded-md border text-sm font-semibold " +
                  (index === step
                    ? "border-[var(--m-border-strong)] bg-[rgba(201,149,99,0.18)] text-[var(--m-text)]"
                    : index < step
                      ? "border-[var(--m-border)] bg-[rgba(201,149,99,0.14)] text-[var(--m-accent-2)]"
                      : "border-[var(--m-border)] bg-[rgba(16,13,11,0.65)] text-[var(--m-text-muted)]")
                }
              >
                {index + 1}
              </button>
              <span className="hidden text-sm sm:inline">{label}</span>
            </div>
          ))}
        </div>

        {step === 0 ? (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold">What kind of celebration are you planning?</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {vibeTags.map((vibe) => {
                const Icon = vibeIcons[vibe] ?? Users;
                const selected = form.vibeTags.includes(vibe);
                return (
                  <button
                    key={vibe}
                    type="button"
                    onClick={() => toggleVibe(vibe)}
                    className={
                      "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all " +
                      (selected
                        ? "border-[var(--m-accent)]/50 bg-[var(--m-accent)]/10"
                        : "border-[var(--m-border)] bg-[var(--m-surface)]")
                    }
                  >
                    <div className={"flex h-10 w-10 items-center justify-center rounded-xl " + (selected ? "bg-[var(--m-accent)] text-white" : "bg-[var(--m-surface-2)] text-[var(--m-text-muted)]")}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{vibe}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold">Dates and flexibility</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start date</label>
                <input type="date" value={form.startDate} onChange={(event) => update({ startDate: event.target.value })} className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End date</label>
                <input type="date" value={form.endDate} onChange={(event) => update({ endDate: event.target.value })} className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-[var(--m-text-muted)]">
              <input type="checkbox" checked={form.datesFlexible} onChange={(event) => update({ datesFlexible: event.target.checked })} />
              Our dates are flexible
            </label>
            <div className="space-y-2">
              <label className="text-sm font-medium">Anniversary date</label>
              <input type="date" value={form.anniversaryDate} onChange={(event) => update({ anniversaryDate: event.target.value })} className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm" />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold">Budget band</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {budgetBands.map((band) => (
                <button
                  key={band.id}
                  type="button"
                  onClick={() => update({ budgetBand: band.id })}
                  className={
                    "rounded-2xl border p-5 text-left transition-all " +
                    (form.budgetBand === band.id
                      ? "border-[var(--m-accent)]/50 bg-[var(--m-accent)]/10"
                      : "border-[var(--m-border)] bg-[var(--m-surface)]")
                  }
                >
                  <p className="text-sm font-semibold">{band.label}</p>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold">Contact details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={form.name} onChange={(event) => update({ name: event.target.value })} placeholder="Client A & Client B" className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm" />
              <input type="email" value={form.email} onChange={(event) => update({ email: event.target.value })} placeholder="guest@example.com" className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm" />
              <input value={form.phone} onChange={(event) => update({ phone: event.target.value })} placeholder="+27 00 000 0000" className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm" />
              <input value={form.city} onChange={(event) => update({ city: event.target.value })} placeholder="Cape Town" className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm" />
            </div>
            <input value={form.dietaryAllergies} onChange={(event) => update({ dietaryAllergies: event.target.value })} placeholder="Dietary or allergy notes" className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm" />
            <textarea value={form.notes} onChange={(event) => update({ notes: event.target.value })} rows={4} placeholder="Anything else we should know?" className="w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 py-3 text-sm" />
          </div>
        ) : null}

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <div className="mt-8 flex justify-between">
          <button type="button" onClick={() => setStep((value) => value - 1)} disabled={step === 0} className="m-btn-glass disabled:opacity-30">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </button>
          {step < 3 ? (
            <button type="button" onClick={() => setStep((value) => value + 1)} disabled={!canAdvance()} className="m-btn-primary disabled:opacity-40">
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} disabled={!canAdvance() || pending} className="m-btn-primary disabled:opacity-40">
              {pending ? "Submitting..." : "Submit request"}
            </button>
          )}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="m-glass sticky top-24 space-y-3 p-6">
          <p className="text-xs uppercase tracking-widest text-[var(--m-accent)]">Summary</p>
          <p className="text-sm text-[var(--m-text-muted)]">{form.vibeTags.join(", ") || "No vibes selected"}</p>
          <p className="text-sm text-[var(--m-text-muted)]">{form.budgetBand || "No budget selected"}</p>
          <p className="text-sm text-[var(--m-text-muted)]">{form.name || "No names yet"}</p>
        </div>
      </div>
    </div>
  );
}
