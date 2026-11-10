export type ViewerKeyboardAction = "close" | "previous" | "next" | "ignore";

export const viewerKeyboardAction = (
  key: string,
  defaultPrevented: boolean,
  targetIsMedia: boolean
): ViewerKeyboardAction => {
  if (key === "Escape") {
    return "close";
  }
  if (defaultPrevented || targetIsMedia) {
    return "ignore";
  }
  if (key === "ArrowLeft") {
    return "previous";
  }
  if (key === "ArrowRight") {
    return "next";
  }
  return "ignore";
};

export const viewerFocusTarget = (
  index: number,
  lastIndex: number,
  previousArrowFocused: boolean,
  nextArrowFocused: boolean
): "previous" | "next" | null => {
  if (index === 0 && previousArrowFocused) {
    return "next";
  }
  if (index === lastIndex && nextArrowFocused) {
    return "previous";
  }
  return null;
};

export const shouldScrollToSection = (
  event: Pick<
    MouseEvent,
    "button" | "metaKey" | "ctrlKey" | "shiftKey" | "altKey"
  >
) =>
  event.button === 0 &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.altKey;

export interface WarmRequest {
  url: string;
  lowPriority?: boolean;
  sizes?: string;
  srcSet?: string;
}

export const warmUniqueViewerMedia = <T>(
  item: T,
  warmedUrls: Set<string>,
  getRequest: (item: T) => WarmRequest,
  createImage: (request: WarmRequest) => void
) => {
  const request = getRequest(item);
  if (warmedUrls.has(request.url)) {
    return false;
  }
  warmedUrls.add(request.url);
  createImage(request);
  return true;
};
