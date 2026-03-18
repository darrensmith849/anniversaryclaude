import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { planFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = planFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const db = getDb();

    // Upsert client by email
    const client = await db.client.upsert({
      where: { email: data.email },
      update: {
        name: data.name,
        phone: data.phone || undefined,
        dietaryAllergies: data.dietaryAllergies || undefined,
      },
      create: {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        dietaryAllergies: data.dietaryAllergies || undefined,
      },
    });

    // Create anniversary request
    const anniversaryRequest = await db.anniversaryRequest.create({
      data: {
        clientId: client.id,
        status: "NEW",
        datesFlexible: data.datesFlexible,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        budgetBand: data.budgetBand,
        vibeTags: data.vibeTags,
        notes: [data.mustHaves, data.notes].filter(Boolean).join("\n\n"),
      },
    });

    // Activity log
    await db.activityLog.create({
      data: {
        requestId: anniversaryRequest.id,
        action: "REQUEST_CREATED",
        description: "New anniversary request submitted via planning brief.",
        actor: "website",
      },
    });

    return NextResponse.json({ success: true, requestId: anniversaryRequest.id });
  } catch (error) {
    console.error("Plan submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
