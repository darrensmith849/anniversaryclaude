import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { statusLabel, formatDate } from "@/lib/utils";

export default async function TasksPage() {
  const db = getDb();

  const tasks = await db.task.findMany({
    orderBy: { createdAt: "desc" },
    include: { request: { include: { client: true } } },
  });

  return (
    <>
      <h1 className="text-2xl font-serif text-ink">Tasks</h1>
      <p className="mt-1 text-sm text-neutral-500">
        {tasks.length} task{tasks.length !== 1 && "s"} — Phase 2 will add task creation and assignment
      </p>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-left">
              <th className="px-4 py-3 font-medium text-neutral-500">Title</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Request</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Priority</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Due</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} className="border-b border-neutral-50 hover:bg-neutral-50">
                <td className="px-4 py-3 font-medium">{t.title}</td>
                <td className="px-4 py-3 text-neutral-500">
                  {t.request?.client.name ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={t.priority === "URGENT" ? "destructive" : "secondary"}>
                    {t.priority}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-neutral-500">{formatDate(t.dueAt)}</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">{statusLabel(t.status)}</Badge>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-neutral-400">
                  No tasks yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
