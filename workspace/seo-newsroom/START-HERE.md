# Start here

Current state: HEAD is `1f2aae6` as of 2026-09-02. Since the 2026-08-27 baseline: a light-theme/content redesign session, then a full SEO technical foundation (Vercel Analytics, `llms.txt`, per-page OG images, JSON-LD structured data on home/curriculum, internal linking between curriculum modules, README search-phrasing copy) — all verified live in production. Separately, four external "awesome-list" GitHub PRs were opened for backlinks/distribution (3 open, 1 declined by the maintainer for scope reasons — see `distribution/awesome-list-candidates.md`). Catalog sits at 124 guides (was 122 at the 2026-09-01 baseline; two scout-sourced additions landed: DeepMind double-blind evals, Anthropic multiagent coordination research).

Review `daily/2026-09-02.md` and `queue.json` for the latest state, including one new catalog-ready item ("Trustworthy agents in practice," Anthropic, score 67) and two items still carried forward unread (`openai-in-house-data-agent`, `openai-third-party-cyber-eval-incidents`).

Manual maintenance commands:

```bash
npm run validate:catalog
npm run check:links
npm run lint
npm run build
```

Exact recovery trigger:

> Read `SEO-NEWSROOM-MANUAL.md` and the complete `workspace/seo-newsroom` state, then run the Zero to AI Native newsroom in scout mode end to end. Do not publish or deploy.
