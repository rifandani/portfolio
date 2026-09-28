import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

/** Fields an enricher stamps onto the event it is handed. */
type EvlogEventFields = Record<string, boolean | number | string | undefined>;
interface EvlogContext {
  event: EvlogEventFields;
}
interface EvlogConfig {
  enrich: (ctx: EvlogContext) => void;
}

const mocks = vi.hoisted(() => {
  const createError = vi.fn();
  const log = { error: vi.fn(), info: vi.fn() };
  // Typed on the one field the enrichment test reads back, so the recorded call
  // needs no cast.
  const createEvlog = vi.fn((_config: EvlogConfig) => ({
    withEvlog: vi.fn(),
    useLogger: vi.fn(),
    createError,
    log,
  }));
  const evlogRegister = vi.fn(async () => {});
  const evlogOnRequestError = vi.fn(async () => {});
  return {
    createError,
    log,
    createEvlog,
    createInstrumentation: vi.fn(() => ({
      register: evlogRegister,
      onRequestError: evlogOnRequestError,
    })),
    evlogRegister,
    evlogOnRequestError,
    userAgentEnricher: vi.fn(),
    requestSizeEnricher: vi.fn(),
  };
});

vi.mock("@/core/constants/global", () => ({
  SERVICE_NAME: "web-test",
}));

vi.mock("evlog/enrichers", () => ({
  createUserAgentEnricher: () => mocks.userAgentEnricher,
  createRequestSizeEnricher: () => mocks.requestSizeEnricher,
}));

vi.mock("evlog/next", () => ({
  createEvlog: mocks.createEvlog,
}));

vi.mock("evlog/next/instrumentation/create", () => ({
  createInstrumentation: mocks.createInstrumentation,
}));

const loadSut = () => import("./evlog");

describe("evlog wiring", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("exposes createError and log from createEvlog", async () => {
    const sut = await loadSut();

    expect(mocks.createEvlog).toHaveBeenCalledWith(
      expect.objectContaining({
        service: "web-test",
      })
    );
    expect(sut.createError).toBe(mocks.createError);
    expect(sut.log).toBe(mocks.log);
  });

  it("registers instrumentation to capture output and log to the console", async () => {
    await loadSut();

    expect(mocks.createInstrumentation).toHaveBeenCalledWith({
      captureOutput: true,
      service: "web-test",
    });
  });

  it("enrich runs every enricher and stamps deployment metadata", async () => {
    vi.stubEnv("VERCEL_DEPLOYMENT_ID", "dpl_1");
    vi.stubEnv("VERCEL_REGION", "sfo1");
    await loadSut();

    const config = mocks.createEvlog.mock.calls[0]?.[0];
    const ctx: EvlogContext = { event: {} };
    config?.enrich(ctx);

    expect(mocks.userAgentEnricher).toHaveBeenCalledWith(ctx);
    expect(mocks.requestSizeEnricher).toHaveBeenCalledWith(ctx);
    expect(ctx.event.deploymentId).toBe("dpl_1");
    expect(ctx.event.region).toBe("sfo1");
  });

  it("registers evlog instrumentation", async () => {
    const sut = await loadSut();
    await sut.register();
    expect(mocks.evlogRegister).toHaveBeenCalled();
  });

  it("onRequestError delegates to evlog handler", async () => {
    const sut = await loadSut();
    const error = Object.assign(new Error("x"), { digest: "d1" });
    const request = { path: "/", method: "GET", headers: {} };
    const context = {
      routerKind: "AppRouter",
      routePath: "/",
      routeType: "render",
      renderSource: "react-server-components",
    };

    await sut.onRequestError(error, request, context);

    expect(mocks.evlogOnRequestError).toHaveBeenCalledWith(
      error,
      request,
      context
    );
  });
});
