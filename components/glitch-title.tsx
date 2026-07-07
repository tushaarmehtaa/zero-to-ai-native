"use client";

import { useEffect, useState } from "react";

const FINAL = "zero to ai-native";
const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#%&/<>*+_";

export function GlitchTitle() {
  const [text, setText] = useState(FINAL);
  const [phase, setPhase] = useState<"idle" | "glitching" | "done">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timeout = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(timeout);
    }

    const phaseTimeout = window.setTimeout(() => setPhase("glitching"), 0);
    const duration = 1100;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // ease the lock so it accelerates toward the end
      const lockUntil = Math.floor(p * p * FINAL.length);
      let out = "";
      for (let i = 0; i < FINAL.length; i++) {
        const ch = FINAL[i];
        if (ch === " " || ch === "-") out += ch;
        else if (i < lockUntil) out += ch;
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setText(out);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setText(FINAL);
        setPhase("done");
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      window.clearTimeout(phaseTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
      <span
        data-text={text}
        className={`glitch ${phase === "glitching" ? "is-glitching" : ""}`}
      >
        {text}
      </span>
      {phase === "glitching" && <span className="glitch-caret" aria-hidden />}
    </h1>
  );
}
