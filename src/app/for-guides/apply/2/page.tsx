import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { AppProgress } from "@/components/app-progress";

export default function ApplyStep2() {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
        <Logo />
        <Link href="/for-guides" className="text-[13px] text-ink-soft">Save and exit</Link>
      </nav>
      <AppProgress current={2} />

      <div className="mx-auto max-w-[760px] px-14 py-12 pb-20">
        <div className="eyebrow mb-3">Step 2 of 5</div>
        <h1 className="mb-2 font-serif text-display-md font-normal tracking-tight">License information.</h1>
        <p className="mb-9 text-[15px] text-ink-soft">We verify every license through its primary source (Nursys for RN/NP, state medical board, state pharmacy board) before activation. This usually takes 1–2 business days.</p>

        <div className="card grid gap-5 md:grid-cols-2">
          <div><label className="field-label">License number</label><input defaultValue="TX RN #281449" /></div>
          <div><label className="field-label">Issue date</label><input type="date" defaultValue="2008-06-15" /></div>
          <div><label className="field-label">Expiration</label><input type="date" defaultValue="2027-06-30" /></div>
          <div><label className="field-label">Status</label><select><option>Active, unencumbered</option><option>Active with conditions</option></select></div>
          <div className="md:col-span-2">
            <label className="field-label">Certifications (optional)</label>
            <input defaultValue="OCN — Oncology Certified Nurse" />
            <p className="field-hint">e.g. OCN, BCOP, CCRN. Verifiable certifications can support higher rate tiers.</p>
          </div>
          <div className="md:col-span-2">
            <label className="field-label">Malpractice insurance</label>
            <select><option>NSO — Nurses Service Organization</option><option>CM&F Group</option><option>Other (specify)</option><option>I'll obtain coverage before activation</option></select>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-bg-alt p-4 text-[13px] leading-snug text-ink-soft border-l-2 border-teal">
          🛡 We require active, unencumbered licensure and malpractice coverage before your first paid session. We verify both directly with the issuing body.
        </div>

        <div className="mt-7 flex items-center justify-between">
          <Link href="/for-guides/apply" className="text-sm text-ink-soft">← Back</Link>
          <Link href="/for-guides/apply/3"><Button>Continue →</Button></Link>
        </div>
      </div>
    </>
  );
}
