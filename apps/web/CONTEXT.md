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
