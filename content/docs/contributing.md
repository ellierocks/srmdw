---
title: "Contributing"
description: "Guidelines for contributing to sr-wiki."
---

## How to Contribute

We welcome contributions from the community! Because sr-wiki is statically
generated entirely from Markdown files, contributing is as simple as editing
text files. You don't need to know React or Next.js to add content.

### Adding a New Game Vault

1. Create a new folder inside the `content/` directory. The folder name should
   be in kebab-case (e.g., `the-legend-of-zelda`).
2. Add an `index.md` file inside that folder. This file needs frontmatter
   metadata to be recognized on the home page:
   ```markdown
   ---
   title: "The Legend of Zelda"
   description: "A comprehensive speedrunning guide."
   cover: "/images/zelda-cover.jpg"
   ---
   ```
3. Add your markdown content pages inside this folder structure. The folders and
   files you create will automatically generate the navigation sidebar!

### Editing Existing Pages

Just find the corresponding `.md` file in the `content/` directory, make your
edits, and submit a Pull Request on GitHub.

Please refer to our [Markdown Guide](/docs/markdown) to see all the powerful
formatting features we support, like tables, alerts, and code blocks.
