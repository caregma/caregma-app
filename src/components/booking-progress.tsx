import Link from "next/link";
import { cn } from "@/lib/utils";

const STEPS = [
  { num: 1, label: "About" },
  { num: 2, label: "Care moment" },
  { num: 3, label: "Choose guide" },
  { num: 4, label: "Schedule" },
  { num: 5, label: "Format" },
  { num: 6, label: "Confirm" },
];

export function ProgressStrip({
  current,
  backHref,
}: {
  current: number;
  backHref: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
      <div className="flex items-center gap-6 text-[13px]">
        {STEPS.map((step) => {
          const done = step.num < current;
          const active = step.num === current;
          return (
            <div
              key={step.num}
              className={cn(
                "flex items-center gap-2",
                active && "font-medium text-ink",
                done && "text-ink-soft",
                !active && !done && "text-ink-faint"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border text-[10px]",
                  done && "border-teal bg-teal text-white",
                  active && "border-ink bg-ink text-bg",
                  !active && !done && "border-line bg-bg-alt text-ink-faint"
                )}
              >
                {done ? "✓" : step.num}
              </span>
              {step.label}
            </div>
          );
        })}
      </div>
      <Link href={backHref} className="text-[13px] text-ink-soft">
        ← Back
      </Link>
    </div>
  );
}
