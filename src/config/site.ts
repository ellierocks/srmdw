export const siteConfig = {
  name: "sr-wiki",
  title: "sr-wiki",
  description:
    "Speedrun-Wiki & Statically Rendered Wiki. Pure Markdown files formatted for Obsidian support.",
  githubUrl: "https://github.com/ellierocks/sr-wiki",
  author: "sr-wiki community",

  defaultTheme: "mocha",

  navLinks: [],
};

export type SiteConfig = typeof siteConfig;
export { typography } from "./typography";
export { strings } from "./strings";
export { colors } from "./colors";
