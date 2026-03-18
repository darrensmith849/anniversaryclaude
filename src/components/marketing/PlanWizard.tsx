"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const VIBE_OPTIONS = [
  "Safari & Wildlife",
  "Winelands & Gastronomy",
  "Coastal & Beach",
  "City & Culture",
  "Adventure & Outdoors",
  "Romance & Wellness",
  "Fine Dining",
  "Secluded & Private",
  "Family Friendly",
  "Eco & Sustainable",
];

const BUDGET_OPTIONS = [
  { value: "UNDER_50K", label: "Under R50,000" },
  { value: "BAND_50_100K", label: "R50,000 – R100,000" },
  { value: "BAND_100_200K", label: "R100,000 – R200,000" },
  { value: "BAND_200_500K", label: "R200,000 – R500,000" },
  { value: "OVER_500K", label: "R500,000+" },
];

const STEPS = ["Vibe", "Dates", "Budget", "Details"];

export function PlanWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [vibeTags, setVibeTags] = useState<string[]>([]);
  const [datesFlexible, setDatesFlexible] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budgetBand, setBudgetBand] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dietaryAllergies, setDietaryAllergies] = useState("");
  const [mustHaves, setMustHaves] = useState("");
  const [notes, setNotes] = useState("");

  function toggleVibe(v: string) {
    setVibeTags((prev) =>
      prev.includes(v) ? prev.filter((t) => t !== v) : [...prev, v]
    );
  }

  function canProceed(): boolean {
    switch (step) {
      case 0:
        return vibeTags.length > 0;
      case 1:
        return true;
      case 2:
        return budgetBand !== "";
      case 3:
        return name.length >= 2 && email.includes("@");
      default:
        return false;
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vibeTags,
          datesFlexible,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          budgetBand,
          name,
          email,
          phone: phone || undefined,
          dietaryAllergies: dietaryAllergies || undefined,
          mustHaves: mustHaves || undefined,
          notes: notes || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress indicator */}
      <div className="mb-10 flex items-center justify-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                i < step
                  ? "bg-neutral-900 text-white"
                  : i === step
                  ? "bg-neutral-900 text-white ring-2 ring-neutral-900 ring-offset-2"
                  : "bg-neutral-100 text-neutral-400"
              }`}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span
              className={`hidden sm:block text-xs ${
                i === step ? "text-neutral-900 font-medium" : "text-neutral-400"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-8 ${
                  i < step ? "bg-neutral-900" : "bg-neutral-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Live summary sidebar */}
      <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8">
          {/* Step 0: Vibes */}
          {step === 0 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-serif text-ink">
                What&apos;s your vibe?
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                Select everything that appeals to you.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {VIBE_OPTIONS.map((v) => (
                  <button
                    key={v}
                    onClick={() => toggleVibe(v)}
                    className={`rounded-full border px-4 py-2 text-sm transition-all ${
                      vibeTags.includes(v)
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Dates */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-serif text-ink">When are you thinking?</h2>
              <p className="mt-2 text-sm text-neutral-500">
                Don&apos;t worry if dates aren&apos;t fixed — we can work with flexibility.
              </p>
              <div className="mt-6 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={datesFlexible}
                    onChange={(e) => setDatesFlexible(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300"
                  />
                  <span className="text-sm text-neutral-700">
                    Our dates are flexible
                  </span>
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Earliest start
                    </label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Latest end
                    </label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Budget */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-serif text-ink">Budget range</h2>
              <p className="mt-2 text-sm text-neutral-500">
                This helps us curate the right level of experience. All
                budgets welcome.
              </p>
              <div className="mt-6 space-y-3">
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setBudgetBand(opt.value)}
                    className={`w-full rounded-xl border p-4 text-left text-sm transition-all ${
                      budgetBand === opt.value
                        ? "border-neutral-900 bg-neutral-50 font-medium text-ink"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-serif text-ink">Almost there</h2>
              <p className="mt-2 text-sm text-neutral-500">
                Share your contact details and any special requests.
              </p>
              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Your name *
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Phone (optional)
                  </label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+27 ..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Dietary needs / allergies
                  </label>
                  <Input
                    value={dietaryAllergies}
                    onChange={(e) => setDietaryAllergies(e.target.value)}
                    placeholder="e.g. vegetarian, nut allergy"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Must-haves
                  </label>
                  <Textarea
                    value={mustHaves}
                    onChange={(e) => setMustHaves(e.target.value)}
                    placeholder="Anything you absolutely want included..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Anything else?
                  </label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special occasions, surprises, preferences..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="mt-4 text-sm text-red-600">{error}</p>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
              className="gap-1"
            >
              <ChevronLeft size={16} />
              Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="gap-1"
              >
                Continue
                <ChevronRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className="gap-2"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                Submit Brief
              </Button>
            )}
          </div>
        </div>

        {/* Summary panel */}
        <div className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-neutral-200 bg-white p-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Your Brief
            </h4>
            <div className="mt-4 space-y-3 text-sm text-neutral-600">
              {vibeTags.length > 0 && (
                <div>
                  <span className="text-xs text-neutral-400">Vibes</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {vibeTags.map((v) => (
                      <span
                        key={v}
                        className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {budgetBand && (
                <div>
                  <span className="text-xs text-neutral-400">Budget</span>
                  <p className="mt-0.5">
                    {BUDGET_OPTIONS.find((b) => b.value === budgetBand)?.label}
                  </p>
                </div>
              )}
              {(startDate || endDate) && (
                <div>
                  <span className="text-xs text-neutral-400">Dates</span>
                  <p className="mt-0.5">
                    {startDate || "?"} — {endDate || "?"}
                    {datesFlexible && " (flexible)"}
                  </p>
                </div>
              )}
              {name && (
                <div>
                  <span className="text-xs text-neutral-400">Name</span>
                  <p className="mt-0.5">{name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
