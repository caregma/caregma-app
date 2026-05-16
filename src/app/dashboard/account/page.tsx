import { FamilyNav } from "@/components/top-nav";
import { PageHeader } from "@/components/page-header";
import { Panel } from "@/components/panel";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  return (
    <>
      <FamilyNav />
      <div className="mx-auto max-w-[760px] px-14 py-10 pb-20">
        <PageHeader title="Account." subtitle="Profile, family members on your account, and billing." />

        <Panel title="Your profile">
          <div className="grid gap-4 px-7 py-6 md:grid-cols-2">
            <div><label className="field-label">Full name</label><input defaultValue="Emma M. Park" /></div>
            <div><label className="field-label">Email</label><input defaultValue="emma.park@gmail.com" /></div>
            <div><label className="field-label">Phone</label><input defaultValue="(512) 555-0192" /></div>
            <div><label className="field-label">Time zone</label><select defaultValue="CT"><option>Central Time (CT)</option><option>Eastern Time (ET)</option><option>Pacific Time (PT)</option></select></div>
          </div>
          <div className="flex justify-end gap-2.5 border-t border-line-soft px-7 py-4">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="teal" size="sm">Save</Button>
          </div>
        </Panel>

        <Panel title="People on your account">
          <div className="px-7 py-6">
            <div className="grid grid-cols-[40px_1fr_auto] items-center gap-4 py-3 border-b border-line-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral-soft text-sm font-medium text-coral">PM</div>
              <div>
                <div className="text-sm font-medium">Patricia M. (your mother)</div>
                <div className="text-xs text-ink-soft">Born 1958 · Verbal consent confirmed Apr 22, 2026</div>
              </div>
              <Button variant="ghost" size="sm">Manage</Button>
            </div>
            <Button variant="secondary" size="sm" className="mt-4">+ Add a family member</Button>
          </div>
        </Panel>

        <Panel title="Billing">
          <div className="px-7 py-6">
            <div className="mb-3 text-sm">
              <b>Visa</b> ending in 4242 — expires 04/28
            </div>
            <Button variant="ghost" size="sm">Update card</Button>
          </div>
        </Panel>

        <Panel title="Privacy & data">
          <div className="space-y-3 px-7 py-6 text-sm">
            <Button variant="ghost" size="sm">Download my data</Button>
            <div><Button variant="ghost" size="sm" className="text-coral hover:bg-coral hover:text-white border border-coral">Delete account</Button></div>
          </div>
        </Panel>
      </div>
    </>
  );
}
