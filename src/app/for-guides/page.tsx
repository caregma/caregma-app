import Link from "next/link";
import { PublicNav } from "@/components/top-nav";
import { Button } from "@/components/ui/button";

export default function ForGuidesPage() {
  return (
    <>
      <PublicNav />
      <section className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-14 py-20 lg:grid-cols-2">
        <div>
          <div className="eyebrow mb-5">For licensed clinicians</div>
          <h1 className="font-serif text-[56px] font-normal leading-[1.05] tracking-tight">
            Do the nursing you went into nursing for.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            One-on-one time with families navigating serious diagnoses. No charting,
            no insurance billing, no 7-minute appointments. Just real conversations
            you set your own price for.
          </p>
          <div className="mt-8">
            <Link href="/for-guides/apply">
              <Button variant="teal" size="lg">Apply to join →</Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-line-soft pt-8">
            {[
              { stat: "80%", label: "of every session goes to you" },
              { stat: "60–90", label: "minutes per session" },
              { stat: "$129–599", label: "you set your own rate" },
            ].map((s) => (
              <div key={s.stat}>
                <div className="font-serif text-[28px] font-medium text-teal">{s.stat}</div>
                <div className="mt-1 text-xs text-ink-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-bg-alt p-10">
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[1.5px] text-teal">Who we partner with</div>
          <h3 className="mb-6 font-serif text-2xl">Licensed clinicians, verified at the source</h3>
          <ul className="space-y-3 text-sm">
            {[
              "Registered Nurses (RN) — bedside experience preferred",
              "Nurse Practitioners (NP, APRN)",
              "Pharmacists (PharmD, BCOP)",
              "Physicians (MD, DO) — board-certified",
              "Licensed Clinical Social Workers (LCSW)",
            ].map((c) => <li key={c}>✓ {c}</li>)}
          </ul>
          <p className="mt-6 rounded-xl bg-white p-4 text-[13px] leading-relaxed text-ink-soft">
            We verify every license through the issuing board (Nursys, state medical board, state pharmacy board) before activation. Active license, no disciplinary actions, malpractice insurance in good standing.
          </p>
        </div>
      </section>

      <section className="bg-bg-alt px-14 py-20">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-12 font-serif text-[36px] font-normal">How it works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Apply", b: "5-minute application. We verify your license, run a brief interview, and check references." },
              { n: "02", t: "Onboard", b: "Sign our care guide agreement (no exclusivity, contractor relationship), set your rates, set your availability." },
              { n: "03", t: "Get matched", b: "We match you with families whose situation fits your specialty. You can accept or decline each match." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-line-soft bg-bg p-7">
                <div className="mb-3 font-serif text-[42px] text-teal">{s.n}</div>
                <h3 className="mb-2 font-serif text-xl font-medium">{s.t}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
