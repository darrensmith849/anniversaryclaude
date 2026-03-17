import { Badge } from "@/components/ui/badge";

export default function PartnersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Partners</h1>
          <p className="text-muted-foreground">
            Luxury accommodation, dining, and experience partners.
          </p>
        </div>
        <Badge variant="secondary">Phase 2</Badge>
      </div>
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">
          Partner directory coming in Phase 2.
        </p>
      </div>
    </div>
  );
}
