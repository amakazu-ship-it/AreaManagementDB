import { supabase, supabaseConfigured } from "./supabaseClient";
import type { PublicCase, Submission } from "../types";

const TABLE = "submissions";

// DB(snake_case) <-> アプリ内(camelCase)の変換
function rowToSubmission(row: Record<string, unknown>): Submission {
  return {
    id: row.id as string,
    createdAt: row.created_at as string,
    reviewedAt: (row.reviewed_at as string) ?? null,
    status: row.status as Submission["status"],
    reviewerNote: (row.reviewer_note as string) ?? null,
    name: (row.name as string) ?? "",
    org: (row.org as string) ?? "",
    company: (row.company as string) ?? "",
    area: (row.area as string) ?? "",
    prefecture: (row.prefecture as string) ?? "",
    fiscalYear: (row.fiscal_year as string) ?? "",
    interventionType: (row.intervention_type as string) ?? "",
    objectiveTags: (row.objective_tags as string) ?? "",
    targetTags: (row.target_tags as string) ?? "",
    componentTags: (row.component_tags as string) ?? "",
    description: (row.description as string) ?? "",
    startDate: (row.start_date as string) ?? "",
    endDate: (row.end_date as string) ?? "",
    frequency: (row.frequency as string) ?? "",
    partners: (row.partners as string) ?? "",
    participantCount: (row.participant_count as string) ?? "",
    visitorCount: (row.visitor_count as string) ?? "",
    otherPublicMetrics: (row.other_public_metrics as string) ?? "",
    sourceUrl: (row.source_url as string) ?? "",
    sourceTitle: (row.source_title as string) ?? "",
    submitterName: (row.submitter_name as string) ?? "",
    submitterContact: (row.submitter_contact as string) ?? "",
  };
}

export interface SubmissionInput {
  name: string;
  org: string;
  company: string;
  area: string;
  prefecture: string;
  fiscalYear: string;
  interventionType: string[];
  objectiveTags: string[];
  targetTags: string[];
  componentTags: string[];
  description: string;
  startDate: string;
  endDate: string;
  frequency: string;
  partners: string;
  participantCount: string;
  visitorCount: string;
  otherPublicMetrics: string;
  sourceUrl: string;
  sourceTitle: string;
  submitterName: string;
  submitterContact: string;
}

export async function submitCase(input: SubmissionInput): Promise<{ error: string | null }> {
  if (!supabaseConfigured) {
    return { error: "投稿機能は現在準備中です（Supabase未接続）。しばらくしてから再度お試しください。" };
  }
  const { error } = await supabase.from(TABLE).insert({
    status: "pending",
    name: input.name,
    org: input.org,
    company: input.company,
    area: input.area,
    prefecture: input.prefecture,
    fiscal_year: input.fiscalYear,
    intervention_type: input.interventionType.join(";"),
    objective_tags: input.objectiveTags.join(";"),
    target_tags: input.targetTags.join(";"),
    component_tags: input.componentTags.join(";"),
    description: input.description,
    start_date: input.startDate,
    end_date: input.endDate,
    frequency: input.frequency,
    partners: input.partners,
    participant_count: input.participantCount,
    visitor_count: input.visitorCount,
    other_public_metrics: input.otherPublicMetrics,
    source_url: input.sourceUrl,
    source_title: input.sourceTitle,
    submitter_name: input.submitterName,
    submitter_contact: input.submitterContact,
  });
  if (error) return { error: error.message };
  return { error: null };
}

export async function fetchApprovedSubmissions(): Promise<PublicCase[]> {
  if (!supabaseConfigured) return [];
  const { data, error } = await supabase.from(TABLE).select("*").eq("status", "approved");
  if (error || !data) return [];
  return data.map(rowToSubmission).map(submissionToPublicCase);
}

export async function fetchPendingSubmissions(): Promise<Submission[]> {
  if (!supabaseConfigured) return [];
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true });
  if (error || !data) return [];
  return data.map(rowToSubmission);
}

export async function reviewSubmission(
  id: string,
  status: "approved" | "rejected",
  reviewerNote: string
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from(TABLE)
    .update({ status, reviewer_note: reviewerNote || null, reviewed_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  return { error: null };
}

function splitTags(s: string): string[] {
  return s ? s.split(";").map((t) => t.trim()).filter(Boolean) : [];
}

export function submissionToPublicCase(s: Submission): PublicCase {
  return {
    caseId: `WMB-U-${s.id}`,
    interventionId: `U-${s.id}`,
    name: s.name,
    org: s.org,
    company: s.company,
    area: s.area,
    prefecture: s.prefecture,
    fiscalYear: s.fiscalYear || "N/A",
    interventionType: splitTags(s.interventionType),
    objectiveTags: splitTags(s.objectiveTags),
    objectiveTagsSource: s.objectiveTags ? "explicit" : "unknown",
    targetTags: splitTags(s.targetTags),
    targetTagsSource: s.targetTags ? "explicit" : "unknown",
    componentTags: splitTags(s.componentTags),
    componentTagsSource: s.componentTags ? "explicit" : "unknown",
    tagEvidence: "投稿者が入力した内容（Wombat運営による承認済み）",
    startDate: s.startDate,
    endDate: s.endDate,
    durationDays: "",
    frequency: s.frequency,
    partners: s.partners,
    participantCount: s.participantCount,
    visitorCount: s.visitorCount,
    otherPublicMetrics: s.otherPublicMetrics,
    hasMeasurement: Boolean(s.participantCount || s.visitorCount || s.otherPublicMetrics),
    measurementLevel: [],
    bestEvidenceGrade: "",
    hasOutput: Boolean(s.participantCount || s.visitorCount || s.otherPublicMetrics),
    hasOutcome: false,
    hasBeforeAfter: false,
    sourceUrl: s.sourceUrl,
    sourceTitle: s.sourceTitle || s.name,
    page: "",
    origin: "community",
    description: s.description,
  };
}
