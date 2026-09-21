# DAST scans a locally served build, with a deployed-URL override

The OWASP ZAP baseline scan in `.github/workflows/dast.yml` builds `apps/web`,
serves it with `next start` on the runner, and scans that. Setting the
`WEB_TARGET_URL` repository variable (or passing `target_url`) points it at a
deployment instead. It fails on **Medium** rather than High, and there is no
active-scan plan in this repository.

> Adapted from the frontend monorepo's `f98c5fd`, which reached the *opposite*
> default for the same reason. That repo's `apps/spa` is a static bundle whose
> security headers come from hosting configuration, so serving it in the runner
> would have produced findings about a server we do not ship. Here the headers
> come from `apps/web/src/proxy.ts`, which is in this repository and versioned
> with the code — so the served build emits the real ones and the hermetic run
> is the honest one. Three of that ADR's four decisions invert on that single
> fact; the fourth (Medium, not High) survives for a different reason.

## Vocabulary

> **Baseline scan** — a passive ZAP run. It requests URLs and inspects the
> responses. It submits no forms and runs no attack payloads, so it is safe to
> point at a live environment.
>
> **Active scan** — an attacking ZAP run: injection, traversal, and XSS payloads
> against discovered inputs. Safe only against a target you own and intend to
> have attacked.
>
> **Plan** — a ZAP Automation Framework YAML file. It carries the target, the
> scope, the jobs, the reports, and the exit threshold, so one file is the whole
> scan and the same file runs locally and in CI.

## Why build and serve in the runner

`apps/web` is a Next.js server. Its response headers are set by
`@nosecone/next` in `apps/web/src/proxy.ts`, and `next start` runs that
middleware exactly as a deployment does. So the artefact under test is the
artefact we ship, and the scan reports on the commit that triggered it rather
than on whatever happens to be deployed at the time.

Two things follow that a deployed-URL default would not give:

- **The workflow works on day one.** There is no repository variable to set
  first, so there is no window in which the job skips and the absence of
  scanning is invisible.
- **A header fix is verifiable before it merges.** Change `proxy.ts`, push, read
  the scan. That loop is the main thing DAST is for here, and it is exactly the
  loop the frontend monorepo had to give up.

What it does **not** cover is the hosting layer — anything the platform injects,
rewrites, or strips in front of the app. That is what the `target_url` override
and the `WEB_TARGET_URL` variable are for. Both paths run the same plan file.

## Why Medium and not High

A passive baseline reads responses; it does not attack. So the server-side logic
this app genuinely has — route handlers, server components — is not what this
scan reports on, and the things it *does* report on land at Medium.

One of them is known: `proxy.ts` sets `contentSecurityPolicy: false`, with a
comment explaining that iconify and `next-themes` depend on it being off.
"Content Security Policy (CSP) Header Not Set" is a Medium. A High threshold
would be green in the face of that, which reads as assurance it does not
provide. `warnExitValue: 0` keeps Lows reportable without failing the run.

The first expected red run is therefore a real finding, not a misconfiguration.
Fix the CSP or file a dated, URL-scoped, reasoned `alertFilter` entry — the same
shape as the timed entries in the SCA allowlist. Do not raise the threshold.

## Why there is no active scan

Not because it would be illegitimate. This is a fullstack app: we own
`/api/health`, `/api/og`, and `/api/evlog/ingest`, and the ephemeral server the
baseline already stands up is a target we may attack freely. That is a real
difference from the frontend monorepo, where an active scan would have meant
attacking a host belonging to another repository.

It is deferred on cost. An active plan is a twenty-minute run and a triage
surface of its own, and folding it into the change that introduces DAST at all
would have made both harder to review. The place it goes when it happens is a
second file, `.github/security/zap/web-active.yaml`, pointed only at the local
server and never at a `target_url`.

## Consequences

- **Every push to `main` builds the app twice** — once in `ci.yml`, once here.
  Accepted: sharing an artefact between workflows costs more coordination than
  the four minutes it saves.
- **The local runner cannot verify a hosting-layer fix.** `bun zap:web:serve` is
  the same `next start`, so it reproduces the app and its middleware but not the
  platform in front of it. Run the scan against the deployment for that.
- **Routes are enumerated by hand.** The plan carries explicit seed paths and the
  spider goes five minutes deep from them. A new route is not necessarily
  invisible — the app server-renders, so a linked page is discoverable — but an
  unlinked one is, until someone adds it to
  `.github/security/zap/web-baseline.yaml`.
- **`/api` findings will look worse than page findings.** The `proxy.ts` matcher
  excludes `api`, so route handlers carry none of the security headers the page
  routes get. That is the existing behaviour, now visible.

## Considered Options

**Default to a deployed URL, as the frontend monorepo does.** Rejected on the
premise, not the mechanism: the argument there is that a preview server's
headers are a lie, and that argument is false for a Next.js app whose headers
ship in `proxy.ts`. Kept as an override because the hosting layer is still
unscanned without it.

**Seed the crawl from `apps/web/src/app/sitemap.ts`.** Tempting, and closer to
viable than in the frontend monorepo — this sitemap is a route, generated per
request, not a file with a domain baked in at generation time. Rejected anyway:
it would make the scan's scope a runtime value, so a bug that emptied the
sitemap would silently empty the scan and report green.

**Enable ZAP's `ajaxSpider`.** Rejected on cost rather than safety, which is
itself the inversion — in the frontend monorepo not executing the app's
JavaScript was a containment control protecting a third-party backend. Here
there is nothing to contain, and the app server-renders, so the plain spider
already sees real markup. Ten-plus extra minutes for the client-side
transitions is not yet worth it.

**Run on pull requests.** Rejected. A build-and-scan is several minutes, `main`
has no branch protection, and `e2e.yml` already established that this class of
signal is information rather than a gate. Push-to-`main` plus weekly plus manual
covers it.

**`zaproxy/action-baseline` instead of `zaproxy/action-af`.** The baseline
action brings `.zap/rules.tsv` for suppression, which is simpler than the
in-plan `alertFilter`. It costs local/CI parity: the action's inputs are not a
file you can run on a laptop. One plan file that both paths execute was worth
more than a simpler suppression format.
