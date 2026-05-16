import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/avatar";
import { ProgressStrip } from "@/components/booking-progress";

const DAYS = [
  { dow: "WED", num: 16, count: "3 times", state: "" },
  { dow: "THU", num: 17, count: "5 times", state: "selected" },
  { dow: "FRI", num: 18, count: "Visit day", state: "disabled" },
  { dow: "SAT", num: 19, count: "2 times", state: "" },
];

const TIMES = ["10:00am", "11:30am", "2:00pm", "3:30pm", "5:00pm"];

export default function SchedulePage() {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
        <Logo />
        <Link href="/" className="text-[13px] text-ink-soft">
          Save and exit
        </Link>
      </nav>

      <ProgressStrip current={4} backHref="/book/guides" />

      <div className="mx-auto max-w-[1100px] px-14 py-14 pb-20">
        <header className="mb-9">
          <h1 className="font-serif text-display-md font-normal tracking-tight">
            Pick a time with Sarah.
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Your appointment is Friday at 10am. We recommend booking your session 24
            hours before.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="grid grid-cols-4 gap-3">
              {DAYS.map((day) => (
                <div
                  key={day.num}
                  className={`rounded-2xl border p-4 text-center transition-all ${
                    day.state === "selected"
                      ? "border-teal bg-teal-soft"
                      : day.state === "disabled"
                        ? "border-line-soft bg-white opacity-50"
                        : "border-line-soft bg-white hover:border-ink"
                  }`}
                >
                  <div
                    className={`font-mono text-[11px] ${day.state === "selected" ? "text-teal-deep" : "text-ink-soft"}`}
                  >
                    {day.dow}
                  </div>
                  <div className="my-1 font-serif text-[22px] font-medium">
                    {day.num}
                  </div>
                  <div
                    className={`text-[11px] ${day.state === "selected" ? "text-teal-deep" : "text-ink-faint"}`}
                  >
                    {day.count}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <label className="field-label">Available times — Thursday, May 17</label>
              <div className="mt-2 grid grid-cols-3 gap-2.5">
                {TIMES.map((time) => (
                  <button
                    key={time}
                    className={`rounded-2xl border p-3.5 text-center transition-all ${
                      time === "2:00pm"
                        ? "border-teal bg-teal-soft text-teal-deep"
                        : "border-line-soft bg-white hover:border-ink"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-20 h-fit rounded-2xl border border-line-soft bg-white p-7">
            <div className="mb-4 flex items-center gap-3">
              <Avatar initials="SR" size="lg" />
              <div>
                <div className="text-[15px] font-medium">Sarah Reyes, RN, OCN</div>
                <div className="text-xs text-ink-soft">14 yrs · Breast specialty</div>
              </div>
            </div>
            <div className="border-t border-line-soft py-4">
              {[
                ["Patient", "Patricia M."],
                ["Session", "Thu May 17 · 2:00pm"],
                ["Duration", "90 minutes"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between border-b border-line-soft py-2.5 text-sm"
                >
                  <span className="text-ink-soft">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-line-soft pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm">Total</span>
                <span className="font-serif text-[28px] font-medium">$249.00</span>
              </div>
            </div>
            <Link href="/book/format">
              <Button variant="teal" className="mt-4 w-full">
                Continue to format →
              </Button>
            </Link>
            <p className="mt-3 text-center text-[11px] text-ink-faint">
              🔒 Secure payment on the next step. Full refund if appointment is canceled.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
