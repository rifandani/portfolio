export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
  href: string;
  tags: string[];
}

export const projectEntries: ProjectEntry[] = [
  {
    id: "proj-1",
    tags: ["React Aria", "Tailwind", "TypeScript"],
    title: "[Synthetic] Signal Kit",
    description:
      "Accessible component patterns for portfolio and product shells.",
    logoSrc: "/placeholders/project-a.svg",
    logoAlt: "Synthetic logo for Signal Kit",
    href: "/projects",
  },
  {
    id: "proj-2",
    tags: ["Bun", "CLI", "TypeScript"],
    title: "[Synthetic] Portless Desk",
    description:
      "Local-first tooling notes and developer workflow experiments.",
    logoSrc: "/placeholders/project-b.svg",
    logoAlt: "Synthetic logo for Portless Desk",
    href: "/projects",
  },
  {
    id: "proj-3",
    tags: ["React", "TanStack Form", "Zod"],
    title: "[Synthetic] Lattice Forms",
    description:
      "Form patterns with clear errors, focus, and validation states.",
    logoSrc: "/placeholders/project-c.svg",
    logoAlt: "Synthetic logo for Lattice Forms",
    href: "/projects",
  },
  {
    id: "proj-4",
    tags: ["Recharts", "SVG", "Design tokens"],
    title: "[Synthetic] Quiet Charts",
    description: "Restrained data display for status and trend reading.",
    logoSrc: "/placeholders/project-d.svg",
    logoAlt: "Synthetic logo for Quiet Charts",
    href: "/projects",
  },
];
