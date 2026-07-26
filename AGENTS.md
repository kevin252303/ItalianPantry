# Italian Pantry — Agent Guide

## Project Overview

A static marketing site for "The Italian Pantry," an authentic Italian foods brand. Single-page frontend with vanilla HTML, CSS, and JavaScript. No build system, framework, or package manager. Admin page is a minimal placeholder (`admin.html`).

## Repo Structure

```
├── index.html          # Main landing page (home, about, food, partners, reviews)
├── admin.html          # Full CRUD admin dashboard (login, tabs, modals)
├── styles.css          # All site styles (no CSS preprocessor)
├── script.js           # Frontend JS (hero, reviews, animations, cloud sync)
├── admin.js            # Admin CRUD logic (image compression, localStorage, cloud sync)
├── storage.js          # Cloud storage abstraction (JSONBin.io + localStorage fallback)
├── reviews-data.js     # Static review data (var reviewsData array)
├── admin.css           # Admin panel dark theme
├── images/             # Static image assets
└── .vscode/            # Local VS Code config (empty)
```

## Build / Lint / Test

This project has **no build system, no package.json, no tests, and no linter**.

| Command | What it does |
|---|---|
| `npx serve .` | Start a local HTTP server to preview the site |
| `python -m http.server` | Alternative: start a local server |
| (none) | No linting, formatting, or test commands exist |

### If adding tooling, prefer:

- **Formatter**: Prettier (install locally or use the VS Code extension)
- **Linter**: ESLint with `eslint:recommended` and a basic `.eslintrc.json`
- **Testing**: Not applicable (static site); if JS logic grows, use Vitest

## Coding Conventions

### HTML

- Indent with 4 spaces
- Use semantic HTML5 elements: `<header>`, `<section>`, `<footer>`, `<nav>`
- `id` for anchor targets (e.g. `#home`, `#about`, `#products`)
- `class` for styling hooks
- External resources: Google Fonts, Font Awesome CDN
- Quotes: double quotes for attributes

### CSS

- Indent with 4 spaces
- One blank line between major section comments
- Naming: lowercase-kebab-case for class names (`.product-card`, `.cta-button`, `.hero-content`)
- Section header pattern: `/* Section Name */` comment block
- Selector order within a section: parent, children, pseudo-classes, media queries
- `rgba()` for color with transparency, hex for solid colors
- Media queries: `max-width: 768px` then `max-width: 480px`
- Animations: `@keyframes` defined at bottom, applied via `animation` property
- Transitions: `all 0.3s ease` for hover effects, specific properties for fine control
- Flexbox for 1D layouts, CSS Grid for 2D
- No CSS variables in use (consider adding `:root` custom properties for theme colors)

### JavaScript

- Indent with 4 spaces
- Single `DOMContentLoaded` listener wrapping most logic
- `const` for DOM references and immutable values; `let` for mutable counters/scroll
- **Avoid `var`** — use `const` / `let` exclusively
- Semicolons: always
- Quotes: single quotes preferred (`'string'`), double only for HTML attributes in strings
- Arrow functions for callbacks (`links.forEach(link => { ... })`)
- Function declarations inside event listeners: `function(e) { ... }` or arrow functions
- DOM queries: `querySelector` / `querySelectorAll` always (no `getElementById` except for `id="dvHeader"`)
- Inline style mutations vs. class toggling: prefers classList for most cases, but uses inline style for animations/opacity
- Comments: single-line `//` for sections
- No modules, imports, or `type="module"` — all code is global scope
- No error handling (`try/catch`) — assumed safe DOM environment
- No async/await — only `setTimeout` for simulated delay
- No external JS dependencies

### Naming Conventions

- **Files**: `lowercase-with-hyphens.ext` (e.g., `script.js`, `styles.css`)
- **CSS classes**: `kebab-case` (`.product-card`, `.nav-menu`, `.cta-button`)
- **CSS IDs**: `kebab-case` or `camelCase` (`#dvHeader`, `#logoLink`)
- **JS variables**: `camelCase` (`navMenu`, `ctaButton`, `observerOptions`)
- **JS constants**: UPPER_SNAKE_CASE not used; use `const` with camelCase

### Image Handling

- `<img>` elements have opacity transition via JS for smooth loading
- Lazy implied (no `loading="lazy"` attribute yet)
- External URLs (Unsplash) mixed with local `images/` assets
- Alt text provided

### Known Issues / Tech Debt

- `styles.css:5` — `.logo-bar` has duplicate `class` attribute in HTML (both `class="logo-bar"` and `class="logo-image"`)
- `script.js:205-241` — Code after line 204 is **not inside any DOMContentLoaded handler** and references `header` and `logo` that may not exist on all pages (will throw in `admin.html`)
- `script.js:189-203` — Injected `<style>` element for hamburger animation — should be in `styles.css`
- Parallax effect commented out (`script.js:167-174`)
- `script.js:234-241` — `scrollRestoration` / `onbeforeunload` code runs unconditionally and may conflict with the header hide/show logic
- No accessibility considerations (no `aria-*` attributes, no skip links)
- `DEFAULT_PANTRY_DATA` is duplicated in both `admin.js` and `script.js` — DRY violation
- Admin passcode bug: login handler checks hardcoded `'Pantry@2510'` instead of calling `getActivePasscode()`
- Change passcode handler is outside `DOMContentLoaded` wrapper (scope issue)

### When Adding Features

- Maintain single-file structure unless JS grows beyond ~400 lines (then split into modules)
- Keep CSS in `styles.css`, JS in `script.js`, HTML in `index.html`
- Add `loading="lazy"` to new `<img>` elements below the fold
- Add `alt` text to every image
- Use `classList.toggle` / `add` / `remove` instead of inline style where possible
- Wrap new code in the existing `DOMContentLoaded` callback
- If adding error handling, use `try/catch` with user-facing fallback
- Data persistence: use `PANTRY_STORAGE` (storage.js) — reads from cloud first, falls back to localStorage
- Image uploads: admin.js `compressImage()` reduces base64 size ~70% before storing

## Recommended VS Code Extensions

- Prettier — code formatter
- ESLint — JS linting
- Live Server — local dev server with auto-reload
