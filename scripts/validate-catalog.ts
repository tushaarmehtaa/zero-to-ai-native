import { CURRICULUM } from "../lib/curriculum.ts";
import { GUIDES } from "../lib/guides.ts";
import {
  AUDIENCES,
  COMPANIES,
  FORMATS,
  LEVELS,
  TOPICS,
} from "../lib/taxonomy.ts";

const errors: string[] = [];
const currentYear = new Date().getFullYear();

function reportDuplicates(label: string, values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  for (const value of duplicates) errors.push(`duplicate ${label}: ${value}`);
}

reportDuplicates("guide title", GUIDES.map((guide) => guide.title));
reportDuplicates("guide URL", GUIDES.map((guide) => guide.url));
reportDuplicates("curriculum slug", CURRICULUM.map((curriculumModule) => curriculumModule.slug));

for (const guide of GUIDES) {
  const prefix = `guide \"${guide.title}\"`;

  if (!guide.title.trim()) errors.push(`${prefix} has an empty title`);
  if (!guide.description.trim()) errors.push(`${prefix} has an empty description`);
  if (!COMPANIES.includes(guide.company)) errors.push(`${prefix} has an unknown source`);
  if (!TOPICS.includes(guide.topic)) errors.push(`${prefix} has an unknown topic`);
  if (!FORMATS.includes(guide.format)) errors.push(`${prefix} has an unknown format`);
  if (!LEVELS.includes(guide.level)) errors.push(`${prefix} has an unknown level`);
  if (!AUDIENCES.includes(guide.audience)) errors.push(`${prefix} has an unknown audience`);
  if (!Number.isInteger(guide.year) || guide.year < 2017 || guide.year > currentYear) {
    errors.push(`${prefix} has an invalid year: ${guide.year}`);
  }

  try {
    const parsed = new URL(guide.url);
    if (parsed.protocol !== "https:") errors.push(`${prefix} must use HTTPS`);
  } catch {
    errors.push(`${prefix} has an invalid URL: ${guide.url}`);
  }
}

const catalogUrls = new Set(GUIDES.map((guide) => guide.url));
const requiredUrls: string[] = [];

for (const curriculumModule of CURRICULUM) {
  const moduleUrls = [...curriculumModule.readFirst, ...curriculumModule.goDeeper];
  reportDuplicates(`resource in curriculum module \"${curriculumModule.title}\"`, moduleUrls);
  requiredUrls.push(...curriculumModule.readFirst);

  for (const resourceUrl of moduleUrls) {
    if (!catalogUrls.has(resourceUrl)) {
      errors.push(`curriculum module \"${curriculumModule.title}\" references an unknown URL: ${resourceUrl}`);
    }
  }
}

reportDuplicates("required curriculum resource", requiredUrls);

if (errors.length) {
  console.error(`catalog validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`catalog valid: ${GUIDES.length} guides, ${CURRICULUM.length} modules`);
}
