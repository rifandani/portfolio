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

/**
 * About-page content, as Translation Keys in render order. The copy lives in
 * `messages/*.json`. It extends the home thesis — "Software Engineer by Craft.
 * AI Engineer by Obsession." — so keep the two in the same voice.
 */
export const aboutContent = {
  paragraphKeys: [
    "aboutParagraph1",
    "aboutParagraph2",
    "aboutParagraph3",
    "aboutParagraph4",
  ],
  skillKeys: ["aboutSkill1", "aboutSkill2", "aboutSkill3", "aboutSkill4"],
  email: "tri.rifandani@gmail.com",
  /** [Synthetic] Replace with a real photo. The frame is 4:5, so crop to it. */
  portraitSrc: "/placeholders/portrait.svg",
  /** [Synthetic] Replace with the real CV. It opens in a new tab. */
  cvHref: "/placeholders/cv.pdf",
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
