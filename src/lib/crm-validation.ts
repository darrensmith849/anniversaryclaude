import { z } from "zod";
import { budgetBands, requestStatuses, stayStatuses, vibeTags } from "@/config/concierge";

export const requestStatusSchema = z.enum(requestStatuses);
export const stayStatusSchema = z.enum(stayStatuses);

const budgetBandIds = budgetBands.map((band) => band.id);
const vibeValues = [...vibeTags];

export const clientSchema = z.object({
  name: z.string().trim().min(2, "Client name is required"),
  email: z.string().trim().toLowerCase().email("Valid email is required"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  timezone: z.string().trim().min(1).default("Africa/Johannesburg"),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  anniversaryDate: z.string().optional().or(z.literal("")),
  preferences: z.string().trim().optional().or(z.literal("")),
  dietaryAllergies: z.string().trim().optional().or(z.literal("")),
});

export const requestSchema = z.object({
  datesFlexible: z.boolean().default(false),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
  budgetBand: z.enum(budgetBandIds as [string, ...string[]]).optional().or(z.literal("")),
  vibeTags: z.array(z.enum(vibeValues as [string, ...string[]])).default([]),
  notes: z.string().trim().optional().or(z.literal("")),
  status: requestStatusSchema.default("NEW"),
});

export const createRequestSchema = z.object({
  client: clientSchema,
  request: requestSchema,
});

export function toNullableDate(value?: string): Date | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function deriveStayNights(checkIn: Date | null, checkOut: Date | null): number | null {
  if (!checkIn || !checkOut) {
    return null;
  }

  const diffMs = checkOut.getTime() - checkIn.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) {
    return null;
  }

  return days;
}

export const staySchema = z.object({
  requestId: z.string().trim().min(1),
  clientId: z.string().trim().optional().or(z.literal("")),
  propertyName: z.string().trim().min(2),
  location: z.string().trim().optional().or(z.literal("")),
  checkIn: z.string().optional().or(z.literal("")),
  checkOut: z.string().optional().or(z.literal("")),
  status: stayStatusSchema.default("DRAFT"),
  costAmount: z.number().nonnegative().optional().nullable(),
  costCurrency: z.string().trim().min(3).max(3).default("ZAR"),
  confirmationNumber: z.string().trim().optional().or(z.literal("")),
  cancellationPolicy: z.string().trim().optional().or(z.literal("")),
  bookingMethod: z.string().trim().optional().or(z.literal("")),
  travellersCount: z.number().int().positive().optional().nullable(),
  roomType: z.string().trim().optional().or(z.literal("")),
  clientPreferences: z.string().trim().optional().or(z.literal("")),
  hostAgency: z.string().trim().optional().or(z.literal("")),
  guestEmail: z.string().trim().email().optional().or(z.literal("")),
  memberId: z.string().trim().optional().or(z.literal("")),
  perksAdded: z.boolean().default(false),
  requestsCheckedAndAdded: z.boolean().default(false),
  addedToRewardsTracker: z.boolean().default(false),
  isVvip: z.boolean().default(false),
  vipFollowUpStatus: z.string().trim().optional().or(z.literal("")),
  checkInStatus: z.string().trim().optional().or(z.literal("")),
  notesForAdmin: z.string().trim().optional().or(z.literal("")),
  customFields: z.record(z.string(), z.string()).optional().nullable(),
});
