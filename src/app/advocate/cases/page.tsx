import Link from "next/link";
import { AdvocateLayout } from "@/components/advocate-layout";
import { PageHeader } from "@/components/page-header";
import { Panel } from "@/components/panel";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

const CASES = [
  { id: "C-2049", name: "Patricia M. (67)", meta: "New diagnosis · Breast cancer · Booked by daughter", when: "Today 2:00pm", duration: "90 min", status: "today" as const, label: "Today", href: "/advocate/cases/s-2049" },
  { id: "C-2052", name: "Linda H. (58)", meta: "Treatment planning · Colorectal · Booked by husband", when: "May 22 6:00pm", duration: "90 min", status: "completed" as const, label: "Upcoming", href: "/advocate/cases/s-2052" },
  { id: "C-2055", name: "Janet P. (62)", meta: "Second opinion · Breast · Booked by self", when: "May 24 11:00am", duration: "60 min", status: "completed" as const, label: "Upcoming", href: "/advocate/cases/s-2055" },
  { id: "C-2045", name: "Robert K. (71)", meta: "Second opinion · Lung · Booked by self", when: "Completed May 13", duration: "$199 pending", status: "note-due" as const, label: "Note due", href: "/advocate/cases/s-2045" },
  { id: "C-2043", name: "Maria L. (54)", meta: "Treatment planning · Breast · Booked by self", when: "Completed May 12", duration: "$249 pending", status: "note-due" as const, label: "Note due", href: "/advocate/cases/s-2043" },
];

export default function AdvocateCasesPage() {
  return (
    <AdvocateLayout>
      <PageHeader
        title="My cases."
        subtitle="All sessions assigned to you, across status."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        <Button size="sm">All (8)</Button>
        <Button variant="ghost" size="sm">Upcoming (4)</Button>
        <Button variant="ghost" size="sm">Notes due (2)</Button>
        <Button variant="ghost" size="sm">Completed (2)</Button>
      </div>

      <Panel>
        {CASES.map((c, i) => (
          <Link
            key={c.id}
            href={c.href}
            className={`grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-5 px-7 py-5 transition-colors hover:bg-bg ${
              i < CASES.length - 1 ? "border-b border-line-soft" : ""
            }`}
          >
            <div className="font-mono text-xs text-ink-faint">{c.id}</div>
            <div>
              <div className="mb-0.5 text-[15px] font-medium">{c.name}</div>
              <div className="text-[13px] text-ink-soft">{c.meta}</div>
            </div>
            <div className="min-w-[140px] text-right text-[13px] text-ink-soft">
              <b className="block text-ink">{c.when}</b>
              {c.duration}
            </div>
            <StatusBadge status={c.status}>{c.label}</StatusBadge>
            <Button variant={c.status === "today" ? "teal" : c.status === "note-due" ? "secondary" : "ghost"} size="sm">
              Open →
            </Button>
          </Link>
        ))}
      </Panel>
    </AdvocateLayout>
  );
}
