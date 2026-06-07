import type { AuditResults, ScoreBand, SectionScore } from "@/types/audit";
import { AUDIT_SECTIONS } from "./audit-data";

export const SCORE_BANDS: ScoreBand[] = [
  {
    id: "chaos",
    label: "Founder Chaos Stage",
    range: "0 – 75",
    description:
      "The business is probably running mostly from memory, chats, scattered spreadsheets, and manual work.",
    recommendedFocus:
      "Set up basic lead tracking, follow-up, and operating systems before adding more tools.",
    colorClass: "text-red-400",
    bgClass: "bg-red-500/10",
    borderClass: "border-red-500/30",
  },
  {
    id: "messy",
    label: "Basic But Messy Stage",
    range: "76 – 150",
    description:
      "Some systems exist, but they are inconsistent. Leads, tasks, reporting, and follow-ups may still depend heavily on the founder.",
    recommendedFocus:
      "Standardize your key workflows and create repeatable processes that do not depend on memory.",
    colorClass: "text-amber-400",
    bgClass: "bg-amber-500/10",
    borderClass: "border-amber-500/30",
  },
  {
    id: "growth",
    label: "Growth System Stage",
    range: "151 – 225",
    description:
      "The business has a working operating rhythm. The next opportunity is automation, better measurement, and improved sales conversion.",
    recommendedFocus:
      "Layer in automation, improve measurement, and use AI to reduce manual work.",
    colorClass: "text-blue-400",
    bgClass: "bg-blue-500/10",
    borderClass: "border-blue-500/30",
  },
  {
    id: "scalable",
    label: "Scalable Stage",
    range: "226 – 300",
    description:
      "The business is systemized enough to support more sales, more team members, stronger partnerships, and possibly fundraising.",
    recommendedFocus:
      "Optimize, delegate, automate further, and prepare for larger growth opportunities.",
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
    borderClass: "border-emerald-500/30",
  },
];

export function getBand(totalScore: number): ScoreBand {
  if (totalScore <= 75) return SCORE_BANDS[0];
  if (totalScore <= 150) return SCORE_BANDS[1];
  if (totalScore <= 225) return SCORE_BANDS[2];
  return SCORE_BANDS[3];
}

export function computeSectionScore(
  sectionId: string,
  answers: Record<string, number>
): number {
  const section = AUDIT_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return 0;
  return section.questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
}

export function calculateResults(answers: Record<string, number>): AuditResults {
  const sectionScores: SectionScore[] = AUDIT_SECTIONS.map((section) => {
    const score = section.questions.reduce(
      (sum, q) => sum + (answers[q.id] ?? 0),
      0
    );
    return {
      sectionId: section.id,
      sectionNumber: section.number,
      sectionTitle: section.title,
      score,
      percentage: Math.round((score / 25) * 100),
    };
  });

  const totalScore = sectionScores.reduce((sum, s) => sum + s.score, 0);
  const percentage = Math.round((totalScore / 300) * 100);
  const band = getBand(totalScore);

  const sorted = [...sectionScores].sort((a, b) => a.percentage - b.percentage);
  const weakest = sorted.slice(0, 3);
  const strongest = sorted.slice(-3).reverse();

  return { totalScore, percentage, band, sectionScores, weakest, strongest };
}

/** Returns a color class based on section percentage score */
export function sectionColor(pct: number): string {
  if (pct <= 25) return "bg-red-500";
  if (pct <= 50) return "bg-amber-500";
  if (pct <= 75) return "bg-blue-500";
  return "bg-emerald-500";
}

export function sectionTextColor(pct: number): string {
  if (pct <= 25) return "text-red-400";
  if (pct <= 50) return "text-amber-400";
  if (pct <= 75) return "text-blue-400";
  return "text-emerald-400";
}
