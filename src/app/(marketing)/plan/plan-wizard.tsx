"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { submitPlan, type PlanInput } from "@/lib/plan-actions";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const VIBES = [
  { id: "romantic", label: "Romantic & Intimate", emoji: "heart" },
  { id: "adventure", label: "Adventure & Safari", emoji: "compass" },
  { id: "wine", label: "Wine & Culinary", emoji: "wine" },
  { id: "beach", label: "Beach & Coastal", emoji: "sun" },
  { id: "urban", label: "City & Culture", emoji: "building" },
  { id: "spa", label: "Spa & Wellness", emoji: "flower" },
  { id: "surprise", label: "Surprise Me", emoji: "sparkle" },
  { id: "family", label: "Family-Friendly", emoji: "users" },
];

const BUDGETS = [
  { id: "10k-25k", label: "R10,000 – R25,000" },
  { id: "25k-50k", label: "R25,000 – R50,000" },
  { id: "50k-100k", label: "R50,000 – R100,000" },
  { id: "100k-250k", label: "R100,000 – R250,000" },
  { id: "250k+", label: "R250,000+" },
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
        <div className="mb-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`hidden text-sm sm:inline ${
                  i <= step ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <div className="h-px w-8 bg-border" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Vibe */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              What&apos;s your ideal anniversary vibe?
            </h2>
            <p className="text-muted-foreground">
              Select all that appeal to you. We&apos;ll craft something perfect.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {VIBES.map((v) => (
                <Card
                  key={v.id}
                  className={`cursor-pointer transition-all hover:border-primary/50 ${
                    form.vibeTags.includes(v.id)
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : ""
                  }`}
                  onClick={() => toggleVibe(v.id)}
                >
                  <CardContent className="flex items-center gap-3 p-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                        form.vibeTags.includes(v.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <Heart className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{v.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Dates */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">When are you celebrating?</h2>
            <p className="text-muted-foreground">
              Don&apos;t worry if you&apos;re not sure yet — we can work with
              flexible dates.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => update({ startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => update({ endDate: e.target.value })}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.datesFlexible}
                onChange={(e) => update({ datesFlexible: e.target.checked })}
              />
              Our dates are flexible
            </label>
            <div className="space-y-2">
              <Label>Anniversary Date</Label>
              <Input
                type="date"
                value={form.anniversaryDate}
                onChange={(e) => update({ anniversaryDate: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                The actual anniversary — we&apos;ll make sure it&apos;s extra
                special.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              What&apos;s your budget range?
            </h2>
            <p className="text-muted-foreground">
              This helps us curate the right experiences. All budgets welcome.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {BUDGETS.map((b) => (
                <Card
                  key={b.id}
                  className={`cursor-pointer transition-all hover:border-primary/50 ${
                    form.budgetBand === b.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : ""
                  }`}
                  onClick={() => update({ budgetBand: b.id })}
                >
                  <CardContent className="p-4">
                    <span className="font-medium">{b.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Details */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Almost there — tell us more</h2>
            <p className="text-muted-foreground">
              A few details so we can reach out with your bespoke proposal.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Your Names *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="Jane & John"
                />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  placeholder="+27 82 000 0000"
                />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={form.city}
                  onChange={(e) => update({ city: e.target.value })}
                  placeholder="Cape Town"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Dietary Requirements / Allergies</Label>
              <Input
                value={form.dietaryAllergies}
                onChange={(e) => update({ dietaryAllergies: e.target.value })}
                placeholder="Vegetarian, nut allergy, etc."
              />
            </div>
            <div className="space-y-2">
              <Label>Anything else we should know?</Label>
              <textarea
                value={form.notes}
                onChange={(e) => update({ notes: e.target.value })}
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Special requests, must-haves, surprises you'd love..."
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          {step < 3 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
            >
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canAdvance() || pending}
            >
              {pending ? "Submitting..." : "Submit Your Plan"}
            </Button>
          )}
        </div>
      </div>

      {/* Right-side summary */}
      <div className="hidden lg:block">
        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle className="text-base">Your Plan So Far</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {form.vibeTags.length > 0 && (
              <div>
                <span className="text-muted-foreground">Vibes</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {form.vibeTags.map((v) => (
                    <Badge key={v} variant="secondary" className="text-xs">
                      {VIBES.find((vb) => vb.id === v)?.label || v}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {(form.startDate || form.endDate) && (
              <div>
                <span className="text-muted-foreground">Dates</span>
                <p>
                  {form.startDate || "TBD"} — {form.endDate || "TBD"}
                  {form.datesFlexible && " (flexible)"}
                </p>
              </div>
            )}
            {form.budgetBand && (
              <div>
                <span className="text-muted-foreground">Budget</span>
                <p>
                  {BUDGETS.find((b) => b.id === form.budgetBand)?.label}
                </p>
              </div>
            )}
            {form.name && (
              <div>
                <span className="text-muted-foreground">Names</span>
                <p>{form.name}</p>
              </div>
            )}
            {form.email && (
              <div>
                <span className="text-muted-foreground">Email</span>
                <p>{form.email}</p>
              </div>
            )}
            {form.vibeTags.length === 0 &&
              !form.startDate &&
              !form.budgetBand &&
              !form.name && (
                <p className="text-muted-foreground">
                  Start filling in your preferences and they&apos;ll appear
                  here.
                </p>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
