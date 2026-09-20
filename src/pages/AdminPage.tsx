import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, LogOut, ExternalLink } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useCases } from "../context/CasesContext";
import { fetchPendingSubmissions, reviewSubmission } from "../lib/submissions";
import { supabaseConfigured } from "../lib/supabaseClient";
import { inputClass, FormField } from "../components/FormField";
import type { Submission } from "../types";

function LoginForm() {
  const { signIn } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) setError(err);
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-lg font-bold text-ink">運営ログイン</h1>
      <p className="mt-1 text-sm text-sub">投稿の承認・却下を行うには運営アカウントでログインしてください。</p>
      {!supabaseConfigured && (
        <p className="mt-3 rounded-card bg-amberPale p-3 text-sm text-amber">
          Supabaseが未接続のため、ログインできません。
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <FormField label="メールアドレス">
          <input
            className={inputClass}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </FormField>
        <FormField label="パスワード">
          <input
            className={inputClass}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </FormField>
        {error && <p className="text-sm text-red">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-btn bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accentDark disabled:opacity-50"
        >
          {loading ? "ログイン中…" : "ログイン"}
        </button>
      </form>
    </div>
  );
}

function SubmissionRow({
  submission,
  onReviewed,
}: {
  submission: Submission;
  onReviewed: () => void;
}) {
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const act = async (status: "approved" | "rejected") => {
    setBusy(true);
    await reviewSubmission(submission.id, status, note);
    setBusy(false);
    onReviewed();
  };

  return (
    <div className="rounded-card border border-line bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-ink">{submission.name}</p>
          <p className="text-xs text-sub">
            {submission.area}（{submission.prefecture || "都道府県不明"}）｜
            {submission.fiscalYear || "年度不明"}｜{submission.org || "実施主体不明"}
          </p>
        </div>
        <p className="text-[11px] text-faint">
          投稿日時：{new Date(submission.createdAt).toLocaleString("ja-JP")}
        </p>
      </div>

      {submission.description && (
        <p className="mt-2 whitespace-pre-wrap text-sm text-ink">{submission.description}</p>
      )}

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <div>
          <dt className="text-faint">目的</dt>
          <dd className="text-ink">{submission.objectiveTags || "—"}</dd>
        </div>
        <div>
          <dt className="text-faint">対象</dt>
          <dd className="text-ink">{submission.targetTags || "—"}</dd>
        </div>
        <div>
          <dt className="text-faint">構成要素</dt>
          <dd className="text-ink">{submission.componentTags || "—"}</dd>
        </div>
        <div>
          <dt className="text-faint">実績</dt>
          <dd className="text-ink">
            {[
              submission.visitorCount && `来場者${submission.visitorCount}人`,
              submission.participantCount && `参加者${submission.participantCount}人`,
              submission.otherPublicMetrics,
            ]
              .filter(Boolean)
              .join(" / ") || "—"}
          </dd>
        </div>
      </dl>

      <a
        href={submission.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 flex items-center gap-1 text-xs text-accent hover:underline"
      >
        <ExternalLink size={12} />
        {submission.sourceTitle || submission.sourceUrl}
      </a>

      {(submission.submitterName || submission.submitterContact) && (
        <p className="mt-1 text-[11px] text-faint">
          投稿者：{submission.submitterName || "匿名"}
          {submission.submitterContact && ` （${submission.submitterContact}）`}
        </p>
      )}

      <input
        className={`${inputClass} mt-3`}
        placeholder="却下理由・メモ（任意）"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => act("approved")}
          disabled={busy}
          className="flex items-center gap-1.5 rounded-btn bg-green px-3 py-2 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          <CheckCircle2 size={14} />
          承認して公開
        </button>
        <button
          onClick={() => act("rejected")}
          disabled={busy}
          className="flex items-center gap-1.5 rounded-btn bg-redPale px-3 py-2 text-xs font-semibold text-red hover:opacity-90 disabled:opacity-50"
        >
          <XCircle size={14} />
          却下
        </button>
      </div>
    </div>
  );
}

function ModerationQueue() {
  const { signOut } = useAdminAuth();
  const { refresh: refreshCases } = useCases();
  const [pending, setPending] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchPendingSubmissions().then((rows) => {
      setPending(rows);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const handleReviewed = () => {
    load();
    refreshCases();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-ink">承認待ちの投稿</h1>
          <p className="mt-1 text-sm text-sub">
            {loading ? "読み込み中…" : `${pending.length}件が承認待ちです`}
          </p>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-1.5 rounded-btn border border-line px-3 py-2 text-xs font-medium text-sub hover:bg-cardSoft"
        >
          <LogOut size={14} />
          ログアウト
        </button>
      </div>

      {!loading && pending.length === 0 && (
        <p className="rounded-card border border-dashed border-lineStrong p-8 text-center text-sm text-faint">
          承認待ちの投稿はありません
        </p>
      )}

      <div className="flex flex-col gap-4">
        {pending.map((s) => (
          <SubmissionRow key={s.id} submission={s} onReviewed={handleReviewed} />
        ))}
      </div>
    </div>
  );
}

export function AdminPage() {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) return null;
  return isAdmin ? <ModerationQueue /> : <LoginForm />;
}
