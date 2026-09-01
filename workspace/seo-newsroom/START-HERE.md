# Start here

Current state: HEAD is `f9c61fe` as of 2026-09-01. Since the 2026-08-27 baseline, the site had a substantial content and design session (light theme, curriculum practice-ladder routing fix, catalog audit that dropped 126 → 122 guides, hero and footer rewrite, "coming soon" gate on the curriculum entry point). Repository and live behavior at the original baseline are recorded in `baselines/2026-08-27.md`; no newer baseline has been captured. No scout to date has produced a new-page recommendation; review `daily/2026-09-01.md` and `queue.json` for the latest state, including two catalog-ready research briefs and one open sitemap-date maintenance item.

Manual maintenance commands:

```bash
npm run validate:catalog
npm run check:links
npm run lint
npm run build
```

Exact recovery trigger:

> Read `SEO-NEWSROOM-MANUAL.md` and the complete `workspace/seo-newsroom` state, then run the Zero to AI Native newsroom in scout mode end to end. Do not publish or deploy.
