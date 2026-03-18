import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedAdmin(): Promise<void> {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_SEED_PASSWORD must be set to seed admin access.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { hashedPassword },
    create: {
      email,
      hashedPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  });
}

async function seedPlaceholderData(): Promise<void> {
  const client = await prisma.client.upsert({
    where: { email: "guest@example.com" },
    update: {
      name: "Client A",
      phone: "+27 00 000 0000",
      city: "Cape Town",
      timezone: "Africa/Johannesburg",
      preferences: "Placeholder preferences",
      dietaryAllergies: "Placeholder dietary notes",
    },
    create: {
      name: "Client A",
      email: "guest@example.com",
      phone: "+27 00 000 0000",
      city: "Cape Town",
      timezone: "Africa/Johannesburg",
      preferences: "Placeholder preferences",
      dietaryAllergies: "Placeholder dietary notes",
      anniversaryDate: new Date("2026-10-10"),
    },
  });

  await prisma.anniversaryRequest.upsert({
    where: { id: "placeholder-request-phase1" },
    update: {
      status: "NEW",
      budgetBand: "signature",
      vibeTags: ["Romantic", "Winelands"],
    },
    create: {
      id: "placeholder-request-phase1",
      clientId: client.id,
      status: "NEW",
      datesFlexible: true,
      budgetBand: "signature",
      vibeTags: ["Romantic", "Winelands"],
      notes: "Placeholder request",
    },
  });
}

async function main(): Promise<void> {
  await seedAdmin();
  await seedPlaceholderData();
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
