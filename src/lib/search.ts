import type { PublicCase } from "../types";

export interface Filters {
  query: string;
  prefectures: string[];
  areas: string[];
  objectiveTags: string[];
  targetTags: string[];
  componentTags: string[];
  interventionTypes: string[];
  fiscalYears: string[];
  hasNumericData: boolean;
  hasOutcome: boolean;
  hasBeforeAfter: boolean;
}

export const EMPTY_FILTERS: Filters = {
  query: "",
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
};

function searchableText(c: PublicCase): string {
  return [
    c.name,
    c.org,
    c.company,
    c.area,
    c.prefecture,
    ...c.objectiveTags,
    ...c.targetTags,
    ...c.componentTags,
  ]
    .join(" ")
    .toLowerCase();
}

function matchesAny(selected: string[], values: string[]): boolean {
  if (selected.length === 0) return true;
  return selected.some((s) => values.includes(s));
}

export function applyFilters(cases: PublicCase[], filters: Filters): PublicCase[] {
  const terms = filters.query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return cases.filter((c) => {
    if (terms.length > 0) {
      const text = searchableText(c);
      if (!terms.every((t) => text.includes(t))) return false;
    }
    if (!matchesAny(filters.prefectures, [c.prefecture])) return false;
    if (!matchesAny(filters.areas, [c.area])) return false;
    if (!matchesAny(filters.objectiveTags, c.objectiveTags)) return false;
    if (!matchesAny(filters.targetTags, c.targetTags)) return false;
    if (!matchesAny(filters.componentTags, c.componentTags)) return false;
    if (!matchesAny(filters.interventionTypes, c.interventionType)) return false;
    if (!matchesAny(filters.fiscalYears, [c.fiscalYear])) return false;
    if (filters.hasNumericData && !c.hasMeasurement) return false;
    if (filters.hasOutcome && !c.hasOutcome) return false;
    if (filters.hasBeforeAfter && !c.hasBeforeAfter) return false;
    return true;
  });
}

export function activeFilterCount(filters: Filters): number {
  return (
    filters.prefectures.length +
    filters.areas.length +
    filters.objectiveTags.length +
    filters.targetTags.length +
    filters.componentTags.length +
    filters.interventionTypes.length +
    filters.fiscalYears.length +
    (filters.hasNumericData ? 1 : 0) +
    (filters.hasOutcome ? 1 : 0) +
    (filters.hasBeforeAfter ? 1 : 0)
  );
}
