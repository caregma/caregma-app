import Link from "next/link";
import { AdvocateLayout } from "@/components/advocate-layout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

export default async function AdvocateCaseDetailPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return (
    <AdvocateLayout>
      <Link
        href="/advocate/cases"
        className="mb-4 inline-block text-[13px] text-ink-soft"
      >
        ← My cases
      </Link>

      <header className="mb-7 flex items-start justify-between gap-6">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <StatusBadge status="upcoming">Session today</StatusBadge>
            <span className="font-mono text-xs text-ink-faint">{sessionId.toUpperCase()}</span>
          </div>
          <h1 className="font-serif text-display-md font-normal tracking-tight">
            Patricia M. — new diagnosis consult.
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Today, 2:00 – 3:30pm CT · Booked by Emma M. (daughter)
          </p>
        </div>
        <Button variant="teal">🎥 Join video room</Button>
      </header>

      {/* Scope reminder */}
      <div className="mb-6 rounded-xl bg-danger-soft p-4 px-5 border-l-4 border-danger">
        <div className="mb-1 flex items-center gap-2 text-[13px] font-semibold text-danger">
          ⚠ Scope reminder
        </div>
        <p className="text-[13px] leading-snug">
          Do not diagnose, prescribe, or recommend a specific treatment. Translate,
          prepare, summarize, and suggest questions for the patient to bring to their
          physician.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Intake */}
        <div className="card">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-serif text-xl font-medium">Family intake</h3>
            <span className="tag tag-teal">Submitted</span>
          </div>

          <IntakeBlock label="Patient">
            <b>Patricia M.</b>, born 1958 (67)
            <br />
            Stage III breast cancer, newly diagnosed
          </IntakeBlock>

          <IntakeBlock label="Upcoming appointment">
            Friday, May 18 · 10:00am
            <br />
            Memorial Hermann oncology
            <br />
            Dr. Chen — treatment planning visit
          </IntakeBlock>

          <IntakeBlock label="Family goals for this session">
            <ul className="space-y-1 list-none">
              {[
                'Understand what "stage III" means for treatment options',
                "Prepare questions about chemotherapy vs surgery timing",
                "Decide whether to seek a second opinion",
                "Help mom feel less overwhelmed before the visit",
              ].map((g) => (
                <li key={g}>— {g}</li>
              ))}
            </ul>
          </IntakeBlock>

          <IntakeBlock label="Current medications">
            Lisinopril 10mg daily · Metformin 500mg 2x daily
            <br />
            Atorvastatin 20mg nightly · Levothyroxine 50mcg morning
          </IntakeBlock>

          <IntakeBlock label="Documents">
            <DocRow type="PDF" name="Pathology report.pdf" meta="Uploaded May 14 · 2.4 MB" />
            <DocRow type="JPG" name="Med list photo.jpg" meta="Uploaded May 14 · 880 KB" toneBlue />
          </IntakeBlock>
        </div>

        {/* Session note template */}
        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-xl font-medium">Session note</h3>
            <span className="tag tag-warn">Due after session</span>
          </div>

          <NoteField
            label="Plain-language summary of what we covered"
            required
            defaultValue='We reviewed Patricia&apos;s pathology report together and talked through what "stage III" means in terms of the cancer&apos;s spread to nearby lymph nodes — without speculating about prognosis, which is Dr. Chen&apos;s role. We discussed the general sequence of treatment decisions families typically face...'
          />
          <NoteField
            label="Questions the family will bring to Dr. Chen"
            required
            defaultValue={`1. What stage and subtype is this, in your words?
2. What treatment options will you discuss, and in what order?
3. What's the typical timeline from today to starting treatment?
4. Is a second opinion something patients in this situation pursue?`}
          />
          <NoteField
            label="Suggested navigation follow-ups"
            hint="Not medical advice"
            defaultValue={`— Ask the clinic about social worker support during treatment planning
— Bring a family member to the May 18 visit to take notes
— Request a written treatment plan summary from Dr. Chen's office`}
          />

          <div className="mt-7 flex items-center justify-between border-t border-line-soft pt-5">
            <span className="text-xs text-ink-faint">
              Auto-saved 2 min ago. Admin will review before payout.
            </span>
            <div className="flex gap-2.5">
              <Button variant="ghost" size="sm">Save draft</Button>
              <Button variant="teal" size="sm">Submit note</Button>
            </div>
          </div>
        </div>
      </div>
    </AdvocateLayout>
  );
}

function IntakeBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="mb-2.5 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
        {label}
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function DocRow({ type, name, meta, toneBlue }: { type: string; name: string; meta: string; toneBlue?: boolean }) {
  return (
    <div className="mt-2 flex items-center gap-3 rounded-lg bg-bg p-3 text-[13px]">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-md text-[10px] font-semibold text-white ${
          toneBlue ? "bg-[#1F4E7A]" : "bg-coral"
        }`}
      >
        {type}
      </div>
      <div className="flex-1">
        <div className="font-medium">{name}</div>
        <div className="text-xs text-ink-soft">{meta}</div>
      </div>
      <Button variant="ghost" size="sm">View</Button>
    </div>
  );
}

function NoteField({
  label,
  required,
  hint,
  defaultValue,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  defaultValue?: string;
}) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-[11px] text-ink-faint">{hint || (required ? "Required" : "")}</span>
      </div>
      <textarea defaultValue={defaultValue} className="bg-bg min-h-[100px] leading-relaxed" />
    </div>
  );
}
