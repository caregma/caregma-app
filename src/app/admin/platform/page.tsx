import { AdminLayout } from "@/components/admin-layout";
import { PageHeader } from "@/components/page-header";
import { Panel } from "@/components/panel";
import { Button } from "@/components/ui/button";

const BANDS = [
  { tier: "RN", floor: 129, ceiling: 229, suggested: "149–179" },
  { tier: "RN with cert (OCN, BCOP)", floor: 179, ceiling: 349, suggested: "229–279" },
  { tier: "NP / APRN", floor: 179, ceiling: 349, suggested: "229–279" },
  { tier: "PharmD", floor: 129, ceiling: 279, suggested: "179–229" },
  { tier: "MD attending", floor: 299, ceiling: 599, suggested: "349–449" },
  { tier: "LCSW", floor: 129, ceiling: 249, suggested: "169–199" },
];

export default function AdminPlatformPage() {
  return (
    <AdminLayout>
      <PageHeader title="Platform." subtitle="Rate bands per credential type and marketplace economics." />

      <Panel title="Rate bands" meta="Care guides set their own rate within these bounds">
        <div className="px-7 py-4">
          <div className="grid grid-cols-[1.5fr_repeat(3,_1fr)_auto] gap-4 border-b border-line-soft pb-3 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            <div>Credential</div><div>Floor</div><div>Ceiling</div><div>Suggested</div><div></div>
          </div>
          {BANDS.map((b, i) => (
            <div key={b.tier} className={`grid grid-cols-[1.5fr_repeat(3,_1fr)_auto] items-center gap-4 py-4 text-sm ${i < BANDS.length - 1 ? "border-b border-line-soft" : ""}`}>
              <div className="font-medium">{b.tier}</div>
              <div>${b.floor}</div>
              <div>${b.ceiling}</div>
              <div className="text-ink-soft">${b.suggested}</div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Marketplace economics">
        <div className="space-y-4 px-7 py-6">
          <Setting label="Platform fee" value="20%" desc="Care guides keep 80% of every session" />
          <Setting label="Stripe processing fee" value="2.9% + $0.30" desc="Absorbed by platform, not charged to care guide" />
          <Setting label="Payout delay" value="4 business days" desc="After note approval" />
          <Setting label="Minimum session duration" value="60 minutes" desc="Sessions under 60 min are not bookable" />
        </div>
      </Panel>
    </AdminLayout>
  );
}

function Setting({ label, value, desc }: { label: string; value: string; desc: string }) {
  return (
    <div className="grid grid-cols-[200px_120px_1fr_auto] items-center gap-4 text-sm">
      <div className="font-medium">{label}</div>
      <div className="font-serif text-lg">{value}</div>
      <div className="text-[13px] text-ink-soft">{desc}</div>
      <Button variant="ghost" size="sm">Edit</Button>
    </div>
  );
}
