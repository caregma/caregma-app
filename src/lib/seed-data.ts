import type {
  AdvocateProfile,
  Document,
  Intake,
  Patient,
  PatientRelationship,
  Session,
  SessionNote,
  User,
} from "./types";

// =========================================
// USERS
// =========================================
export const users: Record<string, User> = {
  "u-emma": {
    id: "u-emma",
    email: "emma.park@gmail.com",
    full_name: "Emma M. Park",
    phone: "(512) 555-0192",
    role: "family",
    created_at: "2026-04-20T14:00:00Z",
  },
  "u-sarah": {
    id: "u-sarah",
    email: "sarah.reyes@gmail.com",
    full_name: "Sarah Reyes",
    role: "advocate",
    created_at: "2026-03-04T10:00:00Z",
  },
  "u-admin": {
    id: "u-admin",
    email: "admin@caregma.com",
    full_name: "Emma Park",
    role: "admin",
    created_at: "2026-02-01T08:00:00Z",
  },
};

// =========================================
// PATIENTS
// =========================================
export const patients: Record<string, Patient> = {
  "p-patricia": {
    id: "p-patricia",
    first_name: "Patricia",
    last_name_initial: "M.",
    year_of_birth: 1958,
    condition_tags: ["breast_cancer", "stage_iii"],
    hospital_address:
      "Memorial Hermann · Texas Medical Center · 6411 Fannin St, Houston, TX 77030 · Room 4218",
    is_hospitalized: true,
  },
};

export const patientRelationships: PatientRelationship[] = [
  {
    id: "pr-1",
    user_id: "u-emma",
    patient_id: "p-patricia",
    relationship: "family",
    relationship_label: "daughter",
    verbal_consent_at: "2026-04-22T16:00:00Z",
  },
];

// =========================================
// CARE GUIDES
// =========================================
export const advocates: AdvocateProfile[] = [
  {
    user_id: "u-sarah",
    display_name: "Sarah Reyes",
    initials: "SR",
    credentials_display: "RN, OCN",
    credential_type: "RN_CERT",
    license_number: "TX RN #284619",
    license_state: "Texas",
    years_experience: 14,
    bio:
      "I help families slow down and feel ready for the next appointment. We'll build your question list together, and I'll join the visit if you'd like.",
    specialty_tags: ["breast", "gyn"],
    certifications: ["OCN"],
    session_rate_cents: 24900,
    nursys_verified_at: "2026-04-22T00:00:00Z",
    rating: 4.9,
    rating_count: 14,
    status: "active",
  },
  {
    user_id: "u-rachel",
    display_name: "Dr. Rachel Patel",
    initials: "RP",
    credentials_display: "MD",
    credential_type: "MD",
    license_number: "TX MD #L7204",
    license_state: "Texas",
    years_experience: 9,
    bio:
      "I help families understand what's in their pathology report and what questions to ask their treating oncologist. I won't second-guess your doctor's plan — I'll help you engage with it.",
    specialty_tags: ["breast", "gyn"],
    certifications: ["Board-certified"],
    session_rate_cents: 39900,
    nursys_verified_at: "2026-04-15T00:00:00Z",
    rating: 4.8,
    rating_count: 8,
    status: "active",
  },
  {
    user_id: "u-marcus",
    display_name: "Marcus Nguyen",
    initials: "MN",
    credentials_display: "NP-C",
    credential_type: "NP",
    license_number: "TX APRN #N3812",
    license_state: "Texas",
    years_experience: 11,
    bio:
      "My focus is helping you understand what the care team is recommending — and why — so the decision feels like yours, not theirs.",
    specialty_tags: ["lung", "colorectal"],
    certifications: [],
    session_rate_cents: 27900,
    nursys_verified_at: "2026-04-08T00:00:00Z",
    rating: 4.7,
    rating_count: 11,
    status: "active",
  },
  {
    user_id: "u-linda",
    display_name: "Linda Torres",
    initials: "LT",
    credentials_display: "PharmD, BCOP",
    credential_type: "PharmD",
    license_number: "TX RPh #P9214",
    license_state: "Texas",
    years_experience: 12,
    bio:
      "I'm here when you have questions about chemo regimens, side effects, or how your other medications interact. I won't change your prescriptions — I help you have a smarter conversation with your prescriber.",
    specialty_tags: ["chemo", "drug_interactions"],
    certifications: ["BCOP"],
    session_rate_cents: 22900,
    nursys_verified_at: "2026-03-30T00:00:00Z",
    rating: 4.9,
    rating_count: 6,
    status: "active",
  },
  {
    user_id: "u-diane",
    display_name: "Diane Wilson",
    initials: "DW",
    credentials_display: "LCSW",
    credential_type: "LCSW",
    license_number: "TX LCSW #SW4421",
    license_state: "Texas",
    years_experience: 16,
    bio:
      "A new diagnosis isn't just medical — it's emotional, financial, and logistical. I help families navigate all of it without losing themselves in the process.",
    specialty_tags: ["family_support", "emotional_navigation"],
    certifications: [],
    session_rate_cents: 16900,
    nursys_verified_at: "2026-04-01T00:00:00Z",
    rating: 4.8,
    rating_count: 9,
    status: "active",
  },
];

export const pendingApplicants: AdvocateProfile[] = [
  {
    user_id: "u-margaret",
    display_name: "Margaret O'Brien",
    initials: "MO",
    credentials_display: "RN",
    credential_type: "RN_CERT",
    license_number: "TX RN #281449",
    license_state: "Texas",
    years_experience: 18,
    bio:
      "After 18 years on inpatient oncology, I want to give families more than the 7 minutes we have at bedside. I take pride in slowing down and meeting people where they are.",
    specialty_tags: ["breast", "lung", "lymphoma"],
    certifications: ["OCN (pending verification)"],
    session_rate_cents: 22900,
    status: "pending_verification",
  },
  {
    user_id: "u-thomas",
    display_name: "Thomas Castro",
    initials: "TC",
    credentials_display: "RN, BSN",
    credential_type: "RN",
    license_number: "TX RN #198777",
    license_state: "Texas",
    years_experience: 11,
    bio:
      "I bring 11 years of inpatient oncology nursing to the conversation, with a focus on prostate and lymphoma cases.",
    specialty_tags: ["prostate", "lymphoma"],
    certifications: [],
    session_rate_cents: 17900,
    nursys_verified_at: "2026-05-13T00:00:00Z",
    status: "contract_pending",
  },
];

// =========================================
// SESSIONS
// =========================================
export const sessions: Session[] = [
  {
    id: "s-2049",
    display_id: "C-2049",
    patient_id: "p-patricia",
    advocate_id: "u-sarah",
    family_user_id: "u-emma",
    status: "intake_pending",
    format: "virtual",
    scheduled_at: "2026-05-17T19:00:00Z",
    duration_min: 90,
    clinician_rate_cents: 19920,
    platform_fee_cents: 4980,
    total_cents: 24900,
    service_type: "new_diagnosis_consult",
    appointment_date: "2026-05-18T15:00:00Z",
    appointment_provider: "Dr. Chen — Memorial Hermann oncology",
    family_goals:
      "Help mom understand her diagnosis and prepare questions for the doctor. We're worried about treatment options and want a second opinion.",
  },
  {
    id: "s-2045",
    display_id: "C-2045",
    patient_id: "p-patricia",
    advocate_id: "u-sarah",
    family_user_id: "u-emma",
    status: "note_pending",
    format: "virtual",
    scheduled_at: "2026-05-13T19:00:00Z",
    duration_min: 90,
    clinician_rate_cents: 19920,
    platform_fee_cents: 4980,
    total_cents: 24900,
    service_type: "second_opinion_prep",
    appointment_date: "2026-05-14T15:00:00Z",
    appointment_provider: "Dr. Lewis — second opinion",
    family_goals: "Prepare for second opinion visit",
  },
  {
    id: "s-2040",
    display_id: "C-2040",
    patient_id: "p-patricia",
    advocate_id: "u-sarah",
    family_user_id: "u-emma",
    status: "approved",
    format: "virtual",
    scheduled_at: "2026-04-28T18:00:00Z",
    duration_min: 90,
    clinician_rate_cents: 19920,
    platform_fee_cents: 4980,
    total_cents: 24900,
    service_type: "new_diagnosis_consult",
    appointment_date: "2026-04-29T14:00:00Z",
    appointment_provider: "Dr. Chen — initial consult",
    family_goals: "Understand the diagnosis",
  },
];

// =========================================
// INTAKE / NOTES / DOCS
// =========================================
export const intakes: Intake[] = [
  {
    session_id: "s-2049",
    concerns:
      "Mom was just diagnosed with stage III breast cancer. She's overwhelmed and we don't know what questions to ask.",
    goals: [
      'Understand what "stage III" means for treatment options',
      "Prepare questions about chemotherapy vs surgery timing",
      "Decide whether to seek a second opinion",
      "Help mom feel less overwhelmed before the visit",
    ],
    medications:
      "Lisinopril 10mg daily · Metformin 500mg 2x daily · Atorvastatin 20mg nightly · Levothyroxine 50mcg morning",
    prior_visit_notes:
      "Initial diagnosis at radiology imaging follow-up. Biopsy confirmed last week.",
    submitted_at: "2026-05-14T22:00:00Z",
  },
];

export const sessionNotes: SessionNote[] = [
  {
    session_id: "s-2040",
    plain_language_summary:
      'We reviewed Patricia\'s pathology report and discussed what "stage III breast cancer" means in terms of the cancer\'s spread to nearby lymph nodes. We talked through the general sequence of treatment decisions she\'ll face — typically surgery, chemotherapy, and radiation, though the order varies. I helped her draft questions about timing and second opinions for Dr. Chen.',
    questions_raised: [
      "What stage and subtype is this, in your words?",
      "What treatment options will you discuss, and in what order?",
      "What's the typical timeline from today to starting treatment?",
      "Is a second opinion something patients in this situation pursue?",
    ],
    suggested_followups: [
      "Ask the clinic about social worker support during treatment planning",
      "Bring a family member to the May 18 visit to take notes",
      "Request a written treatment plan summary from Dr. Chen's office",
    ],
    submitted_at: "2026-04-28T20:00:00Z",
    approved_at: "2026-04-29T09:00:00Z",
  },
];

export const documents: Document[] = [
  {
    id: "d-022",
    display_id: "DOC-022",
    owner_user_id: "u-emma",
    related_session_id: "s-2049",
    filename: "Pathology report.pdf",
    mime_type: "application/pdf",
    size_bytes: 2_400_000,
    uploaded_at: "2026-05-14T18:00:00Z",
  },
  {
    id: "d-021",
    display_id: "DOC-021",
    owner_user_id: "u-emma",
    related_session_id: "s-2049",
    filename: "Medication list photo.jpg",
    mime_type: "image/jpeg",
    size_bytes: 880_000,
    uploaded_at: "2026-05-14T17:30:00Z",
  },
];

// =========================================
// HELPERS
// =========================================
export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}

export function formatCentsDecimal(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function getCurrentUser(): User {
  return users["u-emma"];
}

export function getAdvocateById(userId: string): AdvocateProfile | undefined {
  return [...advocates, ...pendingApplicants].find(
    (a) => a.user_id === userId
  );
}

export function getPatientById(id: string): Patient | undefined {
  return patients[id];
}

export function getSessionsForFamily(userId: string): Session[] {
  return sessions.filter((s) => s.family_user_id === userId);
}

export function getSessionsForAdvocate(userId: string): Session[] {
  return sessions.filter((s) => s.advocate_id === userId);
}
