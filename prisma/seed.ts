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

  // Default email templates
  const templates = [
    {
      id: "tpl-partner-outreach",
      name: "Partner Outreach",
      type: "PARTNER_OUTREACH" as const,
      subjectTemplate:
        "Anniversary Concierge — Partnership Enquiry for {{clientName}}",
      bodyTemplate: `Dear {{partnerName}},

We are coordinating a bespoke anniversary experience for one of our clients and would love to explore availability at your venue.

Dates: {{startDate}} – {{endDate}}
Guests: {{guestCount}}
Special requirements: {{specialRequirements}}

Could you kindly confirm availability and share your current rates?

Warm regards,
Anniversary Concierge Team`,
    },
    {
      id: "tpl-vip-perks",
      name: "VIP Perks Request",
      type: "VIP_PERKS_REQUEST" as const,
      subjectTemplate:
        "VIP Anniversary Guest — Perks Request for {{clientName}}",
      bodyTemplate: `Dear {{partnerName}},

We have a valued client celebrating their anniversary at your property on {{startDate}}.

We would appreciate any VIP touches you could arrange:
- Room upgrade (if available)
- Welcome amenity or turndown surprise
- Priority dining reservation

Client preferences: {{preferences}}

Thank you for helping us make this celebration truly memorable.

Best regards,
Anniversary Concierge Team`,
    },
    {
      id: "tpl-follow-up",
      name: "Client Follow-Up",
      type: "FOLLOW_UP" as const,
      subjectTemplate: "Your Anniversary Experience — Next Steps",
      bodyTemplate: `Dear {{clientName}},

Thank you for sharing your anniversary plans with us. We are excited to help you create something truly special.

Here is a summary of what we have so far:
- Dates: {{startDate}} – {{endDate}}
- Vibe: {{vibeTags}}
- Budget: {{budgetBand}}

Our concierge team is now curating options for you. We will be in touch within 48 hours with a bespoke proposal.

If you have any questions in the meantime, simply reply to this email.

Warm regards,
Anniversary Concierge Team`,
    },
  ];

  for (const tpl of templates) {
    await prisma.emailTemplate.upsert({
      where: { id: tpl.id },
      update: {
        name: tpl.name,
        subjectTemplate: tpl.subjectTemplate,
        bodyTemplate: tpl.bodyTemplate,
      },
      create: tpl,
    });
  }

  console.log("Email templates seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
