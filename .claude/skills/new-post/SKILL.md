---
name: new-post
description: Create a new blog post as a Markdown file in a series folder under posts/. Use when the user wants to write, add, or start a new post/article/draft.
---

Create `posts/<series>/NN-<slug>.md`.

1. Series: list `posts/*/_series.json`. Ask which series if the user didn't say. If none fits, run the `new-series` skill first. Every post must belong to a series; never create a post outside a series folder.
2. Slug: lowercase English, hyphens. Must be unique across ALL series (the URL is `#post/<slug>`; the build fails on duplicates).
3. Number: `NN` is the next two-digit number in that folder (existing max + 1). It sets the order within the series and is stripped from the URL.
4. Frontmatter, copied from `posts/_template.md.example`. Do not add a `series:` field; the folder is the series. Fill:
   - `title`, `description` (1–2 sentences), `date` (today, YYYY-MM-DD)
   - `category`: reuse an existing one from other posts when possible; the home filter buttons are generated from the set of categories, so a new value adds a button.
   - `tags: [a, b]`: lowercase-consistent with existing tags.
   - `art`: copy the value other posts use unless told otherwise.
   - `draft: true` by default. Drafts show only in `npm run dev` and are excluded from the deployed build. Remove the line (or set false) only when the user says to publish.
5. Body: sections start with `## 소제목`; separate paragraphs with a blank line. Plain text only (no Markdown inline syntax is rendered).
6. Run `npm run build` to confirm it still builds. Do not commit or push unless asked.
