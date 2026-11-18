import {
  Archive,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleX,
  Clock,
  Send,
  Truck,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { enumLabel } from "@/lib/types/database";

/**
 * Single source of truth for status -> tone and icon across every module
 * (orders, payments, deliveries, feedback, clients, field reports).
 *
 * Deliberately not a pill: a state is read as a short icon + label in the
 * tone's text color, so meaning never depends on color alone and rows stay
 * quiet. Contrast of every tone text color is >= 4.5:1 on white.
 */

type Tone = "success" | "warning" | "danger" | "info" | "neutral";

const TONE_TEXT: Record<Tone, string> = {
  success: "text-status-success",
  warning: "text-status-warning",
  danger: "text-status-danger",
  info: "text-status-info",
  neutral: "text-status-neutral",
};

const STATUS: Record<string, { tone: Tone; icon: LucideIcon }> = {
  Delivered: { tone: "success", icon: CircleCheck },
  Completed: { tone: "success", icon: CircleCheck },
  Active: { tone: "success", icon: CircleCheck },
  Resolved: { tone: "success", icon: CircleCheck },
  Accepted: { tone: "success", icon: CircleCheck },
  Pending: { tone: "warning", icon: Clock },
  Follow_Up_Required: { tone: "warning", icon: Clock },
  Open: { tone: "warning", icon: Clock },
  Expired: { tone: "warning", icon: Clock },
  Cancelled: { tone: "danger", icon: CircleX },
  Failed: { tone: "danger", icon: CircleX },
  Rejected: { tone: "danger", icon: CircleX },
  Inactive: { tone: "danger", icon: CircleX },
  Returned: { tone: "danger", icon: Undo2 },
  Refunded: { tone: "danger", icon: Undo2 },
  Processing: { tone: "info", icon: CircleDot },
  In_Progress: { tone: "info", icon: CircleDot },
  New: { tone: "info", icon: CircleDot },
  Shipped: { tone: "info", icon: Truck },
  Dispatching: { tone: "info", icon: Truck },
  In_Transit: { tone: "info", icon: Truck },
  Sent: { tone: "info", icon: Send },
  Closed: { tone: "neutral", icon: Archive },
  Draft: { tone: "neutral", icon: CircleDashed },
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const { tone, icon: Icon } = STATUS[status] ?? { tone: "neutral" as const, icon: CircleDashed };
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1.5 text-sm font-medium whitespace-nowrap",
        TONE_TEXT[tone],
        className,
      )}
    >
      <Icon aria-hidden className="size-4" />
      {enumLabel(status)}
    </span>
  );
}
