import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/panel";
import { StatusBadge } from "@/components/status-badge";
import { getAdvocateById } from "@/lib/backend/data";
import { formatCents } from "@/lib/backend/format";

export default async function ApplicantReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await getAdvocateById(id);
  if (!a) notFound();

  return (
    <AdminLayout>
      <Link href="/admin/guides" className="mb-4 inline-block text-[13px] text-ink-soft">← Care guides</Link>

      <header className="mb-7 flex items-start gap-6">
        <Avatar initials={a.initials} tone="amber" size="xl" />
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <StatusBadge status="pending">Verification pending</StatusBadge>
            <span className="font-mono text-xs text-ink-faint">APP-{a.user_id.slice(-3)}</span>
          </div>
          <h1 className="font-serif text-display-md font-normal tracking-tight">{a.display_name}, {a.credentials_display}</h1>
          <p className="mt-2 text-[15px] text-ink-soft">{a.years_experience} years experience · Texas · Applied 2 days ago</p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="ghost" size="sm">Reject</Button>
          <Button variant="teal" size="sm">Advance to contract →</Button>
        </div>
      </header>

      <Panel title="Verification checklist">
        <div className="px-7 py-6 space-y-3">
          {[
            { check: true, label: "License Nursys lookup", note: `${a.license_number} · Active · Unencumbered · No disciplinary actions` },
            { check: false, label: "Reference call #1", note: "Charge nurse at prior employer — scheduled May 18" },
            { check: false, label: "Reference call #2", note: "Pending" },
            { check: true, label: "Malpractice coverage", note: "NSO certificate on file · Active through 2027-04-30" },
            { check: false, label: "30-min clinical interview", note: "Scheduled for May 17 at 4:00pm" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 text-sm">
              <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${item.check ? "bg-teal text-white" : "border border-line bg-bg-alt text-ink-faint"}`}>
                {item.check ? "✓" : ""}
              </span>
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-[13px] text-ink-soft">{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Application details">
        <div className="grid gap-4 px-7 py-6 md:grid-cols-2">
          <Detail label="Bio">{a.bio}</Detail>
          <Detail label="Specialty">{a.specialty_tags.join(" · ")}</Detail>
          <Detail label="Certifications">{a.certifications.join(", ") || "None"}</Detail>
          <Detail label="Requested rate">{formatCents(a.session_rate_cents)} / 90 min</Detail>
        </div>
      </Panel>
    </AdminLayout>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow mb-1">{label}</div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
