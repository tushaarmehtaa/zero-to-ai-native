import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  PencilLine,
} from "lucide-react";
import { CURRICULUM, guidesForUrls, type CurriculumModule } from "@/lib/curriculum";
import { FormatIcon } from "./format-icon";
import { LabLogo } from "./lab-logo";

function ReadingList({ label, urls }: { label: string; urls: string[] }) {
  const guides = guidesForUrls(urls);

  return (
    <section aria-labelledby={`${label.replaceAll(" ", "-")}-heading`}>
      <h2
        id={`${label.replaceAll(" ", "-")}-heading`}
        className="font-mono text-[11px] lowercase tracking-wide text-orange"
      >
        {label}
      </h2>
      <div className="mt-3 divide-y divide-border border-y border-border">
        {guides.map((guide, index) => (
          <a
            key={guide.url}
            href={guide.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[2rem_1fr_auto] items-start gap-3 py-4"
          >
            <span className="pt-0.5 font-mono text-[11px] text-faint">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="block text-[15px] font-medium leading-snug underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-orange">
                {guide.title}
              </span>
              <span className="mt-1.5 block font-mono text-[11px] lowercase text-faint">
                {guide.company} · {guide.year} · {guide.format}
              </span>
            </span>
            <span className="flex items-center gap-2 pt-0.5 text-faint">
              <LabLogo company={guide.company} className="h-3.5 w-3.5" />
              <FormatIcon format={guide.format} className="h-3.5 w-3.5" />
              <ArrowUpRight className="h-3.5 w-3.5 transition-colors group-hover:text-orange" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function ModulePage({ module }: { module: CurriculumModule }) {
  const index = CURRICULUM.findIndex((item) => item.slug === module.slug);
  const previous = CURRICULUM[index - 1];
  const next = CURRICULUM[index + 1];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-16">
      <nav aria-label="Breadcrumb">
        <Link
          href="/curriculum"
          className="inline-flex items-center gap-2 font-mono text-[11px] lowercase tracking-wide text-faint transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          curriculum
        </Link>
      </nav>

      <header className="mt-10 border-b border-border pb-12 sm:mt-14 sm:pb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_16rem] lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[12px] lowercase tracking-wide text-orange">
              module {String(index + 1).padStart(2, "0")} / {String(CURRICULUM.length).padStart(2, "0")}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              {module.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-muted">
              {module.summary}
            </p>
          </div>
          <div className="border-l-2 border-orange pl-4">
            <p className="font-mono text-[10px] lowercase tracking-wide text-faint">the point</p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{module.why}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-12 py-12 lg:grid-cols-[14rem_1fr] lg:gap-16 sm:py-16">
        <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
          <div>
            <h2 className="font-mono text-[11px] lowercase tracking-wide text-faint">before you start</h2>
            <ul className="mt-3 space-y-2">
              {module.prerequisites.map((item) => (
                <li key={item} className="flex gap-2 text-[13px] leading-relaxed text-muted">
                  <Circle className="mt-1.5 h-1.5 w-1.5 shrink-0 fill-orange text-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-[11px] lowercase tracking-wide text-faint">save for later</h2>
            <ul className="mt-3 space-y-2">
              {module.skipForNow.map((item) => (
                <li key={item} className="text-[13px] leading-relaxed text-faint">— {item}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="space-y-14">
          <ReadingList label="start here" urls={module.readFirst} />
          <ReadingList label="go deeper" urls={module.goDeeper} />

          <section className="grid gap-8 border-t border-border pt-10 md:grid-cols-2">
            <div>
              <h2 className="font-mono text-[11px] lowercase tracking-wide text-orange">understanding check</h2>
              <p className="mt-3 text-xl font-semibold tracking-tight">You should be able to…</p>
            </div>
            <ul className="space-y-3">
              {module.checkpoints.map((checkpoint) => (
                <li key={checkpoint} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  {checkpoint}
                </li>
              ))}
            </ul>
          </section>

          <section className="border border-border bg-[#0d0d0d] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-orange">
              <PencilLine className="h-4 w-4" />
              <h2 className="font-mono text-[11px] lowercase tracking-wide">prove it by building</h2>
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">{module.project.title}</h3>
            <p className="mt-2 font-mono text-[11px] lowercase text-faint">
              {module.project.difficulty} · {module.project.suggestedStack}
            </p>
            <div className="mt-7 grid gap-6 border-t border-border pt-6 md:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] lowercase tracking-wide text-faint">make</p>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{module.project.expectedOutput}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] lowercase tracking-wide text-faint">definition of done</p>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{module.project.check}</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <nav aria-label="Curriculum modules" className="grid border-y border-border sm:grid-cols-2">
        <div className="py-6 sm:pr-6">
          {previous ? (
            <Link href={`/curriculum/${previous.slug}`} className="group block">
              <span className="font-mono text-[10px] lowercase text-faint">previous module</span>
              <span className="mt-2 flex items-center gap-2 text-[15px] font-medium group-hover:text-orange">
                <ArrowLeft className="h-4 w-4" /> {previous.title}
              </span>
            </Link>
          ) : <span className="font-mono text-[10px] lowercase text-faint">start of the path</span>}
        </div>
        <div className="border-t border-border py-6 sm:border-l sm:border-t-0 sm:pl-6 sm:text-right">
          {next ? (
            <Link href={`/curriculum/${next.slug}`} className="group block">
              <span className="font-mono text-[10px] lowercase text-faint">next module</span>
              <span className="mt-2 flex items-center gap-2 text-[15px] font-medium group-hover:text-orange sm:justify-end">
                {next.title} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ) : (
            <Link href="/" className="group block">
              <span className="font-mono text-[10px] lowercase text-faint">keep exploring</span>
              <span className="mt-2 flex items-center gap-2 text-[15px] font-medium group-hover:text-orange sm:justify-end">
                full catalog <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}
