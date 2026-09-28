# @workspace/web

## End-to-end tests

Playwright E2E tests run in `ci.yml` for pull requests and pushes to `main`, and can also run manually from the Actions tab. A test failure fails the CI workflow. The public site uses file-backed content and has no session or database setup for these tests. Playwright builds and serves the app with the example environment file before it runs the suite.
