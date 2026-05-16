// These types mirror the 8-table Supabase schema from the build plan.
// When Slice 2 wires up the real DB, swap the seed-data layer for
// Supabase queries — these types stay the same.

export type UserRole = "family" | "advocate" | "admin";

export type Credential =
  | "RN"
  | "RN_CERT"
  | "NP"
  | "PharmD"
  | "MD"
  | "LCSW";

export type SessionStatus =
  | "pending_payment"
  | "pending_match"
  | "matched"
  | "intake_pending"
  | "ready"
  | "in_progress"
  | "completed"
  | "note_pending"
  | "approved"
  | "cancelled";

export type SessionFormat = "virtual" | "phone" | "inperson";

export type RelationshipType = "self" | "family" | "legal_caregiver";

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  created_at: string;
}

export interface Patient {
  id: string;
  first_name: string;
  last_name_initial: string;
  year_of_birth: number;
  condition_tags: string[]; // PHI
  hospital_address?: string; // Set if currently hospitalized
  is_hospitalized: boolean;
}

export interface PatientRelationship {
  id: string;
  user_id: string;
  patient_id: string;
  relationship: RelationshipType;
  relationship_label: string; // "daughter", "spouse", etc.
  verbal_consent_at: string;
}

export interface AdvocateProfile {
  user_id: string;
  display_name: string;
  initials: string;
  credentials_display: string; // "RN, OCN"
  credential_type: Credential;
  license_number: string;
  license_state: string;
  years_experience: number;
  bio: string;
  specialty_tags: string[];
  certifications: string[];
  session_rate_cents: number;
  nursys_verified_at?: string;
  rating?: number;
  rating_count?: number;
  status: "pending_verification" | "contract_pending" | "active" | "deactivated";
}

export interface Session {
  id: string;
  display_id: string; // "C-2049"
  patient_id: string;
  advocate_id?: string;
  family_user_id: string;
  status: SessionStatus;
  format: SessionFormat;
  scheduled_at: string;
  duration_min: number;
  clinician_rate_cents: number;
  platform_fee_cents: number;
  total_cents: number;
  service_type: string; // "new_diagnosis_consult"
  appointment_date: string;
  appointment_provider: string;
  family_goals: string;
}

export interface Intake {
  session_id: string;
  concerns: string;
  goals: string[];
  medications: string;
  prior_visit_notes?: string;
  submitted_at?: string;
}

export interface SessionNote {
  session_id: string;
  plain_language_summary: string;
  questions_raised: string[];
  suggested_followups: string[];
  submitted_at?: string;
  approved_at?: string;
}

export interface Document {
  id: string;
  display_id: string;
  owner_user_id: string;
  related_session_id?: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  uploaded_at: string;
}
