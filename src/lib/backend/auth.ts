import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCurrentProfile() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function requireProfile() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  return profile;
}

export async function requireRole(role: "family" | "advocate" | "admin") {
  const profile = await requireProfile();
  if (profile.role !== role) redirect("/");
  return profile;
}

export async function requireApiRole(role: "family" | "advocate" | "admin") {
  const profile = await getCurrentProfile();
  if (!profile) {
    throw new Error("Authentication required.");
  }
  if (profile.role !== role) {
    throw new Error("Not authorized.");
  }
  return profile;
}

export async function requireApiProfile() {
  const profile = await getCurrentProfile();
  if (!profile) {
    throw new Error("Authentication required.");
  }
  return profile;
}
