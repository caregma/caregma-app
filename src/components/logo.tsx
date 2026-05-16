import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  variant?: "default" | "sidebar";
  className?: string;
}

export function Logo({
  href = "/",
  variant = "default",
  className,
}: LogoProps) {
  const isSidebar = variant === "sidebar";

  return (
    <Link href={href} className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex h-[30px] w-[30px] items-center justify-center rounded-full font-serif font-medium italic text-base",
          isSidebar
            ? "bg-teal-accent text-ink"
            : "bg-teal text-bg"
        )}
      >
        C
      </div>
      <div
        className={cn(
          "font-serif text-[22px] font-medium tracking-tight",
          isSidebar ? "text-white" : "text-ink"
        )}
      >
        Caregma
      </div>
    </Link>
  );
}
