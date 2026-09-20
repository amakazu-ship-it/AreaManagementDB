import { QUICK_OBJECTIVE_TAGS } from "../lib/taxonomy";

export function QuickChips({
  active,
  onToggle,
}: {
  active: string[];
  onToggle: (tag: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-faint">よく使われる目的：</span>
      {QUICK_OBJECTIVE_TAGS.map((tag) => {
        const isActive = active.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            className={`rounded-tag border px-3 py-1 text-xs font-medium transition-colors ${
              isActive
                ? "border-accent bg-accent text-white"
                : "border-line bg-card text-sub hover:border-accent hover:text-accent"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
