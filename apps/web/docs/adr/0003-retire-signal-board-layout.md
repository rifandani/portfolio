# 3. Retire the Signal Board layout for a conventional personal-site layout

Date: 2026-09-22

## Status

Accepted. Supersedes the public-surface layout rules recorded in `apps/web/DESIGN.md`.

## Context

The public surfaces (home, projects, blog) were built to a thesis called the
**Signal Board**: an identity block followed by peer "channel" lists rendered as
full-bleed hairline stacks, with no mark in the topbar and no display-scale type
anywhere. Four named rules in `DESIGN.md` enforced it:

- **The No-Hero Type Rule** — no 3rem+ display scale exists in the system.
- **The No-Name-In-Chrome Rule** — the person's name never appears in the topbar.
- **The Signal Board Rule** — home content after identity is hairline channel
  lists, never card grids.
- **The One-Column Rule** — public surfaces cap at 64rem.

The thesis was also encoded in code: `HomeDirectionContract` in
`home-sections.tsx` emits it as an HTML comment for design audit, and
`.impeccable/` holds a critique and three mock variants derived from it.

Two problems accumulated:

1. The layout optimised for density on a site whose job is to introduce one
   person. A visitor landing on the home page met a name and a list, with no
   sentence saying what the person does. The identity block carried the
   thesis, but at a type scale the rules capped below the scale a thesis needs.
2. `DESIGN.md` had drifted from the code. It claimed the app runs on Geist and
   Geist Mono, and warned against loading Inter. The app actually loads
   **Quicksand** (`--font-sans`), **Roboto** (`--font-display`), and **IBM Plex
   Mono** (`--font-mono`) through `next/font/google` in `layout.tsx`. The rule
   nobody could follow was the rule nobody was reading.

   The same drift had reached the palette: `DESIGN.md` documented a blue-indigo
   accent ("Helm Blue") over cool violet neutrals, while `globals.css` had moved
   to a desaturated teal accent over warm stone neutrals. The rewrite corrects
   both claims against the code.

## Decision

Replace the Signal Board with a conventional personal-site layout:

- A **wordmark** in the topbar, linking home, beside `About / Projects / Blog`.
- An **identity hero**: a one-sentence role statement at display scale, the
  summary, and a row of social links.
- **Bordered cards**, stacked one per row, for work entries, projects, and
  posts — one card silhouette shared across home and both index pages.
- A new `/about` route, and real index pages replacing the former stubs.
- A **site shell** (`SiteShell`) so every public route carries the same header
  and footer.

The four named rules above are retired. `DESIGN.md` is rewritten around the new
thesis, with the font claim corrected to what the code loads.

### Kept deliberately

The palette and both themes, the 64rem column cap, the 8px soft-rect corner,
React Aria focus rings, flat-at-rest surfaces, and static content in
`core/constants/portfolio.ts`. Only the layout thesis changed; the material did
not.

## Consequences

- **Hard to reverse.** The Signal Board was a coherent system, not a stylesheet.
  Returning to it means rebuilding the public surfaces a second time.
- The stale `.impeccable/` briefs, critique, and Signal Board mocks stay on disk
  untouched. They are the record of the decision this ADR reverses; deleting
  them would hide the history.
- The hero needs a type scale the old rules forbade. It is applied as a
  per-surface class override, not as a new font token — the font definitions in
  `globals.css` are unchanged.
- Public copy moved into `messages/en.json` and `messages/id.json`. The language
  toggle in the header now changes the public pages, which it previously did not.
- Content remains `[Synthetic]` placeholder data, and the social links point at
  placeholder URLs. The new layout gives that text more room, so the
  placeholders are more visible than before, not less.
