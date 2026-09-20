import type { PublicCase } from "../types";
import { typeLabel } from "./taxonomy";

/**
 * 元資料に概要文が存在しないため、構造化データの事実のみを並べて短い説明文を作る。
 * 推測・演出的な表現は加えない。
 */
export function buildAboutText(item: PublicCase): string {
  const parts: string[] = [];

  const typeLabels = item.interventionType.map(typeLabel).join("・");
  parts.push(
    `${item.org}${item.company ? `（${item.company}）` : ""}が${item.area}で実施した${
      typeLabels || "施策"
    }です。`
  );

  if (item.startDate) {
    if (item.endDate && item.endDate !== item.startDate) {
      parts.push(`実施期間は${item.startDate}から${item.endDate}` + (item.durationDays ? `（${item.durationDays}日間）` : "") + "。");
    } else {
      parts.push(`実施日は${item.startDate}。`);
    }
  } else if (item.frequency) {
    parts.push(`実施頻度：${item.frequency}。`);
  }

  if (item.partners) {
    parts.push(`連携先：${item.partners}。`);
  }

  return parts.join("");
}
