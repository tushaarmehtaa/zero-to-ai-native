"use client";

import { useEffect, useState, type FormEvent } from "react";
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

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const statusMessage =
    status === "loading"
      ? "Joining the waitlist…"
      : status === "done"
        ? "You're on the list. I'll write when there's something new. No spam promise."
        : status === "error"
          ? "That didn't go through. Check your email and try again."
          : "";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/[0.06] p-4 sm:p-5">
      <div className="relative flex max-h-[calc(100svh-2rem)] w-full max-w-xl flex-col overflow-y-auto border border-border bg-background p-5 shadow-2xl sm:max-h-[calc(100svh-2.5rem)] sm:p-10">
        <button
          onClick={onBack}
          className="group mb-4 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] tracking-wide text-faint transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          Back
        </button>

        <p className="font-mono text-[11px] tracking-widest text-orange">Coming next</p>
        <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.02em] sm:mt-4 sm:text-3xl md:text-4xl">
          The internet has everything, and that&apos;s a big problem.
        </h1>
        <p className="mt-3 max-w-lg text-[14px] leading-snug text-muted sm:mt-5 sm:text-[15px] sm:leading-relaxed">
          The knowledge you need to become AI-native is already out there. If you know what
          you&apos;re looking for, the world is a library.
        </p>
        <p className="mt-2 max-w-lg text-[14px] leading-snug text-muted sm:mt-3 sm:text-[15px] sm:leading-relaxed">
          The hard part is knowing where to begin, what to ignore, and when to stop reading and
          start building.
        </p>
        <p className="mt-3 max-w-lg text-[14px] font-medium text-foreground sm:mt-5 sm:text-[15px]">
          So I&apos;m building the guide I wish someone had handed me:
        </p>

        <ul className="mt-4 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-6">
          {COMING.map(({ icon: Icon, label, detail }) => (
            <li key={label} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
              <div>
                <span className="text-[14px] font-medium text-foreground">{label}</span>
                <span className="block text-[13px] leading-snug text-muted sm:leading-relaxed">{detail}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 sm:mt-9">
          <p role="status" aria-live="polite" className="sr-only">
            {statusMessage}
          </p>
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
                  className="flex min-h-11 w-full shrink-0 items-center justify-center gap-2 bg-orange px-5 py-3 font-mono text-[12px] tracking-wide text-white transition-[transform,opacity] hover:opacity-90 active:scale-[0.97] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:w-auto"
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
