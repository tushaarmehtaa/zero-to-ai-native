import { guideUrl, type CurriculumModule } from "./curriculum.ts";

export type ModuleSlug = CurriculumModule["slug"];
export type ModuleDepth = "apply" | "orient" | "save" | "conditional";

export type RequiredReading = {
  module: ModuleSlug;
  url: string;
  assignment: string;
};

export type LadderRung = {
  slug: string;
  title: string;
  hours: number;
  access: "free" | "paid";
  promise: string;
  outcome: string;
  modules: Record<ModuleSlug, ModuleDepth>;
  requiredReading: RequiredReading[];
  saveForLater: string[];
  canDo: string[];
  practice?: {
    make: string;
    codex: string;
    claude: string;
    seededFailure: string;
    check: string;
    save: string;
    budget: string;
  };
};

export const MODULE_DEPTH_LABELS: Record<ModuleDepth, string> = {
  apply: "Apply now",
  orient: "Orient",
  save: "Save for later",
  conditional: "Apply if relevant",
};

export const LADDER: LadderRung[] = [
  {
    slug: "bounded-change",
    title: "Turn intent into a bounded, visible change",
    hours: 12,
    access: "free",
    promise: "Ship a deterministic thin slice to a real URL, then prove what changed from evidence.",
    outcome: "A stranger can open the URL, complete one useful job, and see the intended output.",
    modules: {
      foundations: "orient",
      prompting: "apply",
      "retrieval-rag": "save",
      "context-engineering": "orient",
      agents: "save",
      evals: "orient",
      "production-ai": "apply",
      "safety-governance": "apply",
    },
    requiredReading: [
      {
        module: "prompting",
        url: guideUrl("Prompt Engineering Interactive Tutorial"),
        assignment: "Complete the exercises on clear instructions, examples, and output shape.",
      },
      {
        module: "production-ai",
        url: guideUrl("From Experiments to Deployments"),
        assignment: "Read the sections that separate a demo from a deployable product slice.",
      },
      {
        module: "safety-governance",
        url: guideUrl("Running Codex Safely at OpenAI"),
        assignment: "Read the sandbox, approval, and network-boundary sections.",
      },
    ],
    saveForLater: [
      "neural-network training and transformer math",
      "retrieval systems and agent architecture",
      "authentication, billing, and full observability",
      "formal eval harnesses",
    ],
    canDo: [
      "name one user, repeated job, primary input, and valuable output",
      "turn that contract into a bounded agent task",
      "use voice, screenshots, and basic terminal commands to supply evidence",
      "check plan limits and distinguish a usage ceiling from a software failure",
      "ship a deterministic thin slice to a public URL",
    ],
    practice: {
      make: "Choose one real product idea. Write AGENTS.md before the first feature, ask the agent for a plan, constrain it to one thin slice, and deploy that slice to a URL someone else can open.",
      codex: "Use AGENTS.md, plan mode, a workspace-write sandbox, scoped approvals, /status, and the repository's own build command.",
      claude: "Import @AGENTS.md from CLAUDE.md, review /memory, use /doctor to diagnose context problems, and match the same permission boundary.",
      seededFailure: "The first deployment intentionally receives a missing environment value. Diagnose the hosting log before asking the agent to edit code.",
      check: "another person can open the URL and complete the one promised job; the saved log identifies the seeded failure; the final diff stays inside the written scope",
      save: "product contract, AGENTS.md, public URL, before-and-after screenshot, deployment log, final diff, and commit hash",
      budget: "Check /status before starting. Stop after 90 minutes or at 60% of the current usage window. If a limit resets mid-task, save a commit and one next executable action; the agent stopping may be an access event, not a code failure.",
    },
  },
  {
    slug: "inspect-change",
    title: "Inspect and verify the change",
    hours: 8,
    access: "paid",
    promise: "Read the diff, trace the actual error, and reject plausible-looking code that does not satisfy the contract.",
    outcome: "A reviewed change with a written claim-to-evidence map.",
    modules: {
      foundations: "orient",
      prompting: "apply",
      "retrieval-rag": "save",
      "context-engineering": "apply",
      agents: "orient",
      evals: "apply",
      "production-ai": "apply",
      "safety-governance": "orient",
    },
    requiredReading: [
      { module: "prompting", url: guideUrl("Prompt Engineering"), assignment: "Read the sections on inputs, constraints, examples, and structured output." },
      { module: "context-engineering", url: guideUrl("Effective Context Engineering for AI Agents"), assignment: "Read the sections on selecting and pruning context." },
      { module: "evals", url: guideUrl("Evaluation Best Practices"), assignment: "Read the sections on task-specific tests and failure analysis." },
    ],
    saveForLater: ["embeddings", "multi-agent systems", "unattended loops", "full system-card analysis"],
    canDo: ["explain a diff in plain language", "trace a failure from logs", "identify hallucinated packages and deprecated patterns"],
  },
  {
    slug: "self-checking-repository",
    title: "Make the repository self-checking",
    hours: 14,
    access: "paid",
    promise: "Turn expectations into tests, logs, typed boundaries, and scripts the agent can run itself.",
    outcome: "A fresh agent can change the product and verify its own work without asking how.",
    modules: {
      foundations: "save",
      prompting: "orient",
      "retrieval-rag": "orient",
      "context-engineering": "apply",
      agents: "apply",
      evals: "apply",
      "production-ai": "apply",
      "safety-governance": "apply",
    },
    requiredReading: [
      { module: "context-engineering", url: guideUrl("Prompt Injection Explained"), assignment: "Read the full argument and turn the boundary between instruction and untrusted input into a check the repository can run." },
      { module: "agents", url: guideUrl("Writing Effective Tools for Agents"), assignment: "Read the sections on narrow tools and inspectable outputs." },
      { module: "evals", url: guideUrl("Demystifying Evals for AI Agents"), assignment: "Read task, trial, grader, transcript, and outcome definitions." },
      { module: "safety-governance", url: guideUrl("Running Codex Safely at OpenAI"), assignment: "Read the least-privilege and audit sections." },
    ],
    saveForLater: ["custom retrieval", "multi-agent fan-out", "unattended loops", "frontier training"],
    canDo: ["externalize a requirement as a check", "write an executable verification skill", "make logs and failure states agent-legible"],
  },
  {
    slug: "isolate-orchestrate",
    title: "Isolate and orchestrate work",
    hours: 8,
    access: "paid",
    promise: "Split work only when isolation improves evidence, then reunite it through explicit interfaces.",
    outcome: "Two bounded work streams that do not overwrite each other or hide failed assumptions.",
    modules: {
      foundations: "save",
      prompting: "orient",
      "retrieval-rag": "orient",
      "context-engineering": "apply",
      agents: "apply",
      evals: "apply",
      "production-ai": "orient",
      "safety-governance": "apply",
    },
    requiredReading: [
      { module: "agents", url: guideUrl("A Practical Guide to Building Agents"), assignment: "Read the multi-agent orchestration and guardrail sections." },
      { module: "evals", url: guideUrl("Your AI Product Needs Evals"), assignment: "Read the product-specific eval and error-analysis sections." },
      { module: "safety-governance", url: guideUrl("Practices for Governing Agentic AI Systems"), assignment: "Read the operator, oversight, and accountability sections and apply them to how isolated work streams get approved and reunited." },
    ],
    saveForLater: ["fan-out before one-agent reliability", "product-irrelevant RAG", "unbounded parallel work"],
    canDo: ["choose sequential versus parallel work", "isolate changes", "separate maker and checker roles"],
  },
  {
    slug: "bounded-loops",
    title: "Run bounded feedback loops",
    hours: 9,
    access: "paid",
    promise: "Design the system around the agent with budgets, external feedback, and hard stop conditions.",
    outcome: "A loop that improves one measured behavior and stops safely when evidence stops improving.",
    modules: {
      foundations: "save",
      prompting: "apply",
      "retrieval-rag": "orient",
      "context-engineering": "apply",
      agents: "apply",
      evals: "apply",
      "production-ai": "apply",
      "safety-governance": "apply",
    },
    requiredReading: [
      { module: "agents", url: guideUrl("Building Effective Agents (essay)"), assignment: "Read the workflow patterns and stopping considerations." },
      { module: "evals", url: guideUrl("Evaluation Best Practices"), assignment: "Read the sections on tracking a measured behavior over time and knowing when it has stopped improving." },
      { module: "production-ai", url: guideUrl("What We Learned from a Year of Building with LLMs"), assignment: "Read feedback, operations, and iteration sections." },
      { module: "safety-governance", url: guideUrl("Practices for Governing Agentic AI Systems"), assignment: "Read the operator, oversight, and accountability sections." },
    ],
    saveForLater: ["multi-agent scaling", "unrestricted unattended execution", "custom embeddings without product need"],
    canDo: ["set a cost ceiling", "define a stop condition", "distinguish coding, developer-feedback, and user-feedback loops"],
  },
  {
    slug: "public-ownership",
    title: "Own and defend a public system",
    hours: 9,
    access: "paid",
    promise: "Operate a product through real users, failures, costs, abuse cases, and model change.",
    outcome: "A public demo and evidence package that can survive technical review.",
    modules: {
      foundations: "apply",
      prompting: "orient",
      "retrieval-rag": "conditional",
      "context-engineering": "apply",
      agents: "apply",
      evals: "apply",
      "production-ai": "apply",
      "safety-governance": "apply",
    },
    requiredReading: [
      { module: "foundations", url: guideUrl("Deep Dive into LLMs like ChatGPT"), assignment: "Review the model-mechanism sections needed to evaluate claims and limits." },
      { module: "context-engineering", url: guideUrl("Prompt Injection Explained"), assignment: "Read the complete argument and map it to the product boundary." },
      { module: "evals", url: guideUrl("Demystifying Evals for AI Agents"), assignment: "Read the production-evaluation and human-review sections." },
      { module: "production-ai", url: guideUrl("From Experiments to Deployments"), assignment: "Read reliability, monitoring, and rollout sections." },
      { module: "safety-governance", url: guideUrl("GPT-5.6 System Card"), assignment: "Audit one reported capability or safety claim against its evidence." },
      { module: "safety-governance", url: guideUrl("Anthropic Economic Index: Economic Primitives"), assignment: "Separate observed usage data from forecasts and advocacy." },
    ],
    saveForLater: ["specialist depth unrelated to the shipped product"],
    canDo: ["run a launch review", "monitor cost and failures", "read a system card critically", "defend technical decisions with evidence"],
  },
];

export const CORE_HOURS = LADDER.reduce((total, rung) => total + rung.hours, 0);
export const FREE_HOURS = LADDER.filter((rung) => rung.access === "free").reduce(
  (total, rung) => total + rung.hours,
  0,
);

export const PRODUCT_CONTRACT = [
  "one identifiable user",
  "one repeated job",
  "one primary input",
  "one valuable output",
  "one deterministic thin slice that can ship in the first week",
];

export const DISALLOWED_PROJECTS = [
  "generic chatbots",
  "social networks or marketplaces",
  "multi-agent companies",
  "medical, legal, or financial decision systems",
  "anything needing more than a week to become useful",
];

export const COMPLETION_MECHANICS = [
  "Set deadlines relative to your own start date and sign a commitment contract.",
  "Work in 45- or 90-minute sessions that end with a saved commit and one next executable action.",
  "After seven missed days, recover from the last passing evidence instead of restarting the course.",
  "Remove scaffolds rung by rung so later work proves independence.",
  "Use the help ladder in order: evidence, repository guidance, official documentation, agent, then human help.",
  "Report graduates, active learners, and auditors separately; do not count auditors as failed completers.",
];
