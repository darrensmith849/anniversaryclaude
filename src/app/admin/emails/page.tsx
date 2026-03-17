import { getDb } from "@/lib/db";
import { isEmailConfigured } from "@/lib/email/resend";
import { EmailQueue } from "./email-queue";

export default async function EmailsPage() {
  const db = getDb();

  const [emailJobs, templates] = await Promise.all([
    db.emailJob.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        template: { select: { name: true, type: true } },
        client: { select: { name: true } },
        request: { select: { id: true, status: true } },
        stay: { select: { id: true, propertyName: true } },
      },
    }),
    db.emailTemplate.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const emailConfigured = isEmailConfigured();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Queue</h1>
        <p className="text-muted-foreground">
          Manage outbound emails. All sends require explicit approval.
        </p>
        {!emailConfigured && (
          <p className="mt-2 text-sm text-destructive">
            Email sending not configured. Set RESEND_API_KEY and EMAIL_FROM to
            enable sending.
          </p>
        )}
      </div>
      <EmailQueue
        emailJobs={JSON.parse(JSON.stringify(emailJobs))}
        templates={JSON.parse(JSON.stringify(templates))}
        emailConfigured={emailConfigured}
      />
    </div>
  );
}
