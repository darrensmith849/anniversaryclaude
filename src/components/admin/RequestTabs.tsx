"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { budgetLabel, formatDate, statusLabel } from "@/lib/utils";

type RequestWithRelations = {
  id: string;
  status: string;
  anniversaryYear: string | null;
  celebrationWindow: string | null;
  datesFlexible: boolean;
  startDate: string | Date | null;
  endDate: string | Date | null;
  travelRegions: string[];
  experienceStyles: string[];
  luxuryTone: string | null;
  pace: string | null;
  specialMoments: string | null;
  tripLength: string | null;
  travellerCount: string | null;
  departureCity: string | null;
  budgetBand: string | null;
  preferences: string | null;
  surprises: string | null;
  messageToTeam: string | null;
  vibeTags: string[];
  notes: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  client: {
    name: string;
    email: string;
    phone: string | null;
    city: string | null;
    anniversaryDate: string | Date | null;
    dietaryAllergies: string | null;
    accessibility: string | null;
    notes: string | null;
  };
  stays: Array<{
    id: string;
    propertyName: string;
    location: string | null;
    checkIn: string | Date | null;
    checkOut: string | Date | null;
    status: string;
    notes: string | null;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    dueAt: string | Date | null;
  }>;
  activityLogs: Array<{
    id: string;
    action: string;
    description: string | null;
    actor: string | null;
    createdAt: string | Date;
  }>;
};

const TABS = ["Overview", "Brief", "Client", "Stays", "Tasks", "Activity"];

export function RequestTabs({ request }: { request: RequestWithRelations }) {
  const [tab, setTab] = useState("Overview");

  return (
    <div className="mt-6">
      <div className="flex gap-1 border-b border-neutral-200 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === t
                ? "border-neutral-900 text-ink"
                : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 animate-in">
        {tab === "Overview" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-sm">Request Details</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Row label="Status" value={statusLabel(request.status)} />
                <Row label="Budget" value={budgetLabel(request.budgetBand)} />
                <Row label="Anniversary" value={request.anniversaryYear ?? "—"} />
                <Row label="Window" value={request.celebrationWindow ?? "—"} />
                <Row label="Dates" value={`${formatDate(request.startDate)} — ${formatDate(request.endDate)}${request.datesFlexible ? " (flexible)" : ""}`} />
                <Row label="Trip length" value={request.tripLength ?? "—"} />
                <Row label="Travellers" value={request.travellerCount ?? "—"} />
                <Row label="Created" value={formatDate(request.createdAt)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm">Experience</CardTitle></CardHeader>
              <CardContent>
                {request.travelRegions.length > 0 && (
                  <div className="mb-3">
                    <span className="text-xs text-neutral-400">Regions</span>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {request.travelRegions.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                    </div>
                  </div>
                )}
                {request.experienceStyles.length > 0 && (
                  <div className="mb-3">
                    <span className="text-xs text-neutral-400">Styles</span>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {request.experienceStyles.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                    </div>
                  </div>
                )}
                {request.luxuryTone && <p className="text-sm text-neutral-600 mt-2"><span className="text-neutral-400">Tone:</span> {request.luxuryTone}</p>}
                {request.pace && <p className="text-sm text-neutral-600"><span className="text-neutral-400">Pace:</span> {request.pace}</p>}
                {request.notes && (
                  <p className="mt-3 text-sm text-neutral-500 whitespace-pre-wrap border-t border-neutral-100 pt-3">{request.notes}</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Brief" && (
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-sm">Occasion</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Row label="Milestone" value={request.anniversaryYear ?? "—"} />
                <Row label="Window" value={request.celebrationWindow ?? "—"} />
                <Row label="Dates flexible" value={request.datesFlexible ? "Yes" : "No"} />
                <Row label="Start" value={formatDate(request.startDate)} />
                <Row label="End" value={formatDate(request.endDate)} />
                <Row label="Regions" value={request.travelRegions.join(", ") || "—"} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm">Experience Style</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Row label="Styles" value={request.experienceStyles.join(", ") || "—"} />
                <Row label="Luxury tone" value={request.luxuryTone ?? "—"} />
                <Row label="Pace" value={request.pace ?? "—"} />
                {request.specialMoments && (
                  <div className="pt-2 border-t border-neutral-100">
                    <span className="text-neutral-400">Special moments</span>
                    <p className="mt-1 text-neutral-700 whitespace-pre-wrap">{request.specialMoments}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm">Trip Details</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Row label="Trip length" value={request.tripLength ?? "—"} />
                <Row label="Travellers" value={request.travellerCount ?? "—"} />
                <Row label="Departure city" value={request.departureCity ?? "—"} />
                <Row label="Budget" value={budgetLabel(request.budgetBand)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm">Personal</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {request.preferences && <TextBlock label="Preferences" value={request.preferences} />}
                {request.surprises && <TextBlock label="Surprises" value={request.surprises} />}
                {request.messageToTeam && <TextBlock label="Message to concierge" value={request.messageToTeam} />}
                {!request.preferences && !request.surprises && !request.messageToTeam && (
                  <p className="text-neutral-400">No personal notes provided.</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Client" && (
          <Card>
            <CardHeader><CardTitle className="text-sm">Client Profile</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Row label="Name" value={request.client.name} />
              <Row label="Email" value={request.client.email} />
              <Row label="Phone" value={request.client.phone ?? "—"} />
              <Row label="City" value={request.client.city ?? "—"} />
              <Row label="Anniversary date" value={formatDate(request.client.anniversaryDate)} />
              <Row label="Dietary / allergies" value={request.client.dietaryAllergies ?? "—"} />
              <Row label="Accessibility" value={request.client.accessibility ?? "—"} />
              {request.client.notes && (
                <TextBlock label="Notes" value={request.client.notes} />
              )}
            </CardContent>
          </Card>
        )}

        {tab === "Stays" && (
          <div className="space-y-3">
            {request.stays.length === 0 ? (
              <p className="text-sm text-neutral-400 py-8 text-center">No stays linked to this request yet.</p>
            ) : (
              request.stays.map((s) => (
                <Card key={s.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{s.propertyName}</p>
                        <p className="text-xs text-neutral-500">
                          {s.location ?? "—"} &middot; {formatDate(s.checkIn)} — {formatDate(s.checkOut)}
                        </p>
                      </div>
                      <Badge variant="secondary">{statusLabel(s.status)}</Badge>
                    </div>
                    {s.notes && <p className="mt-2 text-xs text-neutral-500">{s.notes}</p>}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {tab === "Tasks" && (
          <div className="space-y-3">
            {request.tasks.length === 0 ? (
              <p className="text-sm text-neutral-400 py-8 text-center">No tasks yet. Task management is coming in Phase 2.</p>
            ) : (
              request.tasks.map((t) => (
                <Card key={t.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-medium text-sm">{t.title}</p>
                      <p className="text-xs text-neutral-500">{t.priority} &middot; Due {formatDate(t.dueAt)}</p>
                    </div>
                    <Badge variant="secondary">{statusLabel(t.status)}</Badge>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {tab === "Activity" && (
          <div className="space-y-2">
            {request.activityLogs.length === 0 ? (
              <p className="text-sm text-neutral-400 py-8 text-center">No activity yet.</p>
            ) : (
              request.activityLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 rounded-lg border border-neutral-100 bg-white p-4">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
                  <div className="min-w-0">
                    <p className="text-sm text-neutral-700">{log.description ?? log.action.replace(/_/g, " ")}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{log.actor ?? "system"} &middot; {formatDate(log.createdAt)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-neutral-500 shrink-0">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

function TextBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="pt-2 border-t border-neutral-100">
      <span className="text-neutral-400">{label}</span>
      <p className="mt-1 text-neutral-700 whitespace-pre-wrap">{value}</p>
    </div>
  );
}
