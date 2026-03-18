import Link from "next/link";
import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { statusLabel, budgetLabel, formatDate } from "@/lib/utils";
import { RequestFilters } from "@/components/admin/RequestFilters";

const STATUS_COLORS: Record<string, "default" | "secondary" | "success" | "warning" | "destructive"> = {
  NEW: "warning",
  QUALIFIED: "secondary",
  SHORTLIST_SENT: "secondary",
  OUTREACH_IN_PROGRESS: "secondary",
  OPTIONS_RECEIVED: "secondary",
  DECIDED: "default",
  BOOKED: "success",
  COMPLETE: "success",
  CANCELLED: "destructive",
};

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const db = getDb();

  const where: Record<string, unknown> = {};
  if (status && status !== "ALL") {
    where.status = status;
  }
  if (q) {
    where.client = {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ],
    };
  }

  const requests = await db.anniversaryRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { client: true, _count: { select: { stays: true, tasks: true } } },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-ink">Requests</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {requests.length} request{requests.length !== 1 && "s"}
          </p>
        </div>
      </div>

      <RequestFilters
        currentStatus={status || "ALL"}
        currentQuery={q || ""}
      />

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-left">
              <th className="px-4 py-3 font-medium text-neutral-500">Client</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Status</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Budget</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Vibes</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Created</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Stays</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b border-neutral-50 hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/requests/${r.id}`}
                    className="font-medium text-ink hover:underline"
                  >
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
                  {budgetLabel(r.budgetBand)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {r.vibeTags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
                      >
                        {t}
                      </span>
                    ))}
                    {r.vibeTags.length > 3 && (
                      <span className="text-xs text-neutral-400">
                        +{r.vibeTags.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {formatDate(r.createdAt)}
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {r._count.stays}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-neutral-400">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
