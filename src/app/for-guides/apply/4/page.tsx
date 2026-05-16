import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { AppProgress } from "@/components/app-progress";

export default function ApplyStep4() {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
        <Logo />
        <Link href="/for-guides" className="text-[13px] text-ink-soft">Save and exit</Link>
      </nav>
      <AppProgress current={4} />

      <div className="mx-auto max-w-[760px] px-14 py-12 pb-20">
        <div className="eyebrow mb-3">Step 4 of 5</div>
        <h1 className="mb-2 font-serif text-display-md font-normal tracking-tight">Set your rate.</h1>
        <p className="mb-9 text-[15px] text-ink-soft">You keep 80% of every session. Pricing bands are based on your credential and certifications.</p>

        <div className="card">
          <div className="mb-5">
            <div className="eyebrow mb-2">Your rate band — RN with OCN</div>
            <div className="text-sm leading-relaxed text-ink-soft">$179 floor · $349 ceiling · $229–279 suggested</div>
          </div>

          <div className="mb-5 grid gap-5 md:grid-cols-2">
            <div>
              <label className="field-label">90-minute session</label>
              <div className="flex items-center gap-2"><span className="text-2xl font-serif">$</span><input defaultValue="229" className="text-2xl font-serif font-medium" /></div>
              <p className="field-hint">You'd take home $183.20 per session</p>
            </div>
            <div>
              <label className="field-label">60-minute session</label>
              <div className="flex items-center gap-2"><span className="text-2xl font-serif">$</span><input defaultValue="179" className="text-2xl font-serif font-medium" /></div>
              <p className="field-hint">You'd take home $143.20 per session</p>
            </div>
          </div>

          <div className="rounded-xl bg-bg-alt p-5">
            <div className="mb-2 text-sm font-medium">How the math works</div>
            <div className="space-y-1 text-[13px] text-ink-soft">
              <div className="flex justify-between"><span>Session price</span><b className="text-ink">$229.00</b></div>
              <div className="flex justify-between"><span>Platform fee (20%)</span><span>–$45.80</span></div>
              <div className="flex justify-between border-t border-line-soft pt-1.5"><span>You receive</span><b className="text-teal">$183.20</b></div>
            </div>
            <p className="mt-3 text-xs text-ink-faint">Payouts go to your Stripe Connect account 4 business days after each note is approved.</p>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <Link href="/for-guides/apply/3" className="text-sm text-ink-soft">← Back</Link>
          <Link href="/for-guides/apply/5"><Button>Continue →</Button></Link>
        </div>
      </div>
    </>
  );
}
