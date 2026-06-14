"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GUIDES } from "@/lib/guides";
import {
  COMPANIES,
  COMPANY_ACCENT,
  TOPICS,
  type Company,
  type Topic,
} from "@/lib/taxonomy";
import { FilterBar } from "./filter-bar";
import { FeaturedCard } from "./featured-card";
import { GuideCard } from "./guide-card";

export function Hub() {
  const [company, setCompany] = useState<Company | "all">("all");
  const [topic, setTopic] = useState<Topic | "all">("all");
  const [query, setQuery] = useState("");

  const featured = useMemo(() => GUIDES.filter((g) => g.featured), []);

  const filtersOn = company !== "all" || topic !== "all" || query.trim() !== "";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GUIDES.filter((g) => {
      if (company !== "all" && g.company !== company) return false;
      if (topic !== "all" && g.topic !== topic) return false;
      if (q && !`${g.title} ${g.description} ${g.company} ${g.topic}`.toLowerCase().includes(q))
        return false;
      // when no filters are on, the featured ones already lead the page
      if (!filtersOn && g.featured) return false;
      return true;
    });
  }, [company, topic, query, filtersOn]);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24">
      {/* hero */}
      <header className="relative pt-20 pb-10">
        <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-72" />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {GUIDES.length} guides · {COMPANIES.length} labs
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            the ai guides hub
          </h1>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">
            every banger PDF the big labs quietly drop. anthropic, openai, google
            and more, collected in one place so you stop digging through google.
          </p>
        </div>
      </header>

      {/* featured */}
      <section className="mb-12">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted/70">
          start here
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((g, i) => (
            <FeaturedCard key={g.title} guide={g} index={i} />
          ))}
        </div>
      </section>

      {/* filters */}
      <section className="sticky top-0 z-10 -mx-5 mb-8 space-y-3 border-b border-border bg-background/80 px-5 py-4 backdrop-blur-md">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search guides…"
          className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-white/25 focus:outline-none"
        />
        <FilterBar
          label="lab"
          options={COMPANIES}
          active={company}
          onChange={setCompany}
          accentOf={(c) => COMPANY_ACCENT[c]}
        />
        <FilterBar label="topic" options={TOPICS} active={topic} onChange={setTopic} />
      </section>

      {/* grid */}
      <section>
        <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted/70">
          {filtersOn ? `${filtered.length} matching` : "everything else"}
        </h2>
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((g) => (
              <GuideCard key={g.title} guide={g} />
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-muted">
            nothing here. clear a filter.
          </p>
        )}
      </section>

      <footer className="mt-20 border-t border-border pt-6 text-xs text-muted/70">
        all links point to first-party sources. no reseller PDFs, no slop.
      </footer>
    </div>
  );
}
