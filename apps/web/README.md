# @workspace/web

## 🔧 Fixme

~

## 🎯 Todo

- use real CV, and remove cv placeholders
- make sure projects and posts are seo, jsonld, og cards-friendly
- install skills for writing that doesnt sounds like AI-generated, and use simple english
- add filter or search in posts using URL search params after we have some real contents
- find out about observability in vercel, should we remove opentelemetry?
- use other vercel products

### New project ideas

1. this project (also act as nextjs monorepo boilerplate)
2. "fe-monorepo", "be-monorepo" boilerplate
3. hackathon 2023
4. kings and legends remake with threejs (need a lot of tokens)
5. our own AI personal assistant

### New post ideas

1. AI governance and compliance in my company recently every repo needs to integrate our internal AI Engineering Operations Platform as bot webhook, every MR needs to have "Engineer Checklist" that needs to be checked by the MR author like "I understand the business context and implemented correctly", "I have tested my changes thoroughly and verified functionality", and "I have considered impact on existing systems and users", if it doesn't get checked even 1, after the MR gets merged, there will be code assessments that's being recorded and it will mark us as non-compliant engineer which i guess will give us a minus point to the executive here. recently we also have another new compliance checker, but this time it's deterministic as a gitlab pipeline which will automatically opens up a bot thread in the MR which again we will need to fill it before it can be merged. This time we need to fill in the test evidence, and the impact that the MR will have. This new compliance checker is doing more for audit trail, so that every engineer has accountability for everything that they're shipping in this era of AI.
2. create new template repo for "teaching new concept" which includes "teach", "generate videos" skills, interactive html artifact, videos with hyperframes (ex. teaching effect.ts)

## Testing

**CI limitation**: We can’t run E2E in CI yet because auth must be mocked on the server (RSC/server actions), and `next.onFetch` (Next experimental test mode) only intercepts external `fetch`, not relative URLs handled by Next route handlers. So tests run locally with a local DB.
