# Logging

The app uses evlog for structured logs. Events write to the server or browser
console by default.

- Server modules: use `log`, `useLogger`, or `withEvlog` from
  `@/core/utils/evlog`.
- Browser modules: use `log` from `evlog/next/client`. The app provider sends
  browser logs to `/api/evlog/ingest`, where evlog writes them to the server
  console.
