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
  skillKeys: ["aboutSkill1", "aboutSkill2", "aboutSkill3", "aboutSkill4"],
  email: "tri.rifandani@gmail.com",
  /** [Synthetic] Replace with a real photo. The frame is 4:5, so crop to it. */
  portraitSrc: "/placeholders/portrait.svg",
  /** [Synthetic] Replace with the real CV. It opens in a new tab. */
  cvHref: "/placeholders/cv.pdf",
} as const;

/** One project inside a role. A role can hold many. */
export interface ExperienceProject {
  id: string;
  name: string;
  /** What the project delivered, one outcome per item, in CV order. */
  highlights: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  logoSrc: string;
  /**
   * Empty: the company name prints right beside the logo, so alt text would
   * only make a screen reader say it twice.
   */
  logoAlt: string;
  /** The projects done in this role, newest first. */
  projects: ExperienceProject[];
  /**
   * The role held today. Marks this entry's node on the work rail. It is not
   * read off `end`, which is display copy.
   */
  isCurrent?: boolean;
}

/** Real work history, from the CV. Current role first. */
export const experienceEntries: ExperienceEntry[] = [
  {
    id: "exp-nri",
    company: "NRI Indonesia",
    role: "Software Engineer",
    start: "Nov 2021",
    end: "Present",
    isCurrent: true,
    logoSrc: "/placeholders/company-nri.svg",
    logoAlt: "",
    projects: [
      {
        id: "frontend-development-standard",
        name: "Frontend Development Standard for React",
        highlights: [
          "Maintain the customer's frontend development standard to standardize development across their React projects, delivered as a private UI and design system library, a version-controlled handbook aligned with the official React guidelines, a template app, and a sample app.",
          "Enabled teams to ship consistent UI faster by maintaining a private UI and design system library on Material UI and Emotion, documented in Storybook and protected by Chromatic visual tests.",
          "Accelerated new project kickoff by providing a React template app with routing, state management, forms, i18n, authentication, and testing ready to use from the first commit.",
          "Shortened the learning curve for new developers by building a React sample app that demonstrates the handbook's practices and the library's capabilities in working code.",
        ],
      },
      {
        id: "ai-assisted-development",
        name: "AI-Assisted Development with Claude Code",
        highlights: [
          "Develop a custom Claude Code plugin for the customer's development team to rebuild a vibe-coded proof of concept into a production-ready system after the original vendor left the project.",
          "Standardized how the team builds with Claude Code by packaging skills, subagents, commands, rules, coding standards, and ADRs into one reusable plugin.",
          "Improved code quality and agent reliability by enforcing guardrails with hooks and measuring agent output with evals.",
          "Established a test strategy for unit, integration, and E2E tests, with a clear split between what Claude Code handles and what humans review.",
          "Enabled a team with no prior AI coding agent experience to deliver with Claude Code from day one by defining a structured documentation tree and an operational policy for human and agent collaboration.",
        ],
      },
      {
        id: "logistics-aftersales",
        name: "Logistics Aftersales Solutions",
        highlights: [
          "Develop a logistics aftersales management service for admin, customers, and dealers to make better use of aftersales data to optimize maintenance schedules, predict potential issues, proactively address customer concerns, and cost savings.",
          "Facilitated easier data collection by creating intuitive forms and table for vehicle, customer, dealer, spare part, promotional campaigns, and service booking.",
          "Simplified the vehicle calculation process and presented meaningful information for customer by establishing service credit simulation.",
          "Improving content authoring flexibility and user engagement by implementing a rich text editor for user education content.",
        ],
      },
      {
        id: "logistics-operational",
        name: "Logistics Operational Solutions",
        highlights: [
          "Develop a logistics operational management service for admin and drivers to make planning and organizing the shipping process easier and reliable.",
          "Improving visibility, trackability and schedules more efficiently by implementing real-time tracking of the delivery process.",
          "Improving driver engagement and operational efficiency by establishing driver contest features.",
          "Enabling faster job order processing and reducing training time for customers by enhancing user interface and experience in job order scheduler and dispatcher.",
          "Facilitated easier data aggregation allowing for more accurate insights by implementing data reports for various important metrics.",
        ],
      },
    ],
  },
  {
    id: "exp-freelance",
    company: "Freelance",
    role: "Frontend Engineer",
    start: "Jul 2023",
    end: "Nov 2023",
    logoSrc: "/placeholders/company-freelance.svg",
    logoAlt: "",
    projects: [
      {
        id: "national-bank-cms",
        name: "Content Management System (CMS) for National Bank",
        highlights: [
          "Develop a Content Management System (CMS) portal for admin to empower them with the tools to easily managing content such as marketing materials, transactions, merchants, report and audit.",
          "Develop a personalized customer management portal to gain insights and access detailed event, point and reward system, announcement, report, and customer support to empower them to achieve their financial objectives.",
        ],
      },
    ],
  },
];
