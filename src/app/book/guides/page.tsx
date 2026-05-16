import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/avatar";
import { ProgressStrip } from "@/components/booking-progress";
import { listActiveAdvocates } from "@/lib/backend/data";
import { formatCents } from "@/lib/backend/format";

export default async function GuidesPage() {
  const advocates = await listActiveAdvocates();

  return (
    <>
      <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
        <Logo />
        <Link href="/" className="text-[13px] text-ink-soft">
          Save and exit
        </Link>
      </nav>

      <ProgressStrip current={3} backHref="/book/care-moment" />

      <div className="mx-auto max-w-[1280px] px-14 py-10 pb-20">
        <header className="mb-9">
          <h1 className="font-serif text-display-md font-normal tracking-tight">
            Choose your care guide.
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            All care guides are licensed clinicians, verified through their state
            board or primary credential source.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          {["All credentials (5)", "Nurses (RN, NP)", "Pharmacists", "Physicians", "Social workers"].map(
            (filter, i) => (
              <button
                key={filter}
                className={
                  i === 0
                    ? "btn btn-primary btn-sm"
                    : "btn btn-ghost btn-sm"
                }
              >
                {filter}
              </button>
            )
          )}
        </div>

        {advocates.map((a, i) => {
          const featured = i === 0;
          const avatarTones = ["teal", "blue", "coral", "amber", "neutral"] as const;
          const tone = avatarTones[i % avatarTones.length];

          return (
            <Link
              key={a.user_id}
              href="/book/schedule"
              className={`mb-4 grid grid-cols-[88px_1fr_auto] gap-6 rounded-2xl border p-7 transition-all hover:-translate-y-px ${
                featured
                  ? "border-2 border-teal bg-gradient-to-b from-teal-soft to-white"
                  : "border-line-soft bg-white hover:border-ink-soft"
              }`}
            >
              <Avatar initials={a.initials} tone={tone} size="xl" />
              <div className="min-w-0">
                {featured && (
                  <div className="mb-2 inline-block rounded-full bg-teal px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Best match
                  </div>
                )}
                <div className="font-serif text-[22px] font-medium">
                  {a.display_name}, {a.credentials_display}
                </div>
                <div className="mt-1 text-[13px] text-ink-soft">
                  {a.years_experience} years experience · {a.license_number}
                </div>
                <p className="my-4 max-w-[580px] font-serif text-[15px] italic leading-snug">
                  &quot;{a.bio}&quot;
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag tag-teal">✓ License verified</span>
                  {a.certifications.map((c) => (
                    <span key={c} className="tag">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="font-serif text-[32px] font-medium leading-none">
                  {formatCents(a.session_rate_cents)}
                </div>
                <div className="mt-1 mb-4 text-xs text-ink-faint">
                  {a.credential_type === "MD" || a.credential_type === "PharmD" || a.credential_type === "LCSW" ? "60" : "90"} min · all-in
                </div>
                {featured ? (
                  <Button variant="teal">Continue →</Button>
                ) : (
                  <Button variant="secondary" size="sm">
                    Select
                  </Button>
                )}
              </div>
            </Link>
          );
        })}

        <div className="mt-8 rounded-xl bg-bg-alt p-5 text-center text-[13px] text-ink-soft">
          🛡 All sessions are HIPAA-protected. Care guides cannot diagnose or prescribe — they
          help you prepare, understand, and decide.
        </div>
      </div>
    </>
  );
}
