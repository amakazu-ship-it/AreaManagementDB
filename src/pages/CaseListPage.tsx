import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { cases } from "../lib/data";
import { applyFilters, EMPTY_FILTERS, activeFilterCount, type Filters } from "../lib/search";
import { SearchBar } from "../components/SearchBar";
import { QuickChips } from "../components/QuickChips";
import { FilterPanel } from "../components/FilterPanel";
import { ResultsHeader } from "../components/ResultsHeader";
import { CaseCard } from "../components/CaseCard";

export function CaseListPage() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const results = useMemo(() => applyFilters(cases, filters), [filters]);
  const filterCount = activeFilterCount(filters);

  const toggleQuickTag = (tag: string) => {
    setFilters((f) => ({
      ...f,
      objectiveTags: f.objectiveTags.includes(tag)
        ? f.objectiveTags.filter((t) => t !== tag)
        : [...f.objectiveTags, tag],
    }));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      {/* Hero */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink md:text-3xl">まちづくり施策を探す</h1>
        <p className="mt-2 text-[15px] text-sub">他の地域では、どんな施策が行われている？</p>
        <p className="mt-0.5 text-sm text-faint">
          公開情報から収集・整理したエリアマネジメント施策を横断検索できます。
        </p>
      </div>

      {/* Search */}
      <div className="mb-3 max-w-2xl">
        <SearchBar value={filters.query} onChange={(v) => setFilters((f) => ({ ...f, query: v }))} />
      </div>
      <div className="mb-8">
        <QuickChips active={filters.objectiveTags} onToggle={toggleQuickTag} />
      </div>

      <div className="flex gap-8">
        {/* Desktop filter sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-20 rounded-card border border-line bg-card">
            <FilterPanel filters={filters} onChange={setFilters} />
          </div>
        </aside>

        {/* Results */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <ResultsHeader
              totalCount={cases.length}
              resultCount={results.length}
              filters={filters}
              onChange={setFilters}
            />
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-btn border border-line bg-card px-3 py-2 text-sm font-medium text-ink shadow-sm md:hidden"
            >
              <SlidersHorizontal size={15} />
              絞り込み
              {filterCount > 0 && (
                <span className="rounded-tag bg-accent px-1.5 text-[11px] font-bold text-white">
                  {filterCount}
                </span>
              )}
            </button>
          </div>

          {results.length === 0 ? (
            <div className="rounded-card border border-dashed border-lineStrong bg-card p-12 text-center">
              <p className="text-sm font-medium text-ink">条件に一致する施策が見つかりませんでした</p>
              <p className="mt-1 text-xs text-faint">検索キーワードやフィルターを見直してください</p>
              <button
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="mt-4 rounded-btn bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accentDark"
              >
                フィルターをリセット
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((item) => (
                <CaseCard key={item.caseId} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="text-sm font-bold">絞り込み</p>
              <button onClick={() => setDrawerOpen(false)} className="rounded p-1 hover:bg-cardSoft">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FilterPanel filters={filters} onChange={setFilters} />
            </div>
            <div className="border-t border-line p-4">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full rounded-btn bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accentDark"
              >
                {results.length}件を表示
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
