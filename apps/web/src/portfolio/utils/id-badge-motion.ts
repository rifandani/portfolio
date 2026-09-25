/**
 * Motion for the About page's ID badge: a card on a lanyard that the visitor
 * can drag to spin, tap to flip, and nudge with a fine pointer.
 *
 * Everything is written straight to the nodes' `style`, as in `lit-card`: a
 * React render per frame would cost more than the effect. The loop runs only
 * while something moves and stops when every spring has settled, so the badge
 * adds no ambient motion to the page (The One-Moment Rule) — after the one turn
 * it takes on arrival, it moves only when the visitor moves it.
 *
 * Four springs:
 *
 * - `spin` — the Y rotation. A drag sets it directly; on release the spring
 *   carries the throw and settles on the face the throw was heading for.
 * - `tilt` — the X rotation: the vertical drag, or the fine pointer's height
 *   over the card, eased back to level.
 * - `lean` — a small Y offset toward a fine pointer at rest on the card.
 * - `swing` — the lanyard's pendulum, under-damped, kicked by the drag speed
 *   and by a flip.
 */

interface Spring {
  x: number;
  v: number;
  target: number;
  k: number;
  c: number;
}

/** A spring with stiffness `k` and damping ratio `zeta`. */
const spring = (k: number, zeta: number): Spring => ({
  x: 0,
  v: 0,
  target: 0,
  k,
  c: 2 * Math.sqrt(k) * zeta,
});

/** Semi-implicit Euler: stable at 30–144 fps for these stiffnesses. */
const step = (s: Spring, dt: number) => {
  s.v += (-s.k * (s.x - s.target) - s.c * s.v) * dt;
  s.x += s.v * dt;
};

const isAtRest = (s: Spring, epsilon = 0.05) =>
  Math.abs(s.x - s.target) < epsilon && Math.abs(s.v) < epsilon;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/** The nearest whole face, in degrees: 0 is the front, ±180 the back. */
const nearestFace = (degrees: number) => Math.round(degrees / 180) * 180;

/** A drag shorter than this is a tap, and the button's click flips the card. */
const TAP_SLOP_PX = 5;
/** A drag across the whole card turns it this far. */
const DEGREES_PER_CARD_WIDTH = 200;
/** How far ahead a throw is projected when it picks the face to land on. */
const THROW_LOOKAHEAD_S = 0.2;
const MAX_THROW_DEG_PER_S = 1600;
const ARRIVAL_DELAY_MS = 450;

export interface BadgeMotionNodes {
  /** The element the pointer is read from — the card's hit area. */
  stage: HTMLElement;
  /** The lanyard assembly, which swings about the top of the strap. */
  swing: HTMLElement;
  /** The card, which spins, tilts, and carries the light variables. */
  card: HTMLElement;
}

export interface BadgeMotion {
  /** Turn to the other face. `direction` picks the way round. */
  flip: (direction?: 1 | -1) => void;
  /** True for the click that ends a drag, which must not also flip. */
  consumeDragClick: () => boolean;
  dispose: () => void;
}

export const mountBadgeMotion = (
  { stage, swing, card }: BadgeMotionNodes,
  onFaceChange: (showingBack: boolean) => void
): BadgeMotion => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const spin = spring(55, 0.78);
  const tilt = spring(90, 0.8);
  const lean = spring(90, 0.8);
  const swingSpring = spring(38, 0.22);

  let frame = 0;
  let lastTime = 0;
  let showingBack = false;
  let touched = false;
  let dragClick = false;

  interface Drag {
    pointerId: number;
    startX: number;
    startY: number;
    startAngle: number;
    degreesPerPx: number;
    moved: boolean;
    lastX: number;
    lastAngle: number;
    lastTime: number;
    velocity: number;
  }
  let drag: Drag | null = null;

  const render = () => {
    const yaw = spin.x + lean.x;
    card.style.transform = `rotateX(${tilt.x.toFixed(3)}deg) rotateY(${yaw.toFixed(3)}deg)`;
    swing.style.transform = `rotate(${swingSpring.x.toFixed(3)}deg)`;

    // The light: signed for where the gloss sits, unsigned for how far the
    // face has turned from the viewer — it shades as it goes edge-on.
    const sine = Math.sin(toRadians(yaw));
    card.style.setProperty("--badge-light", sine.toFixed(4));
    card.style.setProperty("--badge-turn", Math.abs(sine).toFixed(4));

    const back = Math.cos(toRadians(yaw)) < 0;
    if (back !== showingBack) {
      showingBack = back;
      onFaceChange(back);
    }
  };

  const settle = () => {
    // Keep the angle bounded without a visible jump: a whole turn draws the same.
    const turns = Math.round(spin.target / 360) * 360;
    spin.target -= turns;
    spin.x -= turns;
  };

  const tick = (time: number) => {
    const dt = Math.min((time - lastTime) / 1000, 1 / 30);
    lastTime = time;

    if (!drag?.moved) {
      step(spin, dt);
    }
    step(tilt, dt);
    step(lean, dt);
    step(swingSpring, dt);
    render();

    const resting =
      !drag &&
      isAtRest(spin) &&
      isAtRest(tilt) &&
      isAtRest(lean) &&
      isAtRest(swingSpring);

    if (resting) {
      for (const s of [spin, tilt, lean, swingSpring]) {
        s.x = s.target;
        s.v = 0;
      }
      settle();
      render();
      delete card.dataset.moving;
      frame = 0;
      return;
    }
    frame = requestAnimationFrame(tick);
  };

  const wake = () => {
    if (reducedMotion) {
      // No travel: every value lands where it is going, in one frame.
      for (const s of [spin, tilt, lean, swingSpring]) {
        s.x = s.target;
        s.v = 0;
      }
      settle();
      render();
      return;
    }
    if (frame) {
      return;
    }
    card.dataset.moving = "";
    lastTime = performance.now();
    frame = requestAnimationFrame(tick);
  };

  const flip = (direction: 1 | -1 = 1) => {
    touched = true;
    spin.target = nearestFace(spin.target) + 180 * direction;
    swingSpring.v += 36 * direction;
    wake();
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || drag) {
      return;
    }
    touched = true;
    const rect = stage.getBoundingClientRect();
    drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startAngle: spin.x,
      degreesPerPx: DEGREES_PER_CARD_WIDTH / Math.max(rect.width, 1),
      moved: false,
      lastX: event.clientX,
      lastAngle: spin.x,
      lastTime: event.timeStamp,
      velocity: 0,
    };
  };

  /** A fine pointer at rest on the card leans it a little toward itself. */
  const onHover = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || reducedMotion) {
      return;
    }
    const rect = stage.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    lean.target = px * 16;
    tilt.target = py * -10;
    wake();
  };

  /** Blend the drag's angular speed, and return its linear speed in px/s. */
  const trackDrag = (current: Drag, event: PointerEvent) => {
    const dt = Math.max(event.timeStamp - current.lastTime, 1) / 1000;
    const angular = (spin.x - current.lastAngle) / dt;
    const linear = (event.clientX - current.lastX) / dt;
    current.velocity = current.velocity * 0.4 + angular * 0.6;
    current.lastAngle = spin.x;
    current.lastX = event.clientX;
    current.lastTime = event.timeStamp;
    return linear;
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!drag) {
      onHover(event);
      return;
    }
    if (event.pointerId !== drag.pointerId) {
      return;
    }

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < TAP_SLOP_PX) {
      return;
    }
    if (!drag.moved) {
      // Capture only once it is a drag: a captured tap would send its click to
      // the stage instead of the button, and the card would not flip.
      drag.moved = true;
      spin.v = 0;
      stage.setPointerCapture(event.pointerId);
    }

    spin.x = drag.startAngle + dx * drag.degreesPerPx;
    spin.target = spin.x;
    lean.target = 0;
    const linear = trackDrag(drag, event);

    if (reducedMotion) {
      tilt.target = 0;
      swingSpring.target = 0;
      render();
      return;
    }
    tilt.target = clamp(dy * -0.12, -14, 14);
    // The card trails the hand: a fast drag right swings the bottom left.
    swingSpring.target = clamp(linear * -0.004, -7, 7);
    wake();
  };

  const release = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.pointerId) {
      return;
    }
    const { moved, velocity, lastTime: releasedAt } = drag;
    drag = null;
    if (stage.hasPointerCapture(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }

    tilt.target = 0;
    swingSpring.target = 0;
    if (!moved) {
      wake();
      return;
    }

    // A pointer that stopped before it let go throws nothing.
    const idle = event.timeStamp - releasedAt > 80;
    const throwSpeed = idle
      ? 0
      : clamp(velocity, -MAX_THROW_DEG_PER_S, MAX_THROW_DEG_PER_S);
    spin.v = throwSpeed;
    spin.target = nearestFace(spin.x + throwSpeed * THROW_LOOKAHEAD_S);
    swingSpring.v += throwSpeed * 0.02;

    // The click that follows this pointerup belongs to the drag, not a flip.
    dragClick = event.type === "pointerup";
    window.setTimeout(() => {
      dragClick = false;
    }, 0);
    wake();
  };

  const onPointerLeave = (event: PointerEvent) => {
    // A press that leaves before it becomes a drag is not captured, so its
    // pointerup may never reach the stage: drop it here.
    if (drag && !drag.moved && event.pointerId === drag.pointerId) {
      drag = null;
    }
    if (drag || event.pointerType !== "mouse") {
      return;
    }
    lean.target = 0;
    tilt.target = 0;
    wake();
  };

  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerup", release);
  stage.addEventListener("pointercancel", release);
  stage.addEventListener("pointerleave", onPointerLeave);

  // One turn on arrival says the card can be turned. It is skipped under
  // reduced motion, and if the visitor reached the card first.
  const arrival = reducedMotion
    ? 0
    : window.setTimeout(() => {
        if (touched) {
          return;
        }
        spin.target = 360;
        swingSpring.v = 28;
        wake();
      }, ARRIVAL_DELAY_MS);

  render();

  return {
    flip,
    consumeDragClick: () => {
      const consumed = dragClick;
      dragClick = false;
      return consumed;
    },
    dispose: () => {
      window.clearTimeout(arrival);
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", release);
      stage.removeEventListener("pointercancel", release);
      stage.removeEventListener("pointerleave", onPointerLeave);
    },
  };
};
