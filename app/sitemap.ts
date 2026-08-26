import type { MetadataRoute } from "next";
import { CURRICULUM } from "@/lib/curriculum";

const SITE_URL = "https://www.zerotoainative.xyz";
const CONTENT_LAST_MODIFIED = new Date("2026-08-27T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    {
      url: "https://www.zerotoainative.xyz",
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.zerotoainative.xyz/curriculum",
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  return [
    ...corePages,
    ...CURRICULUM.map(({ slug }) => ({
      url: `${SITE_URL}/curriculum/${slug}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
