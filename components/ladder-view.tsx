import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock3, LockKeyhole, UnlockKeyhole } from "lucide-react";
import { CURRICULUM, guideForUrl } from "@/lib/curriculum";
import {
  COMPLETION_MECHANICS,
  CORE_HOURS,
  DISALLOWED_PROJECTS,
  FREE_HOURS,
  LADDER,
  MODULE_DEPTH_LABELS,
  PRODUCT_CONTRACT,
} from "@/lib/ladder";

const depthStyle = {
  apply: "border-orange/60 bg-orange/10 text-foreground",
  orient: "border-border text-muted",
  save: "border-transparent text-faint",
  conditional: "border-orange/30 text-muted",
} as const;

export function LadderView() {
  return (
    <section id="practice-ladder" className="scroll-mt-8 border-t border-border py-16">
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] lowercase tracking-wide text-orange">the practice ladder</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          learn how to work with an agent.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          The modules teach the subjects. These six evidence-gated rungs sequence the work. You keep one
          product, ship it in the first night, and make its environment more capable as you progress.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] lowercase text-faint">
          <span>{CORE_HOURS} guided hours</span>
          <span>{FREE_HOURS} hours free</span>
          <span>required excerpts included</span>
          <span>optional depth has no clock</span>
        </div>
      </header>

      <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
        <div className="bg-background p-5">
          <p className="font-mono text-[10px] lowercase tracking-wide text-orange">the product contract</p>
          <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-muted">
            {PRODUCT_CONTRACT.map((item) => <li key={item}>— {item}</li>)}
          </ul>
        </div>
        <div className="bg-background p-5">
          <p className="font-mono text-[10px] lowercase tracking-wide text-orange">do not build for this course</p>
          <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-muted">
            {DISALLOWED_PROJECTS.map((item) => <li key={item}>— {item}</li>)}
          </ul>
        </div>
        <div className="bg-background p-5">
          <p className="font-mono text-[10px] lowercase tracking-wide text-orange">designed for interrupted nights</p>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">
            Relative deadlines, 45/90-minute sessions, saved commits, a seven-day recovery protocol,
            scaffold removal, and a help ladder keep one missed week from becoming a restart.
          </p>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto border-y border-border py-5">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr>
              <th className="w-56 pb-4 pr-4 font-mono text-[10px] font-normal lowercase text-faint">
                practice capability
              </th>
              {CURRICULUM.map((module) => (
                <th key={module.slug} className="pb-4 px-1 font-mono text-[10px] font-normal lowercase text-faint">
                  {module.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {LADDER.map((rung, rungIndex) => (
              <tr key={rung.slug}>
                <th className="py-3 pr-4 text-[12px] font-medium leading-snug">
                  {rungIndex + 1}. {rung.title}
                </th>
                {CURRICULUM.map((module) => {
                  const depth = rung.modules[module.slug];
                  return (
                    <td key={module.slug} className="px-1 py-3">
                      <span
                        className={`block border px-2 py-1 text-center font-mono text-[9px] lowercase ${depthStyle[depth]}`}
                        title={`${module.title}: ${MODULE_DEPTH_LABELS[depth]}`}
                      >
                        {depth === "conditional" ? "if used" : depth}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 space-y-5">
        {LADDER.map((rung, index) => (
          <article
            key={rung.slug}
            id={`rung-${index + 1}`}
            className={`scroll-mt-8 border p-6 sm:p-8 ${rung.access === "free" ? "border-orange/50" : "border-border"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] lowercase tracking-wide">
                  <span className="text-orange">rung {index + 1} / {LADDER.length}</span>
                  <span className="inline-flex items-center gap-1.5 text-faint">
                    <Clock3 className="h-3 w-3" /> {rung.hours} hours
                  </span>
                  <span className={`inline-flex items-center gap-1.5 ${rung.access === "free" ? "text-orange" : "text-faint"}`}>
                    {rung.access === "free" ? <UnlockKeyhole className="h-3 w-3" /> : <LockKeyhole className="h-3 w-3" />}
                    {rung.access === "free" ? "free in full" : "paid guided lab"}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">{rung.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{rung.promise}</p>
              </div>
              <p className="max-w-xs border-l-2 border-orange pl-4 text-[13px] leading-relaxed text-muted">
                <span className="block font-mono text-[9px] lowercase tracking-wide text-faint">you know it works when</span>
                <span className="mt-2 block">{rung.outcome}</span>
              </p>
            </div>

            <div className="mt-7 grid gap-7 border-t border-border pt-6 lg:grid-cols-3">
              <div>
                <h4 className="font-mono text-[10px] lowercase tracking-wide text-faint">you should be able to</h4>
                <ul className="mt-3 space-y-2">
                  {rung.canDo.map((item) => (
                    <li key={item} className="flex gap-2 text-[13px] leading-relaxed text-muted">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-[10px] lowercase tracking-wide text-faint">start with</h4>
                <ul className="mt-3 space-y-3">
                  {rung.requiredReading.map((reading) => {
                    const guide = guideForUrl(reading.url);
                    return (
                      <li key={reading.url} className="text-[13px] leading-relaxed text-muted">
                        <a href={guide.url} target="_blank" rel="noopener noreferrer" className="group text-foreground">
                          {guide.title}
                          <ArrowUpRight className="ml-1 inline h-3 w-3 text-faint group-hover:text-orange" />
                        </a>
                        <span className="mt-1 block text-faint">{reading.assignment}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-[10px] lowercase tracking-wide text-faint">save for later</h4>
                <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-faint">
                  {rung.saveForLater.map((item) => <li key={item}>— {item}</li>)}
                </ul>
              </div>
            </div>

            {rung.access === "free" && rung.practice ? (
              <div className="mt-8 border-t border-orange/30 pt-7">
                <p className="font-mono text-[10px] lowercase tracking-wide text-orange">practice · free in full</p>
                <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-muted">
                  <span className="text-foreground">make:</span> {rung.practice.make}
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-[10px] lowercase text-faint">codex path</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{rung.practice.codex}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] lowercase text-faint">claude code path</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{rung.practice.claude}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] lowercase text-faint">seeded failure</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{rung.practice.seededFailure}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] lowercase text-faint">budget and stop condition</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{rung.practice.budget}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] lowercase text-faint">you know it works when</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{rung.practice.check}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] lowercase text-faint">save this</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{rung.practice.save}</p>
                  </div>
                </div>
                <p className="mt-7 border-l-2 border-border pl-4 text-[12px] leading-relaxed text-faint">
                  Codex is the reference harness. Tushar holds an OpenAI Codex Ambassador role. The course teaches
                  mechanisms, uses Claude Code as a first-class adapter, and names real differences instead of claiming parity.
                  Tool-specific instructions are versioned and reviewed every 4–6 weeks.
                </p>
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-[13px] leading-relaxed text-faint">
                  The knowledge stays open. Payment unlocks the seeded failures, adapter labs, grading, executable
                  verification skills, scaffold removal, and graduation evidence path.
                </p>
                <span className="shrink-0 border border-border px-3 py-2 font-mono text-[10px] lowercase text-faint">
                  paid lab
                </span>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="mt-10 border-y border-border py-8">
        <p className="font-mono text-[10px] lowercase tracking-wide text-orange">how finishing works</p>
        <div className="mt-4 grid gap-x-10 gap-y-3 md:grid-cols-2">
          {COMPLETION_MECHANICS.map((item) => (
            <p key={item} className="text-[13px] leading-relaxed text-muted">— {item}</p>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 border border-border p-6 md:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] lowercase tracking-wide text-orange">free and open source forever</p>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            The catalog, eight-module map, all reading, capability statements, save-for-later guidance, and both
            practice briefs in every module. Community suggestions continue through GitHub.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] lowercase tracking-wide text-orange">what the paid path adds</p>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            Supervised sequencing, prepared failures, Codex and Claude adapters, executable checks, grading,
            loop budgets, scaffold removal, and the evidence package that proves you walked the path.
          </p>
        </div>
        <Link href="#subject-map" className="group font-mono text-[11px] lowercase text-faint hover:text-foreground md:col-span-2">
          return to the subject map <span className="text-orange">↑</span>
        </Link>
      </div>
    </section>
  );
}
