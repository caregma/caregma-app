import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/panel";
import { StatusBadge } from "@/components/status-badge";
import { getAdvocateById } from "@/lib/backend/data";

export default async function ApplicantContractPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await getAdvocateById(id);
  if (!a) notFound();

  return (
    <AdminLayout>
      <Link href="/admin/guides" className="mb-4 inline-block text-[13px] text-ink-soft">← Care guides</Link>

      <header className="mb-7 flex items-start gap-6">
        <Avatar initials={a.initials} tone="teal" size="xl" />
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <StatusBadge status="upcoming">Contract pending</StatusBadge>
          </div>
          <h1 className="font-serif text-display-md font-normal tracking-tight">{a.display_name}, {a.credentials_display}</h1>
          <p className="mt-2 text-[15px] text-ink-soft">Verification complete · Ready to send contract</p>
        </div>
      </header>

      <Panel title="Contract status">
        <div className="px-7 py-6 space-y-3">
          {[
            { check: true, label: "Care Guide Agreement v1.2", note: "Sent via Documenso · May 13" },
            { check: false, label: "Awaiting signature", note: "Reminded May 14 · Will auto-remind May 16" },
            { check: false, label: "Stripe Connect onboarding", note: "Pending after contract signed" },
            { check: false, label: "First booking", note: "After Stripe complete" },
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
        <div className="border-t border-line-soft px-7 py-4 flex justify-end gap-2.5">
          <Button variant="ghost" size="sm">Resend contract</Button>
          <Button variant="secondary" size="sm">View in Documenso →</Button>
        </div>
      </Panel>
    </AdminLayout>
  );
}
