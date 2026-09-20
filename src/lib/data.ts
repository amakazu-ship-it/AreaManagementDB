import rawCases from "../data/publicCases.json";
import rawMeasurements from "../data/measurementsByIntervention.json";
import type { PublicCase, Measurement } from "../types";

export const cases: PublicCase[] = rawCases as PublicCase[];

export const measurementsByIntervention: Record<string, Measurement[]> =
  rawMeasurements as Record<string, Measurement[]>;

export function getMeasurements(interventionId: string): Measurement[] {
  return measurementsByIntervention[interventionId] ?? [];
}

export function getCaseById(caseId: string): PublicCase | undefined {
  return cases.find((c) => c.caseId === caseId);
}

function countBy(values: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const v of values) {
    if (!v) continue;
    m.set(v, (m.get(v) ?? 0) + 1);
  }
  return m;
}

export function facetCounts(field: (c: PublicCase) => string[]): { value: string; count: number }[] {
  const all = cases.flatMap(field);
  const counts = countBy(all);
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value, "ja"));
}

export function scalarFacetCounts(field: (c: PublicCase) => string): { value: string; count: number }[] {
  return facetCounts((c) => {
    const v = field(c);
    return v ? [v] : [];
  });
}
