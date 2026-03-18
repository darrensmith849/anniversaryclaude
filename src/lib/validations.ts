import { z } from "zod";

// ─── Plan Wizard Schema (5-step brief) ─────────────

export const planFormSchema = z.object({
  // Step 1: Occasion basics
  anniversaryYear: z.string().optional(),
  celebrationWindow: z.string().optional(),
  datesFlexible: z.boolean(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  travelRegions: z.array(z.string()).min(1, "Select at least one region"),

  // Step 2: Experience style
  experienceStyles: z.array(z.string()).min(1, "Select at least one style"),
  luxuryTone: z.string().optional(),
  pace: z.string().optional(),
  specialMoments: z.string().optional(),

  // Step 3: Trip details
  tripLength: z.string().optional(),
  travellerCount: z.string().optional(),
  departureCity: z.string().optional(),
  budgetBand: z.enum([
    "UNDER_50K",
    "BAND_50_100K",
    "BAND_100_200K",
    "BAND_200_500K",
    "OVER_500K",
  ]),

  // Step 4: Personal touches
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  dietaryAllergies: z.string().optional(),
  accessibility: z.string().optional(),
  preferences: z.string().optional(),
  surprises: z.string().optional(),
  messageToTeam: z.string().optional(),
});

export type PlanFormData = z.infer<typeof planFormSchema>;

// ─── Admin: Stay form ──────────────────────────────

export const stayFormSchema = z.object({
  requestId: z.string().min(1, "Request is required"),
  propertyName: z.string().min(1, "Property name is required"),
  location: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  status: z.enum(["DRAFT", "PROPOSED", "CONFIRMED", "CANCELLED", "COMPLETED"]),
  confirmationRef: z.string().optional(),
  costEstimate: z.string().optional(),
  notes: z.string().optional(),
});

export type StayFormData = z.infer<typeof stayFormSchema>;

// ─── Admin: Status update ──────────────────────────

export const statusUpdateSchema = z.object({
  status: z.enum([
    "NEW",
    "REVIEWING",
    "PROPOSAL_PENDING",
    "AWAITING_CLIENT",
    "CONFIRMED",
    "CLOSED",
    "CANCELLED",
  ]),
});
