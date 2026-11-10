# Default Bulletproof folders and boundaries

The web app follows Fallow's default `bulletproof` preset. We move the code into its folder conventions instead of changing its zones or import rules. The app config, `apps/web/.fallowrc.json`, sets `"preset": "bulletproof"` and has no custom zones or rules.

## Folders and import directions

- `src/app` combines features into routes and owns the Site Shell and status screens. It can import features, shared code, and server code.
- `src/features/gallery`, `master-design`, `portfolio`, `post`, and `project` each form a separate feature zone. Fallow discovers them from the folders. Each can import shared code and server code, but cannot import another feature, including through type-only imports.
- `src/features/index.ts` re-exports the four Home sections that the Home page uses together. The preset permits this parent barrel to import its feature children. The app still combines the sections into the page.
- `src/components`, `hooks`, `lib`, `providers`, `shared`, `styles`, `types`, and `utils` belong to the preset's shared zone. Shared code cannot import features, `app`, or server code.
- `src/server` owns locale actions, request locale configuration, logging, and server error mapping. It can import shared code.

The former `core` directory is removed. Common cards and the language control live in `src/components`. The language control receives its locale action from its callers, so shared UI does not import server code. Identity and profile data live in `src/shared/constants`; work history and About content stay in `src/features/portfolio`. Markdown parsing, syntax highlighting, Slug conversion, and OG parameters live in `src/utils`. Each content feature still owns its source schema, collection rules, route paths, and Markdown files.

The highlighter location in [ADR-0004](./0004-post-source-is-canonical-post-document-is-derived.md) changes with this move. Its parsing and rendering rules stay the same.

## Checks

Run `bun check:boundaries` from the repository root. It runs `fallow --root apps/web architecture --boundaries --fail-on-issues --quiet`, so the default `src/...` patterns resolve from the app root. Fallow is pinned to 3.33.1. Its JSON report has `kind: "architecture"`.

Boundary coverage is required. Only configuration files, generated type declarations, E2E tests, and the two required Next.js entry files (`src/proxy.ts` and `src/instrumentation.ts`) may remain outside the preset zones. Tests beside source code follow that source zone's rules. The proxy test lives under `src/app/_tests`.

The root `.fallowrc.json` keeps repository-wide dead-code, duplication, and health settings. `bun check:all` runs the app boundary check before that analysis. CI also runs the boundary check before the existing Fallow action. Forbidden imports are errors, with no boundary baseline or suppression.

References: [boundary analysis](https://fallow.tools/docs/analysis/boundaries/) and [boundary configuration](https://fallow.tools/docs/configuration/boundaries/).
