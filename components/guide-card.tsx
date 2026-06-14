"use client";

import { motion } from "motion/react";
import type { Guide } from "@/lib/guides";
import { COMPANY_ACCENT } from "@/lib/taxonomy";
import { CompanyMark } from "./company-mark";

export function GuideCard({ guide }: { guide: Guide }) {
  const accent = COMPANY_ACCENT[guide.company];
  return (
    <motion.a
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      href={guide.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-white/20"
      style={{ ["--accent" as string]: accent }}
    >
      <div className="flex items-center justify-between">
        <CompanyMark company={guide.company} />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
          {guide.format}
          {guide.pages ? ` · ${guide.pages}pp` : ""}
        </span>
      </div>

      <h3 className="text-base font-medium leading-snug text-foreground">
        {guide.title}
      </h3>

      <p className="text-sm leading-relaxed text-muted">{guide.description}</p>

      <div className="mt-auto flex items-center justify-between pt-2">
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{ background: `${accent}1a`, color: accent }}
        >
          {guide.topic}
        </span>
        <span className="text-xs text-muted transition-colors group-hover:text-foreground">
          open {guide.format === "PDF" ? "PDF" : ""} →
        </span>
      </div>
    </motion.a>
  );
}
