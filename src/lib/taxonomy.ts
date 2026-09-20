export const INTERVENTION_TYPE_LABELS: Record<string, string> = {
  event: "イベント",
  market: "マルシェ・マーケット",
  public_space: "公共空間活用",
  placemaking: "プレイスメイキング",
  mobility: "モビリティ",
  walkability: "ウォーカブル",
  community: "コミュニティ",
  culture_art: "文化芸術",
  tourism: "観光",
  disaster_prevention: "防災",
  environment: "環境",
  information_promotion: "情報発信",
  digital: "デジタル",
  other: "その他",
};

export function typeLabel(t: string): string {
  return INTERVENTION_TYPE_LABELS[t] ?? t;
}

export const METRIC_LEVEL_LABELS: Record<string, string> = {
  input: "Input（投入資源）",
  activity: "Activity（実施量）",
  output: "Output（実施実績）",
  outcome: "Outcome（効果・変化）",
  impact: "Impact（地域価値の変化）",
};

export const EVIDENCE_GRADE_LABELS: Record<string, string> = {
  A: "Grade A：対照比較あり",
  B: "Grade B：実施前後の比較あり",
  C: "Grade C：測定方法が確認できる",
  D: "Grade D：実績値のみ（方法不明）",
  U: "Grade U：公開情報からは判断不能",
};

export const EVIDENCE_GRADE_SIMPLE_LABELS: Record<string, string> = {
  A: "対照比較あり",
  B: "前後比較あり",
  C: "方法が分かる測定",
  D: "実施実績のみ",
  U: "判断不能",
};

// クイック検索・目立たせたい代表的な目的タグ（表示順の目安。実際の候補は data から動的に取得する）
export const QUICK_OBJECTIVE_TAGS = [
  "回遊促進",
  "公共空間活用",
  "地域交流",
  "ナイトタイム活性化",
  "文化芸術",
  "ウォーカブル",
];

export const TAG_SOURCE_LABELS: Record<string, string> = {
  explicit: "元資料に明記",
  derived: "施策内容から分類",
  unknown: "判断不能",
};
