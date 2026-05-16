import Link from "next/link";
import { TopNav } from "@/components/top-nav";
import { Button } from "@/components/ui/button";

export default async function LoginSentPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const email = params.email || "your email";

  return (
    <>
      <TopNav />
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        <div className="max-w-[440px] p-10 text-center">
          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-teal-soft text-4xl text-teal">
            ✉
          </div>
          <h2 className="mb-3 font-serif text-[28px] font-medium">Check your email.</h2>
          <p className="leading-relaxed text-ink-soft">
            We sent a sign-in link to <b className="text-ink">{email}</b>. Click the
            link from any device — it expires in 15 minutes.
          </p>

          <div className="mt-8 rounded-xl bg-bg-alt p-5 text-left text-[13px] text-ink-soft">
            <div className="mb-1 font-medium text-ink">Didn't get it?</div>
            Check your spam folder, or{" "}
            <Link href="/login" className="border-b border-teal text-teal">
              try a different email
            </Link>
            .
          </div>

          <Link href="/dashboard">
            <Button variant="secondary" className="mt-6">
              Continue (demo) →
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
