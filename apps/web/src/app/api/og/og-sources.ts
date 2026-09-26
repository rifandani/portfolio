import path from "node:path";

const IMAGE_TYPES = new Map([
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
]);

/** Where a Project preview comes from, as the OG route can load it. */
export type PreviewSource =
  | { kind: "remote"; url: string }
  | { kind: "file"; file: string; type: string };

/**
 * Resolve a Project preview source. A root-relative source is a file in
 * `publicDir`, and it must stay inside it and be an image type Satori draws;
 * an `https:` source passes through. Anything else has no source, and the
 * card draws an empty frame.
 */
export const previewSourceOf = (
  src: string,
  publicDir: string
): PreviewSource | null => {
  if (src.startsWith("https://")) {
    return { kind: "remote", url: src };
  }
  // fallow-ignore-next-line security-sink -- src comes from a Project Source, and the result must stay inside publicDir
  const file = path.resolve(publicDir, `.${src}`);
  const type = IMAGE_TYPES.get(path.extname(file));
  const inside = src.startsWith("/") && file.startsWith(publicDir + path.sep);
  return inside && type ? { kind: "file", file, type } : null;
};
