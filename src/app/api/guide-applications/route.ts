import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { guideApplicationSchema } from "@/lib/backend/schemas";

export async function POST(request: Request) {
  try {
    const payload = guideApplicationSchema.parse(await request.json());
    const supabase = createSupabaseAdminClient();

    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email: payload.email,
      phone: payload.phone,
      email_confirm: true,
      user_metadata: {
        full_name: `${payload.firstName} ${payload.lastName}`,
        role: "advocate",
      },
    });

    if (userError) throw new Error(userError.message);
    if (!user.user) throw new Error("Unable to create applicant user.");

    await supabase.from("profiles").upsert({
      id: user.user.id,
      email: payload.email,
      full_name: `${payload.firstName} ${payload.lastName}`,
      phone: payload.phone ?? null,
      role: "advocate",
    });

    const { data, error } = await supabase
      .from("advocate_profiles")
      .insert({
        user_id: user.user.id,
        display_name: `${payload.firstName} ${payload.lastName}`,
        initials: `${payload.firstName[0] ?? ""}${payload.lastName[0] ?? ""}`.toUpperCase(),
        credentials_display: payload.credentialType,
        credential_type: payload.credentialType,
        license_number: payload.licenseNumber,
        license_state: payload.licenseState,
        years_experience: payload.yearsExperience,
        bio: payload.bio,
        specialty_tags: payload.specialtyTags,
        certifications: payload.certifications,
        session_rate_cents: payload.sessionRateCents,
        status: "pending_verification",
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return NextResponse.json({ application: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to submit application" },
      { status: 400 }
    );
  }
}
