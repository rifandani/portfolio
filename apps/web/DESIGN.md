---
name: "@workspace/web"
description: Personal portfolio UI kit — accessible Intent UI, plain-speech public surfaces
colors:
  helm-teal: "oklch(0.6 0.118 184.704)"
  helm-teal-fg: "oklch(1 0 0)"
  helm-teal-subtle: "oklch(0.704 0.14 182.503 / 0.15)"
  helm-teal-subtle-fg: "oklch(0.511 0.096 186.391)"
  paper: "oklch(1 0 0)"
  sand-canvas: "oklch(0.99 0.0035 85)"
  warm-graphite: "oklch(0.216 0.006 56.043)"
  stone-well: "oklch(0.97 0.001 106.424)"
  muted-ink: "oklch(0.538 0.013 58.071)"
  fog: "oklch(0.923 0.003 48.717)"
  fog-fg: "oklch(0.147 0.004 49.25)"
  overlay: "oklch(1 0 0)"
  overlay-fg: "oklch(0.147 0.004 49.25)"
  hairline: "oklch(0.909 0.005 56.366)"
  input-stroke: "oklch(0.869 0.005 56.366)"
  navbar: "oklch(0.995 0.001 106.423)"
  sidebar: "oklch(0.985 0.001 106.423)"
  turbine-teal: "oklch(0.596 0.145 163.225)"
  turbine-teal-fg: "oklch(1 0 0)"
  turbine-teal-subtle: "oklch(0.696 0.17 162.48 / 0.15)"
  turbine-teal-subtle-fg: "oklch(0.508 0.118 165.612)"
  alarm-vermillion: "oklch(0.577 0.245 27.325)"
  alarm-vermillion-fg: "oklch(0.971 0.013 17.38)"
  alarm-vermillion-subtle: "oklch(0.637 0.237 25.331 / 0.15)"
  alarm-vermillion-subtle-fg: "oklch(0.505 0.213 27.518)"
  amber-signal: "oklch(0.828 0.189 84.429)"
  amber-signal-fg: "oklch(0.279 0.077 45.635)"
  amber-signal-subtle: "oklch(0.828 0.189 84.429 / 0.2)"
  amber-signal-subtle-fg: "oklch(0.555 0.163 48.998)"
  info-subtle: "oklch(0.685 0.169 237.323 / 0.15)"
  info-subtle-fg: "oklch(0.5 0.134 242.749)"
typography:
  hero:
    fontFamily: "Roboto, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontSizeSm: "3rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "-0.025em"
  display:
    fontFamily: "Roboto, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Roboto, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Roboto, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: "Quicksand, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Quicksand, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    fontFeature: '"ss02", "zero"'
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  "2xl": "16px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.helm-teal}"
    textColor: "{colors.helm-teal-fg}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "6px 12px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "color-mix(in oklab, oklch(1 0 0) 10%, oklch(0.6 0.118 184.704) 90%)"
    textColor: "{colors.helm-teal-fg}"
    rounded: "{rounded.lg}"
  button-secondary:
    backgroundColor: "{colors.fog}"
    textColor: "{colors.fog-fg}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "6px 12px"
    height: "36px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.warm-graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "6px 12px"
    height: "36px"
  button-plain:
    backgroundColor: "transparent"
    textColor: "{colors.warm-graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "6px 12px"
    height: "36px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.warm-graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "6px 12px"
    height: "36px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.warm-graphite}"
    rounded: "{rounded.lg}"
    padding: "24px"
  badge-primary:
    backgroundColor: "{colors.helm-teal-subtle}"
    textColor: "{colors.helm-teal-subtle-fg}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 7px"
    height: "20px"
  note:
    backgroundColor: "{colors.stone-well}"
    textColor: "{colors.fog-fg}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System: @workspace/web

## Overview

**Creative North Star: "Plain Speech"**

This is the visual system for Tri Rizeki Rifandani's public portfolio app. The public surfaces do one job: say who this person is, then let a visitor scan the work. The layout is conventional on purpose — a wordmark topbar, a hero that states the role in one sentence, then stacked bordered cards for work, projects, and writing. Nothing asks the reader to learn a novel structure before they can read.

The machinery underneath is App Router, React Aria, PWA, SEO, and observability. Accessibility is product truth, not a coat of paint: React Aria focus rings, 44px touch targets, and forced-colors fallbacks are part of the craft. The Component Catalog at `/master-design` remains the kit proof surface and keeps the denser app-chrome density.

**Key Characteristics:**

- One accent (Helm Teal). Status colors are machinery lights, not brand.
- Roboto for headings, Quicksand for body, IBM Plex Mono for meta. Three faces, three jobs, no fourth.
- Soft-rect 8px default. Pills only for badges, toggles, and circular icon buttons.
- Hybrid depth: tone + hairline at rest; shadow only on overlays. Cards never lift.
- Light and dark as equal citizens. Primary chroma does not shift.
- 16px body on mobile, 14px from `sm` up — except hero and lead paragraphs, which hold 16px/1.75 at every width.
- One card silhouette, shared by projects and posts, on home and on both index pages. Work rows are the one public row without it: they hang off the work rail instead.

Visual rejections: marketing-landing spectacle, neon accents, skeuomorphism, decorative illustration, hover-lift theater, and leftover "bulletproof Next template" branding. The one sanctioned exception is the Glyph Engine in the home hero (see Components): it is made from the system's own mono face and tokens, it acts out the headline, and it is not illustration.

## Colors

Warm stone-neutral paper with a single desaturated teal as the action voice. Canonical values live in `:root` as OKLCH (`src/core/styles/globals.css`); dark theme inverts surfaces, not the signal.

### Primary

- **Helm Teal** (`helm-teal`): Primary buttons, focus ring (`--ring`), sidebar current, chart-1. The only high-chroma brand voice.
- **On-Primary** (`helm-teal-fg`): Text and icons on Helm Teal fills.
- **Helm Wash** (`helm-teal-subtle`): 15% wash for badges, selected rows, calendar cells. Dark uses 10%.
- **Helm Ink** (`helm-teal-subtle-fg`): Text on the wash; also text links.

### Secondary

- **Fog** (`fog`): Secondary / accent fill — the same token in light. Quiet chrome, pressed nav, hover overlays, card hover wash.
- **Fog Ink** (`fog-fg`): Text on Fog.

No tertiary role. `accent` equals `secondary` in light; do not invent a third brand hue.

### Neutral

- **Paper** (`paper`): App surfaces and cards (`--bg` / `--card`). On public routes this is the sheet, not the canvas.
- **Sand Canvas** (`sand-canvas`): The page canvas behind every route (`--canvas`, painted on `html`). One step warm and off Paper, so white cards read as sheets resting on it. Carries the paper grain.
- **Warm Graphite** (`warm-graphite`): Primary text (`--fg`).
- **Stone Well** (`stone-well`): Muted wells, code chips, tech tags, default notes (`--muted`).
- **Muted Ink** (`muted-ink`): Secondary copy, placeholders, icon rest state (`--muted-fg`). Set one notch darker than Stone-family mid-grey so it clears 4.5:1 over the grained Sand Canvas (4.85:1), not only over Paper.
- **Hairline** (`hairline`): Default borders, card borders, scrollbar thumb (`--border`).
- **Input Stroke** (`input-stroke`): Field borders at rest (one step stronger than Hairline).
- **Overlay** (`overlay` / `overlay-fg`): Popovers, menus, toasts.
- **Navbar / Sidebar** (`navbar`, `sidebar`): Chrome slightly off Paper so the canvas reads as the work surface.

### Status (not brand)

- **Turbine Teal**: Success fills and meters.
- **Alarm Vermillion**: Danger fills, invalid borders, required asterisk.
- **Amber Signal**: Warning fills; dark text on the fill (`amber-signal-fg`).
- **Info Wash** (`info-subtle`): Informational notes only — no solid info fill exists.

### Named Rules

**The One Voice Rule.** Helm Teal occupies ≤10% of any given screen. Its rarity is the point. Never wash a whole view in primary.

**The Same-Signal Rule.** Helm Teal does not change chroma between light and dark. Only surfaces invert.

**The Status-Is-Not-Brand Rule.** Teal, vermillion, and amber never appear as decorative chrome. They mean a state.

## Typography

**Heading Font:** Roboto (`--font-display`) **Body Font:** Quicksand (`--font-sans`) **Meta / Mono Font:** IBM Plex Mono (`--font-mono`)

All three load through `next/font/google` in `src/app/layout.tsx` and are exposed as Tailwind theme variables in `src/core/styles/globals.css`. Do not add a fourth family, and do not set body copy in the heading face.

**Character:** Roboto gives headings a flatter, more neutral skeleton than the rounded Quicksand body, so hierarchy reads as a change of voice rather than a change of size alone. IBM Plex Mono carries dates, durations, tech tags, and code — anything a reader scans rather than reads.

### Hierarchy

- **Hero** (Roboto 600, 1.875rem / 2.5 on mobile, 3rem / 3.5 from `sm`, tracking-tight): The one-sentence role statement on home, and the first-person headline on `/about`. Applied as a per-surface class on `Heading level={1}`, not as a new font token.
- **Display** (Roboto 600, 1.5rem / 2, tracking-tight): `Heading level={1}` at rest — kit page titles and index-page titles (which step to 1.875 / `sm` 2.25rem).
- **Headline** (Roboto 600, 1.25rem / 2, tracking-tight): `Heading level={2}`. Home section titles (Work experience, Projects, Writing).
- **Title** (Roboto 600, 1rem / 1.5): Card titles (`h3` inside a card), `Heading level={4}`, compact chrome.
- **Body** (Quicksand 400, 0.875rem / 1.5 from `sm`; 1rem / 1.5 on mobile): Default copy, field text, card descriptions. Muted Ink for supporting copy.
- **Lead** (Quicksand 400, 1rem / 1.75 at every width): The home summary, the `/about` biography paragraphs, and index-page intros. The one place body copy does not step down at `sm`.
- **Label** (Quicksand 500, 0.875rem / 1.5): Buttons, field labels, nav items. Badges drop to 0.75rem / 1.25.
- **Meta** (IBM Plex Mono 500, 0.75rem / `sm` 0.875rem): Date ranges, publish dates, reading time, tech tags, social link labels. The footer is a colophon: the full name signs in Roboto 600 (Fg, tracking-tight, matching the topbar wordmark), and the year, rights line, and build credit set as Meta in spaced caps (0.75rem at every width, `0.08em` tracking, uppercase, tabular year).

Mobile body and headings step up one Tailwind size so 16px remains the readable floor on touch.

### Named Rules

**The Three-Face Rule.** Roboto heads, Quicksand reads, IBM Plex Mono counts. A face outside its job is a bug, and a fourth family does not exist.

**The One-Hero Rule.** The display-scale hero appears once per surface, at the top, and never below the fold. It states a fact about the person; it is not a section title that got promoted.

**The Lead-Holds Rule.** Body copy steps 16px → 14px at `sm`, except lead paragraphs, which hold 16px/1.75 at every width. Do not mix a third body size in one view.

## Layout

Tailwind's default 4px spacing scale. Recurring gutters: 8 / 16 / 24 / 32 (`sm` / `md` / `lg` / `xl`).

App-kit `Container` is `max-width: 80rem` (`xl`) with 16px horizontal padding. Navbar content can open to `2xl` (96rem). Float navbar caps at `7xl` / `xl`.

Public surfaces use `SiteContainer` instead: the same `Container` capped at `lg` (64rem). The kit width is sized for dense app chrome; the public column is one text-led read. Header, page content, and footer all share `SiteContainer`, so the topbar aligns with the content.

Every public route renders through `SiteShell` (`src/core/components/site-shell.tsx`): sticky header, `<main>`, footer. A new public surface writes its content and nothing else.

Public page rhythm: page padding `py-16` / `sm:py-24`; sections separated by `mt-24`; cards within a section stacked at `gap-4`. Work experience is the exception: its rows carry their own 32px / `sm` 40px bottom spacing so the rail runs through the interval instead of jumping it, and so shell-less rows still read as separate entries. Generosity here is vertical, not horizontal — the column stays at 64rem.

The home page is: identity hero (text in the left 7 of 12 columns, the Glyph Engine in the right 5 from `lg`; behind the headline below `lg`) → work experience (all roles) → projects (first three) → writing (three most recent) → footer. Each preview section carries an "All …" link to its own index at the heading baseline.

Cards use a 20px internal gutter on mobile and 24px from `sm`. Fields stack label → control at 8px, control → error at 8px. Form clusters use 24px between fieldsets.

Density is compact-from-`sm`: buttons, inputs, and nav items lose 4–8px of height above the mobile floor, then keep a 44px invisible hit area via `touch-target` on square icon controls.

### Named Rules

**The One-Column Rule.** Public surfaces cap at 64rem and read top to bottom. Widening the column strands a card's meta from its title and leaves the hero beside empty canvas.

**The One-Shell Rule.** Public routes render through `SiteShell`. A page that assembles its own header or footer will drift from the others.

**The Preview-Then-Index Rule.** A home section that has an index shows at most three entries and links to it. Home introduces; the index enumerates. Work experience has no index route, so it is the one section that lists in full — if it ever grows one, it takes the three-entry cap with it.

## Elevation & Depth

Hybrid. Resting surfaces are flat: Paper (or Card, which equals Paper) plus a 1px Hairline and `shadow-xs` so the edge reads, not so the card floats. Dark mode leans even flatter — overlays keep a muted ring; tooltips stay quiet.

Overlays (popover, modal, sheet, command menu) are the only places structural lift is allowed: `shadow-xs` or `shadow-lg` plus `drop-shadow-xl` and a muted ring (`muted-fg/20`, `border` in dark). Depth is a state of floating, not a property of content. No `shadow-2xl` exists in the current codebase — do not introduce it.

### Shadow Vocabulary

- **Resting edge** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): Content cards, kit cards, float navbar, float sidebar, inset navbar content.
- **Overlay lift** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` plus `filter: drop-shadow(0 9px 7px rgb(0 0 0 / 0.1))`): Popovers, modals, sheets, command menu.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to floating (overlay). A card hover washes its background and may light it; it never lifts, scales, or grows a shadow. The sheet stays on the canvas — what moves is the light on it and the print inside its frame.

**The Ring-Over-Glow Rule.** Focus and hover never use colored drop-shadows. Use a 2–3px ring at 20% Helm Teal (or the intent color).

## Texture

The page canvas carries a fine paper grain: one fixed layer on `body::before`, a tiled fractal-noise SVG used as a mask and tinted by `--grain`, so the same tile darkens light paper and lightens dark paper. `fractalNoise` at `baseFrequency 0.9` over three octaves sets the speckle size, and an `feComponentTransfer` stretches the alpha (`slope 2.2`, `intercept -0.6`) so grains resolve as distinct specks instead of a flat mid-alpha wash — that transfer raises visible texture without moving the mean. The tile draws at its display size (180px), so one noise cell lands on roughly one CSS pixel at every viewport.

It sits at `z-index: -1` — above the canvas paint, below every route's content — takes no pointer events, and is hidden under `forced-colors` and in print.

### Named Rules

**The Canvas-Only Rule.** Grain belongs to the canvas. Cards, chrome, and overlays stay smooth, so the texture reads as the surface content rests on and never as noise inside the content.

**The Mean-Luminance Rule.** The grain moves the canvas it sits on: it darkens the light canvas by about 2% on average and lightens the dark canvas by about the same, so both `--canvas` values are set away from the tone they render as (light `#f9f8f7`, dark `#151312`). Two checks re-open whenever `--grain-opacity` moves — text on the canvas against the composited value, and card-against-canvas separation, which in dark mode collapses if the grain lightens the canvas up to the card.

## Shapes

Soft-rectangles. The default silhouette is `rounded-lg` (8px) on buttons, cards, inputs, notes, tooltips, nav items, and card media. Controls inset by 1px (`calc(var(--radius-lg) - 1px)`) so the inner fill sits inside the border.

- **sm (4px):** Code chips, square badges, tight inner clips.
- **md (6px):** Color swatches.
- **lg (8px):** The system default.
- **xl (12px):** Float navbar shell.
- **2xl (16px):** Modals (`rounded-t-2xl` on mobile, `rounded-2xl` from `sm`).
- **full:** Default badges, tech tags, switch thumbs, circular icon buttons, progress tracks.

Borders are 1px Hairline or Input Stroke. Overlays add a 1px ring at 15–20% muted. No hard squares, no 24px+ squircles on controls.

### Named Rules

**The Soft-Rect Rule.** 8px is the default corner. Pills are for badges, tech tags, toggles, and circular icon buttons only.

## Components

Refined and restrained. Confidence lives in focus treatment, not motion — the Glyph Engine is the one ambient motion on the site. Hover is a 10% overlay mix or a Fog wash — never `translateY`.

### Buttons

- **Shape:** Soft-rect 8px (`rounded-lg`). Circular only when `isCircle`.
- **Primary:** Helm Teal fill, on-primary text, 15% graphite border, medium weight. Default size `md`: 36px tall from `sm` (40px on mobile), `6px 12px` padding.
- **Hover / Focus:** Hover mixes 10% on-primary into the fill. Focus-visible: 2px outline + 2px ring with 3px Paper offset. Disabled/pending at 50% opacity.
- **Secondary:** Fog fill, Fog Ink text, muted-fg icons.
- **Warning / Danger / Success:** Status fills; same geometry. Do not use as brand.
- **Outline / Plain:** Transparent fill, Hairline border (outline) or no border (plain). Hover washes Fog.

Intents: `primary` | `secondary` | `warning` | `danger` | `success` | `outline` | `plain`. Sizes: `xs`–`lg` and `sq-*` squares.

### Chips

- **Style:** Default Badge is a pill. Primary uses Helm Wash + Helm Ink. Outline uses Hairline, no fill.
- **Tech tags** on project cards are a quieter relative: the `secondary` Badge in mono. They label, they do not signal.
- **State:** Group hover/focus shifts to a 20% overlay of the intent color.

### Cards / Containers

- **Corner Style:** 8px.
- **Background:** Paper / Card (same token in light).
- **Shadow Strategy:** Resting edge (`shadow-xs`) plus Hairline border. See Elevation.
- **Border:** 1px Hairline.
- **Internal Padding:** 24px gutter on kit cards; public content cards use 20px on mobile, 24px from `sm`.

### Inputs / Fields

- **Style:** Transparent fill, 8px corners, Input Stroke border, 16px/14px text.
- **Hover:** Border to `muted-fg/30`.
- **Focus:** Border `ring/70`, 3px ring at `ring/20` (Helm Teal). Invalid swaps to Alarm Vermillion subtle-fg and matching ring.
- **Disabled:** Stone Well fill.
- **Error / Required:** Field error in Alarm Vermillion Ink. Required labels append a vermillion asterisk.

### Navigation

- **Default navbar:** Hairline bottom, Navbar fill. Items are 8px-radius, medium, 14px from `md`. Hover/press → Fog. Current → Warm Graphite.
- **Float navbar:** 12px shell, Hairline, resting edge shadow, content padded 16px.
- **Public site header:** Sticky (`bg-navbar/90`, `backdrop-blur-md`), 56px tall (`h-14`). Left: the wordmark, in the heading face, linking home. Right: About / Projects / Blog plain links, then theme and language toggles. One row at every width — three links do not earn a mobile sheet.
- **Focus:** 2px ring at 20% Helm Teal plus inset ring.

### Note (signature)

Status callout: 8px, 16px padding, 15% current-color border, `backdrop-blur-2xl`, 32px circular indicator. Intents paint the matching subtle wash. Default sits on Stone Well at 50%. This is how the kit speaks status in-flow — not toast-only, not banner-chrome.

### Content Card (signature)

One silhouette, two fillings, defined once in `src/portfolio/components/card-shell.ts` and used by `ProjectCard` and `PostCard` on home and on both index pages. Every card that wears it is also a link, so the shell only ever reaches the page through `cardLinkClass`.

- **Shell:** Card fill, 1px Hairline, 8px radius, `shadow-xs`, 20px / `sm` 24px padding.
- **Media:** one wide preview image in a fixed frame that owns the 1px Hairline border and the clip (`aspect-[1200/630]`, `w-28` / `sm:w-40`, `self-start`), the same on project and post cards. The frame never moves; the print inside it does. The 48×48 soft-rect logo belongs to work rows only.
- **Type:** Roboto semibold `h3` title, Muted Ink description at body size, mono meta (date range, publish date, reading time).
- **Interactive:** Project and post cards are one full-card link, lit by the pointer (`card-lit`, `lit-card.client.tsx`). One position, `--lit-px` / `--lit-py`, drives three layers: the `secondary` wash graded around the light instead of flat, a Helm Teal specular at ~16% under it, and the Hairline waking to Helm Teal where the light reaches the border — a 1px gradient edge through `mask-composite`, never a glow. The print drifts and scales ~1.08 inside its frame, trailing the light by 320ms and settling back in 200ms — the exit is shorter than the entrance, so nothing is left moving on a card the pointer has left.
- **Leaving:** the light holds exactly where the pointer left it and only fades. It returns to centre after the fade has finished, when nothing is visible to move — recentring it on `pointerleave` snaps the light to the middle at full brightness.
- **Default light:** centred (0.5 / 0.5), carried as the `var()` fallback rather than a declaration on the card, which would shadow the tracked value. Keyboard focus, coarse pointers, reduced motion, and a failed script all get that symmetrical lit state plus the outline ring. Reduced motion keeps the lit state and drops every movement in it; forced colors drop the light entirely.

### Glyph Engine (signature)

The home hero's one authored motion (`src/portfolio/utils/glyph-engine.ts`, mounted by `glyph-engine.client.tsx`). It acts out the headline: a solid raymarched once per character cell on a Canvas 2D and printed in IBM Plex Mono, like donut.c. A hard-faceted icosahedron (craft) melts into a gyroid-displaced blob (obsession), holds, then locks back into its facets. There is no library; the renderer is about 550 lines of plain TypeScript.

- **Cycle:** 12s. Craft holds 4.5s, melts 2.5s (ease-in-out), obsession holds 3s, locks back in 1.3s (ease-out quart — quicker and harder than the melt, because precision is the craft half's character). The surface churns hardest mid-transition.
- **Print:** ramp ` .:-=+*#%@`, about 36 columns, stepped at ~30fps so it reads as print, not video. The first 1.1s scrambles the cells inside the bound and resolves the solid out of the noise.
- **Ink:** read from the tokens at runtime, so it follows the theme with no second palette. Levels 1–3 print in Muted Ink, the rest in Warm Graphite. Helm Teal prints only on specular peaks, a few glyphs at a time — never a wash (The One Voice Rule).
- **Light:** key from the upper left and a weak fill from the lower right, so the shadow side still prints form.
- **Pointer:** a fine pointer anywhere on the page tilts the solid toward itself, eased. Coarse pointers get the auto-rotation only.
- **Attention lens (hover):** resting a fine pointer on the solid flips its nature under the cursor — the local morph is `g + w·(1 − 2g)`, so on the crystal it melts a churning pocket, during the blob hold it freezes a patch of facets, and at the midpoint of a transition it does nothing, with no jump anywhere. The lens is a view-space field (radius 0.46 view units, a smoothstep edge from 38%), weighted once per ray. It eases in over ~200ms and out over ~130ms, and a trail of fading points lets the surface heal behind a moving cursor over 750ms. A one-cell ring of Helm Teal marks the lens edge the way a focus ring would; inside the lens specular peaks stay ink, so the pocket never floods teal. It is decoration like the rest: no cursor change, no click, no keyboard path needed.
- **Placement:** from `lg`, the right 5 of 12 hero columns, square. Below `lg`, it sits behind the headline at 20% (30% in dark), radially masked so it fades before the summary.
- **Discipline:** `aria-hidden` and no pointer events. It pauses off screen and in background tabs, and the clock only advances while it runs, so resuming never jumps. Reduced motion prints one still, mid-melt frame and redraws only on resize or a theme change. Without script or a 2D context, the box stays empty.

**The One-Moment Rule.** The Glyph Engine is the only ambient motion on the site. A second one splits the attention it exists to hold. Other motion stays a response to the reader (card light, rail scrub, theme transition).

### Work Rail (signature)

Work experience reads as a chronology, so its rows hang off a vertical rail in the left gutter (`src/portfolio/components/work-timeline-item.tsx`). The row carries no card shell: a dated entry already held by a rail does not need a second container, and the card borders fight the line. Separation comes from the rail and the row interval instead.

- **Gutter:** a 10px rail column, then 16px / `sm` 20px to the row's 48×48 logo.
- **Line:** 1px at 30% Muted Ink. Hairline is tuned to separate a card from the canvas and disappears when it has to carry a bare line on the dark canvas.
- **Node:** a 10px circle, Canvas fill with a 45% Muted Ink border, centred 7px down so it lands on the role title's first line — the row's first mark, with no card padding before it. It aligns with the title, not with the logo tile beside it: the title is what the row is read from.
- **Current role:** the one node filled Helm Teal with a 2px `ring-primary/20`. This is the accent earning its keep — one node on the page, and the date range says the same thing in words.
- **Rhythm:** 32px / `sm` 40px between rows. Without borders the interval is the only separation, so it runs wider than the 16px card stacks below it.
- **Construction:** each row owns the segment above its node and the segment down to the next one, so the line starts and ends exactly on a node whatever height the rows take. The whole rail column is `aria-hidden`; it repeats what the dates already say.
- **Scrub (hover):** a fine pointer on a row sends a bead — the current-role node repeated — down the rail from the first node to that row's node, and a 1px Helm Teal trace fills the rail behind it, from 45% at the first node to full at the bead. The lit length is how far back in time the reader is looking. The row's date range steps from Muted Ink to Warm Graphite. Travel is 560ms on an ease-out cubic so the bead visibly passes the nodes between; the return to the first node is 260ms, and the bead fades only after it is home. One registered number, `--rail-reach`, drives the bead and the trace, so they cannot come apart (`work-rail-list.client.tsx`, `.work-rail` rules). The trace paints under the nodes. Touch, keyboard, and no-script get the plain rail; reduced motion keeps the reading and drops the travel; forced colors drop the bead and trace.

### Named Rules

**The Rail-Is-Chronology Rule.** The rail belongs to work experience, which is the one home section ordered by time. Projects and writing are ranked, not dated — they stay a plain stack.

**The One-Card Rule.** Project and post cards share one silhouette and differ only in filling. A surface that needs a third card shape needs a different surface — and a row that is neither ranked nor navigable, like a work entry, needs no card at all.

**The Static-Work Rule.** A work entry is not a link. Do not give it hover affordances it cannot honor: no row wash, no card light, no pointer cursor. The pointer reads the rail (the scrub), never the row.

## Do's and Don'ts

### Do:

- **Do** keep Helm Teal rare (The One Voice Rule) and identical across themes (The Same-Signal Rule).
- **Do** use React Aria focus rings (2px + 20% wash, Paper offset on buttons) as a visible craft detail.
- **Do** default to 8px soft-rects and `shadow-xs` + Hairline on resting surfaces.
- **Do** head in Roboto, read in Quicksand, count in IBM Plex Mono (The Three-Face Rule).
- **Do** render every public route through `SiteShell` (The One-Shell Rule).
- **Do** preview at most three entries on home for any section that has an index, and link to it (The Preview-Then-Index Rule).
- **Do** put public copy in `messages/en.json` and `messages/id.json`; leave names, titles, and prose content in `core/constants/portfolio.ts`.
- **Do** put status only in Note, Badge, validation, and meter/progress — never as a decorative wash.

### Don't:

- **Don't** introduce a second brand hue or a fourth font family.
- **Don't** lift cards or buttons on hover (`translateY`, card scale, colored drop-shadows, skeuomorphic bevels). Lighting a card and drifting its print inside a fixed frame are not lift — the card's own box never moves.
- **Don't** introduce `shadow-2xl` on app chrome.
- **Don't** paint marketing-landing spectacle, neon, or illustration into chrome.
- **Don't** widen public surfaces past 64rem.
- **Don't** repeat the display-scale hero below the first screen.
- **Don't** hardcode public-facing English in a component.
- **Don't** brand the UI as a generic Next.js template.
- **Don't** fabricate end-user brand claims, testimonials, or a WCAG certification level.
