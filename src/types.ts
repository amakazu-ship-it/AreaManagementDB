export interface PublicCase {
  caseId: string;
  interventionId: string;
  name: string;
  org: string;
  company: string;
  area: string;
  prefecture: string;
  fiscalYear: string;
  interventionType: string[];
  objectiveTags: string[];
  objectiveTagsSource: "explicit" | "derived" | "unknown";
  targetTags: string[];
  targetTagsSource: "explicit" | "derived" | "unknown";
  componentTags: string[];
  componentTagsSource: "explicit" | "derived" | "unknown";
  tagEvidence: string;
  startDate: string;
  endDate: string;
  durationDays: string;
  frequency: string;
  partners: string;
  participantCount: string;
  visitorCount: string;
  otherPublicMetrics: string;
  hasMeasurement: boolean;
  measurementLevel: string[];
  bestEvidenceGrade: string;
  hasOutput: boolean;
  hasOutcome: boolean;
  hasBeforeAfter: boolean;
  sourceUrl: string;
  sourceTitle: string;
  page: string;
  /** "official" = フェーズ0〜2の一次情報調査で収集。"community" = ユーザー投稿（承認済み） */
  origin: "official" | "community";
  /** communityケースのみ：投稿者が書いた自由記述の説明文 */
  description?: string;
}

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Submission {
  id: string;
  createdAt: string;
  reviewedAt: string | null;
  status: SubmissionStatus;
  reviewerNote: string | null;
  name: string;
  org: string;
  company: string;
  area: string;
  prefecture: string;
  fiscalYear: string;
  interventionType: string;
  objectiveTags: string;
  targetTags: string;
  componentTags: string;
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

export interface Measurement {
  metricOriginal: string;
  metricStandardized: string;
  metricLevel: "input" | "activity" | "output" | "outcome" | "impact" | string;
  value: string;
  unit: string;
  measurementPeriod: string;
  measurementMethod: string;
  sampleSize: string;
  surveyQuestion: string;
  responseScale: string;
  baselineValue: string;
  comparisonValue: string;
  comparisonType: string;
  quote: string;
  sourceUrl: string;
  page: string;
  evidenceGrade: string;
  gradeReason: string;
  benchmarkReady: string;
  benchmarkIssue: string;
}
