# Jayan's Magical Birthday Adventure

A touch-first storybook adventure for Jayan's second birthday on November 17, 2026. Built with HTML, CSS, and native JavaScript modules, with no framework or package installation.

## Run locally

JavaScript modules need to be served over HTTP rather than opened as a `file://` page. From this folder, run:

```powershell
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000). The storybook fonts load from Google Fonts when online; the page has system-font fallbacks when offline.

## Phase 1 foundation

- Candy Wonderland color, type, spacing, radius, and shadow tokens live in `css/style.css`.
- Layout breakpoints and mobile touch sizing live in `css/responsive.css`.
- Lightweight transitions and reduced-motion behavior live in `css/animations.css`.
- `js/app.js` wires the welcome, invitation, story map, controls, and view updates.
- `js/chapters.js` is the shared source for the twelve map destinations.
- `js/navigation.js`, `js/storage.js`, and `js/audio.js` isolate navigation, safe local persistence, and a gentle original Web Audio chime.
- `js/activities.js` and `js/rewards.js` provide small reusable helpers for the upcoming interaction and reward work.

The first destination is available; the other map destinations are visibly locked until their scenes and chapter unlock rules are implemented. Progress is stored under `jayan-adventure:v1` in local storage. Clearing the browser's site data resets the local save.

## Build sequence

1. Phase 1 — Foundation: complete.
2. Phase 2 — Add the twelve illustrated chapter scenes and story transitions.
3. Phase 3 — Connect simple activities, chapter unlocking, and the reward ledger.
4. Phase 4 — Add scene animations, background music, and chapter sound effects.
5. Phase 5 — Add photo placeholders, the family message, and the final celebration.
6. Phase 6 — Verify the complete experience on mobile and desktop and prepare deployment.
