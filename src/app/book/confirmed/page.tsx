import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/avatar";

export default function ConfirmedPage() {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
        <Logo />
        <Link href="/dashboard">
          <Button variant="secondary" size="sm">
            Go to dashboard →
          </Button>
        </Link>
      </nav>

      <div className="px-14 py-16 text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-teal-soft text-4xl text-teal">
          ✓
        </div>
        <h1 className="font-serif text-[42px] font-normal leading-tight tracking-tight">
          Your session is booked.
        </h1>
        <p className="mx-auto mb-10 mt-3 max-w-[540px] text-base text-ink-soft">
          Sarah will review your information before the session. We've emailed you a
          confirmation and a link to complete the intake form.
        </p>

        <div className="mx-auto max-w-[600px] rounded-2xl border border-line-soft bg-white p-8 text-left">
          <div className="mb-6 flex items-center gap-4 border-b border-line-soft pb-5">
            <Avatar initials="SR" size="lg" />
            <div>
              <div className="font-serif text-xl font-medium">Sarah Reyes, RN, OCN</div>
              <div className="text-[13px] text-ink-soft">Your care guide for Patricia</div>
            </div>
          </div>

          {[
            ["Session", "Thursday, May 17 · 2:00–3:30pm CT"],
            ["Format", "🎥 Video call (link sent 1 hour before)"],
            ["Booking ID", "C-2049"],
            ["Charged to", "Visa ending 4242"],
            ["Total", "$249.00"],
          ].map(([k, v], i, arr) => (
            <div
              key={k}
              className={`flex justify-between py-3 text-sm ${
                i < arr.length - 1 ? "border-b border-line-soft" : ""
              }`}
            >
              <span className="text-ink-soft">{k}</span>
              <span className={k === "Booking ID" ? "font-mono text-[13px]" : "font-medium"}>
                {v}
              </span>
            </div>
          ))}

          <div className="mt-7 rounded-xl bg-bg-alt p-5">
            <div className="mb-2 text-sm font-medium">
              Next step: complete the intake form
            </div>
            <p className="mb-3.5 text-[13px] text-ink-soft">
              A 5-minute form helps Sarah arrive prepared. Required 24 hours before
              your session.
            </p>
            <Link href="/dashboard">
              <Button variant="teal" size="sm">
                Start intake →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
