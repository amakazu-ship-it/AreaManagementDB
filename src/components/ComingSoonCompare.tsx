import { BarChart3, Lock } from "lucide-react";

export function ComingSoonCompare() {
  return (
    <div className="rounded-card border border-dashed border-lineStrong bg-cardSoft p-5 opacity-80">
      <div className="flex items-center gap-2 text-sm font-bold text-sub">
        <BarChart3 size={16} />
        この施策と成果を比較
        <span className="ml-1 flex items-center gap-1 rounded-tag bg-card px-2 py-0.5 text-[10px] font-semibold text-faint">
          <Lock size={10} /> Coming Soon
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-faint">
        類似する施策の中央値と比較して、あなたの施策の位置を確認。（Wombat Benchmark DB
        構築後に提供予定。現時点でベンチマーク数値は存在しません）
      </p>
    </div>
  );
}
