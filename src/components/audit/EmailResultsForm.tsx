"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import type { LeadData } from "@/types/audit";

interface EmailResultsFormProps {
  auditId: string;
  totalScore: number;
  scoreBand: string;
}

const FOUNDER_TYPES = [
  "Startup founder",
  "Small business owner",
  "Consultant / freelancer",
  "Agency owner",
  "E-commerce operator",
  "Service business owner",
  "Other",
];

const FEEDBACK_OPTIONS = [
  { value: "yes", label: "Yes — I'd like a quick second opinion" },
  { value: "maybe", label: "Maybe later" },
  { value: "no", label: "No, just send me the results" },
];

export default function EmailResultsForm({ auditId, totalScore, scoreBand }: EmailResultsFormProps) {
  const [form, setForm] = useState<LeadData>({
    firstName: "",
    email: "",
    companyName: "",
    websiteOrLinkedin: "",
    founderType: "",
    wantsScoreFeedback: "",
    consentGiven: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set(field: keyof LeadData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!form.email || !form.consentGiven) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/audit-submit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId, totalScore, scoreBand, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="text-center">
          <p className="font-bold text-white text-lg">Results sent.</p>
          <p className="text-slate-400 text-sm mt-1">
            Check your inbox — I&apos;ll also follow up with 2–3 systems I&apos;d fix first based on your score.
          </p>
        </div>
        <a
          href="https://calendly.com/YOUR_LINK_HERE"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-cyan-400 hover:text-cyan-300 transition underline underline-offset-4"
        >
          Want a direct review? Book a Founder Systems Review →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-medium">First Name *</label>
          <input
            type="text"
            required
            placeholder="Your first name"
            value={form.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-medium">Email Address *</label>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition text-sm"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-medium">Business / Company Name</label>
          <input
            type="text"
            placeholder="Your company"
            value={form.companyName}
            onChange={(e) => set("companyName", e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-medium">Website or LinkedIn</label>
          <input
            type="text"
            placeholder="yoursite.com or linkedin.com/in/you"
            value={form.websiteOrLinkedin}
            onChange={(e) => set("websiteOrLinkedin", e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-slate-400 font-medium">What best describes you?</label>
        <select
          value={form.founderType}
          onChange={(e) => set("founderType", e.target.value)}
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-cyan-500/60 transition appearance-none cursor-pointer"
          style={{ color: form.founderType ? "white" : "#64748b" }}
        >
          <option value="" disabled className="bg-slate-900">Select your category</option>
          {FOUNDER_TYPES.map((t) => (
            <option key={t} value={t} className="bg-slate-900 text-white">{t}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-400 font-medium">Would you like feedback on your score?</label>
        <div className="flex flex-col sm:flex-row gap-2">
          {FEEDBACK_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set("wantsScoreFeedback", opt.value)}
              className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium transition cursor-pointer ${
                form.wantsScoreFeedback === opt.value
                  ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-300"
                  : "bg-white/3 border-white/8 text-slate-400 hover:border-white/15"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/8">
        <input
          type="checkbox"
          id="consent"
          checked={form.consentGiven}
          onChange={(e) => set("consentGiven", e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-cyan-500 cursor-pointer shrink-0"
        />
        <label htmlFor="consent" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
          I agree to receive my audit results and occasional practical founder systems and growth advice by email.
          I can unsubscribe anytime.
        </label>
      </div>

      {status === "error" && (
        <p className="text-red-400 text-xs text-center">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !form.email || !form.consentGiven}
        className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Send My Results <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
