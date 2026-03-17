"use server";

import { z } from "zod";
import { getDb } from "@/lib/db";

const planSchema = z.object({
  name: z.string().min(2, "Names are required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  anniversaryDate: z.string().optional(),
  city: z.string().optional(),
  vibeTags: z.array(z.string()).min(1, "Pick at least one vibe"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  datesFlexible: z.boolean().default(false),
  budgetBand: z.string().min(1, "Select a budget range"),
  dietaryAllergies: z.string().optional(),
  notes: z.string().optional(),
});

export type PlanInput = z.infer<typeof planSchema>;

export async function submitPlan(input: PlanInput) {
  const parsed = planSchema.parse(input);
  const db = getDb();

  // Upsert client by email
  const client = await db.client.upsert({
    where: { email: parsed.email },
    update: {
      name: parsed.name,
      phone: parsed.phone || null,
      city: parsed.city || null,
      anniversaryDate: parsed.anniversaryDate
        ? new Date(parsed.anniversaryDate)
        : null,
      dietaryAllergies: parsed.dietaryAllergies || null,
    },
    create: {
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone || null,
      city: parsed.city || null,
      anniversaryDate: parsed.anniversaryDate
        ? new Date(parsed.anniversaryDate)
        : null,
      dietaryAllergies: parsed.dietaryAllergies || null,
    },
  });

  // Create anniversary request
  const request = await db.anniversaryRequest.create({
    data: {
      clientId: client.id,
      status: "NEW",
      vibeTags: parsed.vibeTags,
      startDate: parsed.startDate ? new Date(parsed.startDate) : null,
      endDate: parsed.endDate ? new Date(parsed.endDate) : null,
      datesFlexible: parsed.datesFlexible,
      budgetBand: parsed.budgetBand,
      notes: parsed.notes || null,
    },
  });

  // Log activity
  await db.activityLog.create({
    data: {
      action: "plan.submitted",
      entity: "AnniversaryRequest",
      entityId: request.id,
      details: `New plan from ${parsed.name} (${parsed.email})`,
    },
  });

  return { ok: true, requestId: request.id };
}
