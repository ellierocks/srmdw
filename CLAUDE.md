# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Development**: `npm run dev` (starts dev server + index generation)
- **Build**: `npm run build`
- **Pre-build**: `npm run prebuild` (runs `scripts/generate-index.ts`)
- **Linting**: `npm run lint` (runs `oxlint`)
- **Formatting**: `npm run format` (runs `prettier`)
- **Testing**: No formal test suite exists yet.

## Architecture

- **Framework**: Next.js 16 (App Router), React 19, Tailwind CSS v4.
- **Content Engine**: File-based Markdown wiki using `next-mdx-remote`. 
    - Content is located in the `content/` directory, organized by game folder.
    - Obsidian-compatible: Supports `[[Wikilinks]]` and callouts.
    - Pure SSG (Static Site Generation).
- **Core Logic**:
    - `src/lib/markdown.ts`: Handles file system interaction, metadata extraction (`gray-matter`), and slug/tree generation.
    - `scripts/generate-index.ts`: Pre-generates the search index used by Fuse.js.
- **Routing**:
    - `src/app/(wiki)/[game]/[[...slug]]`: Main catch-all route for wiki pages.
    - `src/app/(wiki)/page.tsx`: Root dashboard showing all games.
- **Components**:
    - `src/components/mdx/MDXComponents.tsx`: Custom MDX components (Callouts, etc.).
    - `src/components/layout/Sidebar.tsx`: Hierarchical navigation built from the folder structure.

## Code Standards

- **Linting**: Uses `oxlint` for performance.
- **Formatting**: Prettier with 2-space indentation.
- **Styling**: Tailwind CSS v4 with Catppuccin Mocha theme.
- **AI Content Policy**: Markdown contributions MUST be human-written (enforced for repository content, not necessarily for code assistance).
