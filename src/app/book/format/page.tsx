"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ProgressStrip } from "@/components/booking-progress";
import { cn } from "@/lib/utils";

type Format = "virtual" | "phone" | "inperson";

export default function FormatPage() {
  const [format, setFormat] = useState<Format>("virtual");

  return (
    <>
      <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
        <Logo />
        <Link href="/" className="text-[13px] text-ink-soft">
          Save and exit
        </Link>
      </nav>

      <ProgressStrip current={5} backHref="/book/schedule" />

      <div className="mx-auto max-w-[1100px] px-14 py-14 pb-20">
        <header className="mb-9">
          <h1 className="font-serif text-display-md font-normal tracking-tight">
            How would you like to meet?
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Choose what works best for Patricia and your family. You can change this
            up to 2 hours before the session.
          </p>
        </header>

        <div className="space-y-3">
          <FormatCard
            icon="🎥"
            title="Video call"
            badge="Most popular"
            desc="Sarah joins via secure video link. Best when family members can gather around a single screen. Link arrives 1 hour before the session."
            selected={format === "virtual"}
            onClick={() => setFormat("virtual")}
          />
          <FormatCard
            icon="📞"
            title="Phone call"
            desc="Sarah calls the number on Patricia's intake form. No tech setup, no video. Good for older patients or anywhere with weaker internet."
            selected={format === "phone"}
            onClick={() => setFormat("phone")}
          />
          <FormatCard
            icon="🏥"
            title="In person at the hospital"
            badge="Patricia is hospitalized"
            badgeTone="warn"
            desc="Sarah meets Patricia at her bedside. Travel time may apply. We've pre-filled the hospital address from her profile — she only needs to confirm her room before the session."
            selected={format === "inperson"}
            onClick={() => setFormat("inperson")}
          />
        </div>

        {format === "virtual" && (
          <DetailBlock title="🎥 Video session details">
            <p className="text-sm leading-relaxed">
              Both Patricia and Sarah will receive a secure video link 1 hour before
              the session. The link works in any browser — no app to install. You can
              join from a computer, tablet, or phone.
            </p>
            <p className="field-hint mt-2.5">
              Need help testing your setup? We'll send a test link 24 hours before so
              you can make sure it works.
            </p>
          </DetailBlock>
        )}

        {format === "phone" && (
          <DetailBlock title="📞 Phone number Sarah will call">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="field-label">Patient's phone</label>
                <input defaultValue="(512) 555-0192" />
              </div>
              <div>
                <label className="field-label">Backup contact (optional)</label>
                <input defaultValue="Emma (daughter) · (512) 555-0114" />
              </div>
            </div>
          </DetailBlock>
        )}

        {format === "inperson" && (
          <DetailBlock title="📍 Hospital location on file">
            <div className="mb-1 text-[15px] font-medium">
              Memorial Hermann · Texas Medical Center
            </div>
            <div className="text-sm text-ink-soft">
              6411 Fannin St, Houston, TX 77030 · Room 4218 (Oncology)
            </div>
            <p className="field-hint mt-2.5">
              Sarah will check in at the nurses' station and bring a temporary visitor
              ID. If Patricia is moved to a different room, you can update it any time
              before the session.
            </p>
          </DetailBlock>
        )}

        <div className="mt-9 flex items-center justify-between">
          <Link href="/book/schedule" className="text-sm text-ink-soft">
            ← Back
          </Link>
          <Link href="/book/confirmed">
            <Button>Continue to payment →</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

function FormatCard({
  icon,
  title,
  badge,
  badgeTone = "teal",
  desc,
  selected,
  onClick,
}: {
  icon: string;
  title: string;
  badge?: string;
  badgeTone?: "teal" | "warn";
  desc: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-5 rounded-2xl border p-6 text-left transition-all hover:-translate-y-px",
        selected ? "border-teal bg-teal-soft" : "border-line-soft bg-white hover:border-ink"
      )}
    >
      <div
        className={cn(
          "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-teal bg-teal" : "border-line bg-bg"
        )}
      >
        {selected && <div className="h-2 w-2 rounded-full bg-white" />}
      </div>
      <div className="flex-1">
        <div className="mb-1.5 flex items-center gap-2.5">
          <div className="text-base font-medium">
            {icon} {title}
          </div>
          {badge && (
            <span className={cn("tag", badgeTone === "warn" ? "tag-warn" : "tag-teal")}>
              {badge}
            </span>
          )}
        </div>
        <div className="text-[13px] leading-relaxed text-ink-soft">{desc}</div>
      </div>
    </button>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-2xl bg-bg-alt p-5">
      <div className="eyebrow mb-2.5">{title}</div>
      {children}
    </div>
  );
}
