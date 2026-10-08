---
name: new-series
description: Create a new blog series (a folder under posts/ with _series.json). Use when the user wants a new series, or a post needs a series that doesn't exist yet.
---

A series exists only if `posts/<folder>/_series.json` exists. A folder with posts but no `_series.json` breaks the article page.

1. Folder name: lowercase English, hyphens; it becomes the series id (`#series/<folder>`). Check it doesn't already exist in `posts/`.
2. Create `posts/<folder>/_series.json`:
   ```json
   { "name": "시리즈 이름", "desc": "한 줄 설명", "color": "purple", "symbol": "{ }", "label": "ENGLISH LABEL" }
   ```
   - `color`: one of `purple`, `green`, `orange` (the only ones styled in `src/style.css`/`palettes.css`).
   - `symbol`: a short glyph shown on the card. `label`: short uppercase English caption.
   Ask the user for name and description if not given.
3. A series with no posts renders an empty card, so offer to create the first post with the `new-post` skill.
4. Series display order on the home page is alphabetical by folder name.
5. Run `npm run build` to confirm. Do not commit or push unless asked.
