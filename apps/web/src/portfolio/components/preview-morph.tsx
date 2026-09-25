import { ViewTransition } from "react";

/**
 * The preview image of a Post or a Project, as one object across a navigation:
 * the frame on its Content Card morphs into the hero image on its detail page,
 * and back again. Both sides must use this, so the name matches.
 *
 * The name is unique per page because a slug is unique within its kind, and
 * the kind keeps a Post and a Project with the same slug apart on Home.
 *
 * `default="none"` stops the image from crossfading on every unrelated
 * transition (a Pager step, a refresh). With it, `share` must stay explicit,
 * or the pair stops morphing.
 * @see https://nextjs.org/docs/app/guides/view-transitions
 */
export const PreviewMorph = ({
  kind,
  slug,
  children,
}: {
  kind: "post" | "project";
  slug: string;
  children: React.ReactNode;
}) => (
  <ViewTransition name={`${kind}-preview-${slug}`} share="morph" default="none">
    {children}
  </ViewTransition>
);
