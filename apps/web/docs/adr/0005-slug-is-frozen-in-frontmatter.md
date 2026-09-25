# The Slug is frozen in frontmatter

Date: 2026-09-23

## Status

Accepted.

---

The Slug is the URL-friendly form of the title at the time the Post is first written, and the Post Detail lives at `/posts/{slug}`. We store it in the Post Source frontmatter as `slug:`. We do not calculate it from the title on each build. A URL is a public contract: if each build calculated the Slug, a small title edit would send old links and search results to a 404.

## Rules

- The URL-friendly form: lowercase, remove diacritics (NFKD), change each run of non-alphanumeric characters to one `-`, and remove `-` at the two ends.
- The build fails when a Post Source has no `slug`, when the `slug` is not in that form, or when two Posts have the same `slug`.
- A title edit does not change the `slug`.

## Considered Options

- **Calculate the Slug from the title on each build** — rejected. A title edit breaks the URL.
- **Calculate it each build and keep old slugs as 308 redirects** — rejected. It adds a redirect list that each title edit must update, and a frozen Slug makes it unnecessary.
