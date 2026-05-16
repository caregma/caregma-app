import { unstable_noStore as noStore } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdvocateProfile, Document, Intake, Patient, Session, SessionNote } from "@/lib/types";
import * as seed from "@/lib/seed-data";

function shouldUseSeedData() {
  return !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export async function listActiveAdvocates(): Promise<AdvocateProfile[]> {
  noStore();
  if (shouldUseSeedData()) return seed.advocates;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("advocate_profiles")
    .select("*")
    .eq("status", "active")
    .order("display_name");

  if (error) throw new Error(error.message);
  return data.map(mapAdvocate);
}

export async function listPendingApplicants(): Promise<AdvocateProfile[]> {
  noStore();
  if (shouldUseSeedData()) return seed.pendingApplicants;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("advocate_profiles")
    .select("*")
    .in("status", ["pending_verification", "contract_pending"])
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data.map(mapAdvocate);
}

export async function getAdvocateById(userId: string): Promise<AdvocateProfile | undefined> {
  noStore();
  if (shouldUseSeedData()) return seed.getAdvocateById(userId);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("advocate_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? mapAdvocate(data) : undefined;
}

export async function getSessionsForFamily(userId: string): Promise<Session[]> {
  noStore();
  if (shouldUseSeedData()) return seed.getSessionsForFamily(userId);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("family_user_id", userId)
    .order("scheduled_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data.map(mapSession);
}

export async function getSessionsForAdvocate(userId: string): Promise<Session[]> {
  noStore();
  if (shouldUseSeedData()) return seed.getSessionsForAdvocate(userId);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("advocate_id", userId)
    .order("scheduled_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data.map(mapSession);
}

export async function getPatientById(id: string): Promise<Patient | undefined> {
  noStore();
  if (shouldUseSeedData()) return seed.getPatientById(id);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data
    ? {
        id: data.id,
        first_name: data.first_name,
        last_name_initial: data.last_name_initial,
        year_of_birth: data.year_of_birth,
        condition_tags: data.condition_tags,
        hospital_address: data.hospital_address ?? undefined,
        is_hospitalized: data.is_hospitalized,
      }
    : undefined;
}

export async function listDocumentsForUser(userId: string): Promise<Document[]> {
  noStore();
  if (shouldUseSeedData()) return seed.documents.filter((doc) => doc.owner_user_id === userId);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("owner_user_id", userId)
    .order("uploaded_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data.map((doc) => ({
    id: doc.id,
    display_id: doc.display_id,
    owner_user_id: doc.owner_user_id,
    related_session_id: doc.related_session_id ?? undefined,
    filename: doc.filename,
    mime_type: doc.mime_type,
    size_bytes: doc.size_bytes,
    uploaded_at: doc.uploaded_at,
  }));
}

export async function getIntakeForSession(sessionId: string): Promise<Intake | undefined> {
  noStore();
  if (shouldUseSeedData()) return seed.intakes.find((intake) => intake.session_id === sessionId);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("intakes")
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data
    ? {
        session_id: data.session_id,
        concerns: data.concerns,
        goals: data.goals,
        medications: data.medications,
        prior_visit_notes: data.prior_visit_notes ?? undefined,
        submitted_at: data.submitted_at ?? undefined,
      }
    : undefined;
}

export async function getSessionNote(sessionId: string): Promise<SessionNote | undefined> {
  noStore();
  if (shouldUseSeedData()) return seed.sessionNotes.find((note) => note.session_id === sessionId);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("session_notes")
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data
    ? {
        session_id: data.session_id,
        plain_language_summary: data.plain_language_summary,
        questions_raised: data.questions_raised,
        suggested_followups: data.suggested_followups,
        submitted_at: data.submitted_at ?? undefined,
        approved_at: data.approved_at ?? undefined,
      }
    : undefined;
}

function mapAdvocate(row: {
  user_id: string;
  display_name: string;
  initials: string;
  credentials_display: string;
  credential_type: AdvocateProfile["credential_type"];
  license_number: string;
  license_state: string;
  years_experience: number;
  bio: string;
  specialty_tags: string[];
  certifications: string[];
  session_rate_cents: number;
  nursys_verified_at: string | null;
  rating: number | null;
  rating_count: number | null;
  status: AdvocateProfile["status"];
}): AdvocateProfile {
  return {
    ...row,
    nursys_verified_at: row.nursys_verified_at ?? undefined,
    rating: row.rating ?? undefined,
    rating_count: row.rating_count ?? undefined,
  };
}

function mapSession(row: {
  id: string;
  display_id: string;
  patient_id: string;
  advocate_id: string | null;
  family_user_id: string;
  status: Session["status"];
  format: Session["format"];
  scheduled_at: string;
  duration_min: number;
  clinician_rate_cents: number;
  platform_fee_cents: number;
  total_cents: number;
  service_type: string;
  appointment_date: string;
  appointment_provider: string;
  family_goals: string;
}): Session {
  return {
    ...row,
    advocate_id: row.advocate_id ?? undefined,
  };
}
