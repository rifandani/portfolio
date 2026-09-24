import type { Messages } from "next-intl";

/**
 * Portfolio content for the Public Site. Values marked [Synthetic] are
 * placeholders — replace them with real content and do not treat them as
 * factual claims.
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
  skillKeys: [
    "aboutSkill5",
    "aboutSkill1",
    "aboutSkill2",
    "aboutSkill3",
    "aboutSkill4",
  ],
  email: "tri.rifandani@gmail.com",
  /**
   * [Synthetic] Replace with a real photo. The ID badge frames it close to
   * 5:6 and anchors it at the top, so crop to 4:5 with the face high.
   */
  portraitSrc: "/placeholders/portrait.svg",
  /** Year and month of birth, as `YYYY-MM`. It prints in the reader's Locale. */
  birthMonth: "1998-05",
  /** ISO 3166-1 alpha-3, printed in the ID badge's machine-readable zone. */
  countryCode: "IDN",
  /** [Synthetic] Replace with the real CV. It opens in a new tab. */
  cvHref: "/placeholders/cv.pdf",
} as const;

/** A Translation Key for work experience copy in `messages/*.json`. */
type ExperienceKey = Extract<keyof Messages, `experience${string}`>;

/** One project inside a role. A role can hold many. */
export interface ExperienceProject {
  id: string;
  nameKey: ExperienceKey;
  /** What the project delivered, one outcome per item, in CV order. */
  highlightKeys: ExperienceKey[];
}

export interface ExperienceEntry {
  id: string;
  /** A proper name. It is not translated. */
  company: string;
  /** A job title. It is not translated. */
  role: string;
  /** Year and month, as `YYYY-MM`. It prints in the reader's Locale. */
  start: string;
  /** Year and month, as `YYYY-MM`. Omit it while the role is held. */
  end?: string;
  logoSrc: string;
  /**
   * Empty: the company name prints right beside the logo, so alt text would
   * only make a screen reader say it twice.
   */
  logoAlt: string;
  /** The projects done in this role, newest first. */
  projects: ExperienceProject[];
  /** The role held today. Marks this entry's node on the work rail. */
  isCurrent?: boolean;
}

/**
 * Real work history, from the CV. Current role first. The project copy lives
 * in `messages/*.json`.
 */
export const experienceEntries: ExperienceEntry[] = [
  {
    id: "exp-nri",
    company: "NRI Indonesia",
    role: "Software Engineer",
    start: "2021-10",
    isCurrent: true,
    logoSrc: "/logos/nri.svg",
    logoAlt: "",
    projects: [
      {
        id: "executive-business-intelligence",
        nameKey: "experienceBiName",
        highlightKeys: [
          "experienceBiHighlight1",
          "experienceBiHighlight2",
          "experienceBiHighlight3",
          "experienceBiHighlight4",
          "experienceBiHighlight5",
        ],
      },
      {
        id: "ai-engineering-operations",
        nameKey: "experienceAiOpsName",
        highlightKeys: [
          "experienceAiOpsHighlight1",
          "experienceAiOpsHighlight2",
          "experienceAiOpsHighlight3",
          "experienceAiOpsHighlight4",
          "experienceAiOpsHighlight5",
        ],
      },
      {
        id: "ai-assisted-development",
        nameKey: "experienceClaudeCodeName",
        highlightKeys: [
          "experienceClaudeCodeHighlight1",
          "experienceClaudeCodeHighlight2",
          "experienceClaudeCodeHighlight3",
          "experienceClaudeCodeHighlight4",
          "experienceClaudeCodeHighlight5",
        ],
      },
      {
        id: "frontend-development-standard",
        nameKey: "experienceFrontendStandardName",
        highlightKeys: [
          "experienceFrontendStandardHighlight1",
          "experienceFrontendStandardHighlight2",
          "experienceFrontendStandardHighlight3",
          "experienceFrontendStandardHighlight4",
        ],
      },
      {
        id: "logistics-aftersales",
        nameKey: "experienceLogisticsAftersalesName",
        highlightKeys: [
          "experienceLogisticsAftersalesHighlight1",
          "experienceLogisticsAftersalesHighlight2",
          "experienceLogisticsAftersalesHighlight3",
          "experienceLogisticsAftersalesHighlight4",
        ],
      },
      {
        id: "logistics-operational",
        nameKey: "experienceLogisticsOperationalName",
        highlightKeys: [
          "experienceLogisticsOperationalHighlight1",
          "experienceLogisticsOperationalHighlight2",
          "experienceLogisticsOperationalHighlight3",
          "experienceLogisticsOperationalHighlight4",
          "experienceLogisticsOperationalHighlight5",
        ],
      },
    ],
  },
  {
    id: "exp-freelance",
    company: "Freelance",
    role: "Frontend Engineer",
    start: "2023-07",
    end: "2023-11",
    logoSrc: "/logos/bsi.png",
    logoAlt: "",
    projects: [
      {
        id: "national-bank-cms",
        nameKey: "experienceBankCmsName",
        highlightKeys: [
          "experienceBankCmsHighlight1",
          "experienceBankCmsHighlight2",
        ],
      },
    ],
  },
];
