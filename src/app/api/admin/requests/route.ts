import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { statusUpdateSchema } from "@/lib/validations";
import { logActivity } from "@/lib/activity";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: "Request ID required" }, { status: 400 });
    }

    const parsed = statusUpdateSchema.safeParse(rest);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const db = getDb();

    const existing = await db.anniversaryRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const oldStatus = existing.status;
    const updated = await db.anniversaryRequest.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    await logActivity({
      requestId: id,
      action: "STATUS_CHANGED",
      description: `Status changed from ${oldStatus} to ${parsed.data.status}.`,
      actor: session.user.email ?? "admin",
      metadata: { from: oldStatus, to: parsed.data.status },
    });

    return NextResponse.json({ success: true, request: updated });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
