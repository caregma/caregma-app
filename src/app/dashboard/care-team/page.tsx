import Link from "next/link";
import { FamilyNav } from "@/components/top-nav";
import { PageHeader } from "@/components/page-header";
import { Panel } from "@/components/panel";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";

export default function CareTeamPage() {
  return (
    <>
      <FamilyNav />
      <div className="mx-auto max-w-[1100px] px-14 py-10 pb-20">
        <PageHeader title="Your care team." subtitle="Rebook with someone you've worked with before. They'll already know your story." />

        <Panel>
          {[
            { initials: "SR", tone: "teal" as const, name: "Sarah Reyes, RN, OCN", meta: "3 sessions · last: Apr 28 · for Patricia M.", desc: "Your primary care guide. Specialty: breast and gyn oncology." },
          ].map((g, i, arr) => (
            <div key={g.initials} className={`grid grid-cols-[80px_1fr_auto] items-center gap-5 px-7 py-6 ${i < arr.length - 1 ? "border-b border-line-soft" : ""}`}>
              <Avatar initials={g.initials} tone={g.tone} size="xl" />
              <div>
                <div className="font-serif text-xl font-medium">{g.name}</div>
                <div className="mb-2 text-[13px] text-ink-soft">{g.meta}</div>
                <div className="text-sm text-ink-soft">{g.desc}</div>
              </div>
              <Link href="/book"><Button variant="teal" size="sm">Book again →</Button></Link>
            </div>
          ))}
        </Panel>

        <div className="mt-8 rounded-2xl bg-bg-alt p-7 text-center">
          <h3 className="mb-2 font-serif text-xl font-medium">Need a different specialty?</h3>
          <p className="mb-4 text-sm text-ink-soft">Browse care guides by credential, cancer type, or availability.</p>
          <Link href="/book"><Button variant="secondary">Browse all care guides →</Button></Link>
        </div>
      </div>
    </>
  );
}
