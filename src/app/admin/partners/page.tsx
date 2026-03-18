import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";

export default async function PartnersPage() {
  const db = getDb();

  const partners = await db.partner.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <>
      <h1 className="text-2xl font-serif text-ink">Partners</h1>
      <p className="mt-1 text-sm text-neutral-500">
        {partners.length} partner{partners.length !== 1 && "s"} — Phase 2 will add full partner management
      </p>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-left">
              <th className="px-4 py-3 font-medium text-neutral-500">Name</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Category</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Location</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Tags</th>
              <th className="px-4 py-3 font-medium text-neutral-500">Official</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.id} className="border-b border-neutral-50 hover:bg-neutral-50">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-neutral-500">{p.category}</td>
                <td className="px-4 py-3 text-neutral-500">{p.location ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {p.isOfficialPartner ? (
                    <Badge variant="success">Yes</Badge>
                  ) : (
                    <span className="text-neutral-400 text-xs">No</span>
                  )}
                </td>
              </tr>
            ))}
            {partners.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-neutral-400">
                  No partners yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
