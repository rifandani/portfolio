/**
 * Shared identity and profiles for the Public Site. Values marked [Synthetic] are
 * placeholders — replace them with real content and do not treat them as
 * factual claims.
 */

export const portfolioIdentity = {
  fullName: "Tri Rizeki Rifandani",
  /** Accessible name of the topbar logo link, and the ID badge lanyard text. */
  shortName: "Rizki",
  /** What the whole site is, for the site metadata and the WebSite node. */
  siteDescription:
    "Personal portfolio for Tri Rizeki Rifandani — work experience, projects, and writing.",
  /** The X account, without the `@`. X is not a Social Link on the page. */
  xHandle: "tri_rizeki",
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
