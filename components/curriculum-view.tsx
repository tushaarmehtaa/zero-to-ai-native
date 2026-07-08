import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, PencilLine } from "lucide-react";
import { CURRICULUM, guidesForUrls, type CurriculumModule } from "@/lib/curriculum";

function ResourceList({ title, urls }: { title: string; urls: string[] }) {
  const guides = guidesForUrls(urls);

  return (
    <div>
      <h3 className="font-mono text-[11px] lowercase tracking-wide text-faint">{title}</h3>
      <div className="mt-3 divide-y divide-border">
        {guides.map((guide) => (
          <a
            key={guide.url}
            href={guide.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-4 py-3"
          >
            <span>
              <span className="block text-[14px] font-medium leading-snug underline decoration-transparent underline-offset-[3px] group-hover:decoration-orange">
                {guide.title}
              </span>
              <span className="mt-1 block font-mono text-[11px] lowercase text-faint">
                {guide.company} · {guide.format.toLowerCase()} · {guide.year}
              </span>
            </span>
            <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-faint opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-orange" />
          </a>
        ))}
      </div>
    </div>
  );
}

function ModuleSection({ module, index }: { module: CurriculumModule; index: number }) {
  return (
    <section id={module.slug} className="scroll-mt-8 border-t border-border py-12">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <p className="font-mono text-[12px] lowercase tracking-wide text-orange">
            part {index + 1}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{module.title}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">{module.summary}</p>
        </aside>

        <div className="space-y-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-[11px] lowercase tracking-wide text-faint">why learn this</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{module.why}</p>
            </div>
            <div>
              <h3 className="font-mono text-[11px] lowercase tracking-wide text-faint">before this</h3>
              <ul className="mt-2 space-y-1.5 text-[14px] leading-relaxed text-muted">
                {module.prerequisites.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <ResourceList title="start with" urls={module.readFirst} />
            <ResourceList title="read next" urls={module.goDeeper} />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-[11px] lowercase tracking-wide text-faint">you should be able to</h3>
              <ul className="mt-3 space-y-2">
                {module.checkpoints.map((checkpoint) => (
                  <li key={checkpoint} className="flex gap-2 text-[14px] leading-relaxed text-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                    <span>{checkpoint}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] lowercase tracking-wide text-faint">save for later</h3>
              <ul className="mt-3 space-y-1.5 text-[14px] leading-relaxed text-muted">
                {module.skipForNow.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-border p-5">
            <div className="flex items-center gap-2 text-orange">
              <PencilLine className="h-4 w-4" />
              <h3 className="font-mono text-[11px] lowercase tracking-wide">practice</h3>
            </div>
            <div className="mt-4 grid gap-5 md:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="text-[16px] font-medium">{module.project.title}</p>
                <p className="mt-2 font-mono text-[11px] lowercase text-faint">
                  {module.project.difficulty} · {module.project.suggestedStack}
                </p>
              </div>
              <div className="space-y-3 text-[14px] leading-relaxed text-muted">
                <p>
                  <span className="text-foreground">make:</span> {module.project.expectedOutput}
                </p>
                <p>
                  <span className="text-foreground">you know it works when:</span> {module.project.check}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CurriculumView() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
      <header className="max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] lowercase tracking-wide text-faint transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          all resources
        </Link>
        <h1 className="mt-8 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          learn ai in the right order.
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted">
          Start with the original sources. Build small things as you go. Skip the noise until you need it.
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          {CURRICULUM.map((module, index) => (
            <a
              key={module.slug}
              href={`#${module.slug}`}
              className="border border-border px-3 py-1.5 font-mono text-[11px] lowercase text-muted transition-colors hover:border-faint hover:text-foreground"
            >
              {index + 1}. {module.title}
            </a>
          ))}
        </div>
      </header>

      <div className="mt-12">
        {CURRICULUM.map((module, index) => (
          <ModuleSection key={module.slug} module={module} index={index} />
        ))}
      </div>
    </main>
  );
}
