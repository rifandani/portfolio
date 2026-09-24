# @workspace/web

## 🔧 Fixme

~

## 🎯 Todo

- update website logo
- use real CV
- put hackathon 2023 as projects
- og cards
- add real contents in both projects and posts
- add filter or search in posts using URL search params after we have some real contents

## Testing

**CI limitation**: We can’t run E2E in CI yet because auth must be mocked on the server (RSC/server actions), and `next.onFetch` (Next experimental test mode) only intercepts external `fetch`, not relative URLs handled by Next route handlers. So tests run locally with a local DB.
