import type { Company, Format, Topic } from "./taxonomy";

export type Guide = {
  title: string;
  company: Company;
  topic: Topic;
  url: string;
  format: Format;
  year: number;
  pages?: number;
  description: string;
  featured?: boolean;
};

// Every entry is a first-party guide published by the lab itself.
// Third-party explainers and reseller PDFs are deliberately left out.
export const GUIDES: Guide[] = [
  // ── Anthropic ──────────────────────────────────────────────
  {
    title: "The Complete Guide to Building Skills for Claude",
    company: "Anthropic",
    topic: "Skills & Tooling",
    url: "https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf",
    format: "PDF",
    year: 2025,
    pages: 33,
    description:
      "How to package instructions, scripts and resources into Skills that Claude loads on demand. The patterns Anthropic runs internally.",
    featured: true,
  },
  {
    title: "Building Effective AI Agents",
    company: "Anthropic",
    topic: "Agents",
    url: "https://resources.anthropic.com/hubfs/Building%20Effective%20AI%20Agents-%20Architecture%20Patterns%20and%20Implementation%20Frameworks.pdf",
    format: "PDF",
    year: 2025,
    description:
      "Architecture patterns and implementation frameworks for agentic systems. Prompt chaining, routing, orchestration, with real production examples.",
    featured: true,
  },
  {
    title: "Building Trusted AI in the Enterprise",
    company: "Anthropic",
    topic: "Enterprise & Adoption",
    url: "https://assets.anthropic.com/m/66daaa23018ab0fd/original/Anthropic-enterprise-ebook-digital.pdf",
    format: "PDF",
    year: 2025,
    description:
      "Anthropic's playbook for starting, scaling and governing Claude across an organization.",
  },
  {
    title: "Claude Code: Best Practices for Agentic Coding",
    company: "Anthropic",
    topic: "Skills & Tooling",
    url: "https://www.anthropic.com/engineering/claude-code-best-practices",
    format: "Web",
    year: 2025,
    description:
      "The five extension points of the Claude Code harness: CLAUDE.md, hooks, skills, plugins, LSP. Written by the team that builds it.",
  },
  {
    title: "Effective Context Engineering for AI Agents",
    company: "Anthropic",
    topic: "Context & Harness",
    url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
    format: "Web",
    year: 2025,
    description:
      "Context is a finite resource. How to curate what goes into the window, compress history, and fetch data just in time.",
  },
  {
    title: "Building Effective Agents (essay)",
    company: "Anthropic",
    topic: "Agents",
    url: "https://www.anthropic.com/engineering/building-effective-agents",
    format: "Web",
    year: 2024,
    description:
      "The original essay that named the patterns. Workflows vs agents, and when you actually need either.",
  },
  {
    title: "Anthropic Economic Index: Economic Primitives",
    company: "Anthropic",
    topic: "Research & Economics",
    url: "https://www-cdn.anthropic.com/096d94c1a91c6480806d8f24b2344c7e2a4bc666.pdf",
    format: "PDF",
    year: 2025,
    description:
      "What people actually do with Claude, mapped to economic tasks. Data, not vibes.",
  },
  {
    title: "Anthropic Economic Index: Geographic & Enterprise Adoption",
    company: "Anthropic",
    topic: "Research & Economics",
    url: "https://assets.anthropic.com/m/218c82b858610fac/original/Economic-Index.pdf",
    format: "PDF",
    year: 2025,
    description:
      "Where AI adoption is uneven across regions and firms, and what that says about who captures the gains.",
  },

  // ── OpenAI ─────────────────────────────────────────────────
  {
    title: "A Practical Guide to Building Agents",
    company: "OpenAI",
    topic: "Agents",
    url: "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf",
    format: "PDF",
    year: 2025,
    pages: 34,
    description:
      "Use-case selection, model choice, tool design, guardrails and multi-agent orchestration. The one everyone shares.",
    featured: true,
  },
  {
    title: "Identifying and Scaling AI Use Cases",
    company: "OpenAI",
    topic: "Enterprise & Adoption",
    url: "https://cdn.openai.com/business-guides-and-resources/identifying-and-scaling-ai-use-cases.pdf",
    format: "PDF",
    year: 2025,
    description:
      "How early adopters find the use cases worth pursuing, drawn from 300 deployments and 2M business users.",
  },
  {
    title: "AI in the Enterprise",
    company: "OpenAI",
    topic: "Enterprise & Adoption",
    url: "https://cdn.openai.com/business-guides-and-resources/ai-in-the-enterprise.pdf",
    format: "PDF",
    year: 2025,
    description:
      "Lessons from seven frontier companies running AI at scale. What worked, what stalled.",
  },
  {
    title: "From Experiments to Deployments",
    company: "OpenAI",
    topic: "MLOps & Production",
    url: "https://cdn.openai.com/business-guides-and-resources/from-experiments-to-deployments_whitepaper_11-25.pdf",
    format: "PDF",
    year: 2025,
    description:
      "The path from a pilot that demos well to a system that ships and stays up.",
  },
  {
    title: "The State of Enterprise AI 2025",
    company: "OpenAI",
    topic: "Research & Economics",
    url: "https://cdn.openai.com/pdf/7ef17d82-96bf-4dd1-9df2-228f7f377a29/the-state-of-enterprise-ai_2025-report.pdf",
    format: "PDF",
    year: 2025,
    description:
      "Where enterprise AI actually stands this year, by the numbers.",
  },
  {
    title: "GPT-5 Prompting Guide",
    company: "OpenAI",
    topic: "Prompt Engineering",
    url: "https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide",
    format: "Web",
    year: 2025,
    description:
      "Reasoning effort, agentic eagerness, scope control. How to prompt the GPT-5 family without fighting it.",
  },

  // ── Google ─────────────────────────────────────────────────
  {
    title: "Prompt Engineering",
    company: "Google",
    topic: "Prompt Engineering",
    url: "https://www.kaggle.com/whitepaper-prompt-engineering",
    format: "PDF",
    year: 2024,
    pages: 69,
    description:
      "Lee Boonstra's 69-page whitepaper. Few-shot, role prompting, structured output, the works. Applies well beyond Gemini.",
    featured: true,
  },
  {
    title: "Foundational LLMs & Text Generation",
    company: "Google",
    topic: "Foundations",
    url: "https://www.kaggle.com/whitepaper-foundational-llm-and-text-generation",
    format: "PDF",
    year: 2025,
    description:
      "How LLMs are built and how text generation works under the hood. The base layer of the 5-day intensive.",
  },
  {
    title: "Embeddings & Vector Stores",
    company: "Google",
    topic: "Foundations",
    url: "https://www.kaggle.com/learn-guide/5-day-genai",
    format: "PDF",
    year: 2025,
    description:
      "Embedding methods, vector search algorithms and how RAG actually retrieves the right thing.",
  },
  {
    title: "Agents",
    company: "Google",
    topic: "Agents",
    url: "https://www.kaggle.com/whitepaper-agents",
    format: "PDF",
    year: 2025,
    description:
      "Tools, extensions and datastores. How models reach past their weights to act in the world.",
  },
  {
    title: "Agents Companion",
    company: "Google",
    topic: "Agents",
    url: "https://www.kaggle.com/whitepaper-agent-companion",
    format: "PDF",
    year: 2025,
    description:
      "The 102. Agent evaluation methods and advanced patterns for people who read the first one.",
  },
  {
    title: "Solving Domain-Specific Problems & MLOps for Gen AI",
    company: "Google",
    topic: "MLOps & Production",
    url: "https://www.kaggle.com/learn-guide/5-day-genai",
    format: "Course",
    year: 2025,
    description:
      "Tuning models for a domain and running them in production. Days 4 and 5 of the Google/Kaggle intensive.",
  },
  {
    title: "Gemini for Workspace Prompting Guide 101",
    company: "Google",
    topic: "Prompt Engineering",
    url: "https://services.google.com/fh/files/misc/gemini_for_workspace_prompt_guide_october_2024_digital_final.pdf",
    format: "PDF",
    year: 2024,
    description:
      "Prompts by persona and use case, written for people getting real work done in Docs, Sheets and Gmail.",
  },
  {
    title: "Gemini Enterprise Prompt Guide",
    company: "Google",
    topic: "Prompt Engineering",
    url: "https://cloud.google.com/gemini-enterprise/resources/prompt-guide",
    format: "Web",
    year: 2025,
    description:
      "Prompting patterns for Gemini across industries, from the Google Cloud side.",
  },

  // ── Microsoft ──────────────────────────────────────────────
  {
    title: "AI Agents for Beginners",
    company: "Microsoft",
    topic: "Agents",
    url: "https://github.com/microsoft/ai-agents-for-beginners",
    format: "Course",
    year: 2025,
    description:
      "Twelve lessons from concept to code. Free, open source, runnable.",
  },
  {
    title: "Generative AI for Beginners",
    company: "Microsoft",
    topic: "Foundations",
    url: "https://microsoft.github.io/generative-ai-for-beginners/",
    format: "Course",
    year: 2025,
    description:
      "Twenty-one lessons on building gen AI apps. The widely used starting point.",
  },
  {
    title: "Work Trend Index 2023 Special Report",
    company: "Microsoft",
    topic: "Research & Economics",
    url: "https://assets-c4akfrf5b4d3f4b7.z01.azurefd.net/assets/2023/11/Microsoft_Work_Trend_Index_Special_Report_2023_Full_Report.pdf",
    format: "PDF",
    year: 2023,
    description:
      "How AI is changing the shape of knowledge work, with survey data behind it.",
  },

  // ── NVIDIA ─────────────────────────────────────────────────
  {
    title: "Generative AI in Practice",
    company: "NVIDIA",
    topic: "Enterprise & Adoption",
    url: "https://www.nvidia.com/en-us/data-center/generative-ai-in-practice/",
    format: "Web",
    year: 2025,
    description:
      "How organizations deploy LLMs in production on real infrastructure. The hardware-side view.",
  },

  // ── AWS ────────────────────────────────────────────────────
  {
    title: "Agentic AI on the Rise",
    company: "AWS",
    topic: "Agents",
    url: "https://pages.awscloud.com/rs/112-TZM-766/images/AWS_Marketplace_ebook_Agentic_AI.pdf",
    format: "PDF",
    year: 2025,
    description:
      "Where agentic value comes from and how to run pre-built agents and tools without building everything yourself.",
  },
  {
    title: "Generative AI Lens (Well-Architected)",
    company: "AWS",
    topic: "MLOps & Production",
    url: "https://docs.aws.amazon.com/pdfs/wellarchitected/latest/generative-ai-lens/generative-ai-lens.pdf",
    format: "PDF",
    year: 2025,
    description:
      "The Well-Architected lens for gen AI workloads. Reliability, cost and security for LLM systems.",
  },
];
