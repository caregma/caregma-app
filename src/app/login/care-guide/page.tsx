"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TopNav } from "@/components/top-nav";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function GoogleLogo() {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}

export default function CareGuideLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("sarah.reyes@gmail.com");

  async function handleGoogle() {
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/advocate`,
          queryParams: { prompt: "select_account" },
        },
      });
    } catch {
      router.push("/advocate");
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/advocate`,
          data: { role: "advocate" },
        },
      });
      if (error) throw error;
    } catch {
      // Keep the prototype navigable before Supabase env vars are configured.
    }
    router.push("/advocate");
  }

  return (
    <>
      <TopNav
        rightContent={
          <>
            <span className="text-[13px] text-ink-soft">New here?</span>
            <Link href="/for-guides">
              <Button variant="secondary" size="sm">
                Apply to join →
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid min-h-[calc(100vh-100px)] grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center p-10">
          <div className="w-full max-w-[380px]">
            <div className="eyebrow">Care guide log in</div>
            <h1 className="mt-3 font-serif text-[36px] font-normal leading-tight tracking-tight">
              Welcome back, clinician.
            </h1>
            <p className="mb-8 mt-3 text-sm text-ink-soft">
              Sign in with the email you used to apply.
            </p>

            <button
              onClick={handleGoogle}
              className="mb-3 flex w-full items-center justify-center gap-3 rounded-full border border-line bg-white p-3.5 text-sm font-medium transition-colors hover:bg-bg-alt"
            >
              <GoogleLogo />
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3 text-xs text-ink-faint">
              <div className="h-px flex-1 bg-line" />
              <span>or</span>
              <div className="h-px flex-1 bg-line" />
            </div>

            <form
              onSubmit={handleMagicLink}
            >
              <label className="field-label">Your email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="teal" type="submit" className="mt-3 w-full">
                Send me a sign-in link →
              </Button>
            </form>

            <div className="mt-9 border-t border-line-soft pt-5 text-center text-[13px] text-ink-soft">
              Family member booking a session?{" "}
              <Link href="/login" className="border-b border-teal text-teal">
                Sign in here
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-ink p-10 text-[#E8E2D2]">
          <div className="max-w-[400px]">
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[1.5px] text-teal-accent">
              Care guide portal
            </div>
            <div className="mb-6 font-serif text-[22px] italic leading-relaxed">
              "I get to do the kind of nursing I went into the field for — actually
              being with families when they need someone clinical to help them think."
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-accent text-sm font-semibold text-ink">
                SR
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  Sarah Reyes, RN, OCN
                </div>
                <div className="text-xs text-[#B0B7B9]">
                  14 years oncology · Care guide since Mar 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
