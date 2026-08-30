"use client";

import { useState } from "react";
import {
  siAnthropic,
  siDeepseek,
  siGoogle,
  siHuggingface,
  siMeta,
  siMistralai,
  siQwen,
  siShopify,
} from "simple-icons";
import type { Company } from "@/lib/taxonomy";

type SimpleIcon = { path: string; hex: string };

const SI: Partial<Record<Company, SimpleIcon>> = {
  Anthropic: siAnthropic,
  Google: siGoogle,
  Meta: siMeta,
  "Hugging Face": siHuggingface,
  Mistral: siMistralai,
  DeepSeek: siDeepseek,
  Qwen: siQwen,
  Shopify: siShopify,
};

// brand colours for the logos that aren't in the icon set
const BRAND: Partial<Record<Company, string>> = {
  Anthropic: "#ffffff",
  OpenAI: "#10a37f",
  AWS: "#ff9900",
  Google: "#4285f4", // simple-icons google hex is muted; use the real blue
};

const fav = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

// real avatars (github) for people, site favicons for orgs without a vector logo
const AVATAR: Partial<Record<Company, { url: string; round?: boolean }>> = {
  "Dario Amodei": { url: fav("darioamodei.com") },
  "Sam Altman": { url: "https://github.com/sama.png", round: true },
  "Leopold Aschenbrenner": { url: fav("situational-awareness.ai") },
  "Andrej Karpathy": { url: "https://github.com/karpathy.png", round: true },
  "Lilian Weng": { url: "https://github.com/lilianweng.png", round: true },
  "Hamel Husain": { url: "https://github.com/hamelsmu.png", round: true },
  "Eugene Yan": { url: "https://github.com/eugeneyan.png", round: true },
  "Chip Huyen": { url: "https://github.com/chiphuyen.png", round: true },
  "Simon Willison": { url: "https://github.com/simonw.png", round: true },
  "Jay Alammar": { url: "https://github.com/jalammar.png", round: true },
  "Sebastian Raschka": { url: "https://github.com/rasbt.png", round: true },
  "3Blue1Brown": { url: "https://github.com/3b1b.png", round: true },
  "Benedict Evans": { url: fav("ben-evans.com") },
  "Nous Research": { url: fav("nousresearch.com") },
  Ramp: { url: fav("ramp.com") },
  Cohere: { url: fav("cohere.com") },
  Chroma: { url: fav("trychroma.com") },
  NBER: { url: fav("nber.org") },
  Stanford: { url: fav("stanford.edu") },
  MIT: { url: fav("mit.edu") },
};

// simple-icons ships Anthropic and Google. OpenAI, Microsoft and AWS
// were removed from the set, so those are hand-rolled below.
const OPENAI_PATH =
  "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.1419.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z";

export function LabLogo({
  company,
  className = "h-3.5 w-3.5",
  decorative = false,
}: {
  company: Company;
  className?: string;
  decorative?: boolean;
}) {
  const brand = SI[company];
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill={BRAND[company] ?? `#${brand.hex}`}
        role="img"
        aria-label={company}
      >
        <path d={brand.path} />
      </svg>
    );
  }

  switch (company) {
    case "OpenAI":
      return (
        <svg viewBox="0 0 24 24" className={className} fill={BRAND.OpenAI} role="img" aria-label="OpenAI">
          <path d={OPENAI_PATH} />
        </svg>
      );
    case "Microsoft":
      return (
        <svg viewBox="0 0 23 23" className={className} role="img" aria-label="Microsoft">
          <rect x="1" y="1" width="10" height="10" fill="#f25022" />
          <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
          <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
          <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
        </svg>
      );
    case "AWS":
      // no clean open logo in the icon sets; the smile-arrow mark, hand-drawn
      return (
        <svg
          viewBox="0 0 24 16"
          className={className}
          fill="none"
          stroke={BRAND.AWS}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-label="AWS"
        >
          <path d="M2 7c4.5 5 13.5 5 18.5 1" />
          <path d="M16.5 8.5l4.2-1.4 1 4" />
        </svg>
      );
    default:
      return <SourceMark company={company} className={className} decorative={decorative} />;
  }
}

function SourceMark({
  company,
  className,
  decorative = false,
}: {
  company: Company;
  className: string;
  decorative?: boolean;
}) {
  const avatar = AVATAR[company];
  const [failed, setFailed] = useState(false);

  if (avatar && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatar.url}
        alt={decorative ? "" : company}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`${className} shrink-0 object-contain ${
          avatar.round
            ? "rounded-full"
            : "rounded-[3px] bg-white/90 p-0.5"
        }`}
      />
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[3px] border border-current text-[8px] font-semibold leading-none text-muted ${className}`}
      aria-label={decorative ? undefined : company}
      aria-hidden={decorative || undefined}
    >
      {company.charAt(0)}
    </span>
  );
}
