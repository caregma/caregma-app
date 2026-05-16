import { AdminLayout } from "@/components/admin-layout";
import { PageHeader } from "@/components/page-header";
import { Panel } from "@/components/panel";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";

export default function AdminMatchingPage() {
  return (
    <AdminLayout>
      <PageHeader title="To match." subtitle="Sessions paid for but not yet assigned to a care guide. Match within 6 hours of booking." />

      <Panel title="C-2049 · Patricia M. (67) — new diagnosis consult" meta="Paid 6h ago · Appointment in 3 days">
        <div className="grid gap-4 px-7 py-6 md:grid-cols-2">
          <div>
            <div className="eyebrow mb-2">Family context</div>
            <p className="text-sm leading-relaxed">Booked by Emma M. (daughter) for her mother Patricia, 67. Stage III breast cancer, newly diagnosed. Family wants help preparing for treatment-planning visit at Memorial Hermann with Dr. Chen.</p>
          </div>
          <div>
            <div className="eyebrow mb-2">Preferences</div>
            <ul className="space-y-1 text-sm">
              <li>· Format: Video</li>
              <li>· Time: Thu May 17, 2:00pm CT</li>
              <li>· Specialty: Breast oncology</li>
              <li>· State: Texas</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line-soft px-7 py-5">
          <div className="eyebrow mb-3">Suggested matches</div>
          {[
            { initials: "SR", tone: "teal" as const, name: "Sarah Reyes, RN, OCN", meta: "14 yrs · Breast specialty · Available Thu 2:00pm", score: 96, rate: "$249" },
            { initials: "JM", tone: "blue" as const, name: "Jennifer Mathers, NP", meta: "9 yrs · Breast + gyn · Available Thu 2:00pm", score: 88, rate: "$279" },
            { initials: "DK", tone: "coral" as const, name: "Dr. David Kim, MD", meta: "11 yrs · Breast subspecialty · Available Thu 3:00pm", score: 72, rate: "$399" },
          ].map((m, i, arr) => (
            <div key={m.initials} className={`grid grid-cols-[60px_1fr_auto_auto_auto] items-center gap-4 py-4 ${i < arr.length - 1 ? "border-b border-line-soft" : ""}`}>
              <Avatar initials={m.initials} tone={m.tone} size="lg" />
              <div>
                <div className="text-[15px] font-medium">{m.name}</div>
                <div className="text-[13px] text-ink-soft">{m.meta}</div>
              </div>
              <div className="text-right">
                <div className="font-serif text-2xl font-medium text-teal">{m.score}%</div>
                <div className="text-[10px] uppercase tracking-wider text-ink-faint">Match score</div>
              </div>
              <div className="font-serif text-lg">{m.rate}</div>
              <Button variant={i === 0 ? "teal" : "secondary"} size="sm">{i === 0 ? "Match →" : "Match"}</Button>
            </div>
          ))}
        </div>
      </Panel>
    </AdminLayout>
  );
}
