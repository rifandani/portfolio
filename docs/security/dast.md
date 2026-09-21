# DAST with OWASP ZAP

Dynamic application security testing for `apps/web`.
One Automation Framework plan drives both the laptop and CI, so there is nothing to keep in step.

## Reference

| What | Where |
| --- | --- |
| Plan | `.github/security/zap/web-baseline.yaml` |
| Local runner | `scripts/security/zap.ts` |
| Workflow | `.github/workflows/dast.yml` |
| Reports | `.zap-reports/` (gitignored, rebuilt on demand) |
| Decision record | [ADR-0005](../adr/0005-dast-scans-a-locally-served-build.md) |

| Command | Does |
| --- | --- |
| `bun zap:web:serve` | Builds `apps/web` and serves it with `next start` on `:4100` |
| `ZAP_TARGET=… bun zap:web` | Runs the baseline plan against `ZAP_TARGET` |

| Variable | Default | Meaning |
| --- | --- | --- |
| `ZAP_TARGET` | *none — required* | Origin to scan. No default: a scan reaches whatever it is pointed at, so pointing it is always deliberate. |
| `ZAP_IMAGE` | `ghcr.io/zaproxy/zaproxy:stable` | Container image |
| `WEB_TARGET_URL` | *unset* | GitHub Actions **variable** (not a secret). When set, CI scans that deployment instead of a build on the runner. |

## Run a scan locally

```sh
# terminal 1
bun zap:web:serve

# terminal 2
ZAP_TARGET=http://web.portfolio.localhost:4100 bun zap:web
```

Open `.zap-reports/web-baseline.html` for the readable report.
Or `.zap-reports/web-baseline.sarif.json` is the same findings in the format CI uploads to code scanning.

`bun zap:web:serve` overrides `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_API_BASE_URL` to the `:4100` origin, because those are baked in at build time and a build advertising a different origin emits absolute links the spider then discards as out of context.

## Run a scan in CI

It runs by itself on every push to `main` and weekly. Both build `apps/web` and scan the build.

To scan a deployment by hand instead:

```sh
gh workflow run dast.yml -f target_url=https://your-deployment.example.com
```

Set `WEB_TARGET_URL` under **Settings → Secrets and variables → Actions → Variables** to make every run scan that deployment rather than a local build.
Do that deliberately: it trades a result about the pushed commit for a result about the hosting layer.

## What the scan does and does not cover

[ADR-0005](../adr/0005-dast-scans-a-locally-served-build.md) argues all of this in full. In short:

- **Passive only.** The spider requests the seeded URLs, submits no forms, and the active scanner never runs.
- **No active scan yet.** Unlike a frontend-only repository we *do* own everything here, so an active plan is legitimate — it is deferred on triage cost, and would go in a second plan file pointed only at the local server.
- **`/api` is in scope.** `apps/web/src/proxy.ts` has a matcher that excludes `api`, so route handlers carry none of the security headers the page routes get. Expect findings there; they are real.
- **The hosting layer is not covered by default.** Whatever the platform injects or strips in front of the app is only visible in a `target_url` run.
- **The crawl is seeded by hand.** The app server-renders, so linked pages are discoverable, but an unlinked route stays invisible until it is added to `.github/security/zap/web-baseline.yaml`.

## Triage a finding

1. Open `.zap-reports/web-baseline.html` and find the alert.
2. Most findings will be **response headers**. For page routes, the fix is `apps/web/src/proxy.ts` (`@nosecone/next`). For `/api/*`, note that the `proxy.ts` matcher excludes them — extending the matcher is the fix, not a per-route header.
3. Re-run the scan.

**The first red run is expected and is a real finding.** `proxy.ts` sets `contentSecurityPolicy: false` (iconify and `next-themes` depend on it being off), so ZAP reports "Content Security Policy (CSP) Header Not Set" at Medium. Fix it or suppress it with a reason — do not raise the threshold.

## Suppress a finding

Only after triage, and never globally.
Add a dated, reasoned, URL-scoped entry to the `alertFilter` job in `.github/security/zap/web-baseline.yaml`, the same shape as the timed entries in the SCA allowlist:

```yaml
    alertFilters:
      # 2026-09-21 — <why this is not a real finding here>
      - ruleId: 10038
        ruleName: "Content Security Policy (CSP) Header Not Set"
        newRisk: "False Positive"
        url: ".*/some/specific/path.*"
        urlRegex: true
```

An entry without a `ruleName`, a date, a reason, and a URL scope is a bug.

## Change the failure threshold

The `exitStatus` job at the end of the plan.
It is set to `errorLevel: Medium`, not `High`, on purpose: a passive baseline does not attack, so it does not produce the Highs that server-side logic could — a High threshold here is a gate that cannot fire.
`warnExitValue: 0` keeps Lows reportable without failing the run.

## Troubleshoot

| Symptom | Cause |
| --- | --- |
| `exec format error` | arm64 image; the runner should already force `--platform linux/amd64` |
| `ZAP_TARGET points at localhost` | Inside the container `localhost` is the container. Use `web.portfolio.localhost`. |
| Scan finds zero URLs | `ZAP_TARGET` does not match the context scope, or the app is not actually serving |
| Permission denied writing reports | ZAP runs as uid 1000; the runner `chmod 0777`s `.zap-reports/` — check it was created |
| CI job fails at "Serve" | The build started but `/api/health` never answered within 60s — read the build step's output |
