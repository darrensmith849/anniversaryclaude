import { notFound } from "next/navigation";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { statusLabel, STATUS_COLORS } from "@/lib/utils";
import { RequestTabs } from "@/components/admin/RequestTabs";
import { StatusUpdater } from "@/components/admin/StatusUpdater";
import { ChevronLeft } from "lucide-react";

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
      <Link
        href="/admin/requests"
        className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mb-4"
      >
        <ChevronLeft size={14} />
        All Requests
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-serif text-ink">{request.client.name}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {request.client.email}
            {request.client.phone && ` · ${request.client.phone}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={STATUS_COLORS[request.status] ?? "secondary"} className="text-sm">
            {statusLabel(request.status)}
          </Badge>
          <StatusUpdater requestId={request.id} currentStatus={request.status} />
        </div>
      </div>

      <RequestTabs request={request} />
    </>
  );
}
