# Module resolution has a single source of truth

> **Superseded in part (2026-09-04):** `@workspace/core` was inlined into `apps/web/src/core`. App modules now resolve through the `@/*` tsconfig path only. The Node version pin and `erasableSyntaxOnly` rules below still apply.

A workspace package resolves through its own `exports` map and nothing else. When this ADR was written, `@workspace/core` was a declared `workspace:*` dependency of the web app, so Bun symlinked it into `node_modules` and every bundler, `tsc`, and Node reached the same files by the same route. The tsconfig `paths` mappings that pointed at `packages/core/src` were removed. Alongside this, the Node version is stated once and read from one file, and `erasableSyntaxOnly` is on repo-wide.

> Adapted from the backend monorepo's `6434761`, which reached the same resolution rule as a consequence of dropping its build step. The half of that commit this repo cannot use — running TypeScript natively on Node — is recorded under [Considered Options](#considered-options).

## One version, three files

`.node-version` pins `26.8.1`, and all five workflows read it via `node-version-file` in place of ten hardcoded `node-version: 26` entries. `docker/web.Dockerfile` moves to `node:26.8.1-slim`.

The two numbers say different things, and the split is deliberate: **`engines.node` (`>=26.0.0`) is a support policy — what will run. `.node-version` is a pin — what we check.** `engines` is on the root and on `apps/web`, that being the sole workspace with a Node runtime. Bun does not enforce `engines` on install in any case — the floor is enforced by CI reading `.node-version`, not by the package manager. `packageManager: bun@1.3.14` pins Bun, and the Dockerfile's `oven/bun` stages match it.

Two consequences worth keeping in mind. An exact pin means CI no longer picks up 26.x patch releases on its own. And the version now lives in **three** files that must move together — `.node-version`, `apps/web/package.json`, and `docker/web.Dockerfile` — while `bump:deps` is an `npm-check-updates` invocation that touches none of them.

`erasableSyntaxOnly` is on in `base.json`. **Be honest about what it buys here.** In the backend monorepo the flag is a crash guard: an `enum` would typecheck and then kill a Node process that only strips types. Nothing in this repo runs on bare Node except `scripts/` — Vite and Turbopack compile `enum` and `namespace` without complaint. Here it is a consistency rule, chosen so that source in this repo means the same thing it means in the backend, and so that shared code never depends on a construct one runtime refuses. It cost nothing to adopt: the repo contained no non-erasable construct when it was turned on.

## Considered Options

- **Subpath imports (`#*`) replacing `@/*`** — **deferred, not rejected.** This is what the backend commit actually did: `"imports": { "#*": "./src/*" }` in each `package.json`, which Node, Bun, and Vitest resolve natively. It is the logical end of this ADR, and it would delete the last tsconfig-only alias in the repo. It is deferred on cost: hundreds of import rewrites. Vite 8 and Next 16 resolve `imports` natively.
- **Keeping a separate `@workspace/core` package** — later reversed; the package was inlined into `apps/web/src/core` when the monorepo dropped multi-app sharing.

## Consequences

- App code imports former core modules via `@/core/...`.
- Node / Bun version pins remain the cross-cutting rule from this ADR.
