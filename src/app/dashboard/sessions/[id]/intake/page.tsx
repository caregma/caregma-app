import Link from "next/link";
import { FamilyNav } from "@/components/top-nav";
import { Button } from "@/components/ui/button";

export default async function IntakePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <FamilyNav />
      <div className="mx-auto max-w-[760px] px-14 py-10 pb-20">
        <Link href="/dashboard" className="mb-4 inline-block text-[13px] text-ink-soft">← Dashboard</Link>
        <header className="mb-9">
          <div className="eyebrow mb-3">Session intake · {id.toUpperCase()}</div>
          <h1 className="font-serif text-display-md font-normal tracking-tight">Tell Sarah about Patricia.</h1>
          <p className="mt-2 text-[15px] text-ink-soft">This helps your care guide arrive prepared. Takes about 5 minutes. You can save and come back.</p>
        </header>

        <div className="card space-y-6">
          <Field label="What's worrying you most right now?">
            <textarea defaultValue="Mom was just diagnosed with stage III breast cancer. She's overwhelmed and we don't know what questions to ask." />
          </Field>
          <Field label="What do you hope to get from this session?" hint="Bullet list is fine — Sarah will help you prioritize.">
            <textarea defaultValue={`— Understand what "stage III" means for treatment options\n— Prepare questions about chemotherapy vs surgery timing\n— Decide whether to seek a second opinion\n— Help mom feel less overwhelmed before the visit`} />
          </Field>
          <Field label="Current medications" hint="Brand and dose if you know it. Photo of pill bottles works too.">
            <textarea defaultValue="Lisinopril 10mg daily · Metformin 500mg 2x daily · Atorvastatin 20mg nightly · Levothyroxine 50mcg morning" />
          </Field>
          <Field label="Anything else Sarah should know?" hint="Optional. Family dynamics, hearing/vision concerns, language preferences, etc.">
            <textarea placeholder="Mom prefers to have me on the call with her..." />
          </Field>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <Button variant="ghost">Save draft</Button>
          <Link href="/dashboard"><Button variant="teal">Submit intake →</Button></Link>
        </div>
      </div>
    </>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
      {hint && <p className="field-hint">{hint}</p>}
    </div>
  );
}
