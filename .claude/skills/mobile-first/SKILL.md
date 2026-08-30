---
name: mobile-first
description: Audit and rebuild a desktop-built page so it actually works on a phone, by re-choosing layout primitives rather than shrinking the desktop one. Produces a measured audit and a set of chunked, hand-offable fix prompts. Use this whenever the work touches how a site behaves on mobile — "the mobile view is broken", "make this responsive", "it looks bad on my phone", "optimize for mobile", "most of my users are on mobile" — and whenever reviewing or building any landing page, marketing site, pricing page or web app that will be opened on a phone, even when the person only mentions desktop. Use it too for the symptoms: endless vertical scroll on mobile, a nav that disappears below a breakpoint, tap targets that are too small, cards stacking into a wall, tables that squash, 100vh clipping behind the address bar, or a hero that breaks to too many lines. Run it after the landing-page skill and before shipping. It owns layout that changes with viewport, not what the page says.
---

# Mobile First

Most "responsive" pages are desktop pages with smaller text. They technically
fit, and they are miserable to use. This skill fixes that, and produces work
that can be handed to someone else one chunk at a time.

## What this skill is not for

This skill owns **every layout decision that changes with viewport**, plus the
mobile audit. It does not own what the page says.

If the problem is that the page says nothing, has no claim, has the wrong
sections or reads as AI-written, that is `landing-page`. Re-laying out a
section that should be cut is wasted work, and cutting it shortens the page
more than any transform here will.

The usual sequence: `landing-page` takes the page to structurally correct, then
this skill runs before shipping. A page that is right at 1440px is routinely
six screens of stacked boxes at 375px, and nobody finds that out until they
look at their own phone and get annoyed.

## The core principle

**Do not shrink the desktop layout. Re-choose the layout primitive.**

A four-column pricing grid at 1440px is not four stacked cards at 375px. It is
a swipe deck. A two-column heading-plus-content section is not a heading with
600px of empty space above the content. It is a centred single column. A
horizontal nav is not a hidden nav. It is a sheet plus a bottom bar.

Every fix in this skill is a substitution of one primitive for a different one,
chosen because it is the right shape for a thumb on a 375px screen. Shrinking
is what produces the endless grey scroll.

**The measurable outcome is page height at 375px.** Take it before and after.
A desktop-built page that has been genuinely re-laid-out for mobile usually
loses 30 to 45 percent of its height. If the number barely moves, the layout
was shrunk, not rebuilt.

## Mode

Say which mode in one line, then work.

- **Audit** — the page exists. Measure it, report findings, change nothing.
- **Fix** — produce chunked prompts, mobile chunks first.
- **Build** — new page. Apply the floor in `references/css.md` from the start
  and skip the audit.

Audit before fix, always. Fixing without measuring means nobody can tell
whether it worked.

## Step 1 — Measure

Do this before forming a single opinion. Read `references/audit.md` for the
full procedure. The seven numbers that matter:

1. **Total page height at 375px, 768px, 1440px.** This is the headline number.
2. **Horizontal overflow at 375px.** Scroll right. Anything that moves is a bug.
3. **Tap targets under 44×44 px**, listed with their actual sizes.
4. **Text below 4.5:1 contrast**, listed with measured ratios.
5. **Section heights at 375px**, ranked. The top two are where the work is.
6. **Every distinct CTA label** and where each appears.
7. **Does `prefers-reduced-motion` stop every animation.** List each one.

Report the numbers. Do not fix anything yet.

## Step 2 — Choose the transforms

Walk the page section by section. For each one, ask what primitive it should
be on a phone, not how to make the current one narrower.

`references/transforms.md` has the full pattern for each of these, with code.

| At 1440px | At 375px | Why |
| --- | --- | --- |
| 3–6 cards in a row or grid | Horizontal snap deck, cards at 82–86vw, dots below | Four stacked full-width cards is the single biggest source of dead scroll. Swiping is the native gesture for browsing a small set |
| Horizontal nav links | Hamburger → full-screen sheet, **plus** a fixed bottom CTA bar | Hiding links with `display:none` and adding nothing is the most common mobile bug in real code |
| Two-column heading + content | One centred column, heading centred, content full width below | The empty half of the viewport under a heading is pure waste, and it forces an awkward stack |
| Wide data table | Same table, shortened column headers, tighter padding | Tables usually survive. Do not turn them into cards unless the row count is large |
| Long vertical form or list | Same, but section padding cut by half | Not everything becomes a carousel |
| Fixed px type scale | `clamp()` for every heading and body size | Removes per-breakpoint hand-tuning entirely |
| Stat cards in a row | Plain text in a row, borders removed | Three bordered cards stacked is ~500px for three numbers |
| Marquee at desktop speed | Same, roughly 40% slower, narrower edge mask | Narrow screens need longer to read a passing card |
| Anything using `100vh` | `100svh`, or `100dvh` where resizing is wanted | See `references/css.md`. This is a real bug, not a preference |

**Do not carousel everything.** A snap deck is right for a small set of
comparable, self-contained things: pricing tiers, product cards, generated
outputs. It is wrong for a sequence someone must read in order, for anything
over about six items, and for content people need to compare side by side.

## Step 3 — The floor

These are not preferences. Check them on every mobile pass. Full code in
`references/css.md`.

- **Tap targets.** WCAG 2.2 sets 24×24 CSS px as the AA minimum. Apple's HIG
  says 44×44 pt and Material says 48×48 dp. **Use 44×44 as the working floor.**
  Reach it with padding and `::after` hit areas, not by making the visible mark
  bigger.
- **Never `100vh`.** Mobile browsers include the collapsible address bar in
  `vh`, so full-height sections get clipped on load and jump as the bar
  retracts. Use `100svh` when the content must always be fully visible, and
  `100dvh` only when you want it to resize with the toolbar and have confirmed
  it does not jank.
- **Safe areas.** Anything fixed to an edge needs
  `env(safe-area-inset-*)`, and the document needs `viewport-fit=cover`.
- **No horizontal overflow.** Ever. One overflowing element makes the whole
  page feel broken.
- **Reduced motion.** Every animation stops, including marquees and count-ups.
  A scroll marquee that ignores it is an accessibility failure, not a flourish.
  Name each animation individually rather than relying on a blanket rule:
  anything whose static state depends on JavaScript needs an explicit final
  state, or reduced-motion users get invisible content.
- **Motion has a named purpose.** Before any animation survives the mobile
  pass, it answers four questions: what is its purpose (feedback, spatial
  consistency, state indication, preventing a jarring change, explanation),
  does it settle rather than loop forever, does it fire once, does
  reduced-motion stop it. A "no" means cut it, not soften it. Mobile makes this
  stricter, not looser: a looping animation on a small screen competes with the
  content for a much larger share of the viewport.
- **Contrast, measured at build time.** 4.5:1 for body text, and specifically
  **measure the primary button when the accent is chosen**. Light text on a
  mid-tone brand fill fails constantly, and it is the one element the page
  exists to get pressed. Discovering it in the final audit means every version
  before that shipped with the main CTA below threshold.
- **Body padding for fixed bars.** A bottom CTA bar hides content unless the
  body has matching bottom padding.

## Step 4 — Write the fix as chunks

The output is a numbered set of prompts, each one self-contained enough to hand
to someone who has not read the others.

Rules that make the chunks work:

- **Mobile chunks first**, numbered `M1`, `M2`. Then desktop `D1`, `D2`. Then
  features `F1`. Then a read-only audit `A1` last.
- **`M1` is always foundation**: container padding, section padding, the type
  clamp scale, and the nav. Everything after it assumes those are done.
- **One section per chunk.** If a chunk touches three sections, split it.
- **Say why, in one line, for anything structural.** "Four stacked cards is
  2,800px of scroll" is what stops someone reverting it next week.
- **Put a standing-rules block at the top of every chunk.** Agents given a
  section-level task tidy the neighbouring section too, and across ten chunks
  that is how a page ends up with four different button labels.

```
> Only change what this prompt asks for. Do not refactor neighbouring code,
> do not rename things, do not rewrite copy I did not mention. Report file and
> line for every change. Check at 375px first, then 768px, then 1440px, and
> report page height at 375px before and after.
```

- **End with a read-only audit chunk** that re-measures everything from Step 1.
  After many separate edits, drift is close to guaranteed, and catching it in
  one read pass is much cheaper than noticing it live.

## Step 5 — Verify

Re-run Step 1. Then check the three things that automated passes miss:

- **Thumb reach.** Is the primary action in the bottom third of the screen, or
  at the top where a thumb cannot comfortably get to it on a large phone?
- **One-hand scroll.** Read the page start to finish with one thumb. Count how
  many times you hit a wall of identical stacked boxes.
- **The address bar.** Load it on a real phone with the bar visible, not just
  in DevTools. Half of all `100vh` bugs only appear there.

## What this skill will not do

- Turn a content problem into a layout problem. If a section is boring at
  1440px it will be boring at 375px. Cutting it beats re-laying it out.
- Add a carousel to make a section shorter when the honest fix is fewer items.
- Treat a hamburger menu as finished mobile navigation. A sheet with links is
  navigation. It is not conversion. The bottom bar is.

## References

Read the one you need, when you need it.

- **`references/audit.md`** — the measurement procedure, what to report, and a
  browser console snippet that finds overflow, small tap targets and low
  contrast in one pass.
- **`references/transforms.md`** — each layout substitution in full, with
  working code: snap decks, the nav pattern, centred sections, table handling,
  stat rows, marquees.
- **`references/css.md`** — the floor as copyable CSS: viewport units, safe
  areas, fluid type with `clamp()`, tap target helpers, scroll-snap, reduced
  motion, and the container query alternative.
