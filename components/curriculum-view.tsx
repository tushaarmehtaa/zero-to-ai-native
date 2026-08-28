import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CURRICULUM } from "@/lib/curriculum";
import { LADDER } from "@/lib/ladder";
import { GithubIcon } from "./github-icon";

const RUNG_INDEX_COPY = [
  {
    title: "Turn an idea into a small live product",
    summary: "Choose one useful job, build the smallest working version, and put it at a public URL.",
  },
  {
    title: "Check what the agent changed",
    summary: "Use the diff, logs, and working product to decide whether the change is actually correct.",
  },
  {
    title: "Make the project check itself",
    summary: "Add tests, logs, and scripts so the agent can catch its own mistakes before you review them.",
  },
  {
    title: "Split work without losing control",
    summary: "Give separate jobs clear boundaries, then bring the results together without hidden conflicts.",
  },
  {
    title: "Run feedback loops with limits",
    summary: "Let the agent iterate against real checks while time, cost, and stop conditions stay fixed.",
  },
  {
    title: "Own a product people use",
    summary: "Handle real users, failures, costs, misuse, and model changes after the first launch.",
  },
] as const;

export function CurriculumView() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] lowercase tracking-wide text-faint transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          all resources
        </Link>
        <h1 className="mt-10 max-w-xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
          Learn what matters. Build what you can prove.
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
          Eight subjects explain AI. Six practical steps teach you to build with an agent.
        </p>
      </header>

      <section aria-labelledby="modules-heading" className="mt-16 sm:mt-24">
        <div className="max-w-xl">
          <h2 id="modules-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Understand AI
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            Start with Foundations, or open the subject you need now.
          </p>
        </div>

        <div className="mt-7 grid border-t border-border md:grid-cols-2">
          {CURRICULUM.map((module, index) => (
            <Link
              key={module.slug}
              href={`/curriculum/${module.slug}`}
              className="group border-b border-border py-6 transition-colors hover:bg-[#0d0d0d] md:odd:pr-8 md:even:pl-8 md:even:border-l"
            >
              <div className="flex gap-4">
                <span className="pt-1 font-mono text-[10px] text-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[18px] font-medium tracking-tight transition-colors group-hover:text-orange">
                    {module.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted">
                    {module.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] lowercase text-faint">
                    open module
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-hover:text-orange" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="rungs-heading" className="mt-20 sm:mt-28">
        <div className="max-w-xl">
          <h2 id="rungs-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Build with an agent
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            One product grows across six steps. The first step is free.
          </p>
        </div>

        <div className="mt-7 border-t border-border">
          {LADDER.map((rung, index) => (
            <Link
              key={rung.slug}
              href={`/curriculum/rung-${index + 1}`}
              className="group grid gap-3 border-b border-border py-6 transition-colors hover:bg-[#0d0d0d] sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:gap-5"
            >
              <span className="font-mono text-[11px] text-orange">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-[18px] font-medium tracking-tight transition-colors group-hover:text-orange">
                  {RUNG_INDEX_COPY[index].title}
                </h3>
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted">
                  {RUNG_INDEX_COPY[index].summary}
                </p>
              </div>
              <div className="flex items-center justify-between gap-5 sm:justify-end">
                <span className="font-mono text-[10px] lowercase text-faint">
                  {rung.hours} hours · {rung.access}
                </span>
                <ArrowRight className="h-4 w-4 text-faint transition-transform group-hover:translate-x-1 group-hover:text-orange" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-24 border-t border-border py-10 sm:mt-32">
        <div className="flex flex-col gap-5 text-[13px] leading-relaxed text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>The catalog and eight modules stay free. The guided course is paid after rung one.</p>
          <a
            href="https://github.com/tushaarmehtaa/zero-to-ai-native/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 font-mono text-[10px] lowercase text-faint hover:text-foreground"
          >
            suggest a source
            <GithubIcon className="h-3.5 w-3.5 transition-colors group-hover:text-orange" />
          </a>
        </div>
      </footer>
    </main>
  );
}
