# Web

Web app.

## Language

### i18n

**Locale**: A next-intl locale tag from `I18N_LOCALES` (`en`, `id`). Selected via the `NEXT_LOCALE` cookie. _Avoid_: language, languageCode, lng, resolvedLanguage, `en-us`/`id-id` BCP-47 forms for this app's cookie value

**Message Catalog**: The set of Translation Keys and strings for one Locale, owned as `apps/web/messages/{locale}.json` and loaded by next-intl. _Avoid_: resources, dictionary, i18n file, `libs/i18n`

**Translation Key**: A flat identifier into a Message Catalog (e.g. `welcome`, `editProfile`). _Avoid_: nested namespaces like `auth.welcome`, i18next paths

### Component Catalog

**Component Catalog**: The single page at `/master-design` that displays every core UI component for visual inspection by developers and designers. Access is gated by the `componentCatalog` Feature Flag. _Avoid_: master design, styleguide, storybook, docs site

**Component Entry**: One component's place in the Component Catalog — its Category membership, its nav item, and its section of the page. _Avoid_: item, doc, page

**Variant Showcase**: One rendered example within a Component Entry, demonstrating a single combination of a component's props. _Avoid_: demo, example, story

**Category**: A named grouping of Component Entries (Buttons, Overlays, Charts, …) that determines both nav grouping and page order. _Avoid_: group, section, tag

### Feature Flags

**Feature Flag**: A named boolean that gates a product surface for local development. Defaults ON in development and OFF otherwise; a developer may override the default via the Feature Flags Devtools panel, and that override persists across reloads until reset. Production builds never honor an ON override for gated surfaces. _Avoid_: kill switch, remote config, experiment, A/B test

### Errors

**Error Envelope**: The `{ message }` body the API returns on a failed request. Present on most failures, absent on some — a caller may never assume it parsed. _Avoid_: error response, error body, error payload

### Session

**Session**: What one successful login produces — the signed-in person together with the credentials that prove it. The app persists exactly one, or none. This app has no login yet; `Http` carries the seam (`HttpAuthConfig`) for the one it will get, but no composition root wires it. _Avoid_: user, appUser, auth state, current user

**Access Token**: The credential sent with a request to prove the Session. Read per request by `HttpAuthConfig.getToken`, never read by a caller. _Avoid_: token, bearer, jwt, auth header

**End Session**: The single flow that discards a Session, whether the person signed out or the server rejected the Access Token (`HttpAuthConfig.onUnauthorized`). Distinct from the store setter it calls. _Avoid_: logout, sign out, log off

### Public Site

**Public Site**: The set of routes a visitor reads without signing in — Home, About, Projects, Posts. Distinct from the Component Catalog, which serves developers. _Avoid_: marketing site, landing page, front end

**Site Shell**: The header and footer every Public Site route renders through. A route supplies its content and nothing else. _Avoid_: layout, wrapper, template, chrome

**Wordmark**: The person's short name in the topbar, linking Home. It is text, not a logo asset. _Avoid_: logo, brand mark, monogram

**Identity Hero**: The first block of Home — the Role Sentence, the summary, and the Social Links. One per surface, at the top. _Avoid_: hero banner, masthead, jumbotron, above the fold

**Role Sentence**: The single sentence at display scale that states what the person does. Distinct from the role title, which is a short noun phrase. _Avoid_: tagline, headline, slogan, bio

**Content Card**: The one card silhouette the Public Site uses for every entry. Comes in three fillings — Work Card, Project Card, Post Card. _Avoid_: tile, panel, item, row

**Work Card**: A Content Card for one role in the work history. Static — a role has no destination. _Avoid_: experience item, job card, channel row

**Project Card**: A Content Card for one Project. The whole card is one link, to its Project Detail. _Avoid_: portfolio item, showcase tile

**Post Card**: A Content Card for one piece of writing. Carries the wide OG image the other two do not. _Avoid_: article card, blog row, entry

**Preview Section**: A Home section that shows at most three entries and links to its own index. _Avoid_: featured section, highlights, teaser, channel

### Posts

**Post**: One piece of writing on the Public Site. It has one language, and all Locales show the same text. _Avoid_: article, blog, blog post, entry

**Post Source**: The written file of one Post — its metadata and its Markdown text. It is the canonical form of the Post. _Avoid_: md file, content file, raw post

**Post Document**: The parsed tree of one Post's text. All views of the Post come from it, not from the Post Source text. _Avoid_: body, content, AST, markdown

**Post Markdown**: The Markdown text a reader copies from a Post Detail: the title as a heading, the summary, and the Post Source text without its metadata. It is an export, not a view, so it comes from the Post Source text and not from the Post Document. It also has its own address, so a reader or an Assistant can open it as plain text. _Avoid_: raw markdown, page markdown, md, source text

**Page Actions**: The "Copy page" button and the menu next to it at the top of a Post Detail. Each action gives the Post Markdown to the reader or to an Assistant. _Avoid_: share menu, toolbar, options, split button

**Share Actions**: The "Share" button and the menu next to it at the top of a Post Detail, beside the Page Actions. "Share" copies the address of the Post Detail; each menu item opens a Share Intent. They give the address, not the Post Markdown. _Avoid_: share menu, social buttons, share bar

**Social Network**: An outside social product that a reader can share a Post Detail to (X, LinkedIn, Threads). _Avoid_: platform, social media, channel

**Share Intent**: Opening the compose page of a Social Network with the address of one Post Detail, and its title where the Social Network takes text. The reader posts it; the site never does. _Avoid_: share link, tweet button, deep link

**Post Outline**: The list of a Post's sections on its Post Detail: the title, then each `h2` and `h3` heading of the Post Document. It marks the section the reader is in, and each entry goes to its section. _Avoid_: TOC, table of contents, on this page, sidebar, scroll-spy

**Assistant**: An outside AI chat product that a reader can send a Post to (Claude, ChatGPT, T3 Chat, Cursor). _Avoid_: AI, LLM, chatbot, provider, model

**Assistant Handoff**: Opening an Assistant with a prompt that points it at the address of one Post's Post Markdown, so the reader can ask questions about that Post. The prompt carries the address, not the text. _Avoid_: share to AI, ask AI, LLM link, deep link

**Slug**: The URL-friendly name of one Post or one Project. It is made from the title one time and then it does not change. _Avoid_: permalink, handle, post id, path

**Post Detail**: The Public Site page that shows one full Post at its Slug. _Avoid_: article page, post page, blog detail

**Post Pager**: The two links at the end of a Post Detail to the Posts beside it in publish order. The previous Post is the one published just before; the next Post is the one published just after. The oldest Post has no previous Post, and the most recent has no next Post. _Avoid_: pagination, prev/next, siblings, related posts

**Code Block**: A fenced block of code in a Post, in one named language or in none. Its colors come from the page theme, so it has one form in all themes. _Avoid_: snippet, code sample, fence, pre

**Code Annotation**: A mark in a Code Block that points the reader at a part of the code: some lines (highlighted, inserted, deleted, focused, error, warning), or each match of one exact term. _Avoid_: decoration, highlight, callout

### Projects

**Project**: One piece of work on the Public Site. Like a Post, it has one language, and all Locales show the same text. _Avoid_: portfolio item, work, repo, case study

**Project Source**: The written file of one Project — its metadata and its Markdown text, in `src/project/content`. It follows the Post Source rules (ADR-0004, ADR-0005). _Avoid_: md file, content file, project entry

**Tags**: The technologies of one Project, in the order its Project Source gives them. On a Project Detail they take the place of the publish date and the reading time of a Post. _Avoid_: stack, labels, badges, keywords

**Project Order**: The `order` number of a Project in its Project Source. A lower number comes first in every Project list and in the Project Pager. Two Projects cannot have the same number. _Avoid_: rank, priority, weight, date

**Project Detail**: The Public Site page that shows one full Project at its Slug (`/projects/{slug}`). It has the parts of a Post Detail: Page Actions, Share Actions, an outline, and a pager. It also has the Project Links. _Avoid_: project page, case study page

**Project Links**: The links of a Project Detail to the Project itself: its live demo (`demoUrl`) and its GitHub repository (`githubUrl`). Each is optional in the Project Source, and each opens in a new tab. They show as buttons under the description. _Avoid_: CTA, external links, repo link, live link

**Project Markdown**: The Markdown text a reader copies from a Project Detail: the title as a heading, the description, and the Project Source text without its metadata. Its address is the Project Detail address plus `.md`. _Avoid_: raw markdown, page markdown

**Project Pager**: The two links at the end of a Project Detail to the Projects beside it in Project Order. The first Project has no previous Project, and the last has no next Project. _Avoid_: pagination, prev/next, related projects
