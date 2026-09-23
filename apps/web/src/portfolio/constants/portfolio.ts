/**
 * Synthetic portfolio placeholders for the Public Site.
 * Replace with real content — do not treat these as factual claims.
 */

export const portfolioIdentity = {
  fullName: "Tri Rizeki Rifandani",
  /** Topbar wordmark — the site has no logo asset. */
  shortName: "Rizki",
  /** [Synthetic] Replace with the real title. */
  role: "software engineer",
  copyrightYear: 2026,
} as const;

export interface SocialLink {
  /** Closed set — each id also names the mark the home list renders for it. */
  id: "github" | "linkedin" | "email";
  /** Translation key for the visible label. */
  labelKey: "socialGithub" | "socialLinkedin" | "socialEmail";
  href: string;
}

/**
 * [Synthetic] Placeholder destinations — replace every href with a real
 * profile before this site goes public.
 */
export const socialLinks: SocialLink[] = [
  {
    id: "github",
    labelKey: "socialGithub",
    href: "https://github.com/rifandani",
  },
  {
    id: "linkedin",
    labelKey: "socialLinkedin",
    href: "https://linkedin.com/in/rifandani",
  },
  {
    id: "email",
    labelKey: "socialEmail",
    href: "mailto:tri.rifandani@gmail.com",
  },
];

/** [Synthetic] About-page content. Replace with the real biography. */
export const aboutContent = {
  headline:
    "[Synthetic] I'm Rizki. I build web products that stay clear under pressure.",
  paragraphs: [
    "[Synthetic] I work on the front end, where design decisions turn into shipped behaviour. Most of my time goes to component systems, accessibility, and the unglamorous foundations that keep a product honest as it grows.",
    "[Synthetic] I care about interfaces that explain themselves. Clear structure, readable states, and keyboard paths that work are not extras — they are the product.",
    "Prefer to keep learning, continue challenging myself, and do interesting things that matter. I'm always open to collaborating on exciting projects and innovative/disruptive ideas.",
  ],
  skills: [
    "[Synthetic] Design systems and reusable component APIs.",
    "[Synthetic] Accessibility from keyboard paths to forced-colors fallbacks.",
    "[Synthetic] Production foundations — SEO, observability, and performance budgets.",
  ],
  email: "tri.rifandani@gmail.com",
} as const;

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  logoSrc: string;
  logoAlt: string;
  /** One prose line. Work cards show a sentence, not a bullet list. */
  summary: string;
  /**
   * The role held today. Marks this entry's node on the work rail. It is not
   * read off `end`, which is display copy.
   */
  isCurrent?: boolean;
}

export const experienceEntries: ExperienceEntry[] = [
  {
    id: "exp-1",
    company: "[Synthetic] Northwind Labs",
    role: "Senior Frontend Engineer",
    start: "2023",
    end: "Present",
    isCurrent: true,
    logoSrc: "/placeholders/company-a.svg",
    logoAlt: "Synthetic logo for Northwind Labs",
    summary:
      "Led accessible UI kit adoption across three product teams. Shipped design-system primitives with React Aria and Next.js App Router. Cut critical UI regressions with Playwright coverage on core flows.",
  },
  {
    id: "exp-2",
    company: "[Synthetic] Harbor Soft",
    role: "Product Engineer",
    start: "2021",
    end: "2023",
    logoSrc: "/placeholders/company-b.svg",
    logoAlt: "Synthetic logo for Harbor Soft",
    summary:
      "Built customer-facing dashboards with strong keyboard support. Partnered with design on Intent UI patterns and token hygiene.",
  },
  {
    id: "exp-3",
    company: "[Synthetic] Atlas Studio",
    role: "Frontend Developer",
    start: "2019",
    end: "2021",
    logoSrc: "/placeholders/company-c.svg",
    logoAlt: "Synthetic logo for Atlas Studio",
    summary:
      "Delivered marketing and app surfaces on a shared component catalog. Improved Core Web Vitals on high-traffic landing routes.",
  },
  {
    id: "exp-4",
    company: "[Synthetic] Independent",
    role: "Freelance Web Developer",
    start: "2018",
    end: "2019",
    logoSrc: "/placeholders/company-d.svg",
    logoAlt: "Synthetic logo for Independent",
    summary: "Shipped small business sites with SEO baselines and CMS handoff.",
  },
];
