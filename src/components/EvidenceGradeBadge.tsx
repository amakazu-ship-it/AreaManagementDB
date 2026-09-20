import { EVIDENCE_GRADE_SIMPLE_LABELS } from "../lib/taxonomy";

const GRADE_CLASSES: Record<string, string> = {
  A: "bg-greenPale text-green",
  B: "bg-greenPale text-green",
  C: "bg-amberPale text-amber",
  D: "bg-cardSoft text-sub",
  U: "bg-cardSoft text-faint",
};

export function EvidenceGradeBadge({ grade }: { grade: string }) {
  if (!grade) return null;
  const cls = GRADE_CLASSES[grade] ?? "bg-cardSoft text-sub";
  const label = EVIDENCE_GRADE_SIMPLE_LABELS[grade] ?? grade;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-tag px-2 py-0.5 text-[11px] font-semibold ${cls}`}
      title={`Evidence Grade ${grade}`}
    >
      <span className="font-bold">{grade}</span>
      <span className="font-normal">{label}</span>
    </span>
  );
}
