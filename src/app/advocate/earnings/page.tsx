import { AdvocateLayout } from "@/components/advocate-layout";
import { PageHeader } from "@/components/page-header";
import { KpiCard, KpiGrid } from "@/components/kpi-card";
import { Panel } from "@/components/panel";
import { StatusBadge } from "@/components/status-badge";

const PAYOUTS = [
  { id: "P-118", date: "May 15", session: "Patricia M. — C-2040", amount: "$199.20", status: "pending" as const, label: "Paid Friday" },
  { id: "P-117", date: "May 14", session: "Janet P. — C-2038", amount: "$199.20", status: "completed" as const, label: "Paid" },
  { id: "P-116", date: "May 12", session: "Linda H. — C-2036", amount: "$199.20", status: "completed" as const, label: "Paid" },
  { id: "P-115", date: "May 9", session: "Maria L. — C-2033", amount: "$199.20", status: "completed" as const, label: "Paid" },
];

export default function EarningsPage() {
  return (
    <AdvocateLayout>
      <PageHeader title="Earnings." subtitle="Payouts to your Stripe Connect account. Each session pays out 4 business days after the note is approved." />
      <KpiGrid>
        <KpiCard label="Lifetime earnings" value="$8,164" trend={{ text: "41 sessions completed" }} />
        <KpiCard label="This month" value="$1,392" trend={{ text: "↑ 7 sessions", tone: "up" }} />
        <KpiCard label="Pending payout" value="$199" valueAccent="coral" trend={{ text: "Releases Friday" }} />
        <KpiCard label="Avg per session" value="$199" trend={{ text: "Your rate: $249" }} />
      </KpiGrid>
      <Panel title="Payout history">
        {PAYOUTS.map((p, i) => (
          <div key={p.id} className={`grid grid-cols-[80px_80px_1fr_120px_120px] items-center gap-5 px-7 py-5 ${i < PAYOUTS.length - 1 ? "border-b border-line-soft" : ""}`}>
            <div className="font-mono text-xs text-ink-faint">{p.id}</div>
            <div className="text-[13px] text-ink-soft">{p.date}</div>
            <div className="text-sm">{p.session}</div>
            <div className="font-serif text-lg font-medium">{p.amount}</div>
            <StatusBadge status={p.status}>{p.label}</StatusBadge>
          </div>
        ))}
      </Panel>
    </AdvocateLayout>
  );
}
