import test from "node:test";
import assert from "node:assert/strict";
import { createRequestSchema, deriveStayNights, toNullableDate } from "@/lib/crm-validation";

test("request creation payload validates and normalizes", () => {
  const parsed = createRequestSchema.parse({
    client: {
      name: "Client A",
      email: "GUEST@EXAMPLE.COM",
      phone: "+27 00 000 0000",
      timezone: "Africa/Johannesburg",
      city: "Cape Town",
      anniversaryDate: "2026-10-10",
      preferences: "Window suite",
      dietaryAllergies: "None",
    },
    request: {
      datesFlexible: true,
      startDate: "2026-10-09",
      endDate: "2026-10-12",
      budgetBand: "signature",
      vibeTags: ["Romantic", "Winelands"],
      notes: "Placeholder notes",
      status: "NEW",
    },
  });

  assert.equal(parsed.client.email, "guest@example.com");
  assert.equal(parsed.request.status, "NEW");
  assert.equal(parsed.request.vibeTags.length, 2);
});

test("stay nights derivation returns expected values", () => {
  const checkIn = toNullableDate("2026-11-01");
  const checkOut = toNullableDate("2026-11-04");
  const sameDay = toNullableDate("2026-11-01");

  assert.equal(deriveStayNights(checkIn, checkOut), 3);
  assert.equal(deriveStayNights(checkIn, sameDay), null);
  assert.equal(deriveStayNights(null, checkOut), null);
});
