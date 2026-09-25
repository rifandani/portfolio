import { setTimeout as sleep } from "node:timers/promises";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { mountGlyphEngine } from "./glyph-engine";

/** A structural stand-in for a DOM object, carrying only what the module reads. */
interface Stub {
  readonly [key: string]: Stubbed;
}
type Stubbed = string | number | boolean | Stub | ((...args: never[]) => void);

// SAFETY: each stub implements every member the module reads from that
// object; a test fails loudly if the module starts reading another one.
const asFake = <T>(stub: Stub): T => stub as T;

interface PointerPoint {
  clientX: number;
  clientY: number;
}
type Handler = (arg?: PointerPoint | { isIntersecting: boolean }[]) => void;

let clock = 0;
let frames = new Map<number, FrameRequestCallback>();
let nextFrame = 1;

/** Run queued animation frames `step` ms apart, at most `limit` of them. */
const runFrames = (limit: number, step = 100) => {
  for (let count = 0; count < limit; count += 1) {
    const first = frames.entries().next();
    if (first.done) {
      return;
    }
    const [id, onFrame] = first.value;
    frames.delete(id);
    clock += step;
    onFrame(clock);
  }
};

/** Let the font-load promise chain settle. */
const flush = () => sleep(0);

interface Options {
  reduced?: boolean;
  fine?: boolean;
  context?: boolean;
  fontFails?: boolean;
  size?: number;
  dpr?: number;
  tokens?: Record<string, string>;
}

const setup = ({
  reduced = false,
  fine = true,
  context: hasContext = true,
  fontFails = false,
  size = 340,
  dpr = 2,
  tokens = { "--fg": "ink", "--muted-fg": "quiet", "--primary": "teal" },
}: Options = {}) => {
  const fills: { style: string; glyph: string }[] = [];
  const context = {
    fillStyle: "",
    font: "",
    textAlign: "",
    textBaseline: "",
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    measureText: () => ({ width: 7 }),
    fillText: vi.fn((glyph: string) => {
      fills.push({ style: context.fillStyle, glyph });
    }),
  };
  const box = { left: 0, top: 0, width: size, height: size };
  const canvas = {
    width: 0,
    height: 0,
    getContext: () => (hasContext ? context : null),
    getBoundingClientRect: () => box,
  };
  const windowListeners = new Map<string, Handler>();
  const rootListeners = new Map<string, Handler>();
  const documentListeners = new Map<string, Handler>();
  const observers = new Map<string, Handler>();
  const doc = {
    hidden: false,
    documentElement: {
      addEventListener: (type: string, fn: Handler) => {
        rootListeners.set(type, fn);
      },
      removeEventListener: (type: string) => {
        rootListeners.delete(type);
      },
    },
    addEventListener: (type: string, fn: Handler) => {
      documentListeners.set(type, fn);
    },
    removeEventListener: (type: string) => {
      documentListeners.delete(type);
    },
    fonts: {
      load: () =>
        fontFails ? Promise.reject(new Error("font")) : Promise.resolve([]),
    },
  };
  vi.stubGlobal("document", doc);
  vi.stubGlobal("window", {
    devicePixelRatio: dpr,
    innerWidth: 1000,
    innerHeight: 800,
    matchMedia: (query: string) => ({
      matches: query.includes("reduce") ? reduced : fine,
    }),
    addEventListener: (type: string, fn: Handler) => {
      windowListeners.set(type, fn);
    },
    removeEventListener: (type: string) => {
      windowListeners.delete(type);
    },
  });
  vi.stubGlobal("getComputedStyle", () => ({
    fontFamily: "Plex Mono",
    getPropertyValue: (name: string) => tokens[name] ?? "",
  }));
  const observer = (name: string) =>
    class {
      observing = false;
      constructor(handler: Handler) {
        observers.set(name, handler);
      }
      observe() {
        this.observing = true;
      }
      disconnect() {
        this.observing = false;
        observers.delete(name);
      }
    };
  vi.stubGlobal("ResizeObserver", observer("resize"));
  vi.stubGlobal("IntersectionObserver", observer("intersection"));
  vi.stubGlobal("MutationObserver", observer("mutation"));

  const dispose = mountGlyphEngine(asFake<HTMLCanvasElement>(canvas));
  const move = (clientX: number, clientY: number) =>
    windowListeners.get("pointermove")?.({ clientX, clientY });
  return {
    box,
    canvas,
    context,
    dispose,
    doc,
    documentListeners,
    fills,
    move,
    observers,
    rootListeners,
    windowListeners,
  };
};

beforeEach(() => {
  clock = 0;
  frames = new Map();
  nextFrame = 1;
  vi.stubGlobal("performance", { now: () => clock });
  vi.stubGlobal("requestAnimationFrame", (onFrame: FrameRequestCallback) => {
    const id = nextFrame;
    nextFrame += 1;
    frames.set(id, onFrame);
    return id;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => {
    frames.delete(id);
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("mountGlyphEngine", () => {
  it("returns a no-op teardown without a 2D context", () => {
    const { dispose, observers } = setup({ context: false });
    expect(observers.size).toBe(0);
    expect(() => dispose()).not.toThrow();
  });

  it("sizes the backing store once the font lands", async () => {
    const { canvas, context } = setup();
    expect(canvas.width).toBe(0);
    await flush();
    expect(canvas.width).toBe(680);
    expect(context.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0);
  });

  it("scrambles in, then prints the solid through a whole cycle", async () => {
    const { fills } = setup({ dpr: 0 });
    await flush();
    runFrames(1, 10);
    expect(fills.length).toBe(0);
    runFrames(1);
    expect(fills.some((fill) => fill.style === "quiet")).toBe(true);
    runFrames(130);
    expect(fills.some((fill) => fill.style === "ink")).toBe(true);
    expect(fills.some((fill) => fill.style === "teal")).toBe(true);
  });

  it("falls back to default tokens and follows a theme change", async () => {
    const tokens: Record<string, string> = {};
    const { fills, observers } = setup({ tokens, reduced: true });
    await flush();
    expect(fills.some((fill) => fill.style === "#2a2725")).toBe(true);
    tokens["--fg"] = "night";
    fills.length = 0;
    observers.get("mutation")?.();
    expect(fills.some((fill) => fill.style === "night")).toBe(true);
  });

  it("prints one still frame under reduced motion, and redraws on resize", async () => {
    const { box, fills, observers, windowListeners } = setup({ reduced: true });
    expect(windowListeners.has("pointermove")).toBe(false);
    observers.get("resize")?.();
    expect(fills.length).toBe(0);
    await flush();
    expect(fills.length).toBeGreaterThan(0);
    expect(frames.size).toBe(0);
    box.width = 0;
    fills.length = 0;
    observers.get("resize")?.();
    expect(fills.length).toBe(0);
  });

  it("opens the lens under the pointer and heals it after", async () => {
    const { dispose, fills, move, rootListeners } = setup();
    await flush();
    runFrames(15);
    move(170, 170);
    runFrames(4);
    for (let x = 150; x < 200; x += 10) {
      move(x, 170 + (x % 20));
      runFrames(2);
    }
    move(900, 700);
    runFrames(3);
    move(-900, -700);
    move(170, 170);
    runFrames(3);
    rootListeners.get("pointerleave")?.();
    runFrames(12);
    expect(fills.length).toBeGreaterThan(0);
    dispose();
    expect(rootListeners.size).toBe(0);
  });

  it("pauses off screen and in a hidden tab", async () => {
    const { doc, documentListeners, observers } = setup();
    await flush();
    expect(frames.size).toBe(1);
    const [stale] = frames.values();
    observers.get("intersection")?.([{ isIntersecting: false }]);
    expect(frames.size).toBe(0);
    stale?.(clock + 50);
    expect(frames.size).toBe(0);
    observers.get("intersection")?.([]);
    expect(frames.size).toBe(1);
    observers.get("intersection")?.([]);
    expect(frames.size).toBe(1);
    doc.hidden = true;
    documentListeners.get("visibilitychange")?.();
    expect(frames.size).toBe(0);
  });

  it("skips a frame that comes too soon", async () => {
    const { fills } = setup();
    await flush();
    runFrames(1);
    const printed = fills.length;
    runFrames(1, 5);
    expect(fills.length).toBe(printed);
  });

  it("still renders when the font fails to load", async () => {
    const { canvas } = setup({ fontFails: true, fine: false });
    await flush();
    expect(canvas.width).toBe(680);
  });

  it("does not start when disposed before the font lands", async () => {
    const { canvas, dispose } = setup();
    dispose();
    await flush();
    expect(canvas.width).toBe(0);
    expect(frames.size).toBe(0);
  });
});
