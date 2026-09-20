import type { Measurement } from "../types";

export interface ChecklistItem {
  label: string;
  measured: boolean;
}

// keywordsは「◯◯数」等、実測値であることが明確な表現のみに限定する。
// 「来街者アンケート」のように調査対象を指すだけの語句を拾わないよう、
// 部分一致ではなく末尾一致（◯◯数で終わる）で判定する。
const CHECKLIST_RULES: { label: string; standardized: string[]; countSuffixes: string[]; keywords: string[] }[] = [
  { label: "参加者数・来場者数", standardized: ["participants", "visitors"], countSuffixes: ["来場者数", "来街者数", "参加者数"], keywords: [] },
  { label: "満足度", standardized: ["satisfaction", "experience_rating"], countSuffixes: [], keywords: ["満足度"] },
  { label: "滞在時間", standardized: ["dwell_time"], countSuffixes: [], keywords: ["滞在時間"] },
  { label: "回遊", standardized: ["circulation", "footfall"], countSuffixes: [], keywords: ["回遊率", "回遊行動"] },
  { label: "消費", standardized: ["spending"], countSuffixes: [], keywords: ["消費額"] },
  { label: "再訪意向", standardized: ["revisit_intention"], countSuffixes: [], keywords: ["再訪意向", "再訪率"] },
];

export function buildChecklist(measurements: Measurement[]): ChecklistItem[] {
  return CHECKLIST_RULES.map((rule) => {
    const measured = measurements.some((m) => {
      if (!m.value.trim()) return false; // 値が非公開の測定は「測定済み」に数えない
      return (
        rule.standardized.includes(m.metricStandardized) ||
        rule.countSuffixes.some((suf) => m.metricOriginal.includes(suf)) ||
        rule.keywords.some((k) => m.metricOriginal.includes(k))
      );
    });
    return { label: rule.label, measured };
  });
}
