"use client";

import { FileText, Globe, GraduationCap, MonitorPlay, PenLine } from "lucide-react";
import type { Format } from "@/lib/taxonomy";

const MAP = {
  PDF: { Icon: FileText, color: "#e5896b" },
  Web: { Icon: Globe, color: "#58a6ff" },
  Blog: { Icon: PenLine, color: "#bc8cff" },
  Course: { Icon: GraduationCap, color: "#3fb950" },
  Video: { Icon: MonitorPlay, color: "#f85149" },
} as const;

export function FormatIcon({ format, className = "h-3 w-3" }: { format: Format; className?: string }) {
  const { Icon, color } = MAP[format];
  // title gives the type back on hover, since the text label is gone
  return (
    <span title={format.toLowerCase()} className="inline-flex" style={{ color }}>
      <Icon className={className} aria-label={format} />
    </span>
  );
}
