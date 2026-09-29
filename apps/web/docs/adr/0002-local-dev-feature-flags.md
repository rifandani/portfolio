# Local DEV Feature Flags via TanStack Devtools (web)

Web gates internal surfaces behind local Feature Flags — not remote config. Flags use their registry default outside development; development overrides persist in the browser under `web-feature-flags` and are toggled from a Feature Flags panel mounted only in development (and never during E2E). The Master Design default is ON in every environment for now. The `/master-design` route uses a client gate that renders a recoverable 404 UI when the flag is off (not Next.js `notFound()`, which unmounts the gate and cannot recover via `router.refresh()`), using a zustand/localStorage-shaped model rather than a cookie/RSC gate.

## Considered Options

- Cookie + RSC `notFound()` so the server can see overrides — rejected for this port; diverges from the zustand/localStorage store and adds sync complexity
- Mount the Feature Flags panel whenever TanStack Devtools mounts (including non-DEV) — rejected; flags are a DEV product
