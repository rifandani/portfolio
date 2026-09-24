# @workspace/web

## 🔧 Fixme

~

## 🎯 Todo

- update website logo
- use real CV
- put hackathon 2023 as projects
- add tech stack in about page
- add filter or search in posts using URL search params

## Testing

**CI limitation**: We can’t run E2E in CI yet because auth must be mocked on the server (RSC/server actions), and `next.onFetch` (Next experimental test mode) only intercepts external `fetch`, not relative URLs handled by Next route handlers. So tests run locally with a local DB.
