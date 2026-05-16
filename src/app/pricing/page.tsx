import Link from "next/link";
import { PublicNav } from "@/components/top-nav";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <>
      <PublicNav />

      <div className="mx-auto max-w-[1280px] px-14 py-10">
        <header className="mx-auto mb-16 mt-10 max-w-[720px] text-center">
          <div className="eyebrow mb-3 justify-center">Pricing</div>
          <h1 className="font-serif text-[48px] font-normal leading-tight tracking-tight">
            Pay only when you book. No subscription, no insurance.
          </h1>
          <p className="mt-4 text-base text-ink-soft">
            Every session is one all-in price. Your care guide keeps 80%; we keep 20%
            to run the platform.
          </p>
        </header>

        <div className="mb-16 grid gap-5 md:grid-cols-3">
          {[
            {
              tier: "RN / LCSW",
              priceFrom: 129,
              priceTo: 249,
              best: "Best for: navigation, intake prep, family support, emotional grounding, medication review with an RN.",
              featured: false,
            },
            {
              tier: "NP / PharmD",
              priceFrom: 179,
              priceTo: 349,
              best: "Best for: deeper clinical questions, chemo regimen review, treatment-option education with an advanced practitioner.",
              featured: true,
            },
            {
              tier: "Physician (MD, DO)",
              priceFrom: 229,
              priceTo: 599,
              best: "Best for: complex decisions, second-opinion preparation, clarifying a pathology or imaging report with a board-certified physician.",
              featured: false,
            },
          ].map((tier) => (
            <div
              key={tier.tier}
              className={`card text-center ${
                tier.featured ? "border-2 border-teal" : ""
              }`}
            >
              {tier.featured && (
                <div className="mb-2 inline-block rounded-full bg-teal px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Most booked
                </div>
              )}
              <div className="eyebrow mt-2 justify-center">{tier.tier}</div>
              <div className="my-4 font-serif text-[56px] font-medium leading-none">
                ${tier.priceFrom}
                <span className="text-lg text-ink-faint">–{tier.priceTo}</span>
              </div>
              <p className="mb-6 text-sm text-ink-soft">Per 60–90 min session</p>
              <p className="text-left text-[13px] leading-relaxed">{tier.best}</p>
            </div>
          ))}
        </div>

        <div className="card mx-auto max-w-[720px]">
          <h3 className="mb-4 font-serif text-[22px] font-medium">
            What's always included
          </h3>
          <ul className="space-y-2 text-sm leading-loose">
            {[
              "Your care guide reviews your intake before the session",
              "A live 60–90 minute conversation (video, phone, or in person)",
              "A plain-language written summary you can share with anyone",
              "A list of questions to bring to your doctor",
              "HIPAA-protected data handling",
              "Full refund if the underlying appointment is canceled",
            ].map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-14 text-center">
          <Link href="/book">
            <Button variant="teal" size="lg">
              Find your care guide →
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
