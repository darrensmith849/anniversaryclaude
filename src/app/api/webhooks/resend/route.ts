import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDb } from "@/lib/db";

function verifySignature(payload: string, signature: string): boolean {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("resend-signature") || "";

  if (!verifySignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: {
    type: string;
    data: { email_id?: string; error?: { message?: string } };
  };

  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const resendId = event.data?.email_id;
  if (!resendId) {
    return NextResponse.json({ ok: true });
  }

  const db = getDb();

  const emailJob = await db.emailJob.findFirst({
    where: { resendId },
  });

  if (!emailJob) {
    return NextResponse.json({ ok: true });
  }

  const statusMap: Record<string, string | undefined> = {
    "email.delivered": "SENT",
    "email.bounced": "FAILED",
    "email.complained": "FAILED",
  };

  const newStatus = statusMap[event.type];

  if (newStatus) {
    const errorMessage =
      newStatus === "FAILED"
        ? event.data.error?.message || `Email ${event.type}`
        : undefined;

    await db.emailJob.update({
      where: { id: emailJob.id },
      data: {
        status: newStatus as "SENT" | "FAILED",
        ...(errorMessage ? { errorMessage } : {}),
      },
    });

    await db.activityLog.create({
      data: {
        action: `email.webhook.${event.type}`,
        entity: "EmailJob",
        entityId: emailJob.id,
        details: errorMessage || `Resend event: ${event.type}`,
      },
    });
  }

  return NextResponse.json({ ok: true });
}
