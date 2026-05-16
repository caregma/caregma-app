import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireServerEnv } from "@/lib/env";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  try {
    const stripe = new Stripe(requireServerEnv("STRIPE_SECRET_KEY"));
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      requireServerEnv("STRIPE_WEBHOOK_SECRET")
    );

    if (event.type === "checkout.session.completed") {
      const checkout = event.data.object;
      const sessionId = checkout.metadata?.session_id;
      if (sessionId) {
        const supabase = createSupabaseAdminClient();
        const { data: session, error: sessionError } = await supabase
          .from("sessions")
          .select("family_user_id")
          .eq("id", sessionId)
          .single();
        if (sessionError) throw new Error(sessionError.message);

        await supabase
          .from("sessions")
          .update({ status: "pending_match" })
          .eq("id", sessionId);
        await supabase.from("payments").insert({
          session_id: sessionId,
          family_user_id: session.family_user_id,
          stripe_checkout_session_id: checkout.id,
          stripe_payment_intent_id:
            typeof checkout.payment_intent === "string" ? checkout.payment_intent : null,
          amount_cents: checkout.amount_total ?? 0,
          status: "paid",
          paid_at: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook failed" },
      { status: 400 }
    );
  }
}
