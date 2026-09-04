# next-intl owns Message Catalogs

The app translates only through next-intl. Message Catalogs live in `apps/web/messages/{locale}.json`. Locale is read from the `NEXT_LOCALE` cookie in `apps/web/src/core/utils/i18n.ts` (`getRequestConfig`). UI uses `useTranslations` / `getTranslations`; locale changes go through `setUserLocaleAction`.

## Considered Options

- Keep a parallel custom `initI18n` / `defineTranslation` stack under `src/core/libs/i18n` — rejected; duplicate catalogs and unused runtime
- Lift catalogs into a shared package — rejected; single app, no second consumer
