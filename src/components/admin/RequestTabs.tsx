"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { budgetLabel, formatDate, statusLabel } from "@/lib/utils";

type RequestWithRelations = {
  id: string;
  status: string;
  datesFlexible: boolean;
  startDate: string | Date | null;
  endDate: string | Date | null;
  budgetBand: string | null;
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
    notes: string | null;
  };
  stays: Array<{
    id: string;
    propertyName: string;
    location: string | null;
    checkIn: string | Date | null;
    checkOut: string | Date | null;
    status: string;
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

const TABS = ["Overview", "Preferences", "Stays", "Tasks", "Activity"];

export function RequestTabs({ request }: { request: RequestWithRelations }) {
  const [tab, setTab] = useState("Overview");

  return (
    <div className="mt-6">
      <div className="flex gap-1 border-b border-neutral-200">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === t
                ? "border-neutral-900 text-ink"
                : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 animate-fade-in">
        {tab === "Overview" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Request Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Status</span>
                  <span>{statusLabel(request.status)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Budget</span>
                  <span>{budgetLabel(request.budgetBand)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Dates</span>
                  <span>
                    {formatDate(request.startDate)} — {formatDate(request.endDate)}
                    {request.datesFlexible && " (flexible)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Created</span>
                  <span>{formatDate(request.createdAt)}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Vibes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {request.vibeTags.map((t) => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
                {request.notes && (
                  <p className="mt-4 text-sm text-neutral-500 whitespace-pre-wrap">
                    {request.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {tab === "Preferences" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Client Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">City</span>
                <span>{request.client.city ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Anniversary Date</span>
                <span>{formatDate(request.client.anniversaryDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Dietary / Allergies</span>
                <span>{request.client.dietaryAllergies ?? "—"}</span>
              </div>
              {request.client.notes && (
                <div className="pt-2 border-t border-neutral-100">
                  <span className="text-neutral-500">Notes</span>
                  <p className="mt-1 whitespace-pre-wrap">{request.client.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {tab === "Stays" && (
          <div className="space-y-3">
            {request.stays.length === 0 ? (
              <p className="text-sm text-neutral-400 py-8 text-center">
                No stays linked to this request yet.
              </p>
            ) : (
              request.stays.map((s) => (
                <Card key={s.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-medium text-sm">{s.propertyName}</p>
                      <p className="text-xs text-neutral-500">
                        {s.location ?? "—"} · {formatDate(s.checkIn)} — {formatDate(s.checkOut)}
                      </p>
                    </div>
                    <Badge variant="secondary">{statusLabel(s.status)}</Badge>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {tab === "Tasks" && (
          <div className="space-y-3">
            {request.tasks.length === 0 ? (
              <p className="text-sm text-neutral-400 py-8 text-center">
                No tasks yet.
              </p>
            ) : (
              request.tasks.map((t) => (
                <Card key={t.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-medium text-sm">{t.title}</p>
                      <p className="text-xs text-neutral-500">
                        {t.priority} · Due {formatDate(t.dueAt)}
                      </p>
                    </div>
                    <Badge variant="secondary">{statusLabel(t.status)}</Badge>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {tab === "Activity" && (
          <div className="space-y-3">
            {request.activityLogs.length === 0 ? (
              <p className="text-sm text-neutral-400 py-8 text-center">
                No activity yet.
              </p>
            ) : (
              request.activityLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 rounded-lg border border-neutral-100 bg-white p-4"
                >
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-neutral-300" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {log.action.replace(/_/g, " ")}
                    </p>
                    {log.description && (
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {log.description}
                      </p>
                    )}
                    <p className="text-xs text-neutral-400 mt-1">
                      {log.actor ?? "system"} · {formatDate(log.createdAt)}
                    </p>
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
