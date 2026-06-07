"use client";

import { Mail, CalendarDays, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { useState } from "react";
import type { AuditResults } from "@/types/audit";
import { AUDIT_SECTIONS } from "@/lib/audit-data";
import { sectionColor, sectionTextColor } from "@/lib/audit-scoring";
import EmailResultsForm from "./EmailResultsForm";

interface ResultsDashboardProps {
  results: AuditResults;
  auditId: string;
  onRestart: () => void;
}

function ScoreArc({ percentage }: { percentage: number }) {
  const deg = Math.round((percentage / 100) * 270); // 270° sweep from bottom-left to bottom-right
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="w-44 h-44 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(from 135deg, #06b6d4 0deg, #8b5cf6 ${deg}deg, rgba(255,255,255,0.05) ${deg}deg 270deg, transparent 270deg)`,
        }}
      >
        <div className="w-32 h-32 rounded-full bg-[#06080f] flex flex-col items-center justify-center gap-0.5">
          <span className="text-4xl font-black text-white leading-none">{percentage}%</span>
          <span className="text-xs text-slate-500 font-medium">overall</span>
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({
  rank,
  sectionId,
  sectionTitle,
  score,
  percentage,
}: {
  rank: number;
  sectionId: string;
  sectionTitle: string;
  score: number;
  percentage: number;
}) {
  const [open, setOpen] = useState(rank === 1);
  const section = AUDIT_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return null;

  const priorityColors = ["text-red-400", "text-orange-400", "text-amber-400"];
  const priorityLabels = ["Priority 1", "Priority 2", "Priority 3"];

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/3 transition cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`text-xs font-bold uppercase tracking-widest shrink-0 ${priorityColors[rank - 1]}`}>
            {priorityLabels[rank - 1]}
          </span>
          <span className="font-semibold text-white truncate">{sectionTitle}</span>
          <span className={`text-xs font-semibold shrink-0 ${sectionTextColor(percentage)}`}>
            {score}/25
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-6 flex flex-col gap-4 border-t border-white/5">
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Problem</p>
              <p className="text-sm text-slate-300 leading-relaxed">{section.recommendation.problem}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Why It Matters</p>
              <p className="text-sm text-slate-300 leading-relaxed">{section.recommendation.whyItMatters}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/3 border border-white/8">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1.5">First Fix</p>
            <p className="text-sm text-slate-200 leading-relaxed">{section.recommendation.firstFix}</p>
          </div>

          <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-400 mb-1.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> AI Opportunity
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">{section.recommendation.aiOpportunity}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">30-Day Action Plan</p>
            <p className="text-sm text-slate-300 leading-relaxed">{section.recommendation.thirtyDayAction}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultsDashboard({ results, auditId, onRestart }: ResultsDashboardProps) {
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Score Card */}
      <div className="rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
        <ScoreArc percentage={results.percentage} />
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Your Founder Systems Score</p>
            <p className="text-5xl font-black text-white">{results.totalScore} <span className="text-2xl text-slate-500 font-semibold">/ 300</span></p>
          </div>

          <div className={`inline-flex self-center sm:self-start items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold ${results.band.bgClass} ${results.band.borderClass} ${results.band.colorClass}`}>
            {results.band.label}
          </div>

          <p className="text-slate-400 text-sm leading-relaxed max-w-md">
            {results.band.description}
          </p>

          <div className="p-4 rounded-xl bg-white/4 border border-white/8">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Recommended 30-Day Focus</p>
            <p className="text-sm text-white font-medium">{results.band.recommendedFocus}</p>
          </div>
        </div>
      </div>

      {/* Section Breakdown */}
      <div className="rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white mb-5">Section Breakdown</h3>
        <div className="flex flex-col gap-3">
          {results.sectionScores.map((ss) => (
            <div key={ss.sectionId} className="flex items-center gap-3">
              <span className="text-xs text-slate-400 w-4 shrink-0 text-right">{ss.sectionNumber}</span>
              <span className="text-sm text-slate-300 w-44 shrink-0 truncate">{ss.sectionTitle}</span>
              <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${sectionColor(ss.percentage)}`}
                  style={{ width: `${ss.percentage}%` }}
                />
              </div>
              <span className={`text-xs font-semibold w-12 text-right shrink-0 ${sectionTextColor(ss.percentage)}`}>
                {ss.score}/25
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-white/8 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> 0–25%: Not yet built</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> 26–50%: Early stage</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> 51–75%: Working</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> 76–100%: Strong</span>
        </div>
      </div>

      {/* Top 3 Priorities */}
      <div>
        <h3 className="text-lg font-bold text-white mb-2">Your Top 3 Focus Areas</h3>
        <p className="text-slate-400 text-sm mb-5">
          Based on your lowest scores, these are the systems that will move the needle most.
        </p>
        <div className="flex flex-col gap-3">
          {results.weakest.map((ss, i) => (
            <RecommendationCard
              key={ss.sectionId}
              rank={i + 1}
              sectionId={ss.sectionId}
              sectionTitle={ss.sectionTitle}
              score={ss.score}
              percentage={ss.percentage}
            />
          ))}
        </div>
      </div>

      {/* Email Results CTA */}
      <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6 sm:p-8">
        {!showEmailForm ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">Get your results by email</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Want a second pair of eyes? Send your score and I&apos;ll suggest the first 2–3 systems I would fix.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => setShowEmailForm(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 transition cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Send My Results
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-bold text-white mb-5">Send My Results</h3>
            <EmailResultsForm auditId={auditId} totalScore={results.totalScore} scoreBand={results.band.id} />
          </div>
        )}
      </div>

      {/* Book a Review CTA */}
      <div className="rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">Want help fixing the systems behind the score?</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Book a Founder Systems Review. I&apos;ll look at your score, ask a few questions, and tell you exactly what I&apos;d fix first.
          </p>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <a
            href="https://calendly.com/YOUR_LINK_HERE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-white/15 bg-white/5 hover:bg-white/10 transition text-center"
          >
            <CalendarDays className="w-4 h-4" />
            Book a Review
          </a>
          <button
            onClick={onRestart}
            className="text-xs text-slate-600 hover:text-slate-400 transition text-center py-1 cursor-pointer"
          >
            Restart audit
          </button>
        </div>
      </div>
    </div>
  );
}
