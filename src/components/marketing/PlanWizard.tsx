"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronLeft, ChevronRight, Loader2, Send } from "lucide-react";

const REGIONS = [
  "Kruger & Lowveld",
  "Winelands",
  "Garden Route",
  "Cape Town & Peninsula",
  "KwaZulu-Natal Coast",
  "Karoo & Interior",
  "Wild Coast",
  "West Coast",
];

const STYLES = [
  "Safari & Wildlife",
  "Winelands & Gastronomy",
  "Coastal & Beach",
  "City & Culture",
  "Adventure & Outdoors",
  "Romance & Wellness",
  "Fine Dining Focus",
  "Secluded & Private",
];

const TONES = [
  "Understated elegance",
  "Grand and celebratory",
  "Rustic luxury",
  "Modern and contemporary",
  "Classic and timeless",
];

const PACES = [
  "Slow and unhurried",
  "Relaxed with highlights",
  "Active and exploratory",
  "Mix of both",
];

const BUDGETS = [
  { value: "UNDER_50K", label: "Under R50,000" },
  { value: "BAND_50_100K", label: "R50,000 – R100,000" },
  { value: "BAND_100_200K", label: "R100,000 – R200,000" },
  { value: "BAND_200_500K", label: "R200,000 – R500,000" },
  { value: "OVER_500K", label: "R500,000+" },
];

const STEPS = ["Occasion", "Experience", "Trip Details", "Personal", "Review"];

function TagButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-all ${
        selected
          ? "border-charcoal-900 bg-charcoal-900 text-white"
          : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
      }`}
    >
      {label}
    </button>
  );
}

function RadioCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-4 text-left text-sm transition-all ${
        selected
          ? "border-brass-500/40 bg-champagne-50 font-medium text-ink"
          : "border-stone-200 text-stone-600 hover:border-stone-300"
      }`}
    >
      {label}
    </button>
  );
}

export function PlanWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Occasion
  const [anniversaryYear, setAnniversaryYear] = useState("");
  const [celebrationWindow, setCelebrationWindow] = useState("");
  const [datesFlexible, setDatesFlexible] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelRegions, setTravelRegions] = useState<string[]>([]);

  // Step 2: Experience
  const [experienceStyles, setExperienceStyles] = useState<string[]>([]);
  const [luxuryTone, setLuxuryTone] = useState("");
  const [pace, setPace] = useState("");
  const [specialMoments, setSpecialMoments] = useState("");

  // Step 3: Trip
  const [tripLength, setTripLength] = useState("");
  const [travellerCount, setTravellerCount] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [budgetBand, setBudgetBand] = useState("");

  // Step 4: Personal
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dietaryAllergies, setDietaryAllergies] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [preferences, setPreferences] = useState("");
  const [surprises, setSurprises] = useState("");
  const [messageToTeam, setMessageToTeam] = useState("");

  function toggle(arr: string[], val: string, setter: (v: string[]) => void) {
    setter(arr.includes(val) ? arr.filter((t) => t !== val) : [...arr, val]);
  }

  function canProceed(): boolean {
    switch (step) {
      case 0:
        return travelRegions.length > 0;
      case 1:
        return experienceStyles.length > 0;
      case 2:
        return budgetBand !== "";
      case 3:
        return name.length >= 2 && email.includes("@");
      case 4:
        return true;
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
          anniversaryYear: anniversaryYear || undefined,
          celebrationWindow: celebrationWindow || undefined,
          datesFlexible,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          travelRegions,
          experienceStyles,
          luxuryTone: luxuryTone || undefined,
          pace: pace || undefined,
          specialMoments: specialMoments || undefined,
          tripLength: tripLength || undefined,
          travellerCount: travellerCount || undefined,
          departureCity: departureCity || undefined,
          budgetBand,
          name,
          email,
          phone: phone || undefined,
          dietaryAllergies: dietaryAllergies || undefined,
          accessibility: accessibility || undefined,
          preferences: preferences || undefined,
          surprises: surprises || undefined,
          messageToTeam: messageToTeam || undefined,
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
    <div className="mx-auto max-w-4xl">
      {/* Progress */}
      <div className="mb-10 flex items-center justify-center gap-1 sm:gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                i < step
                  ? "bg-brass-500 text-white cursor-pointer"
                  : i === step
                  ? "bg-charcoal-900 text-white ring-2 ring-stone-300 ring-offset-2"
                  : "bg-stone-100 text-stone-400"
              }`}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </button>
            <span
              className={`hidden sm:block text-xs whitespace-nowrap ${
                i === step ? "text-ink font-medium" : "text-stone-400"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-4 sm:w-8 ${i < step ? "bg-brass-500" : "bg-stone-200"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
        {/* Main panel */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
          {/* Step 0: Occasion */}
          {step === 0 && (
            <div className="animate-in space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-ink">Tell us about the occasion</h2>
                <p className="mt-1 text-sm text-stone-500">The basics help us shape the right celebration.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Anniversary milestone</label>
                  <Input value={anniversaryYear} onChange={(e) => setAnniversaryYear(e.target.value)} placeholder="e.g. 10th, 25th, 1st" className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Celebration window</label>
                  <Input value={celebrationWindow} onChange={(e) => setCelebrationWindow(e.target.value)} placeholder="e.g. June 2026" className="mt-1" />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={datesFlexible} onChange={(e) => setDatesFlexible(e.target.checked)} className="h-4 w-4 rounded border-stone-300 accent-brass-500" />
                  <span className="text-sm text-stone-600">Our dates are flexible</span>
                </label>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Earliest start</label>
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Latest end</label>
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Where in South Africa? *</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {REGIONS.map((r) => (
                    <TagButton key={r} label={r} selected={travelRegions.includes(r)} onClick={() => toggle(travelRegions, r, setTravelRegions)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Experience */}
          {step === 1 && (
            <div className="animate-in space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-ink">Shape your experience</h2>
                <p className="mt-1 text-sm text-stone-500">What kind of anniversary celebration speaks to you?</p>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Experience style *</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {STYLES.map((s) => (
                    <TagButton key={s} label={s} selected={experienceStyles.includes(s)} onClick={() => toggle(experienceStyles, s, setExperienceStyles)} />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Luxury tone</label>
                <div className="mt-2 space-y-2">
                  {TONES.map((t) => (
                    <RadioCard key={t} label={t} selected={luxuryTone === t} onClick={() => setLuxuryTone(t)} />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Pace</label>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {PACES.map((p) => (
                    <RadioCard key={p} label={p} selected={pace === p} onClick={() => setPace(p)} />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Special moments or experiences</label>
                <Textarea value={specialMoments} onChange={(e) => setSpecialMoments(e.target.value)} placeholder="A private dinner under the stars, a helicopter transfer, a surprise..." rows={3} className="mt-1" />
              </div>
            </div>
          )}

          {/* Step 2: Trip Details */}
          {step === 2 && (
            <div className="animate-in space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-ink">Trip details</h2>
                <p className="mt-1 text-sm text-stone-500">Practical details that help us plan the right itinerary.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Trip length</label>
                  <Input value={tripLength} onChange={(e) => setTripLength(e.target.value)} placeholder="e.g. 3 nights, 5–7 nights" className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Number of travellers</label>
                  <Input value={travellerCount} onChange={(e) => setTravellerCount(e.target.value)} placeholder="e.g. 2, or 2 + 2 children" className="mt-1" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Departure city</label>
                <Input value={departureCity} onChange={(e) => setDepartureCity(e.target.value)} placeholder="e.g. Cape Town, Johannesburg" className="mt-1" />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Budget comfort zone *</label>
                <p className="mt-1 text-xs text-stone-400">This includes accommodation, experiences, and concierge planning.</p>
                <div className="mt-3 space-y-2">
                  {BUDGETS.map((b) => (
                    <RadioCard key={b.value} label={b.label} selected={budgetBand === b.value} onClick={() => setBudgetBand(b.value)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Personal */}
          {step === 3 && (
            <div className="animate-in space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-ink">Personal touches</h2>
                <p className="mt-1 text-sm text-stone-500">The details that make it uniquely yours.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Your name *</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Email *</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+27 ..." className="mt-1" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Dietary needs or allergies</label>
                  <Input value={dietaryAllergies} onChange={(e) => setDietaryAllergies(e.target.value)} placeholder="e.g. vegetarian, nut allergy" className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Accessibility requirements</label>
                  <Input value={accessibility} onChange={(e) => setAccessibility(e.target.value)} placeholder="Anything we should plan for" className="mt-1" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Preferences or requests</label>
                <Textarea value={preferences} onChange={(e) => setPreferences(e.target.value)} placeholder="Room type, pillow menu, champagne brand..." rows={2} className="mt-1" />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Any surprises you&apos;d like us to arrange?</label>
                <Textarea value={surprises} onChange={(e) => setSurprises(e.target.value)} placeholder="A surprise your partner doesn't know about..." rows={2} className="mt-1" />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">Message to our concierge team</label>
                <Textarea value={messageToTeam} onChange={(e) => setMessageToTeam(e.target.value)} placeholder="Anything else we should know..." rows={3} className="mt-1" />
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="animate-in space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-ink">Review your brief</h2>
                <p className="mt-1 text-sm text-stone-500">Check the details below, then submit. We&apos;ll be in touch within 24 hours.</p>
              </div>

              <div className="space-y-4">
                <ReviewSection label="Occasion">
                  {anniversaryYear && <ReviewItem label="Milestone" value={anniversaryYear} />}
                  {celebrationWindow && <ReviewItem label="Window" value={celebrationWindow} />}
                  <ReviewItem label="Dates flexible" value={datesFlexible ? "Yes" : "No"} />
                  {startDate && <ReviewItem label="From" value={startDate} />}
                  {endDate && <ReviewItem label="To" value={endDate} />}
                  <ReviewItem label="Regions" value={travelRegions.join(", ")} />
                </ReviewSection>

                <ReviewSection label="Experience">
                  <ReviewItem label="Styles" value={experienceStyles.join(", ")} />
                  {luxuryTone && <ReviewItem label="Tone" value={luxuryTone} />}
                  {pace && <ReviewItem label="Pace" value={pace} />}
                  {specialMoments && <ReviewItem label="Special moments" value={specialMoments} />}
                </ReviewSection>

                <ReviewSection label="Trip Details">
                  {tripLength && <ReviewItem label="Length" value={tripLength} />}
                  {travellerCount && <ReviewItem label="Travellers" value={travellerCount} />}
                  {departureCity && <ReviewItem label="Departing from" value={departureCity} />}
                  <ReviewItem label="Budget" value={BUDGETS.find((b) => b.value === budgetBand)?.label ?? budgetBand} />
                </ReviewSection>

                <ReviewSection label="Contact">
                  <ReviewItem label="Name" value={name} />
                  <ReviewItem label="Email" value={email} />
                  {phone && <ReviewItem label="Phone" value={phone} />}
                </ReviewSection>
              </div>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-stone-100 pt-6">
            <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 0} className="gap-1">
              <ChevronLeft size={16} /> Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canProceed()} className="gap-1">
                Continue <ChevronRight size={16} />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting} className="gap-2">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Submit Brief
              </Button>
            )}
          </div>
        </div>

        {/* Live summary */}
        <div className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">Your Brief</h4>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              {travelRegions.length > 0 && (
                <SummaryItem label="Regions" value={travelRegions.join(", ")} />
              )}
              {experienceStyles.length > 0 && (
                <SummaryItem label="Styles" value={experienceStyles.join(", ")} />
              )}
              {budgetBand && (
                <SummaryItem label="Budget" value={BUDGETS.find((b) => b.value === budgetBand)?.label ?? ""} />
              )}
              {tripLength && <SummaryItem label="Duration" value={tripLength} />}
              {name && <SummaryItem label="Name" value={name} />}
              {!travelRegions.length && !experienceStyles.length && (
                <p className="text-xs text-stone-400 italic">Your selections will appear here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs text-stone-400">{label}</span>
      <p className="mt-0.5 text-sm">{value}</p>
    </div>
  );
}

function ReviewSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-stone-100 bg-champagne-50/50 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">{label}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-stone-500 shrink-0">{label}</span>
      <span className="text-right text-ink">{value}</span>
    </div>
  );
}
