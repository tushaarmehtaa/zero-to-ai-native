"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Guide } from "@/lib/guides";
import { LabLogo } from "./lab-logo";
import { FormatIcon } from "./format-icon";

export function GuideRow({ guide }: { guide: Guide }) {
  return (
    <motion.a
      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
      href={guide.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-1 py-4"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[15px] font-medium leading-snug">
          <span className="link decoration-transparent underline-offset-[3px] group-hover:decoration-orange">
            {guide.title}
          </span>
          <ArrowUpRight className="ml-1 inline-block h-3.5 w-3.5 -translate-y-px text-faint opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-orange" />
        </h3>
        <div
          className="flex shrink-0 items-center gap-2 text-faint"
          title={`${guide.company} · ${guide.format.toLowerCase()}${guide.pages ? ` · ${guide.pages}pp` : ""}`}
        >
          <LabLogo company={guide.company} className="h-3.5 w-3.5" />
          <FormatIcon format={guide.format} className="h-3.5 w-3.5" />
        </div>
      </div>
      <p className="max-w-prose text-[14px] leading-relaxed text-muted">{guide.description}</p>
    </motion.a>
  );
}
