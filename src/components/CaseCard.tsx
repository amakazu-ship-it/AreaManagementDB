import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import type { PublicCase } from "../types";
import { Tag } from "./Tag";

function publicHeadline(c: PublicCase): { label: string; value: string } | null {
  if (c.visitorCount) return { label: "来場者", value: `${c.visitorCount}人` };
  if (c.participantCount) return { label: "参加者", value: `${c.participantCount}人` };
  // 参加者・来場者数以外の公開実績があれば、その先頭1件を代わりに表示する
  // （例：開催回数・団体数・環境測定値等。「実績データ公開なし」と誤表示しないため）
  const first = c.otherPublicMetrics.split(" / ")[0];
  if (first) {
    const [label, value] = first.split(/:\s*/);
    if (label && value) return { label, value };
  }
  return null;
}

export function CaseCard({ item }: { item: PublicCase }) {
  const headline = publicHeadline(item);

  return (
    <Link
      to={`/cases/${item.caseId}`}
      className="group flex flex-col gap-3 rounded-card border border-line bg-card p-4 transition-shadow hover:shadow-md hover:border-lineStrong"
    >
      <div>
        {item.origin === "community" && (
          <span className="mb-1.5 flex w-fit items-center gap-1 rounded-tag bg-amberPale px-2 py-0.5 text-[10px] font-semibold text-amber">
            <Users size={10} />
            ユーザー投稿
          </span>
        )}
        <h3 className="text-[15px] font-semibold leading-snug text-ink line-clamp-2">
          {item.name}
        </h3>
        <p className="mt-1 text-xs text-sub">
          {item.area}（{item.prefecture}）｜{item.fiscalYear !== "N/A" ? item.fiscalYear : "年度不明"}
        </p>
      </div>

      {item.objectiveTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.objectiveTags.slice(0, 3).map((t) => (
            <Tag key={t} variant="objective">{t}</Tag>
          ))}
        </div>
      )}

      {item.componentTags.length > 0 && (
        <div>
          <p className="mb-1 text-[11px] font-medium text-faint">主な要素</p>
          <div className="flex flex-wrap gap-1.5">
            {item.componentTags.slice(0, 4).map((t) => (
              <Tag key={t} variant="component">{t}</Tag>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex items-end justify-between border-t border-line pt-3">
        <div>
          <p className="text-[11px] font-medium text-faint">公開実績</p>
          {headline ? (
            <p className="text-sm font-semibold text-ink">
              {headline.label} <span className="text-accent">{headline.value}</span>
            </p>
          ) : (
            <p className="text-sm text-faint">実績データ公開なし</p>
          )}
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
          詳細を見る <ArrowRight size={13} />
        </span>
      </div>

      <p className="truncate text-[11px] text-faint">実施：{item.org}</p>
    </Link>
  );
}
