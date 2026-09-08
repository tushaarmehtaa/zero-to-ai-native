import type { MetadataRoute } from "next";
import { execFileSync } from "child_process";
import { CURRICULUM } from "@/lib/curriculum";

const SITE_URL = "https://www.zerotoainative.xyz";

// Use committed content history when available. Omit unknown dates rather than
// claiming a rebuild changed the content. Track shared data and rendering files.
function lastModifiedFor(paths: string[]): Date | undefined {
  try {
    const output = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", ...paths],
      { cwd: process.cwd(), encoding: "utf8" }
    ).trim();
    const date = output ? new Date(output) : undefined;
    return date && Number.isFinite(date.getTime()) ? date : undefined;
  } catch {
    return undefined;
  }
}

const SHARED_CONTENT = ["lib", "app/layout.tsx", "app/globals.css"];
const HOME_LAST_MODIFIED = lastModifiedFor([
  ...SHARED_CONTENT,
  "app/page.tsx",
  "components",
]);
const CURRICULUM_LAST_MODIFIED = lastModifiedFor([
  ...SHARED_CONTENT,
  "app/curriculum/page.tsx",
  "components/curriculum-view.tsx",
  "components/ladder-view.tsx",
]);
const MODULE_LAST_MODIFIED = lastModifiedFor([
  ...SHARED_CONTENT,
  "app/curriculum/[slug]/page.tsx",
  "components/module-page.tsx",
  "components/format-icon.tsx",
  "components/lab-logo.tsx",
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
