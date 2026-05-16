"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ProgressStrip } from "@/components/booking-progress";
import { cn } from "@/lib/utils";

export default function BookStep1Page() {
  const [selected, setSelected] = useState<"family" | "self">("family");

  return (
    <>
      <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
        <Logo />
        <Link href="/" className="text-[13px] text-ink-soft">
          Save and exit
        </Link>
      </nav>

      <ProgressStrip current={1} backHref="/" />

      <div className="mx-auto max-w-[1100px] px-14 py-14 pb-20">
        <header className="mb-9">
          <h1 className="font-serif text-display-md font-normal tracking-tight">
            Who is this session for?
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            We'll customize what comes next based on your answer.
          </p>
        </header>

        <div className="grid gap-3">
          <ChoiceCard
            title="A family member"
            description="My parent, partner, sibling, or someone I'm caring for. You'll book on their behalf with their verbal consent."
            selected={selected === "family"}
            onClick={() => setSelected("family")}
          />
          <ChoiceCard
            title="Myself"
            description="I'm the patient. I'll be in the session."
            selected={selected === "self"}
            onClick={() => setSelected("self")}
          />
        </div>

        <div className="mt-9 flex items-center justify-between">
          <Link href="/" className="text-sm text-ink-soft">
            ← Cancel
          </Link>
          <Link href="/book/care-moment">
            <Button>Continue →</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

function ChoiceCard({
  title,
  description,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex w-full items-center gap-5 rounded-2xl border p-6 text-left transition-all hover:-translate-y-px",
        selected
          ? "border-teal bg-teal-soft"
          : "border-line-soft bg-white hover:border-ink"
      )}
    >
      <div
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-teal bg-teal" : "border-line bg-bg"
        )}
      >
        {selected && <div className="h-2 w-2 rounded-full bg-white" />}
      </div>
      <div>
        <div className="mb-1 text-base font-medium">{title}</div>
        <div className="text-[13px] text-ink-soft">{description}</div>
      </div>
    </button>
  );
}
