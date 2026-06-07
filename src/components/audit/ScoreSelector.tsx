"use client";

import { SCORE_LABELS } from "@/lib/audit-data";

interface ScoreSelectorProps {
  questionId: string;
  value: number | undefined;
  onChange: (questionId: string, score: number) => void;
}

const COLORS = [
  "text-slate-400 group-hover:text-slate-300",
  "text-red-400",
  "text-orange-400",
  "text-yellow-400",
  "text-blue-400",
  "text-emerald-400",
];

const SELECTED_STYLES = [
  "bg-slate-500/20 border-slate-400/60 ring-1 ring-slate-400/40",
  "bg-red-500/15 border-red-400/60 ring-1 ring-red-400/40",
  "bg-orange-500/15 border-orange-400/60 ring-1 ring-orange-400/40",
  "bg-yellow-500/15 border-yellow-400/60 ring-1 ring-yellow-400/40",
  "bg-blue-500/15 border-blue-400/60 ring-1 ring-blue-400/40",
  "bg-emerald-500/15 border-emerald-400/60 ring-1 ring-emerald-400/40",
];

export default function ScoreSelector({ questionId, value, onChange }: ScoreSelectorProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
      {SCORE_LABELS.map((sl) => {
        const isSelected = value === sl.value;
        return (
          <button
            key={sl.value}
            type="button"
            onClick={() => onChange(questionId, sl.value)}
            className={`group flex flex-col items-center justify-center gap-1 rounded-xl border px-2 py-3 transition cursor-pointer min-h-[72px] ${
              isSelected
                ? SELECTED_STYLES[sl.value]
                : "bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15"
            }`}
          >
            <span
              className={`text-2xl font-black leading-none ${
                isSelected ? COLORS[sl.value] : "text-white/30 group-hover:text-white/60"
              }`}
            >
              {sl.value}
            </span>
            <span
              className={`text-[10px] font-medium text-center leading-tight ${
                isSelected ? COLORS[sl.value] : "text-slate-600 group-hover:text-slate-500"
              }`}
            >
              {sl.short}
            </span>
          </button>
        );
      })}
    </div>
  );
}
