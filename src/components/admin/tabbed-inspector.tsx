"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type InspectorTab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export function TabbedInspector({ tabs, initialTab }: { tabs: InspectorTab[]; initialTab?: string }) {
  const fallbackTab = useMemo(() => initialTab ?? tabs[0]?.id ?? "", [initialTab, tabs]);
  const [activeTab, setActiveTab] = useState(fallbackTab);

  const current = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 border-b pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm transition-colors",
              tab.id === current?.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{current?.content}</div>
    </div>
  );
}
