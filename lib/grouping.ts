import type { Guide } from "./guides";
import {
  AUDIENCES,
  COMPANIES,
  FORMATS,
  type GroupKey,
  LENGTHS,
  type Length,
  LEVELS,
  TOPICS,
} from "./taxonomy";

export const PREFERRED_SOURCE = "OpenAI";

// Keep the catalog's existing sequence intact while giving the preferred source
// first position in every presentation that renders a guide collection.
export function prioritizeGuides(guides: readonly Guide[]): Guide[] {
  return guides
    .map((guide, index) => ({ guide, index }))
    .sort((a, b) => {
      const aPriority = a.guide.company === PREFERRED_SOURCE ? 0 : 1;
      const bPriority = b.guide.company === PREFERRED_SOURCE ? 0 : 1;
      return aPriority - bPriority || a.index - b.index;
    })
    .map(({ guide }) => guide);
}

export function lengthOf(g: Guide): Length {
  if (g.pages) {
    if (g.pages < 25) return "quick";
    if (g.pages <= 50) return "meaty";
    return "tome";
  }
  if (g.format === "Web" || g.format === "Blog") return "quick";
  if (g.format === "Course" || g.format === "Video") return "tome";
  return "meaty";
}

// the bucket a guide falls into for a given group-by axis
export function valueOf(g: Guide, key: GroupKey): string {
  switch (key) {
    case "topic":
      return g.topic;
    case "lab":
      return g.company;
    case "format":
      return g.format.toLowerCase();
    case "level":
      return g.level;
    case "length":
      return lengthOf(g);
    case "audience":
      return g.audience;
  }
}

// the buckets for an axis, in canonical order
export function bucketsFor(key: GroupKey): string[] {
  switch (key) {
    case "topic":
      return [...TOPICS];
    case "lab":
      return [...COMPANIES];
    case "format":
      return FORMATS.map((f) => f.toLowerCase());
    case "level":
      return [...LEVELS];
    case "length":
      return [...LENGTHS];
    case "audience":
      return [...AUDIENCES];
  }
}

export type Group = { key: string; items: Guide[] };

// split guides into ordered, non-empty groups for an axis
export function groupGuides(guides: Guide[], key: GroupKey): Group[] {
  return bucketsFor(key)
    .map((bucket) => ({
      key: bucket,
      items: prioritizeGuides(guides.filter((g) => valueOf(g, key) === bucket)),
    }))
    .filter((g) => g.items.length > 0);
}
