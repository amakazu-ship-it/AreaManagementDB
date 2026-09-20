-- Wombat Public DB: user submissions (Wikipedia的な投稿機能)
-- 誰でも投稿(insert)できるが、status='approved'になるまで一般公開の検索結果には出さない。
-- 承認(status更新)はSupabase Authでログインした運営者のみ行える。

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewer_note text,

  -- 基本情報
  name text not null,
  org text,
  company text,
  area text not null,
  prefecture text,
  fiscal_year text,

  -- 施策分類（カンマ区切り文字列で保持。UI側でsplitする）
  intervention_type text,
  objective_tags text,
  target_tags text,
  component_tags text,

  -- 施策の説明（投稿者が自由記述。AIによる推測を挟まないため、そのまま表示する）
  description text,

  -- 実施情報
  start_date text,
  end_date text,
  frequency text,
  partners text,

  -- 公開されている実績（投稿者が把握している範囲で任意入力）
  participant_count text,
  visitor_count text,
  other_public_metrics text,

  -- 出典（必須。Wombatの「出典を保持する」原則を投稿データにも適用する）
  source_url text not null,
  source_title text,

  -- 投稿者情報（任意）
  submitter_name text,
  submitter_contact text
);

alter table public.submissions enable row level security;

-- 誰でも新規投稿できる（ただしstatusは必ずpendingで作られる。以下のcheck制約と組み合わせて
-- クライアントから直接approvedを指定できないようにする）
create policy "anyone can submit pending cases"
  on public.submissions for insert
  to anon, authenticated
  with check (status = 'pending');

-- 一般公開の検索結果は「承認済み」のみ閲覧可能
create policy "anyone can read approved cases"
  on public.submissions for select
  to anon, authenticated
  using (status = 'approved');

-- ログイン済み（運営者）は全件閲覧可能（未承認キューの確認のため）
create policy "authenticated users can read all submissions"
  on public.submissions for select
  to authenticated
  using (true);

-- ログイン済み（運営者）のみ承認・却下（status更新）できる
create policy "authenticated users can moderate submissions"
  on public.submissions for update
  to authenticated
  using (true)
  with check (true);

create index if not exists submissions_status_idx on public.submissions (status);
