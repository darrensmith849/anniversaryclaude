"use server";

import { z } from "zod";
import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const templateSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["PARTNER_OUTREACH", "VIP_PERKS_REQUEST", "FOLLOW_UP", "CUSTOM"]),
  subjectTemplate: z.string().min(1),
  bodyTemplate: z.string().min(1),
  active: z.boolean().default(true),
});

const updateSchema = templateSchema.extend({
  id: z.string().min(1),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user;
}

export async function createTemplate(input: z.infer<typeof templateSchema>) {
  await requireAdmin();
  const parsed = templateSchema.parse(input);
  const db = getDb();

  const template = await db.emailTemplate.create({ data: parsed });
  revalidatePath("/admin/templates");
  return template;
}

export async function updateTemplate(input: z.infer<typeof updateSchema>) {
  await requireAdmin();
  const { id, ...data } = updateSchema.parse(input);
  const db = getDb();

  const template = await db.emailTemplate.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/templates");
  return template;
}

export async function deleteTemplate(id: string) {
  await requireAdmin();
  const db = getDb();
  await db.emailTemplate.delete({ where: { id } });
  revalidatePath("/admin/templates");
  return { ok: true };
}
