import { describe, expect, it } from "vitest";

import {
  shouldScrollToSection,
  viewerFocusTarget,
  viewerKeyboardAction,
  warmUniqueViewerMedia,
} from "./gallery-logic";
import type { WarmRequest } from "./gallery-logic";

const identityWarmRequest = (value: WarmRequest) => value;

describe("viewerKeyboardAction", () => {
  it("maps viewer keys to actions", () => {
    expect(viewerKeyboardAction("Escape", false, false)).toBe("close");
    expect(viewerKeyboardAction("ArrowLeft", false, false)).toBe("previous");
    expect(viewerKeyboardAction("ArrowRight", false, false)).toBe("next");
    expect(viewerKeyboardAction("Enter", false, false)).toBe("ignore");
  });

  it("leaves keys to a focused media control or the carousel", () => {
    expect(viewerKeyboardAction("ArrowLeft", true, false)).toBe("ignore");
    expect(viewerKeyboardAction("ArrowRight", false, true)).toBe("ignore");
    expect(viewerKeyboardAction("Escape", false, true)).toBe("close");
  });
});

describe("viewerFocusTarget", () => {
  it("moves focus off an arrow that becomes disabled", () => {
    expect(viewerFocusTarget(0, 4, true, false)).toBe("next");
    expect(viewerFocusTarget(4, 4, false, true)).toBe("previous");
    expect(viewerFocusTarget(2, 4, true, false)).toBeNull();
    expect(viewerFocusTarget(0, 4, false, false)).toBeNull();
  });
});

describe("shouldScrollToSection", () => {
  const plainClick = {
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
  } as const;

  it("handles only an unmodified primary click", () => {
    expect(shouldScrollToSection(plainClick)).toBe(true);
    expect(shouldScrollToSection({ ...plainClick, button: 1 })).toBe(false);
    expect(shouldScrollToSection({ ...plainClick, metaKey: true })).toBe(false);
    expect(shouldScrollToSection({ ...plainClick, ctrlKey: true })).toBe(false);
    expect(shouldScrollToSection({ ...plainClick, shiftKey: true })).toBe(
      false
    );
    expect(shouldScrollToSection({ ...plainClick, altKey: true })).toBe(false);
  });
});

describe("warmUniqueViewerMedia", () => {
  it("creates each preload once and passes responsive image settings", () => {
    const warmedUrls = new Set<string>();
    const requests: unknown[] = [];
    const item: WarmRequest = {
      url: "/large.webp",
      sizes: "100vw",
      srcSet: "/large.webp 1x",
    };
    const createImage = (request: WarmRequest): void => {
      requests.push(request);
    };

    expect(
      warmUniqueViewerMedia(item, warmedUrls, identityWarmRequest, createImage)
    ).toBe(true);
    expect(
      warmUniqueViewerMedia(item, warmedUrls, identityWarmRequest, createImage)
    ).toBe(false);
    expect(requests).toEqual([item]);
  });
});
