import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: { text: string; tone?: "up" | "alert" | "neutral" };
  valueAccent?: "default" | "coral" | "teal";
  className?: string;
}

export function KpiCard({
  label,
  value,
  trend,
  valueAccent = "default",
  className,
}: KpiCardProps) {
  return (
    <div className={cn("rounded-2xl border border-line-soft bg-white p-6", className)}>
      <div className="eyebrow mb-3">{label}</div>
      <div
        className={cn(
          "font-serif text-[36px] font-medium leading-none tracking-tight",
          valueAccent === "coral" && "text-coral",
          valueAccent === "teal" && "text-teal"
        )}
      >
        {value}
      </div>
      {trend && (
        <div
          className={cn(
            "mt-2 text-xs",
            trend.tone === "up" && "text-teal",
            trend.tone === "alert" && "text-coral",
            (!trend.tone || trend.tone === "neutral") && "text-ink-soft"
          )}
        >
          {trend.text}
        </div>
      )}
    </div>
  );
}

export function KpiGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-4">{children}</div>
  );
}
