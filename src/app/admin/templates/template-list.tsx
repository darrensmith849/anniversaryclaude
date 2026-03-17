"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createTemplate, updateTemplate, deleteTemplate } from "@/lib/email/template-actions";
import { Plus, Pencil, Trash2, X } from "lucide-react";

type Template = {
  id: string;
  name: string;
  type: string;
  subjectTemplate: string;
  bodyTemplate: string;
  active: boolean;
  updatedAt: string;
};

const TYPES = ["PARTNER_OUTREACH", "VIP_PERKS_REQUEST", "FOLLOW_UP", "CUSTOM"] as const;

export function TemplateList({ templates }: { templates: Template[] }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [editing, setEditing] = useState<Template | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const filtered = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subjectTemplate.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "ALL" || t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="ALL">All types</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        <Button
          onClick={() => {
            setCreating(true);
            setEditing(null);
          }}
          size="sm"
        >
          <Plus className="mr-1 h-4 w-4" /> New Template
        </Button>
      </div>

      {/* Editor */}
      {(creating || editing) && (
        <TemplateEditor
          template={editing}
          loading={loading}
          onSave={async (data) => {
            setLoading(true);
            try {
              if (editing) {
                await updateTemplate({ ...data, id: editing.id });
              } else {
                await createTemplate(data);
              }
              setEditing(null);
              setCreating(false);
            } finally {
              setLoading(false);
            }
          }}
          onCancel={() => {
            setEditing(null);
            setCreating(false);
          }}
        />
      )}

      {/* List */}
      <div className="space-y-3">
        {filtered.map((t) => (
          <Card key={t.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-base">{t.name}</CardTitle>
                <CardDescription className="font-mono text-xs">
                  {t.subjectTemplate}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={t.active ? "default" : "secondary"}>
                  {t.active ? "Active" : "Inactive"}
                </Badge>
                <Badge variant="outline">
                  {t.type.replace(/_/g, " ")}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditing(t);
                    setCreating(false);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={async () => {
                    if (confirm("Delete this template?")) {
                      await deleteTemplate(t.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="max-h-32 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">
                {t.bodyTemplate}
              </pre>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">
            No templates found.
          </p>
        )}
      </div>
    </div>
  );
}

function TemplateEditor({
  template,
  loading,
  onSave,
  onCancel,
}: {
  template: Template | null;
  loading: boolean;
  onSave: (data: {
    name: string;
    type: "PARTNER_OUTREACH" | "VIP_PERKS_REQUEST" | "FOLLOW_UP" | "CUSTOM";
    subjectTemplate: string;
    bodyTemplate: string;
    active: boolean;
  }) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(template?.name || "");
  const [type, setType] = useState<string>(template?.type || "CUSTOM");
  const [subject, setSubject] = useState(template?.subjectTemplate || "");
  const [body, setBody] = useState(template?.bodyTemplate || "");
  const [active, setActive] = useState(template?.active ?? true);

  return (
    <Card className="border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base">
          {template ? "Edit Template" : "New Template"}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Type</Label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              Active
            </label>
          </div>
        </div>
        <div className="space-y-1">
          <Label>Subject Template</Label>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
          <p className="text-xs text-muted-foreground">
            Use {"{{variableName}}"} for dynamic content
          </p>
        </div>
        <div className="space-y-1">
          <Label>Body Template</Label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() =>
              onSave({
                name,
                type: type as "PARTNER_OUTREACH" | "VIP_PERKS_REQUEST" | "FOLLOW_UP" | "CUSTOM",
                subjectTemplate: subject,
                bodyTemplate: body,
                active,
              })
            }
            disabled={loading || !name || !subject || !body}
          >
            {loading ? "Saving..." : "Save Template"}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
