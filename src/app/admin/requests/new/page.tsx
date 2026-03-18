import Link from "next/link";
import { createRequestAction } from "@/lib/crm-actions";
import { budgetBands, requestStatuses, vibeTags } from "@/config/concierge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewRequestPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Request</h1>
          <p className="text-muted-foreground">Add a new client request to the planning pipeline.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/requests">Back</Link>
        </Button>
      </div>

      <form action={createRequestAction} className="space-y-6 rounded-lg border bg-card p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Client name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" name="timezone" defaultValue="Africa/Johannesburg" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="anniversaryDate">Anniversary date</Label>
            <Input id="anniversaryDate" name="anniversaryDate" type="date" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select id="status" name="status" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" defaultValue="NEW">
              {requestStatuses.map((item) => (
                <option key={item} value={item}>
                  {item.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="budgetBand">Budget band</Label>
            <select id="budgetBand" name="budgetBand" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="">Select budget</option>
              {budgetBands.map((band) => (
                <option key={band.id} value={band.id}>
                  {band.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start date</Label>
            <Input id="startDate" name="startDate" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End date</Label>
            <Input id="endDate" name="endDate" type="date" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Vibe tags</Label>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            {vibeTags.map((vibe) => (
              <label key={vibe} className="flex items-center gap-2 rounded-md border p-2 text-sm">
                <input type="checkbox" name="vibeTags" value={vibe} />
                {vibe}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferences">Preferences</Label>
          <textarea id="preferences" name="preferences" rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dietaryAllergies">Dietary / allergies</Label>
          <Input id="dietaryAllergies" name="dietaryAllergies" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Request notes</Label>
          <textarea id="notes" name="notes" rows={4} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" name="datesFlexible" />
          Dates are flexible
        </label>

        <div className="flex justify-end">
          <Button type="submit">Save request</Button>
        </div>
      </form>
    </div>
  );
}
