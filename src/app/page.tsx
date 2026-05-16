import Link from "next/link";
import { PublicNav } from "@/components/top-nav";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

function CheckIcon() {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-teal text-white">
      <Check size={10} strokeWidth={3} />
    </span>
  );
}

export default function LandingPage() {
  return (
    <>
      <PublicNav />

      <section className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-20 px-14 py-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="eyebrow mb-6">For families navigating a new diagnosis</div>
          <h1 className="font-serif text-[64px] font-normal leading-[1.05] tracking-tight">
            Walk into the next appointment with{" "}
            <em className="font-medium not-italic text-teal">
              <span className="italic">a clinician beside you.</span>
            </em>
          </h1>
          <p className="mt-6 max-w-[480px] text-lg leading-relaxed text-ink-soft">
            A licensed nurse, pharmacist, social worker, or physician spends 60–90
            minutes with your family — before the visit, during it if you'd like,
            and after — helping you prepare, understand, and decide.
          </p>

          <div className="mt-9 flex items-center gap-5">
            <Link href="/book">
              <Button variant="teal" size="lg">
                Find a care guide →
              </Button>
            </Link>
            <Link
              href="/#how-it-works"
              className="border-b border-ink pb-0.5 text-[15px] font-medium"
            >
              How it works
            </Link>
          </div>

          <div className="mt-12 flex flex-col gap-2.5 text-[13px] text-ink-soft">
            <div className="flex items-center gap-3">
              <CheckIcon /> Licensed RNs, NPs, PharmDs, MDs, and LCSWs — every credential verified at the source
            </div>
            <div className="flex items-center gap-3">
              <CheckIcon /> HIPAA-protected. No insurance required.
            </div>
            <div className="flex items-center gap-3">
              <CheckIcon /> Full refund if your appointment is canceled.
            </div>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="mx-auto w-[320px] rounded-[38px] bg-ink p-2.5 shadow-2xl">
          <div className="min-h-[600px] rounded-[30px] bg-bg p-6">
            <div className="mb-6 flex justify-between text-[11px] font-medium">
              <span>9:41</span>
              <span>●●●</span>
            </div>
            <h2 className="font-serif text-2xl font-normal leading-tight">Hi Emma —</h2>
            <p className="mb-5 mt-1 text-[13px] text-ink-soft">
              Tell us about the appointment.
            </p>

            {[
              { label: "Appointment for", value: "My mother, Patricia" },
              { label: "Visit type", value: "New diagnosis consult" },
              { label: "When", value: "Fri, May 18 · 10:00am" },
            ].map((row, i) => (
              <div
                key={i}
                className="mb-2.5 rounded-xl border border-line-soft bg-white p-3.5"
              >
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
                  {row.label}
                </div>
                <div className="text-sm font-medium">{row.value}</div>
              </div>
            ))}

            <div className="mt-5 rounded-xl border border-line-soft bg-white p-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-soft text-base font-medium text-teal-deep">
                  SR
                </div>
                <div>
                  <div className="text-sm font-semibold">Sarah Reyes, RN</div>
                  <div className="text-[11px] text-ink-soft">14 yrs · Breast cancer</div>
                </div>
              </div>
              <div className="my-3 font-serif text-[13px] italic leading-snug text-ink-soft">
                "I help families slow down and feel ready for the visit."
              </div>
              <div className="flex items-baseline justify-between border-t border-line-soft pt-2.5">
                <span className="text-xs text-ink-soft">90 min consult</span>
                <span className="font-serif text-[22px] font-medium">$249</span>
              </div>
              <div className="mt-3 rounded-full bg-teal py-3 text-center text-[13px] font-medium text-white">
                Book Sarah
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-bg-alt px-14 py-24">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="font-serif text-[42px] font-normal tracking-tight">
            How a session works
          </h2>
          <p className="mb-14 mt-3 max-w-[540px] text-base text-ink-soft">
            From booking to the post-visit summary, every step is designed to make a
            hard moment a little easier.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Tell us about the visit",
                body:
                  "A few questions about who the session is for and what you're navigating. Takes 2 minutes.",
              },
              {
                num: "02",
                title: "Meet your care guide",
                body:
                  "A licensed clinician matched to your specialty and schedule. You see their face, credentials, and approach before you book.",
              },
              {
                num: "03",
                title: "Prepare. Show up. Decide.",
                body:
                  "Your guide helps you build questions, joins the doctor visit if you'd like, and sends a plain-language summary afterward.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-line-soft bg-bg p-9"
              >
                <div className="mb-5 font-serif text-[56px] font-normal leading-none text-teal">
                  {step.num}
                </div>
                <h3 className="mb-2.5 font-serif text-[22px] font-medium">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
