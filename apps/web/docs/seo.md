# Metadata: SEO (Search Engine Optimization)

Use `createMetadata` or `JsonLd` component to generate metadata for each page at runtime in server.

```tsx
import { JsonLd } from '@/core/utils/seo'

export const metadata = createMetadata({
  title,
  description,
})

const ldParams = {
  url: process.env.NODE_ENV === 'production' ? PROD_APP_URL : DEV_APP_URL,
  title,
  description,
}

function Page() {
  return (
    <JsonLd
      graphs={[
        createWebSite(ldParams),
        createWebPage(ldParams),
      ]}
    />
  )
}
```

## Open Graph & Twitter Images

To generate OG images dynamically, hit the `GET /api/og?title=My%20Title` route.

## `sitemap.xml` and `sitemap.md`

Both sitemaps list the same URLs, from the same two sources:

`GET /sitemap.xml` (`src/app/sitemap.ts`) is for crawlers. Only Post entries have `lastModified` (the Post's `publishedAt`). Pages have no real date, and a build-time date changes on each deploy.

`GET /sitemap.md` (`src/app/sitemap.md/route.ts`) is the same list as Markdown, for readers and agents. Each Post entry also links to its Post Markdown. `sitemap-markdown.ts` writes the text (unit-tested).

## `llms.txt`

`GET /llms.txt` gives agents a short Markdown index of the site, in the [llms.txt](https://llmstxt.org/) format: the name, a summary, and link lists for Pages, Posts, Projects, and Optional. Post links go to the Post Markdown (`/posts/<slug>.md`).

## RSS feed

`GET /rss.xml` gives feed readers an [RSS 2.0](https://www.rssboard.org/rss-specification) feed of every Post, newest first: the title, the Post Detail link, the date, and the summary. `lastBuildDate` is the date of the newest Post, not the build time. Every page names the feed in a `<link rel="alternate" type="application/rss+xml">` tag (from `createMetadata` in `src/core/utils/seo.tsx`).
