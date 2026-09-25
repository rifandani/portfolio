# Surface: public home (`/`)

## Scope & mode

Visitor mode: **Experience**. Route: `/`. Related: `/projects`, `/blogs` (stub list pages).

## Audience, job, proof

Hiring managers, developers, peers, clients. Job: remember who Rizki is, then explore experience / projects / blogs. Proof: labeled synthetic placeholders (bio, 3–5 roles, 3–6 projects, 3–6 blogs).

## Direction

- Visual authority: Engine Room (`DESIGN.md`) — no new palette/type.
- Structure: **Signal board stacked** (approved comp `apps/web/.impeccable/mocks/home-signal-stacked.png` + refinements).
- Sequence: topbar (Projects, Blog, theme/i18n) → name → summary → experience → projects → blogs.
- Focal moment: identity name + summary in first viewport.
- Seed: `d0bcbd80` candidate 5 (Signal board).

## Refinements (binding)

- Topbar: **no name**; links `/projects`, `/blogs`; keep theme + language toggles.
- Experience row: company logo, company name, role, date range, bullet list of work.
- Project row: logo, title, description.
- Blog row: OG image, title, summary, published date, approximate reading time; sort most recent first.
- Do not present invented roles/companies/posts as real claims — mark synthetic.

## Untouched

React Aria kit tokens, soft-rect / Flat-By-Default / One Voice / No-Hero rules, PWA/SEO foundations.

## Inventory (implementation medium)

| Ingredient | Medium |
| --- | --- |
| Topbar nav + toggles | semantic HTML + existing Link/Button/toggles |
| Identity name + summary | semantic HTML + Heading/Text |
| Company / project logos | SVG monogram placeholders in `/public/placeholders/` |
| Blog OG images | SVG/PNG placeholders (synthetic) |
| Experience / project / blog lists | semantic lists + hairline rows (not nested marketing cards) |
| Primary nav CTA | TextLink / Link |

## Open

Real bio, roles, projects, blogs, assets to replace placeholders. Detail routes beyond stubs.
