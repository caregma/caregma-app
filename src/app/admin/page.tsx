import Link from "next/link";
import { AdminLayout } from "@/components/admin-layout";
import { PageHeader } from "@/components/page-header";
import { KpiCard, KpiGrid } from "@/components/kpi-card";
import { Panel } from "@/components/panel";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <PageHeader
        title="Overview."
        subtitle="Friday, May 15 · 3 sessions need matching, 7 notes need review."
      />

      <KpiGrid>
        <KpiCard
          label="MTD revenue"
          value="$3,486"
          trend={{ text: "↑ 14 sessions", tone: "up" }}
        />
        <KpiCard
          label="Sessions this week"
          value={14}
          trend={{ text: "↑ 2 vs last week" }}
        />
        <KpiCard
          label="Active care guides"
          value="3 / 5"
          trend={{ text: "2 in onboarding" }}
        />
        <KpiCard
          label="Avg time-to-match"
          value="4h 12m"
          trend={{ text: "Target: under 6h" }}
        />
      </KpiGrid>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Needs attention"
          actions={
            <Link href="/admin/matching" className="text-[13px] text-teal">
              View all →
            </Link>
          }
        >
          {[
            {
              id: "C-2049",
              href: "/admin/matching",
              name: "Patricia M. (67) — needs matching",
              meta: "Paid 6h ago · Appointment in 3 days",
              status: "urgent",
              cta: "Match →",
            },
            {
              id: "C-2045",
              href: "/admin/notes",
              name: "Robert K. — note needs review",
              meta: "Sarah Reyes submitted · 1h ago",
              status: "review",
              cta: "Review →",
            },
            {
              id: "APP-008",
              href: "/admin/guides",
              name: "New care guide application",
              meta:
                "Margaret O'Brien, RN · 18 yrs · Pending Nursys check",
              status: "new",
              cta: "Review →",
            },
          ].map((row, i, arr) => (
            <Link
              key={row.id}
              href={row.href}
              className={`grid grid-cols-[auto_1fr_auto_auto] items-center gap-5 px-7 py-5 transition-colors hover:bg-bg ${
                i < arr.length - 1 ? "border-b border-line-soft" : ""
              }`}
            >
              <div className="font-mono text-xs text-ink-faint">{row.id}</div>
              <div>
                <div className="mb-0.5 text-[15px] font-medium">{row.name}</div>
                <div className="text-[13px] text-ink-soft">{row.meta}</div>
              </div>
              <StatusBadge
                status={
                  row.status === "urgent"
                    ? "note-due"
                    : row.status === "review"
                      ? "upcoming"
                      : "pending"
                }
              >
                {row.status === "urgent"
                  ? "Urgent"
                  : row.status === "review"
                    ? "Review"
                    : "New"}
              </StatusBadge>
              <Button variant="secondary" size="sm">
                {row.cta}
              </Button>
            </Link>
          ))}
        </Panel>

        <Panel title="Active guides">
          <div className="py-2">
            {[
              { initials: "SR", tone: "teal" as const, name: "Sarah Reyes", meta: "7 sessions this month", rating: "4.9" },
              { initials: "JM", tone: "blue" as const, name: "Jennifer Mathers", meta: "4 sessions this month", rating: "4.7" },
              { initials: "DK", tone: "coral" as const, name: "David Kim", meta: "3 sessions this month", rating: "4.8" },
            ].map((g, i, arr) => (
              <div
                key={g.initials}
                className={`grid grid-cols-[40px_1fr_auto] items-center gap-4 px-6 py-4 ${
                  i < arr.length - 1 ? "border-b border-line-soft" : ""
                }`}
              >
                <Avatar initials={g.initials} tone={g.tone} size="sm" />
                <div>
                  <div className="text-sm font-medium">{g.name}</div>
                  <div className="text-xs text-ink-soft">{g.meta}</div>
                </div>
                <span className="tag tag-teal">★ {g.rating}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AdminLayout>
  );
}
