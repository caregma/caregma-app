import { cn } from "@/lib/utils";

type Status = "default" | "today" | "upcoming" | "note-due" | "pending" | "completed";

interface StatusBadgeProps {
  status: Status;
  children: React.ReactNode;
}

const statusClass: Record<Status, string> = {
  default: "bg-teal-soft text-teal-deep",
  today: "bg-warn-soft text-warn",
  upcoming: "bg-warn-soft text-warn",
  "note-due": "bg-coral-soft text-coral",
  pending: "bg-bg-alt text-ink-soft",
  completed: "bg-teal-soft text-teal-deep",
};

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide",
        statusClass[status]
      )}
    >
      {children}
    </span>
  );
}
