import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FilterSection({
  title,
  children,
  defaultOpen = true,
  badge,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line py-3 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
          {title}
          {!!badge && (
            <span className="rounded-tag bg-accentPale px-1.5 py-0.5 text-[10px] font-bold text-accentDark">
              {badge}
            </span>
          )}
        </span>
        <ChevronDown
          size={16}
          className={`text-faint transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-2.5">{children}</div>}
    </div>
  );
}
