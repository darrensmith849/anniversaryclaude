import { z } from "zod";

export const planFormSchema = z.object({
  // Step 1 – Vibes
  vibeTags: z.array(z.string()).min(1, "Pick at least one vibe"),

  // Step 2 – Dates
  datesFlexible: z.boolean(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),

  // Step 3 – Budget
  budgetBand: z.enum([
    "UNDER_50K",
    "BAND_50_100K",
    "BAND_100_200K",
    "BAND_200_500K",
    "OVER_500K",
  ]),

  // Step 4 – Contact & extras
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  dietaryAllergies: z.string().optional(),
  mustHaves: z.string().optional(),
  notes: z.string().optional(),
});

export type PlanFormData = z.infer<typeof planFormSchema>;
