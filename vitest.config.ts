import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    pool: "threads",
    isolate: false,
    fileParallelism: true,
    css: false,
    passWithNoTests: false,
    projects: ["apps/web"],
    // `coverage` is root-only (it sits in Vitest's `NonProjectOptions`).
    // Scope rationale, the Logic Seam convention, and the threshold policy live in docs/adr/0001-unit-tests-are-pure-module-logic.md.
    coverage: {
      provider: "v8",
      // Opt-in only. Enabling by default would tax every watch run; the `unit` CI job opts in via `--coverage`.
      enabled: false,
      reportOnFailure: true,
      reporter: ["text", ["text-summary", { file: "summary.txt" }], "html"],
      // Deliberately not `./coverage` itself, whose root is reserved for fallow's
      // runtime sidecar traces. Feeding fallow test coverage would make it report the
      // ADR-sanctioned untested layers as dead code. Test reports live in named
      // subdirectories instead — `coverage/vitest` here, `coverage/stryker` for
      // mutation output (ADR-0003).
      reportsDirectory: "./coverage/vitest",
      // Floor, not a target, and deliberately *below* the measured baseline. Enforced per file (`perFile: true`), so one thinly covered module cannot hide behind the rest of the suite.
      // The suite only clears 100 because the repo is boilerplate-sized; pinning the floor there would fail CI on the first partially covered file added to `include`, which is ordinary work, not a regression. 90 leaves room for that while still catching a real slide. Lowering it needs a reason in the commit.
      thresholds: {
        perFile: true,
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
      // This allowlist is the definition of business logic: layers whose modules are pure enough to unit test.
      // Untested files only appear in the report when matched here, so a new logic-bearing folder must be added.
      include: [
        "apps/web/src/**/{actions,apis,constants,middlewares,services,utils}/**/*.{ts,tsx}",
        "apps/web/src/**/*-store.{ts,tsx}",
        "apps/web/src/app/**/*.ts",
        "apps/web/src/proxy.ts",
        "apps/web/src/core/providers/query/client.ts",
      ],
      exclude: [
        "**/*.unit.test.ts",
        "**/*.d.ts",
        "**/types.ts",
        // all constants
        "apps/*/src/**/constants/**",
        // Pure Zod schema modules — declarations only, no functions. ADR-0001 puts
        // "plain Zod shapes" out of test scope, but leaving them in `include` gave
        // them a free 100%: importing a schema file executes every line, so this file
        // scored 100% statements/branches/lines with no test file in existence.
        // Mutation testing is what exposed it (9.09%, ADR-0003). Excluded so the
        // coverage figure means something. Modules that mix schemas with repositories
        // (`cdn.ts`) stay in — their functions are tested.
        "apps/web/src/core/apis/core.ts",
        // Composition root: one `new Http(...)` declaration. The wiring that
        // can be wrong — reading the Access Token, responding to a rejected
        // one — lives in `core/services/http.ts`, which is measured.
        "apps/web/src/core/services/http-client.ts",
        "apps/web/src/app/**/route.ts",
        "apps/web/src/app/manifest.ts",
        "apps/web/src/core/utils/i18n.ts",
        // Logic Seam shells — logic lives in tested siblings (ADR-0001).
        "apps/web/src/core/utils/evlog.ts",
        "apps/web/src/post/services/posts.ts",
        "apps/web/src/project/services/projects.ts",
        "apps/web/src/proxy.ts",
      ],
    },
  },
});
