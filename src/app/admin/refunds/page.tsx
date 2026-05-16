import { AdminLayout } from "@/components/admin-layout";
import { PageHeader } from "@/components/page-header";
import { Panel } from "@/components/panel";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

const REFUNDS = [
  { id: "R-014", session: "C-2042 · Tom B.", amount: "$249.00", reason: "Underlying appointment canceled · 3 days notice", state: "auto" },
  { id: "R-013", session: "C-2040 · Patricia M.", amount: "$50.00", reason: "Partial — session ran 75 min instead of 90", state: "manual" },
];

export default function AdminRefundsPage() {
  return (
    <AdminLayout>
      <PageHeader title="Refunds." subtitle="Refund queue and policy. Most are automatic when the underlying appointment is canceled with notice." />

      <div className="card mb-6 border-l-4 border-l-teal">
        <h3 className="mb-2 font-serif text-lg font-medium">Refund policy</h3>
        <ul className="space-y-1 text-sm text-ink-soft">
          <li>· Full refund if cancelled 24h+ before the session</li>
          <li>· Full refund if the underlying medical appointment is canceled (no notice required)</li>
          <li>· 50% refund if cancelled less than 24h before</li>
          <li>· Full refund if a care guide doesn't show up</li>
        </ul>
      </div>

      <Panel meta={`${REFUNDS.length} in queue`}>
        {REFUNDS.map((r, i) => (
          <div key={r.id} className={`grid grid-cols-[80px_1fr_120px_auto_auto] items-center gap-5 px-7 py-5 ${i < REFUNDS.length - 1 ? "border-b border-line-soft" : ""}`}>
            <div className="font-mono text-xs text-ink-faint">{r.id}</div>
            <div>
              <div className="text-[15px] font-medium">{r.session}</div>
              <div className="text-[13px] text-ink-soft">{r.reason}</div>
            </div>
            <div className="font-serif text-lg font-medium">{r.amount}</div>
            <StatusBadge status={r.state === "auto" ? "completed" : "upcoming"}>
              {r.state === "auto" ? "Auto-approved" : "Manual review"}
            </StatusBadge>
            <Button variant={r.state === "auto" ? "ghost" : "teal"} size="sm">{r.state === "auto" ? "View" : "Approve →"}</Button>
          </div>
        ))}
      </Panel>
    </AdminLayout>
  );
}
