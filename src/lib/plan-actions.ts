"use server";

import { z } from "zod";
import { createActivityLog } from "@/lib/activity-log";
import { getDb } from "@/lib/db";
import { toNullableDate } from "@/lib/crm-validation";

const planSchema = z.object({
  name: z.string().trim().min(2, "Names are required"),
  email: z.string().trim().toLowerCase().email("Valid email is required"),
  phone: z.string().trim().optional(),
  anniversaryDate: z.string().optional(),
  city: z.string().trim().optional(),
  vibeTags: z.array(z.string()).min(1, "Pick at least one vibe"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  datesFlexible: z.boolean().default(false),
  budgetBand: z.string().min(1, "Select a budget range"),
  dietaryAllergies: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export type PlanInput = z.infer<typeof planSchema>;

export async function submitPlan(input: PlanInput): Promise<{ ok: true; requestId: string }> {
  const parsed = planSchema.parse(input);
  const db = getDb();

  const client = await db.client.upsert({
    where: { email: parsed.email },
    update: {
      name: parsed.name,
      phone: parsed.phone || null,
      city: parsed.city || null,
      anniversaryDate: toNullableDate(parsed.anniversaryDate),
      dietaryAllergies: parsed.dietaryAllergies || null,
    },
    create: {
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone || null,
      city: parsed.city || null,
      anniversaryDate: toNullableDate(parsed.anniversaryDate),
      dietaryAllergies: parsed.dietaryAllergies || null,
    },
  });

  const request = await db.anniversaryRequest.create({
    data: {
      clientId: client.id,
      status: "NEW",
      vibeTags: parsed.vibeTags,
      startDate: toNullableDate(parsed.startDate),
      endDate: toNullableDate(parsed.endDate),
      datesFlexible: parsed.datesFlexible,
      budgetBand: parsed.budgetBand,
      notes: parsed.notes || null,
    },
  });

  await createActivityLog({
    action: "request.created.from_marketing",
    entity: "AnniversaryRequest",
    entityId: request.id,
    details: "Marketing plan submitted",
  });

  return { ok: true, requestId: request.id };
}
