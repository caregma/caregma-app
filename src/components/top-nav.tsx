"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

interface TopNavProps {
  links?: NavLink[];
  rightContent?: React.ReactNode;
}

export function TopNav({ links, rightContent }: TopNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
      <Logo />
      {links && (
        <div className="flex gap-8 text-sm">
          {links.map((link) => {
            const active = pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1.5 transition-colors",
                  active ? "text-ink" : "text-ink-soft hover:text-ink"
                )}
              >
                {link.label}
                {active && (
                  <div className="absolute -bottom-[19px] left-0 right-0 h-0.5 bg-teal" />
                )}
              </Link>
            );
          })}
        </div>
      )}
      <div className="flex items-center gap-5 text-sm">
        {rightContent}
      </div>
    </nav>
  );
}

// Pre-built nav for public marketing pages
export function PublicNav() {
  return (
    <TopNav
      links={[
        { href: "/", label: "For families" },
        { href: "/for-guides", label: "For care guides" },
        { href: "/pricing", label: "Pricing" },
        { href: "/about", label: "About" },
      ]}
      rightContent={
        <>
          <Link href="/login" className="text-ink hover:text-teal">
            Log in
          </Link>
          <Link href="/book">
            <Button size="sm">Book a session</Button>
          </Link>
        </>
      }
    />
  );
}

// Pre-built nav for family logged-in pages
export function FamilyNav() {
  return (
    <TopNav
      links={[
        { href: "/dashboard", label: "Sessions" },
        { href: "/dashboard/care-team", label: "Care team" },
        { href: "/dashboard/documents", label: "Documents" },
        { href: "/dashboard/account", label: "Account" },
      ]}
      rightContent={
        <>
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-bg-alt hover:text-ink">
            <Bell size={18} />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft text-[13px] font-medium text-teal-deep">
            EM
          </div>
        </>
      }
    />
  );
}
