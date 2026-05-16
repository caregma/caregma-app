import Link from "next/link";
import { FamilyNav } from "@/components/top-nav";
import { PageHeader } from "@/components/page-header";
import { Panel } from "@/components/panel";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

export default function FamilyDashboardPage() {
  return (
    <>
      <FamilyNav />

      <div className="mx-auto max-w-[1280px] px-14 py-10 pb-20">
        <PageHeader
          title="Good morning, Emma."
          subtitle="Your next session is in 2 days. Here's what to expect."
        />

        <div className="mb-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Hero card */}
          <div className="rounded-2xl border border-line-soft bg-white p-7 border-l-4 border-l-teal">
            <div className="eyebrow mb-4 text-teal">UPCOMING SESSION</div>
            <h2 className="font-serif text-[28px] font-normal leading-tight">
              New diagnosis consult
            </h2>
            <p className="mb-5 mt-1.5 text-sm text-ink-soft">
              For your mother, Patricia M.
            </p>

            <div className="mb-5 grid grid-cols-[100px_1fr_1fr] gap-5 rounded-xl bg-bg-alt p-5">
              <div className="rounded-xl bg-white p-1.5 text-center">
                <div className="font-mono text-[11px] uppercase tracking-wider text-teal">
                  May
                </div>
                <div className="font-serif text-[32px] font-medium leading-none">
                  17
                </div>
                <div className="mt-0.5 text-[11px] text-ink-soft">Thu</div>
              </div>
              <div className="text-sm">
                <div className="mb-1 text-[11px] uppercase tracking-wider text-ink-faint">
                  Time
                </div>
                <div className="text-sm font-medium">2:00 – 3:30pm CT</div>
                <div className="text-ink-soft">90 minutes · Virtual</div>
              </div>
              <div className="text-sm">
                <div className="mb-1 text-[11px] uppercase tracking-wider text-ink-faint">
                  Your care guide
                </div>
                <div className="flex items-center gap-3">
                  <Avatar initials="SR" size="md" />
                  <div>
                    <div className="text-sm font-medium">Sarah Reyes, RN</div>
                    <div className="text-xs text-ink-soft">14 yrs oncology</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/dashboard/sessions/s-2049/intake">
                <Button variant="teal">Complete your intake →</Button>
              </Link>
              <span className="text-[13px] text-coral">
                Required 24h before session
              </span>
            </div>
          </div>

          {/* Prep checklist */}
          <div className="rounded-2xl border border-line-soft bg-white p-7">
            <h3 className="mb-4 font-serif text-lg font-medium">Before your session</h3>
            <div className="flex flex-col gap-3.5">
              {[
                { label: "Book your session", state: "done" },
                { label: "Verbal consent confirmed", state: "done" },
                { label: "Complete intake form", state: "active" },
                { label: "Upload medication list (optional)", state: "" },
                { label: "Test your video setup", state: "" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 text-sm ${
                    item.state === "done"
                      ? "text-ink-soft line-through"
                      : item.state === "active"
                        ? "font-medium text-coral"
                        : ""
                  }`}
                >
                  <span
                    className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] ${
                      item.state === "done"
                        ? "border-teal bg-teal text-white"
                        : item.state === "active"
                          ? "border-coral bg-coral-soft text-coral"
                          : "border-line bg-bg-alt"
                    }`}
                  >
                    {item.state === "done" ? "✓" : item.state === "active" ? "●" : ""}
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl bg-bg-alt p-4 text-[13px] leading-snug text-ink-soft border-l-2 border-ink-faint">
              Sarah will not diagnose or recommend treatment. She'll help you prepare
              for and understand the visit.
            </div>
          </div>
        </div>

        <h2 className="mb-4 mt-2 font-serif text-2xl font-normal">Past sessions</h2>
        <Panel className="mb-6">
          {[
            { id: "s-2040", month: "Apr", day: "28", title: "Initial consult", meta: "Sarah Reyes · 90 min · Patricia M." },
            { id: "s-2035", month: "Mar", day: "14", title: "Pre-surgery prep", meta: "Sarah Reyes · 60 min · Patricia M." },
          ].map((sess, i, arr) => (
            <Link
              key={sess.id}
              href={`/dashboard/sessions/${sess.id}`}
              className={`grid grid-cols-[60px_1fr_auto_auto] items-center gap-5 px-6 py-5 transition-colors hover:bg-bg ${
                i < arr.length - 1 ? "border-b border-line-soft" : ""
              }`}
            >
              <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-bg-alt">
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                  {sess.month}
                </div>
                <div className="font-serif text-xl font-medium leading-none">
                  {sess.day}
                </div>
              </div>
              <div>
                <div className="mb-0.5 text-[15px] font-medium">{sess.title}</div>
                <div className="text-[13px] text-ink-soft">{sess.meta}</div>
              </div>
              <StatusBadge status="completed">Completed</StatusBadge>
              <Button variant="ghost" size="sm">
                View summary →
              </Button>
            </Link>
          ))}
        </Panel>
      </div>
    </>
  );
}
