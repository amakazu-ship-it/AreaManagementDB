import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

// 環境変数が未設定でも（投稿機能を使わない開発時など）アプリ全体が落ちないよう、
// ダミー値でクライアントだけは作成する。実際の呼び出しはsupabaseConfiguredで守る。
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key"
);
