import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { planFormSchema } from "@/lib/validations";
import { logActivity } from "@/lib/activity";

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
        accessibility: data.accessibility || undefined,
        city: data.departureCity || undefined,
      },
      create: {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        dietaryAllergies: data.dietaryAllergies || undefined,
        accessibility: data.accessibility || undefined,
        city: data.departureCity || undefined,
      },
    });

    // Create anniversary request with full brief
    const anniversaryRequest = await db.anniversaryRequest.create({
      data: {
        clientId: client.id,
        status: "NEW",

        // Occasion
        anniversaryYear: data.anniversaryYear || undefined,
        celebrationWindow: data.celebrationWindow || undefined,
        datesFlexible: data.datesFlexible,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        travelRegions: data.travelRegions,

        // Experience
        experienceStyles: data.experienceStyles,
        luxuryTone: data.luxuryTone || undefined,
        pace: data.pace || undefined,
        specialMoments: data.specialMoments || undefined,

        // Trip
        tripLength: data.tripLength || undefined,
        travellerCount: data.travellerCount || undefined,
        departureCity: data.departureCity || undefined,
        budgetBand: data.budgetBand,

        // Personal
        preferences: data.preferences || undefined,
        surprises: data.surprises || undefined,
        messageToTeam: data.messageToTeam || undefined,

        // Legacy
        vibeTags: data.experienceStyles,
      },
    });

    await logActivity({
      requestId: anniversaryRequest.id,
      action: "REQUEST_CREATED",
      description: "New anniversary request submitted via planning brief.",
      actor: "website",
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
