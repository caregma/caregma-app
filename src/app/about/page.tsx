import { PublicNav } from "@/components/top-nav";

export default function AboutPage() {
  return (
    <>
      <PublicNav />

      <div className="mx-auto max-w-[640px] px-6 py-16 md:py-20">
        <div className="eyebrow mb-4">About Caregma</div>
        <h1 className="font-serif text-[48px] font-normal leading-tight tracking-tight">
          A second voice when you need one.
        </h1>
        <div className="mt-7 space-y-4 text-lg leading-[1.7] text-ink-soft">
          <p>
            Caregma started after watching family members navigate cancer diagnoses,
            hospital discharges, and treatment decisions feeling outnumbered, rushed,
            and unable to ask the right questions in the few minutes a doctor's visit
            affords.
          </p>
          <p>
            We connect families with licensed clinicians — nurses, nurse practitioners,
            pharmacists, social workers, and physicians — who can spend 60 or 90
            minutes with you. They translate, prepare, listen, and help you walk into
            the next appointment with someone in your corner.
          </p>
          <p>
            We don't replace the patient's care team. We help the family engage with
            it better.
          </p>
        </div>

        <h2 className="mb-5 mt-16 font-serif text-[32px] font-normal">
          What we believe
        </h2>
        <div className="space-y-6">
          {[
            {
              title: "Clinicians, not chatbots.",
              body:
                "Every session is with a licensed, verified human. We will never replace that with AI.",
            },
            {
              title: "Scope is sacred.",
              body:
                "Our care guides do not diagnose, prescribe, or recommend specific treatments. That's the role of the patient's care team. Our role is to make that team easier to work with.",
            },
            {
              title: "Pay clinicians well.",
              body:
                "80% of every session goes to the clinician. We keep a marketplace fee, not a markup on someone else's labor.",
            },
            {
              title: "Family-first design.",
              body:
                "Most of our customers are adult daughters, sons, and spouses booking on someone else's behalf. We design for that.",
            },
          ].map((b) => (
            <div key={b.title}>
              <h3 className="mb-2 font-serif text-xl font-medium">{b.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink-soft">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
