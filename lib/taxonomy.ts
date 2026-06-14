export const COMPANIES = [
  "Anthropic",
  "OpenAI",
  "Google",
  "Microsoft",
  "NVIDIA",
  "AWS",
] as const;

export type Company = (typeof COMPANIES)[number];

export const COMPANY_ACCENT: Record<Company, string> = {
  Anthropic: "#d97757",
  OpenAI: "#10a37f",
  Google: "#4285f4",
  Microsoft: "#00a4ef",
  NVIDIA: "#76b900",
  AWS: "#ff9900",
};

export const TOPICS = [
  "Agents",
  "Prompt Engineering",
  "Context & Harness",
  "Foundations",
  "Enterprise & Adoption",
  "MLOps & Production",
  "Skills & Tooling",
  "Research & Economics",
] as const;

export type Topic = (typeof TOPICS)[number];

export type Format = "PDF" | "Web" | "Course";
