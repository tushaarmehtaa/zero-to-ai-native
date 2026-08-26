# Start here

Current state: eight curriculum module pages were deployed from commit `e93386a` on 2026-08-27. Repository and live behavior are recorded separately in `baselines/2026-08-27.md`. The first scout produced no new-page recommendation; review `daily/2026-08-27.md` and `queue.json`.

Manual maintenance commands:

```bash
npm run validate:catalog
npm run check:links
npm run lint
npm run build
```

Exact recovery trigger:

> Read `SEO-NEWSROOM-MANUAL.md` and the complete `workspace/seo-newsroom` state, then run the Zero to AI Native newsroom in scout mode end to end. Do not publish or deploy.
