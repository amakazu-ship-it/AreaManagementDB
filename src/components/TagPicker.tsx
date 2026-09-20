export function TagPicker({
  label,
  options,
  selected,
  onChange,
  labelFor,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  labelFor?: (value: string) => string;
}) {
  const toggle = (v: string) => {
    onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
  };

  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold text-ink">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`rounded-tag border px-2.5 py-1 text-xs font-medium transition-colors ${
                active
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-card text-sub hover:border-accent hover:text-accent"
              }`}
            >
              {labelFor ? labelFor(opt) : opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
