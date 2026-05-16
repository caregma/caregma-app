export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string | null;
          role: "family" | "advocate" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string;
          phone?: string | null;
          role?: "family" | "advocate" | "admin";
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      patients: {
        Row: {
          id: string;
          first_name: string;
          last_name_initial: string;
          year_of_birth: number;
          condition_tags: string[];
          hospital_address: string | null;
          is_hospitalized: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name_initial?: string;
          year_of_birth: number;
          condition_tags?: string[];
          hospital_address?: string | null;
          is_hospitalized?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["patients"]["Insert"]>;
      };
      patient_relationships: {
        Row: {
          id: string;
          user_id: string;
          patient_id: string;
          relationship: "self" | "family" | "legal_caregiver";
          relationship_label: string;
          verbal_consent_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          patient_id: string;
          relationship: "self" | "family" | "legal_caregiver";
          relationship_label?: string;
          verbal_consent_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["patient_relationships"]["Insert"]>;
      };
      advocate_profiles: {
        Row: {
          user_id: string;
          display_name: string;
          initials: string;
          credentials_display: string;
          credential_type: "RN" | "RN_CERT" | "NP" | "PharmD" | "MD" | "LCSW";
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
          status: "pending_verification" | "contract_pending" | "active" | "deactivated";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          display_name: string;
          initials: string;
          credentials_display: string;
          credential_type: "RN" | "RN_CERT" | "NP" | "PharmD" | "MD" | "LCSW";
          license_number: string;
          license_state: string;
          years_experience: number;
          bio?: string;
          specialty_tags?: string[];
          certifications?: string[];
          session_rate_cents: number;
          status?: "pending_verification" | "contract_pending" | "active" | "deactivated";
        };
        Update: Partial<Database["public"]["Tables"]["advocate_profiles"]["Insert"]>;
      };
      sessions: {
        Row: {
          id: string;
          display_id: string;
          patient_id: string;
          advocate_id: string | null;
          family_user_id: string;
          status:
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
          format: "virtual" | "phone" | "inperson";
          scheduled_at: string;
          duration_min: number;
          clinician_rate_cents: number;
          platform_fee_cents: number;
          total_cents: number;
          service_type: string;
          appointment_date: string;
          appointment_provider: string;
          family_goals: string;
          stripe_checkout_session_id: string | null;
          daily_room_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          display_id?: string;
          patient_id: string;
          advocate_id?: string | null;
          family_user_id: string;
          status?:
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
          format: "virtual" | "phone" | "inperson";
          scheduled_at: string;
          duration_min: number;
          clinician_rate_cents: number;
          platform_fee_cents: number;
          total_cents: number;
          service_type: string;
          appointment_date: string;
          appointment_provider: string;
          family_goals: string;
          stripe_checkout_session_id?: string | null;
          daily_room_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["sessions"]["Insert"]>;
      };
      intakes: {
        Row: {
          session_id: string;
          concerns: string;
          goals: string[];
          medications: string;
          prior_visit_notes: string | null;
          submitted_at: string | null;
          updated_at: string;
        };
        Insert: {
          session_id: string;
          concerns: string;
          goals: string[];
          medications: string;
          prior_visit_notes?: string | null;
          submitted_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["intakes"]["Insert"]>;
      };
      session_notes: {
        Row: {
          session_id: string;
          plain_language_summary: string;
          questions_raised: string[];
          suggested_followups: string[];
          submitted_at: string | null;
          approved_at: string | null;
          returned_at: string | null;
          qa_feedback: string | null;
          updated_at: string;
        };
        Insert: {
          session_id: string;
          plain_language_summary: string;
          questions_raised: string[];
          suggested_followups: string[];
          submitted_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["session_notes"]["Insert"]> & {
          approved_at?: string | null;
          returned_at?: string | null;
          qa_feedback?: string | null;
        };
      };
      documents: {
        Row: {
          id: string;
          display_id: string;
          owner_user_id: string;
          related_session_id: string | null;
          filename: string;
          storage_path: string;
          mime_type: string;
          size_bytes: number;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          display_id?: string;
          owner_user_id: string;
          related_session_id?: string | null;
          filename: string;
          storage_path: string;
          mime_type: string;
          size_bytes: number;
        };
        Update: Partial<Database["public"]["Tables"]["documents"]["Insert"]>;
      };
      advocate_availability_blocks: {
        Row: {
          id: string;
          advocate_id: string;
          weekday: number;
          start_time: string;
          end_time: string;
          timezone: string;
          repeats_weekly: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          advocate_id: string;
          weekday: number;
          start_time: string;
          end_time: string;
          timezone?: string;
          repeats_weekly?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["advocate_availability_blocks"]["Insert"]>;
      };
      advocate_time_off: {
        Row: {
          id: string;
          advocate_id: string;
          starts_on: string;
          ends_on: string;
          reason: string | null;
          sync_to_calendar: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          advocate_id: string;
          starts_on: string;
          ends_on: string;
          reason?: string | null;
          sync_to_calendar?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["advocate_time_off"]["Insert"]>;
      };
      calendar_connections: {
        Row: {
          id: string;
          advocate_id: string;
          provider: string;
          provider_account_email: string | null;
          encrypted_refresh_token: string | null;
          last_synced_at: string | null;
          disconnected_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          advocate_id: string;
          provider: string;
          provider_account_email?: string | null;
          encrypted_refresh_token?: string | null;
          last_synced_at?: string | null;
          disconnected_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["calendar_connections"]["Insert"]>;
      };
      payments: {
        Row: {
          id: string;
          display_id: string;
          session_id: string;
          family_user_id: string;
          stripe_payment_intent_id: string | null;
          stripe_checkout_session_id: string | null;
          amount_cents: number;
          status: "pending" | "paid" | "failed" | "refunded" | "partially_refunded";
          paid_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          display_id?: string;
          session_id: string;
          family_user_id: string;
          stripe_payment_intent_id?: string | null;
          stripe_checkout_session_id?: string | null;
          amount_cents: number;
          status?: "pending" | "paid" | "failed" | "refunded" | "partially_refunded";
          paid_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
      };
      payouts: {
        Row: {
          id: string;
          display_id: string;
          advocate_id: string;
          session_id: string | null;
          amount_cents: number;
          status: "blocked" | "ready" | "scheduled" | "paid" | "failed";
          stripe_transfer_id: string | null;
          scheduled_for: string | null;
          paid_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          display_id?: string;
          advocate_id: string;
          session_id?: string | null;
          amount_cents: number;
          status?: "blocked" | "ready" | "scheduled" | "paid" | "failed";
          stripe_transfer_id?: string | null;
          scheduled_for?: string | null;
          paid_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["payouts"]["Insert"]>;
      };
      refunds: {
        Row: {
          id: string;
          display_id: string;
          session_id: string;
          requested_by: string;
          amount_cents: number;
          reason: string;
          status: "pending" | "approved" | "rejected" | "processed";
          stripe_refund_id: string | null;
          processed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          display_id?: string;
          session_id: string;
          requested_by: string;
          amount_cents: number;
          reason: string;
          status?: "pending" | "approved" | "rejected" | "processed";
          stripe_refund_id?: string | null;
          processed_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["refunds"]["Insert"]>;
      };
      platform_settings: {
        Row: {
          key: string;
          value: Json;
          updated_by: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          updated_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["platform_settings"]["Insert"]>;
      };
      audit_events: {
        Row: {
          id: string;
          actor_user_id: string | null;
          action: string;
          entity_table: string;
          entity_id: string;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_user_id?: string | null;
          action: string;
          entity_table: string;
          entity_id: string;
          metadata?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["audit_events"]["Insert"]>;
      };
    };
  };
}
