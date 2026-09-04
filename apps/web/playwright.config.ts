import { defineConfig, devices } from "@playwright/test";

/**
 * http://localhost:3002
 * http://127.0.0.1:3002
 */
const port = process.env.CI ? 3000 : 3002;
const baseURL = `http://localhost:${port}`;
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  // Timeout for each test in milliseconds.
  timeout: 20 * 1000,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  outputDir: "playwright-test-results",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    /* Reduce animation motion from frammer motion. See https://motion.dev/docs/react-accessibility */
    contextOptions: {
      reducedMotion: "reduce",
    },
  },
  /* Capture git info in trace viewer and report */
  captureGitInfo: { commit: true, diff: true },
  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    // when we add more projects, make sure we also change `test:install` script
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
  ],
  /* Run your local dev server before starting the tests */
  webServer: {
    timeout: 5 * 60 * 1000, // default is 60s
    // Keeps TanStack Devtools and Agentation unmounted during E2E runs
    env: { NEXT_PUBLIC_E2E: "true" },
    url: baseURL,
    // in CI, we run `build-and-preview` instead of `dev`
    command: process.env.CI ? "bun build-and-preview" : "bun dev",
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
  },
});
