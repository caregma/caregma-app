import Link from "next/link";
import { AdminLayout } from "@/components/admin-layout";
import { PageHeader } from "@/components/page-header";
import { Panel } from "@/components/panel";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { listActiveAdvocates, listPendingApplicants } from "@/lib/backend/data";
import { formatCents } from "@/lib/backend/format";

export default async function AdminGuidesPage() {
  const [advocates, pendingApplicants] = await Promise.all([
    listActiveAdvocates(),
    listPendingApplicants(),
  ]);

  return (
    <AdminLayout>
      <PageHeader title="Care guides." subtitle="Active guides and pending applicants." actions={<Button variant="secondary" size="sm">Export CSV</Button>} />

      <Panel title="Active guides" meta={`${advocates.length} active`}>
        {advocates.map((a, i) => {
          const tones = ["teal", "blue", "coral", "amber", "neutral"] as const;
          return (
            <Link key={a.user_id} href={`/admin/guides/${a.user_id}`} className={`grid grid-cols-[60px_1fr_auto_auto_auto] items-center gap-5 px-7 py-5 hover:bg-bg ${i < advocates.length - 1 ? "border-b border-line-soft" : ""}`}>
              <Avatar initials={a.initials} tone={tones[i % tones.length]} size="md" />
              <div>
                <div className="text-[15px] font-medium">{a.display_name}, {a.credentials_display}</div>
                <div className="text-[13px] text-ink-soft">{a.license_number} · {a.years_experience} yrs · {a.specialty_tags.join(", ")}</div>
              </div>
              <div className="text-right text-[13px]">
                <b className="block text-ink">{formatCents(a.session_rate_cents)}</b>
                <span className="text-ink-soft">90 min</span>
              </div>
              <StatusBadge status="completed">Active</StatusBadge>
              <Button variant="ghost" size="sm">Manage →</Button>
            </Link>
          );
        })}
      </Panel>

      <Panel title="Pending applicants" meta={`${pendingApplicants.length} pending`}>
        {pendingApplicants.map((p, i) => (
          <div key={p.user_id} className={`grid grid-cols-[60px_1fr_auto_auto_auto] items-center gap-5 px-7 py-5 ${i < pendingApplicants.length - 1 ? "border-b border-line-soft" : ""}`}>
            <Avatar initials={p.initials} tone="amber" size="md" />
            <div>
              <div className="text-[15px] font-medium">{p.display_name}, {p.credentials_display}</div>
              <div className="text-[13px] text-ink-soft">{p.license_number} · {p.years_experience} yrs</div>
            </div>
            <div className="text-right text-[13px]">
              <b className="block text-ink">{formatCents(p.session_rate_cents)}</b>
              <span className="text-ink-soft">requested</span>
            </div>
            <StatusBadge status={p.status === "contract_pending" ? "upcoming" : "pending"}>
              {p.status === "contract_pending" ? "Contract pending" : "Verification pending"}
            </StatusBadge>
            <Link href={`/admin/applicants/${p.user_id}/${p.status === "contract_pending" ? "contract" : "review"}`}>
              <Button variant="secondary" size="sm">Review →</Button>
            </Link>
          </div>
        ))}
      </Panel>
    </AdminLayout>
  );
}
