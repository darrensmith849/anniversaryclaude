import { Prisma } from "@prisma/client";
import { getDb } from "./db";

/**
 * Append-only activity log.
 * Phase 2 can extend this to trigger email notifications.
 */
export async function logActivity(params: {
  requestId?: string;
  action: string;
  description?: string;
  actor?: string;
  metadata?: Record<string, unknown>;
}) {
  const db = getDb();
  await db.activityLog.create({
    data: {
      requestId: params.requestId,
      action: params.action,
      description: params.description,
      actor: params.actor ?? "system",
      metadata: params.metadata
        ? (params.metadata as Prisma.InputJsonValue)
        : Prisma.JsonNull,
    },
  });
}
