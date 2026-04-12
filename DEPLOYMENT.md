# 🚀 Deployment Guide (Vercel Static)

sr-wiki is a purely static site built with Next.js 16 (SSG). Deploying it is
incredibly simple and secure.

## 1. Prepare Your Repository

Ensure all your Markdown content is in the `content/` folder. organized by game.

## 2. GitHub Integration (Recommended)

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and create a new project.
3. Import your GitHub repository.
4. Vercel will automatically detect Next.js and use the following build
   settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`

## 3. Automatic Updates

Every time you push a change to your Markdown files or code on GitHub:

1. Vercel triggers a new build.
2. The `prebuild` script runs `scripts/generate-index.ts` to update the search
   index.
3. The site is redeployed as a set of optimized static HTML files.

## 4. Why Static?

- **Zero Maintenance:** No databases to manage or patch.
- **Incredible Speed:** Content is served from Vercel's Edge Network (CDN).
- **Security:** Since there is no backend, there are no SQL injection or
  server-side vulnerabilities. GitHub handles all file security.
