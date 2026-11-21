import type { I18NLocale } from "@/shared/constants/i18n";

/** A text with a value for every Locale. The type makes each one required. */
type TextInEachLocale = Readonly<Record<I18NLocale, string>>;

export interface Talk {
  readonly title: TextInEachLocale;
  readonly description: TextInEachLocale;
  /** First creation date, in YYYY-MM-DD form. Later edits do not change it. */
  readonly createdAt: string;
  /** The slides. They stay in their own language. */
  readonly link: string;
}

/** One Talk with its title and description in one Locale, as a page shows it. */
export type TalkInLocale = Omit<Talk, "title" | "description"> & {
  readonly title: string;
  readonly description: string;
};

export const talks: readonly Talk[] = [
  {
    title: { en: "Agent Readiness", id: "Agent Readiness" },
    description: {
      en: "Making websites and codebases work for AI agents",
      id: "Membuat situs web dan codebase bisa dipakai oleh AI agent",
    },
    createdAt: "2026-11-10",
    link: "https://agent-readiness-rifandani.vercel.app/",
  },
  {
    title: { en: "Observability (o11y)", id: "Observability (o11y)" },
    description: {
      en: "An introduction to logs, metrics, and traces, with OpenTelemetry and the LGTM stack.",
      id: "Pengenalan log, metrik, dan trace, dengan OpenTelemetry dan stack LGTM.",
    },
    createdAt: "2026-06-06",
    link: "https://observability-rifandani.vercel.app/",
  },
  {
    title: { en: "Feature Flags", id: "Feature Flags" },
    description: {
      en: "An introduction to feature flags, safe delivery practices, trunk-based development, and OpenFeature.",
      id: "Pengenalan feature flag, praktik rilis yang aman, trunk-based development, dan OpenFeature.",
    },
    createdAt: "2025-12-27",
    link: "https://feature-flag-rifandani.vercel.app/",
  },
  {
    title: {
      en: "Catching Up to Large Language Model (LLM)",
      id: "Mengejar Ketertinggalan tentang Large Language Model (LLM)",
    },
    description: {
      en: "An overview of how LLMs work, how to evaluate them, and how to build LLM-powered applications.",
      id: "Gambaran tentang cara kerja LLM, cara mengevaluasinya, dan cara membangun aplikasi berbasis LLM.",
    },
    createdAt: "2025-06-10",
    link: "https://catching-up-to-llm-rifandani.vercel.app/",
  },
  {
    title: { en: "CLI", id: "CLI" },
    description: {
      en: "Introduction to Command Line Interface (CLI)",
      id: "Pengenalan Command Line Interface (CLI)",
    },
    createdAt: "2023-02-03",
    link: "https://cli-rifandani.vercel.app/",
  },
];
