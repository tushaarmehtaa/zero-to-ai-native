"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import type { Guide } from "@/lib/guides";
import type { Group } from "@/lib/grouping";
import type { Company, GroupKey } from "@/lib/taxonomy";
import { COMPANIES } from "@/lib/taxonomy";
import { PREFERRED_SOURCE } from "@/lib/grouping";
import { GuideRow } from "./guide-row";
import { GuideCard } from "./guide-card";
import { LabLogo } from "./lab-logo";
import { FormatIcon } from "./format-icon";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } },
};

function SectionLabel({ bucket, groupKey }: { bucket: string; groupKey?: GroupKey }) {
  const showLogo = groupKey === "lab" && (COMPANIES as readonly string[]).includes(bucket);
  return (
    <h2 className="mb-1 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-faint">
      {showLogo && <LabLogo company={bucket as Company} className="h-3 w-3" />}
      {bucket}
    </h2>
  );
}

/* ── list ─────────────────────────────────────────────── */
export function ListView({ groups, groupKey }: { groups: Group[]; groupKey?: GroupKey }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      {groups.map((group) => (
        <section key={group.key}>
          <SectionLabel bucket={group.key} groupKey={groupKey} />
          <div className="divide-y divide-border">
            {group.items.map((g) => (
              <GuideRow key={g.url + g.title} guide={g} />
            ))}
          </div>
        </section>
      ))}
    </motion.div>
  );
}

/* ── cards ────────────────────────────────────────────── */
export function CardsView({ groups, groupKey }: { groups: Group[]; groupKey?: GroupKey }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">
      {groups.map((group) => (
        <section key={group.key}>
          <SectionLabel bucket={group.key} groupKey={groupKey} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((g) => (
              <GuideCard key={g.url + g.title} guide={g} />
            ))}
          </div>
        </section>
      ))}
    </motion.div>
  );
}

/* ── board / kanban ───────────────────────────────────── */
export function BoardView({ groups, groupKey }: { groups: Group[]; groupKey?: GroupKey }) {
  const scrolls = groups.length > 2;
  return (
    <div className="relative mx-auto max-w-5xl">
      {scrolls && (
        <div className="mb-2 flex justify-end">
          <span className="font-mono text-[10px] lowercase tracking-wide text-faint">
            scroll for more &rarr;
          </span>
        </div>
      )}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4">
          {groups.map((group) => (
            <div
              key={group.key}
              className="flex w-[280px] shrink-0 flex-col sm:w-auto sm:min-w-[260px] sm:max-w-[360px] sm:flex-1"
            >
              <div className="mb-3 flex items-baseline justify-between">
                <SectionLabel bucket={group.key} groupKey={groupKey} />
                <span className="font-mono text-[10px] text-faint">{group.items.length}</span>
              </div>
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-3"
              >
                {group.items.map((g) => (
                  <GuideCard key={g.url + g.title} guide={g} compact />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      {/* edge fades to cue horizontal scroll */}
      {scrolls && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />
        </>
      )}
    </div>
  );
}

/* ── table ────────────────────────────────────────────── */
type SortKey = "title" | "company" | "topic" | "format" | "pages" | "year";

function SortHeader({
  k,
  label,
  sort,
  dir,
  onToggle,
  className = "",
}: {
  k: SortKey;
  label: string;
  sort: SortKey;
  dir: 1 | -1;
  onToggle: (key: SortKey) => void;
  className?: string;
}) {
  return (
    <th className={`pb-2 text-left font-mono text-[11px] font-normal lowercase tracking-wide ${className}`}>
      <button
        onClick={() => onToggle(k)}
        className="inline-flex items-center gap-1 text-faint transition-colors hover:text-foreground"
      >
        {label}
        {sort === k &&
          (dir === 1 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
      </button>
    </th>
  );
}

export function TableView({ guides }: { guides: Guide[] }) {
  const [sort, setSort] = useState<SortKey>("company");
  const [dir, setDir] = useState<1 | -1>(1);

  const sorted = [...guides].sort((a, b) => {
    if (sort === "company") {
      const aPriority = a.company === PREFERRED_SOURCE ? 0 : 1;
      const bPriority = b.company === PREFERRED_SOURCE ? 0 : 1;
      if (aPriority !== bPriority) return (aPriority - bPriority) * dir;
    }

    const av = a[sort] ?? 0;
    const bv = b[sort] ?? 0;
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });

  const toggle = (k: SortKey) => {
    if (sort === k) setDir((d) => (d === 1 ? -1 : 1));
    else {
      setSort(k);
      setDir(k === "year" ? -1 : 1);
    }
  };

  return (
    <div className="-mx-5 overflow-x-auto px-5">
      <table className="w-full min-w-[640px] border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-border">
            <SortHeader k="title" label="guide" sort={sort} dir={dir} onToggle={toggle} />
            <SortHeader k="company" label="source" sort={sort} dir={dir} onToggle={toggle} />
            <SortHeader k="topic" label="topic" sort={sort} dir={dir} onToggle={toggle} />
            <SortHeader k="format" label="type" sort={sort} dir={dir} onToggle={toggle} />
            <SortHeader k="year" label="yr" sort={sort} dir={dir} onToggle={toggle} className="text-right" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((g) => (
            <tr key={g.url + g.title} className="group border-b border-border/60">
              <td className="py-2.5 pr-4">
                <a
                  href={g.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium underline decoration-transparent underline-offset-[3px] transition-colors group-hover:decoration-orange"
                >
                  {g.title}
                  <ArrowUpRight className="h-3 w-3 text-faint opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-orange" />
                </a>
              </td>
              <td className="py-2.5 pr-4 text-muted">
                <span className="flex items-center gap-1.5" title={g.company}>
                  <LabLogo company={g.company} className="h-3.5 w-3.5" />
                  <span className="font-mono text-[11px] lowercase">{g.company.toLowerCase()}</span>
                </span>
              </td>
              <td className="py-2.5 pr-4 text-muted">{g.topic}</td>
              <td className="py-2.5 pr-4 text-muted">
                <FormatIcon format={g.format} className="h-3.5 w-3.5" />
              </td>
              <td className="py-2.5 text-right font-mono text-[11px] text-faint">{g.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
