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

This is the visual system for Tri Rizeki Rifandani's public portfolio app. The public surfaces do one job: say who this person is, then let a visitor scan the work. The layout is conventional on purpose — a logo topbar, a hero that states the role in one sentence, then stacked bordered cards for work, projects, and writing. Nothing asks the reader to learn a novel structure before they can read.

The machinery underneath is App Router, React Aria, PWA, SEO, and observability. Accessibility is product truth, not a coat of paint: React Aria focus rings, 44px touch targets, and forced-colors fallbacks are part of the craft. The Master Design at `/master-design` remains the kit proof surface. It keeps the denser app-chrome density, but it speaks the public vocabulary (see Components).

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

### Logo (not tokens)

- **Logo Navy** (`#0E2137`) and **Logo Teal** (`#03A0A7`): the logo's own fills on a white disc (`src/core/components/brand-logo.tsx`, also `public/favicon.svg` and the OG image). They live only inside the logo, never as UI color, and they do not change with the theme. The logo does not count toward the One Voice Rule.

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
- **Meta** (IBM Plex Mono 500, 0.75rem / `sm` 0.875rem): Date ranges, publish dates, reading time, tech tags, social link labels. The footer is a colophon: the full name signs in Roboto 600 (Fg, tracking-tight), and the year, rights line, and build credit set as Meta in spaced caps (0.75rem at every width, `0.08em` tracking, uppercase, tabular year).

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

Public page rhythm: page padding `py-16` / `sm:py-24`; sections separated by `mt-24`; cards within a section stacked at `gap-4`. Work experience is the exception: its rows carry their own 32px / `sm` 40px bottom spacing so the rail runs through the interval instead of jumping it, and so shell-less rows still read as separate entries. The posts index is the other exception: it files its entries by year (see Postmark Log). Generosity here is vertical, not horizontal — the column stays at 64rem.

The home page is: identity hero (text in the left 7 of 12 columns, the Glyph Engine in the right 5 from `lg`; behind the headline below `lg`) → work experience (all roles) → projects (first three) → writing (three most recent) → footer. Each preview section carries an "All …" link to its own index at the heading baseline.

The about page is: headline and biography in the left 7 of 12 columns, and the ID Badge with "View CV" under it in the right 4 from `lg`. The badge column is sticky at `top-20` (the strap takes the space above the card), so the CV link stays in view while the biography scrolls. Below `lg`, the badge (`w-40` / `sm:w-48`) and the CV link sit in one row between the headline and the biography, so the page's one action is on the first screen. Then What I bring (the Skill Net) → Tech stack → Get in touch → footer.

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

- **Breadcrumb (Post Detail):** The kit `Breadcrumbs` in a `<nav>` above the meta row (`post-breadcrumbs.tsx`): Posts › the Post, with the kit's muted chevron. The crumbs read like the Post Outline entries: Label at 14px, Muted Ink at rest, Warm Graphite on hover. Color only, never weight. The last crumb is the current page (`aria-current="page"`, not a link). It is Warm Graphite, has no hover rule, and truncates to one line, because the full title is the `h1` below it. A matching `BreadcrumbList` goes into the JSON-LD.
- **Copy page (Post Detail):** Outline `sm`, on the meta row at the end. It copies the Post Markdown. On success, the clipboard icon and the label cross-fade to a check and "Copied!" in 180ms. The icons also scale a little. The border takes Turbine Teal at 60%. It holds 2s, then returns. The success tone marks a state, so it obeys the Status-Is-Not-Brand Rule — never amber. Both states share one grid cell, so the width never jumps. The accessible name stays "Copy page"; an `<output>` announces the copy. Reduced motion swaps at once.
- **Page Actions menu (Post Detail):** A `ButtonGroup` joins "Copy page" to an outline square trigger with a muted chevron, at the same height. The menu opens at the bottom end. Each item has a muted monochrome icon, a `font-medium` label, and a muted description. Assistant marks take `currentColor`, never brand colors. Every item opens a new tab.
- **Share Actions (Post Detail):** A second `ButtonGroup` of the same form, before the Page Actions, 8px apart. "Share" has a muted link icon and copies the Post Detail address with the same cross-fade to a check and "Copied!"; its `<output>` says "Link copied". The menu lists X, LinkedIn, and Threads: a muted monochrome mark and a plain label, no description, because each name is its own explanation. Network marks take `currentColor`, never brand colors, and sit in a padded viewBox so their optical size matches. Every item opens a new tab.
- **View CV (About):** A link in outline button form (`cv-link.client.tsx`), the same quiet form as the Post Detail actions. It is not a primary fill: the ID Badge above it already draws the eye, so Helm Teal stays off the page. A muted document icon, the label, then an up-right arrow that says it opens in a new tab; a visually hidden suffix says the same to a screen reader. From `lg` it fills the badge width, the label at the start and the arrow at the end.
- **Project Links (Project Detail):** the demo and the GitHub repository of a Project, as link buttons under the description (`project-link-buttons.client.tsx`), 24px down, 12px apart. The first link is a primary fill: it is what a visitor came to the Project for, so it is the one Helm Teal fill on the page (The One Voice Rule). A second link is outline. The demo has a muted window icon, GitHub its monochrome mark from the sprite. Both end in an up-right arrow that steps 2px up and right on hover, plus a visually hidden "(opens in a new tab)". Below `sm` two labels do not fit on one row, so the buttons stack at full width, label at the start and arrow at the end, as "View CV" does. A Project without a demo shows GitHub alone, and it takes the primary fill. A Project with no links shows no row.
- **Portrait (About):** printed on the ID Badge (see below), in a frame with a 1px Hairline and a 2.5cqw radius that owns the clip. The photo is anchored at the top, so crop it 4:5 with the face high.

### Post Outline (Post Detail)

The Post's sections: the title first (it stands for the text before the first heading), then each `h2`, and each `h3` indented 12px (`post-outline.client.tsx`). It shows only when the Post Document has at least one section.

- **Placement:** from `lg`, a 13rem right column beside the Post Document, 64px gap, inside the 64rem column (The One-Column Rule holds). It is sticky at `top-24` and ends with the article, so it never covers the Post Pager. Below `lg`, it folds into a native `<details>` between the header and the Post Document: Hairline rules above and below, no card, a 44px summary with the kit's plus/minus indicator.
- **Label:** "On this page" in the footer's Meta spaced caps. It names the nav; it is not an eyebrow over a heading.
- **Entries:** Label size at 14px (16px in the mobile disclosure), Muted Ink at rest, Warm Graphite on hover and on the current section (`aria-current="location"`). Color only, never weight, so an entry never re-wraps when it becomes current.
- **Rail and trace:** a 1px rail at 30% Muted Ink, the Work Rail line. A 1px Helm Teal trace fills it from the top to the bottom of the current entry, from 45% to full, so its length is how far the reader has come. It moves in 360ms on an ease-out quart. The trace is 1px because a side border over 1px on a list item is refused.
- **Current section:** the last heading whose top passed 128px from the viewport top (below the 80px heading scroll margin, so a jumped-to section is current at once). At the page end the last section is current. A picked entry stays current until the reader scrolls on their own again (wheel, touch, or key).
- **Jump:** a plain click glides to the section (`scrollIntoView` smooth, so the heading keeps its 80px scroll margin). It still does what the native jump does: it pushes the hash and moves focus to the heading, which draws no ring because it is not a control. Modified clicks (new tab, new window) keep the native link.
- **Fallbacks:** plain `#id` links and native `<details>`, so the outline works with no script; the trace draws only after it is measured. Reduced motion drops the travel and the glide (the click jumps); forced colors drop the trace and underline the current entry.

### Chips

- **Style:** Default Badge is a pill. Primary uses Helm Wash + Helm Ink. Outline uses Hairline, no fill.
- **Tech tags** on project cards are not chips: they are the Stack row of the Drawing Sheet's title block, mono Warm Graphite joined by Muted Ink " · ". They label, they do not signal.
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
- **Public site header:** Sticky (`bg-navbar/90`, `backdrop-blur-md`), 56px tall (`h-14`). Left: the logo (32px, `BrandLogo`), linking home, with the short name as its accessible name. When the `componentCatalog` flag is on, a right-click or Shift+F10 on the logo opens the kit context menu at the pointer (`site-logo.client.tsx`): one item, a muted swatch icon, "Master Design" in `font-medium`, and a muted description, linking to `/master-design`. When the flag is off (always in production), the logo keeps the browser's own link menu. Right: About / Projects / Blog plain links, then theme and language toggles. One row at every width — three links do not earn a mobile sheet.
- **Focus:** 2px ring at 20% Helm Teal plus inset ring.

### Note (signature)

Status callout: 8px, 16px padding, 15% current-color border, `backdrop-blur-2xl`, 32px circular indicator. Intents paint the matching subtle wash. Default sits on Stone Well at 50%. This is how the kit speaks status in-flow — not toast-only, not banner-chrome.

### Content Card (signature)

One silhouette, two fillings, defined once in `src/portfolio/components/card-shell.ts` and used by `ProjectCard` (the Drawing Sheet filling, below) and `PostCard` on home and on both index pages. Every card that wears it is also a link, so the shell only ever reaches the page through `cardLinkClass`.

- **Shell:** Card fill, 1px Hairline, 8px radius, `shadow-xs`, 20px / `sm` 24px padding.
- **Media:** one wide preview image in a fixed frame that owns the 1px Hairline border and the clip (`aspect-[1200/630]`). On post cards it is a small thumbnail at the far end of the Postmark Log entry (`w-28` / `sm:w-32`); on project cards it is the drawing of the Drawing Sheet. The frame never moves; the print inside it does. The 48×48 soft-rect logo belongs to work rows only.
- **Type:** Roboto semibold `h3` title, Muted Ink description at body size, mono meta (date range, publish date, reading time).
- **Interactive:** Project and post cards are one full-card link, lit by the pointer (`card-lit`, `lit-card.client.tsx`). One position, `--lit-px` / `--lit-py`, drives three layers: the `secondary` wash graded around the light instead of flat, a Helm Teal specular at ~16% under it, and the Hairline waking to Helm Teal where the light reaches the border — a 1px gradient edge through `mask-composite`, never a glow. The print drifts and scales ~1.08 inside its frame, trailing the light by 320ms and settling back in 200ms — the exit is shorter than the entrance, so nothing is left moving on a card the pointer has left.
- **Leaving:** the light holds exactly where the pointer left it and only fades. It returns to centre after the fade has finished, when nothing is visible to move — recentring it on `pointerleave` snaps the light to the middle at full brightness.
- **Default light:** centred (0.5 / 0.5), carried as the `var()` fallback rather than a declaration on the card, which would shadow the tracked value. Keyboard focus, coarse pointers, reduced motion, and a failed script all get that symmetrical lit state plus the outline ring. Reduced motion keeps the lit state and drops every movement in it; forced colors drop the light entirely.

- **Drawing Sheet (Project filling):** a Project reads as one sheet of a drawing register (`project-card.tsx`). The list stays under ten, so each Project gets room for its artifact. From `lg` the preview (the drawing) takes 8 of 15 columns and a title block takes 7, split by a 1px Hairline; below `lg` the drawing runs the full card width and the title block sits under it behind a Hairline rule.
  - **Registration marks:** four 1px corner ticks, 10px arms, 7px outside the frame, in Muted Ink at 55% (`.sheet-marks`). When the light reaches the sheet they close in to 4px and step to Warm Graphite in 320ms; the frame and the card never move. Reduced motion keeps the colour and drops the travel; forced colors print them in `CanvasText`.
  - **Title block:** the sheet number first — "No." in Meta caps, then two mono digits at 1.875rem, Warm Graphite, tabular — and "/ total" in Muted Ink at the far end. The number is the Project's rank in the full list and the total counts the full list, so a Home preview of three still says how many sheets there are. It is `aria-hidden`: the list position already says it. Then the Roboto semibold title (1.125rem) and the Muted Ink description. Then a ruled `dl` (`divide-y border-y`, no box — never a card in a card): **Stack** (the tags) and **Opens** ("Live demo · Source", from the Project Links; the row is left out when a Project has none). Labels are Meta caps in a 4.5rem column; values are mono Warm Graphite. These are facts, not links: the whole sheet is the one link.
  - **Footer:** "View project" and an arrow at the foot of the block, Muted Ink at rest; on hover and focus they step to Warm Graphite and the arrow moves 2px right, as the Status Screen rows do. `aria-hidden`, because the link already names the Project.

- **Postmark Log (Post filling):** a Post reads as one entry in a writer's log (`post-card.tsx`). Posts outnumber Projects and keep coming, so the entry stays one short row and the list reads by date and length before it reads by picture. From `sm`: the Date Stamp, then the text, then the thumbnail at the far end, 8rem wide and the full height of the entry (the print crops to fit, so it ends on the same line as the ruler row). Below `sm`: the stamp and the thumbnail share the top row, like the postmark and the stamp on an envelope, and the text runs full width under them. The text comes first in the source, so the link reads title first.
  - **Date Stamp:** a rubber date stamp, 4.5rem wide: two 1px rules 2px apart, 8px outer corner, no fill, so it is an impression on the sheet and never a card in a card (`.post-stamp`). The month in Meta caps, the day in mono at 1.875rem (Warm Graphite, tabular, the Drawing Sheet's number scale), the year in Meta. The month follows the Locale; the day and year come from the ISO date and the month formats in UTC, so no time zone moves a Post. The visual parts are `aria-hidden`; a visually hidden long date inside `<time>` says it once. The rules rest in Muted Ink at 55% and ink to Warm Graphite in 320ms when the light reaches the entry, as the registration marks do. Nothing moves.
  - **Title and summary:** Roboto semibold title (1rem, `sm` 1.125rem), Muted Ink summary at body size.
  - **Reading ruler:** the reading time as a ruler (`.post-ruler`), before the "N min read" Meta: a tick at zero and one per minute on a 6px pitch, every fifth tick taller, on a 1px baseline. The scale is ten minutes, and a longer Post stretches it (capped at 40), so every ruler starts at the same length and a list compares at a glance. The whole scale is faint (Muted Ink 22%), the minutes read are Muted Ink. When the light reaches the entry a Warm Graphite copy opens from zero to the minutes read, at 120ms plus 40ms a minute, so a longer read takes longer to fill; it drains in 160ms. It is measurement, not a progress bar: it never claims how far the reader has read. `aria-hidden`, because the words say the time.
  - **Arrow:** at the end of the ruler row, Muted Ink at rest, Warm Graphite and 2px right on hover and focus, as the Drawing Sheet footer does.
  - **Index by year:** the posts index files entries under their publish year (`postsByYear`). From `lg` the year holds a 6rem gutter column, mono 1.5rem Warm Graphite over a Meta count ("3 posts"), and stays in view at `top-24` while its entries scroll past, so a long list never loses its place in time. Below `lg` the year heads its entries on one line: the year, a 1px rule at 30% Muted Ink, the count. Years sit 48px / `sm` 64px apart. Home shows the three latest entries with no year heads, which is why the stamp carries its year.
  - **Fallbacks:** reduced motion keeps the ink and drops the fill travel; forced colors print the stamp and the ruler in system colors with no ink layer.

- **Post Pager (Post Detail):** the same shell with a text-only filling, at the end of the Post, `mt-24` after the text. A mono Muted Ink direction label with an arrow ("← Previous post", "Next post →"), the Roboto semibold title, then the Post Meta. From `sm` the two cards sit side by side at equal height; the next Post takes the right column and aligns right, even when it is alone. Stacked on mobile, both align left. Previous is older and next is newer, so each arrow points the way the reader goes in time. No print, so nothing drifts — the light alone answers the pointer.

### Master Design (internal)

The kit proof surface at `/master-design`, for developers only (`src/master-design/components/catalog.tsx`). It is not a public route, so it does not take `SiteShell`, but it uses the public vocabulary, so a component is seen on the surface it ships on.

- **Canvas:** no fill of its own. The Sand Canvas and its grain show through, and the specimens rest on it directly. A kit Card in a specimen is a sheet on the canvas, never a card in a card.
- **Topbar:** the public header's material (`bg-navbar/90`, `backdrop-blur-md`, Hairline, 56px): the logo as the home link, a 1px divider, the catalog name in Roboto 600 at 14px, then the theme and language toggles. It runs the full width; the catalog is not held to the 64rem column.
- **Intro:** the index-title scale `h1`, the count as a mono line of record, then a Lead line. No hero (The One-Hero Rule).
- **Index:** the Post Outline, extended to groups (`catalog-nav.tsx`). From `lg`, a 16rem side column, sticky under the topbar, with the filter at the top and the index scrolling under it; the column follows the current entry. Below `lg`, a native `<details>` under the intro holds the filter and the index, and a pick closes it. Group names are Meta spaced caps with the count, on the kit Disclosure with its plus/minus indicator. Entries are plain `#id` links: Muted Ink at rest, Warm Graphite on hover and when current (`aria-current="location"`), color only. The 1px rail and the Helm Teal trace are the Post Outline's: the trace fills to the current entry, or to its group when the group is closed, and it is hidden while a filter hides the entry. A filter opens every group it matches.
- **Categories:** each heads its entries as the posts index heads a year: the name as a Headline `h2`, a 1px rule at 30% Muted Ink, and the count in Meta caps at the end.
- **Entries:** Hairline rows (`divide-y`), 40px of vertical padding. From `xl` the name holds a 10rem gutter column and stays in view at `top-24` while a long specimen scrolls; below `xl` it heads the specimen. Under the name, the anchor as a mono link (`#button`) with the Link rule sweep, so a developer can copy a deep link. Variant labels stay mono in their real lowercase prop names; swatch groups are Meta caps.
- **Brand Guidelines:** the first category, above Foundation (`showcases/brand-*.tsx`). It holds guidelines, not components (the `guide` field on a Category): a Lead line under its heading, "N guidelines" as its count, and no place in the intro's component count. Five entries, each drawn from the logo's own data (`BRAND_LOGO_FILLS`), so no copy can drift from `BrandLogo`:
  - **Logo:** the logo on two fixed plates, light (white) and dark (the dark canvas as it renders, `#151312`). The plates do not follow the theme, because a file is chosen for where it goes, not for the reader's theme. Under them: Copy SVG (the `CopyButton` cross-fade), Download SVG, and Download PNG (1024 px, drawn from the SVG in the browser, so there is no second file), then a Snippet of the component.
  - **Clear Space & Size:** a construction sheet: dashed guides through the zone and logo edges, the zone washed at 6% Muted Ink, a ghost logo `x` wide in each margin band, and dimension rules for `4x` and `x`. The clear space is `x` = ¼ of the logo width on each side. Then the size ladder, 64 to 16 px: 32 px is the site header, 16 px (the favicon) is the floor.
  - **Logo Colors:** Logo Navy, Logo Teal, and Disc White as fixed swatches, each over a ruled `dl` of HEX, RGB, and OKLCH. Each value is a button that copies it. They are logo colors, not tokens (see Colors → Logo).
  - **Logo Misuse:** one correct specimen and five wrong ones (stretched, rotated, colors swapped, a glow, no disc), each the real logo with one change. A check or a cross in the status inks marks each caption. That is a state, so the Status-Is-Not-Brand Rule holds.
  - **Name:** the full name and the short form in Roboto 600, each with where it is used, then the spellings not to write, struck through.
- **Motion:** only the trace (360ms, ease-out quart). A pick glides to the section; reduced motion jumps.

### Status Screen

The page a visitor gets when a route cannot answer (`src/core/components/status-screen.tsx`): the 404 (`not-found.tsx` and the Master Design gate, through `NotFoundScreen`) and the error (`error.tsx` for a route segment, `global-error.tsx` for the root layout, both through `ErrorScreen`). It renders through `SiteShell` (The One-Shell Rule), so the visitor keeps the topbar and is never stranded on a blank sheet.

- **Composition:** left-aligned in the public column, like `/about`, with the page rhythm (`py-16` / `sm:py-24`). The title is a plain sentence at the index-title scale (1.875 / `sm` 2.25rem), not the hero: it states a fact about the page, not the person (The One-Hero Rule). A Lead paragraph names the problem and the recovery, then the actions.
- **Line of record:** one mono Meta line under the title. For a 404 it is the status and the path that failed (`404 · /posts/x`, the status in Warm Graphite, the path in Muted Ink, `break-all` so a long path wraps). For an error it is the digest ("Reference …"), the one detail a visitor can send back, and on `global-error` the status before it (`500 · Reference …`). It is data, so it is mono; it is never an eyebrow over the title.
- **No false status:** a segment error claims no code, because it can happen in the browser after a 200. Only `global-error` shows 500: the root layout failed, so the response is a 500.
- **Global error:** `global-error` replaces the root layout, so it brings the layout's parts itself: `globals.css`, the shared faces (`src/core/styles/fonts.ts`), the theme provider, and the messages for the locale cookie, loaded on demand so no other page pays for them. If the chrome throws, it falls back to the same screen without the header and footer, never to a blank page.
- **Actions:** the 404 has one primary "Go to home page". The error has a primary "Try again" (it calls `retry`) and an outline "Go to home page". Both links look like buttons through `HomeLink` (`home-link.client.tsx`).
- **The way on:** a Title-scale `h2`, "Pages on this site", over the three public areas in the topbar's order, as Hairline rows (`divide-y border-y`, like the Tech Stack layers, no card). Each row is one link: the name in Roboto semibold, the page's own intro in Muted Ink, an arrow at the end. From `sm` the name holds a 10rem column so the hints start on one line; below `sm` the hint wraps under the name. Hover and focus sweep the Link rule under the name and step the arrow 2px right and to Warm Graphite. Reduced motion keeps the colors and drops the travel.

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

**The One-Moment Rule.** The Glyph Engine is the only ambient motion on the site. A second one splits the attention it exists to hold. Other motion stays a response to the reader (card light, reading ruler fill, rail scrub, skill net light, ID Badge spin, theme transition).

### ID Badge (signature, About)

The About portrait, printed on an ID card that hangs from a lanyard (`src/portfolio/components/id-badge.client.tsx`, motion in `src/portfolio/utils/id-badge-motion.ts`, print data in `src/portfolio/utils/id-badge.ts`, rules under `.id-badge` in `globals.css`). It is the page's one object a visitor can pick up.

- **Card:** CR80 proportions (54:86), 3px thick. Each face is the card material — Card fill, 1px Hairline, `shadow-xs`, a 5.5cqw corner — and two side edges close the gap, so the card keeps a side when it turns edge-on. A pill slot at the top; a 2.2cqw Helm Teal stripe along the foot. The stripe on the front and the signature on the back are the only teal at rest (The One Voice Rule): each face carries one teal mark.
- **Front:** slot, portrait, the full name (Roboto 600), then the job title from the current work entry (Muted Ink). Nothing else: the name and the role are what a badge is read for.
- **Back:** Born / Based in / Email as a `dl` (Meta caps label over a medium value). The role is on the front only, so the back does not repeat it. The birth month prints in the reader's Locale (`Intl.DateTimeFormat`, long month, UTC), as the work dates do. At the foot, the verification block: his signature, then a barcode and a two-line machine-readable zone in the ICAO style, both made from the same real facts; the barcode and the zone are `aria-hidden`, because the plain words already say them. No invented numbers.
- **Signature (Back):** his pen signature, traced once into one compound SVG path (`id-badge-signature.tsx`) that fills with `currentColor`, so the theme sets the ink and there is no second drawing. It is 64% of the print width, starts 1.5cqw before the text column as a pen overshoots, and reads to a screen reader as "Signature of …". The line under it is microprint, as on a real card: the full name in 1.5cqw mono caps, repeated, in Muted Ink — a rule at arm's length, text up close. The ink crosses it about four-fifths of the way down, where the tail and the lower loops dip. The "Signature" caption (Meta caps) sits under the line at its end, clear of the tail.
- **Signature ink:** Helm Teal (`--primary`), the stripe's colour. Primary does not shift between themes (The Same-Signal Rule), so one value reads on the light and the dark card. It prints at 94% opacity, so the microprint shows through where the pen crosses it. Forced colors print it in the system text color.
- **Scale:** the badge is its own size container, so all print is in `cqw` (with a rem floor for real text) and the card reads the same at 10rem and at the 19rem column.
- **Lanyard:** a graphite strap that fades in from above with the short name woven in Meta caps, and a flat grey clip through the slot. Flat fills and one border — no bevel, no gloss on the metal.
- **Interaction:** a drag spins the card on its vertical axis; on release the throw carries on and a spring settles it on the face it was heading for. A tap flips it. A fine pointer resting on it leans it up to ~8° toward itself. The drag speed and a flip kick an under-damped pendulum that swings the whole lanyard from the top of the strap. Vertical drag on touch still scrolls the page (`touch-action: pan-y`).
- **Light:** as the card turns, the face shades toward black by up to 16%, and a narrow gloss band — Helm Teal specular with a pale core, the card-light vocabulary — crosses it. Both are zero when the card faces square, so the resting badge carries no light.
- **Arrival:** one turn, 450ms after load, so the visitor sees that the card turns. It is skipped if the visitor reached the card first, and under reduced motion. After that the badge moves only when the visitor moves it; the loop stops when every spring has settled, so it is not ambient motion (The One-Moment Rule holds).
- **Access:** one native button lies over the card ("Flip the ID card", `aria-pressed` while the back shows). Enter and Space flip; the arrow keys flip in that direction. The face turned away is `inert`, so a screen reader reads only the face in view. The focus ring is a 2px Helm Teal outline 4px off the card, square to the page. A Meta hint under the card says "Drag to spin".
- **Fallbacks:** no script shows the front, still. Reduced motion keeps direct drag (the card follows the hand) but drops travel: release, a tap, and a key land on the face at once, with no lean, swing, or arrival. Forced colors drop the light and the stripe.

### Skill Net (About)

What I bring, drawn as a schematic (`src/portfolio/components/skill-net.tsx`, keys in `aboutContent.skills` in `portfolio.ts`, rules under `.skill-net` in `globals.css`). Curiosity is the source, and the other four are what it feeds. The drawing tells the reader what the order alone did not, and it acts out the biography's start on an Arduino board.

- **Source:** "Curiosity that compounds." A via — a 14px graphite pad with a drilled centre — then the name in Roboto 600 at 1.125rem / `sm` 1.25rem over Lead copy in Muted Ink.
- **Outputs:** the other four, each a 10px square pad (2px corners, 45% Muted Ink border, Canvas fill), the name in Roboto 600 at 1rem, then Body copy in Muted Ink. Square pads are the schematic's mark; circles belong to the work rail.
- **Standing (below `lg`):** a trunk runs down the left gutter from the via, and a 1px branch runs right to each pad. The copy indents to 2.75rem, so the four read as branches off the source (1.75rem).
- **Lying (from `lg`):** the trunk drops to a bus under the source, and the bus drops 2rem to four columns. The pad sits over each name.
- **Traces:** 1px, Muted Ink mixed 30% into the canvas (42% in dark), opaque, so crossings do not print a darker pixel. A 5px junction dot marks each T; the last item is a corner and has no dot. Each item draws its own runs, as the work rail does, so nothing is measured.
- **Lit path (fine pointer):** an item lights the traces from the via to its pad, and then the pad fills. The via lights the whole net, because curiosity feeds all four. Each run fills in the direction current travels, 70ms per step, so the light runs down the net. Leaving drains it in 160ms. The light is Warm Graphite, not Helm Teal: the page's teal stays on the ID Badge. The item gets no wash and no pointer cursor (The Static-Work Rule). It is CSS only (`:has()`), so it needs no script.
- **Fallbacks:** touch and no hover get the plain net. Reduced motion keeps the lit path and drops the travel. Forced colors draw the net in `CanvasText` with no light.
- **Semantics:** a `p` for the source and a `ul` for the four. The pads and dots are `aria-hidden`; the lines are pseudo-elements.

### Tech Stack (About)

The tools, drawn as a cross-section (`src/portfolio/components/tech-stack.tsx`, data in `techStack` in `portfolio.ts`, rules under `.tech-spine` in `globals.css`). It follows What I bring. It acts out the biography's line "one language took me all the way from the button to the database".

- **Layers:** Interface, Styling, Server, Data, Platform, then Testing and AI tools, from the button down, as Hairline rows (`divide-y border-y`, no card). The layer name is Meta spaced caps in a 7rem column from `sm`; below `sm` it sits over its tools.
- **Tools:** a 36px tile in the card material (Paper, 1px Hairline, `shadow-xs`, 8px) holding the mark at 18px in Warm Graphite, then the name in mono, Warm Graphite. The names are tech tags, so they are mono (The Three-Face Rule). Marks are monochrome from `react-icons/si` and take `currentColor`, never brand colors; Playwright, which that set does not ship, is `#icon-playwright` in the sprite.
- **Spine:** TypeScript is not a layer. It is one strap beside all the layers, full height, in the lanyard's graphite (Warm Graphite in light, `oklch(0.34 0.008 56)` in dark), 3.5rem / `sm` 4.5rem wide, 8px corners. From the top: the mark, the name set vertically in Roboto 600, then the name repeated as a faint mono weave that fades out, and the "Language" label in Meta caps at the foot. Forced colors keep the strap as a border and drop the weave.
- **Static:** nothing here is a link, so nothing answers the pointer (The Static-Work Rule). No Helm Teal: the page's teal stays on the ID Badge.
- **Semantics:** two `dl`s: the spine (Language → TypeScript) and the layers (layer → a list of tools). The weave is `aria-hidden`.

### Work Rail (signature)

Work experience reads as a chronology, so its rows hang off a vertical rail in the left gutter (`src/portfolio/components/work-timeline-item.tsx`). The row carries no card shell: a dated entry already held by a rail does not need a second container, and the card borders fight the line. Separation comes from the rail and the row interval instead.

- **Gutter:** a 10px rail column, then 16px / `sm` 20px to the row's 48×48 logo.
- **Line:** 1px at 30% Muted Ink. Hairline is tuned to separate a card from the canvas and disappears when it has to carry a bare line on the dark canvas.
- **Node:** a 10px circle, Canvas fill with a 45% Muted Ink border, centred 7px down so it lands on the role title's first line — the row's first mark, with no card padding before it. It aligns with the title, not with the logo tile beside it: the title is what the row is read from.
- **Current role:** the one node filled Helm Teal with a 2px `ring-primary/20`. This is the accent earning its keep — one node on the page, and the date range says the same thing in words.
- **Projects:** a role holds one or more projects below its header, 20px down. Each project is a Title-weight 14px heading (`h4`, Warm Graphite) over its outcomes as a disc list in Muted Ink — markers at 50% Muted Ink, 8px between items, capped at 70ch. Below `sm` the projects run under the logo at full row width, so a phone gets a readable measure; from `sm` they indent 68px to the title's edge. Projects sit 24px apart with no box or divider, the same way rows do. The list is the one place a work row carries bullets: a project's outcomes are separate claims, and a paragraph would bury them.
- **Rhythm:** 32px / `sm` 40px between rows. Without borders the interval is the only separation, so it runs wider than the 16px card stacks below it.
- **Construction:** each row owns the segment above its node and the segment down to the next one, so the line starts and ends exactly on a node whatever height the rows take. The whole rail column is `aria-hidden`; it repeats what the dates already say.
- **Scrub (hover):** a fine pointer on a row sends a bead — the current-role node repeated — down the rail from the first node to that row's node, and a 1px Helm Teal trace fills the rail behind it, from 45% at the first node to full at the bead. The lit length is how far back in time the reader is looking. The row's date range steps from Muted Ink to Warm Graphite. Travel is 560ms on an ease-out cubic so the bead visibly passes the nodes between; the return to the first node is 260ms, and the bead fades only after it is home. One registered number, `--rail-reach`, drives the bead and the trace, so they cannot come apart (`work-rail-list.client.tsx`, `.work-rail` rules). The trace paints under the nodes. Touch, keyboard, and no-script get the plain rail; reduced motion keeps the reading and drops the travel; forced colors drop the bead and trace.

### Named Rules

**The Rail-Is-Chronology Rule.** The rail belongs to work experience, which is the one home section ordered by time. Projects are ranked, not dated — they stay a plain stack. Writing is dated, but a Post already carries its date on its stamp and its year on the index, so it takes no rail either: the rail is for a career, not a publication log.

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
