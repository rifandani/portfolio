import type { Project } from "@/project/utils/project-source";

/** One Project Link: where it goes, and that address in its short form. */
export interface ProjectLink {
  kind: "demo" | "github";
  href: string;
  /** The host and path, so the reader sees where the link goes before a click. */
  address: string;
}

/**
 * The short form of an address: the host and the path, without the scheme, a
 * `www.`, a trailing slash, the query, or the fragment.
 */
export const shortAddressOf = (href: string) => {
  const url = new URL(href);
  const host = url.hostname.replace(/^www\./u, "");
  return `${host}${url.pathname.replace(/\/+$/u, "")}`;
};

/** The Project Links of a Project, demo first. A missing URL gives no link. */
export const projectLinksOf = (
  project: Pick<Project, "demoUrl" | "githubUrl">
): ProjectLink[] =>
  (
    [
      ["demo", project.demoUrl],
      ["github", project.githubUrl],
    ] as const
  ).flatMap(([kind, href]) =>
    href ? [{ kind, href, address: shortAddressOf(href) }] : []
  );
