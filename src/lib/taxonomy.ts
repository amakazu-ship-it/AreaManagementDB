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

// 投稿フォームで提示する定義済みタグ候補（指示書の全候補）
export const INTERVENTION_TYPE_OPTIONS = Object.keys(INTERVENTION_TYPE_LABELS);

export const OBJECTIVE_TAG_OPTIONS = [
  "回遊促進",
  "滞在促進",
  "来街促進",
  "消費促進",
  "地域交流",
  "コミュニティ形成",
  "エリア認知",
  "地域愛着",
  "観光促進",
  "ナイトタイム活性化",
  "公共空間活用",
  "ウォーカブル",
  "子育て支援",
  "防災",
  "環境",
  "文化芸術",
  "その他",
];

export const TARGET_TAG_OPTIONS = [
  "地域住民",
  "就業者",
  "来街者",
  "観光客",
  "子ども",
  "ファミリー",
  "若者",
  "高齢者",
  "事業者",
  "店舗",
  "その他",
];

export const COMPONENT_TAG_OPTIONS = [
  "マルシェ",
  "飲食",
  "キッチンカー",
  "地域店舗連携",
  "複数拠点",
  "スタンプラリー",
  "歩行者空間化",
  "道路活用",
  "広場活用",
  "ベンチ・滞在空間",
  "緑化",
  "音楽",
  "アート",
  "展示",
  "ワークショップ",
  "子ども向け",
  "スポーツ",
  "ナイトイベント",
  "ライトアップ",
  "ガイドツアー",
  "モビリティ",
  "デジタル",
  "SNS",
  "防災",
  "コミュニティ交流",
  "その他",
];
