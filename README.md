# 🚀 Speedrun Wiki

A beautiful, high-performance, file-based speedrunning wiki frontend. Built with **Next.js 16 (App Router)** and **Tailwind CSS v4**.

## ✨ Features

- **Markdown-First:** Zero vendor lock-in. Content is stored as pure Markdown.
- **Obsidian-Compatible:** Support for `[[Wikilinks]]` and `> [!info]` Callouts.
- **Multi-Game Support:** Organize content by game folder in `content/`.
- **SSG:** Blazing fast static site generation.

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Format Content:**
   ```bash
   npm run format
   ```

## 🚀 Deployment to Production (Vercel)

1. **Push your code to GitHub.**
2. **Import your repository into [Vercel](https://vercel.com/new).**
3. **Configure the Project:**
   - Framework: **Next.js**
   - Output Directory: `.next`
   - Build Command: `next build`
   - Install Command: `npm install`
4. **Deploy:** Vercel will automatically trigger builds on every push to the `main` branch.

## ⚖️ Content Policy

Speedrunning is about human precision. Our wiki content must reflect that. We only accept:

- Original research.
- Manually written guides.
- Community-verified documentation.

**AI-generated content is strictly prohibited.**

## 📄 License
Licensed under the [MIT License](LICENSE).
