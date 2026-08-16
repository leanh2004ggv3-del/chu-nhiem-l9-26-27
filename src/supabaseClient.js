// SUPABASE CLIENT & CLOUD SYNC MODULE

export const SUPABASE_URL = "https://vpulmtktjiqyioxlnwbv.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwdWxtdGt0amlxeWlveGxud2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MzE0MDYsImV4cCI6MjEwMjQwNzQwNn0.05C-1YOUa2XEVip4I6he3OK2ToSOs2XdRRVbKwX1cu4";

let supabaseClient = null;

export function getSupabase() {
  if (!supabaseClient && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClient;
}

// Fetch Profiles from Supabase Cloud
export async function fetchProfilesFromSupabase() {
  const client = getSupabase();
  if (!client) return null;
  try {
    const { data, error } = await client.from('profiles').select('*');
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn("Supabase fetch error, fallback to local:", err.message);
    return null;
  }
}

// Fetch Classes from Supabase Cloud
export async function fetchClassesFromSupabase() {
  const client = getSupabase();
  if (!client) return null;
  try {
    const { data, error } = await client.from('classes').select('*');
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn("Supabase fetch error, fallback to local:", err.message);
    return null;
  }
}
