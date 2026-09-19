import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function isValidSupabaseUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export const supabase: SupabaseClient<Database> | null =
  isValidSupabaseUrl(url) && anonKey?.trim()
    ? createClient<Database>(url.trim(), anonKey.trim())
    : null;

export const isSupabaseConfigured = Boolean(supabase);
