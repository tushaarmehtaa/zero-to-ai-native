"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { GithubIcon } from "./github-icon";
import { GUIDES } from "@/lib/guides";
import { groupGuides } from "@/lib/grouping";
import {
  GROUP_LABELS,
  type GroupKey,
  VIEW_LABELS,
  type ViewKey,
} from "@/lib/taxonomy";
import { BoardView, CardsView, ListView, TableView } from "./views";
import { Dropdown } from "./dropdown";
import { GlitchTitle } from "./glitch-title";

const GROUP_KEYS: GroupKey[] = ["topic", "level", "lab", "format"];
const VIEW_KEYS: ViewKey[] = ["list", "table", "board", "cards"];

const LAB_COUNT = new Set(GUIDES.map((g) => g.company)).size;

const REPO_URL = "https://github.com/tushaarmehtaa/zero-to-ai-native";
const X_URL = "https://x.com/tushaarmehtaa";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.15 + i * 0.08, ease: "easeOut" as const },
  }),
};

export function Hub() {
  const [view, setView] = useState<ViewKey>("board");
  const [groupBy, setGroupBy] = useState<GroupKey>("level");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const matched = useMemo(
    () =>
      GUIDES.filter(
        (g) =>
          !q ||
          `${g.title} ${g.description} ${g.company} ${g.topic} ${g.level} ${g.audience}`
            .toLowerCase()
            .includes(q)
      ),
    [q]
  );

  const groups = useMemo(() => groupGuides(matched, groupBy), [matched, groupBy]);

  const showGroupControl = view !== "table";

  return (
    // one fixed page width for every view, so the header never shifts between views
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
      {/* header */}
      <header className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between gap-4">
          <GlitchTitle />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex shrink-0 items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-[12px] lowercase text-muted transition-colors hover:border-faint hover:text-foreground"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            star
            <Star className="h-3 w-3 text-faint transition-all group-hover:fill-orange group-hover:text-orange" />
          </a>
        </div>

        <motion.div>
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-5 text-lg leading-snug text-foreground"
          >
            the best papers, guides, blogs and lectures on ai.
          </motion.p>
          <motion.p
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-2 text-[15px] leading-relaxed text-muted"
          >
            straight from the people building it. grouped by{" "}
            <span className="text-foreground">level</span>, so you always know what to read
            next.
          </motion.p>
          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-5 font-mono text-[11px] lowercase tracking-wide text-faint"
          >
            {GUIDES.length} reads · {LAB_COUNT} sources
          </motion.p>
        </motion.div>
      </header>

      {/* controls */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="mx-auto mt-10 max-w-2xl space-y-4"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search…"
          className="w-full border-b border-border bg-transparent pb-2 text-[15px] outline-none placeholder:text-faint focus:border-foreground"
        />

        <div className="flex items-center justify-between">
          <Dropdown
            label="view"
            value={view}
            options={VIEW_KEYS}
            labelOf={(k) => VIEW_LABELS[k]}
            onChange={setView}
          />
          {showGroupControl ? (
            <Dropdown
              label="group"
              value={groupBy}
              options={GROUP_KEYS}
              labelOf={(k) => GROUP_LABELS[k]}
              onChange={setGroupBy}
              align="right"
            />
          ) : (
            <span className="font-mono text-[11px] lowercase text-faint">
              click a column to sort
            </span>
          )}
        </div>
      </motion.div>

      {/* the active view */}
      <div className="mt-14">
        {matched.length === 0 ? (
          <p className="mx-auto max-w-2xl py-12 text-center text-[14px] text-muted">
            nothing matches. clear the search.
          </p>
        ) : view === "list" ? (
          <div className="mx-auto max-w-2xl">
            <ListView groups={groups} groupKey={groupBy} />
          </div>
        ) : view === "cards" ? (
          <div className="mx-auto max-w-4xl">
            <CardsView groups={groups} groupKey={groupBy} />
          </div>
        ) : view === "board" ? (
          <BoardView groups={groups} groupKey={groupBy} />
        ) : (
          <div className="mx-auto max-w-4xl">
            <TableView guides={matched} />
          </div>
        )}
      </div>

      <footer className="mx-auto mt-24 max-w-2xl border-t border-border pt-6">
        <p className="text-[14px] leading-relaxed text-muted">
          i&apos;m{" "}
          <a href={X_URL} target="_blank" rel="noopener noreferrer" className="link">
            tushaar
          </a>
          . i build with ai and write about it. this is the list i wish someone had handed me
          when i started.
        </p>
        <div className="mt-4 flex items-center gap-5 font-mono text-[11px] lowercase tracking-wide text-faint">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Star className="h-3 w-3 transition-all group-hover:fill-orange group-hover:text-orange" />
            star on github
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            @tushaarmehtaa
          </a>
        </div>
      </footer>
    </main>
  );
}

