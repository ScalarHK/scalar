import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function isValidUUID(s: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
}

/** POST — anonymous audit completion */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    auditId,
    totalScore,
    scoreBand,
    sectionScores,
    answers,
    startedAt,
    completedAt,
  } = body;

  if (!auditId || !isValidUUID(auditId)) {
    return NextResponse.json({ error: "Invalid auditId." }, { status: 400 });
  }
  if (typeof totalScore !== "number" || totalScore < 0 || totalScore > 300) {
    return NextResponse.json({ error: "Invalid score." }, { status: 400 });
  }

  // Capture UTM + referrer from request headers
  const referrer = req.headers.get("referer") || null;

  const supabase = getSupabase();
  if (!supabase) {
    console.log("[scalar/audit] Completion (no DB):", { auditId, totalScore, scoreBand });
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase.from("audit_results").upsert(
    [{
      audit_id: auditId,
      total_score: totalScore,
      band: scoreBand,
      section_scores: sectionScores ?? {},
      answers: answers ?? {},
      started_at: startedAt ?? null,
      completed_at: completedAt ?? null,
      referrer_url: referrer,
      landing_page_url: req.headers.get("origin") || null,
    }],
    { onConflict: "audit_id" }
  );

  if (error) {
    console.error("[scalar/audit] POST error:", error);
    return NextResponse.json({ error: "Could not save audit." }, { status: 500 });
  }

  // TODO: forward to webhook
  // await fetch(process.env.WEBHOOK_URL!, { method: 'POST', body: JSON.stringify({...}) })

  return NextResponse.json({ ok: true });
}

/** PATCH — email capture after results shown */
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const {
    auditId,
    totalScore,
    scoreBand,
    firstName,
    email,
    companyName,
    websiteOrLinkedin,
    founderType,
    wantsScoreFeedback,
    consentGiven,
  } = body;

  if (!auditId || !isValidUUID(auditId)) {
    return NextResponse.json({ error: "Invalid auditId." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.log("[scalar/audit] Email capture (no DB):", { auditId, email });
    return NextResponse.json({ ok: true });
  }

  // Update audit_results row with contact info
  const { error: auditErr } = await supabase
    .from("audit_results")
    .upsert(
      [{
        audit_id: auditId,
        total_score: totalScore ?? 0,
        band: scoreBand ?? "chaos",
        section_scores: {},
        answers: {},
        email: email.toLowerCase().trim(),
        first_name: firstName?.trim() || null,
        company_name: companyName?.trim() || null,
        website_or_linkedin: websiteOrLinkedin?.trim() || null,
        founder_type: founderType || null,
        wants_score_feedback: wantsScoreFeedback || null,
        consent_given: consentGiven ?? false,
      }],
      { onConflict: "audit_id" }
    );

  if (auditErr) {
    console.error("[scalar/audit] PATCH audit_results error:", auditErr);
    return NextResponse.json({ error: "Could not save contact info." }, { status: 500 });
  }

  // Also upsert into waitlist for unified lead view
  const { error: waitlistErr } = await supabase.from("waitlist").upsert(
    [{
      email: email.toLowerCase().trim(),
      name: firstName?.trim() || null,
      business_type: founderType || null,
    }],
    { onConflict: "email" }
  );

  if (waitlistErr && waitlistErr.code !== "23505") {
    console.error("[scalar/audit] PATCH waitlist error:", waitlistErr);
  }

  return NextResponse.json({ ok: true });
}
