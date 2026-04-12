---
title: "About sr-wiki"
description: "How this wiki works and its design philosophy."
---

## What is sr-wiki?

sr-wiki is a modern, static wiki generated directly from Markdown files. It uses
Next.js to provide a fast, smooth, and robust reading experience without loading
spinners or slow page transitions.

## The Vault Concept

Instead of a single monolithic wiki where all pages share the same navigation,
content is separated into "Vaults". A Vault represents a specific game or
isolated topic. Each Vault gets its own folder structure, unique sidebar
navigation tree, and metadata. This keeps information cleanly separated and
makes the site extremely fast to navigate.

## The Git-Backed Workflow

This wiki is entirely file-based, meaning all content lives as raw Markdown
within the source code repository.

**How edits are handled:**

- **Exclusively through Git:** Because every page is a Markdown file, there is
  no database to inject malicious content into. All updates are handled via Pull
  Requests (PRs).
- **Security & Quality:** This design naturally wards off spam and unauthorized
  edits. Every change to the wiki is subject to a code review process, ensuring
  that only verified, high-quality information is merged into the site.
- **Portability:** Your data is not locked in a proprietary CMS. You own your
  content as plain text, allowing you to back it up, version it, or migrate it
  easily.

## Under the Hood

This project is built using:

- **Next.js 15+** (App Router)
- **Tailwind CSS V4** (for styling)
- **Framer Motion** (for smooth page transitions)
- **MDX / Remark / Rehype** (for powerful markdown processing, like code
  highlighting and callouts)
