import Link from "next/link";
import { FamilyNav } from "@/components/top-nav";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

export default async function FamilySessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <FamilyNav />
      <div className="mx-auto max-w-[960px] px-14 py-10 pb-20">
        <Link href="/dashboard" className="mb-4 inline-block text-[13px] text-ink-soft">← Sessions</Link>

        <header className="mb-7">
          <div className="mb-2 flex items-center gap-3">
            <StatusBadge status="completed">Completed</StatusBadge>
            <span className="font-mono text-xs text-ink-faint">{id.toUpperCase()}</span>
          </div>
          <h1 className="font-serif text-display-md font-normal tracking-tight">Initial consult — Patricia M.</h1>
          <p className="mt-2 text-[15px] text-ink-soft">April 28, 2026 · 90 minutes · Virtual · with Sarah Reyes, RN, OCN</p>
        </header>

        <div className="mb-6 flex items-center gap-4 rounded-2xl bg-bg-alt p-5">
          <Avatar initials="SR" size="lg" />
          <div className="flex-1">
            <div className="text-[15px] font-medium">Sarah Reyes, RN, OCN</div>
            <div className="text-[13px] text-ink-soft">Your care guide for this session</div>
          </div>
          <Link href="/book"><Button variant="secondary" size="sm">Rebook with Sarah →</Button></Link>
        </div>

        <NoteSection label="Summary of what we covered">
          We reviewed Patricia's pathology report together and talked through what "stage III breast cancer" means in terms of the cancer's spread to nearby lymph nodes. We discussed the general sequence of treatment decisions she'll face — typically surgery, chemotherapy, and radiation, though the order varies. I helped her draft questions about timing and second opinions for Dr. Chen.
        </NoteSection>

        <NoteSection label="Questions to bring to Dr. Chen">
          <ul className="space-y-2 list-decimal list-inside text-sm leading-relaxed">
            <li>What stage and subtype is this, in your words?</li>
            <li>What treatment options will you discuss, and in what order?</li>
            <li>What's the typical timeline from today to starting treatment?</li>
            <li>Is a second opinion something patients in this situation pursue?</li>
          </ul>
        </NoteSection>

        <NoteSection label="Suggested next steps">
          <ul className="space-y-2 list-disc list-inside text-sm leading-relaxed text-ink-soft">
            <li>Ask the clinic about social worker support during treatment planning</li>
            <li>Bring a family member to the May 18 visit to take notes</li>
            <li>Request a written treatment plan summary from Dr. Chen's office</li>
          </ul>
          <p className="mt-3 text-xs text-ink-faint italic">These are navigation suggestions, not medical advice.</p>
        </NoteSection>

        <div className="mt-8 flex gap-2.5">
          <Button variant="secondary" size="sm">Download as PDF</Button>
          <Button variant="ghost" size="sm">Share with family</Button>
        </div>
      </div>
    </>
  );
}

function NoteSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="card mb-4">
      <div className="eyebrow mb-3">{label}</div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
