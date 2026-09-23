# @workspace/web

## 🔧 Fixme

~

## 🎯 Todo

- https://www.aihero.dev/sitemap.md
- https://www.aihero.dev/llms.txt
- https://www.aihero.dev/rss.xml

## Testing

**CI limitation**: We can’t run E2E in CI yet because auth must be mocked on the server (RSC/server actions), and `next.onFetch` (Next experimental test mode) only intercepts external `fetch`, not relative URLs handled by Next route handlers. So tests run locally with a local DB.
