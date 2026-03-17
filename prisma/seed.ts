import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_SEED_PASSWORD must be set to seed the admin user."
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { hashedPassword },
    create: {
      email,
      hashedPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log(`Admin user seeded: ${email}`);

  // Placeholder client
  await prisma.client.upsert({
    where: { email: "placeholder@example.com" },
    update: {},
    create: {
      name: "Jane & John Doe",
      email: "placeholder@example.com",
      phone: "+27 82 000 0000",
      city: "Cape Town",
      anniversaryDate: new Date("2026-06-15"),
      notes: "Placeholder client for development",
    },
  });

  console.log("Placeholder client seeded.");

  // Placeholder partner
  await prisma.partner.upsert({
    where: { id: "placeholder-partner" },
    update: {},
    create: {
      id: "placeholder-partner",
      name: "The Silo Hotel",
      category: "ACCOMMODATION",
      location: "V&A Waterfront, Cape Town",
      tags: ["luxury", "waterfront", "iconic"],
      isOfficialPartner: true,
    },
  });

  console.log("Placeholder partner seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
