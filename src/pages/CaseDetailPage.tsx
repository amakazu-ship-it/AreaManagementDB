import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Users } from "lucide-react";
import { getMeasurements } from "../lib/data";
import { useCases } from "../context/CasesContext";
import { findCaseById } from "../lib/data";
import { typeLabel } from "../lib/taxonomy";
import { Tag } from "../components/Tag";
import { DetailSection } from "../components/DetailSection";
import { EvidenceGradeBadge } from "../components/EvidenceGradeBadge";
import { ComingSoonCompare } from "../components/ComingSoonCompare";
import { buildAboutText } from "../lib/about";
import { buildChecklist } from "../lib/measurementChecklist";
import type { Measurement } from "../types";

export function CaseDetailPage() {
  const { caseId } = useParams<{ caseId: string }>();
  const { cases } = useCases();
  const item = caseId ? findCaseById(cases, caseId) : undefined;

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-sm font-medium text-ink">施策が見つかりませんでした</p>
        <Link to="/" className="mt-3 inline-block text-sm text-accent hover:underline">
          一覧に戻る
        </Link>
      </div>
    );
  }

  const isCommunity = item.origin === "community";
  const measurements = getMeasurements(item.interventionId);
  const communityOutputs: Measurement[] = isCommunity
    ? ([
        item.visitorCount && { metricOriginal: "来場者数", value: item.visitorCount, unit: "人" },
        item.participantCount && { metricOriginal: "参加者数", value: item.participantCount, unit: "人" },
        item.otherPublicMetrics && { metricOriginal: "その他実績", value: item.otherPublicMetrics, unit: "" },
      ].filter(Boolean) as Partial<Measurement>[]).map((m) => ({
        metricOriginal: "",
        metricStandardized: "",
        metricLevel: "output",
        value: "",
        unit: "",
        measurementPeriod: "",
        measurementMethod: "",
        sampleSize: "",
        surveyQuestion: "",
        responseScale: "",
        baselineValue: "",
        comparisonValue: "",
        comparisonType: "",
        quote: "",
        sourceUrl: item.sourceUrl,
        page: "",
        evidenceGrade: "",
        gradeReason: "",
        benchmarkReady: "",
        benchmarkIssue: "",
        ...m,
      }))
    : [];
  const outputs = isCommunity
    ? communityOutputs
    : measurements.filter((m) => ["input", "activity", "output"].includes(m.metricLevel));
  const outcomes = measurements.filter((m) => m.metricLevel === "outcome" || m.metricLevel === "impact");
  const checklist = buildChecklist(measurements);

  // 出典（施策自体の一次資料 + 測定値ごとに異なる出典があれば併記）
  const sourceUrls = new Map<string, string>();
  sourceUrls.set(item.sourceUrl, item.sourceTitle);
  for (const m of measurements) {
    if (m.sourceUrl && !sourceUrls.has(m.sourceUrl)) {
      sourceUrls.set(m.sourceUrl, m.metricOriginal);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
      <Link to="/" className="mb-6 flex items-center gap-1.5 text-sm font-medium text-sub hover:text-accent">
        <ArrowLeft size={15} />
        一覧に戻る
      </Link>

      {/* ① 基本情報 */}
      <div className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {isCommunity && (
            <span className="flex items-center gap-1 rounded-tag bg-amberPale px-2.5 py-1 text-xs font-semibold text-amber">
              <Users size={12} />
              ユーザー投稿（運営承認済み）
            </span>
          )}
          {item.interventionType.map((t) => (
            <Tag key={t} variant="type">{typeLabel(t)}</Tag>
          ))}
        </div>
        <h1 className="text-xl font-extrabold leading-snug text-ink md:text-2xl">{item.name}</h1>
        <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-[11px] text-faint">エリア</dt>
            <dd className="font-medium text-ink">{item.area}（{item.prefecture}）</dd>
          </div>
          <div>
            <dt className="text-[11px] text-faint">年度</dt>
            <dd className="font-medium text-ink">{item.fiscalYear !== "N/A" ? item.fiscalYear : "不明"}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-faint">実施主体</dt>
            <dd className="font-medium text-ink">{item.org}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-faint">関連企業</dt>
            <dd className="font-medium text-ink">{item.company || "—"}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-card border border-line bg-card px-5">
        {/* ② この施策について */}
        <DetailSection title="この施策について">
          {isCommunity && item.description ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">{item.description}</p>
          ) : (
            <p className="text-sm leading-relaxed text-ink">{buildAboutText(item)}</p>
          )}
          {isCommunity && (
            <p className="mt-2 text-[11px] text-faint">
              ※ この説明文は投稿者による記述です。Wombat運営による事実確認は出典URLの範囲に限られます。
            </p>
          )}
        </DetailSection>

        {/* ③ 目的 */}
        <DetailSection title="目的">
          {item.objectiveTags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {item.objectiveTags.map((t) => (
                <Tag key={t} variant="objective">{t}</Tag>
              ))}
            </div>
          ) : (
            <p className="text-sm text-faint">元資料・施策内容から目的を判断できませんでした</p>
          )}
        </DetailSection>

        {/* ④ 対象 */}
        <DetailSection title="対象">
          {item.targetTags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {item.targetTags.map((t) => (
                <Tag key={t} variant="target">{t}</Tag>
              ))}
            </div>
          ) : (
            <p className="text-sm text-faint">元資料・施策内容から対象を判断できませんでした</p>
          )}
        </DetailSection>

        {/* ⑤ 施策の構成 */}
        <DetailSection title="施策の構成">
          {item.componentTags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {item.componentTags.map((t) => (
                <Tag key={t} variant="component">{t}</Tag>
              ))}
            </div>
          ) : (
            <p className="text-sm text-faint">元資料・施策内容から構成要素を判断できませんでした</p>
          )}
        </DetailSection>

        {/* ⑥ 実施概要 */}
        <DetailSection title="実施概要">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-[11px] text-faint">実施期間</dt>
              <dd className="font-medium text-ink">
                {item.startDate ? `${item.startDate}${item.endDate && item.endDate !== item.startDate ? ` 〜 ${item.endDate}` : ""}` : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-faint">実施日数</dt>
              <dd className="font-medium text-ink">{item.durationDays ? `${item.durationDays}日間` : "—"}</dd>
            </div>
            <div>
              <dt className="text-[11px] text-faint">頻度</dt>
              <dd className="font-medium text-ink">{item.frequency || "—"}</dd>
            </div>
            <div>
              <dt className="text-[11px] text-faint">パートナー</dt>
              <dd className="font-medium text-ink">{item.partners || "—"}</dd>
            </div>
          </dl>
        </DetailSection>

        {/* ⑦ 公開されている実績（Output / Outcome区別） */}
        <DetailSection title="公開されている実績">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-faint">
            実施実績（Output）
          </p>
          {outputs.length > 0 ? (
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {outputs.map((m, i) => (
                <div key={i} className="rounded-card border border-line bg-cardSoft p-3">
                  <p className="text-[11px] text-faint">{m.metricOriginal}</p>
                  <p className="text-base font-bold text-ink">
                    {m.value}
                    <span className="ml-0.5 text-xs font-medium text-sub">{m.unit}</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mb-4 text-sm text-faint">実績データ公開なし</p>
          )}

          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-faint">
            効果測定（Outcome）
          </p>
          {outcomes.length > 0 ? (
            <div className="flex flex-col gap-2">
              {outcomes.map((m, i) => (
                <div key={i} className="rounded-card border border-line p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-ink">{m.metricOriginal}</p>
                    <EvidenceGradeBadge grade={m.evidenceGrade} />
                  </div>
                  {m.baselineValue && m.comparisonValue ? (
                    <p className="mt-1 flex items-baseline gap-1.5 text-base font-bold text-ink">
                      <span className="text-sub line-through decoration-1">
                        {m.baselineValue}
                        {m.unit}
                      </span>
                      <span aria-hidden>→</span>
                      <span className="text-accent">
                        {m.comparisonValue}
                        {m.unit}
                      </span>
                    </p>
                  ) : (
                    m.value && (
                      <p className="mt-1 text-base font-bold text-ink">
                        {m.value}
                        <span className="ml-0.5 text-xs font-medium text-sub">{m.unit}</span>
                      </p>
                    )
                  )}
                  {m.quote && (
                    <p className="mt-1 text-xs italic leading-relaxed text-sub">「{m.quote}」</p>
                  )}
                  {m.gradeReason && (
                    <p className="mt-1 text-[11px] text-faint">{m.gradeReason}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-card bg-cardSoft p-3 text-sm text-sub">
              公開資料では、施策効果を示すOutcome指標は確認できませんでした。
            </p>
          )}
        </DetailSection>

        {/* 測定情報 */}
        <DetailSection title="この施策では何が測られている？">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
            {checklist.map((c) => (
              <div key={c.label} className="flex items-center justify-between text-sm">
                <span className="text-sub">{c.label}</span>
                <span className={c.measured ? "font-bold text-green" : "text-faint"}>
                  {c.measured ? "✓" : "—"}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-faint">
            測定レベル：
            {item.hasMeasurement
              ? item.hasOutcome
                ? "効果（Outcome）の測定あり"
                : "実施実績（Output）のみ"
              : "公開資料からの確認なし"}
            {item.bestEvidenceGrade && (
              <span className="ml-2">（補足：Evidence Grade {item.bestEvidenceGrade}）</span>
            )}
          </p>
        </DetailSection>
      </div>

      <div className="my-6">
        <ComingSoonCompare />
      </div>

      {/* 出典 */}
      <DetailSection title="出典">
        <ul className="flex flex-col gap-2">
          {[...sourceUrls.entries()].map(([url, title]) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-1.5 text-sm text-accent hover:underline"
              >
                <ExternalLink size={14} className="mt-0.5 shrink-0" />
                <span className="break-all">
                  {title} <span className="text-faint">— {url}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-faint">
          発行主体：{item.org}{item.fiscalYear !== "N/A" ? ` ／ 年度：${item.fiscalYear}` : ""}
          {item.page ? ` ／ ページ：${item.page}` : ""}
        </p>
      </DetailSection>
    </div>
  );
}
