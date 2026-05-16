import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/panel";
import { StatusBadge } from "@/components/status-badge";
import { getAdvocateById } from "@/lib/backend/data";
import { formatCents } from "@/lib/backend/format";

export default async function AdminGuideDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await getAdvocateById(id);
  if (!a) notFound();

  return (
    <AdminLayout>
      <Link href="/admin/guides" className="mb-4 inline-block text-[13px] text-ink-soft">← Care guides</Link>

      <header className="mb-7 flex items-start gap-6">
        <Avatar initials={a.initials} size="xl" />
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <StatusBadge status="completed">Active</StatusBadge>
            <span className="font-mono text-xs text-ink-faint">{a.user_id}</span>
          </div>
          <h1 className="font-serif text-display-md font-normal tracking-tight">{a.display_name}, {a.credentials_display}</h1>
          <p className="mt-2 text-[15px] text-ink-soft">{a.license_number} · {a.years_experience} years experience · {a.license_state}</p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="secondary" size="sm">Pause bookings</Button>
          <Button variant="ghost" size="sm">Edit</Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Profile">
          <div className="space-y-4 px-7 py-6">
            <Detail label="Bio">{a.bio}</Detail>
            <Detail label="Specialty tags">{a.specialty_tags.join(" · ")}</Detail>
            <Detail label="Certifications">{a.certifications.length > 0 ? a.certifications.join(", ") : "None on file"}</Detail>
            <Detail label="Nursys verified">{a.nursys_verified_at ? new Date(a.nursys_verified_at).toLocaleDateString() : "Pending"}</Detail>
          </div>
        </Panel>

        <Panel title="Rates & payouts">
          <div className="space-y-4 px-7 py-6">
            <Detail label="Session rate">{formatCents(a.session_rate_cents)}</Detail>
            <Detail label="Takes home (80%)">{formatCents(a.session_rate_cents * 0.8)}</Detail>
            <Detail label="Stripe Connect">acct_1ABC...4242 · Active</Detail>
            <Detail label="Rating">{a.rating ? `${a.rating} / 5 (${a.rating_count} reviews)` : "No reviews yet"}</Detail>
          </div>
        </Panel>
      </div>

      <Panel title="Recent activity">
        <div className="px-7 py-6 text-sm text-ink-soft">No recent activity to display in the prototype.</div>
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
