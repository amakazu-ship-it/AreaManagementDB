import { Search, X } from "lucide-react";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="施策名・エリア・目的・キーワードで検索"
        className="w-full rounded-card border border-line bg-card py-3.5 pl-12 pr-10 text-[15px] text-ink shadow-sm outline-none placeholder:text-faint focus:border-accent"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="検索をクリア"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-faint hover:bg-cardSoft hover:text-ink"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
