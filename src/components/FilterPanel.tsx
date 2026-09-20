import type { Filters } from "../lib/search";
import { activeFilterCount } from "../lib/search";
import { facetCounts, scalarFacetCounts } from "../lib/data";
import { FilterSection } from "./FilterSection";
import { CheckboxGroup } from "./CheckboxGroup";
import { typeLabel } from "../lib/taxonomy";

export function FilterPanel({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (next: Filters) => void;
}) {
  const prefectureOptions = scalarFacetCounts((c) => c.prefecture);
  const areaOptions = scalarFacetCounts((c) => c.area);
  const objectiveOptions = facetCounts((c) => c.objectiveTags);
  const typeOptions = facetCounts((c) => c.interventionType).map((o) => ({
    value: o.value,
    count: o.count,
    label: typeLabel(o.value),
  }));
  const targetOptions = facetCounts((c) => c.targetTags);
  const componentOptions = facetCounts((c) => c.componentTags);
  const fiscalYearOptions = scalarFacetCounts((c) => c.fiscalYear);

  const count = activeFilterCount(filters);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 pt-4">
        <p className="text-sm font-bold text-ink">フィルター</p>
        {count > 0 && (
          <button
            onClick={() =>
              onChange({
                ...filters,
                prefectures: [],
                areas: [],
                objectiveTags: [],
                targetTags: [],
                componentTags: [],
                interventionTypes: [],
                fiscalYears: [],
                hasNumericData: false,
                hasOutcome: false,
                hasBeforeAfter: false,
              })
            }
            className="text-xs font-medium text-accent hover:underline"
          >
            すべて解除（{count}）
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <FilterSection title="エリア（都道府県）">
          <CheckboxGroup
            options={prefectureOptions}
            selected={filters.prefectures}
            onChange={(v) => onChange({ ...filters, prefectures: v })}
          />
        </FilterSection>

        <FilterSection title="エリア（詳細）" defaultOpen={false}>
          <CheckboxGroup
            options={areaOptions}
            selected={filters.areas}
            onChange={(v) => onChange({ ...filters, areas: v })}
            maxVisible={30}
          />
        </FilterSection>

        <FilterSection title="目的">
          <CheckboxGroup
            options={objectiveOptions}
            selected={filters.objectiveTags}
            onChange={(v) => onChange({ ...filters, objectiveTags: v })}
            maxVisible={20}
          />
        </FilterSection>

        <FilterSection title="施策タイプ">
          <CheckboxGroup
            options={typeOptions.map((o) => ({ value: o.value, count: o.count }))}
            selected={filters.interventionTypes}
            onChange={(v) => onChange({ ...filters, interventionTypes: v })}
            maxVisible={20}
          />
        </FilterSection>

        <FilterSection title="対象" defaultOpen={false}>
          <CheckboxGroup
            options={targetOptions}
            selected={filters.targetTags}
            onChange={(v) => onChange({ ...filters, targetTags: v })}
          />
        </FilterSection>

        <FilterSection title="施策の構成要素" defaultOpen={false}>
          <CheckboxGroup
            options={componentOptions}
            selected={filters.componentTags}
            onChange={(v) => onChange({ ...filters, componentTags: v })}
            maxVisible={30}
          />
        </FilterSection>

        <FilterSection title="年度" defaultOpen={false}>
          <CheckboxGroup
            options={fiscalYearOptions}
            selected={filters.fiscalYears}
            onChange={(v) => onChange({ ...filters, fiscalYears: v })}
            maxVisible={20}
          />
        </FilterSection>

        <FilterSection title="測定状況">
          <div className="flex flex-col gap-1.5">
            <label className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-sm hover:bg-cardSoft">
              <input
                type="checkbox"
                checked={filters.hasNumericData}
                onChange={(e) => onChange({ ...filters, hasNumericData: e.target.checked })}
                className="h-3.5 w-3.5 rounded border-lineStrong accent-accent"
              />
              数値実績あり
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-sm hover:bg-cardSoft">
              <input
                type="checkbox"
                checked={filters.hasOutcome}
                onChange={(e) => onChange({ ...filters, hasOutcome: e.target.checked })}
                className="h-3.5 w-3.5 rounded border-lineStrong accent-accent"
              />
              Outcome測定あり
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-sm hover:bg-cardSoft">
              <input
                type="checkbox"
                checked={filters.hasBeforeAfter}
                onChange={(e) => onChange({ ...filters, hasBeforeAfter: e.target.checked })}
                className="h-3.5 w-3.5 rounded border-lineStrong accent-accent"
              />
              Before / Afterあり
            </label>
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
