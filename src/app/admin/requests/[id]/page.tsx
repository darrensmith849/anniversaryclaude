import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { statusLabel } from "@/lib/utils";
import { RequestTabs } from "@/components/admin/RequestTabs";

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();

  const request = await db.anniversaryRequest.findUnique({
    where: { id },
    include: {
      client: true,
      stays: true,
      tasks: true,
      activityLogs: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!request) notFound();

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-ink">
            {request.client.name}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {request.client.email}
            {request.client.phone && ` · ${request.client.phone}`}
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {statusLabel(request.status)}
        </Badge>
      </div>

      <RequestTabs request={request} />
    </>
  );
}
