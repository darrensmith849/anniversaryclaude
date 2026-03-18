import { getDb } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Hotel, Users, ClipboardList } from "lucide-react";

export default async function AdminDashboard() {
  const db = getDb();

  const [clients, requests, activeStays, openRequests] = await Promise.all([
    db.client.count(),
    db.anniversaryRequest.count(),
    db.stay.count({ where: { status: { in: ["DRAFT", "PROPOSED", "CONFIRMED"] } } }),
    db.anniversaryRequest.count({ where: { status: { in: ["NEW", "QUALIFIED", "OUTREACH_IN_PROGRESS", "OPTIONS_RECEIVED"] } } }),
  ]);

  const stats = [
    { label: "Clients", value: clients, icon: Users, detail: "Active CRM contacts" },
    { label: "Requests", value: requests, icon: Heart, detail: "Total anniversary requests" },
    { label: "Open Pipeline", value: openRequests, icon: ClipboardList, detail: "Requests in progress" },
    { label: "Stays", value: activeStays, icon: Hotel, detail: "Draft to confirmed stays" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Admin-first overview for requests, clients, and stays.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold tracking-tight">{stat.value}</div>
              <CardDescription>{stat.detail}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
