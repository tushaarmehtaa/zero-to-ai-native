"use client";

import { useMemo, useState } from "react";
import { BookOpen, Star } from "lucide-react";
import { GithubIcon } from "./github-icon";
import { LabLogo } from "./lab-logo";
import { HandwrittenArrow } from "./handwritten-arrow";
import { ComingSoonGate } from "./coming-soon-gate";
import { CreatorSection } from "./creator-section";
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

const FEATURED_VOICES = [
  "Andrej Karpathy",
  "Lilian Weng",
  "Sam Altman",
  "Dario Amodei",
  "Chip Huyen",
  "Simon Willison",
] as const;

const REPO_URL = "https://github.com/tushaarmehtaa/zero-to-ai-native";

export function Hub({ starCount }: { starCount: number | null }) {
  const [view, setView] = useState<ViewKey>("list");
  const [groupBy, setGroupBy] = useState<GroupKey>("level");
  const [query, setQuery] = useState("");
  const [gateOpen, setGateOpen] = useState(false);

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
    <>
    <div
      className={gateOpen ? "pointer-events-none blur-md select-none" : ""}
      aria-hidden={gateOpen || undefined}
      inert={gateOpen || undefined}
    >
    {/* one fixed page width for every view, so the header never shifts between views */}
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
      {/* header */}
      <header className="mx-auto max-w-2xl text-center">
        <SiteTitle />

        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Not being AI-native is so{" "}
          <span className="relative inline-block">
            2022.
            <span
              className="pointer-events-none absolute left-1/2 top-full flex -translate-x-[15%] items-start gap-1 text-orange sm:-translate-x-[10%]"
              style={{ marginTop: "-2px" }}
            >
              <HandwrittenArrow className="mt-1 h-6 w-8 -translate-x-1 rotate-[6deg] sm:h-7 sm:w-9" />
              <span
                className="mt-3 -rotate-3 whitespace-nowrap font-handwritten text-sm leading-none sm:text-base"
              >
                pre-ChatGPT era
              </span>
            </span>
          </span>
        </h1>

        <p className="mt-12 text-[15px] font-medium text-orange sm:mt-10 sm:text-base">
          And congrats, you&apos;re in the right place to change that. :)
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setGateOpen(true)}
            className="flex min-h-11 items-center justify-center gap-2 bg-orange px-5 py-2.5 font-mono text-[12px] tracking-wide text-white transition-[transform,background-color] hover:opacity-90 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Make me AI-native
          </button>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star Zero to AI-Native on GitHub"
            className="group flex min-h-11 items-center gap-1.5 rounded-md border border-border px-3 py-2.5 font-mono text-[12px] tracking-wide text-muted transition-[border-color,color] hover:border-faint hover:text-foreground active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            <GithubIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <Star className="h-3 w-3 shrink-0 text-faint transition-colors group-hover:fill-orange group-hover:text-orange" aria-hidden="true" />
            {starCount !== null && starCount}
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className="flex -space-x-2">
            {FEATURED_VOICES.map((name) => (
              <LabLogo
                key={name}
                company={name}
                decorative
                className="h-7 w-7 rounded-full border-2 border-background"
              />
            ))}
          </div>
        </div>
        <p className="mt-2 font-mono text-[10px] tracking-wide text-faint">
          Featuring work from Karpathy, Weng, Altman, Amodei, Huyen, Willison, and more.
        </p>

        <p className="mx-auto mt-7 max-w-[38ch] text-[15px] leading-relaxed text-muted sm:max-w-[65ch]">
          An open-source list of resources for every AI-curious person who wants to become
          AI-native. Explore the best guides, courses, playlists, and whitepapers, straight from
          the people building what you use every day.
        </p>

        <p className="mt-6 font-mono text-[11px] tracking-wide text-faint">
          {isFiltered ? matched.length : GUIDES.length} reads from {matchedSourceCount} sources
        </p>
      </header>

      {/* controls */}
      <div className="mx-auto mt-10 max-w-2xl space-y-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className="w-full border-b border-border bg-transparent pb-2 text-[15px] outline-none placeholder:text-faint focus:border-foreground"
        />

        <div className="flex items-center justify-between">
          <Dropdown
            label="View"
            value={view}
            options={availableViews}
            labelOf={(k) => VIEW_LABELS[k]}
            onChange={setView}
          />
          {showGroupControl ? (
            <Dropdown
              label="Group"
              value={groupBy}
              options={GROUP_KEYS}
              labelOf={(k) => GROUP_LABELS[k]}
              onChange={changeGroup}
              align="right"
            />
          ) : (
            <span className="font-mono text-[11px] text-faint">
              Click a column to sort
            </span>
          )}
        </div>
      </div>

      {/* the active view */}
      <div className="mt-14">
        {matched.length === 0 ? (
          <p className="mx-auto max-w-2xl py-12 text-center text-[14px] text-muted">
            No resources found. Clear the search.
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

      <CreatorSection starCount={starCount} />
    </main>
    </div>
    {gateOpen && <ComingSoonGate onBack={() => setGateOpen(false)} />}
    </>
  );
}
