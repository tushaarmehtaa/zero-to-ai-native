"use client";

type ChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  accent?: string;
};

function Chip({ label, active, onClick, accent }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors"
      style={{
        borderColor: active ? (accent ?? "#ffffff") : "var(--border)",
        background: active ? `${accent ?? "#ffffff"}1a` : "transparent",
        color: active ? (accent ?? "#fff") : "var(--muted)",
      }}
    >
      {label}
    </button>
  );
}

type FilterBarProps<T extends string> = {
  label: string;
  options: readonly T[];
  active: T | "all";
  onChange: (value: T | "all") => void;
  accentOf?: (value: T) => string;
};

export function FilterBar<T extends string>({
  label,
  options,
  active,
  onChange,
  accentOf,
}: FilterBarProps<T>) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-muted/60">
        {label}
      </span>
      <Chip label="all" active={active === "all"} onClick={() => onChange("all")} />
      {options.map((opt) => (
        <Chip
          key={opt}
          label={opt}
          active={active === opt}
          onClick={() => onChange(active === opt ? "all" : opt)}
          accent={accentOf?.(opt)}
        />
      ))}
    </div>
  );
}
