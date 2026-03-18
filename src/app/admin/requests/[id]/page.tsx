import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { RequestInspector } from "./request-inspector";

export default async function RequestDetailPage({ params }: { params: { id: string } }) {
  const db = getDb();

  const request = await db.anniversaryRequest.findUnique({
    where: { id: params.id },
    include: {
      client: true,
      stays: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!request) {
    notFound();
  }

  const activity = await db.activityLog.findMany({
    where: {
      OR: [
        { entity: "AnniversaryRequest", entityId: request.id },
        { entity: "Client", entityId: request.clientId },
        { entity: "Stay", entityId: { in: request.stays.map((stay) => stay.id) } },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Request Detail</h1>
          <p className="text-muted-foreground">{request.client.name} · {request.client.email}</p>
        </div>
        <Link href="/admin/requests" className="text-sm text-muted-foreground hover:text-foreground">
          Back to requests
        </Link>
      </div>

      <RequestInspector
        request={JSON.parse(JSON.stringify(request))}
        activity={JSON.parse(JSON.stringify(activity))}
      />
    </div>
  );
}
