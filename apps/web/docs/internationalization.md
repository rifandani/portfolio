# Internationalization

- All user-facing strings are rendered with `useTranslations` from `next-intl`,
  never hardcoded in components.
- Each message referenced by `useTranslations` should match an entry in `messages/en.json`,
  other locales are handled by translators.
- Use descriptive, yet short, key names like `title` and `description` instead of repeating
  the current source string.
- Use ICU arguments instead of string concatenation to give translators the flexibility
  to change the order of words within a sentence.
