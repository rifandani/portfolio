# @workspace/web

## 🔧 Fixme

~

## 🎯 Todo

- put hackathon 2023 as projects
- project detail should have demo url, and github url
- add tech stack in about page
- improve on "what i bring" section in about page, should be in general terms, impact based perspective
- add filter or search in posts using URL search params

## Testing

**CI limitation**: We can’t run E2E in CI yet because auth must be mocked on the server (RSC/server actions), and `next.onFetch` (Next experimental test mode) only intercepts external `fetch`, not relative URLs handled by Next route handlers. So tests run locally with a local DB.
