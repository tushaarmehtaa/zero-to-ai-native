"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, Star } from "lucide-react";
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
import { SiteTitle } from "./site-title";

const GROUP_KEYS: GroupKey[] = ["topic", "level", "lab", "format"];
const VIEW_KEYS: ViewKey[] = ["list", "table", "board", "cards"];


const REPO_URL = "https://github.com/tushaarmehtaa/zero-to-ai-native";
const X_URL = "https://x.com/tushaarmehtaa";

export function Hub() {
  const [view, setView] = useState<ViewKey>("list");
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

  const availableViews = groupBy === "lab" ? VIEW_KEYS.filter((key) => key !== "board") : VIEW_KEYS;

  const changeGroup = (nextGroup: GroupKey) => {
    setGroupBy(nextGroup);
    if (nextGroup === "lab" && view === "board") setView("cards");
  };

  const matchedSourceCount = useMemo(() => new Set(matched.map((g) => g.company)).size, [matched]);
  const isFiltered = matched.length < GUIDES.length;

  const showGroupControl = view !== "table";

  return (
    // one fixed page width for every view, so the header never shifts between views
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
      {/* header */}
      <header className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SiteTitle />
          <div className="flex w-fit shrink-0 items-center gap-2">
            <Link
              href="/curriculum"
              className="group flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-[12px] lowercase text-muted transition-colors hover:border-faint hover:text-foreground"
            >
              <BookOpen className="h-3.5 w-3.5 text-faint transition-colors group-hover:text-orange" />
              curriculum
            </Link>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-[12px] lowercase text-muted transition-colors hover:border-faint hover:text-foreground"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              star
              <Star className="h-3 w-3 text-faint transition-all group-hover:fill-orange group-hover:text-orange" />
            </a>
          </div>
        </div>

        <div>
          <p className="mt-5 text-lg leading-snug text-foreground">
            an open-source curriculum of primary-source ai material.
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            straight from the people building it. grouped by{" "}
            <span className="text-foreground">{GROUP_LABELS[groupBy]}</span>, so you always know what to read
            next.
          </p>
          <p className="mt-5 font-mono text-[11px] lowercase tracking-wide text-faint">
            {isFiltered ? `${matched.length} of ${GUIDES.length}` : GUIDES.length} reads · {matchedSourceCount} sources
          </p>
        </div>
      </header>

      {/* controls */}
      <div className="mx-auto mt-10 max-w-2xl space-y-4">
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
            options={availableViews}
            labelOf={(k) => VIEW_LABELS[k]}
            onChange={setView}
          />
          {showGroupControl ? (
            <Dropdown
              label="group"
              value={groupBy}
              options={GROUP_KEYS}
              labelOf={(k) => GROUP_LABELS[k]}
              onChange={changeGroup}
              align="right"
            />
          ) : (
            <span className="font-mono text-[11px] lowercase text-faint">
              click a column to sort
            </span>
          )}
        </div>
      </div>

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
