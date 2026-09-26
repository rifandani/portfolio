# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors: developers, hiring managers screening Tri Rizeki Rifandani, peers, clients, and anyone who wants to see his personal blog, projects, and about content. Situation: evaluating a person and their work from a public site. Job: browse blog, projects, and about without an account.

## Product Purpose

`@workspace/web` is Tri Rizeki Rifandani’s personal portfolio site on Next.js 16. It exists so visitors can read about him, browse projects, and read blog posts on an accessible, SEO-aware PWA. Success means a clear public site that presents him and his work honestly, with solid foundations (RSC/App Router, SEO, a11y components, tests, observability).

## Positioning

A personal portfolio for Tri Rizeki Rifandani — not a SaaS product and not a public “bulletproof Next template.” Package/README template wording is leftover and must not define the product. The site’s job is to show his work and writing; production scaffolding (React Aria, PWA, SEO, observability, tests) supports that job and is not a separate product claim.

## Operating Context

- Monorepo app under `apps/web`.
- Local dev via Next (`bun web` / `bun run --filter @workspace/web dev` with portless); Playwright e2e and Vitest unit tests.
- Public surfaces only; no login or register for visitors.
- Locales in product: `en` and `id` (next-intl).
- Internal Component Catalog at `/master-design`, gated by a Feature Flag for developers — not a visitor surface.

## Capabilities and Constraints

Confirmed:

- Fullstack Next.js 16 App Router (RSC, route handlers).
- Public portfolio content (blog, projects, about); no visitor auth.
- No app database for the portfolio today (static / file-backed content).
- UI built on React Aria Components / Intent UI patterns.
- PWA assets, SEO (metadata, OG, sitemap, robots), OpenTelemetry/observability hooks.
- MIT license; package identity `@workspace/web`.
- Author and subject: Tri Rizeki Rifandani; short / surname form: Rizki.

Undecided / open:

- Exact IA and depth of blog, projects, and about sections (committed as the three public content areas; page structure still open).
- No formal WCAG level (A/AA/AAA) committed; a11y remains a hard practice constraint via React Aria, not a certified claim.
- Canonical production hostname (code still has placeholders such as `https://web.com`).

## Brand Commitments

- Full name: Tri Rizeki Rifandani.
- Surname / short form: Rizki.
- Package identity: `@workspace/web`.
- Reject public branding as a generic Next.js template.
- Do not use the incorrect SEO author string “Roryki Rifandani” going forward; code that still says that is drift to fix.

## Evidence on Hand

- Runnable public home; theme and language toggles (`en` / `id`).
- Docs: `docs/observability.md`, `docs/seo.md`, `docs/self-hosting.md`, app `CLAUDE.md` / `README.md`.
- Tests and scripts (Playwright, Vitest).
- Home meta copy already mentions projects, writing, and contact; blog / projects / about are the confirmed product intent.
- No customer testimonials, case studies, or benchmarks — do not invent them.

## Product Principles

1. **Public by default** — no account wall; content is for visitors.
2. **Person first** — the site presents Tri Rizeki Rifandani (Rizki), not a reusable starter brand.
3. **Accessible by default** — React Aria patterns are non-regressible product truth.
4. **Ship-ready foundations** — PWA, SEO, observability, and tests stay first-class supporters of the portfolio.
5. **Honest claims** — no invented customers, metrics, WCAG certification, or template marketing.

## Accessibility & Inclusion

Accessibility is a hard product constraint: UI must remain keyboard- and screen-reader-usable via React Aria Components. No formal WCAG conformance level is claimed yet.
