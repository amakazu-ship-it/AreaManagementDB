import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { FormField, inputClass } from "../components/FormField";
import { TagPicker } from "../components/TagPicker";
import {
  INTERVENTION_TYPE_OPTIONS,
  OBJECTIVE_TAG_OPTIONS,
  TARGET_TAG_OPTIONS,
  COMPONENT_TAG_OPTIONS,
  typeLabel,
} from "../lib/taxonomy";
import { submitCase, type SubmissionInput } from "../lib/submissions";
import { supabaseConfigured } from "../lib/supabaseClient";

const EMPTY: SubmissionInput = {
  name: "",
  org: "",
  company: "",
  area: "",
  prefecture: "",
  fiscalYear: "",
  interventionType: [],
  objectiveTags: [],
  targetTags: [],
  componentTags: [],
  description: "",
  startDate: "",
  endDate: "",
  frequency: "",
  partners: "",
  participantCount: "",
  visitorCount: "",
  otherPublicMetrics: "",
  sourceUrl: "",
  sourceTitle: "",
  submitterName: "",
  submitterContact: "",
};

export function SubmitCasePage() {
  const [form, setForm] = useState<SubmissionInput>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const set = <K extends keyof SubmissionInput>(key: K, value: SubmissionInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canSubmit = form.name.trim() && form.area.trim() && form.sourceUrl.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      setError("施策名・エリア・出典URLは必須です");
      return;
    }
    setSubmitting(true);
    setError(null);
    const { error: err } = await submitCase(form);
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <CheckCircle2 size={40} className="mx-auto mb-4 text-green" />
        <h1 className="text-lg font-bold text-ink">投稿ありがとうございました</h1>
        <p className="mt-2 text-sm text-sub">
          内容をWombat運営が確認のうえ、問題なければPublic DBに掲載します。掲載までしばらくお待ちください。
        </p>
        <Link to="/" className="mt-6 inline-block text-sm font-medium text-accent hover:underline">
          一覧に戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:px-6 md:py-10">
      <Link to="/" className="mb-6 flex items-center gap-1.5 text-sm font-medium text-sub hover:text-accent">
        <ArrowLeft size={15} />
        一覧に戻る
      </Link>

      <h1 className="text-xl font-extrabold text-ink md:text-2xl">施策を投稿する</h1>
      <p className="mt-2 text-sm text-sub">
        ご存知のまちづくり施策をWombat Public
        DBに追加できます。投稿内容はWombat運営が確認したうえで公開されます（すぐには一覧に表示されません）。
      </p>
      {!supabaseConfigured && (
        <p className="mt-3 rounded-card bg-amberPale p-3 text-sm text-amber">
          現在、投稿機能はまだ準備中です（データベース未接続）。
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <FormField label="施策名" required>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="例：◯◯マルシェ2026"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="エリア" required hint="例：渋谷、日本橋">
            <input className={inputClass} value={form.area} onChange={(e) => set("area", e.target.value)} />
          </FormField>
          <FormField label="都道府県">
            <input
              className={inputClass}
              value={form.prefecture}
              onChange={(e) => set("prefecture", e.target.value)}
              placeholder="例：東京都"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="実施主体（団体名）">
            <input className={inputClass} value={form.org} onChange={(e) => set("org", e.target.value)} />
          </FormField>
          <FormField label="関連企業">
            <input
              className={inputClass}
              value={form.company}
              onChange={(e) => set("company", e.target.value)}
            />
          </FormField>
        </div>

        <FormField label="年度" hint="例：2025年度">
          <input
            className={inputClass}
            value={form.fiscalYear}
            onChange={(e) => set("fiscalYear", e.target.value)}
          />
        </FormField>

        <TagPicker
          label="施策タイプ"
          options={INTERVENTION_TYPE_OPTIONS}
          selected={form.interventionType}
          onChange={(v) => set("interventionType", v)}
          labelFor={typeLabel}
        />
        <TagPicker
          label="目的"
          options={OBJECTIVE_TAG_OPTIONS}
          selected={form.objectiveTags}
          onChange={(v) => set("objectiveTags", v)}
        />
        <TagPicker
          label="対象"
          options={TARGET_TAG_OPTIONS}
          selected={form.targetTags}
          onChange={(v) => set("targetTags", v)}
        />
        <TagPicker
          label="施策の構成要素"
          options={COMPONENT_TAG_OPTIONS}
          selected={form.componentTags}
          onChange={(v) => set("componentTags", v)}
        />

        <FormField label="施策の説明" hint="どんな施策か、事実ベースで簡潔にご記入ください">
          <textarea
            className={inputClass}
            rows={4}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="実施開始日" hint="YYYY-MM-DD">
            <input
              className={inputClass}
              value={form.startDate}
              onChange={(e) => set("startDate", e.target.value)}
            />
          </FormField>
          <FormField label="実施終了日" hint="YYYY-MM-DD">
            <input
              className={inputClass}
              value={form.endDate}
              onChange={(e) => set("endDate", e.target.value)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="頻度" hint="例：毎月第2木曜日">
            <input
              className={inputClass}
              value={form.frequency}
              onChange={(e) => set("frequency", e.target.value)}
            />
          </FormField>
          <FormField label="パートナー・連携先">
            <input
              className={inputClass}
              value={form.partners}
              onChange={(e) => set("partners", e.target.value)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="来場者数" hint="公開情報で分かる範囲で">
            <input
              className={inputClass}
              value={form.visitorCount}
              onChange={(e) => set("visitorCount", e.target.value)}
              placeholder="例：3000"
            />
          </FormField>
          <FormField label="参加者数">
            <input
              className={inputClass}
              value={form.participantCount}
              onChange={(e) => set("participantCount", e.target.value)}
              placeholder="例：150"
            />
          </FormField>
        </div>

        <FormField label="その他の公開実績" hint="例：出店数15店舗、開催回数3回など">
          <input
            className={inputClass}
            value={form.otherPublicMetrics}
            onChange={(e) => set("otherPublicMetrics", e.target.value)}
          />
        </FormField>

        <FormField label="出典URL" required hint="施策の内容を確認できる公式サイト等のURL">
          <input
            className={inputClass}
            type="url"
            value={form.sourceUrl}
            onChange={(e) => set("sourceUrl", e.target.value)}
            placeholder="https://"
          />
        </FormField>
        <FormField label="出典タイトル">
          <input
            className={inputClass}
            value={form.sourceTitle}
            onChange={(e) => set("sourceTitle", e.target.value)}
            placeholder="例：◯◯協議会 公式サイト"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4 border-t border-line pt-5">
          <FormField label="投稿者名" hint="任意・公開はされません">
            <input
              className={inputClass}
              value={form.submitterName}
              onChange={(e) => set("submitterName", e.target.value)}
            />
          </FormField>
          <FormField label="連絡先" hint="任意・確認事項がある場合のみ使用します">
            <input
              className={inputClass}
              value={form.submitterContact}
              onChange={(e) => set("submitterContact", e.target.value)}
            />
          </FormField>
        </div>

        {error && <p className="text-sm text-red">{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="rounded-btn bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accentDark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "送信中…" : "投稿する（承認後に公開されます）"}
        </button>
      </form>
    </div>
  );
}
