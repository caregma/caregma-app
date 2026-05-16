import { z } from "zod";

export const emailSchema = z.string().email().max(254);

export const bookingSchema = z.object({
  relationship: z.enum(["self", "family", "legal_caregiver"]).default("family"),
  relationshipLabel: z.string().trim().max(80).default("family"),
  patientFirstName: z.string().trim().min(1).max(80),
  patientLastInitial: z.string().trim().max(4).default(""),
  patientYearOfBirth: z.coerce.number().int().min(1900).max(new Date().getFullYear()),
  conditionTags: z.array(z.string().trim().min(1).max(80)).default([]),
  isHospitalized: z.coerce.boolean().default(false),
  hospitalAddress: z.string().trim().max(500).optional(),
  serviceType: z.string().trim().min(1).max(120),
  appointmentDate: z.string().datetime(),
  appointmentProvider: z.string().trim().min(1).max(240),
  familyGoals: z.string().trim().min(1).max(4000),
  advocateId: z.string().uuid().optional(),
  scheduledAt: z.string().datetime(),
  durationMin: z.coerce.number().int().min(30).max(180).default(90),
  format: z.enum(["virtual", "phone", "inperson"]).default("virtual"),
  totalCents: z.coerce.number().int().min(0),
});

export const intakeSchema = z.object({
  sessionId: z.string().uuid(),
  concerns: z.string().trim().min(1).max(5000),
  goals: z.array(z.string().trim().min(1).max(500)).min(1).max(20),
  medications: z.string().trim().max(5000).default(""),
  priorVisitNotes: z.string().trim().max(5000).optional(),
  submit: z.coerce.boolean().default(false),
});

export const sessionNoteSchema = z.object({
  sessionId: z.string().uuid(),
  plainLanguageSummary: z.string().trim().min(1).max(8000),
  questionsRaised: z.array(z.string().trim().min(1).max(800)).min(1).max(30),
  suggestedFollowups: z.array(z.string().trim().min(1).max(800)).max(30).default([]),
  submit: z.coerce.boolean().default(false),
});

export const guideApplicationSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: emailSchema,
  phone: z.string().trim().max(40).optional(),
  credentialType: z.enum(["RN", "RN_CERT", "NP", "PharmD", "MD", "LCSW"]),
  licenseNumber: z.string().trim().min(1).max(120),
  licenseState: z.string().trim().min(2).max(80),
  yearsExperience: z.coerce.number().int().min(0).max(70),
  bio: z.string().trim().max(1000).default(""),
  specialtyTags: z.array(z.string().trim().min(1).max(80)).default([]),
  certifications: z.array(z.string().trim().min(1).max(80)).default([]),
  sessionRateCents: z.coerce.number().int().min(0).max(100000),
});
