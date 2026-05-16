import Stripe from "stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOptionalServerEnv, getPublicEnv } from "@/lib/env";
import { bookingSchema } from "./schemas";

export async function createBooking(input: unknown, familyUserId: string) {
  const payload = bookingSchema.parse(input);
  const supabase = await createSupabaseServerClient();

  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .insert({
      first_name: payload.patientFirstName,
      last_name_initial: payload.patientLastInitial,
      year_of_birth: payload.patientYearOfBirth,
      condition_tags: payload.conditionTags,
      hospital_address: payload.isHospitalized ? payload.hospitalAddress ?? null : null,
      is_hospitalized: payload.isHospitalized,
    })
    .select("id")
    .single();

  if (patientError) throw new Error(patientError.message);

  await supabase.from("patient_relationships").insert({
    user_id: familyUserId,
    patient_id: patient.id,
    relationship: payload.relationship,
    relationship_label: payload.relationshipLabel,
    verbal_consent_at: new Date().toISOString(),
  });

  const platformFeeCents = Math.round(payload.totalCents * 0.2);
  const clinicianRateCents = payload.totalCents - platformFeeCents;

  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .insert({
      patient_id: patient.id,
      advocate_id: payload.advocateId ?? null,
      family_user_id: familyUserId,
      status: payload.advocateId ? "matched" : "pending_match",
      format: payload.format,
      scheduled_at: payload.scheduledAt,
      duration_min: payload.durationMin,
      clinician_rate_cents: clinicianRateCents,
      platform_fee_cents: platformFeeCents,
      total_cents: payload.totalCents,
      service_type: payload.serviceType,
      appointment_date: payload.appointmentDate,
      appointment_provider: payload.appointmentProvider,
      family_goals: payload.familyGoals,
    })
    .select("*")
    .single();

  if (sessionError) throw new Error(sessionError.message);

  const checkoutUrl = await maybeCreateStripeCheckout(session.id, payload.totalCents);
  return { session, checkoutUrl };
}

async function maybeCreateStripeCheckout(sessionId: string, totalCents: number) {
  const secretKey = getOptionalServerEnv("STRIPE_SECRET_KEY");
  if (!secretKey) return null;

  const siteUrl = getPublicEnv().siteUrl;
  const stripe = new Stripe(secretKey);
  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: totalCents,
          product_data: {
            name: "Caregma care guide session",
          },
        },
      },
    ],
    success_url: `${siteUrl}/book/confirmed?session_id=${sessionId}`,
    cancel_url: `${siteUrl}/book/format?session_id=${sessionId}`,
    metadata: {
      session_id: sessionId,
    },
  });

  const supabase = await createSupabaseServerClient();
  await supabase
    .from("sessions")
    .update({ stripe_checkout_session_id: checkout.id })
    .eq("id", sessionId);

  return checkout.url;
}
