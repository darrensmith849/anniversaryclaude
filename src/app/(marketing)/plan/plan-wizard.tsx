"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitPlan, type PlanInput } from "@/lib/plan-actions";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Compass,
  Wine,
  Sun,
  Building,
  Flower2,
  Sparkles,
  Users,
} from "lucide-react";

const VIBES = [
  { id: "romantic", label: "Romantic & Intimate", Icon: Heart },
  { id: "adventure", label: "Adventure & Safari", Icon: Compass },
  { id: "wine", label: "Wine & Culinary", Icon: Wine },
  { id: "beach", label: "Beach & Coastal", Icon: Sun },
  { id: "urban", label: "City & Culture", Icon: Building },
  { id: "spa", label: "Spa & Wellness", Icon: Flower2 },
  { id: "surprise", label: "Surprise Me", Icon: Sparkles },
  { id: "family", label: "Family-Friendly", Icon: Users },
];

const BUDGETS = [
  { id: "10k-25k", label: "Spark", range: "R10k – R25k" },
  { id: "25k-50k", label: "Signature", range: "R25k – R50k" },
  { id: "50k-100k", label: "Elite", range: "R50k – R100k" },
  { id: "100k-250k", label: "Icon", range: "R100k – R250k" },
  { id: "250k+", label: "Bespoke", range: "R250k+" },
];

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

  function update(patch: Partial<PlanInput>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function toggleVibe(id: string) {
    setForm((prev) => ({
      ...prev,
      vibeTags: prev.vibeTags.includes(id)
        ? prev.vibeTags.filter((v) => v !== id)
        : [...prev.vibeTags, id],
    }));
  }

  function canAdvance(): boolean {
    if (step === 0) return form.vibeTags.length > 0;
    if (step === 1) return true;
    if (step === 2) return form.budgetBand !== "";
    return form.name !== "" && form.email !== "";
  }

  function handleSubmit() {
    setError("");
    startTransition(async () => {
      try {
        await submitPlan(form);
        router.push("/thank-you");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  const steps = ["Vibe", "Dates", "Budget", "Details"];

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {/* Stepper */}
        <div className="mb-10 flex items-center gap-3">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                  i === step
                    ? "m-btn-primary shadow-lg shadow-[var(--m-accent)]/20"
                    : i < step
                      ? "bg-[var(--m-accent)]/20 text-[var(--m-accent)]"
                      : "bg-[var(--m-surface)] text-[var(--m-muted)]"
                }`}
              >
                {i + 1}
              </button>
              <span
                className={`hidden text-sm sm:inline ${
                  i <= step
                    ? "font-medium text-[var(--m-text)]"
                    : "text-[var(--m-muted)]"
                }`}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`h-px w-6 transition-colors ${
                    i < step
                      ? "bg-[var(--m-accent)]/40"
                      : "bg-[var(--m-border)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Vibe */}
        {step === 0 && (
          <div className="m-animate-in space-y-5">
            <h2 className="text-2xl font-bold">
              What&apos;s your ideal anniversary vibe?
            </h2>
            <p className="text-[var(--m-muted)]">
              Select all that appeal. We&apos;ll craft something perfect.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {VIBES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => toggleVibe(v.id)}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                    form.vibeTags.includes(v.id)
                      ? "border-[var(--m-accent)]/50 bg-[var(--m-accent)]/10 shadow-lg shadow-[var(--m-accent)]/5"
                      : "border-[var(--m-border)] bg-[var(--m-surface)] hover:border-[var(--m-accent)]/30"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                      form.vibeTags.includes(v.id)
                        ? "bg-[var(--m-accent)] text-white"
                        : "bg-[var(--m-surface-2)] text-[var(--m-muted)]"
                    }`}
                  >
                    <v.Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{v.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Dates */}
        {step === 1 && (
          <div className="m-animate-in space-y-5">
            <h2 className="text-2xl font-bold">When are you celebrating?</h2>
            <p className="text-[var(--m-muted)]">
              Don&apos;t worry if you&apos;re not sure yet — flexible works too.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => update({ startDate: e.target.value })}
                  className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm text-[var(--m-text)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => update({ endDate: e.target.value })}
                  className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm text-[var(--m-text)]"
                />
              </div>
            </div>
            <label className="flex items-center gap-2.5 text-sm text-[var(--m-muted)]">
              <input
                type="checkbox"
                checked={form.datesFlexible}
                onChange={(e) => update({ datesFlexible: e.target.checked })}
                className="h-4 w-4 rounded"
              />
              Our dates are flexible
            </label>
            <div className="space-y-2">
              <label className="text-sm font-medium">Anniversary Date</label>
              <input
                type="date"
                value={form.anniversaryDate}
                onChange={(e) => update({ anniversaryDate: e.target.value })}
                className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm text-[var(--m-text)]"
              />
              <p className="text-xs text-[var(--m-muted)]">
                We&apos;ll make sure this day is extra special.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 2 && (
          <div className="m-animate-in space-y-5">
            <h2 className="text-2xl font-bold">
              What&apos;s your budget range?
            </h2>
            <p className="text-[var(--m-muted)]">
              This helps us curate the right tier. All budgets welcome.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {BUDGETS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => update({ budgetBand: b.id })}
                  className={`rounded-2xl border p-5 text-left transition-all ${
                    form.budgetBand === b.id
                      ? "border-[var(--m-accent)]/50 bg-[var(--m-accent)]/10 shadow-lg shadow-[var(--m-accent)]/5"
                      : "border-[var(--m-border)] bg-[var(--m-surface)] hover:border-[var(--m-accent)]/30"
                  }`}
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--m-accent-2)]">
                    {b.label}
                  </p>
                  <p className="mt-1 text-lg font-bold">{b.range}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Details */}
        {step === 3 && (
          <div className="m-animate-in space-y-5">
            <h2 className="text-2xl font-bold">Almost there — a few details</h2>
            <p className="text-[var(--m-muted)]">
              So we can reach out with your bespoke proposal.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Names *</label>
                <input
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="Jane & John"
                  className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm text-[var(--m-text)] placeholder:text-[var(--m-muted)]/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm text-[var(--m-text)] placeholder:text-[var(--m-muted)]/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  placeholder="+27 82 000 0000"
                  className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm text-[var(--m-text)] placeholder:text-[var(--m-muted)]/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <input
                  value={form.city}
                  onChange={(e) => update({ city: e.target.value })}
                  placeholder="Cape Town"
                  className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm text-[var(--m-text)] placeholder:text-[var(--m-muted)]/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Dietary / Allergies
              </label>
              <input
                value={form.dietaryAllergies}
                onChange={(e) => update({ dietaryAllergies: e.target.value })}
                placeholder="Vegetarian, nut allergy, etc."
                className="h-11 w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 text-sm text-[var(--m-text)] placeholder:text-[var(--m-muted)]/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Anything else?</label>
              <textarea
                value={form.notes}
                onChange={(e) => update({ notes: e.target.value })}
                rows={4}
                placeholder="Special requests, must-haves, surprises..."
                className="w-full rounded-xl border border-[var(--m-border)] bg-[var(--m-surface)] px-4 py-3 text-sm text-[var(--m-text)] placeholder:text-[var(--m-muted)]/50"
              />
            </div>
          </div>
        )}

        {/* Nav */}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="m-btn-glass inline-flex h-11 items-center rounded-full px-6 text-sm font-medium disabled:opacity-30"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </button>
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className="m-btn-primary inline-flex h-11 items-center rounded-full px-8 text-sm disabled:opacity-40"
            >
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canAdvance() || pending}
              className="m-btn-primary inline-flex h-11 items-center rounded-full px-8 text-sm disabled:opacity-40"
            >
              {pending ? "Submitting..." : "Submit Your Plan"}
            </button>
          )}
        </div>
      </div>

      {/* Summary panel */}
      <div className="hidden lg:block">
        <div className="m-glass sticky top-24 space-y-4 p-6">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--m-accent)]">
            Your Plan So Far
          </p>
          {form.vibeTags.length > 0 && (
            <div>
              <span className="text-xs text-[var(--m-muted)]">Vibes</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {form.vibeTags.map((v) => (
                  <span
                    key={v}
                    className="rounded-full bg-[var(--m-accent)]/15 px-2.5 py-0.5 text-xs text-[var(--m-accent)]"
                  >
                    {VIBES.find((vb) => vb.id === v)?.label || v}
                  </span>
                ))}
              </div>
            </div>
          )}
          {(form.startDate || form.endDate) && (
            <div>
              <span className="text-xs text-[var(--m-muted)]">Dates</span>
              <p className="text-sm">
                {form.startDate || "TBD"} — {form.endDate || "TBD"}
                {form.datesFlexible && (
                  <span className="ml-1 text-xs text-[var(--m-accent-2)]">
                    (flexible)
                  </span>
                )}
              </p>
            </div>
          )}
          {form.budgetBand && (
            <div>
              <span className="text-xs text-[var(--m-muted)]">Budget</span>
              <p className="text-sm font-medium">
                {BUDGETS.find((b) => b.id === form.budgetBand)?.range}
                <span className="ml-1.5 text-xs text-[var(--m-accent-2)]">
                  {BUDGETS.find((b) => b.id === form.budgetBand)?.label}
                </span>
              </p>
            </div>
          )}
          {form.name && (
            <div>
              <span className="text-xs text-[var(--m-muted)]">Names</span>
              <p className="text-sm">{form.name}</p>
            </div>
          )}
          {!form.vibeTags.length &&
            !form.startDate &&
            !form.budgetBand &&
            !form.name && (
              <p className="text-sm text-[var(--m-muted)]">
                Your selections will appear here as you go.
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
