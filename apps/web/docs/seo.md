# Metadata: SEO (Search Engine Optimization)

Each page sets its head tags with `createMetadata` and its structured data with `JsonLd` (both in `src/core/utils/seo.tsx`).

## JSON-LD

Every Public Site page puts the same two site nodes in its graph, with stable ids, so a crawler joins them across pages:

| Node | `@id` | Notes |
| --- | --- | --- |
| `WebSite` | `{APP_URL}/#website` | `publisher` is the Person |
| `Person` | `{APP_URL}/#person` | `url` is `/about`; `sameAs` is the GitHub, LinkedIn, and X profiles |

Each page then adds its own node. The builders live in the module that owns the entity, and each one has unit tests:

| Page | Node | Builder |
| --- | --- | --- |
| Home | `WebPage` | `createWebPage` (`core/utils/seo.tsx`) |
| `/posts` | `Blog` with a `blogPost` entry per Post | `createBlog` (`post/utils/post-ld.ts`) |
| Post Detail | `BlogPosting` and `BreadcrumbList` | `createBlogPosting`, `createBreadcrumbList` |
| `/projects` | `CollectionPage` with an `ItemList` in Project Order | `createProjectCollection` (`project/utils/project-ld.ts`) |
| Project Detail | `CreativeWork` and `BreadcrumbList` | `createProjectCreativeWork`, `createBreadcrumbList` |

The `image` of a `BlogPosting` or a `CreativeWork` is its OG Card (a PNG), not its Preview Image (an SVG, which Google does not read). A Project is a `CreativeWork`, not a `SoftwareApplication`: Google wants ratings or offers for that type. Each Post and Project has one language (`CONTENT_LANGUAGE`), so `inLanguage` and `og:locale` do not change with the Locale. A Post Source can give an `updatedAt`; without it, `dateModified` is the `publishedAt`.

## Open Graph & Twitter Images


| Card | Query | Shows |
| --- | --- | --- |
| Page (default) | `?title=…&description=…` | The title and the description, beside the Glyph Engine still |
| Post | `?post=<slug>` | The Date Stamp, the title, the summary, and the reading ruler |
| Project | `?project=<slug>` | The Drawing Sheet: the preview in registration marks, the sheet number, the title, and the description |

The fonts are static TTF files in `src/app/api/og/fonts/`, because Satori cannot use `next/font`.

## `sitemap.xml` and `sitemap.md`

Both sitemaps list the same URLs, from the same two sources:

`GET /sitemap.xml` (`src/app/sitemap.ts`) is for crawlers. Only Post entries have `lastModified` (the Post's `updatedAt`, which is its `publishedAt` when the Post Source gives no `updatedAt`). Pages have no real date, and a build-time date changes on each deploy.

`GET /sitemap.md` (`src/app/sitemap.md/route.ts`) is the same list as Markdown, for readers and agents. Each Post entry also links to its Post Markdown. `sitemap-markdown.ts` writes the text (unit-tested).

## `llms.txt`

`GET /llms.txt` gives agents a short Markdown index of the site, in the [llms.txt](https://llmstxt.org/) format: the name, a summary, and link lists for Pages, Posts, Projects, and Optional. Post links go to the Post Markdown (`/posts/<slug>.md`).

## RSS feed

`GET /rss.xml` gives feed readers an [RSS 2.0](https://www.rssboard.org/rss-specification) feed of every Post, newest first: the title, the Post Detail link, the date, and the summary. `lastBuildDate` is the date of the newest Post, not the build time. Every page names the feed in a `<link rel="alternate" type="application/rss+xml">` tag (from `createMetadata` in `src/core/utils/seo.tsx`).
