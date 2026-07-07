# Contributing

Add sources that make the learning path better, not just longer.

Contributions should improve the sequence: what to read, what to build, or how to know the learner is ready to move on.

## Good additions

- primary lab posts, docs, system cards, and guides
- papers from the original authors
- serious lectures or courses
- engineering writeups with durable lessons
- field studies with useful evidence
- project ideas tied to a module
- beginner notes for hard primary sources

## Skip

- reuploads
- seo posts
- affiliate links
- shallow roundups
- ai-generated summaries
- commentary that does not add a primary source
- resources that are good but do not improve the path

## How to add one

Edit `lib/guides.ts` and add one entry:

```ts
{
  title: "The Title",
  company: "Anthropic",
  topic: "Agents",
  url: "https://...",
  format: "PDF",
  year: 2025,
  level: "build",
  audience: "builder",
  description: "one clear sentence on why it is worth reading.",
}
```

Then open a PR.

If you are unsure, open an issue with the link and why it matters.
