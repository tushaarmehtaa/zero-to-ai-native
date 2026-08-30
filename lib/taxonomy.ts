export const COMPANIES = [
  "OpenAI",
  "Anthropic",
  "Google",
  "Meta",
  "Microsoft",
  "Mistral",
  "Cohere",
  "Hugging Face",
  "Chroma",
  "DeepSeek",
  "Moonshot AI",
  "Qwen",
  "Nous Research",
  "Ramp",
  "AWS",
  "Shopify",
  // people & schools
  "Dario Amodei",
  "Sam Altman",
  "Leopold Aschenbrenner",
  "Lilian Weng",
  "Andrej Karpathy",
  "Chip Huyen",
  "Eugene Yan",
  "Hamel Husain",
  "Simon Willison",
  "Benedict Evans",
  "Jay Alammar",
  "Sebastian Raschka",
  "3Blue1Brown",
  "Stanford",
  "MIT",
  "NBER",
] as const;
export type Company = (typeof COMPANIES)[number];

export const TOPICS = [
  "Agents",
  "Prompt Engineering",
  "Context & Harness",
  "Foundations",
  "Papers",
  "Enterprise & Adoption",
  "MLOps & Production",
  "Skills & Tooling",
  "Research & Economics",
  "Perspectives & Futures",
] as const;
export type Topic = (typeof TOPICS)[number];

export type Format = "PDF" | "Web" | "Blog" | "Course" | "Video";
export const FORMATS: Format[] = ["PDF", "Web", "Blog", "Course", "Video"];

// where it sits on the learning curve
export const LEVELS = ["intro", "build", "deep"] as const;
export type Level = (typeof LEVELS)[number];

// who it's for
export const AUDIENCES = ["builder", "founder", "researcher"] as const;
export type Audience = (typeof AUDIENCES)[number];

// derived from page count
export const LENGTHS = ["quick", "meaty", "tome"] as const;
export type Length = (typeof LENGTHS)[number];

export type GroupKey = "topic" | "lab" | "format" | "level" | "length" | "audience";

export const GROUP_LABELS: Record<GroupKey, string> = {
  topic: "Topic",
  lab: "Source",
  format: "Format",
  level: "Level",
  length: "Length",
  audience: "Audience",
};

export type ViewKey = "list" | "table" | "board" | "cards";

export const VIEW_LABELS: Record<ViewKey, string> = {
  list: "List",
  table: "Table",
  board: "Board",
  cards: "Cards",
};
