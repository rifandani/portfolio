# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Visitors who want to see Tri Rizeki Rifandani’s work. Situation: evaluating a developer’s projects and writing from a public site. Job: browse portfolio content without an account.

## Product Purpose

`@workspace/web` is a personal portfolio site on Next.js 16. It exists so visitors can view projects, writing, and contact paths in an accessible, SEO-aware PWA. Success means a clear public site with solid foundations (RSC/App Router, SEO, a11y components, tests, observability).

## Positioning

A personal portfolio, not a blank Next starter and not a SaaS product. The differentiator is accessible UI (React Aria) plus production scaffolding (PWA, SEO, observability, Playwright/unit tests) without auth.

## Operating Context

- Monorepo app under `apps/web`.
- Local dev via Next (`bun web` / `bun dev` with portless); Playwright e2e and Vitest unit tests.
- Public home page; no login or register.
- Engineers maintain foundations via docs and ops hooks—not end-user auth workflows.

## Capabilities and Constraints

Confirmed:

- Fullstack Next.js 16 App Router (RSC, route handlers).
- Static portfolio content (no app database).
- UI built on React Aria Components / Intent UI patterns.
- PWA assets, SEO (metadata, OG, sitemap, robots), OpenTelemetry/observability hooks.
- MIT license; package identity `@workspace/web`; author Tri Rizeki Rifandani.

Undecided / open:

- Exact portfolio content sections (projects, writing, contact) and visual direction beyond the current home shell.
- No formal WCAG level (A/AA/AAA) committed; a11y is a hard practice constraint via React Aria, not a certified claim.
- Root README notes a possible future move of `web` into a separate monorepo—undecided.

## Brand Commitments

- Name/identity: `@workspace/web`, personal portfolio for Tri Rizeki Rifandani.
- Author: Tri Rizeki Rifandani.
- No separate marketing brand system beyond this framing.

## Evidence on Hand

- Runnable public home; theme and language toggles.
- Docs: `docs/observability.md`, `docs/seo.md`, `docs/self-hosting.md`, app `CLAUDE.md` / `README.md`.
- Tests and scripts (Playwright, Vitest).
- No customer testimonials, case studies, or benchmarks—do not invent them.

## Product Principles

1. **Public by default** — no account wall; content is for visitors.
2. **Accessible by default** — React Aria patterns are non-regressible product truth.
3. **Ship-ready foundations** — PWA, SEO, observability, and tests stay first-class.
4. **Honest claims** — no invented customers, metrics, or WCAG certification.

## Accessibility & Inclusion

Accessibility is a hard product constraint: UI must remain keyboard- and screen-reader-usable via React Aria Components. No formal WCAG conformance level is claimed yet.
