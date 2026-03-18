import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { statusLabel, formatDate } from "@/lib/utils";

export default async function StaysPage() {
  const db = getDb();

  const stays = await db.stay.findMany({
    orderBy: { createdAt: "desc" },
    include: { client: true, request: true },
  });

  return (
    <>
      <h1 className="text-2xl font-serif text-ink">Stays</h1>
      <p className="mt-1 text-sm text-neutral-500">
        {stays.length} stay{stays.length !== 1 && "s"} across all requests
      </p>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-left">
              <th className="px-4 py-3 font-medium text-neutral-500">Property</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Client</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Location</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Check-in</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Check-out</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {stays.map((s) => (
              <tr key={s.id} className="border-b border-neutral-50 hover:bg-neutral-50">
                <td className="px-4 py-3 font-medium">{s.propertyName}</td>
                <td className="px-4 py-3 text-neutral-500">{s.client.name}</td>
                <td className="px-4 py-3 text-neutral-500">{s.location ?? "—"}</td>
                <td className="px-4 py-3 text-neutral-500">{formatDate(s.checkIn)}</td>
                <td className="px-4 py-3 text-neutral-500">{formatDate(s.checkOut)}</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">{statusLabel(s.status)}</Badge>
                </td>
              </tr>
            ))}
            {stays.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-neutral-400">
                  No stays yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
