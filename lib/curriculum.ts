import { GUIDES, type Guide } from "./guides.ts";

export type ProjectMilestone = {
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  expectedOutput: string;
  suggestedStack: string;
  check: string;
};

export type CurriculumModule = {
  slug: string;
  title: string;
  summary: string;
  why: string;
  prerequisites: {
    reading: string[];
    deeperPractice: string[];
  };
  readFirst: string[];
  goDeeper: string[];
  perspectives?: string[];
  skipForNow: string[];
  checkpoints: string[];
  agentPractice: ProjectMilestone;
  deeperProject: ProjectMilestone;
};

const guideByUrl = new Map<string, Guide>();
for (const guide of GUIDES) {
  if (!guideByUrl.has(guide.url)) guideByUrl.set(guide.url, guide);
}

export function guideUrl(title: string): string {
  const guide = GUIDES.find((item) => item.title === title);
  if (!guide) throw new Error(`Missing guide: ${title}`);
  return guide.url;
}

export const CURRICULUM: CurriculumModule[] = [
  {
    slug: "foundations",
    title: "Foundations",
    summary: "Build the base mental model: neural nets, transformers, language models, and why scale changed software.",
    why: "Everything else is easier when you understand what the model is doing, what it is not doing, and where the core abstractions came from.",
    prerequisites: {
      reading: ["none; start with the visual explanations"],
      deeperPractice: ["basic programming", "high-school algebra"],
    },
    readFirst: [
      guideUrl("Neural Networks: Zero to Hero"),
      guideUrl("The Illustrated Transformer"),
      guideUrl("Deep Dive into LLMs like ChatGPT"),
    ],
    goDeeper: [
      guideUrl("Foundational LLMs & Text Generation"),
      guideUrl("Attention Is All You Need"),
    ],
    skipForNow: ["training infrastructure details", "frontier safety reports", "fine-tuning papers"],
    checkpoints: [
      "explain what a neural network learns",
      "describe attention without hiding behind the word attention",
      "explain tokens, embeddings, next-token prediction, and context windows",
      "know why transformers replaced earlier sequence models",
    ],
    agentPractice: {
      title: "Test what a model actually knows",
      difficulty: "beginner",
      expectedOutput: "a short evidence log of five controlled model probes, including one confident error and one context-window failure",
      suggestedStack: "codex or claude, markdown, screenshots",
      check: "show the input, output, claim you checked, external evidence, and what you would trust differently next time",
    },
    deeperProject: {
      title: "Build a tiny autocomplete model",
      difficulty: "intermediate",
      expectedOutput: "a notebook or script that trains a tiny character-level model and samples text",
      suggestedStack: "python, pytorch or tinygrad, a small text corpus",
      check: "show training loss, sample output, and a short note on what improved after tuning",
    },
  },
  {
    slug: "prompting",
    title: "Prompting",
    summary: "Learn how to turn vague intent into reliable model behavior.",
    why: "Prompting is the first control surface. Good prompts make later systems easier to evaluate, debug, and operate.",
    prerequisites: {
      reading: ["basic comfort using a chat model"],
      deeperPractice: ["foundations mental model"],
    },
    readFirst: [
      guideUrl("Prompt Engineering"),
      guideUrl("Prompt Engineering Interactive Tutorial"),
    ],
    goDeeper: [
      guideUrl("Prompt Engineering (In-Context Prompting)"),
    ],
    skipForNow: ["model-specific tricks that do not transfer", "long prompt libraries without evals"],
    checkpoints: [
      "write task prompts with clear inputs, outputs, and constraints",
      "use few-shot examples when behavior is hard to describe",
      "separate instruction quality from model capability",
      "know when prompting is no longer enough",
    ],
    agentPractice: {
      title: "Turn one job into a bounded specification",
      difficulty: "beginner",
      expectedOutput: "a reusable task specification with a named user, input, output, constraints, examples, and stop conditions",
      suggestedStack: "codex or claude, markdown, one real workflow",
      check: "run the same specification three times and explain which differences are acceptable and which violate the contract",
    },
    deeperProject: {
      title: "Build a prompt pack for one workflow",
      difficulty: "beginner",
      expectedOutput: "five reusable prompts for a real workflow, each with inputs, expected output, and examples",
      suggestedStack: "claude, chatgpt, or any model playground",
      check: "include before/after outputs and explain which prompt changes improved reliability",
    },
  },
  {
    slug: "retrieval-rag",
    title: "Retrieval & RAG",
    summary: "Learn semantic retrieval, chunking, and grounded generation as one system.",
    why: "Retrieval and generation fail together in real products. Treating them as one layer makes it easier to debug relevance, citations, and answer quality.",
    prerequisites: {
      reading: ["foundations", "prompting"],
      deeperPractice: ["basic arrays and vectors", "basic API work"],
    },
    readFirst: [
      guideUrl("Evaluating Chunking Strategies for Retrieval"),
      guideUrl("Retrieval-Augmented Generation (RAG)"),
    ],
    goDeeper: [
      guideUrl("Context Rot: How Input Length Hurts LLM Performance"),
      guideUrl("Chroma Context-1: Training a Self-Editing Search Agent"),
      guideUrl("Patterns for Building LLM-based Systems & Products"),
    ],
    skipForNow: ["custom embedding training", "graph RAG", "vendor-specific frameworks"],
    checkpoints: [
      "explain semantic search and cosine similarity",
      "choose a chunking strategy for a document type",
      "inspect retrieved context before blaming the model",
      "separate retrieval quality from answer quality",
      "create a small eval set for grounded answers",
    ],
    agentPractice: {
      title: "Add cited answers to your product",
      difficulty: "beginner",
      expectedOutput: "a small retrieval slice that answers from a prepared document set and exposes the retrieved chunks",
      suggestedStack: "starter repository, model API, prepared documents",
      check: "answer five questions with citations and identify whether each failure came from retrieval or generation",
    },
    deeperProject: {
      title: "Build a cited knowledge assistant",
      difficulty: "intermediate",
      expectedOutput: "a local app that searches a document folder and answers with citations",
      suggestedStack: "next.js or python, embeddings API, sqlite or a vector store, model API",
      check: "include retrieval logs, citations, and ten grounded-answer evals with pass/fail notes",
    },
  },
  {
    slug: "context-engineering",
    title: "Context Engineering & Prompt Injection",
    summary: "Learn what belongs in the model window, what should be fetched, and what should be compressed away.",
    why: "Context is the working memory of an AI system. Good context design is often the difference between a demo and a useful product.",
    prerequisites: {
      reading: ["prompting"],
      deeperPractice: ["retrieval-rag", "basic TypeScript or Python"],
    },
    readFirst: [
      guideUrl("Effective Context Engineering for AI Agents"),
      guideUrl("Prompt Injection Explained"),
    ],
    goDeeper: [
      guideUrl("Claude Code: Best Practices for Agentic Coding"),
      guideUrl("Harness Engineering: Leveraging Codex in an Agent-First World"),
      guideUrl("Harness Design for Long-Running Application Development"),
    ],
    skipForNow: ["giant-context brute force", "memory systems without evals"],
    checkpoints: [
      "decide what should be in prompt, retrieval, tool result, or memory",
      "identify context that is stale, redundant, or distracting",
      "identify a prompt-injection boundary and its mitigations",
      "explain how context rot changes system design",
    ],
    agentPractice: {
      title: "Make your repository legible to an agent",
      difficulty: "beginner",
      expectedOutput: "an AGENTS.md file, a context map, and one prompt-injection test for the product you are building",
      suggestedStack: "codex or claude, AGENTS.md, repository logs",
      check: "a fresh agent can find the right files, run the right check, and refuse the injected instruction without extra explanation",
    },
    deeperProject: {
      title: "Build an AI research assistant",
      difficulty: "intermediate",
      expectedOutput: "an assistant that gathers sources, compresses notes, and writes a sourced brief",
      suggestedStack: "typescript, model API, search or local documents, markdown output",
      check: "show the final brief, source list, and what context was kept or discarded",
    },
  },
  {
    slug: "agents",
    title: "Agents & Tools",
    summary: "Move from single model calls to systems that use tools, plan work, and handle failure.",
    why: "Agents are useful when work requires decisions, tools, feedback, and multiple steps. They also fail in new ways.",
    prerequisites: {
      reading: ["prompting", "context-engineering"],
      deeperPractice: ["basic API work", "structured data"],
    },
    readFirst: [
      guideUrl("A Practical Guide to Building Agents"),
      guideUrl("Building Effective Agents (essay)"),
      guideUrl("Writing Effective Tools for Agents"),
    ],
    goDeeper: [
      guideUrl("Unrolling the Codex Agent Loop"),
      guideUrl("Towards a Science of Scaling Agent Systems"),
      guideUrl("MCP Introduction"),
      guideUrl("How To Build Agents Users Can Trust"),
    ],
    skipForNow: ["autonomous everything", "multi-agent architectures before one agent works"],
    checkpoints: [
      "choose workflow vs agent intentionally",
      "design tools with inputs and outputs the model can use",
      "handle uncertainty, retries, and partial failure",
      "measure whether the agent is getting more reliable",
    ],
    agentPractice: {
      title: "Give one agent one reliable tool",
      difficulty: "beginner",
      expectedOutput: "one typed tool with a narrow purpose, inspectable output, and an explicit failure result",
      suggestedStack: "codex or claude, starter repository, typed script",
      check: "the agent uses the tool correctly on five cases and stops or asks for help on the seeded failure",
    },
    deeperProject: {
      title: "Build a GitHub issue triage agent",
      difficulty: "intermediate",
      expectedOutput: "an agent that reads an issue, labels it, asks clarifying questions, and drafts a fix plan",
      suggestedStack: "typescript, github api, model API, structured outputs",
      check: "run it on ten issues and record correct labels, bad labels, and failure reasons",
    },
  },
  {
    slug: "evals",
    title: "Evals",
    summary: "Measure model behavior so quality improves for reasons you can explain.",
    why: "Without evals, AI product work becomes vibes. Evals turn errors into a system you can improve.",
    prerequisites: {
      reading: ["prompting", "one real model failure"],
      deeperPractice: ["rag or agents", "JSON fixtures", "basic scripting"],
    },
    readFirst: [
      guideUrl("Evaluation Best Practices"),
      guideUrl("Demystifying Evals for AI Agents"),
      guideUrl("Your AI Product Needs Evals"),
    ],
    goDeeper: [
      guideUrl("Separating Signal from Noise in Coding Evaluations"),
      guideUrl("A Field Guide to Rapidly Improving AI Products"),
      guideUrl("Generative Benchmarking"),
    ],
    skipForNow: ["leaderboards", "generic benchmarks that do not match your product"],
    checkpoints: [
      "write examples that represent real product failures",
      "separate unit evals, human review, and production monitoring",
      "use error analysis to choose the next change",
      "know when an eval is being gamed",
    ],
    agentPractice: {
      title: "Turn five failures into checks",
      difficulty: "beginner",
      expectedOutput: "five fixtures from real failures and a command that reports which behaviors pass or fail",
      suggestedStack: "starter repository, JSON fixtures, executable verification skill",
      check: "the checks catch the seeded regression and a fresh agent can run them without asking you how",
    },
    deeperProject: {
      title: "Build an eval set for an LLM feature",
      difficulty: "intermediate",
      expectedOutput: "a repeatable eval harness with examples, expected behavior, and scoring notes",
      suggestedStack: "typescript or python, json fixtures, model API, simple report output",
      check: "compare two prompts or models and explain the regression you would ship or reject",
    },
  },
  {
    slug: "production-ai",
    title: "Production AI",
    summary: "Turn a working demo into a system people can rely on.",
    why: "Production AI is mostly product engineering: reliability, cost, latency, observability, feedback, and iteration.",
    prerequisites: {
      reading: ["one working product slice", "basic eval literacy"],
      deeperPractice: ["retrieval & rag or agents", "basic full-stack development"],
    },
    readFirst: [
      guideUrl("From Experiments to Deployments"),
      guideUrl("Building LLM Applications for Production"),
      guideUrl("What We Learned from a Year of Building with LLMs"),
    ],
    goDeeper: [
      guideUrl("A Field Guide to Rapidly Improving AI Products"),
      guideUrl("Patterns for Building LLM-based Systems & Products"),
      guideUrl("Under the River"),
    ],
    skipForNow: ["premature fine-tuning", "complex orchestration before instrumentation"],
    checkpoints: [
      "identify the failures users actually feel",
      "track cost, latency, quality, and feedback",
      "design fallbacks for model and retrieval failures",
      "know what must be monitored after launch",
    ],
    agentPractice: {
      title: "Make your product observable",
      difficulty: "intermediate",
      expectedOutput: "a deployed product slice with error logs, a usage ceiling, feedback capture, and one recovery path",
      suggestedStack: "the evolving course product, hosting logs, analytics",
      check: "another person can trigger the feature, you can explain one failure from evidence, and the system fails safely at its limit",
    },
    deeperProject: {
      title: "Ship a small AI product slice",
      difficulty: "advanced",
      expectedOutput: "a deployed AI feature with auth, usage limits, feedback capture, and basic observability",
      suggestedStack: "next.js, model API, database, auth provider, logging",
      check: "include a demo link, failure-mode notes, and one iteration driven by feedback or evals",
    },
  },
  {
    slug: "safety-governance",
    title: "Safety & Governance",
    summary: "Understand how frontier systems are evaluated, governed, and constrained.",
    why: "Capable AI systems create product, security, policy, and social risks. Builders need enough safety literacy to make better decisions.",
    prerequisites: {
      reading: ["foundations", "one product or agent you can examine"],
      deeperPractice: ["agents", "evals", "production failure notes"],
    },
    readFirst: [
      guideUrl("Practices for Governing Agentic AI Systems"),
      guideUrl("Running Codex Safely at OpenAI"),
      guideUrl("GPT-5.6 System Card"),
      guideUrl("Anthropic Economic Index: Economic Primitives"),
    ],
    goDeeper: [
      guideUrl("An Off Switch for Dual-Use Knowledge in AI Models"),
      guideUrl("Alignment Faking in Large Language Models"),
      guideUrl("Claude's Constitution"),
      guideUrl("Llama Responsible Use Guide"),
    ],
    perspectives: [
      guideUrl("AI Eats the World"),
      guideUrl("MS&E435: Economics of the AI Supercycle"),
      guideUrl("Machines of Loving Grace"),
      guideUrl("The Adolescence of Technology"),
    ],
    skipForNow: ["policy fights without technical grounding", "abstract doom or hype pieces"],
    checkpoints: [
      "explain why agentic systems need different controls",
      "identify misuse, overreliance, privacy, and security risks",
      "read a system card or safety report critically",
      "separate technical evidence, economic forecasts, and advocacy",
      "design a basic risk review for an AI product",
    ],
    agentPractice: {
      title: "Test the boundaries before launch",
      difficulty: "intermediate",
      expectedOutput: "an abuse-case exercise covering permissions, private data, overreliance, and one plausible misuse path",
      suggestedStack: "the evolving course product, markdown, product logs",
      check: "show the attempted failures, observed behavior, mitigation, monitoring signal, and what would block launch",
    },
    deeperProject: {
      title: "Write a launch risk review",
      difficulty: "advanced",
      expectedOutput: "a concise risk review for one AI feature before launch",
      suggestedStack: "markdown, product spec, eval results, abuse-case checklist",
      check: "include risks, mitigations, monitoring, and a decision on what blocks launch",
    },
  },
];

export function guideForUrl(guideUrl: string): Guide {
  const guide = guideByUrl.get(guideUrl);
  if (!guide) throw new Error(`Missing guide URL: ${guideUrl}`);
  return guide;
}

export function guidesForUrls(urls: string[]): Guide[] {
  return urls.map(guideForUrl);
}

export function moduleForSlug(slug: string): CurriculumModule | undefined {
  return CURRICULUM.find((module) => module.slug === slug);
}
