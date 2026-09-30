import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY ?? "";
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? "";

export function isSupabaseConfigured(): boolean {
  return SUPABASE_URL.length > 0 && SUPABASE_PUBLISHABLE_KEY.length > 0;
}

export function createSupabaseBrowserClient(): ReturnType<typeof createClient<Database>> {
  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

export function createSupabaseServerClient(accessToken: string): ReturnType<typeof createClient<Database>> {
  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
}

export function createSupabaseAdminClient(): ReturnType<typeof createClient<Database>> {
  if (SUPABASE_SECRET_KEY.length === 0) {
    throw new Error("SUPABASE_SECRET_KEY is not configured");
  }
  return createClient<Database>(SUPABASE_URL, SUPABASE_SECRET_KEY);
}
