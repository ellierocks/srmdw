export const siteConfig = {
  name: "srmdw",
  title: "speedrun.md",
  description:
    "Statically Rendered Markdown Wiki. Pure Markdown files formatted for Obsidian support.",
  githubUrl: "https://github.com/ellierocks/srmdw",
  githubRepo: "ellierocks/srmdw",
  githubBranch: "main",
  author: "srmdw community",
  featuredGame: "lego-star-wars-the-video-game",

  defaultTheme: "mocha",

  navLinks: [],
};

export type SiteConfig = typeof siteConfig;
export { typography } from "./typography";
export { strings } from "./strings";
export { colors } from "./colors";
