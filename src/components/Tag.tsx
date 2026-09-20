type TagVariant = "objective" | "target" | "component" | "type" | "neutral";

const VARIANT_CLASSES: Record<TagVariant, string> = {
  objective: "bg-accentPale text-accentDark",
  target: "bg-cardSoft text-sub",
  component: "bg-greenPale text-green",
  type: "bg-cardSoft text-ink border border-line",
  neutral: "bg-cardSoft text-sub",
};

export function Tag({
  children,
  variant = "neutral",
  onClick,
  active = false,
}: {
  children: React.ReactNode;
  variant?: TagVariant;
  onClick?: () => void;
  active?: boolean;
}) {
  const base =
    "inline-flex items-center rounded-tag px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors";
  const interactive = onClick ? "cursor-pointer hover:opacity-80" : "";
  const activeClasses = active ? "ring-2 ring-accent ring-offset-1" : "";

  return (
    <span
      className={`${base} ${VARIANT_CLASSES[variant]} ${interactive} ${activeClasses}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {children}
    </span>
  );
}
