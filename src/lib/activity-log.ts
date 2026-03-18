import { getDb } from "@/lib/db";

export type ActivityPayload = {
  action: string;
  entity: string;
  entityId: string;
  details?: string;
  userId?: string;
};

export async function createActivityLog(payload: ActivityPayload): Promise<void> {
  const db = getDb();

  await db.activityLog.create({
    data: {
      action: payload.action,
      entity: payload.entity,
      entityId: payload.entityId,
      details: payload.details ?? null,
      userId: payload.userId ?? null,
    },
  });
}
