export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  previewSrc: string;
  previewAlt: string;
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
    previewSrc: "/placeholders/project-og-1.svg",
    previewAlt: "Synthetic preview artwork for Signal Kit",
    href: "/projects",
  },
  {
    id: "proj-2",
    tags: ["Bun", "CLI", "TypeScript"],
    title: "[Synthetic] Portless Desk",
    description:
      "Local-first tooling notes and developer workflow experiments.",
    previewSrc: "/placeholders/project-og-2.svg",
    previewAlt: "Synthetic preview artwork for Portless Desk",
    href: "/projects",
  },
  {
    id: "proj-3",
    tags: ["React", "TanStack Form", "Zod"],
    title: "[Synthetic] Lattice Forms",
    description:
      "Form patterns with clear errors, focus, and validation states.",
    previewSrc: "/placeholders/project-og-3.svg",
    previewAlt: "Synthetic preview artwork for Lattice Forms",
    href: "/projects",
  },
  {
    id: "proj-4",
    tags: ["Recharts", "SVG", "Design tokens"],
    title: "[Synthetic] Quiet Charts",
    description: "Restrained data display for status and trend reading.",
    previewSrc: "/placeholders/project-og-4.svg",
    previewAlt: "Synthetic preview artwork for Quiet Charts",
    href: "/projects",
  },
];
