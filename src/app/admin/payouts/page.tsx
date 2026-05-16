import { AdminLayout } from "@/components/admin-layout";
import { PageHeader } from "@/components/page-header";
import { KpiCard, KpiGrid } from "@/components/kpi-card";
import { Panel } from "@/components/panel";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

const PAYOUTS = [
  { id: "P-118", guide: "Sarah Reyes", session: "C-2040 · Patricia M.", amount: "$199.20", state: "ready", label: "Ready Friday" },
  { id: "P-117", guide: "Jennifer Mathers", session: "C-2038 · Janet P.", amount: "$223.20", state: "blocked", label: "Note pending" },
  { id: "P-116", guide: "David Kim", session: "C-2036 · Linda H.", amount: "$319.20", state: "completed", label: "Paid May 13" },
];

export default function AdminPayoutsPage() {
  return (
    <AdminLayout>
      <PageHeader title="Payouts." subtitle="All care guide payouts. Each releases 4 business days after note approval." />
      <KpiGrid>
        <KpiCard label="Ready this week" value="$1,196" trend={{ text: "6 payouts releasing Friday" }} />
        <KpiCard label="Blocked by missing note" value="$447" valueAccent="coral" trend={{ text: "2 notes overdue", tone: "alert" }} />
        <KpiCard label="Paid this month" value="$5,219" trend={{ text: "↑ vs $4,180 last month", tone: "up" }} />
        <KpiCard label="Platform fee MTD" value="$1,305" trend={{ text: "20% of $6,524 GMV" }} />
      </KpiGrid>

      <Panel>
        {PAYOUTS.map((p, i) => (
          <div key={p.id} className={`grid grid-cols-[80px_1fr_160px_120px_140px_120px] items-center gap-4 px-7 py-5 ${i < PAYOUTS.length - 1 ? "border-b border-line-soft" : ""}`}>
            <div className="font-mono text-xs text-ink-faint">{p.id}</div>
            <div>
              <div className="text-[15px] font-medium">{p.guide}</div>
              <div className="text-[13px] text-ink-soft">{p.session}</div>
            </div>
            <div className="font-serif text-lg font-medium">{p.amount}</div>
            <StatusBadge status={p.state === "blocked" ? "note-due" : p.state === "ready" ? "upcoming" : "completed"}>
              {p.label}
            </StatusBadge>
            <div className="text-[13px] text-ink-soft">Stripe Connect</div>
            <Button variant={p.state === "ready" ? "secondary" : "ghost"} size="sm">View →</Button>
          </div>
        ))}
      </Panel>
    </AdminLayout>
  );
}
