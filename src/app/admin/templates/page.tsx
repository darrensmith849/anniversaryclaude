import { getDb } from "@/lib/db";
import { TemplateList } from "./template-list";

export default async function TemplatesPage() {
  const db = getDb();
  const templates = await db.emailTemplate.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Templates</h1>
        <p className="text-muted-foreground">
          Manage templates used to generate email drafts.
        </p>
      </div>
      <TemplateList templates={JSON.parse(JSON.stringify(templates))} />
    </div>
  );
}
