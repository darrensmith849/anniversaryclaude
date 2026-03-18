import Link from "next/link";
import { getDb } from "@/lib/db";
import { requestStatuses } from "@/config/concierge";
import { AdminTable, TableBody, TableCell, TableHeadRow, TableHeaderCell, TableRow } from "@/components/admin/admin-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
  const query = searchParams.q?.trim() ?? "";
  const status = searchParams.status?.trim() ?? "";

  const db = getDb();
  const requests = await db.anniversaryRequest.findMany({
    where: {
      ...(status && requestStatuses.includes(status as (typeof requestStatuses)[number]) ? { status: status as (typeof requestStatuses)[number] } : {}),
      ...(query
        ? {
            OR: [
              { client: { name: { contains: query, mode: "insensitive" } } },
              { client: { email: { contains: query, mode: "insensitive" } } },
              { budgetBand: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { client: true, stays: { select: { id: true } } },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Requests</h1>
          <p className="text-muted-foreground">Searchable pipeline for anniversary planning requests.</p>
        </div>
        <Button asChild>
          <Link href="/admin/requests/new">New request</Link>
        </Button>
      </div>

      <form className="grid gap-3 rounded-lg border bg-card p-4 md:grid-cols-[1fr_220px_auto]">
        <Input name="q" placeholder="Search by client name, email, or budget band" defaultValue={query} />
        <select
          name="status"
          defaultValue={status}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">All statuses</option>
          {requestStatuses.map((item) => (
            <option key={item} value={item}>
              {item.replaceAll("_", " ")}
            </option>
          ))}
        </select>
        <Button type="submit" variant="outline">
          Filter
        </Button>
      </form>

      {requests.length === 0 ? (
        <EmptyState
          title="No requests found"
          description="Try a different search or create a new request."
          action={
            <Button asChild size="sm">
              <Link href="/admin/requests/new">Create request</Link>
            </Button>
          }
        />
      ) : (
        <AdminTable>
          <TableHeadRow>
            <tr>
              <TableHeaderCell>Client</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Dates</TableHeaderCell>
              <TableHeaderCell>Budget</TableHeaderCell>
              <TableHeaderCell>Stays</TableHeaderCell>
              <TableHeaderCell className="text-right">Updated</TableHeaderCell>
            </tr>
          </TableHeadRow>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <Link href={`/admin/requests/${request.id}`} className="font-medium hover:underline">
                    {request.client.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{request.client.email}</p>
                </TableCell>
                <TableCell>
                  <StatusBadge status={request.status} />
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{request.startDate ? request.startDate.toISOString().slice(0, 10) : "TBD"}</p>
                    <p className="text-muted-foreground">{request.endDate ? request.endDate.toISOString().slice(0, 10) : "TBD"}</p>
                  </div>
                </TableCell>
                <TableCell>{request.budgetBand ?? "-"}</TableCell>
                <TableCell>{request.stays.length}</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">
                  {request.updatedAt.toISOString().slice(0, 10)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </AdminTable>
      )}
    </div>
  );
}
