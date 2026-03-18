"use server";

import { Decimal } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { createActivityLog } from "@/lib/activity-log";
import { getDb } from "@/lib/db";
import {
  createRequestSchema,
  deriveStayNights,
  requestStatusSchema,
  staySchema,
  stayStatusSchema,
  toNullableDate,
} from "@/lib/crm-validation";

async function requireAdminUser(): Promise<{ id: string; email: string | null }> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return {
    id: session.user.id,
    email: session.user.email ?? null,
  };
}

function toBoolean(value: FormDataEntryValue | null): boolean {
  return value === "on" || value === "true";
}

function toNullableNumber(value: FormDataEntryValue | null): number | null {
  if (!value) {
    return null;
  }

  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return null;
  }

  return numeric;
}

function parseCustomFields(raw: string | null): Record<string, string> | null {
  if (!raw || raw.trim().length === 0) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "object" && parsed !== null) {
      return Object.entries(parsed).reduce<Record<string, string>>((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {});
    }
  } catch {
    return null;
  }

  return null;
}

export async function createRequestAction(formData: FormData): Promise<void> {
  const user = await requireAdminUser();

  const payload = createRequestSchema.parse({
    client: {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      timezone: String(formData.get("timezone") ?? "Africa/Johannesburg"),
      city: String(formData.get("city") ?? ""),
      anniversaryDate: String(formData.get("anniversaryDate") ?? ""),
      preferences: String(formData.get("preferences") ?? ""),
      dietaryAllergies: String(formData.get("dietaryAllergies") ?? ""),
    },
    request: {
      datesFlexible: toBoolean(formData.get("datesFlexible")),
      startDate: String(formData.get("startDate") ?? ""),
      endDate: String(formData.get("endDate") ?? ""),
      budgetBand: String(formData.get("budgetBand") ?? ""),
      vibeTags: formData
        .getAll("vibeTags")
        .map((value) => String(value))
        .filter(Boolean),
      notes: String(formData.get("notes") ?? ""),
      status: String(formData.get("status") ?? "NEW"),
    },
  });

  const db = getDb();

  const client = await db.client.upsert({
    where: { email: payload.client.email },
    update: {
      name: payload.client.name,
      phone: payload.client.phone || null,
      timezone: payload.client.timezone,
      city: payload.client.city || null,
      anniversaryDate: toNullableDate(payload.client.anniversaryDate),
      preferences: payload.client.preferences || null,
      dietaryAllergies: payload.client.dietaryAllergies || null,
    },
    create: {
      name: payload.client.name,
      email: payload.client.email,
      phone: payload.client.phone || null,
      timezone: payload.client.timezone,
      city: payload.client.city || null,
      anniversaryDate: toNullableDate(payload.client.anniversaryDate),
      preferences: payload.client.preferences || null,
      dietaryAllergies: payload.client.dietaryAllergies || null,
    },
  });

  const request = await db.anniversaryRequest.create({
    data: {
      clientId: client.id,
      datesFlexible: payload.request.datesFlexible,
      startDate: toNullableDate(payload.request.startDate),
      endDate: toNullableDate(payload.request.endDate),
      budgetBand: payload.request.budgetBand || null,
      vibeTags: payload.request.vibeTags,
      notes: payload.request.notes || null,
      status: requestStatusSchema.parse(payload.request.status),
    },
  });

  await createActivityLog({
    action: "request.created",
    entity: "AnniversaryRequest",
    entityId: request.id,
    details: "Request created",
    userId: user.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/requests");
}

export async function updateRequestAction(formData: FormData): Promise<void> {
  const user = await requireAdminUser();

  const requestId = String(formData.get("requestId") ?? "");
  if (!requestId) {
    throw new Error("Missing request id");
  }

  const status = requestStatusSchema.parse(String(formData.get("status") ?? "NEW"));
  const datesFlexible = toBoolean(formData.get("datesFlexible"));
  const startDate = String(formData.get("startDate") ?? "");
  const endDate = String(formData.get("endDate") ?? "");
  const budgetBand = String(formData.get("budgetBand") ?? "");
  const notes = String(formData.get("notes") ?? "");
  const vibeTags = formData
    .getAll("vibeTags")
    .map((value) => String(value))
    .filter(Boolean);

  const db = getDb();

  await db.anniversaryRequest.update({
    where: { id: requestId },
    data: {
      status,
      datesFlexible,
      startDate: toNullableDate(startDate),
      endDate: toNullableDate(endDate),
      budgetBand: budgetBand || null,
      notes: notes || null,
      vibeTags,
    },
  });

  await createActivityLog({
    action: "request.updated",
    entity: "AnniversaryRequest",
    entityId: requestId,
    details: `Request moved to ${status}`,
    userId: user.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/requests");
  revalidatePath(`/admin/requests/${requestId}`);
}

export async function updateClientAction(formData: FormData): Promise<void> {
  const user = await requireAdminUser();

  const clientId = String(formData.get("clientId") ?? "");
  if (!clientId) {
    throw new Error("Missing client id");
  }

  const db = getDb();

  await db.client.update({
    where: { id: clientId },
    data: {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim().toLowerCase(),
      phone: String(formData.get("phone") ?? "").trim() || null,
      timezone: String(formData.get("timezone") ?? "Africa/Johannesburg").trim(),
      city: String(formData.get("city") ?? "").trim() || null,
      anniversaryDate: toNullableDate(String(formData.get("anniversaryDate") ?? "")),
      preferences: String(formData.get("preferences") ?? "").trim() || null,
      dietaryAllergies: String(formData.get("dietaryAllergies") ?? "").trim() || null,
    },
  });

  await createActivityLog({
    action: "client.updated",
    entity: "Client",
    entityId: clientId,
    details: "Client record updated",
    userId: user.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/requests");
}

export async function createStayAction(formData: FormData): Promise<void> {
  const user = await requireAdminUser();

  const parsed = staySchema.parse({
    requestId: String(formData.get("requestId") ?? ""),
    clientId: String(formData.get("clientId") ?? ""),
    propertyName: String(formData.get("propertyName") ?? ""),
    location: String(formData.get("location") ?? ""),
    checkIn: String(formData.get("checkIn") ?? ""),
    checkOut: String(formData.get("checkOut") ?? ""),
    status: String(formData.get("status") ?? "DRAFT"),
    costAmount: toNullableNumber(formData.get("costAmount")),
    costCurrency: String(formData.get("costCurrency") ?? "ZAR"),
    confirmationNumber: String(formData.get("confirmationNumber") ?? ""),
    cancellationPolicy: String(formData.get("cancellationPolicy") ?? ""),
    bookingMethod: String(formData.get("bookingMethod") ?? ""),
    travellersCount: toNullableNumber(formData.get("travellersCount")),
    roomType: String(formData.get("roomType") ?? ""),
    clientPreferences: String(formData.get("clientPreferences") ?? ""),
    hostAgency: String(formData.get("hostAgency") ?? ""),
    guestEmail: String(formData.get("guestEmail") ?? ""),
    memberId: String(formData.get("memberId") ?? ""),
    perksAdded: toBoolean(formData.get("perksAdded")),
    requestsCheckedAndAdded: toBoolean(formData.get("requestsCheckedAndAdded")),
    addedToRewardsTracker: toBoolean(formData.get("addedToRewardsTracker")),
    isVvip: toBoolean(formData.get("isVvip")),
    vipFollowUpStatus: String(formData.get("vipFollowUpStatus") ?? ""),
    checkInStatus: String(formData.get("checkInStatus") ?? ""),
    notesForAdmin: String(formData.get("notesForAdmin") ?? ""),
    customFields: parseCustomFields(String(formData.get("customFields") ?? "")),
  });

  const checkIn = toNullableDate(parsed.checkIn);
  const checkOut = toNullableDate(parsed.checkOut);

  const db = getDb();
  const request = await db.anniversaryRequest.findUnique({
    where: { id: parsed.requestId },
    select: { clientId: true },
  });

  if (!request) {
    throw new Error("Request not found");
  }

  const clientId = parsed.clientId || request.clientId;

  const stay = await db.stay.create({
    data: {
      requestId: parsed.requestId,
      clientId,
      propertyName: parsed.propertyName,
      location: parsed.location || null,
      checkIn,
      checkOut,
      nights: deriveStayNights(checkIn, checkOut),
      status: parsed.status,
      costAmount: parsed.costAmount === null || parsed.costAmount === undefined ? null : new Decimal(parsed.costAmount),
      costCurrency: parsed.costCurrency,
      confirmationNumber: parsed.confirmationNumber || null,
      cancellationPolicy: parsed.cancellationPolicy || null,
      bookingMethod: parsed.bookingMethod || null,
      travellersCount:
        parsed.travellersCount === null || parsed.travellersCount === undefined
          ? null
          : parsed.travellersCount,
      roomType: parsed.roomType || null,
      clientPreferences: parsed.clientPreferences || null,
      hostAgency: parsed.hostAgency || null,
      guestEmail: parsed.guestEmail || null,
      memberId: parsed.memberId || null,
      perksAdded: parsed.perksAdded,
      requestsCheckedAndAdded: parsed.requestsCheckedAndAdded,
      addedToRewardsTracker: parsed.addedToRewardsTracker,
      isVvip: parsed.isVvip,
      vipFollowUpStatus: parsed.vipFollowUpStatus || null,
      checkInStatus: parsed.checkInStatus || null,
      notesForAdmin: parsed.notesForAdmin || null,
      customFields: parsed.customFields ?? undefined,
    },
  });

  await createActivityLog({
    action: "stay.created",
    entity: "Stay",
    entityId: stay.id,
    details: `Stay created at ${stay.propertyName}`,
    userId: user.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/stays");
  revalidatePath(`/admin/requests/${parsed.requestId}`);
}

export async function updateStayAction(formData: FormData): Promise<void> {
  const user = await requireAdminUser();

  const stayId = String(formData.get("stayId") ?? "");
  if (!stayId) {
    throw new Error("Missing stay id");
  }

  const status = stayStatusSchema.parse(String(formData.get("status") ?? "DRAFT"));
  const checkIn = toNullableDate(String(formData.get("checkIn") ?? ""));
  const checkOut = toNullableDate(String(formData.get("checkOut") ?? ""));
  const requestId = String(formData.get("requestId") ?? "");

  const costAmount = toNullableNumber(formData.get("costAmount"));
  const travellersCount = toNullableNumber(formData.get("travellersCount"));

  const db = getDb();

  const stay = await db.stay.update({
    where: { id: stayId },
    data: {
      propertyName: String(formData.get("propertyName") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim() || null,
      checkIn,
      checkOut,
      nights: deriveStayNights(checkIn, checkOut),
      status,
      costAmount: costAmount === null ? null : new Decimal(costAmount),
      costCurrency: String(formData.get("costCurrency") ?? "ZAR").trim() || "ZAR",
      confirmationNumber: String(formData.get("confirmationNumber") ?? "").trim() || null,
      cancellationPolicy: String(formData.get("cancellationPolicy") ?? "").trim() || null,
      bookingMethod: String(formData.get("bookingMethod") ?? "").trim() || null,
      travellersCount: travellersCount === null ? null : Math.trunc(travellersCount),
      roomType: String(formData.get("roomType") ?? "").trim() || null,
      clientPreferences: String(formData.get("clientPreferences") ?? "").trim() || null,
      hostAgency: String(formData.get("hostAgency") ?? "").trim() || null,
      guestEmail: String(formData.get("guestEmail") ?? "").trim() || null,
      memberId: String(formData.get("memberId") ?? "").trim() || null,
      perksAdded: toBoolean(formData.get("perksAdded")),
      requestsCheckedAndAdded: toBoolean(formData.get("requestsCheckedAndAdded")),
      addedToRewardsTracker: toBoolean(formData.get("addedToRewardsTracker")),
      isVvip: toBoolean(formData.get("isVvip")),
      vipFollowUpStatus: String(formData.get("vipFollowUpStatus") ?? "").trim() || null,
      checkInStatus: String(formData.get("checkInStatus") ?? "").trim() || null,
      notesForAdmin: String(formData.get("notesForAdmin") ?? "").trim() || null,
      customFields:
        parseCustomFields(String(formData.get("customFields") ?? "")) ??
        undefined,
    },
  });

  await createActivityLog({
    action: "stay.updated",
    entity: "Stay",
    entityId: stay.id,
    details: `Stay updated with status ${status}`,
    userId: user.id,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/stays");
  if (requestId) {
    revalidatePath(`/admin/requests/${requestId}`);
  }
}

export async function updateStayStatusAction(formData: FormData): Promise<void> {
  const user = await requireAdminUser();

  const stayId = String(formData.get("stayId") ?? "");
  const status = stayStatusSchema.parse(String(formData.get("status") ?? "DRAFT"));

  const db = getDb();
  const stay = await db.stay.update({
    where: { id: stayId },
    data: { status },
  });

  await createActivityLog({
    action: "stay.status.updated",
    entity: "Stay",
    entityId: stay.id,
    details: `Stay status changed to ${status}`,
    userId: user.id,
  });

  revalidatePath("/admin/stays");
}
