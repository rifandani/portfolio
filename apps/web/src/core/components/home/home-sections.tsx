import { SiteContainer } from "@/core/components/site-container";
import { HomeExperience } from "@/portfolio/components/home-experience";
import { HomeIdentity } from "@/portfolio/components/home-identity";
import { HomePosts } from "@/post/components/home-posts";
import { HomeProjects } from "@/project/components/home-projects";

/** Emitted HTML direction contract for audit (new-work §5). */
export const HomeDirectionContract = () => (
  <div
    // eslint-disable-next-line react/no-danger -- impeccable direction contract must survive as an HTML comment
    dangerouslySetInnerHTML={{
      __html: `<!--
THESIS: Conventional personal site — a wordmark topbar, an identity hero at display scale, then card sections for work, projects, and writing.
OWN-WORLD: Paper and Cool Graphite, rare Helm Blue, Quicksand body with Roboto headings and IBM Plex Mono meta, soft-rect 8px, bordered cards, flat-by-default.
STORY: Visitor reads the role sentence, scans the work history, then follows a card into projects or writing.
FIRST VIEWPORT: Wordmark plus About / Projects / Posts and toggles; the role sentence and summary as the thesis; social links; the first work cards.
FORM: Stacked single column, 64rem cap, generous vertical rhythm; the hero splits 7/5 from lg for the Glyph Engine (craft icosahedron melting into an obsession blob, printed in mono).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`,
    }}
  />
);

export const HomePageContent = () => (
  <SiteContainer className="py-16 sm:py-24">
    <HomeIdentity />
    <HomeExperience />
    <HomeProjects />
    <HomePosts />
  </SiteContainer>
);
