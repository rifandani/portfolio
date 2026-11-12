---
version: 1
slug: "route-talks"
primary_target: "route:/talks"
related_targets: ["route:/"]
---

# Talks

Status: Complete. Implementation, review, and validation are complete. Final review verdict: ship.

## Purpose

Visitor mode: Experience. Portfolio visitors browse slide decks created by Tri Rizeki Rifandani during his work at a company. They scan titles, descriptions, and creation dates, then open the slides.

## Confirmed decisions

- Add a public `/talks` index and a Talks navigation link. Add a Home Preview Section with up to three recent Talks and an “All talks” link.
- One Talk represents one slide deck. Keep its first creation date when the deck is updated or presented again. Sort all lists by Talk Creation Date, newest first.
- Use a text list with title, description, creation date, and a “View slides” link. Group the index by year. Open the slides in a new tab. Do not add preview images, embedded slides, or local detail pages.
- Keep supplied titles and descriptions unchanged in both Locales. Translate interface strings and format dates for the selected Locale.

## Placement and design

- Place the Home Preview Section after Posts. Place the Talks navigation link between Posts and Gallery.
- Use the existing Site Shell, 64rem SiteContainer, typefaces, colors, spacing, focus treatment, and light and dark themes.
- The first viewport shows the page title, a short introduction, the year, and Agent Readiness with its date and slide link. Titles lead; supporting descriptions and dates remain easy to scan.
- Use the existing Posts year layout: year at the left on large screens and above the list on small screens. Each Talk uses a text block with a clear slide link.
- Preserve the other public sections. Below 768px, the logo and controls use the first header row; navigation uses a separate, centered row with 44px link targets. From 768px, the header is one 56px row with centered navigation.
- Reference: [Anthony Fu’s Talks](https://antfu.me/talks). Apply its title, description, date, and slide-link hierarchy within the current site design.

## First Talk

| Field | Value |
| --- | --- |
| Title | Agent Readiness |
| Description | Making websites and codebases work for AI agents |
| Talk Creation Date | 10 Nov 2026 (`2026-11-10`) |
| Link | https://agent-readiness-steel.vercel.app/ |

## Implementation plan

- Keep the four-field collection in its own Talk feature, using a typed local data module. Use the same collection and sorting rules for Home and `/talks`.
- Render the page on the server. Use the existing metadata and page OG Card helpers. Include Talks in site discovery links and check sitemap inclusion.
- Use flat Translation Keys in the English and Indonesian Message Catalogs. Give the slide link a clear accessible name and indicate that it opens a new tab.
- Show the available entries when there are fewer than three. Give an empty collection a translated message. Keep long titles and descriptions within the content width.
- Check date sorting, the Home preview limit, links, both Locales, keyboard access, and navigation width. Run the required code checks. Inspect desktop and mobile layouts in light and dark themes in the bounded Impeccable review process.

## Documentation

Talk and Talk Creation Date are defined in `apps/web/GLOSSARY.md`. These choices are local and easy to change, so they do not need an ADR. The confirmed direction contract is recorded below. This extension preserves `apps/web/PRODUCT.md`, `apps/web/DESIGN.md`, and `apps/web/.impeccable/design.json`.

## Direction contract

**THESIS:** A dated collection of the author's slides. Each Talk leads with its title and description; a text link opens the deck.

**OWN-WORLD:** Preserve Plain Speech: warm neutral surfaces, rare Helm Teal, Roboto headings, Quicksand prose, and IBM Plex Mono dates. Use open text entries separated by hairlines.

**STORY:** Visitors find Talks in navigation or after Posts on Home, scan the newest work, and open slides in a new tab. Both Locales show the same Talk text.

**FIRST VIEWPORT:** The existing header, a page title and short introduction, then the 2026 year gutter beside Agent Readiness. Its description, creation date, and View slides action are visible together. On mobile, the year sits above the entry and navigation occupies its own header row.

**FORM:** The user confirmed a year-grouped text list based on the reference and existing Posts index. This narrow extension needs no concept seed or image comp. The slide link inherits the site's underline motion and reduced-motion behavior.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Completed implementation

- `/talks` renders through `SiteShell` and the 64rem `SiteContainer`. It uses server components, translated page labels, shared metadata and OG helpers, and a `CollectionPage` with a descending slide list.
- `src/features/talk/data/talks.ts` holds the four Talk fields. `getTalks` sorts by the first creation date before applying the Home limit of three. The index groups the same collection by year. Agent Readiness is the first entry, with the supplied description, date, and link.
- `TalkEntry` is an open text entry with a top hairline, Roboto title, Quicksand description, and IBM Plex Mono date. The date and slide action can wrap. Long text stays within the entry width. The slide action has a 44px target, an external-link arrow, and a hidden accessible suffix with the Talk title and new-tab notice. It uses `target="_blank"` and `rel="noopener noreferrer"`.
- The Home preview follows Posts and links to the full index. The navigation link sits between Posts and Gallery. The route is included in site discovery and the sitemap.
- Both Locales keep the original English Talk title and description. English and Indonesian Message Catalogs supply labels, introductions, empty messages, and new-tab notices. Dates use the selected Locale and UTC to keep the first creation day stable.
- The shared header keeps two rows below 768px and 44px navigation targets. From 768px, its navigation is centered in one 56px row. This resolves the Indonesian header overlap found at 640px.

## Review and validation

- The full finish review found one material issue: Indonesian header overlap at 640px. The header breakpoint fix resolved it. Final verdict: ship; no other material fixes remain.
- Lint, TypeScript checks, feature boundary checks, the production build, and 14 focused unit tests passed.
- The final browser run passed 13 tests. It covered English and Indonesian navigation at 320px, 640px, and 768px; Home placement; original Talk text and localized dates; slide links opening a new tab; metadata; and site discovery.
- The Impeccable detector returned `[]` before the final header breakpoint fix. It was not repeated after that narrow fix. The final browser checks and header captures cover the fix.
- Evidence is under the repository root `.impeccable/review/`: `desktop.png`, `desktop-dark.png`, `mobile.png`, `mobile-dark.png`, `home-desktop.png`, `home-mobile.png`, `home-desktop-talks.png`, `home-mobile-talks.png`, and the `header-en-640.png`, `header-id-640.png`, `header-en-768.png`, and `header-id-768.png` captures.
- `talks-metrics.json` records no horizontal overflow, no header overlap, and no runtime errors in all eight captured scenarios. Slide-link height is 44px, and description text is 16px with 28px line height in both themes.
- No new raster assets ship with this extension. The review screenshots are validation evidence.

## System comparison and limits

The finished surface keeps Plain Speech's warm neutral tokens, rare Helm Teal links, three font roles, shared shell, 64rem column, flat entries, and visible focus treatment. It follows the Preview-Then-Index Rule. The year gutter uses the existing Posts layout: 6rem at the left from 1024px and above the entries below that width, with 48px / 64px group spacing. Descriptions use the established Lead size at all widths.

Global documentation is preserved for this narrow extension. Existing drift remains: `DESIGN.md` still names About / Projects / Blog as the public navigation, and the sidecar still describes a wordmark and three links. Gallery and the logo already existed before this change. The sidecar also calls writing ranked, while the current Posts layout and `DESIGN.md` use dates and year groups. This pass does not promote those stale descriptions into new rules or repair global files. The new header breakpoint and Talks placement are recorded here.

Validation results above are from the completed implementation and review runs. This documentation pass checked source, labels, and saved metrics; it did not repeat those checks or the browser run. It changes only this surface brief.
