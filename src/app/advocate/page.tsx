import Link from "next/link";
import { AdvocateLayout } from "@/components/advocate-layout";
import { PageHeader } from "@/components/page-header";
import { KpiCard, KpiGrid } from "@/components/kpi-card";
import { Panel } from "@/components/panel";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

export default function AdvocateDashboardPage() {
  return (
    <AdvocateLayout>
      <PageHeader
        title="Welcome back, Sarah."
        subtitle="You have 1 session today and 2 notes due. Patricia M.'s session is this afternoon."
      />

      <KpiGrid>
        <KpiCard
          label="Earnings this month"
          value="$1,392"
          trend={{ text: "↑ 7 sessions completed", tone: "up" }}
        />
        <KpiCard
          label="Upcoming sessions"
          value={4}
          trend={{ text: "Next: today 2:00pm" }}
        />
        <KpiCard
          label="Notes due"
          value={2}
          valueAccent="coral"
          trend={{ text: "Required before payout", tone: "alert" }}
        />
        <KpiCard
          label="Family rating"
          value="4.9 / 5"
          trend={{ text: "Across 14 reviews" }}
        />
      </KpiGrid>

      <Panel
        title="Today's sessions"
        actions={
          <Link href="/advocate/cases" className="text-[13px] text-teal">
            View all cases →
          </Link>
        }
      >
        <Link
          href="/advocate/cases/s-2049"
          className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-5 px-7 py-5 transition-colors hover:bg-bg"
        >
          <div className="font-mono text-xs text-ink-faint">C-2049</div>
          <div>
            <div className="mb-0.5 text-[15px] font-medium">
              Patricia M. (67) — new diagnosis consult
            </div>
            <div className="text-[13px] text-ink-soft">
              Booked by Emma M. (daughter) · Breast cancer
            </div>
          </div>
          <div className="min-w-[140px] text-right text-[13px] text-ink-soft">
            <b className="block text-ink">Today · 2:00pm</b>
            90 min · Virtual
          </div>
          <StatusBadge status="upcoming">Session today</StatusBadge>
          <Button variant="teal" size="sm">
            Open case →
          </Button>
        </Link>
      </Panel>

      <Panel
        title="Notes due"
        meta="Payout requires note completion"
      >
        {[
          {
            id: "C-2045",
            name: "Robert K. (71) — second opinion",
            meta: "Session completed May 13 · 22 hours ago",
            amount: "$199 pending",
            href: "/advocate/cases/s-2045",
          },
          {
            id: "C-2043",
            name: "Maria L. (54) — treatment planning",
            meta: "Session completed May 12 · 1 day ago",
            amount: "$249 pending",
            href: "/advocate/cases/s-2043",
          },
        ].map((row, i, arr) => (
          <Link
            key={row.id}
            href={row.href}
            className={`grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-5 px-7 py-5 transition-colors hover:bg-bg ${
              i < arr.length - 1 ? "border-b border-line-soft" : ""
            }`}
          >
            <div className="font-mono text-xs text-ink-faint">{row.id}</div>
            <div>
              <div className="mb-0.5 text-[15px] font-medium">{row.name}</div>
              <div className="text-[13px] text-ink-soft">{row.meta}</div>
            </div>
            <div className="min-w-[140px] text-right text-[13px]">
              <b className="block text-ink">{row.amount}</b>
              Note required
            </div>
            <StatusBadge status="note-due">Note due</StatusBadge>
            <Button variant="secondary" size="sm">
              Write note →
            </Button>
          </Link>
        ))}
      </Panel>
    </AdvocateLayout>
  );
}
