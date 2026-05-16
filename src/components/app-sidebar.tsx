"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export interface SidebarItem {
  href: string;
  label: string;
  icon: string;
  badge?: { count: number; tone?: "alert" | "muted" };
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

interface AppSidebarProps {
  sections: SidebarSection[];
  user: {
    initials: string;
    name: string;
    role: string;
  };
  accentColor?: "teal" | "coral";
  sectionLabel?: string;
}

export function AppSidebar({
  sections,
  user,
  accentColor = "teal",
  sectionLabel,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="relative flex w-60 flex-col border-r border-[#2A3537] bg-ink pt-7 text-[#C5CCCE]">
      <div className="border-b border-[#2A3537] px-6 pb-7">
        <Logo variant="sidebar" />
      </div>

      {sectionLabel && (
        <div
          className={cn(
            "px-6 pt-6 font-mono text-[10px] tracking-[1.2px] uppercase",
            accentColor === "teal" ? "text-teal-accent" : "text-coral"
          )}
        >
          {sectionLabel}
        </div>
      )}

      <nav className="flex flex-1 flex-col gap-1 px-2 pt-3">
        {sections.map((section, i) => (
          <div key={i} className="mb-3">
            {section.title && (
              <div className="px-4 pt-4 pb-3 font-mono text-[10px] tracking-[1.2px] uppercase text-[#5A6466]">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative mx-2 flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-[#2A3537] text-white"
                      : "text-[#B0B7B9] hover:bg-[#2A3537] hover:text-white"
                  )}
                >
                  {active && (
                    <span className="absolute -left-2 top-2 bottom-2 w-[3px] rounded-sm bg-teal-accent" />
                  )}
                  <span className="text-base">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "ml-auto rounded-full px-2 py-px text-[10px] font-semibold",
                        item.badge.tone === "alert"
                          ? "bg-coral text-white"
                          : "bg-[#3A4547] text-[#B0B7B9]"
                      )}
                    >
                      {item.badge.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-[#2A3537] px-6 py-5">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
            accentColor === "teal"
              ? "bg-teal-accent text-ink"
              : "bg-coral text-white"
          )}
        >
          {user.initials}
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-medium text-white">{user.name}</div>
          <div className={cn(
            "text-[11px]",
            accentColor === "teal" ? "text-[#5A6466]" : "text-teal-accent"
          )}>
            {user.role}
          </div>
        </div>
      </div>
    </aside>
  );
}

// Pre-built sidebar for advocate (clinician) portal
export function AdvocateSidebar() {
  return (
    <AppSidebar
      sectionLabel="Care guide portal"
      accentColor="teal"
      sections={[
        {
          items: [
            { href: "/advocate", label: "Dashboard", icon: "◧" },
            {
              href: "/advocate/cases",
              label: "My cases",
              icon: "◫",
              badge: { count: 4, tone: "muted" },
            },
            {
              href: "/advocate/notes",
              label: "Notes due",
              icon: "✎",
              badge: { count: 2, tone: "alert" },
            },
            { href: "/advocate/schedule", label: "Schedule", icon: "⌚" },
            { href: "/advocate/earnings", label: "Earnings", icon: "$" },
          ],
        },
        {
          title: "Resources",
          items: [
            { href: "/advocate/resources/scope", label: "Scope guide", icon: "?" },
            { href: "/advocate/resources/crisis", label: "Crisis protocols", icon: "↗" },
          ],
        },
      ]}
      user={{ initials: "SR", name: "Sarah Reyes", role: "RN, OCN · Verified" }}
    />
  );
}

// Pre-built sidebar for admin console
export function AdminSidebar() {
  return (
    <AppSidebar
      sectionLabel="Admin console"
      accentColor="coral"
      sections={[
        {
          items: [
            { href: "/admin", label: "Overview", icon: "◧" },
            {
              href: "/admin/matching",
              label: "To match",
              icon: "↔",
              badge: { count: 3, tone: "alert" },
            },
            {
              href: "/admin/notes",
              label: "Notes to review",
              icon: "✎",
              badge: { count: 7, tone: "alert" },
            },
            { href: "/admin/guides", label: "Care guides", icon: "◫" },
            { href: "/admin/payouts", label: "Payouts", icon: "$" },
            { href: "/admin/refunds", label: "Refunds", icon: "⊘" },
          ],
        },
        {
          title: "Settings",
          items: [
            { href: "/admin/platform", label: "Platform", icon: "⚙" },
            { href: "/admin/legal", label: "Legal", icon: "⚖" },
          ],
        },
      ]}
      user={{ initials: "EM", name: "Emma Park", role: "Admin" }}
    />
  );
}
