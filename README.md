# sr-wiki (statically rendered wiki)

A Markdown focused wiki frontend designed for any kind of documentation. Built
with **Next.js 16 (App Router)** and **Tailwind CSS v4**.

## Features

- **Markdown-First:** All articles are stored as pure Markdown files that are
  version controlled and automatically backed up via git.
- **Obsidian-Compatible:** Support for `[[Wikilinks]]` and `> [!info]` Callouts.
- **Multi-Game Support:** Organize content by game folder in `content/`.
- **SSG:** Blazing fast static site generation.
- **SPA**: No database, clone the repo and host it locally in seconds, get it
  hosted remotely in minutes.

## Getting Started

### Prerequisites

- Bun 1.0+

### Development

1. **Install Dependencies:**

   ```bash
   bun install
   ```

2. **Run Development Server:**

   ```bash
   bun run dev
   ```

3. **Format Content:**
   ```bash
   bun run format
   ```

## Deployment to Production (Vercel)

1. **Push your code to GitHub.**
2. **Import your repository into [Vercel](https://vercel.com/new).**
3. **Configure the Project:**
   - Framework: **Next.js**
   - Output Directory: `.next`
   - Build Command: `next build`
   - Install Command: `bun install`
4. **Deploy:** Vercel will automatically trigger builds on every push to the
   `main` branch.

## Content Policy

Speedrunning is the art of researching a game endlessly. Our wiki content must
reflect that. We only accept:

- Original research and new discoveries.
- Manually written guides and high quality videos/tutorials.
- Community-verified documentation.

**AI-generated writing pull requested to /content in the form of markdown files
is strictly prohibited, AI does not understand speedrunning the way humans do
and is incapable of creating documentation for it.**

## License

Licensed under the [MIT License](LICENSE).
