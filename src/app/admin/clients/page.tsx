import Link from "next/link";
import { getDb } from "@/lib/db";
import { updateClientAction } from "@/lib/crm-actions";
import { AdminTable, TableBody, TableCell, TableHeadRow, TableHeaderCell, TableRow } from "@/components/admin/admin-table";
import { DetailDrawer } from "@/components/admin/detail-drawer";
import { EmptyState } from "@/components/admin/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function dateFieldValue(value: Date | null): string {
  if (!value) {
    return "";
  }
  return value.toISOString().slice(0, 10);
}

export default async function ClientsPage({ searchParams }: { searchParams: { q?: string; edit?: string } }) {
  const query = searchParams.q?.trim() ?? "";
  const editId = searchParams.edit?.trim() ?? "";

  const db = getDb();
  const clients = await db.client.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { city: { contains: query, mode: "insensitive" } },
          ],
        }
      : {},
    orderBy: { updatedAt: "desc" },
  });

  const selectedClient = editId ? clients.find((client) => client.id === editId) ?? null : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-muted-foreground">Master client list with direct profile edits.</p>
      </div>

      <form className="grid gap-3 rounded-lg border bg-card p-4 md:grid-cols-[1fr_auto]">
        <Input name="q" defaultValue={query} placeholder="Search name, email, or city" />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      {clients.length === 0 ? (
        <EmptyState title="No clients yet" description="Clients will appear as requests are created." />
      ) : (
        <AdminTable>
          <TableHeadRow>
            <tr>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>City</TableHeaderCell>
              <TableHeaderCell>Timezone</TableHeaderCell>
              <TableHeaderCell className="text-right">Actions</TableHeaderCell>
            </tr>
          </TableHeadRow>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.city ?? "-"}</TableCell>
                <TableCell>{client.timezone}</TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="outline">
                    <Link href={"/admin/clients?edit=" + client.id}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </AdminTable>
      )}

      <DetailDrawer
        open={Boolean(selectedClient)}
        closeHref="/admin/clients"
        title="Edit client"
        description="Update profile and preference fields."
      >
        {selectedClient ? (
          <form action={updateClientAction} className="space-y-4">
            <input type="hidden" name="clientId" value={selectedClient.id} />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={selectedClient.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={selectedClient.email} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" defaultValue={selectedClient.phone ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" defaultValue={selectedClient.city ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" name="timezone" defaultValue={selectedClient.timezone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="anniversaryDate">Anniversary date</Label>
                <Input id="anniversaryDate" name="anniversaryDate" type="date" defaultValue={dateFieldValue(selectedClient.anniversaryDate)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferences">Preferences</Label>
              <textarea id="preferences" name="preferences" rows={3} defaultValue={selectedClient.preferences ?? ""} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dietaryAllergies">Dietary / allergies</Label>
              <Input id="dietaryAllergies" name="dietaryAllergies" defaultValue={selectedClient.dietaryAllergies ?? ""} />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save client</Button>
            </div>
          </form>
        ) : null}
      </DetailDrawer>
    </div>
  );
}
