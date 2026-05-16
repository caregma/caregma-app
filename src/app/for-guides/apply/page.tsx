import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { AppProgress } from "@/components/app-progress";

export default function ApplyStep1() {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
        <Logo />
        <Link href="/for-guides" className="text-[13px] text-ink-soft">Save and exit</Link>
      </nav>
      <AppProgress current={1} />

      <div className="mx-auto max-w-[760px] px-14 py-12 pb-20">
        <div className="eyebrow mb-3">Step 1 of 5</div>
        <h1 className="mb-2 font-serif text-display-md font-normal tracking-tight">Tell us about yourself.</h1>
        <p className="mb-9 text-[15px] text-ink-soft">Basics first. We'll verify your license in the next step.</p>

        <div className="card grid gap-5 md:grid-cols-2">
          <div><label className="field-label">First name</label><input defaultValue="Margaret" /></div>
          <div><label className="field-label">Last name</label><input defaultValue="O'Brien" /></div>
          <div><label className="field-label">Email</label><input type="email" defaultValue="margaret.obrien@gmail.com" /></div>
          <div><label className="field-label">Phone</label><input defaultValue="(512) 555-0188" /></div>
          <div className="md:col-span-2"><label className="field-label">Primary credential</label><select><option>RN — Registered Nurse</option><option>NP — Nurse Practitioner</option><option>PharmD — Pharmacist</option><option>MD / DO — Physician</option><option>LCSW — Licensed Clinical Social Worker</option></select></div>
          <div className="md:col-span-2"><label className="field-label">State of licensure</label><select><option>Texas</option><option>California</option><option>New York</option><option>Florida</option></select></div>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <Link href="/for-guides" className="text-sm text-ink-soft">← Back</Link>
          <Link href="/for-guides/apply/2"><Button>Continue →</Button></Link>
        </div>
      </div>
    </>
  );
}
