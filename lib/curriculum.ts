import { GUIDES, type Guide } from "./guides";

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
  prerequisites: string[];
  readFirst: string[];
  goDeeper: string[];
  skipForNow: string[];
  checkpoints: string[];
  project: ProjectMilestone;
};

const guideByUrl = new Map<string, Guide>();
for (const guide of GUIDES) {
  if (!guideByUrl.has(guide.url)) guideByUrl.set(guide.url, guide);
}

function url(title: string): string {
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
    prerequisites: ["basic programming", "high-school algebra is enough for the first time through"],
    readFirst: [
      url("Neural Networks"),
      url("Neural Networks: Zero to Hero"),
      url("The Illustrated Transformer"),
    ],
    goDeeper: [
      url("Foundational LLMs & Text Generation"),
      url("Deep Dive into LLMs like ChatGPT"),
      url("Attention Is All You Need"),
    ],
    skipForNow: ["training infrastructure details", "frontier safety reports", "fine-tuning papers"],
    checkpoints: [
      "explain what a neural network learns",
      "describe attention without hiding behind the word attention",
      "explain tokens, embeddings, next-token prediction, and context windows",
      "know why transformers replaced earlier sequence models",
    ],
    project: {
      title: "Build a tiny autocomplete model",
      difficulty: "beginner",
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
    prerequisites: ["foundations", "basic comfort using chat models"],
    readFirst: [
      url("Prompt Engineering"),
      url("Prompt Engineering Interactive Tutorial"),
      url("GPT-4.1 Prompting Guide"),
    ],
    goDeeper: [
      url("GPT-5 Prompting Guide"),
      url("Prompt Engineering (In-Context Prompting)"),
      url("Llama Prompting Guide"),
    ],
    skipForNow: ["model-specific tricks that do not transfer", "long prompt libraries without evals"],
    checkpoints: [
      "write task prompts with clear inputs, outputs, and constraints",
      "use few-shot examples when behavior is hard to describe",
      "separate instruction quality from model capability",
      "know when prompting is no longer enough",
    ],
    project: {
      title: "Build a prompt pack for one workflow",
      difficulty: "beginner",
      expectedOutput: "five reusable prompts for a real workflow, each with inputs, expected output, and examples",
      suggestedStack: "claude, chatgpt, or any model playground",
      check: "include before/after outputs and explain which prompt changes improved reliability",
    },
  },
  {
    slug: "embeddings",
    title: "Embeddings",
    summary: "Understand semantic search, similarity, chunking, and the retrieval layer under most AI apps.",
    why: "Embeddings are how AI systems find relevant context before generation. They are the base layer for search, memory, and RAG.",
    prerequisites: ["foundations", "basic arrays and vectors"],
    readFirst: [
      url("Embeddings & Vector Stores"),
      url("Evaluating Chunking Strategies for Retrieval"),
      url("Context Rot: How Input Length Hurts LLM Performance"),
    ],
    goDeeper: [
      url("Retrieval-Augmented Generation (RAG)"),
      url("Generative Benchmarking"),
      url("How Ramp Fixes Merchant Matches with AI"),
    ],
    skipForNow: ["custom embedding training", "distributed vector database internals"],
    checkpoints: [
      "explain semantic search and cosine similarity",
      "choose a chunking strategy for a document type",
      "debug why a relevant document was not retrieved",
      "understand why more context can make answers worse",
    ],
    project: {
      title: "Build semantic search over your notes",
      difficulty: "beginner",
      expectedOutput: "a searchable index over a folder of markdown or text files",
      suggestedStack: "typescript or python, embeddings API, sqlite or a local vector store",
      check: "show five queries, retrieved chunks, and one failure case you fixed",
    },
  },
  {
    slug: "rag",
    title: "RAG",
    summary: "Connect retrieval to generation and learn how to make grounded answers better.",
    why: "RAG is the default pattern for AI products that need private, recent, or domain-specific knowledge.",
    prerequisites: ["embeddings", "prompting"],
    readFirst: [
      url("Retrieval-Augmented Generation (RAG)"),
      url("Patterns for Building LLM-based Systems & Products"),
      url("What We Learned from a Year of Building with LLMs"),
    ],
    goDeeper: [
      url("Evaluating Chunking Strategies for Retrieval"),
      url("Generative Benchmarking"),
      url("Building LLM Applications for Production"),
    ],
    skipForNow: ["multi-agent RAG", "graph RAG", "vendor-specific frameworks"],
    checkpoints: [
      "build a retrieval pipeline end to end",
      "inspect the retrieved context before blaming the model",
      "separate retrieval quality from answer quality",
      "create a small eval set for grounded answers",
    ],
    project: {
      title: "Build a RAG bot over a PDF folder",
      difficulty: "intermediate",
      expectedOutput: "a local app that answers questions with citations from uploaded PDFs",
      suggestedStack: "next.js or python, embeddings API, vector store, model API",
      check: "include citations, retrieval logs, and ten eval questions with pass/fail notes",
    },
  },
  {
    slug: "context-engineering",
    title: "Context Engineering",
    summary: "Learn what belongs in the model window, what should be fetched, and what should be compressed away.",
    why: "Context is the working memory of an AI system. Good context design is often the difference between a demo and a useful product.",
    prerequisites: ["prompting", "rag"],
    readFirst: [
      url("Effective Context Engineering for AI Agents"),
      url("Context Rot: How Input Length Hurts LLM Performance"),
      url("Writing Effective Tools for Agents"),
    ],
    goDeeper: [
      url("Claude Code: Best Practices for Agentic Coding"),
      url("Useful Patterns for Building HTML Tools"),
      url("Using LLMs to Help Me Write Code"),
    ],
    skipForNow: ["giant-context brute force", "memory systems without evals"],
    checkpoints: [
      "decide what should be in prompt, retrieval, tool result, or memory",
      "identify context that is stale, redundant, or distracting",
      "design a compact tool response for a model",
      "explain how context rot changes system design",
    ],
    project: {
      title: "Build an AI research assistant",
      difficulty: "intermediate",
      expectedOutput: "an assistant that gathers sources, compresses notes, and writes a sourced brief",
      suggestedStack: "typescript, model API, search or local documents, markdown output",
      check: "show the final brief, source list, and what context was kept or discarded",
    },
  },
  {
    slug: "agents",
    title: "Agents",
    summary: "Move from single model calls to systems that use tools, plan work, and handle failure.",
    why: "Agents are useful when work requires decisions, tools, feedback, and multiple steps. They also fail in new ways.",
    prerequisites: ["prompting", "context engineering", "basic API work"],
    readFirst: [
      url("Building Effective Agents (essay)"),
      url("Building Effective AI Agents"),
      url("LLM Powered Autonomous Agents"),
    ],
    goDeeper: [
      url("A Practical Guide to Building Agents"),
      url("Writing Effective Tools for Agents"),
      url("How To Build Agents Users Can Trust"),
    ],
    skipForNow: ["autonomous everything", "multi-agent architectures before one agent works"],
    checkpoints: [
      "choose workflow vs agent intentionally",
      "design tools with inputs and outputs the model can use",
      "handle uncertainty, retries, and partial failure",
      "measure whether the agent is getting more reliable",
    ],
    project: {
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
    prerequisites: ["prompting", "rag or agents"],
    readFirst: [
      url("Evaluation Best Practices"),
      url("Your AI Product Needs Evals"),
      url("Generative Benchmarking"),
    ],
    goDeeper: [
      url("A Field Guide to Rapidly Improving AI Products"),
      url("Evaluating Chunking Strategies for Retrieval"),
      url("What We Learned from a Year of Building with LLMs"),
    ],
    skipForNow: ["leaderboards", "generic benchmarks that do not match your product"],
    checkpoints: [
      "write examples that represent real product failures",
      "separate unit evals, human review, and production monitoring",
      "use error analysis to choose the next change",
      "know when an eval is being gamed",
    ],
    project: {
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
    prerequisites: ["rag", "evals", "basic full-stack development"],
    readFirst: [
      url("From Experiments to Deployments"),
      url("Building LLM Applications for Production"),
      url("What We Learned from a Year of Building with LLMs"),
    ],
    goDeeper: [
      url("Generative AI Lens (Well-Architected)"),
      url("A Field Guide to Rapidly Improving AI Products"),
      url("Patterns for Building LLM-based Systems & Products"),
    ],
    skipForNow: ["premature fine-tuning", "complex orchestration before instrumentation"],
    checkpoints: [
      "identify the failures users actually feel",
      "track cost, latency, quality, and feedback",
      "design fallbacks for model and retrieval failures",
      "know what must be monitored after launch",
    ],
    project: {
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
    prerequisites: ["foundations", "agents", "evals"],
    readFirst: [
      url("Practices for Governing Agentic AI Systems"),
      url("Claude's Constitution"),
      url("Building Trusted AI in the Enterprise"),
    ],
    goDeeper: [
      url("Alignment Faking in Large Language Models"),
      url("Llama Responsible Use Guide"),
      url("Gemini 3 Pro Frontier Safety Framework Report"),
    ],
    skipForNow: ["policy fights without technical grounding", "abstract doom or hype pieces"],
    checkpoints: [
      "explain why agentic systems need different controls",
      "identify misuse, overreliance, privacy, and security risks",
      "read a system card or safety report critically",
      "design a basic risk review for an AI product",
    ],
    project: {
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
