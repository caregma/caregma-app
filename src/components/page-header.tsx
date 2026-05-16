import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("mb-9 flex items-end justify-between gap-6", className)}>
      <div>
        {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
        <h1 className="font-serif text-display-md font-normal">{title}</h1>
        {subtitle && <p className="mt-2 text-[15px] text-ink-soft">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-2.5">{actions}</div>}
    </header>
  );
}
