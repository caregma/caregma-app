import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/backend/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sessionNoteSchema } from "@/lib/backend/schemas";

export async function POST(request: Request) {
  try {
    const profile = await requireApiRole("advocate");
    const payload = sessionNoteSchema.parse(await request.json());
    const supabase = await createSupabaseServerClient();

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("id,advocate_id")
      .eq("id", payload.sessionId)
      .single();

    if (sessionError) throw new Error(sessionError.message);
    if (session.advocate_id !== profile.id) throw new Error("Not authorized for this session.");

    const { data, error } = await supabase
      .from("session_notes")
      .upsert({
        session_id: payload.sessionId,
        plain_language_summary: payload.plainLanguageSummary,
        questions_raised: payload.questionsRaised,
        suggested_followups: payload.suggestedFollowups,
        submitted_at: payload.submit ? new Date().toISOString() : null,
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);

    if (payload.submit) {
      await supabase
        .from("sessions")
        .update({ status: "note_pending" })
        .eq("id", payload.sessionId);
    }

    return NextResponse.json({ note: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save note" },
      { status: 400 }
    );
  }
}
