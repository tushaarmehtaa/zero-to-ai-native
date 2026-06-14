"use client";

import { motion } from "motion/react";
import type { Guide } from "@/lib/guides";
import { COMPANY_ACCENT } from "@/lib/taxonomy";
import { CompanyMark } from "./company-mark";

export function FeaturedCard({ guide, index }: { guide: Guide; index: number }) {
  const accent = COMPANY_ACCENT[guide.company];
  return (
    <motion.a
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      href={guide.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-white/20"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-40"
        style={{ background: accent }}
      />
      <div className="relative flex items-center justify-between">
        <CompanyMark company={guide.company} />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
          {guide.pages ? `${guide.pages}pp` : guide.format}
        </span>
      </div>

      <div className="relative">
        <h3 className="text-xl font-semibold leading-tight text-foreground">
          {guide.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {guide.description}
        </p>
      </div>

      <div className="relative flex items-center justify-between pt-1">
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{ background: `${accent}1a`, color: accent }}
        >
          {guide.topic}
        </span>
        <span className="text-sm text-muted transition-colors group-hover:text-foreground">
          read →
        </span>
      </div>
    </motion.a>
  );
}
