"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  submitForReview,
  approveEmailJob,
  rejectToDraft,
  sendEmailJob,
  resetToFailed,
  updateDraft,
  createDraftFromTemplate,
} from "@/lib/email/actions";
import {
  X,
  Send,
  CheckCircle,
  ArrowLeft,
  Eye,
  Plus,
  Pencil,
} from "lucide-react";

type EmailJob = {
  id: string;
  status: string;
  subject: string;
  bodyHtml: string;
  bodyText?: string | null;
  toAddresses: string[];
  ccAddresses: string[];
  bccAddresses: string[];
  approvedBy?: string | null;
  approvedAt?: string | null;
  sentAt?: string | null;
  resendId?: string | null;
  errorMessage?: string | null;
  metadata?: Record<string, unknown> | null;
  updatedAt: string;
  template?: { name: string; type: string } | null;
  client?: { name: string } | null;
  request?: { id: string; status: string } | null;
  stay?: { id: string; propertyName: string } | null;
};

type Template = {
  id: string;
  name: string;
  type: string;
};

const STATUSES = ["ALL", "DRAFT", "NEEDS_REVIEW", "APPROVED", "SENT", "FAILED"];

const statusColors: Record<string, string> = {
  DRAFT: "secondary",
  NEEDS_REVIEW: "outline",
  APPROVED: "default",
  SENT: "default",
  FAILED: "destructive",
};

export function EmailQueue({
  emailJobs,
  templates,
  emailConfigured,
}: {
  emailJobs: EmailJob[];
  templates: Template[];
  emailConfigured: boolean;
}) {
  const [tab, setTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<EmailJob | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [pending, startTransition] = useTransition();

  const filtered = emailJobs.filter((e) => {
    const matchesTab = tab === "ALL" || e.status === tab;
    const matchesSearch =
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.toAddresses.some((a) =>
        a.toLowerCase().includes(search.toLowerCase())
      );
    return matchesTab && matchesSearch;
  });

  const counts = STATUSES.reduce(
    (acc, s) => {
      acc[s] =
        s === "ALL"
          ? emailJobs.length
          : emailJobs.filter((e) => e.status === s).length;
      return acc;
    },
    {} as Record<string, number>
  );

  function act(fn: () => Promise<unknown>) {
    startTransition(async () => {
      try {
        await fn();
        setSelected(null);
        setEditMode(false);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : "Action failed");
      }
    });
  }

  return (
    <div className="flex gap-6">
      {/* Main list */}
      <div className="flex-1 space-y-4">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1">
          {STATUSES.map((s) => (
            <Button
              key={s}
              variant={tab === s ? "default" : "outline"}
              size="sm"
              onClick={() => setTab(s)}
            >
              {s.replace(/_/g, " ")}{" "}
              <span className="ml-1 text-xs opacity-70">{counts[s]}</span>
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Search emails..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Button size="sm" onClick={() => setShowCreate(true)}>
            <Plus className="mr-1 h-4 w-4" /> Generate Draft
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-3 py-2 text-left font-medium">Type</th>
                <th className="px-3 py-2 text-left font-medium">Status</th>
                <th className="px-3 py-2 text-left font-medium">To</th>
                <th className="px-3 py-2 text-left font-medium">Subject</th>
                <th className="px-3 py-2 text-left font-medium">Linked</th>
                <th className="px-3 py-2 text-left font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr
                  key={e.id}
                  className="cursor-pointer border-b transition-colors hover:bg-muted/30"
                  onClick={() => {
                    setSelected(e);
                    setEditMode(false);
                  }}
                >
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {e.template?.type?.replace(/_/g, " ") || "Custom"}
                  </td>
                  <td className="px-3 py-2">
                    <Badge
                      variant={
                        (statusColors[e.status] as "default" | "secondary" | "outline" | "destructive") ||
                        "secondary"
                      }
                    >
                      {e.status.replace(/_/g, " ")}
                    </Badge>
                  </td>
                  <td className="max-w-[120px] truncate px-3 py-2 text-xs">
                    {e.toAddresses[0] || "—"}
                  </td>
                  <td className="max-w-[200px] truncate px-3 py-2">
                    {e.subject}
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {e.client?.name ||
                      e.stay?.propertyName ||
                      e.request?.id?.slice(0, 8) ||
                      "—"}
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {new Date(e.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-8 text-center text-muted-foreground"
                  >
                    No emails found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview drawer */}
      {selected && (
        <EmailDrawer
          email={selected}
          editMode={editMode}
          setEditMode={setEditMode}
          emailConfigured={emailConfigured}
          pending={pending}
          onClose={() => {
            setSelected(null);
            setEditMode(false);
          }}
          onAction={act}
        />
      )}

      {/* Create dialog */}
      {showCreate && (
        <CreateDraftDialog
          templates={templates}
          pending={pending}
          onClose={() => setShowCreate(false)}
          onAction={act}
        />
      )}
    </div>
  );
}

// ── Preview / Action Drawer ─────────────────────────────────

function EmailDrawer({
  email,
  editMode,
  setEditMode,
  emailConfigured,
  pending,
  onClose,
  onAction,
}: {
  email: EmailJob;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  emailConfigured: boolean;
  pending: boolean;
  onClose: () => void;
  onAction: (fn: () => Promise<unknown>) => void;
}) {
  const [subject, setSubject] = useState(email.subject);
  const [body, setBody] = useState(email.bodyHtml);
  const [to, setTo] = useState(email.toAddresses.join(", "));

  const canEdit = email.status === "DRAFT" || email.status === "NEEDS_REVIEW";

  return (
    <div className="w-96 shrink-0 space-y-4 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Email Preview</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {editMode && canEdit ? (
        <div className="space-y-3">
          <div className="space-y-1">
            <Label>To (comma-separated)</Label>
            <Input value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label>Body</Label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={pending}
              onClick={() =>
                onAction(() =>
                  updateDraft({
                    emailJobId: email.id,
                    subject,
                    bodyHtml: body,
                    toAddresses: to
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                )
              }
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-muted-foreground">Subject</span>
              <p className="font-medium">{email.subject}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">To</span>
              <div className="flex flex-wrap gap-1">
                {email.toAddresses.map((a) => (
                  <Badge key={a} variant="outline" className="text-xs">
                    {a}
                  </Badge>
                ))}
                {email.toAddresses.length === 0 && (
                  <span className="text-xs text-muted-foreground">
                    No recipients
                  </span>
                )}
              </div>
            </div>
            {email.ccAddresses.length > 0 && (
              <div>
                <span className="text-xs text-muted-foreground">CC</span>
                <div className="flex flex-wrap gap-1">
                  {email.ccAddresses.map((a) => (
                    <Badge key={a} variant="outline" className="text-xs">
                      {a}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="max-h-64 overflow-auto rounded border p-3 text-sm">
            <div dangerouslySetInnerHTML={{ __html: email.bodyHtml }} />
          </div>

          {/* Metadata */}
          <div className="space-y-1 text-xs text-muted-foreground">
            {email.approvedBy && (
              <p>Approved by: {email.approvedBy}</p>
            )}
            {email.sentAt && (
              <p>Sent: {new Date(email.sentAt).toLocaleString()}</p>
            )}
            {email.resendId && <p>Resend ID: {email.resendId}</p>}
            {email.errorMessage && (
              <p className="text-destructive">Error: {email.errorMessage}</p>
            )}
          </div>
        </>
      )}

      {/* Action bar */}
      {!editMode && (
        <div className="flex flex-wrap gap-2 border-t pt-3">
          {email.status === "DRAFT" && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditMode(true)}
              >
                <Pencil className="mr-1 h-3 w-3" /> Edit
              </Button>
              <Button
                size="sm"
                disabled={pending}
                onClick={() =>
                  onAction(() =>
                    submitForReview({ emailJobId: email.id })
                  )
                }
              >
                <Eye className="mr-1 h-3 w-3" /> Submit for Review
              </Button>
            </>
          )}

          {email.status === "NEEDS_REVIEW" && (
            <>
              <Button
                size="sm"
                disabled={pending}
                onClick={() =>
                  onAction(() =>
                    approveEmailJob({ emailJobId: email.id })
                  )
                }
              >
                <CheckCircle className="mr-1 h-3 w-3" /> Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={pending}
                onClick={() =>
                  onAction(() =>
                    rejectToDraft({ emailJobId: email.id })
                  )
                }
              >
                <ArrowLeft className="mr-1 h-3 w-3" /> Reject to Draft
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditMode(true)}
              >
                <Pencil className="mr-1 h-3 w-3" /> Edit
              </Button>
            </>
          )}

          {email.status === "APPROVED" && (
            <>
              <Button
                size="sm"
                disabled={pending || !emailConfigured}
                onClick={() =>
                  onAction(() =>
                    sendEmailJob({ emailJobId: email.id })
                  )
                }
              >
                <Send className="mr-1 h-3 w-3" /> Send Now
              </Button>
              {!emailConfigured && (
                <span className="text-xs text-muted-foreground">
                  Sending disabled — configure RESEND_API_KEY
                </span>
              )}
            </>
          )}

          {email.status === "FAILED" && (
            <Button
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() =>
                onAction(() =>
                  resetToFailed({ emailJobId: email.id })
                )
              }
            >
              <ArrowLeft className="mr-1 h-3 w-3" /> Back to Draft
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Create Draft Dialog ─────────────────────────────────────

function CreateDraftDialog({
  templates,
  pending,
  onClose,
  onAction,
}: {
  templates: Template[];
  pending: boolean;
  onClose: () => void;
  onAction: (fn: () => Promise<unknown>) => void;
}) {
  const [templateId, setTemplateId] = useState(templates[0]?.id || "");
  const [toAddress, setToAddress] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-base">Generate Email Draft</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label>Template</Label>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.type.replace(/_/g, " ")})
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <Label>To (optional)</Label>
            <Input
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="recipient@example.com"
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={pending || !templateId}
              onClick={() =>
                onAction(() =>
                  createDraftFromTemplate({
                    templateId,
                    toAddresses: toAddress
                      ? toAddress
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      : [],
                  })
                )
              }
            >
              Create Draft
            </Button>
            <Button size="sm" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
