import { getDb } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Building2, CheckSquare } from "lucide-react";

export default async function AdminDashboard() {
  const db = getDb();

  const [requestCount, clientCount, stayCount, taskCount] = await Promise.all([
    db.anniversaryRequest.count(),
    db.client.count(),
    db.stay.count(),
    db.task.count(),
  ]);

  const stats = [
    { label: "Requests", value: requestCount, icon: FileText, href: "/admin/requests" },
    { label: "Clients", value: clientCount, icon: Users, href: "/admin/requests" },
    { label: "Stays", value: stayCount, icon: Building2, href: "/admin/stays" },
    { label: "Tasks", value: taskCount, icon: CheckSquare, href: "/admin/tasks" },
  ];

  const recentRequests = await db.anniversaryRequest.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { client: true },
  });

  return (
    <>
      <h1 className="text-2xl font-serif text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Anniversary Concierge overview
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-neutral-500">
                  {s.label}
                </CardTitle>
                <Icon size={16} className="text-neutral-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{s.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-serif text-ink">Recent Requests</h2>
        <div className="mt-4 rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-left">
                <th className="px-4 py-3 font-medium text-neutral-500">Client</th>
                <th className="px-4 py-3 font-medium text-neutral-500">Status</th>
                <th className="px-4 py-3 font-medium text-neutral-500">Budget</th>
                <th className="px-4 py-3 font-medium text-neutral-500">Created</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((r) => (
                <tr key={r.id} className="border-b border-neutral-50 hover:bg-neutral-50">
                  <td className="px-4 py-3">{r.client.name}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs">
                      {r.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {r.budgetBand?.replace(/_/g, " ") ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {r.createdAt.toLocaleDateString("en-ZA")}
                  </td>
                </tr>
              ))}
              {recentRequests.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-neutral-400">
                    No requests yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
