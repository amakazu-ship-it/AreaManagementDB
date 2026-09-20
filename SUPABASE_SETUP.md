# ユーザー投稿機能のセットアップ（Supabase）

Wombatの「施策を投稿する」機能と、運営による承認画面（`/admin`）はSupabaseを使います。
以下はCLIツールなしでも進められる、ダッシュボードだけの手順です。

## 1. Supabaseプロジェクトを作成

1. https://supabase.com にログイン（アカウントがなければ新規作成、無料枠でOK）
2. 「New Project」→ 名前は`wombat-app`など任意、リージョンは東京（ap-northeast-1）推奨
3. 作成が終わるまで数分待つ

## 2. テーブルを作成

1. プロジェクト画面左メニューの「SQL Editor」を開く
2. このリポジトリの `supabase/migrations/0001_submissions.sql` の中身を全部コピーして貼り付け、実行（Run）
3. 「Table Editor」で `submissions` テーブルができていることを確認

## 3. APIキーを取得

1. 左メニュー「Project Settings」→「API」
2. `Project URL` と `anon public` キーをコピー

## 4. 環境変数を設定

### ローカル開発
`wombat-app/.env.local` を新規作成し、以下を記入（`.env.example`をコピーして使ってください）：
```
VITE_SUPABASE_URL=（Project URLを貼る）
VITE_SUPABASE_ANON_KEY=（anon publicキーを貼る）
```
このファイルは`.gitignore`で除外済みなので、コミットされません。

### Vercel
Vercelのプロジェクト設定 → 「Environment Variables」で、上記2つを同じキー名で追加してください。
追加後、再デプロイ（Redeploy）が必要です。

## 5. 運営（承認者）アカウントを作成

**投稿を承認できるのは、Supabaseにログインできるアカウントを持つ人だけです。
一般ユーザーのサインアップ画面はアプリ側に意図的に用意していません**（誰でも承認者になれてしまうのを防ぐため）。

1. Supabaseダッシュボード左メニュー「Authentication」→「Users」
2. 「Add user」→ メールアドレスとパスワードを設定（「Auto Confirm User」を必ずON）
3. `wombat-app`の `/admin` にアクセスし、そのメールアドレス・パスワードでログイン

## 6. 動作確認

1. `/submit` から適当な内容を投稿
2. Supabase Table Editorで`submissions`テーブルに`status = 'pending'`の行ができていることを確認
3. `/admin` にログインし、その投稿が表示され「承認して公開」できることを確認
4. 承認後、トップページの一覧に表示されることを確認（origin=communityの「ユーザー投稿」バッジ付き）

## 補足：RLS（Row Level Security）の設計

`0001_submissions.sql` で以下を設定しています：
- 誰でも `status = 'pending'` として新規投稿できる（承認済みとして投稿することはできない）
- 誰でも `status = 'approved'` の行だけ閲覧できる
- ログイン済みユーザーのみ全件閲覧・status更新（承認/却下）ができる

Supabaseにログインできるアカウント＝承認者、という設計のため、Step 5の運営アカウント作成は
信頼できる人にだけ発行してください。
