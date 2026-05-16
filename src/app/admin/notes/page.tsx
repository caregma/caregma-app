import { AdminLayout } from "@/components/admin-layout";
import { PageHeader } from "@/components/page-header";
import { Panel } from "@/components/panel";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

const NOTES = [
  { id: "C-2045", title: "Robert K. (71) — second opinion", meta: "Sarah Reyes · Submitted 1h ago", flag: "Review" },
  { id: "C-2043", title: "Maria L. (54) — treatment planning", meta: "Sarah Reyes · Submitted 4h ago", flag: "Review" },
  { id: "C-2041", title: "John D. (66) — surveillance", meta: "Jennifer Mathers · Submitted 6h ago", flag: "Review" },
];

export default function AdminNotesPage() {
  return (
    <AdminLayout>
      <PageHeader title="Notes to review." subtitle="Approve a note to release the care guide's payout. Flag anything that looks out of scope." />
      <Panel meta={`${NOTES.length} notes awaiting review`}>
        {NOTES.map((n, i) => (
          <div key={n.id} className={`grid grid-cols-[80px_1fr_auto_auto] items-center gap-5 px-7 py-5 ${i < NOTES.length - 1 ? "border-b border-line-soft" : ""}`}>
            <div className="font-mono text-xs text-ink-faint">{n.id}</div>
            <div>
              <div className="text-[15px] font-medium">{n.title}</div>
              <div className="text-[13px] text-ink-soft">{n.meta}</div>
            </div>
            <StatusBadge status="upcoming">{n.flag}</StatusBadge>
            <Button variant="secondary" size="sm">Open note →</Button>
          </div>
        ))}
      </Panel>
    </AdminLayout>
  );
}
