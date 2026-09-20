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
