# Risk

Pick **exactly one** catalog name. Score the three-dot diff vs the base from ship step 1. **Highest match wins.** Unclear match → `medium-risk`. `low-risk` only when every path fits that rung.

## `high-risk` — extra attention

Any path or behavior in:

| Surface | Where it usually lives |
| --- | --- |
| Auth / Session / credentials | `**/auth/**`, session storage, `apps/web/src/proxy.ts` |
| Public API / HTTP contracts | `apps/web/src/core/apis/**`, `apps/web/src/core/services/http.ts`, `apps/web/src/app/api/**`, server actions |
| MCP | `.mcp.json`, MCP server configs |
| Design system | `apps/web/src/core/components/ui/**`, `apps/web/src/master-design/**`, design tokens, `globals.css` that define the system |
| DB schema | `**/*.prisma`, `**/schema.ts`, migrations |
| Agent skills / always-loaded agent config | `.agents/skills/**`, `.claude/skills/**`, `.cursor/skills/**`, `AGENTS.md`, `CLAUDE.md` |
| Merge gates | `.github/workflows/**`, `scripts/security/**`, `security/**`, secrets, deploy env, permissions that decide what may merge |

A new path that does the same job still counts. Showcase-only UI (`**/showcases/**`) is not the design system.

## `medium-risk` — regular attention

Product or runtime behavior that is not `high-risk`: app features, shared helpers, i18n catalogs, operational docs (`CONTRIBUTING`, runbooks), tests **with** product code.

## `low-risk` — no attention

Every changed path is one of: prose/docs/comments (`README.md`, `CONTEXT.md`, `**/docs/**` excluding skills), tests-only, formatting/lockfile with no behavior. Eligible for auto-merge once checks pass.

**Done when:** one name chosen; `low-risk` only if the whole diff fits that rung.
