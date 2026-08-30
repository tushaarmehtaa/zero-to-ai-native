import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CURRICULUM } from "@/lib/curriculum";
import { GithubIcon } from "./github-icon";
import { LadderView } from "./ladder-view";

export function CurriculumView() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wide text-faint transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All resources
        </Link>
        <h1 className="mt-10 max-w-xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
          Learn what matters. Build what you can prove.
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
          Eight subjects explain AI. Six practical steps teach you to build with an agent.
        </p>
      </header>

      <section id="subject-map" aria-labelledby="modules-heading" className="mt-16 scroll-mt-8 sm:mt-24">
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
              className="group border-b border-border py-6 transition-colors hover:bg-foreground/[0.03] md:odd:pr-8 md:even:pl-8 md:even:border-l"
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
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] text-faint">
                    Open module
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-hover:text-orange" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <LadderView />

      <footer className="mt-24 border-t border-border py-10 sm:mt-32">
        <div className="flex flex-col gap-5 text-[13px] leading-relaxed text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>The catalog and eight modules stay free. The guided course is paid after rung one.</p>
          <a
            href="https://github.com/tushaarmehtaa/zero-to-ai-native/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 font-mono text-[10px] text-faint hover:text-foreground"
          >
            Suggest a source
            <GithubIcon className="h-3.5 w-3.5 transition-colors group-hover:text-orange" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </main>
  );
}
