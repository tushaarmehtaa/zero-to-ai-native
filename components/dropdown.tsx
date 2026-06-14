"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export function Dropdown<T extends string>({
  label,
  value,
  options,
  labelOf,
  onChange,
  align = "left",
}: {
  label: string;
  value: T;
  options: T[];
  labelOf: (k: T) => string;
  onChange: (k: T) => void;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-[12px] lowercase transition-colors hover:border-faint"
      >
        <span className="text-[10px] uppercase tracking-widest text-faint/60">{label}</span>
        <span className="text-foreground">{labelOf(value)}</span>
        <ChevronDown
          className={`h-3 w-3 text-faint transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute top-full z-20 mt-1.5 min-w-[140px] overflow-hidden rounded-lg border border-border bg-[#141414] py-1 shadow-xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((opt) => {
            const active = opt === value;
            return (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-3 py-1.5 text-left font-mono text-[12px] lowercase transition-colors hover:bg-[#ffffff0d]"
                style={{ color: active ? "var(--orange)" : "var(--muted)" }}
              >
                {labelOf(opt)}
                {active && <Check className="h-3 w-3" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
