"use server";

import { z } from "zod";
import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { getResend, isEmailConfigured, getEmailFrom } from "./resend";
import { renderTemplate, textToHtml } from "./templates";
import { revalidatePath } from "next/cache";

// ── Schemas ─────────────────────────────────────────────────

const createDraftSchema = z.object({
  templateId: z.string().min(1),
  requestId: z.string().optional(),
  stayId: z.string().optional(),
  clientId: z.string().optional(),
  toAddresses: z.array(z.string().email()).optional(),
  ccAddresses: z.array(z.string().email()).optional(),
  bccAddresses: z.array(z.string().email()).optional(),
});

const idSchema = z.object({
  emailJobId: z.string().min(1),
});

const editDraftSchema = z.object({
  emailJobId: z.string().min(1),
  subject: z.string().min(1),
  bodyHtml: z.string().min(1),
  toAddresses: z.array(z.string().email()).min(1),
  ccAddresses: z.array(z.string().email()).optional(),
  bccAddresses: z.array(z.string().email()).optional(),
});

// ── Helpers ─────────────────────────────────────────────────

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

async function logActivity(
  action: string,
  entityId: string,
  details?: string,
  userId?: string
) {
  const db = getDb();
  await db.activityLog.create({
    data: {
      action,
      entity: "EmailJob",
      entityId,
      details,
      userId,
    },
  });
}

async function gatherTemplateVariables(opts: {
  requestId?: string;
  stayId?: string;
  clientId?: string;
}): Promise<Record<string, string>> {
  const db = getDb();
  const vars: Record<string, string> = {};

  if (opts.clientId) {
    const client = await db.client.findUnique({
      where: { id: opts.clientId },
    });
    if (client) {
      vars.clientName = client.name;
      vars.clientEmail = client.email;
      vars.phone = client.phone || "";
      vars.city = client.city || "";
      vars.dietaryAllergies = client.dietaryAllergies || "";
    }
  }

  if (opts.requestId) {
    const request = await db.anniversaryRequest.findUnique({
      where: { id: opts.requestId },
      include: { client: true },
    });
    if (request) {
      vars.clientName = vars.clientName || request.client.name;
      vars.clientEmail = vars.clientEmail || request.client.email;
      vars.startDate = request.startDate?.toLocaleDateString() || "TBD";
      vars.endDate = request.endDate?.toLocaleDateString() || "TBD";
      vars.budgetBand = request.budgetBand || "TBD";
      vars.vibeTags = request.vibeTags.join(", ") || "Not specified";
      vars.notes = request.notes || "";
    }
  }

  if (opts.stayId) {
    const stay = await db.stay.findUnique({
      where: { id: opts.stayId },
      include: { client: true },
    });
    if (stay) {
      vars.propertyName = stay.propertyName;
      vars.location = stay.location || "";
      vars.checkIn = stay.checkIn?.toLocaleDateString() || "TBD";
      vars.checkOut = stay.checkOut?.toLocaleDateString() || "TBD";
      vars.clientName = vars.clientName || stay.client.name;
    }
  }

  return vars;
}

// ── Actions ─────────────────────────────────────────────────

export async function createDraftFromTemplate(
  input: z.infer<typeof createDraftSchema>
) {
  const user = await requireAdmin();
  const parsed = createDraftSchema.parse(input);
  const db = getDb();

  const template = await db.emailTemplate.findUnique({
    where: { id: parsed.templateId },
  });
  if (!template) throw new Error("Template not found");

  const variables = await gatherTemplateVariables({
    requestId: parsed.requestId,
    stayId: parsed.stayId,
    clientId: parsed.clientId,
  });

  const subjectResult = renderTemplate(template.subjectTemplate, variables);
  const bodyResult = renderTemplate(template.bodyTemplate, variables);

  const allWarnings = [...subjectResult.warnings, ...bodyResult.warnings];

  const emailJob = await db.emailJob.create({
    data: {
      templateId: parsed.templateId,
      status: "DRAFT",
      toAddresses: parsed.toAddresses || [],
      ccAddresses: parsed.ccAddresses || [],
      bccAddresses: parsed.bccAddresses || [],
      subject: subjectResult.rendered,
      bodyHtml: textToHtml(bodyResult.rendered),
      bodyText: bodyResult.rendered,
      requestId: parsed.requestId || null,
      stayId: parsed.stayId || null,
      clientId: parsed.clientId || null,
      metadata: allWarnings.length > 0 ? { warnings: allWarnings } : undefined,
    },
  });

  await logActivity("email.draft.created", emailJob.id, undefined, user.id);
  revalidatePath("/admin/emails");

  return { id: emailJob.id, warnings: allWarnings };
}

export async function updateDraft(input: z.infer<typeof editDraftSchema>) {
  const user = await requireAdmin();
  const parsed = editDraftSchema.parse(input);
  const db = getDb();

  const job = await db.emailJob.findUnique({
    where: { id: parsed.emailJobId },
  });
  if (!job) throw new Error("Email job not found");
  if (job.status !== "DRAFT" && job.status !== "NEEDS_REVIEW") {
    throw new Error("Can only edit drafts or emails needing review");
  }

  await db.emailJob.update({
    where: { id: parsed.emailJobId },
    data: {
      subject: parsed.subject,
      bodyHtml: parsed.bodyHtml,
      bodyText: parsed.bodyHtml.replace(/<[^>]+>/g, ""),
      toAddresses: parsed.toAddresses,
      ccAddresses: parsed.ccAddresses || [],
      bccAddresses: parsed.bccAddresses || [],
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
    },
  });

  await logActivity("email.draft.updated", parsed.emailJobId, undefined, user.id);
  revalidatePath("/admin/emails");

  return { ok: true };
}

export async function submitForReview(input: z.infer<typeof idSchema>) {
  const user = await requireAdmin();
  const { emailJobId } = idSchema.parse(input);
  const db = getDb();

  const job = await db.emailJob.findUnique({ where: { id: emailJobId } });
  if (!job) throw new Error("Email job not found");
  if (job.status !== "DRAFT") {
    throw new Error("Only drafts can be submitted for review");
  }

  await db.emailJob.update({
    where: { id: emailJobId },
    data: { status: "NEEDS_REVIEW" },
  });

  await logActivity(
    "email.submitted_for_review",
    emailJobId,
    undefined,
    user.id
  );
  revalidatePath("/admin/emails");

  return { ok: true };
}

export async function approveEmailJob(input: z.infer<typeof idSchema>) {
  const user = await requireAdmin();
  const { emailJobId } = idSchema.parse(input);
  const db = getDb();

  const job = await db.emailJob.findUnique({ where: { id: emailJobId } });
  if (!job) throw new Error("Email job not found");
  if (job.status !== "NEEDS_REVIEW") {
    throw new Error("Only emails in review can be approved");
  }

  await db.emailJob.update({
    where: { id: emailJobId },
    data: {
      status: "APPROVED",
      approvedBy: user.email || user.id,
      approvedAt: new Date(),
    },
  });

  await logActivity("email.approved", emailJobId, undefined, user.id);
  revalidatePath("/admin/emails");

  return { ok: true };
}

export async function rejectToDraft(input: z.infer<typeof idSchema>) {
  const user = await requireAdmin();
  const { emailJobId } = idSchema.parse(input);
  const db = getDb();

  const job = await db.emailJob.findUnique({ where: { id: emailJobId } });
  if (!job) throw new Error("Email job not found");
  if (job.status !== "NEEDS_REVIEW") {
    throw new Error("Only emails in review can be rejected");
  }

  await db.emailJob.update({
    where: { id: emailJobId },
    data: {
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
    },
  });

  await logActivity("email.rejected_to_draft", emailJobId, undefined, user.id);
  revalidatePath("/admin/emails");

  return { ok: true };
}

export async function sendEmailJob(input: z.infer<typeof idSchema>) {
  const user = await requireAdmin();
  const { emailJobId } = idSchema.parse(input);
  const db = getDb();

  const job = await db.emailJob.findUnique({ where: { id: emailJobId } });
  if (!job) throw new Error("Email job not found");

  // ── HARD GATES ──
  if (job.status !== "APPROVED") {
    throw new Error("Only approved emails can be sent");
  }
  if (!job.approvedAt || !job.approvedBy) {
    throw new Error("Email must be approved before sending");
  }
  if (job.toAddresses.length === 0) {
    throw new Error("At least one recipient is required");
  }
  if (!isEmailConfigured()) {
    throw new Error(
      "Email sending not configured. Set RESEND_API_KEY and EMAIL_FROM."
    );
  }

  const resend = getResend();
  if (!resend) {
    throw new Error("Resend client not available");
  }

  try {
    const { data, error } = await resend.emails.send({
      from: getEmailFrom(),
      to: job.toAddresses,
      cc: job.ccAddresses.length > 0 ? job.ccAddresses : undefined,
      bcc: job.bccAddresses.length > 0 ? job.bccAddresses : undefined,
      subject: job.subject,
      html: job.bodyHtml,
      text: job.bodyText || undefined,
    });

    if (error) {
      await db.emailJob.update({
        where: { id: emailJobId },
        data: { status: "FAILED", errorMessage: error.message },
      });
      await logActivity(
        "email.send.failed",
        emailJobId,
        error.message,
        user.id
      );
      revalidatePath("/admin/emails");
      return { ok: false, error: error.message };
    }

    await db.emailJob.update({
      where: { id: emailJobId },
      data: {
        status: "SENT",
        sentAt: new Date(),
        resendId: data?.id || null,
      },
    });

    await logActivity("email.sent", emailJobId, undefined, user.id);
    revalidatePath("/admin/emails");

    return { ok: true, resendId: data?.id };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error sending email";
    await db.emailJob.update({
      where: { id: emailJobId },
      data: { status: "FAILED", errorMessage: message },
    });
    await logActivity("email.send.failed", emailJobId, message, user.id);
    revalidatePath("/admin/emails");
    return { ok: false, error: message };
  }
}

export async function resetToFailed(input: z.infer<typeof idSchema>) {
  const user = await requireAdmin();
  const { emailJobId } = idSchema.parse(input);
  const db = getDb();

  const job = await db.emailJob.findUnique({ where: { id: emailJobId } });
  if (!job) throw new Error("Email job not found");
  if (job.status !== "FAILED") {
    throw new Error("Only failed emails can be reset to draft");
  }

  await db.emailJob.update({
    where: { id: emailJobId },
    data: {
      status: "DRAFT",
      approvedBy: null,
      approvedAt: null,
      errorMessage: null,
      sentAt: null,
      resendId: null,
    },
  });

  await logActivity("email.reset_to_draft", emailJobId, undefined, user.id);
  revalidatePath("/admin/emails");

  return { ok: true };
}
