import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { AppProgress } from "@/components/app-progress";

export default function ApplyStep5() {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
        <Logo />
        <Link href="/for-guides" className="text-[13px] text-ink-soft">Save and exit</Link>
      </nav>
      <AppProgress current={5} />

      <div className="mx-auto max-w-[760px] px-14 py-12 pb-20">
        <div className="eyebrow mb-3">Step 5 of 5</div>
        <h1 className="mb-2 font-serif text-display-md font-normal tracking-tight">Review and submit.</h1>
        <p className="mb-9 text-[15px] text-ink-soft">Check everything below. After you submit, we'll verify your license (1–2 business days) and follow up to schedule a brief 30-minute interview.</p>

        <div className="card mb-4">
          <SummaryRow label="Name" value="Margaret O'Brien" />
          <SummaryRow label="Credential" value="RN, OCN — Texas" />
          <SummaryRow label="License" value="TX RN #281449 · Active" />
          <SummaryRow label="Experience" value="18 years — breast, lung, lymphoma" />
          <SummaryRow label="Rates" value="$229 / 90 min · $179 / 60 min" />
          <SummaryRow label="Malpractice" value="NSO" />
        </div>

        <div className="card">
          <label className="flex items-start gap-3 text-sm leading-relaxed">
            <input type="checkbox" className="mt-1 w-auto" />
            <span>I acknowledge that as a Caregma care guide I will <b>not</b> diagnose, prescribe, or recommend specific treatments. I will provide navigation, education, preparation, and emotional support. I will refer patients back to their treating clinicians for all medical decisions.</span>
          </label>
          <label className="mt-4 flex items-start gap-3 text-sm leading-relaxed">
            <input type="checkbox" className="mt-1 w-auto" />
            <span>I agree to Caregma's <Link href="#" className="underline">Care Guide Agreement</Link> and <Link href="#" className="underline">Code of Conduct</Link>. I understand this is a 1099 contractor relationship.</span>
          </label>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <Link href="/for-guides/apply/4" className="text-sm text-ink-soft">← Back</Link>
          <Link href="/for-guides/apply/done"><Button variant="teal">Submit application →</Button></Link>
        </div>
      </div>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-line-soft py-3 text-sm last:border-0">
      <span className="text-ink-soft">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
