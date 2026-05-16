import { AdminLayout } from "@/components/admin-layout";
import { PageHeader } from "@/components/page-header";
import { Panel } from "@/components/panel";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

const BAAS = [
  { vendor: "Supabase", state: "signed", note: "HIPAA tier enabled · Signed Mar 14, 2026" },
  { vendor: "Stripe", state: "signed", note: "Health-data addendum · Signed Mar 14, 2026" },
  { vendor: "Daily.co", state: "signed", note: "HIPAA plan · Signed Apr 2, 2026" },
  { vendor: "Postmark", state: "signed", note: "Notification only — no PHI in email body" },
  { vendor: "Sentry", state: "pending", note: "Awaiting BAA — block deploy of error reporting until signed" },
];

const DOCS = [
  { doc: "Terms of Service", version: "v1.1", date: "Apr 22, 2026", state: "signed" },
  { doc: "Privacy Policy", version: "v1.1", date: "Apr 22, 2026", state: "signed" },
  { doc: "Notice of Privacy Practices (HIPAA)", version: "v1.0", date: "Apr 22, 2026", state: "signed" },
  { doc: "Care Guide Agreement", version: "v1.2", date: "May 1, 2026", state: "signed" },
];

export default function AdminLegalPage() {
  return (
    <AdminLayout>
      <PageHeader title="Legal & compliance." subtitle="BAAs with all vendors handling PHI, plus policy docs and attorney review status." />

      <Panel title="Business Associate Agreements (BAAs)">
        {BAAS.map((b, i) => (
          <div key={b.vendor} className={`grid grid-cols-[1.2fr_1fr_auto_auto] items-center gap-5 px-7 py-5 ${i < BAAS.length - 1 ? "border-b border-line-soft" : ""}`}>
            <div className="font-medium">{b.vendor}</div>
            <div className="text-[13px] text-ink-soft">{b.note}</div>
            <StatusBadge status={b.state === "signed" ? "completed" : "note-due"}>
              {b.state === "signed" ? "Signed" : "Pending"}
            </StatusBadge>
            <Button variant="ghost" size="sm">View →</Button>
          </div>
        ))}
      </Panel>

      <Panel title="Policy documents">
        {DOCS.map((d, i) => (
          <div key={d.doc} className={`grid grid-cols-[1.5fr_auto_auto_auto_auto] items-center gap-5 px-7 py-5 ${i < DOCS.length - 1 ? "border-b border-line-soft" : ""}`}>
            <div className="font-medium">{d.doc}</div>
            <div className="font-mono text-xs text-ink-faint">{d.version}</div>
            <div className="text-[13px] text-ink-soft">Effective {d.date}</div>
            <StatusBadge status="completed">Attorney reviewed</StatusBadge>
            <Button variant="ghost" size="sm">Edit →</Button>
          </div>
        ))}
      </Panel>

      <div className="card mb-6">
        <h3 className="mb-2 font-serif text-lg font-medium">Compliance reminders</h3>
        <ul className="space-y-1.5 text-sm leading-relaxed text-ink-soft">
          <li>· No PHI in email bodies — emails are notifications only, never include diagnoses, conditions, or details</li>
          <li>· No PHI in Stripe metadata, Sentry logs, or analytics</li>
          <li>· All Supabase tables RLS-enabled with default-deny</li>
          <li>· Annual penetration test scheduled with Practical Assurance (next: Oct 2026)</li>
          <li>· State-by-state expansion requires legal review before launch in any new state</li>
        </ul>
      </div>
    </AdminLayout>
  );
}
