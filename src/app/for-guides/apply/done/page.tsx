import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function ApplyDonePage() {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
        <Logo />
        <Link href="/" className="text-[13px] text-ink-soft">Caregma.com</Link>
      </nav>

      <div className="px-14 py-16 text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-teal-soft text-4xl text-teal">✓</div>
        <h1 className="font-serif text-[42px] font-normal leading-tight tracking-tight">Application received.</h1>
        <p className="mx-auto mb-10 mt-3 max-w-[540px] text-base text-ink-soft">
          Thanks, Margaret. We'll verify your license through Nursys (usually 1–2 business days) and reach out within 3 business days to schedule a brief 30-minute interview.
        </p>

        <div className="mx-auto max-w-[520px] rounded-2xl border border-line-soft bg-white p-8 text-left">
          <h3 className="mb-5 font-serif text-xl font-medium">What happens next</h3>
          {[
            { step: "1", title: "License verification", desc: "We verify your license through Nursys (1–2 business days)" },
            { step: "2", title: "30-min interview", desc: "Brief call with our clinical director to talk about your approach to family conversations" },
            { step: "3", title: "Contract & onboarding", desc: "If we're a fit, you'll sign the care guide agreement and set your availability" },
            { step: "4", title: "First booking", desc: "Most new care guides receive their first match within 2–3 weeks" },
          ].map((s) => (
            <div key={s.step} className="mb-4 flex items-start gap-4 last:mb-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-soft text-sm font-semibold text-teal-deep">{s.step}</div>
              <div>
                <div className="text-sm font-medium">{s.title}</div>
                <div className="text-[13px] text-ink-soft">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/"><Button variant="secondary">Back to Caregma.com</Button></Link>
        </div>
      </div>
    </>
  );
}
