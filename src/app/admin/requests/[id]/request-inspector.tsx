"use client";

import { useState } from "react";
import Link from "next/link";
import { budgetBands, requestStatuses, stayStatuses, vibeTags } from "@/config/concierge";
import { createStayAction, updateClientAction, updateRequestAction } from "@/lib/crm-actions";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RequestData = {
  id: string;
  clientId: string;
  status: string;
  datesFlexible: boolean;
  startDate: string | null;
  endDate: string | null;
  budgetBand: string | null;
  vibeTags: string[];
  notes: string | null;
  client: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    timezone: string;
    city: string | null;
    anniversaryDate: string | null;
    preferences: string | null;
    dietaryAllergies: string | null;
  };
  stays: Array<{
    id: string;
    propertyName: string;
    location: string | null;
    status: string;
    checkIn: string | null;
    checkOut: string | null;
    nights: number | null;
  }>;
};

type ActivityItem = {
  id: string;
  action: string;
  entity: string;
  details: string | null;
  createdAt: string;
};

function toDateValue(value: string | null): string {
  if (!value) {
    return "";
  }
  return value.slice(0, 10);
}

export function RequestInspector({ request, activity }: { request: RequestData; activity: ActivityItem[] }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 border-b pb-3">
        {[
          { id: "overview", label: "Overview" },
          { id: "preferences", label: "Preferences" },
          { id: "stays", label: "Stays" },
          { id: "activity", label: "Activity" },
          { id: "tasks", label: "Tasks" },
          { id: "emails", label: "Emails" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={
              "rounded-full px-4 py-1.5 text-sm transition-colors " +
              (activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80")
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" ? (
        <form action={updateRequestAction} className="space-y-4 rounded-lg border bg-card p-5">
          <input type="hidden" name="requestId" value={request.id} />
          <div className="flex items-center gap-3">
            <StatusBadge status={request.status} />
            <p className="text-sm text-muted-foreground">Pipeline controls</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select id="status" name="status" defaultValue={request.status} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {requestStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budgetBand">Budget band</Label>
              <select id="budgetBand" name="budgetBand" defaultValue={request.budgetBand ?? ""} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="">None</option>
                {budgetBands.map((band) => (
                  <option key={band.id} value={band.id}>
                    {band.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start date</Label>
              <Input id="startDate" name="startDate" type="date" defaultValue={toDateValue(request.startDate)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End date</Label>
              <Input id="endDate" name="endDate" type="date" defaultValue={toDateValue(request.endDate)} />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" name="datesFlexible" defaultChecked={request.datesFlexible} />
            Dates are flexible
          </label>

          <div className="space-y-2">
            <Label>Vibe tags</Label>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
              {vibeTags.map((vibe) => (
                <label key={vibe} className="flex items-center gap-2 rounded-md border p-2 text-sm">
                  <input type="checkbox" name="vibeTags" value={vibe} defaultChecked={request.vibeTags.includes(vibe)} />
                  {vibe}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea id="notes" name="notes" rows={4} defaultValue={request.notes ?? ""} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save request</Button>
          </div>
        </form>
      ) : null}

      {activeTab === "preferences" ? (
        <form action={updateClientAction} className="space-y-4 rounded-lg border bg-card p-5">
          <input type="hidden" name="clientId" value={request.client.id} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Client name</Label>
              <Input id="name" name="name" defaultValue={request.client.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={request.client.email} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" defaultValue={request.client.phone ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" defaultValue={request.client.city ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" name="timezone" defaultValue={request.client.timezone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="anniversaryDate">Anniversary date</Label>
              <Input id="anniversaryDate" name="anniversaryDate" type="date" defaultValue={toDateValue(request.client.anniversaryDate)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferences">Preferences</Label>
            <textarea id="preferences" name="preferences" rows={3} defaultValue={request.client.preferences ?? ""} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dietaryAllergies">Dietary / allergies</Label>
            <Input id="dietaryAllergies" name="dietaryAllergies" defaultValue={request.client.dietaryAllergies ?? ""} />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save client</Button>
          </div>
        </form>
      ) : null}

      {activeTab === "stays" ? (
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-5">
            <h3 className="text-base font-semibold">Current stays</h3>
            <div className="mt-3 space-y-3">
              {request.stays.length === 0 ? (
                <p className="text-sm text-muted-foreground">No stays yet.</p>
              ) : (
                request.stays.map((stay) => (
                  <div key={stay.id} className="rounded-md border p-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{stay.propertyName}</p>
                      <StatusBadge status={stay.status} />
                    </div>
                    <p className="text-muted-foreground">{stay.location ?? "Location pending"}</p>
                    <p className="text-xs text-muted-foreground">
                      {toDateValue(stay.checkIn)} to {toDateValue(stay.checkOut)} · {stay.nights ?? "-"} nights
                    </p>
                    <Link href={"/admin/stays?edit=" + stay.id} className="mt-2 inline-block text-xs text-primary hover:underline">
                      Open in stays table
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          <form action={createStayAction} className="space-y-4 rounded-lg border bg-card p-5">
            <input type="hidden" name="requestId" value={request.id} />
            <input type="hidden" name="clientId" value={request.client.id} />
            <h3 className="text-base font-semibold">Add stay</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="propertyName">Property name</Label>
                <Input id="propertyName" name="propertyName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkIn">Check-in</Label>
                <Input id="checkIn" name="checkIn" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOut">Check-out</Label>
                <Input id="checkOut" name="checkOut" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" defaultValue="DRAFT" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  {stayStatuses.map((item) => (
                    <option key={item} value={item}>
                      {item.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="costCurrency">Currency</Label>
                <Input id="costCurrency" name="costCurrency" defaultValue="ZAR" maxLength={3} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Create stay</Button>
            </div>
          </form>
        </div>
      ) : null}

      {activeTab === "activity" ? (
        <div className="rounded-lg border bg-card p-5">
          <h3 className="mb-3 text-base font-semibold">Activity log</h3>
          <div className="space-y-3">
            {activity.length === 0 ? (
              <p className="text-sm text-muted-foreground">No activity yet.</p>
            ) : (
              activity.map((entry) => (
                <div key={entry.id} className="rounded-md border p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{entry.action}</p>
                    <p className="text-xs text-muted-foreground">{entry.createdAt.slice(0, 19).replace("T", " ")}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{entry.entity}</p>
                  {entry.details ? <p className="mt-1 text-sm">{entry.details}</p> : null}
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}

      {activeTab === "tasks" ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">Tasks are scaffolded for a later phase.</div>
      ) : null}

      {activeTab === "emails" ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">Emails are scaffolded for a later phase.</div>
      ) : null}
    </div>
  );
}
