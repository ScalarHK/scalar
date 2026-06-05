"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm({ variant = "hero" }: { variant?: "hero" | "footer" }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isHero = variant === "hero";

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, businessType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={`flex flex-col items-center gap-3 ${isHero ? "py-2" : ""}`}>
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
          <CheckCircle2 className="w-6 h-6" />
          You&apos;re on the list!
        </div>
        <p className="text-slate-400 text-sm text-center max-w-sm">
          We&apos;ll be in touch soon. Expect an early-access invite — and a free bottleneck audit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${isHero ? "max-w-md" : "max-w-lg"} mx-auto flex flex-col gap-3`}>
      {isHero && (
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition text-sm"
        />
      )}

      <div className={`flex ${isHero ? "flex-col sm:flex-row" : "flex-col sm:flex-row"} gap-3`}>
        <input
          type="email"
          required
          placeholder="Your work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap cursor-pointer"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Join Waitlist <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {isHero && (
        <select
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-cyan-500/60 transition appearance-none cursor-pointer"
          style={{ color: businessType ? "white" : "#64748b" }}
        >
          <option value="" disabled>What best describes you? (optional)</option>
          <option value="solopreneur" className="bg-slate-900 text-white">Solopreneur / Freelancer</option>
          <option value="startup" className="bg-slate-900 text-white">Early-stage startup</option>
          <option value="sme" className="bg-slate-900 text-white">Small / medium business (2–50 people)</option>
          <option value="agency" className="bg-slate-900 text-white">Agency</option>
          <option value="other" className="bg-slate-900 text-white">Other</option>
        </select>
      )}

      {status === "error" && (
        <p className="text-red-400 text-xs text-center">{errorMsg}</p>
      )}

      <p className="text-slate-600 text-xs text-center">
        No spam. Unsubscribe any time. Early members get a free bottleneck audit.
      </p>
    </form>
  );
}
