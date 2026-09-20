interface Option {
  value: string;
  count: number;
}

export function CheckboxGroup({
  options,
  selected,
  onChange,
  maxVisible = 8,
}: {
  options: Option[];
  selected: string[];
  onChange: (next: string[]) => void;
  maxVisible?: number;
}) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const visible = options.slice(0, maxVisible);

  if (visible.length === 0) {
    return <p className="text-xs text-faint">該当データなし</p>;
  }

  return (
    <div className="flex flex-col gap-1.5">
      {visible.map((opt) => (
        <label
          key={opt.value}
          className="flex cursor-pointer items-center justify-between gap-2 rounded px-1 py-0.5 text-sm hover:bg-cardSoft"
        >
          <span className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              className="h-3.5 w-3.5 rounded border-lineStrong accent-accent"
            />
            <span className="text-ink">{opt.value}</span>
          </span>
          <span className="text-xs text-faint">{opt.count}</span>
        </label>
      ))}
    </div>
  );
}
