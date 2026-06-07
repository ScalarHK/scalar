export type AuditPhase = "intro" | "section" | "results";

export interface AuditQuestion {
  id: string;
  text: string;
}

export interface SectionRecommendation {
  problem: string;
  whyItMatters: string;
  firstFix: string;
  aiOpportunity: string;
  thirtyDayAction: string;
}

export interface AuditSection {
  id: string;
  number: number;
  title: string;
  goal: string;
  questions: AuditQuestion[];
  aiOpportunities: string[];
  recommendation: SectionRecommendation;
}

export interface ScoreBand {
  id: string;
  label: string;
  range: string;
  description: string;
  recommendedFocus: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

export interface SectionScore {
  sectionId: string;
  sectionNumber: number;
  sectionTitle: string;
  score: number;      // 0–25
  percentage: number; // 0–100
}

export interface AuditResults {
  totalScore: number;
  percentage: number;
  band: ScoreBand;
  sectionScores: SectionScore[];
  weakest: SectionScore[];
  strongest: SectionScore[];
}

export interface AuditState {
  auditId: string;
  phase: AuditPhase;
  currentSectionIndex: number;
  answers: Record<string, number>;
  startedAt: string | null;
  completedAt: string | null;
}

export interface LeadData {
  firstName: string;
  email: string;
  companyName: string;
  websiteOrLinkedin: string;
  founderType: string;
  wantsScoreFeedback: string;
  consentGiven: boolean;
}

export type AuditAction =
  | { type: "START" }
  | { type: "SET_ANSWER"; questionId: string; score: number }
  | { type: "NEXT_SECTION" }
  | { type: "PREV_SECTION" }
  | { type: "SKIP_SECTION" }
  | { type: "COMPLETE" }
  | { type: "RESTART" }
  | { type: "HYDRATE"; payload: Partial<AuditState> };
