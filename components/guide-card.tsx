"use client";

import { ArrowUpRight } from "lucide-react";
import type { Guide } from "@/lib/guides";
import { LabLogo } from "./lab-logo";
import { FormatIcon } from "./format-icon";

export function GuideCard({ guide, compact = false }: { guide: Guide; compact?: boolean }) {
  return (
    <a
      href={guide.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-2 rounded-lg border border-border p-4 transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.02]"
    >
      <div className="flex items-center justify-between gap-2 text-faint">
        <span
          className="flex items-center gap-2"
          title={`${guide.company} · ${guide.format.toLowerCase()}${guide.pages ? ` · ${guide.pages}pp` : ""}`}
        >
          <LabLogo company={guide.company} className="h-3.5 w-3.5" />
          <FormatIcon format={guide.format} className="h-3.5 w-3.5" />
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-orange" />
      </div>
      <h3 className="text-[14px] font-medium leading-snug underline decoration-transparent decoration-1 underline-offset-[3px] transition-colors group-hover:decoration-orange">
        {guide.title}
      </h3>
      {!compact && (
        <p className="line-clamp-3 text-[13px] leading-relaxed text-muted">{guide.description}</p>
      )}
    </a>
  );
}
