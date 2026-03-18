import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { stayFormSchema } from "@/lib/validations";
import { logActivity } from "@/lib/activity";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = stayFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const db = getDb();

    const req = await db.anniversaryRequest.findUnique({
      where: { id: data.requestId },
      select: { clientId: true },
    });
    if (!req) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    const stay = await db.stay.create({
      data: {
        requestId: data.requestId,
        clientId: req.clientId,
        propertyName: data.propertyName,
        location: data.location || undefined,
        checkIn: data.checkIn ? new Date(data.checkIn) : undefined,
        checkOut: data.checkOut ? new Date(data.checkOut) : undefined,
        status: data.status,
        confirmationRef: data.confirmationRef || undefined,
        costEstimate: data.costEstimate || undefined,
        notes: data.notes || undefined,
      },
    });

    await logActivity({
      requestId: data.requestId,
      action: "STAY_CREATED",
      description: `Stay created: ${data.propertyName}`,
      actor: session.user.email ?? "admin",
    });

    return NextResponse.json({ success: true, stay });
  } catch (error) {
    console.error("Stay create error:", error);
    return NextResponse.json({ error: "Failed to create stay" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: "Stay ID required" }, { status: 400 });
    }

    const db = getDb();

    const existing = await db.stay.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Stay not found" }, { status: 404 });
    }

    const stay = await db.stay.update({
      where: { id },
      data: {
        propertyName: rest.propertyName ?? existing.propertyName,
        location: rest.location !== undefined ? rest.location || null : existing.location,
        checkIn: rest.checkIn ? new Date(rest.checkIn) : existing.checkIn,
        checkOut: rest.checkOut ? new Date(rest.checkOut) : existing.checkOut,
        status: rest.status ?? existing.status,
        confirmationRef: rest.confirmationRef !== undefined ? rest.confirmationRef || null : existing.confirmationRef,
        costEstimate: rest.costEstimate !== undefined ? rest.costEstimate || null : existing.costEstimate,
        notes: rest.notes !== undefined ? rest.notes || null : existing.notes,
      },
    });

    await logActivity({
      requestId: existing.requestId,
      action: "STAY_UPDATED",
      description: `Stay updated: ${stay.propertyName}`,
      actor: session.user.email ?? "admin",
    });

    return NextResponse.json({ success: true, stay });
  } catch (error) {
    console.error("Stay update error:", error);
    return NextResponse.json({ error: "Failed to update stay" }, { status: 500 });
  }
}
