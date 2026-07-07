# Contributing

Add sources that make the learning path better, not just longer.

## Good additions

- primary lab posts, docs, system cards, and guides
- papers from the original authors
- serious lectures or courses
- engineering writeups with durable lessons
- field studies with useful evidence

## Skip

- reuploads
- seo posts
- affiliate links
- shallow roundups
- ai-generated summaries
- commentary that does not add a primary source

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
