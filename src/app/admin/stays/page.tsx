import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { statusLabel, formatDate } from "@/lib/utils";
import { StayForm } from "@/components/admin/StayForm";

export default async function StaysPage() {
  const db = getDb();

  const [stays, requests] = await Promise.all([
    db.stay.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: true, request: true },
    }),
    db.anniversaryRequest.findMany({
      select: { id: true, client: { select: { name: true } }, status: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-serif text-ink">Stays</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {stays.length} stay{stays.length !== 1 && "s"} across all requests
          </p>
        </div>
        <StayForm
          requests={requests.map((r) => ({
            id: r.id,
            label: `${r.client.name} — ${r.status}`,
          }))}
        />
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-left">
              <th className="px-4 py-3 font-medium text-neutral-500">Property</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Client</th>
              <th className="px-4 py-3 font-medium text-neutral-500 hidden md:table-cell">Location</th>
              <th className="px-4 py-3 font-medium text-neutral-500 hidden lg:table-cell">Check-in</th>
              <th className="px-4 py-3 font-medium text-neutral-500 hidden lg:table-cell">Check-out</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {stays.map((s) => (
              <tr key={s.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                <td className="px-4 py-3 font-medium">{s.propertyName}</td>
                <td className="px-4 py-3 text-neutral-500">{s.client.name}</td>
                <td className="px-4 py-3 text-neutral-500 hidden md:table-cell">{s.location ?? "—"}</td>
                <td className="px-4 py-3 text-neutral-500 hidden lg:table-cell">{formatDate(s.checkIn)}</td>
                <td className="px-4 py-3 text-neutral-500 hidden lg:table-cell">{formatDate(s.checkOut)}</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">{statusLabel(s.status)}</Badge>
                </td>
              </tr>
            ))}
            {stays.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-neutral-400">No stays yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
