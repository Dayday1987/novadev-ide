// js/ide.auth.js

let supabase = null;

const SUPABASE_URL = "https://zyispsfejdfyfluahnr.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY_HERE"; // keep your real key here

export function initAuth() {
  supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
  return supabase;
}

export function getSupabase() {
  return supabase;
}

/* ==============================
   Session
============================== */

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/* ==============================
   Email / Password
============================== */

export async function signUp(email, password) {
  return await supabase.auth.signUp({
    email,
    password
  });
}

export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

/* ==============================
   OAuth
============================== */

export async function signInWithProvider(provider) {
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin + window.location.pathname
    }
  });
}
