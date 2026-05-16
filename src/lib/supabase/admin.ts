import { createClient } from "@supabase/supabase-js";
import { getPublicEnv, requireServerEnv } from "@/lib/env";
import type { Database } from "./database.types";

export function createSupabaseAdminClient() {
  const env = getPublicEnv();
  if (!env.supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured.");
  }

  return createClient<Database>(
    env.supabaseUrl,
    requireServerEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
