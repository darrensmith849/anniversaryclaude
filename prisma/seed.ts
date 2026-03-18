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

  // Placeholder clients
  const clientA = await prisma.client.upsert({
    where: { email: "clienta@example.com" },
    update: {},
    create: {
      name: "Client A",
      email: "clienta@example.com",
      phone: "+27 00 000 0000",
      city: "Cape Town",
      anniversaryDate: new Date("2026-06-15"),
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

  // Placeholder requests
  const req1 = await prisma.anniversaryRequest.create({
    data: {
      clientId: clientA.id,
      status: "NEW",
      datesFlexible: true,
      startDate: new Date("2026-06-10"),
      endDate: new Date("2026-06-17"),
      budgetBand: "BAND_100_200K",
      vibeTags: ["Safari", "Romance", "Fine Dining"],
      notes: "Looking for a once-in-a-lifetime safari anniversary.",
    },
  });

  const req2 = await prisma.anniversaryRequest.create({
    data: {
      clientId: clientB.id,
      status: "QUALIFIED",
      datesFlexible: false,
      budgetBand: "BAND_50_100K",
      vibeTags: ["Winelands", "Coastal"],
      notes: "Winelands weekend followed by coastal escape.",
    },
  });

  // Placeholder stays
  await prisma.stay.create({
    data: {
      requestId: req1.id,
      clientId: clientA.id,
      propertyName: "Luxury Safari Lodge",
      location: "Kruger National Park",
      checkIn: new Date("2026-06-10"),
      checkOut: new Date("2026-06-14"),
      status: "DRAFT",
    },
  });

  await prisma.stay.create({
    data: {
      requestId: req2.id,
      clientId: clientB.id,
      propertyName: "Winelands Estate",
      location: "Stellenbosch",
      status: "PROPOSED",
    },
  });

  // Placeholder partner
  await prisma.partner.create({
    data: {
      name: "Sample Safari Lodge",
      category: "LODGE",
      location: "Greater Kruger",
      tags: ["Big Five", "Luxury"],
      isOfficialPartner: true,
    },
  });

  // Activity log
  await prisma.activityLog.create({
    data: {
      requestId: req1.id,
      action: "REQUEST_CREATED",
      description: "New anniversary request submitted.",
      actor: "system",
    },
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
