"use client";

import { useReducer, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, SkipForward, RotateCcw, CheckCircle2 } from "lucide-react";
import type { AuditState, AuditAction } from "@/types/audit";
import { AUDIT_SECTIONS, SCORE_LABELS } from "@/lib/audit-data";
import { calculateResults } from "@/lib/audit-scoring";
import ScoreSelector from "./ScoreSelector";
import ResultsDashboard from "./ResultsDashboard";

/* ─── Constants ─────────────────────────────────────────────────────── */
const LS_KEY = "scalar_founder_audit_v1";
const TOTAL_SECTIONS = AUDIT_SECTIONS.length; // 12

/* ─── Reducer ───────────────────────────────────────────────────────── */
const initial: AuditState = {
  auditId: "",
  phase: "intro",
  currentSectionIndex: 0,
  answers: {},
  startedAt: null,
  completedAt: null,
};

function reducer(state: AuditState, action: AuditAction): AuditState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.payload };
    case "START":
      return {
        ...state,
        phase: "section",
        currentSectionIndex: 0,
        startedAt: state.startedAt ?? new Date().toISOString(),
      };
    case "SET_ANSWER":
      return { ...state, answers: { ...state.answers, [action.questionId]: action.score } };
    case "NEXT_SECTION":
      if (state.currentSectionIndex >= TOTAL_SECTIONS - 1) {
        return { ...state, phase: "results", completedAt: new Date().toISOString() };
      }
      return { ...state, currentSectionIndex: state.currentSectionIndex + 1 };
    case "PREV_SECTION":
      if (state.currentSectionIndex === 0) return { ...state, phase: "intro" };
      return { ...state, currentSectionIndex: state.currentSectionIndex - 1 };
    case "SKIP_SECTION":
      if (state.currentSectionIndex >= TOTAL_SECTIONS - 1) {
        return { ...state, phase: "results", completedAt: new Date().toISOString() };
      }
      return { ...state, currentSectionIndex: state.currentSectionIndex + 1 };
    case "COMPLETE":
      return { ...state, phase: "results", completedAt: new Date().toISOString() };
    case "RESTART":
      return { ...initial, auditId: state.auditId };
    default:
      return state;
  }
}

/* ─── Helpers ───────────────────────────────────────────────────────── */
function sectionAnsweredCount(sectionIndex: number, answers: Record<string, number>): number {
  return AUDIT_SECTIONS[sectionIndex].questions.filter(
    (q) => answers[q.id] !== undefined
  ).length;
}

function sectionScore(sectionIndex: number, answers: Record<string, number>): number {
  return AUDIT_SECTIONS[sectionIndex].questions.reduce(
    (sum, q) => sum + (answers[q.id] ?? 0), 0
  );
}

function totalAnswered(answers: Record<string, number>): number {
  return AUDIT_SECTIONS.reduce(
    (sum, s) => sum + s.questions.filter((q) => answers[q.id] !== undefined).length, 0
  );
}

/* ─── Intro Screen ──────────────────────────────────────────────────── */
function IntroCard({
  onStart,
  hasSaved,
}: {
  onStart: () => void;
  hasSaved: boolean;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 gap-3">
        {AUDIT_SECTIONS.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/8"
          >
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
              {s.number}
            </span>
            <span className="text-sm text-slate-300">{s.title}</span>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-white/3 border border-white/8 text-center">
        <p className="text-sm text-slate-400 leading-relaxed">
          Score each area <strong className="text-white">0 – 5</strong>.&nbsp;
          No right or wrong answers — just honest ones.
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3">
          {SCORE_LABELS.map((sl) => (
            <span key={sl.value} className="text-xs text-slate-500">
              <span className="font-bold text-slate-400">{sl.value}</span> = {sl.full}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <button
          onClick={onStart}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 transition-all cursor-pointer"
        >
          {hasSaved ? "Resume My Audit" : "Start the Free Audit"}
          <ArrowRight className="w-5 h-5" />
        </button>
        {hasSaved && (
          <p className="text-xs text-slate-500">Your previous answers have been saved.</p>
        )}
        <p className="text-xs text-slate-600">No signup required · Takes around 5 minutes</p>
      </div>
    </div>
  );
}

/* ─── Section View ──────────────────────────────────────────────────── */
function SectionView({
  state,
  dispatch,
}: {
  state: AuditState;
  dispatch: (action: AuditAction) => void;
}) {
  const section = AUDIT_SECTIONS[state.currentSectionIndex];
  const answered = sectionAnsweredCount(state.currentSectionIndex, state.answers);
  const currentScore = sectionScore(state.currentSectionIndex, state.answers);
  const progress = ((state.currentSectionIndex + 1) / TOTAL_SECTIONS) * 100;
  const minsLeft = Math.max(1, Math.round((TOTAL_SECTIONS - state.currentSectionIndex - 1) * 0.5));
  const isLast = state.currentSectionIndex === TOTAL_SECTIONS - 1;
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [state.currentSectionIndex]);

  return (
    <div ref={topRef} className="flex flex-col gap-6">
      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Section {state.currentSectionIndex + 1} of {TOTAL_SECTIONS}</span>
          <span>{minsLeft} min remaining</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Section header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider font-semibold">
          <span>Section {section.number}</span>
          <span>·</span>
          <span>{answered}/5 answered</span>
          {answered === 5 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </div>
        <h2 className="text-2xl font-black text-white">{section.title}</h2>
        <p className="text-slate-400 text-sm">{section.goal}</p>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-6">
        {section.questions.map((q, qi) => (
          <div key={q.id} className="flex flex-col gap-3 p-5 rounded-2xl bg-white/3 border border-white/8">
            <p className="text-sm font-semibold text-white leading-relaxed">
              <span className="text-slate-500 mr-2">{qi + 1}.</span>
              {q.text}
            </p>
            <ScoreSelector
              questionId={q.id}
              value={state.answers[q.id]}
              onChange={(qId, score) => dispatch({ type: "SET_ANSWER", questionId: qId, score })}
            />
          </div>
        ))}
      </div>

      {/* Live section score preview */}
      {answered > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-sm text-slate-400">
          <span>Section score so far:</span>
          <span className="font-bold text-white">{currentScore} / {answered * 5}</span>
          <span className="text-slate-600">(max 25 when all answered)</span>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => dispatch({ type: "PREV_SECTION" })}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 transition text-sm font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch({ type: "SKIP_SECTION" })}
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs text-slate-500 hover:text-slate-300 transition cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
            Skip
          </button>

          <button
            onClick={() =>
              isLast
                ? dispatch({ type: "COMPLETE" })
                : dispatch({ type: "NEXT_SECTION" })
            }
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 transition cursor-pointer"
          >
            {isLast ? "See My Results" : "Next Section"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────── */
export default function AuditTool() {
  const [state, dispatch] = useReducer(reducer, initial);
  const [hydrated, setHydrated] = useState(false);

  // On mount: restore from localStorage, generate auditId
  useEffect(() => {
    let saved: Partial<AuditState> | null = null;
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) saved = JSON.parse(raw);
    } catch {}

    const id = saved?.auditId || crypto.randomUUID();
    dispatch({ type: "HYDRATE", payload: { auditId: id, ...saved } });
    setHydrated(true);
  }, []);

  // Save to localStorage on every state change after hydration
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  // On completion: fire anonymous submit
  useEffect(() => {
    if (!hydrated || state.phase !== "results" || !state.auditId) return;
    const results = calculateResults(state.answers);
    fetch("/api/audit-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auditId: state.auditId,
        totalScore: results.totalScore,
        scoreBand: results.band.id,
        sectionScores: Object.fromEntries(
          results.sectionScores.map((s) => [s.sectionId, s.score])
        ),
        answers: state.answers,
        startedAt: state.startedAt,
        completedAt: state.completedAt,
      }),
    }).catch(() => {});
  }, [state.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // SSR placeholder
  if (!hydrated) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const hasSaved = !!(state.answers && Object.keys(state.answers).length > 0);
  const answered = totalAnswered(state.answers);

  return (
    <div id="audit-start" className="rounded-3xl border border-white/10 bg-[#08090f] p-6 sm:p-8 lg:p-10">
      {/* Header */}
      {state.phase !== "results" && (
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-black text-white">The Founder Systems Audit</h2>
            <p className="text-slate-500 text-sm mt-1">
              12 sections · 60 questions · ~5 minutes
              {answered > 0 && (
                <span className="ml-2 text-cyan-400 font-medium">
                  · {answered}/60 answered
                </span>
              )}
            </p>
          </div>

          {hasSaved && state.phase !== "intro" && (
            <button
              onClick={() => dispatch({ type: "RESTART" })}
              className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Start over
            </button>
          )}
        </div>
      )}

      {state.phase === "intro" && (
        <IntroCard
          onStart={() => dispatch({ type: "START" })}
          hasSaved={hasSaved}
        />
      )}

      {state.phase === "section" && (
        <SectionView state={state} dispatch={dispatch} />
      )}

      {state.phase === "results" && (
        <ResultsDashboard
          results={calculateResults(state.answers)}
          auditId={state.auditId}
          onRestart={() => dispatch({ type: "RESTART" })}
        />
      )}
    </div>
  );
}
