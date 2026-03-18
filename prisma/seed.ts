import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const password = process.env.ADMIN_SEED_PASSWORD ?? "change-me";

  const hash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash: hash },
    create: { email, passwordHash: hash },
  });
  console.log(`Admin user seeded: ${email}`);

  // ─── Demo clients ──────────────────────
  const clientA = await prisma.client.upsert({
    where: { email: "clienta@example.com" },
    update: {},
    create: {
      name: "Client A",
      email: "clienta@example.com",
      phone: "+27 00 000 0000",
      city: "Cape Town",
      anniversaryDate: new Date("2026-06-15"),
      dietaryAllergies: "Shellfish allergy",
    },
  });

  const clientB = await prisma.client.upsert({
    where: { email: "clientb@example.com" },
    update: {},
    create: {
      name: "Client B",
      email: "clientb@example.com",
      city: "Johannesburg",
    },
  });

  const clientC = await prisma.client.upsert({
    where: { email: "clientc@example.com" },
    update: {},
    create: {
      name: "Client C",
      email: "clientc@example.com",
      phone: "+27 00 000 0001",
      city: "Durban",
      anniversaryDate: new Date("2026-09-20"),
    },
  });

  // ─── Demo requests (various statuses) ──
  const req1 = await prisma.anniversaryRequest.create({
    data: {
      clientId: clientA.id,
      status: "NEW",
      anniversaryYear: "10th",
      celebrationWindow: "June 2026",
      datesFlexible: true,
      startDate: new Date("2026-06-10"),
      endDate: new Date("2026-06-17"),
      travelRegions: ["Kruger & Lowveld", "Winelands"],
      experienceStyles: ["Safari & Wildlife", "Fine Dining"],
      luxuryTone: "Understated elegance",
      pace: "Relaxed with highlights",
      specialMoments: "Surprise sundowner setup",
      tripLength: "5–7 nights",
      travellerCount: "2",
      departureCity: "Cape Town",
      budgetBand: "BAND_100_200K",
      vibeTags: ["Safari", "Romance", "Fine Dining"],
      notes: "Looking for a once-in-a-lifetime safari anniversary.",
    },
  });

  const req2 = await prisma.anniversaryRequest.create({
    data: {
      clientId: clientB.id,
      status: "REVIEWING",
      anniversaryYear: "5th",
      celebrationWindow: "August 2026",
      datesFlexible: false,
      travelRegions: ["Winelands", "Garden Route"],
      experienceStyles: ["Winelands & Gastronomy", "Coastal & Beach"],
      tripLength: "4 nights",
      travellerCount: "2",
      departureCity: "Johannesburg",
      budgetBand: "BAND_50_100K",
      vibeTags: ["Winelands", "Coastal"],
      notes: "Winelands weekend followed by coastal escape.",
    },
  });

  const req3 = await prisma.anniversaryRequest.create({
    data: {
      clientId: clientC.id,
      status: "PROPOSAL_PENDING",
      anniversaryYear: "25th",
      celebrationWindow: "September 2026",
      datesFlexible: true,
      travelRegions: ["Cape Town & Peninsula"],
      experienceStyles: ["City & Culture", "Romance & Wellness"],
      luxuryTone: "Grand and celebratory",
      pace: "Active",
      tripLength: "3 nights",
      travellerCount: "2 + 4 family members",
      departureCity: "Durban",
      budgetBand: "BAND_200_500K",
      vibeTags: ["City", "Family", "Celebration"],
      notes: "Silver anniversary — want to include adult children.",
    },
  });

  // ─── Demo stays ────────────────────────
  await prisma.stay.create({
    data: {
      requestId: req1.id,
      clientId: clientA.id,
      propertyName: "Featured Safari Lodge",
      location: "Greater Kruger, Limpopo",
      checkIn: new Date("2026-06-10"),
      checkOut: new Date("2026-06-14"),
      status: "DRAFT",
      notes: "Private suite with plunge pool requested.",
    },
  });

  await prisma.stay.create({
    data: {
      requestId: req1.id,
      clientId: clientA.id,
      propertyName: "Winelands Manor House",
      location: "Franschhoek, Western Cape",
      checkIn: new Date("2026-06-14"),
      checkOut: new Date("2026-06-17"),
      status: "PROPOSED",
    },
  });

  await prisma.stay.create({
    data: {
      requestId: req2.id,
      clientId: clientB.id,
      propertyName: "Coastal Boutique Villa",
      location: "Plettenberg Bay",
      status: "DRAFT",
    },
  });

  // ─── Demo partners ────────────────────
  await prisma.partner.createMany({
    data: [
      {
        name: "Featured Safari Lodge",
        category: "LODGE",
        location: "Greater Kruger",
        tags: ["Big Five", "Luxury", "Private"],
        isOfficialPartner: false,
      },
      {
        name: "Cape Winelands Estate",
        category: "HOTEL",
        location: "Stellenbosch",
        tags: ["Wine", "Gastronomy", "Spa"],
        isOfficialPartner: false,
      },
      {
        name: "Ocean Cliff Restaurant",
        category: "RESTAURANT",
        location: "Hermanus",
        tags: ["Seafood", "Fine Dining", "Views"],
        isOfficialPartner: false,
      },
    ],
  });

  // ─── Demo activity logs ────────────────
  await prisma.activityLog.createMany({
    data: [
      {
        requestId: req1.id,
        action: "REQUEST_CREATED",
        description: "New anniversary request submitted via planning brief.",
        actor: "website",
      },
      {
        requestId: req2.id,
        action: "REQUEST_CREATED",
        description: "New anniversary request submitted via planning brief.",
        actor: "website",
      },
      {
        requestId: req2.id,
        action: "STATUS_CHANGED",
        description: "Status changed from New to Reviewing.",
        actor: "admin",
      },
      {
        requestId: req3.id,
        action: "REQUEST_CREATED",
        description: "New anniversary request submitted via planning brief.",
        actor: "website",
      },
      {
        requestId: req3.id,
        action: "STATUS_CHANGED",
        description: "Status changed from New to Proposal Pending.",
        actor: "admin",
      },
    ],
  });

  console.log("Seed data created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
