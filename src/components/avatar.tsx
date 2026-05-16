import { cn } from "@/lib/utils";

type Tone = "teal" | "coral" | "blue" | "amber" | "neutral";

interface AvatarProps {
  initials: string;
  tone?: Tone;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const toneClass: Record<Tone, string> = {
  teal: "bg-teal-soft text-teal-deep",
  coral: "bg-coral-soft text-coral",
  blue: "bg-[#E1ECF5] text-[#1F4E7A]",
  amber: "bg-[#F5E5DE] text-[#7A2E1A]",
  neutral: "bg-bg-alt text-ink-soft",
};

const sizeClass = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-[22px] font-serif font-medium",
};

export function Avatar({
  initials,
  tone = "teal",
  size = "md",
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-medium",
        toneClass[tone],
        sizeClass[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
