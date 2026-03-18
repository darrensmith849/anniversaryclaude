import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusTone = "neutral" | "good" | "warn" | "danger" | "brand";

const toneClasses: Record<StatusTone, string> = {
  neutral: "bg-muted text-muted-foreground border-transparent",
  good: "bg-emerald-100 text-emerald-800 border-transparent",
  warn: "bg-amber-100 text-amber-800 border-transparent",
  danger: "bg-rose-100 text-rose-800 border-transparent",
  brand: "bg-violet-100 text-violet-800 border-transparent",
};

function statusToTone(status: string): StatusTone {
  switch (status) {
    case "COMPLETE":
    case "COMPLETED":
    case "CONFIRMED":
    case "BOOKED":
      return "good";
    case "FAILED":
    case "CANCELLED":
      return "danger";
    case "OUTREACH_IN_PROGRESS":
    case "OPTIONS_RECEIVED":
    case "SHORTLIST_SENT":
    case "PROPOSED":
      return "brand";
    case "DECIDED":
    case "QUALIFIED":
      return "warn";
    default:
      return "neutral";
  }
}

export function StatusBadge({ status }: { status: string }) {
  const label = status.replaceAll("_", " ");
  const tone = statusToTone(status);

  return (
    <Badge variant="outline" className={cn("font-medium", toneClasses[tone])}>
      {label}
    </Badge>
  );
}
