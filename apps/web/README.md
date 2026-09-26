# @workspace/web

## 🔧 Fixme

~

## 🎯 Todo

- use real CV, and remove cv placeholders
- add filter or search in posts using URL search params after we have some real contents
- find out about observability in vercel, should we remove opentelemetry?
- use other vercel products

### New project ideas

1. this project (also act as nextjs monorepo boilerplate)
2. "fe-monorepo", "be-monorepo" boilerplate
3. hackathon 2023
4. kings and legends remake with threejs (need a lot of tokens)
5. our own AI personal assistant using mastra

### New post ideas

1. create new template repo for "teaching new concept" which includes "teach", "generate videos" skills, interactive html artifact, videos with hyperframes (ex. teaching effect.ts)

## Testing

**CI limitation**: We can’t run E2E in CI yet because auth must be mocked on the server (RSC/server actions), and `next.onFetch` (Next experimental test mode) only intercepts external `fetch`, not relative URLs handled by Next route handlers. So tests run locally with a local DB.
