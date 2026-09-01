import type { MetadataRoute } from "next";
import { execFileSync } from "child_process";
import { CURRICULUM } from "@/lib/curriculum";

const SITE_URL = "https://www.zerotoainative.xyz";

// Truthful last-modified per route: the most recent commit touching the files
// that actually render it. Falls back to now() only if git history is
// unavailable (e.g. a shallow clone in some CI environments).
function lastModifiedFor(paths: string[]): Date {
  try {
    const output = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", ...paths],
      { cwd: process.cwd(), encoding: "utf8" }
    ).trim();
    return output ? new Date(output) : new Date();
  } catch {
    return new Date();
  }
}

const HOME_LAST_MODIFIED = lastModifiedFor(["app/page.tsx", "components/hub.tsx", "components/creator-section.tsx"]);
const CURRICULUM_LAST_MODIFIED = lastModifiedFor([
  "app/curriculum/page.tsx",
  "components/curriculum-view.tsx",
  "components/ladder-view.tsx",
  "lib/curriculum.ts",
  "lib/ladder.ts",
]);
const MODULE_LAST_MODIFIED = lastModifiedFor([
  "app/curriculum/[slug]/page.tsx",
  "components/module-page.tsx",
  "lib/curriculum.ts",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    {
      url: "https://www.zerotoainative.xyz",
      lastModified: HOME_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.zerotoainative.xyz/curriculum",
      lastModified: CURRICULUM_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  return [
    ...corePages,
    ...CURRICULUM.map(({ slug }) => ({
      url: `${SITE_URL}/curriculum/${slug}`,
      lastModified: MODULE_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
