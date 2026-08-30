"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { XIcon } from "./x-icon";
import { GUIDES } from "@/lib/guides";

const X_URL = "https://x.com/tushaarmehtaa";
const REPO_URL = "https://github.com/tushaarmehtaa/zero-to-ai-native";
const ISSUES_URL = "https://github.com/tushaarmehtaa/zero-to-ai-native/issues";
const SITE_URL = "https://www.zerotoainative.xyz";

const SHARE_TEXT = `Not being AI-native is so 2022. I found this open-source list of ${GUIDES.length} AI reads from the people building the field. Built by @tushaarmehtaa.`;
const TWEET_URL = `https://x.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SITE_URL)}`;

export function CreatorSection({ starCount }: { starCount: number | null }) {
  const [shared, setShared] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Zero to AI-Native", text: SHARE_TEXT, url: SITE_URL });
      } catch {
        /* user cancelled the share sheet; no-op */
      }
      return;
    }
    window.open(TWEET_URL, "_blank", "noopener,noreferrer");
    setShared(true);
    window.setTimeout(() => setShared(false), 2500);
  }

  return (
    <footer className="mx-auto mt-24 max-w-2xl border-t border-border pt-10 text-center">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/tushaar-avatar.webp"
          width={368}
          height={460}
          alt="Tushaar Mehta"
          className="h-7 w-7 rounded-full object-cover"
          style={{ objectPosition: "50% 42%" }}
        />
        <p className="text-[14px] leading-relaxed text-muted">
          Hi, I&apos;m Tushaar. I build with AI, write down what I learn, and share the useful
          parts.
        </p>
      </div>
      <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-muted">
        Zero to AI-Native is the guide I wish someone had handed me when I started. If it helped
        you, stick around. I&apos;m probably building the next thing I wish existed.
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-wide text-faint">
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Tushaar Mehta on X"
          className="group flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <XIcon className="h-3 w-3 transition-colors group-hover:text-orange" aria-hidden="true" />
          Follow @tushaarmehtaa on X
        </a>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Star Zero to AI-Native on GitHub"
          className="group flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <Star className="h-3 w-3 transition-colors group-hover:fill-orange group-hover:text-orange" aria-hidden="true" />
          {starCount !== null ? `Give this repo a star · ${starCount}` : "Give this repo a star"}
        </a>
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          {shared ? "Opened, thank you for sharing" : "Or share the list on X"}
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-8 font-mono text-[10px] tracking-wide text-faint">
        Zero to AI-Native ·{" "}
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
          Open source
        </a>{" "}
        ·{" "}
        <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
          Suggest a source
        </a>{" "}
        · © 2026 Tushaar Mehta
      </p>
    </footer>
  );
}
