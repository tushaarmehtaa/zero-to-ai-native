# Latest scout: September 15, 2026

See [the September 15 report](daily/2026-09-15.md). Zero new URLs. Two new catalog-only candidates: Cohere Labs' Automation's Early Footprint (73, ready) and Microsoft Research's Orchard (67, ready). HELMET stays the top catalog candidate (74). This run swept the primary sources the previous two runs left uncovered: Meta, Microsoft, Mistral, Cohere and the OpenAI developer blog. Catalog validator passes: 127 guides, eight modules, six rungs. Link checker passes clean: 127 links, zero broken, zero access-blocked — an improvement on September 9, when one Medium link was blocked.

Live checks fresh this run: apex redirects 308 to www, homepage/curriculum/robots/sitemap/llms.txt all 200, /guides still 404 and local-only, sitemap lastmod unchanged at September 8 across three scouts. `openai.com` returned 403 for the third consecutive run and has still never been inspected firsthand; `developers.openai.com` is reachable and was used instead. No product code or catalog changed.

Also recorded: `npm run check:guides` needs a dev server on port 3019 and fails in a clean checkout. Diagnosed, queued, not fixed.

September 11 Search Console/index baseline is under workspace/research/seo-pilot-2026-09-11/ and remains the only index evidence; it is historical. The coming-soon gate stays as the user chose. No owner input needed.

Next scout: `run scout`.

---

## Previous scout: September 13, 2026 (evening run)

See [the evening report](daily/2026-09-13-evening.md), which extends the [morning report](daily/2026-09-13.md) rather than replacing it. Zero new URLs. One new catalog-only candidate: Google's behavioral-evals harness article (66, ready). HELMET stays the top catalog candidate (74). Catalog validator passes: 127 guides, eight modules, six rungs. Live checks fresh this run: apex redirects 308 to www, homepage/curriculum/robots/sitemap/llms.txt all 200, /guides still 404 and local-only, sitemap lastmod unchanged at September 8. Chroma's research index is fully covered by the catalog. openai.com returned 403 to the fetch tool and was not inspected. No product code or catalog changed.

September 11 Search Console/index baseline is under workspace/research/seo-pilot-2026-09-11/ and remains the only index evidence; it is historical. The coming-soon gate stays as the user chose. No new owner input needed.

Next scout: `run scout`.

---

## Earlier recovery context (preserved)

# Resume the newsroom

Latest scout: [September 9 evening](daily/2026-09-09-evening.md). Zero new URLs. HELMET is the highest-priority reviewed catalog candidate (74); RTEB (58) and ICML open reproductions (57) are watchlisted. See research/2026-09-09-evening.md for gates and limitations.

Production ea74407 remains verified: 127 reads, 32 sources, ten sitemap URLs. Prior mobile overflow was a screenshot artifact; no layout fix needed. This scout rechecked live HTML and link health (zero broken, one Medium access block), but browser capture was unavailable. Earlier corrected screenshots were inspected as prior evidence.

Queue metadata decision reconciled with completed work. DeepMind distribution draft corrected to remove an absolute guarantee; all drafts remain unsent. Catalog and product unchanged. No platform data supplied; September 26 checkpoint still needs Search Console and usage evidence.

Next scout: `run scout`.

## Guides implementation follow-up

The user subsequently authorized the new Guides surface and two lessons. Implemented locally at `/guides`, `/guides/create-consistent-ai-images` and `/guides/what-to-delegate-to-ai`; see [implementation record](production/2026-09-09-guides.md). No deployment or new-URL ledger entry. Local preview: http://127.0.0.1:3019/guides . The revised search-growth operating plan remains distinct from this website implementation; do not infer that the old scout constitution has already been rewritten.

## Owner-approved editorial slate

All 12 ideas are now in `queue.json` as `editorial_page` entries. See [the editorial slate and visual briefs](briefs/2026-09-09-editorial-slate.md). Two local drafts, ten new ideas; none deployed. This owner direction broadens Guides to opinion, explainers, capability analysis and practical work. Use built-in imagegen for strong explanatory visuals where useful. Do not invent Tushar’s stance or treat query hypotheses as measured demand. The old scout manual has not yet been fully migrated; read this newer direction alongside it.
