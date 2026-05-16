import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/backend/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { intakeSchema } from "@/lib/backend/schemas";

export async function POST(request: Request) {
  try {
    const profile = await requireApiRole("family");
    const payload = intakeSchema.parse(await request.json());
    const supabase = await createSupabaseServerClient();

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("id,family_user_id")
      .eq("id", payload.sessionId)
      .single();

    if (sessionError) throw new Error(sessionError.message);
    if (session.family_user_id !== profile.id) throw new Error("Not authorized for this session.");

    const { data, error } = await supabase
      .from("intakes")
      .upsert({
        session_id: payload.sessionId,
        concerns: payload.concerns,
        goals: payload.goals,
        medications: payload.medications,
        prior_visit_notes: payload.priorVisitNotes ?? null,
        submitted_at: payload.submit ? new Date().toISOString() : null,
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    if (payload.submit) {
      await supabase.from("sessions").update({ status: "ready" }).eq("id", payload.sessionId);
    }

    return NextResponse.json({ intake: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save intake" },
      { status: 400 }
    );
  }
}
