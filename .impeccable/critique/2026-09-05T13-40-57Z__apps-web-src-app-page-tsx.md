---
target: correct font placement
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
timestamp: 2026-09-05T13-40-57Z
slug: apps-web-src-app-page-tsx
---

Method: dual-agent (A: design review, source-read · B: detector + browser on the running dev server at :4846)

Scope: public portfolio surface — `/` (primary), `/projects`, `/blogs`. Focus per request: **font placement**. Mode: Experience.

## Design Health Score

| # | Heuristic | Score | Key Issue |
| --- | --- | --- | --- |
| 1 | Visibility of System Status | 3 | Header links carry no `aria-current` and no active style; on `/projects` nothing says where you are (`site-header.client.tsx:10`) |
| 2 | Match System / Real World | 3 | Build scaffolding leaks to visitors: "Stub index. Entries below are labeled synthetic placeholders" (`projects/page.tsx:20`, `blogs/page.tsx:30`) |
| 3 | User Control and Freedom | 2 | No route back to `/` from the header on any page; the only home link sits at the page bottom |
| 4 | Consistency and Standards | 2 | The font system: three families, an inverted display/body assignment, mono set as prose twice, and DESIGN.md describing a Geist system the code abandoned |
| 5 | Error Prevention | 2 | All six project/blog rows are full-row links resolving to only two stub destinations (`content/portfolio.ts:99–125, 150–181`) |
| 6 | Recognition Rather Than Recall | 3 | Interactivity signalled only by hover wash; row titles are not link-coloured |
| 7 | Flexibility and Efficiency | n/a | Experience-mode portfolio, four pages, no repeat task — accelerators would be noise |
| 8 | Aesthetic and Minimalist Design | 2 | Layout restraint is real, but three tonal type registers fight it; root metadata still says "Bulletproof Next.js 15 Template" (`layout.tsx:32-33`) |
| 9 | Error Recovery | 3 | No error surfaces on the route; dead-end row links offer no recovery beyond browser back |
| 10 | Help and Documentation | n/a | No help surface belongs on a four-page personal portfolio |
| **Total** |  | **20/32** | **Acceptable (62.5%)** |

## Design Specificity Verdict

**Interchangeable — and the font layer is why.**

**LLM assessment.** Three families are loaded and the two sans have their jobs swapped. Quicksand — a soft geometric with rounded terminals, circular bowls, single-storey `a` — is `--font-sans` and carries the reading load. Roboto — the most anonymous grotesque available — is `--font-display` and carries the voice. The face with personality is doing invisible work; the face with none is doing expressive work. That is backwards, and neither face argues for the stated north star ("The Engine Room — cool, operational, restrained", `DESIGN.md:146`). IBM Plex Mono is the one defensible pick: it has a point of view and mono-as-console fits the concept.

**Deterministic scan.** `detect.mjs` on the five target paths: exit 2, **1 finding** — `design-system-font-size` at `home-sections.tsx:70`, `sm:text-[0.9375rem]` (15px) off the DESIGN.md type ramp. Confirmed in the browser as a real 15px computed value; not a false positive. The detector is quiet because it checks tokens against DESIGN.md, and DESIGN.md is itself stale — it cannot flag a font system it no longer describes.

**Browser measurement (the hard evidence).**

| Route       | Quicksand   | Roboto                | IBM Plex Mono |
| ----------- | ----------- | --------------------- | ------------- |
| `/`         | 82 elements | **4** (h1 + three h2) | 18            |
| `/projects` | 10          | **1** (h1)            | 0             |
| `/blogs`    | 10          | **1** (h1)            | 4             |

Webfont payload on `/`: **6 files, 103.7 KB**, all `rel="preload"` so all fetched eagerly.

- Roboto variable: **37.5 KB = 35% of payload**, serving 4 elements.
- IBM Plex Mono 600 + 700: **20.2 KB = 19% of payload, `status: unloaded` — downloaded, never activated** on any of the three routes.

**Visual overlays.** Injection genuinely succeeded (live-server on :8400, `window.impeccableDetect` present, server stopped afterward). The overlay returned 6 entries, of which **5 are false positives targeting the Next.js dev toolbar**, not app markup — verified: `#3b82f6`, the bounce easing, and the grid background have zero matches in `src/`. The one page-level font finding, `overused-font: roboto 33% of text`, has an unreliable percentage (its sample includes devtools chrome; the real figure is ~4%), but the family identification is correct.

## Overall Impression

The structure is genuinely well-authored and the fonts are pulling against it. The Signal-board IA, the hairline channel lists, the inset focus rings, the 16/14 body contract — that is craft. Then three typefaces arrive with no argument between them: an institutional grotesque for the name, an engineered mono for the role line, a warm rounded geometric for everything you actually read. Three personalities in the first 120 vertical pixels. The single biggest opportunity is to cut to **one sans plus the mono** and let hierarchy come from the size/weight/tracking ladder DESIGN.md already specifies.

## What's Working

1. **The Signal-board IA is correct and accessible.** Real `<section aria-labelledby>`, real `<ul>`, `border-y`/`divide-y` instead of card grids, `mt-16` between peers. Every section is heading-navigable.
2. **The row-link detail is authored behaviour, not accident.** `rowLinkClass` (`home-sections.tsx:27-31`) bleeds `-mx-2` past the text column so the hover wash reads as a row target, and pairs it with `focus-visible:-outline-offset-2` so the ring draws inset for the same reason — with a comment explaining why.
3. **The Two-Size Body Rule is kept perfectly.** Every body pair on all three routes is `text-base/6 sm:text-sm/6`. No third size anywhere. This is the one type rule the codebase actually holds, and it holds it without exception.

## Priority Issues

### [P0] The display and body roles are inverted, and the display face costs 35% of the font payload to set four strings

**What.** `layout.tsx:15-23` assigns Quicksand → `--font-sans` and Roboto → `--font-display`. Measured: Roboto renders on 4 elements on `/`, 1 each on `/projects` and `/blogs`, for 37.5 KB. Quicksand renders on 82 elements on `/`, for 28 KB. `--font-display` has exactly two consumers — `heading.tsx:18` and `card.tsx:44` — and `CardTitle` is not used on any public route, so `Heading` is its only real carrier. **Why it matters.** In the screenshots the two faces _are_ distinguishable — Quicksand's rounded geometry reads clearly against Roboto — which makes this worse than a wasted distinction. It is a tonal contradiction: a corporate-neutral name over soft-rounded body copy, with no relationship argued between them. It also violates the project's own authority twice: "no second sans" (`DESIGN.md:155`) and "hierarchy is weight and tracking, not a second family" (`DESIGN.md:211`). **Fix.** Collapse to one sans + one mono. Drop Roboto, point `--font-display` at `var(--font-sans)` so `heading.tsx` and `card.tsx` need no edit, and drive hierarchy off the ladder in `DESIGN.md:215-220`. If a second family is genuinely wanted, it must differ _in kind_ and must take the display slot on merit — never two neutral-adjacent sans. **Suggested command:** `/impeccable typeset`

### [P1] Quicksand contradicts the north star and is the weakest available face for 14px muted body copy

**What.** Quicksand sets every paragraph, bullet, row title and nav link — including the experience bullets at 14px in `text-muted-fg` (`text.tsx:13`, ≈4.9:1, `home-sections.tsx:112`). **Why it matters.** The committed concept is "cool, operational, restrained", with marketing warmth an explicit rejection. Quicksand reads approachable-brand, not operational. And rounded geometrics are the worst small-size body performers — circular counters close up, `a`/`o`/`e`/`c` converge — which the low-contrast muted grey compounds. This is the most-read text on the site set in the least-readable face on hand. **Fix.** Put the neutral grotesque in the body slot and reserve character for display, or return to a single grotesque per DESIGN.md. If Quicksand stays for warmth, demote it to display-only and never let it set a 14px paragraph — and then rewrite the north star to match, because "Engine Room" would no longer be true. **Suggested command:** `/impeccable typeset`

### [P1] Mono is set as prose twice, and the numeric feature contract was dropped in the swap

**What.** `home-sections.tsx:54` (`ChannelEmpty`) and `home-sections.tsx:216` (footer copyright) set full English sentences in `font-mono`. `DESIGN.md:230` permits mono outside code and meta **exactly once** — the role line. Separately, the swap deleted `--font-mono--font-feature-settings: "ss02", "zero"` with no replacement, while `DESIGN.md:209/220/343` still promise slashed zero and tabular figures for date/meta lines — and no `tabular-nums` exists on any date row (`home-sections.tsx:108,198`, `blogs/page.tsx:42`). **Why it matters.** Mono's value here is scarcity — it is the console tell. At three-plus non-meta appearances it becomes texture and the role line loses its distinction. The footer case is the worse one: the closing impression of a _personal_ site is a machine voice reading a legal string. **Fix.** Strip `font-mono` from `ChannelEmpty` and `HomeFooter`; keep mono to the role line plus date/reading-time meta. Add `tabular-nums` to the date columns, or state in DESIGN.md that the figure contract is retired. **Suggested command:** `/impeccable typeset`

### [P1] The design authority now documents a font system that does not exist — and the page ships the false claim in its own HTML

**What.** `DESIGN.md:155, 160, 209, 211, 215, 220, 230, 343, 369` and `.impeccable/design.json:481, 620, 623, 628, 659, 706` all describe Geist + Geist Mono with `ss02`/`zero`. `home-sections.tsx:42` emits into the rendered document: `OWN-WORLD: Engine Room — … Geist with one Mono role line`. **Why it matters.** DESIGN.md is the mechanism that stops the next change from being arbitrary. Once it is provably wrong about the most visible token in the system, it stops being consulted — and the stale claim is discoverable by anyone who views source. **Fix.** Whichever way the P0 resolves, rewrite DESIGN.md §Typography, §Key Characteristics and §Don'ts plus the matching `design.json` nodes in the same change, and update the `HomeDirectionContract` string. **Suggested command:** `/impeccable document`

### [P2] Six distinct rows, two destinations

**What.** Every project row hrefs to `/projects`; every blog row hrefs to `/blogs` (`content/portfolio.ts:99,108,117,125,150,161,171,181`). Rows are styled as first-class link targets. The stub pages then announce their own emptiness in visitor-facing copy. **Why it matters.** The audience is hiring managers. The page makes six promises and keeps two, converting interest into disappointment at the exact moment of engagement. **Fix.** Until detail routes exist, render project/blog rows as non-interactive `<li>` — no `rowLinkClass`, no hover affordance — or give each entry a real route. Move the synthetic-placeholder disclosure out of hero copy into one quiet footnote. **Suggested command:** `/impeccable harden`

### [P3] 20 KB of dead font payload, one off-ramp type size, and leftover template metadata

**What.** `layout.tsx:27` requests IBM Plex Mono `["400","500","600","700"]`; 600 and 700 measured as `unloaded` on all three routes — 20.2 KB preloaded for nothing (Plex Mono is not variable on Google Fonts, so these are separate files). The lone detector finding is `sm:text-[0.9375rem]` at `home-sections.tsx:70`. And `layout.tsx:32-33` still ships `title: "Layout"` / `description: "Bulletproof Next.js 15 Template"` — the exact branding `DESIGN.md:150` names as a confirmed rejection. **Fix.** `weight: ["400","500"]`. Either add 15px to the DESIGN.md ramp or snap the role line to `sm:text-sm`. Replace the root metadata with the real portfolio title and description. **Suggested command:** `/impeccable polish`

## Persona Red Flags

**Sam (accessibility-dependent, low vision).** `text.tsx:13` — every paragraph on all three routes is 14px `text-muted-fg` (≈4.9:1, a bare AA pass) in a rounded geometric whose single-storey `a` and near-circular `o`/`e`/`c` are exactly the shapes that collapse for low-vision and dyslexic readers. `home-sections.tsx:112` — the experience bullets, the densest block on the page, inherit it. `home-sections.tsx:70` — the role line is `uppercase` with `tracking-[0.14em]`, removing word-shape cues on the first line after the name. Credit where due: focus rings are real and inset-aware, motion is `motion-safe`-gated, headings are properly levelled and `aria-labelledby`-linked.

**Jordan (first-timer, hiring manager).** Second page view tells him the portfolio is fake (`projects/page.tsx:20`). He clicks the project that interests him and lands on a list containing that project, unclicked — broken or unfinished, he cannot tell. No way back to the identity page from the top of the screen (`site-header.client.tsx:18-25`). And the first viewport gives him three type voices, which reads as unpolished from a candidate whose pitch is front-end craft.

**Casey (distracted, mobile).** Header nav links are `px-2.5 py-2` on a `text-base/6` line ≈ 40px tall — under the 44px target `DESIGN.md:148` claims as product truth. At 390px the language toggle label runs into the right edge of the viewport in the captured screenshot. `home-sections.tsx:188` — blog OG images are `w-28` (112px) at 1200/630, leaving ~230px for a `text-pretty` title plus summary plus meta in three stacked sizes. No current-page indication on return from a tab switch.

## Cognitive Load

**3 of 8 checklist items fail, and all three failures are typographic.** Every typographic voice load-bearing: **fail** (three families, one serving 4 elements). Like things look alike: **fail** (clickable project/blog rows and non-clickable experience rows share identical title/description classes; interactivity is hover-only). Text set for sustained reading: **fail** (14px muted rounded geometric as the default body). Passing: single focus, chunking, reading order, choice count above the fold (2 links + 2 toggles), and chrome restraint — the 3.5rem bar with no name in it is exemplary.

## Emotional Journey

**Peak:** the identity block (`home-sections.tsx:58-77`) — name, tracked mono designation, one prose summary, `motion-safe` fade-slide. Quiet and structurally correct. **Valley, immediately after:** three personalities in 120 vertical pixels — institutional (Roboto), engineered (Plex Mono), friendly (Quicksand). The intended feeling is an engineer's console; the delivered feeling is a template where someone changed the fonts. **Second valley:** the click — six hover-lit targets, two stub destinations, greeted by their own "synthetic placeholders" disclaimer. **End:** a copyright line in mono. Peak-end lands mediocre despite a strong opening.

## Minor Observations

- `heading.tsx:18` applies `tracking-tight` unconditionally — correct for a grotesque at 24–30px, actively harmful for a wide rounded geometric. If the P0 resolves to one family, re-derive the value rather than inherit it.
- `card.tsx:44` puts `font-display` on a 16px `CardTitle` with no size floor guarding the token — Roboto downloaded for text Quicksand semibold would render near-identically.
- No `display` option on any `next/font` call. Default `swap` is right, but Quicksand is much wider than `system-ui`, so the FOUT reflow on the identity block will be visible.
- `blogs/page.tsx:43` renders `·` as raw text while `home-sections.tsx:200` correctly wraps it in `aria-hidden="true"` — same separator, one of which reads "middle dot" aloud.
- `card.tsx:53` spreads `{...props}` twice, so a caller `className` on `CardDescription` silently overrides the computed one.
- `DESIGN.md:155` still carries a "do not load Inter" warning that `globals.css` already resolved — the doc is being appended to, not maintained.
- Measurement caveats: light theme and Chrome only; `/projects` and `/blogs` were measured by evaluation, not screenshotted.

## Questions to Consider

1. **If you deleted Roboto tonight and pointed `--font-display` at `--font-sans`, what would a visitor lose?** Four headings would change face and 37.5 KB would stop downloading. State what the second family buys in terms a reader could perceive — if you can't, it is a network request, not a decision.
2. **"The Engine Room" or Quicksand — which one is the lie?** The code has quietly answered "the document," and the answer was never argued or written down. Warmer than the Engine Room is a legitimate direction, but it is a DESIGN.md rewrite, not a `next/font` import swap.
3. **Your own build contract says unreviewed and undocumented is unfinished — and you shipped that sentence into the page's HTML naming a font you no longer use.** What is DESIGN.md governing right now, and what stops the next contributor from adding a fourth family?
