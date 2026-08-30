"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, Lightbulb, Target, Users } from "lucide-react";

const COMING: { icon: typeof BookOpen; label: string; detail: string }[] = [
  {
    icon: BookOpen,
    label: "A curriculum that makes itself unnecessary",
    detail: "Learn the foundations in order until you can confidently decide what to learn next without me.",
  },
  {
    icon: Target,
    label: "Practice that is actually very very fun",
    detail: "Six capability rungs with carefully designed challenges, checkpoints, projects, and real systems to build.",
  },
  {
    icon: Lightbulb,
    label: "An idea a day",
    detail: "One useful idea in AI at a time. No daily noise, trend summaries, or filler.",
  },
  {
    icon: Users,
    label: "People worth following",
    detail: "The builders, researchers, and labs behind the work.",
  },
];

export function ComingSoonGate({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "done") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/[0.06] px-5 py-10">
      <div className="relative w-full max-w-xl border border-border bg-background p-8 shadow-2xl sm:p-10">
        <button
          onClick={onBack}
          className="group mb-8 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] tracking-wide text-faint transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          Back
        </button>

        <p className="font-mono text-[11px] tracking-widest text-orange">Coming next</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          The internet has everything, and that&apos;s a big problem.
        </h1>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
          The knowledge you need to become AI-native is already out there. If you know what
          you&apos;re looking for, the world is a library.
        </p>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">
          The hard part is knowing where to begin, what to ignore, and when to stop reading and
          start building.
        </p>
        <p className="mt-5 max-w-lg text-[15px] font-medium text-foreground">
          So I&apos;m building the guide I wish someone had handed me:
        </p>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {COMING.map(({ icon: Icon, label, detail }) => (
            <li key={label} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
              <div>
                <span className="text-[14px] font-medium text-foreground">{label}</span>
                <span className="block text-[13px] leading-relaxed text-muted">{detail}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-9">
          {status === "done" ? (
            <div className="flex items-center gap-2 border border-orange/40 bg-orange/[0.06] px-4 py-3 text-[13px] text-foreground">
              <Check className="h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
              You&apos;re on the list. I&apos;ll write when there&apos;s something new. No spam
              promise :)
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <label htmlFor="waitlist-email" className="font-mono text-[11px] tracking-wide text-faint">
                Email address
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="min-h-11 w-full flex-1 border border-border bg-background px-4 py-3 text-[14px] text-foreground placeholder:text-faint focus:border-orange focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex min-h-11 shrink-0 items-center justify-center gap-2 bg-orange px-5 py-3 font-mono text-[12px] tracking-wide text-white transition-[transform,opacity] hover:opacity-90 active:scale-[0.97] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  {status === "loading" ? "Joining…" : "Get early access"}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 text-[12px] text-orange">
              That didn&apos;t go through. Check your email and try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
