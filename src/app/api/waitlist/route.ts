import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  const { email, name, businessType } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const supabase = getSupabase();

  if (!supabase) {
    // Dev mode: log and acknowledge without persisting
    console.log("[scalar/waitlist] New signup (no DB configured):", { email, name, businessType });
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase.from("waitlist").insert([
    {
      email: email.toLowerCase().trim(),
      name: name?.trim() || null,
      business_type: businessType || null,
    },
  ]);

  if (error) {
    if (error.code === "23505") {
      // Unique violation — already signed up, treat as success
      return NextResponse.json({ ok: true });
    }
    console.error("[waitlist] DB error:", error);
    return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
