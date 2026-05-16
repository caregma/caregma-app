"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface CaseRowProps {
  id?: string;
  name: string;
  meta: string;
  primary?: React.ReactNode;
  status?: React.ReactNode;
  action?: React.ReactNode;
  href?: string;
  leading?: React.ReactNode; // avatar or icon
  className?: string;
  isLast?: boolean;
}

export function CaseRow({
  id,
  name,
  meta,
  primary,
  status,
  action,
  href,
  leading,
  className,
  isLast,
}: CaseRowProps) {
  const content = (
    <div
      className={cn(
        "grid items-center gap-5 px-7 py-5 transition-colors hover:bg-bg",
        !isLast && "border-b border-line-soft",
        href && "cursor-pointer",
        className
      )}
      style={{
        gridTemplateColumns: leading ? "auto auto 1fr auto auto auto" : "auto 1fr auto auto auto",
      }}
    >
      {leading}
      {id && <div className="font-mono text-xs text-ink-faint">{id}</div>}
      <div>
        <div className="mb-0.5 text-[15px] font-medium">{name}</div>
        <div className="text-[13px] text-ink-soft">{meta}</div>
      </div>
      {primary || <div />}
      {status || <div />}
      {action || <div />}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
