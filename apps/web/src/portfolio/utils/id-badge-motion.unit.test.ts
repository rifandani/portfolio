import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { mountBadgeMotion } from "./id-badge-motion";

/** A structural stand-in for a DOM object, carrying only what the module reads. */
interface Stub {
  readonly [key: string]: Stubbed;
}
type Stubbed =
  | undefined
  | string
  | number
  | boolean
  | Stub
  | ((...args: never[]) => void);

// SAFETY: each stub implements every member the module reads from that
// object; a test fails loudly if the module starts reading another one.
const asFake = <T>(stub: Stub): T => stub as T;

/** The `data-*` flags the module sets on the card. */
interface Dataset extends Stub {
  moving?: string;
}

type Listener = (event: PointerEvent) => void;

interface EventInit {
  button?: number;
  pointerId?: number;
  clientX?: number;
  clientY?: number;
  timeStamp?: number;
  pointerType?: string;
  type?: string;
}

const pointer = (init: EventInit = {}) =>
  asFake<PointerEvent>({
    button: 0,
    pointerId: 1,
    clientX: 0,
    clientY: 0,
    timeStamp: 0,
    pointerType: "mouse",
    type: "pointermove",
    ...init,
  });

let clock = 0;
let frames = new Map<number, FrameRequestCallback>();
let nextFrame = 1;

/** Run queued animation frames, 16ms apart, until the loop stops. */
const runFrames = (limit = 5000) => {
  let count = 0;
  while (count < limit) {
    const first = frames.entries().next();
    if (first.done) {
      break;
    }
    const [id, onFrame] = first.value;
    frames.delete(id);
    clock += 16;
    onFrame(clock);
    count += 1;
  }
  return count;
};

const setup = (reduced = false) => {
  const listeners = new Map<string, Listener>();
  let captured = false;
  const stage = {
    addEventListener: (type: string, fn: Listener) => {
      listeners.set(type, fn);
    },
    removeEventListener: vi.fn((type: string) => {
      listeners.delete(type);
    }),
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 300 }),
    setPointerCapture: vi.fn(() => {
      captured = true;
    }),
    hasPointerCapture: vi.fn(() => captured),
    releasePointerCapture: vi.fn(() => {
      captured = false;
    }),
  };
  const dataset: Dataset = {};
  const card = {
    style: { transform: "", setProperty: vi.fn() },
    dataset,
  };
  const swing = { style: { transform: "" } };
  vi.stubGlobal("window", {
    matchMedia: () => ({ matches: reduced }),
    setTimeout: (run: () => void, ms: number) => setTimeout(run, ms),
    clearTimeout: (id: number) => clearTimeout(id),
  });
  const onFaceChange = vi.fn();
  const motion = mountBadgeMotion(
    {
      stage: asFake<HTMLElement>(stage),
      swing: asFake<HTMLElement>(swing),
      card: asFake<HTMLElement>(card),
    },
    onFaceChange
  );
  const fire = (type: string, init?: EventInit) =>
    listeners.get(type)?.(pointer({ type, ...init }));
  return { card, fire, listeners, motion, onFaceChange, stage, swing };
};

beforeEach(() => {
  vi.useFakeTimers();
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
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("mountBadgeMotion", () => {
  it("renders the front face at mount", () => {
    const { card, swing, onFaceChange } = setup();
    expect(card.style.transform).toBe("rotateX(0.000deg) rotateY(0.000deg)");
    expect(swing.style.transform).toBe("rotate(0.000deg)");
    expect(onFaceChange).not.toHaveBeenCalled();
  });

  it("takes one full turn on arrival and comes to rest", () => {
    const { card, onFaceChange } = setup();
    vi.advanceTimersByTime(450);
    expect(card.dataset.moving).toBe("");
    expect(runFrames()).toBeGreaterThan(0);
    expect(onFaceChange).toHaveBeenCalledWith(true);
    expect(onFaceChange).toHaveBeenLastCalledWith(false);
    expect(card.dataset.moving).toBeUndefined();
    expect(card.style.transform).toBe("rotateX(0.000deg) rotateY(0.000deg)");
  });

  it("skips the arrival turn when the visitor flips first", () => {
    const { motion, onFaceChange } = setup();
    motion.flip();
    runFrames();
    expect(onFaceChange).toHaveBeenLastCalledWith(true);
    vi.advanceTimersByTime(450);
    expect(frames.size).toBe(0);
    motion.flip(-1);
    runFrames();
    expect(onFaceChange).toHaveBeenLastCalledWith(false);
  });

  it("does not start a second loop while one runs", () => {
    const { motion } = setup();
    motion.flip();
    motion.flip();
    expect(frames.size).toBe(1);
  });

  it("leans toward a mouse at rest and levels on leave", () => {
    const { card, fire } = setup();
    fire("pointermove", { clientX: 200, clientY: 0 });
    runFrames();
    expect(card.style.transform).toBe("rotateX(5.000deg) rotateY(8.000deg)");
    fire("pointerleave");
    runFrames();
    expect(card.style.transform).toBe("rotateX(0.000deg) rotateY(0.000deg)");
  });

  it("ignores hover and leave from a coarse pointer", () => {
    const { fire } = setup();
    fire("pointermove", { pointerType: "touch", clientX: 200 });
    fire("pointerleave", { pointerType: "touch" });
    expect(frames.size).toBe(0);
  });

  it("flips on a tap without capture", () => {
    const { fire, stage, motion } = setup();
    fire("pointerdown", { button: 1 });
    fire("pointerdown", { clientX: 10 });
    fire("pointermove", { clientX: 12 });
    fire("pointerup", { clientX: 12 });
    expect(stage.setPointerCapture).not.toHaveBeenCalled();
    expect(stage.releasePointerCapture).not.toHaveBeenCalled();
    expect(motion.consumeDragClick()).toBe(false);
  });

  it("spins with a drag and throws to the next face", () => {
    const { card, fire, motion, onFaceChange, stage } = setup();
    fire("pointerdown", { clientX: 0, clientY: 0, timeStamp: 0 });
    fire("pointerdown", { pointerId: 2 });
    fire("pointermove", { pointerId: 2, clientX: 100 });
    fire("pointermove", { clientX: 40, clientY: 10, timeStamp: 100 });
    expect(stage.setPointerCapture).toHaveBeenCalledWith(1);
    runFrames(3);
    expect(card.style.transform).toContain("rotateY(40.");
    fire("pointermove", { clientX: 100, clientY: 500, timeStamp: 1000 });
    fire("pointerleave");
    fire("pointerup", { pointerId: 2, timeStamp: 1050 });
    fire("pointerup", { clientX: 100, timeStamp: 1050 });
    expect(stage.releasePointerCapture).toHaveBeenCalledWith(1);
    runFrames();
    expect(onFaceChange).toHaveBeenLastCalledWith(true);
    expect(motion.consumeDragClick()).toBe(true);
    expect(motion.consumeDragClick()).toBe(false);
  });

  it("throws nothing after the pointer stops, and clears the drag click", () => {
    const { card, fire, motion } = setup();
    fire("pointerdown", { timeStamp: 0 });
    fire("pointermove", { clientX: -30, timeStamp: 10 });
    fire("pointercancel", { clientX: -30, timeStamp: 500 });
    runFrames();
    expect(card.style.transform).toBe("rotateX(0.000deg) rotateY(0.000deg)");
    vi.runOnlyPendingTimers();
    expect(motion.consumeDragClick()).toBe(false);
  });

  it("drops an unmoved press that leaves the stage", () => {
    const { fire, stage } = setup();
    fire("pointerup");
    fire("pointerdown");
    fire("pointerleave", { pointerId: 2, pointerType: "touch" });
    fire("pointerleave");
    fire("pointermove", { clientX: 50 });
    expect(stage.setPointerCapture).not.toHaveBeenCalled();
  });

  it("lands every value in one frame under reduced motion", () => {
    const { card, fire, motion, onFaceChange } = setup(true);
    vi.advanceTimersByTime(1000);
    motion.flip();
    expect(frames.size).toBe(0);
    expect(onFaceChange).toHaveBeenLastCalledWith(true);
    fire("pointermove", { clientX: 200 });
    fire("pointerdown");
    fire("pointermove", { clientX: 20, clientY: 100, timeStamp: 10 });
    expect(card.style.transform).toContain("rotateX(0.000deg)");
    expect(frames.size).toBe(0);
    fire("pointerup", { clientX: 20, timeStamp: 12 });
    expect(frames.size).toBe(0);
  });

  it("removes its listeners on dispose", () => {
    const { listeners, motion } = setup();
    motion.flip();
    motion.dispose();
    expect(listeners.size).toBe(0);
    expect(frames.size).toBe(0);
  });
});
