export interface Talk {
  readonly title: string;
  readonly description: string;
  /** First creation date, in YYYY-MM-DD form. Later edits do not change it. */
  readonly createdAt: string;
  readonly link: string;
}

export const talks: readonly Talk[] = [
  {
    title: "Agent Readiness",
    description: "Making websites and codebases work for AI agents",
    createdAt: "2026-11-10",
    link: "https://agent-readiness-rifandani.vercel.app/",
  },
  {
    title: "Observability (o11y)",
    description:
      "An introduction to logs, metrics, and traces, with OpenTelemetry and the LGTM stack.",
    createdAt: "2026-06-06",
    link: "https://observability-rifandani.vercel.app/",
  },
  {
    title: "Feature Flags",
    description:
      "An introduction to feature flags, safe delivery practices, trunk-based development, and OpenFeature.",
    createdAt: "2025-12-27",
    link: "https://feature-flag-rifandani.vercel.app/",
  },
  {
    title: "Catching Up to Large Language Model (LLM)",
    description:
      "An overview of how LLMs work, how to evaluate them, and how to build LLM-powered applications.",
    createdAt: "2025-06-10",
    link: "https://catching-up-to-llm-rifandani.vercel.app/",
  },
  {
    title: "CLI",
    description: "Introduction to Command Line Interface (CLI)",
    createdAt: "2023-02-03",
    link: "https://cli-rifandani.vercel.app/",
  },
];
