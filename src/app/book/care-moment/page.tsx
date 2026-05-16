"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ProgressStrip } from "@/components/booking-progress";
import { cn } from "@/lib/utils";

export default function CareMomentPage() {
  const [hospitalized, setHospitalized] = useState(true);

  return (
    <>
      <nav className="flex items-center justify-between border-b border-line-soft bg-bg px-14 py-4">
        <Logo />
        <Link href="/" className="text-[13px] text-ink-soft">
          Save and exit
        </Link>
      </nav>

      <ProgressStrip current={2} backHref="/book" />

      <div className="mx-auto max-w-[1100px] px-14 py-14 pb-20">
        <header className="mb-9">
          <h1 className="font-serif text-display-md font-normal tracking-tight">
            Tell us about the visit.
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            A few details so we can match you with the right care guide.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="field-label">Patient's first name</label>
            <input defaultValue="Patricia" />
          </div>
          <div>
            <label className="field-label">Year of birth</label>
            <input defaultValue="1958" />
          </div>
          <div className="md:col-span-2">
            <label className="field-label">What kind of appointment?</label>
            <select>
              <option>New diagnosis consult — first oncologist visit after diagnosis</option>
              <option>Treatment planning visit</option>
              <option>Second opinion consult</option>
              <option>Post-treatment / surveillance</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="field-label">Cancer type or area of concern</label>
            <select>
              <option>Breast cancer</option>
              <option>Lung cancer</option>
              <option>Colorectal cancer</option>
              <option>Prostate cancer</option>
              <option>Lymphoma</option>
              <option>Other / not sure yet</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="field-label">Is the patient currently hospitalized?</label>
            <div className="mt-1 flex gap-2.5">
              {[
                { val: false, label: "No, at home" },
                { val: true, label: "Yes, currently in hospital" },
              ].map((opt) => (
                <button
                  key={String(opt.val)}
                  type="button"
                  onClick={() => setHospitalized(opt.val)}
                  className={cn(
                    "flex-1 rounded-2xl border p-4 text-left transition-all",
                    hospitalized === opt.val
                      ? "border-teal bg-teal-soft"
                      : "border-line-soft bg-white hover:border-ink"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border-2",
                        hospitalized === opt.val
                          ? "border-teal bg-teal"
                          : "border-line bg-bg"
                      )}
                    >
                      {hospitalized === opt.val && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{opt.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {hospitalized && (
            <div className="md:col-span-2">
              <label className="field-label">Hospital name & room number</label>
              <input defaultValue="Memorial Hermann · Texas Medical Center · Room 4218" />
              <p className="field-hint">
                Saved to Patricia's profile. Your care guide will see this if you
                choose an in-person session.
              </p>
            </div>
          )}

          <div className="md:col-span-2">
            <label className="field-label">
              What do you hope to get from this session?
            </label>
            <textarea
              defaultValue="Help mom understand her diagnosis and prepare questions for the doctor. We're worried about treatment options and want a second opinion."
              className="min-h-[100px]"
            />
            <p className="field-hint">
              Your care guide will read this before the session, so you don't have to
              repeat yourself.
            </p>
          </div>
        </div>

        <div className="mt-9 flex items-center justify-between">
          <Link href="/book" className="text-sm text-ink-soft">
            ← Back
          </Link>
          <Link href="/book/guides">
            <Button>Find care guides →</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
