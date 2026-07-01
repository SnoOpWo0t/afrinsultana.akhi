# Bangla Localization Implementation Guide

This document explains how English/Bangla localization works in this project, where translation data lives, and how to safely extend it.

## Goals

- Keep translation logic centralized.
- Support SSR + CSR locale consistency.
- Keep Bangla numerals and selected technical terms readable.
- Avoid hardcoded section copy inside UI components.

## Localization Architecture

Localization is implemented in three layers:

1. Translation source and helpers
2. Locale state + persistence
3. Component rendering

### 1) Translation Source and Helpers

Primary file: `lib/i18n/translations.ts`

It provides:

- `SUPPORTED_LOCALES`: currently `en`, `bn`
- `DEFAULT_LOCALE`: fallback locale
- `resolveLocale(value)`: normalizes locale-like values (`en-US`, `bn-BD`, etc.)
- `getCopy(locale)`: returns typed translation object for UI labels
- `translateDynamicText(locale, text)`: runtime translation for dynamic content from constants
- `LOCALE_COOKIE_NAME`: locale cookie key used by server/client

The static UI copy is stored in:

- `translations.en`
- `translations.bn`

Both follow one typed schema (`TranslationSchema`) so keys remain consistent.

### 2) Locale State and Persistence

Provider file: `components/providers/LanguageProvider.tsx`

Responsibilities:

- Holds active locale in React context.
- Applies locale to document (`<html lang=...>` + `locale-bn` class).
- Persists locale in cookie (`locale`) for server-side reads.
- Exposes `setLocale` and `toggleLocale`.

Important behavior:

- Locale persistence is cookie-based (not localStorage).
- The provider updates both DOM language and CSS class when locale changes.

### 3) Server-Side Locale Initialization

Root layout: `app/layout.tsx`

Flow:

1. Read `locale` cookie with `cookies()`.
2. Resolve via `resolveLocale`.
3. Pass `initialLocale` into `LanguageProvider`.
4. Apply locale-related classes to `<html>` for first render parity.

This prevents hydration mismatch between server and client locale.

## Rendering Localized Content

Use two patterns:

### Pattern A: Section/UI copy via `getCopy(locale)`

Used for known labels, headings, button texts, aria labels.

Example:

```ts
const { locale } = useLanguage();
const copy = getCopy(locale);

<h2>{copy.projects.title}</h2>
```

### Pattern B: Dynamic strings via `translateDynamicText`

Used for content coming from constants (e.g., project descriptions, timelines).

Example:

```ts
translateDynamicText(locale, project.description)
```

## Bangla Dynamic Translation Pipeline

Inside `translateDynamicText` (for `bn` locale):

1. Direct map lookup from `dynamicBnMap` (exact-string translations).
2. Term-level replacement from `BENGALI_TERM_OVERRIDES` (`lib/constants.ts`).
3. Numeric conversion to Bangla digits via `BENGALI_DIGIT_MAP`.

This approach supports:

- Complete sentence replacements for known long strings.
- Consistent terminology replacement for repeated terms.
- Digit localization without rewriting all content manually.

## How to Add or Update Translation

### For static UI labels

1. Add key in `TranslationSchema` in `lib/i18n/translations.ts`.
2. Add value to both `translations.en` and `translations.bn`.
3. Use key in component with `getCopy(locale)`.

### For dynamic content from constants

1. Add/adjust English source text in `lib/constants.ts`.
2. Add Bangla full-string equivalent in `dynamicBnMap` if needed.
3. Add reusable term overrides in `BENGALI_TERM_OVERRIDES` when partial substitution is better.

### For numeric formatting

If numeric style is missing in Bangla output, verify that the value flows through `translateDynamicText` or use locale formatting helpers (`toLocaleString("bn-BD")`) where applicable.

## Locale Toggle Entry Points

- Header locale switch control
- Floating language toggle on mobile

Both use `useLanguage().toggleLocale` and therefore share the same persistence/update path.

## Metadata Localization

`generateMetadata` in `app/layout.tsx` uses localized strings via `getCopy(locale)` for:

- page title
- description
- OG description
- locale-specific metadata (`bn_BD` vs `en_US`)

## Localization Safety Checklist

When editing localization, verify:

1. No missing keys between `en` and `bn` objects.
2. Cookie persistence survives refresh/navigation.
3. `<html lang>` changes correctly.
4. Bangla mode applies `locale-bn` class styles.
5. Dynamic text still translates after content updates.
6. Numbers render as Bangla digits where intended.

## Common Pitfalls

- Adding new UI text directly in components instead of `translations.ts`.
- Updating English constants without updating `dynamicBnMap`.
- Forgetting to pass locale to backend requests when response language matters.
- Using localStorage for locale persistence instead of the existing cookie mechanism.

## Related Files

- `lib/i18n/translations.ts`
- `components/providers/LanguageProvider.tsx`
- `app/layout.tsx`
- `components/shared/Header.tsx`
- `components/shared/FloatingLanguageToggle.tsx`
- `lib/constants.ts`
