import { cn } from "@/lib/utils";

interface PanelProps {
  title?: string;
  meta?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Panel({ title, meta, actions, children, className }: PanelProps) {
  return (
    <div className={cn("panel", className)}>
      {(title || actions) && (
        <div className="panel-header">
          <div className="flex items-center gap-3">
            {title && <div className="panel-title">{title}</div>}
            {meta && <span className="text-[13px] text-ink-soft">{meta}</span>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
