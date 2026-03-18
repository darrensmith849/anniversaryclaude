import Link from "next/link";
import { getDb } from "@/lib/db";
import { createStayAction, updateStayAction, updateStayStatusAction } from "@/lib/crm-actions";
import { stayStatuses } from "@/config/concierge";
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

export default async function StaysPage({
  searchParams,
}: {
  searchParams: { q?: string; edit?: string; new?: string };
}) {
  const query = searchParams.q?.trim() ?? "";
  const editId = searchParams.edit?.trim() ?? "";
  const isNewOpen = searchParams.new === "1";

  const db = getDb();
  const [stays, requestOptions] = await Promise.all([
    db.stay.findMany({
      where: query
        ? {
            OR: [
              { propertyName: { contains: query, mode: "insensitive" } },
              { location: { contains: query, mode: "insensitive" } },
              { client: { name: { contains: query, mode: "insensitive" } } },
            ],
          }
        : {},
      include: {
        client: true,
        request: true,
      },
      orderBy: { updatedAt: "desc" },
    }),
    db.anniversaryRequest.findMany({
      include: { client: true },
      orderBy: { updatedAt: "desc" },
      take: 100,
    }),
  ]);

  const selectedStay = editId ? stays.find((stay) => stay.id === editId) ?? null : null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stays</h1>
          <p className="text-muted-foreground">Operational table for bookings, confirmations, and follow-up fields.</p>
        </div>
        <Button asChild>
          <Link href="/admin/stays?new=1">Add stay</Link>
        </Button>
      </div>

      <form className="grid gap-3 rounded-lg border bg-card p-4 md:grid-cols-[1fr_auto]">
        <Input name="q" defaultValue={query} placeholder="Search property, location, or client" />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      {stays.length === 0 ? (
        <EmptyState
          title="No stays found"
          description="Create your first stay record to start operational tracking."
          action={
            <Button asChild size="sm">
              <Link href="/admin/stays?new=1">Add stay</Link>
            </Button>
          }
        />
      ) : (
        <AdminTable>
          <TableHeadRow>
            <tr>
              <TableHeaderCell>Property</TableHeaderCell>
              <TableHeaderCell>Client</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Dates</TableHeaderCell>
              <TableHeaderCell>Nights</TableHeaderCell>
              <TableHeaderCell className="text-right">Actions</TableHeaderCell>
            </tr>
          </TableHeadRow>
          <TableBody>
            {stays.map((stay) => (
              <TableRow key={stay.id}>
                <TableCell>
                  <p className="font-medium">{stay.propertyName}</p>
                  <p className="text-xs text-muted-foreground">{stay.location ?? "Location pending"}</p>
                </TableCell>
                <TableCell>
                  <p>{stay.client.name}</p>
                  <p className="text-xs text-muted-foreground">{stay.client.email}</p>
                </TableCell>
                <TableCell>
                  <form action={updateStayStatusAction} className="flex items-center gap-2">
                    <input type="hidden" name="stayId" value={stay.id} />
                    <select name="status" defaultValue={stay.status} className="h-8 rounded-md border border-input bg-background px-2 text-xs">
                      {stayStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status.replaceAll("_", " ")}
                        </option>
                      ))}
                    </select>
                    <Button type="submit" size="sm" variant="outline" className="h-8 px-2 text-xs">
                      Save
                    </Button>
                  </form>
                </TableCell>
                <TableCell className="text-xs">
                  <p>{dateFieldValue(stay.checkIn) || "TBD"}</p>
                  <p className="text-muted-foreground">{dateFieldValue(stay.checkOut) || "TBD"}</p>
                </TableCell>
                <TableCell>{stay.nights ?? "-"}</TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="outline">
                    <Link href={"/admin/stays?edit=" + stay.id}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </AdminTable>
      )}

      <DetailDrawer
        open={Boolean(selectedStay)}
        closeHref="/admin/stays"
        title={selectedStay ? "Edit stay" : "Edit stay"}
        description={selectedStay ? "Update booking and VIP handling fields." : undefined}
      >
        {selectedStay ? (
          <form action={updateStayAction} className="space-y-4">
            <input type="hidden" name="stayId" value={selectedStay.id} />
            <input type="hidden" name="requestId" value={selectedStay.requestId} />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="propertyName">Property name</Label>
                <Input id="propertyName" name="propertyName" defaultValue={selectedStay.propertyName} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" defaultValue={selectedStay.location ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" defaultValue={selectedStay.status} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  {stayStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="costAmount">Cost amount</Label>
                <Input id="costAmount" name="costAmount" type="number" step="0.01" defaultValue={selectedStay.costAmount?.toString() ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="costCurrency">Currency</Label>
                <Input id="costCurrency" name="costCurrency" defaultValue={selectedStay.costCurrency} maxLength={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="travellersCount">Travellers</Label>
                <Input id="travellersCount" name="travellersCount" type="number" defaultValue={selectedStay.travellersCount ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkIn">Check-in</Label>
                <Input id="checkIn" name="checkIn" type="date" defaultValue={dateFieldValue(selectedStay.checkIn)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOut">Check-out</Label>
                <Input id="checkOut" name="checkOut" type="date" defaultValue={dateFieldValue(selectedStay.checkOut)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmationNumber">Confirmation number</Label>
                <Input id="confirmationNumber" name="confirmationNumber" defaultValue={selectedStay.confirmationNumber ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bookingMethod">Booking method</Label>
                <Input id="bookingMethod" name="bookingMethod" defaultValue={selectedStay.bookingMethod ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomType">Room type</Label>
                <Input id="roomType" name="roomType" defaultValue={selectedStay.roomType ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guestEmail">Guest email</Label>
                <Input id="guestEmail" name="guestEmail" type="email" defaultValue={selectedStay.guestEmail ?? ""} />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="perksAdded" defaultChecked={selectedStay.perksAdded} /> Perks added</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="requestsCheckedAndAdded" defaultChecked={selectedStay.requestsCheckedAndAdded} /> Requests checked</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="addedToRewardsTracker" defaultChecked={selectedStay.addedToRewardsTracker} /> Added to rewards tracker</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isVvip" defaultChecked={selectedStay.isVvip} /> VVIP</label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notesForAdmin">Admin notes</Label>
              <textarea id="notesForAdmin" name="notesForAdmin" rows={4} defaultValue={selectedStay.notesForAdmin ?? ""} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save stay</Button>
            </div>
          </form>
        ) : null}
      </DetailDrawer>

      <DetailDrawer
        open={isNewOpen}
        closeHref="/admin/stays"
        title="Create stay"
        description="Attach a stay to an existing request."
      >
        <form action={createStayAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="requestId">Request</Label>
            <select id="requestId" name="requestId" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" required>
              <option value="">Select request</option>
              {requestOptions.map((request) => (
                <option key={request.id} value={request.id}>
                  {request.client.name} · {request.id.slice(0, 8)}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientId">Client ID</Label>
            <Input id="clientId" name="clientId" placeholder="Paste client id from request" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="propertyName">Property name</Label>
            <Input id="propertyName" name="propertyName" required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="checkIn">Check-in</Label>
              <Input id="checkIn" name="checkIn" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-out</Label>
              <Input id="checkOut" name="checkOut" type="date" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Create stay</Button>
          </div>
        </form>
      </DetailDrawer>
    </div>
  );
}
