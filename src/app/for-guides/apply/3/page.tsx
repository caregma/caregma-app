import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { AppProgress } from "@/components/app-progress";

export default function ApplyStep3() {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
        <Logo />
        <Link href="/for-guides" className="text-[13px] text-ink-soft">Save and exit</Link>
      </nav>
      <AppProgress current={3} />

      <div className="mx-auto max-w-[760px] px-14 py-12 pb-20">
        <div className="eyebrow mb-3">Step 3 of 5</div>
        <h1 className="mb-2 font-serif text-display-md font-normal tracking-tight">Your experience.</h1>
        <p className="mb-9 text-[15px] text-ink-soft">Families want to know who you are. Be specific — this is what shows on your profile.</p>

        <div className="card space-y-5">
          <div><label className="field-label">Years of clinical experience</label><input defaultValue="18" /></div>
          <div>
            <label className="field-label">Specialty areas (pick up to 3)</label>
            <select multiple defaultValue={["breast", "lung", "lymphoma"]} className="min-h-[120px]">
              <option value="breast">Breast cancer</option>
              <option value="lung">Lung cancer</option>
              <option value="colorectal">Colorectal cancer</option>
              <option value="prostate">Prostate cancer</option>
              <option value="lymphoma">Lymphoma / leukemia</option>
              <option value="gyn">Gynecologic cancers</option>
            </select>
          </div>
          <div>
            <label className="field-label">Short bio (visible to families)</label>
            <textarea className="min-h-[140px]" defaultValue="After 18 years on inpatient oncology, I want to give families more than the 7 minutes we have at bedside. I take pride in slowing down and meeting people where they are." />
            <p className="field-hint">Write in first person. Keep it warm and concrete. 2–4 sentences works well.</p>
          </div>
          <div>
            <label className="field-label">Most recent employer (optional)</label>
            <input defaultValue="MD Anderson Cancer Center" />
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <Link href="/for-guides/apply/2" className="text-sm text-ink-soft">← Back</Link>
          <Link href="/for-guides/apply/4"><Button>Continue →</Button></Link>
        </div>
      </div>
    </>
  );
}
