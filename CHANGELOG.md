# Changelog

## 2026-09-01

- fixed the sitemap: `lastModified` now derives from the actual git history of the files behind each route instead of a hardcoded, stale constant
- added two catalog sources found via the SEO scout: DeepMind's double-blind AI evaluations writeup (eval integrity via confidential compute) and Anthropic's research on multiagent coordination failures

## 2026-08-30

- switched the site from dark-first to a light theme, with contrast-checked tokens for body, muted, and accent text
- fixed the ladder practice detail views (`/curriculum` rung links 404'd; wired the ladder view onto the curriculum page with working in-page anchors)
- audited the catalog and curriculum against the inclusion gate: cut two results-announcement entries and two vendor-collateral prompting guides, removed a redundant Gemini entry in favor of the stronger AlphaGeometry2 paper, relabeled a mis-tagged catalog entry, fixed a Stanford link that pointed at a whole channel instead of the specific lecture
- split the safety-governance module's optional reading into "read next" (evidence) and a separately labeled "perspectives, not evidence" section
- rebalanced the practice ladder's required reading so no single source is reused more than twice across rungs (previously up to four)
- added a live GitHub star count to the homepage and footer, fetched server-side
- added a "coming soon" gate for the curriculum entry point, with a waitlist email capture (local store for now, swappable for a hosted provider)
- rebuilt the homepage hero: centered layout, new headline and copy, a handwritten annotation with a custom SVG arrow, a researcher-avatar strip, live stats line
- redesigned the closing section into a short creator note: small photo, bio, and simple centered footer links (X, GitHub star, share)
- normal sentence-case capitalization across the site's UI chrome (removed forced-lowercase styling and a bug that was lowercasing company names like "OpenAI" in the table view)

## 2026-08-08

- stabilized refresh and first load by removing the post-hydration mobile view swap, long catalog stagger, and layout-moving title animation
- made the compact list the consistent default view and deferred off-screen catalog rendering
- corrected canonical, sitemap, robots, and README links to the actual production domain
- added ten primary-source guides on agent loops, harness engineering, agent evals, multi-agent scaling, self-editing retrieval, orchestration, safety, self-improvement, and production agent infrastructure
- added Shopify as a source for its River and Aquifer architecture writeup
- promoted the strongest new material into Retrieval, Context Engineering, Agents, Evals, Production AI, and Safety curriculum modules
- replaced a duplicated agent architecture PDF in the curriculum with implementation-level agent loop and multi-agent evidence
- documented a five-part inclusion gate that separates research discovery from catalog and curriculum acceptance
- documented the promotion rule from research watchlist to catalog to curriculum
- added automated catalog validation for duplicate titles and URLs, taxonomy values, HTTPS links, years, and curriculum references
- regenerated the README from the typed catalog

## 2026-07-21

- added Moonshot AI, Kimi K3, PerceptionBench and Zhilin Yang's GTC scaling talk
- added OpenAI's coding-evaluation audit and GPT-5.6 system card
- added Anthropic's research on removable dual-use knowledge modules
- consolidated the duplicated Kaggle intensive into one course entry
- removed vendor collateral and stale overlapping roundups
- moved prediction and opinion essays to the optional Perspectives & Futures track

## 2026-07-07

- added the first static curriculum path
- added module checkpoints and project milestones
- framed the project as an open-source curriculum
- added honest ai & weekends community context
- clarified the repo's open-source value in the README
- added contribution, curation, and roadmap docs
- documented the maintenance standard for future additions
