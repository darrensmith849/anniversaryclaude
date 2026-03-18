import Link from "next/link";
import { getDb } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, Building2, CheckSquare, ArrowRight } from "lucide-react";
import { statusLabel, formatDate, STATUS_COLORS } from "@/lib/utils";

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

  const [recentRequests, recentActivity, statusCounts] = await Promise.all([
    db.anniversaryRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { client: true },
    }),
    db.activityLog.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { request: { include: { client: true } } },
    }),
    db.anniversaryRequest.groupBy({
      by: ["status"],
      _count: true,
    }),
  ]);

  return (
    <>
      <h1 className="text-2xl font-serif text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-neutral-500">Concierge operations overview</p>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href}>
              <Card className="hover-lift cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-500">{s.label}</CardTitle>
                  <Icon size={16} className="text-neutral-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{s.value}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Pipeline snapshot */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif text-ink">Pipeline</h2>
            <Link href="/admin/requests" className="text-xs text-neutral-400 hover:text-neutral-600 inline-flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-5 space-y-3">
            {statusCounts.length === 0 ? (
              <p className="text-sm text-neutral-400 text-center py-4">No requests yet</p>
            ) : (
              statusCounts.map((sc) => (
                <div key={sc.status} className="flex items-center justify-between">
                  <Badge variant={STATUS_COLORS[sc.status] ?? "secondary"}>
                    {statusLabel(sc.status)}
                  </Badge>
                  <span className="text-sm font-medium text-neutral-700">{sc._count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <h2 className="text-lg font-serif text-ink">Recent Activity</h2>
          <div className="mt-4 rounded-xl border border-neutral-200 bg-white divide-y divide-neutral-50">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-neutral-400 text-center py-8">No activity yet</p>
            ) : (
              recentActivity.map((log) => (
                <div key={log.id} className="flex items-start gap-3 px-5 py-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
                  <div className="min-w-0">
                    <p className="text-sm text-neutral-700">
                      {log.description ?? log.action.replace(/_/g, " ")}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {log.request?.client?.name ?? "—"} &middot; {log.actor ?? "system"} &middot; {formatDate(log.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent requests table */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif text-ink">Recent Requests</h2>
          <Link href="/admin/requests" className="text-xs text-neutral-400 hover:text-neutral-600 inline-flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>
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
                <tr key={r.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/requests/${r.id}`} className="font-medium text-ink hover:underline">
                      {r.client.name}
                    </Link>
                    <p className="text-xs text-neutral-400">{r.client.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_COLORS[r.status] ?? "secondary"}>
                      {statusLabel(r.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {r.budgetBand?.replace(/_/g, " ") ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{formatDate(r.createdAt)}</td>
                </tr>
              ))}
              {recentRequests.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-neutral-400">No requests yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
