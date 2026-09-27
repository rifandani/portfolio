---
slug: monorepo-boilerplates
title: Monorepo Boilerplates
description: Two open-source starter monorepos, with React and Expo on the client and Hono and Effect on the server.
tags: [TypeScript, React, Expo, Hono, Effect, Drizzle, OpenTelemetry, Bun]
order: 1
previewSrc: /previews/monorepo-boilerplates.svg
previewAlt: A browser window and a phone on a shared core package, with a dotted line to two stacked server boxes labeled Hono and Effect
demoUrl: https://rifandani-fe-monorepo-spa.vercel.app/
githubUrl: https://github.com/rifandani/fe-monorepo
---

Each new project used to cost me the same first week. I set up the linter, the router, the login flow, the tests, and the CI before I wrote one feature. Now I start from one of two monorepos: [fe-monorepo](https://github.com/rifandani/fe-monorepo) for the client apps and [be-monorepo](https://github.com/rifandani/be-monorepo) for the server apps. Both are open source under the MIT license, and I still maintain both.

## What is inside

The two repos hold five workspaces. Bun installs them, and every workspace is TypeScript.

- `apps/spa`: React 19, Vite 8, TanStack Router, Query, and Form, React Aria Components, and Tailwind 4.
- `apps/expo`: Expo SDK 53, Expo Router, Tamagui, MMKV, and React Hook Form.
- `packages/core`: the API clients, i18n, hooks, and utilities that both client apps share.
- `apps/hono`: Hono 4 with Zod OpenAPI, Better Auth, Drizzle, and PostgreSQL.
- `apps/effect`: an Effect 4 HTTP API that runs on Node or Bun.

## The web app

The [demo](https://rifandani-fe-monorepo-spa.vercel.app/) runs the web app against [DummyJSON](https://dummyjson.com/).

- Login: A guard on each protected route sends a guest to the login page, then back to the page they asked for.
- Themes and languages: Light and dark themes, in English and Indonesian.
- Master Design: One page shows more than 80 component variants. A feature flag hides it in production, and a devtools panel toggles the flag during development.
- PWA: A service worker caches the app for offline use, prompts the user to reload for a new version, and shows push notifications.
- SEO: Page titles, Open Graph tags, schema.org data, and a sitemap script.
- Telemetry: The browser sends OpenTelemetry traces and metrics, and reports Core Web Vitals.

## The mobile app

The Expo app uses the API clients and translations from `packages/core`, so a change to an endpoint schema reaches the web and mobile apps in one commit. It stores data in encrypted MMKV. EAS builds it for three variants (development, preview, and production), and EAS Update ships JavaScript changes over the air. Maestro flows test the login, home, and profile screens on a device or simulator.

## The server apps

Both server apps run the same middleware in almost the same order: request ID, CORS, timing, timeout, language detection, CSRF, and secure headers. You can compare a Hono handler and an Effect handler for the same request.

The Hono app has email and password login from Better Auth, with rate limits. Drizzle manages the PostgreSQL schema, migrations, and seed data. Scalar serves the OpenAPI docs at `/openapi/docs`, and `/llms.txt` gives the same docs to AI agents.

The Effect app describes its endpoints with `HttpApi`, serves Scalar docs, and adds liveness and readiness probes and request metrics.

Neither app has a build step. Node 26 removes the types when it loads a `.ts` file, and Bun runs the same files. Docker Compose starts PostgreSQL and a Grafana stack that receives the traces, metrics, and logs.

## Opinions in the structure

A boilerplate should make decisions, so these repos make many. Each decision has its own architecture decision record (ADR), so a team can keep it or delete it.

- Feature folders: `auth/`, `user/`, and `core/` each hold their own components, hooks, and utilities.
- One path to each module: A workspace package resolves only through its `exports` map. The repos use no tsconfig `paths` aliases, because Node does not read tsconfig.
- Layers in the Effect app: `domain/` comes before `api/`, and `api/` comes before `server/`. A folder imports only from the folders before it, so a client can load the API description without the database code or the secrets.
- Tests: Unit tests cover pure module logic. MSW mocks the network boundary. Stryker mutation tests are advisory and do not block a merge.

## Checks on each change

GitHub Actions runs these checks in both repos:

- Each pull request: gitleaks secret detection, Fallow (dead code, duplicates, and complexity), lint, typecheck, and unit tests with coverage. The web app also gets a production build.
- Each push to `main`: Playwright end-to-end tests for the web app.
- Each week: a dependency scan with osv-scanner, CodeQL, and an OWASP ZAP scan of each deployed app.
- Each version tag: a GitHub release with a generated changelog.

Oxlint and oxfmt lint and format the code through Ultracite, and Husky runs them before each commit.

## Ready for coding agents

Each repo gives an AI agent the same rules that it gives a person. Each repo has more than 40 agent skills, and 25 of them come from [Matt Pocock's skills](https://github.com/mattpocock/skills). His skills share one set of domain docs, so each skill reads the decisions and terms that the earlier skills wrote down.

## Start a project from it

The root README of each repo has a "Getting Started" checklist. Each step names the files that hold placeholder values, such as the app name, the bundle ID, the local hostname, and the demo user. The last step runs one `git grep` command that finds each placeholder that is left.

## What comes next

Each app README has a "Todo" section that I keep up to date:

- [`apps/spa`](https://github.com/rifandani/fe-monorepo/blob/main/apps/spa/README.md)
- [`apps/expo`](https://github.com/rifandani/fe-monorepo/blob/main/apps/expo/README.md)
- [`apps/hono`](https://github.com/rifandani/be-monorepo/blob/main/apps/hono/README.md)
- [`apps/effect`](https://github.com/rifandani/be-monorepo/blob/main/apps/effect/README.md)

## References

- [Web app demo](https://rifandani-fe-monorepo-spa.vercel.app/)
- [fe-monorepo on GitHub](https://github.com/rifandani/fe-monorepo)
- [be-monorepo on GitHub](https://github.com/rifandani/be-monorepo)
