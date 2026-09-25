/**
 * Glyph Engine — the hero's one authored motion, as a framework-free renderer.
 *
 * A solid is raymarched once per character cell and printed in IBM Plex Mono,
 * the way donut.c prints a torus. It acts out the headline: a hard-faceted
 * icosahedron (craft) melts into a gyroid-displaced blob (obsession), holds,
 * then locks back into its facets. Flat facets shade to one glyph each, so the
 * craft phase reads as crisp blocks; the blob shades continuously.
 *
 * Colour comes from the theme tokens, read off the canvas at runtime, so the
 * print follows light and dark without a second palette. Helm Teal lands only
 * on the specular peaks — a few glyphs, never a wash.
 */

/** Dark to light. The first cell is empty so misses print nothing. */
const RAMP = " .:-=+*#%@";
const RAMP_TOP = RAMP.length - 1;
/** Glyph levels at or under this print in Muted Ink rather than Warm Graphite. */
const QUIET_LEVEL = 3;

/** Stepped at ~30fps: a character grid reads as print, not as video. */
const FRAME_MS = 1000 / 30;
const CYCLE_S = 12;
/** Morph for the reduced-motion still: mid-melt, so both natures show. */
const STILL_MORPH = 0.38;
/** How long the grid scrambles before the solid resolves out of it. */
const RESOLVE_MS = 1100;

/** View-space radius that bounds the solid at every point of the morph. */
const BOUND = 1.32;
/** Screen pixels per view unit, as a share of the canvas's short side. */
const ZOOM = 0.37;
const MAX_STEPS = 64;
const HIT_EPS = 0.004;
const GRAZE_EPS = 0.03;
/** The blend and the gyroid are not exact distances, so march under-steps. */
const STEP_SCALE = 0.55;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * 0 is pure icosahedron, 1 is pure blob. The melt is slow and even; the lock
 * back is quicker and lands hard, because precision is the craft half's
 * whole character.
 */
const morphAt = (seconds: number) => {
  const t = seconds % CYCLE_S;
  if (t < 4.5) {
    return 0;
  }
  if (t < 7) {
    return easeInOutCubic((t - 4.5) / 2.5);
  }
  if (t < 10) {
    return 1;
  }
  if (t < 11.3) {
    return 1 - easeOutQuart((t - 10) / 1.3);
  }
  return 0;
};

// Icosahedron SDF, from the plane set n1 = normalize(φ + 1, 1, 0) and its
// cyclic permutations, capped by the (1,1,1) diagonal plane.
const Q = 2.618033988749895;
const N1_LEN = Math.hypot(Q, 1);
const N1X = Q / N1_LEN;
const N1Y = 1 / N1_LEN;
const N2 = 1 / Math.sqrt(3);
const ICO_R = 1.02;

const sdIcosahedron = (x: number, y: number, z: number) => {
  const px = Math.abs(x / ICO_R);
  const py = Math.abs(y / ICO_R);
  const pz = Math.abs(z / ICO_R);
  const a = px * N1X + py * N1Y;
  const b = py * N1X + pz * N1Y;
  const c = pz * N1X + px * N1Y;
  const d = (px + py + pz) * N2 - N1X;
  return Math.max(Math.max(a, b, c) - N1X, d) * ICO_R;
};

interface Scene {
  morph: number;
  time: number;
  /** 0 at rest, 1 mid-transition: the surface churns hardest while changing. */
  melt: number;
  /** Extra fine ripple inside a melt pocket: attention makes it busy. */
  churn: number;
}

/** Sphere pushed around by a travelling gyroid plus a finer ripple. */
const sdBlob = (
  x: number,
  y: number,
  z: number,
  { time, melt, churn }: Scene
) => {
  const f = 2.7;
  const gyroid =
    Math.sin(f * x + time) * Math.cos(f * y - time * 0.7) +
    Math.sin(f * y + time * 0.9) * Math.cos(f * z + time * 0.4) +
    Math.sin(f * z - time * 0.6) * Math.cos(f * x + time * 1.1);
  const ripple =
    Math.sin(5.1 * x - time * 1.6) * Math.sin(4.7 * z + time * 1.3);
  return (
    Math.hypot(x, y, z) -
    0.84 +
    gyroid * (0.14 + melt * 0.08) +
    ripple * (0.045 + churn * 0.05)
  );
};

const sceneSdf = (x: number, y: number, z: number, scene: Scene) => {
  const { morph } = scene;
  if (morph <= 0) {
    return sdIcosahedron(x, y, z);
  }
  const blob = sdBlob(x, y, z, scene);
  if (morph >= 1) {
    return blob;
  }
  return sdIcosahedron(x, y, z) * (1 - morph) + blob * morph;
};

type Vec3 = readonly [number, number, number];

/**
 * View → object transform for R = Rx(pitch) · Ry(yaw). Rays and lights are
 * built in view space and carried into object space by Rᵀ, so the solid never
 * has to be rotated per sample.
 */
const viewToObject = (yaw: number, pitch: number) => {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return (x: number, y: number, z: number): Vec3 => [
    cy * x + sp * sy * y - cp * sy * z,
    cp * y + sp * z,
    sy * x - sp * cy * y + cp * cy * z,
  ];
};

const normalize = ([x, y, z]: Vec3): Vec3 => {
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length];
};

const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/** Key light from the upper left, in front; the eye looks down +z. */
const LIGHT = normalize([-0.78, 0.52, -0.5]);
/** Weak fill from the lower right, so the shadow side still prints form. */
const FILL = normalize([0.7, -0.45, -0.35]);
const HALF = normalize([LIGHT[0], LIGHT[1], LIGHT[2] - 1]);

/** Tetrahedral normal: four samples instead of six. */
const surfaceNormal = (x: number, y: number, z: number, scene: Scene): Vec3 => {
  const e = 0.0025;
  const k1 = sceneSdf(x + e, y - e, z - e, scene);
  const k2 = sceneSdf(x - e, y - e, z + e, scene);
  const k3 = sceneSdf(x - e, y + e, z - e, scene);
  const k4 = sceneSdf(x + e, y + e, z + e, scene);
  return normalize([k1 - k2 - k3 + k4, -k1 - k2 + k3 + k4, -k1 + k2 - k3 + k4]);
};

/**
 * Distance along the ray to the surface, or -1 on a miss. A grazing ray can
 * spend every step creeping along the silhouette; if it ends that close to
 * the surface it counts as a hit, so the edge does not print with holes.
 */
const march = (origin: Vec3, direction: Vec3, far: number, scene: Scene) => {
  let t = 0;
  let d = Number.POSITIVE_INFINITY;
  for (let step = 0; step < MAX_STEPS && t < far; step += 1) {
    d = sceneSdf(
      origin[0] + direction[0] * t,
      origin[1] + direction[1] * t,
      origin[2] + direction[2] * t,
      scene
    );
    if (d < HIT_EPS) {
      return t;
    }
    t += d * STEP_SCALE;
  }
  return t < far && d < GRAZE_EPS ? t : -1;
};

interface Grid {
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
  width: number;
  height: number;
  fontPx: number;
  /** Ramp index per cell; 0 prints nothing. */
  levels: Uint8Array;
  /** 1 where the cell sits on a specular peak and prints Helm Teal. */
  signal: Uint8Array;
}

const cellCentre = (grid: Grid, col: number, row: number) => ({
  x: (grid.width - grid.cols * grid.cellW) / 2 + (col + 0.5) * grid.cellW,
  y: (grid.height - grid.rows * grid.cellH) / 2 + (row + 0.5) * grid.cellH,
});

/**
 * The attention lens: where the pointer rests on the solid, the solid flips
 * its nature. On the crystal it melts a pocket; during the blob hold it
 * freezes a patch of facets. The lens lives in view space, and every ray of
 * the orthographic grid has a fixed view position, so it costs one weight per
 * cell rather than anything per march step.
 */
const LENS_RADIUS = 0.46;
/** Share of the radius held at full strength before the smoothstep edge. */
const LENS_CORE = 0.38;
/** How long a pocket the pointer has left takes to heal. */
const TRAIL_MS = 750;
/** View-space distance the head travels before it drops a trail point. */
const TRAIL_SPACING = 0.05;
const TRAIL_MAX = 24;
/** Head-weight band printed in Helm Teal: a one-cell ring at the lens edge. */
const RIM_LOW = 0.25;
const RIM_HIGH = 0.55;

interface LensPoint {
  x: number;
  y: number;
  born: number;
}

interface Lens {
  /** Head position, in view units. */
  x: number;
  y: number;
  /** 0–1: eased in while the pointer is over the solid, out when it leaves. */
  strength: number;
  trail: LensPoint[];
  now: number;
}

const falloff = (dx: number, dy: number) => {
  const d = Math.hypot(dx, dy) / LENS_RADIUS;
  if (d >= 1) {
    return 0;
  }
  if (d <= LENS_CORE) {
    return 1;
  }
  const t = (1 - d) / (1 - LENS_CORE);
  return t * t * (3 - 2 * t);
};

const headWeight = (lens: Lens, vx: number, vy: number) =>
  lens.strength * falloff(vx - lens.x, vy - lens.y);

/** Head or healing trail, whichever holds the cell harder. */
const lensWeight = (lens: Lens, vx: number, vy: number) => {
  let weight = headWeight(lens, vx, vy);
  for (const point of lens.trail) {
    const life = 1 - (lens.now - point.born) / TRAIL_MS;
    if (life > 0 && weight < life) {
      weight = Math.max(
        weight,
        life * life * falloff(vx - point.x, vy - point.y)
      );
    }
  }
  return weight;
};

/** Everything one frame's rays share: the grid, the scene, and the lights in object space. */
interface Trace {
  grid: Grid;
  scene: Scene;
  lens: Lens;
  lensLive: boolean;
  /** Reused per ray, so the lens allocates nothing per cell. */
  local: Scene;
  toObject: (x: number, y: number, z: number) => Vec3;
  direction: Vec3;
  light: Vec3;
  fill: Vec3;
  half: Vec3;
}

/**
 * Flip toward the other nature: g + w(1 − 2g) is continuous through the
 * transition, where the two natures meet at 0.5.
 */
const flipScene = (local: Scene, scene: Scene, weight: number) => {
  local.morph = scene.morph + weight * (1 - 2 * scene.morph);
  local.melt = Math.max(scene.melt, weight);
  local.churn = Math.max(0, weight * (1 - 2 * scene.morph));
  return local;
};

/** Brightness 0–1 and the specular term for a surface normal. */
const shade = (normal: Vec3, { light, fill, half }: Trace) => {
  const diffuse = Math.max(0, dot(normal, light));
  const bounce = Math.max(0, dot(normal, fill));
  const specular = Math.max(0, dot(normal, half)) ** 40;
  const lit = clamp(
    0.12 + diffuse * 0.72 + bounce * 0.22 + specular * 0.4,
    0,
    1
  );
  return { lit, specular };
};

/**
 * Whether a lit cell prints Helm Teal. Inside the lens only the rim is teal: a
 * smooth pocket turned to the key light would otherwise flood with specular
 * peaks.
 */
const isSignal = (
  { lens, lensLive }: Trace,
  vx: number,
  vy: number,
  specular: number,
  weight: number
) => {
  const head = lensLive ? headWeight(lens, vx, vy) : 0;
  const rim = head > RIM_LOW && head < RIM_HIGH;
  const peak = specular > 0.72 && weight < 0.05;
  return peak || rim;
};

/** Raymarch one cell at view position (vx, vy) into `levels` / `signal`. */
const traceCell = (trace: Trace, index: number, vx: number, vy: number) => {
  const { grid, scene, lens, lensLive, toObject, direction } = trace;
  const r2 = vx * vx + vy * vy;
  if (r2 > BOUND * BOUND) {
    return;
  }
  const depth = Math.sqrt(BOUND * BOUND - r2);
  const origin = toObject(vx, vy, -depth);
  const weight = lensLive ? lensWeight(lens, vx, vy) : 0;
  const ray = weight > 0.001 ? flipScene(trace.local, scene, weight) : scene;
  const t = march(origin, direction, depth * 2, ray);
  if (t < 0) {
    return;
  }
  const normal = surfaceNormal(
    origin[0] + direction[0] * t,
    origin[1] + direction[1] * t,
    origin[2] + direction[2] * t,
    ray
  );
  const { lit, specular } = shade(normal, trace);
  grid.levels[index] = 1 + Math.min(RAMP_TOP - 1, Math.floor(lit * RAMP_TOP));
  grid.signal[index] = isSignal(trace, vx, vy, specular, weight) ? 1 : 0;
};

/** Raymarch every cell of the grid into `levels` / `signal`. */
const traceGrid = (
  grid: Grid,
  scene: Scene,
  lens: Lens,
  yaw: number,
  pitch: number
) => {
  const toObject = viewToObject(yaw, pitch);
  const trace: Trace = {
    direction: toObject(0, 0, 1),
    fill: toObject(...FILL),
    grid,
    half: toObject(...HALF),
    lens,
    lensLive: lens.strength > 0.001 || lens.trail.length > 0,
    light: toObject(...LIGHT),
    local: { ...scene },
    scene,
    toObject,
  };
  const scale = Math.min(grid.width, grid.height) * ZOOM;

  grid.levels.fill(0);
  grid.signal.fill(0);
  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const centre = cellCentre(grid, col, row);
      traceCell(
        trace,
        row * grid.cols + col,
        (centre.x - grid.width / 2) / scale,
        -(centre.y - grid.height / 2) / scale
      );
    }
  }
};

/** Stable pseudo-random in [0, 1) per cell and frame, for the resolve scramble. */
const noise = (a: number, b: number) => {
  const s = Math.sin(a * 12.9898 + b * 78.233) * 43_758.5453;
  return s - Math.floor(s);
};

interface Palette {
  quiet: string;
  ink: string;
  signal: string;
}

const readPalette = (node: HTMLElement): Palette => {
  const style = getComputedStyle(node);
  const token = (name: string, fallback: string) =>
    style.getPropertyValue(name).trim() || fallback;
  return {
    quiet: token("--muted-fg", "#8a8580"),
    ink: token("--fg", "#2a2725"),
    signal: token("--primary", "#1a9a8f"),
  };
};

type Ink = keyof Palette;

/**
 * Which ink a cell prints in, and with which glyph. While resolving, cells
 * inside the bound flicker through random quiet glyphs before settling — the
 * solid compiles out of noise.
 */
const scrambleGlyph = (
  grid: Grid,
  index: number,
  scramble: number,
  frame: number
) => {
  const col = index % grid.cols;
  const row = (index - col) / grid.cols;
  const reach = BOUND * Math.min(grid.width, grid.height) * ZOOM;
  const dx = (col - grid.cols / 2) * grid.cellW;
  const dy = (row - grid.rows / 2) * grid.cellH;
  if (Math.hypot(dx, dy) < reach && noise(index, frame) < scramble * 0.55) {
    return RAMP[1 + Math.floor(noise(frame, index) * RAMP_TOP)] ?? ".";
  }
  return null;
};

const inkFor = (
  grid: Grid,
  index: number,
  scramble: number,
  frame: number
): [Ink, string] | null => {
  const noisy =
    scramble > 0 ? scrambleGlyph(grid, index, scramble, frame) : null;
  if (noisy !== null) {
    return ["quiet", noisy];
  }
  const level = grid.levels[index] ?? 0;
  if (level === 0) {
    return null;
  }
  const glyph = RAMP[level] ?? ".";
  if (grid.signal[index] === 1) {
    return ["signal", glyph];
  }
  return [level <= QUIET_LEVEL ? "quiet" : "ink", glyph];
};

/** A glyph placed at a cell centre, in CSS pixels. */
type PlacedGlyph = readonly [x: number, y: number, glyph: string];

/** One list per ink, so each fill style is set once per frame. */
interface InkBatches {
  ink: PlacedGlyph[];
  quiet: PlacedGlyph[];
  signal: PlacedGlyph[];
}

/** Print the traced grid, batched into one fill style per ink. */
const paintGrid = (
  context: CanvasRenderingContext2D,
  grid: Grid,
  palette: Palette,
  family: string,
  scramble: number,
  frame: number
) => {
  const batches: InkBatches = { ink: [], quiet: [], signal: [] };
  for (let index = 0; index < grid.levels.length; index += 1) {
    const cell = inkFor(grid, index, scramble, frame);
    if (cell) {
      const col = index % grid.cols;
      const centre = cellCentre(grid, col, (index - col) / grid.cols);
      batches[cell[0]].push([centre.x, centre.y, cell[1]]);
    }
  }

  context.clearRect(0, 0, grid.width, grid.height);
  context.font = `500 ${grid.fontPx}px ${family}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  for (const ink of ["quiet", "ink", "signal"] as const) {
    context.fillStyle = palette[ink];
    for (const [x, y, glyph] of batches[ink]) {
      context.fillText(glyph, x, y);
    }
  }
};

/** Size the backing store and the character grid to the canvas's box. */
const measureGrid = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  family: string
): Grid | null => {
  const { width, height } = canvas.getBoundingClientRect();
  if (width === 0 || height === 0) {
    return null;
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  context.setTransform(dpr, 0, 0, dpr, 0, 0);

  // About 36 columns across whatever box the layout hands us.
  const fontPx = clamp(Math.round(width / 34), 8, 12);
  context.font = `500 ${fontPx}px ${family}`;
  const cellW = context.measureText("M").width;
  const cellH = fontPx * 1.18;
  const cols = Math.floor(width / cellW);
  const rows = Math.floor(height / cellH);
  return {
    cellH,
    cellW,
    cols,
    fontPx,
    height,
    levels: new Uint8Array(cols * rows),
    rows,
    signal: new Uint8Array(cols * rows),
    width,
  };
};

/**
 * Mount the engine on a canvas and return its teardown.
 *
 * It runs only while the canvas is on screen and the tab is visible. The
 * scene clock advances only while running, so a pause never jumps. Under
 * reduced motion it prints one still frame and redraws only on resize or a
 * theme change. A fine pointer tilts the solid toward itself, and resting it
 * on the solid opens the attention lens.
 */
export const mountGlyphEngine = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d");
  if (!context) {
    return () => {
      /* No 2D context: the box stays empty, which is the static fallback. */
    };
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  const family = getComputedStyle(canvas).fontFamily;
  let palette = readPalette(canvas);
  let grid: Grid | null = null;

  const state = {
    aimX: 0,
    aimY: 0,
    pointerIn: false,
    pointerX: 0,
    pointerY: 0,
    clock: 0,
    frame: 0,
    last: 0,
    lastDraw: 0,
    raf: 0,
    ready: false,
    resolveStart: -1,
    running: false,
    tiltX: 0,
    tiltY: 0,
    visible: true,
  };
  const lens: Lens = { now: 0, strength: 0, trail: [], x: 0, y: 0 };

  /**
   * Follow the pointer in view units, from its last client position — read
   * against the canvas every frame, so scrolling under a still pointer moves
   * the lens too. Leaving drops the head into the trail, so the pocket heals
   * over `TRAIL_MS` instead of vanishing with the head.
   */
  const updateLens = (current: Grid, now: number) => {
    lens.now = now;
    lens.trail = lens.trail.filter((point) => now - point.born < TRAIL_MS);

    const rect = canvas.getBoundingClientRect();
    const scale = Math.min(current.width, current.height) * ZOOM;
    const vx = (state.pointerX - rect.left - current.width / 2) / scale;
    const vy = -(state.pointerY - rect.top - current.height / 2) / scale;
    const over = state.pointerIn && vx * vx + vy * vy < BOUND * BOUND;

    if (over) {
      const last = lens.trail.at(-1);
      if (
        lens.strength > 0.5 &&
        (!last || Math.hypot(lens.x - last.x, lens.y - last.y) > TRAIL_SPACING)
      ) {
        lens.trail.push({ born: now, x: lens.x, y: lens.y });
        lens.trail = lens.trail.slice(-TRAIL_MAX);
      }
      lens.x = vx;
      lens.y = vy;
      lens.strength += (1 - lens.strength) * 0.3;
    } else {
      if (lens.strength > 0.5) {
        lens.trail.push({ born: now, x: lens.x, y: lens.y });
      }
      lens.strength *= 0.5;
      if (lens.strength < 0.001) {
        lens.strength = 0;
      }
    }
  };

  const render = (now: number) => {
    if (!grid) {
      return;
    }
    const seconds = reduceMotion ? 0 : state.clock / 1000;
    const morph = reduceMotion ? STILL_MORPH : morphAt(seconds);
    const scene: Scene = {
      churn: 0,
      melt: Math.sin(Math.PI * morph),
      morph,
      time: reduceMotion ? 1.7 : seconds * 0.9,
    };

    state.tiltX += (state.aimX - state.tiltX) * 0.07;
    state.tiltY += (state.aimY - state.tiltY) * 0.07;
    const yaw = (reduceMotion ? 0.62 : seconds * 0.32) + state.tiltX;
    const pitch = -0.42 + state.tiltY;
    if (!reduceMotion) {
      updateLens(grid, now);
    }
    traceGrid(grid, scene, lens, yaw, pitch);

    let scramble = 0;
    if (!reduceMotion) {
      if (state.resolveStart < 0) {
        state.resolveStart = now;
      }
      scramble =
        1 - easeOutCubic(clamp((now - state.resolveStart) / RESOLVE_MS, 0, 1));
    }
    paintGrid(context, grid, palette, family, scramble, state.frame);
    state.frame += 1;
  };

  const tick = (now: number) => {
    if (!state.running) {
      return;
    }
    state.raf = requestAnimationFrame(tick);
    state.clock += Math.min(now - state.last, 100);
    state.last = now;
    if (now - state.lastDraw >= FRAME_MS - 1) {
      state.lastDraw = now;
      render(now);
    }
  };

  const sync = () => {
    const shouldRun =
      state.ready && state.visible && !document.hidden && !reduceMotion;
    if (shouldRun && !state.running) {
      state.running = true;
      state.last = performance.now();
      state.raf = requestAnimationFrame(tick);
    } else if (!shouldRun && state.running) {
      state.running = false;
      cancelAnimationFrame(state.raf);
    }
  };

  const redrawStill = () => {
    if (reduceMotion && state.ready) {
      render(performance.now());
    }
  };

  const relayout = () => {
    grid = measureGrid(canvas, context, family);
    redrawStill();
  };

  const onPointer = (event: PointerEvent) => {
    state.pointerIn = true;
    state.pointerX = event.clientX;
    state.pointerY = event.clientY;
    const rect = canvas.getBoundingClientRect();
    const nx =
      (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
    const ny =
      (event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
    state.aimX = clamp(nx, -1, 1) * 0.6;
    state.aimY = clamp(ny, -1, 1) * 0.38;
  };

  const resizeObserver = new ResizeObserver(relayout);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    state.visible = entry?.isIntersecting ?? true;
    sync();
  });
  /** Theme toggles swap tokens on `<html>`; re-read them so the print follows. */
  const themeObserver = new MutationObserver(() => {
    palette = readPalette(canvas);
    redrawStill();
  });

  resizeObserver.observe(canvas);
  intersectionObserver.observe(canvas);
  themeObserver.observe(document.documentElement, {
    attributeFilter: ["class", "style", "data-theme"],
    attributes: true,
  });
  document.addEventListener("visibilitychange", sync);
  const onPointerExit = () => {
    state.pointerIn = false;
  };
  if (finePointer && !reduceMotion) {
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerExit);
  }

  let disposed = false;
  /** Measuring before the mono face lands would size cells for the fallback. */
  const start = async () => {
    try {
      await document.fonts.load(`500 10px ${family}`);
    } catch {
      // A failed font load still renders, in the fallback mono.
    }
    if (!disposed) {
      state.ready = true;
      relayout();
      sync();
    }
  };
  void start();

  return () => {
    disposed = true;
    state.running = false;
    cancelAnimationFrame(state.raf);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    themeObserver.disconnect();
    document.removeEventListener("visibilitychange", sync);
    window.removeEventListener("pointermove", onPointer);
    document.documentElement.removeEventListener("pointerleave", onPointerExit);
  };
};
