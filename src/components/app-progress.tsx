const STEPS = ["About you", "License", "Experience", "Rates", "Review"];

export function AppProgress({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
      <div className="flex items-center gap-6 text-[13px]">
        {STEPS.map((label, i) => {
          const num = i + 1;
          const done = num < current;
          const active = num === current;
          return (
            <div
              key={label}
              className={`flex items-center gap-2 ${active ? "font-medium text-ink" : done ? "text-ink-soft" : "text-ink-faint"}`}
            >
              <span
                className={`inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border text-[10px] ${done ? "border-teal bg-teal text-white" : active ? "border-ink bg-ink text-bg" : "border-line bg-bg-alt text-ink-faint"}`}
              >
                {done ? "✓" : num}
              </span>
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
