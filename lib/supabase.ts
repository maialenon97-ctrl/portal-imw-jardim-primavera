import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient<Database> | null =
  url && anonKey ? createClient<Database>(url, anonKey) : null;

export const isSupabaseConfigured = Boolean(supabase);
