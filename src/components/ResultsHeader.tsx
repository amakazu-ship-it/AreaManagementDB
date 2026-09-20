import { X } from "lucide-react";
import type { Filters } from "../lib/search";
import { typeLabel } from "../lib/taxonomy";

interface Pill {
  label: string;
  onRemove: () => void;
}

export function ResultsHeader({
  totalCount,
  resultCount,
  filters,
  onChange,
}: {
  totalCount: number;
  resultCount: number;
  filters: Filters;
  onChange: (next: Filters) => void;
}) {
  const pills: Pill[] = [
    ...filters.prefectures.map((v) => ({
      label: v,
      onRemove: () => onChange({ ...filters, prefectures: filters.prefectures.filter((x) => x !== v) }),
    })),
    ...filters.areas.map((v) => ({
      label: v,
      onRemove: () => onChange({ ...filters, areas: filters.areas.filter((x) => x !== v) }),
    })),
    ...filters.objectiveTags.map((v) => ({
      label: v,
      onRemove: () => onChange({ ...filters, objectiveTags: filters.objectiveTags.filter((x) => x !== v) }),
    })),
    ...filters.interventionTypes.map((v) => ({
      label: typeLabel(v),
      onRemove: () =>
        onChange({ ...filters, interventionTypes: filters.interventionTypes.filter((x) => x !== v) }),
    })),
    ...filters.targetTags.map((v) => ({
      label: v,
      onRemove: () => onChange({ ...filters, targetTags: filters.targetTags.filter((x) => x !== v) }),
    })),
    ...filters.componentTags.map((v) => ({
      label: v,
      onRemove: () => onChange({ ...filters, componentTags: filters.componentTags.filter((x) => x !== v) }),
    })),
    ...filters.fiscalYears.map((v) => ({
      label: v,
      onRemove: () => onChange({ ...filters, fiscalYears: filters.fiscalYears.filter((x) => x !== v) }),
    })),
  ];

  if (filters.hasNumericData) {
    pills.push({ label: "数値実績あり", onRemove: () => onChange({ ...filters, hasNumericData: false }) });
  }
  if (filters.hasOutcome) {
    pills.push({ label: "Outcome測定あり", onRemove: () => onChange({ ...filters, hasOutcome: false }) });
  }
  if (filters.hasBeforeAfter) {
    pills.push({ label: "Before/Afterあり", onRemove: () => onChange({ ...filters, hasBeforeAfter: false }) });
  }

  const isFiltered = pills.length > 0 || filters.query.trim() !== "";

  return (
    <div className="flex flex-col gap-2">
      {pills.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {pills.map((p, i) => (
            <span key={`${p.label}-${i}`} className="flex items-center gap-1">
              {i > 0 && <span className="text-xs text-faint">×</span>}
              <button
                onClick={p.onRemove}
                className="flex items-center gap-1 rounded-tag bg-accentPale px-2.5 py-1 text-xs font-medium text-accentDark hover:bg-accent hover:text-white"
              >
                {p.label}
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
      <p className="text-sm text-sub">
        {isFiltered ? (
          <>
            <span className="font-bold text-ink">{resultCount}件</span>
            <span className="text-faint"> / 全{totalCount}件</span>
          </>
        ) : (
          <span className="font-bold text-ink">{totalCount}件の施策</span>
        )}
      </p>
    </div>
  );
}
