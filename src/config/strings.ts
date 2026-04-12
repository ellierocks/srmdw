export const strings = {
  // Common UI elements
  common: {
    backToHome: "Home",
    getStarted: "Get Started",
    searchPlaceholder: "Search speedrun wiki...",
    quickSearch: "Quick search...",
    noResults: (search: string) => `No results for "${search}"`,
    vaultsHeader: "vaults",
    wikiExplorerHeader: "Wiki Explorer",
    navigationHeader: "Navigation",
    activeVaultsHeader: "Active Vaults",
    vaultStatusLabel: "Vault Status",
    verifiedDocLabel: "Verified Documentation",
    lastUpdatedLabel: "Last Updated",
    noCover: "No Cover",
    noCoverFound: "No Cover Found",
    enterVault: "Enter Vault",
  },

  // Metadata Labels
  metadata: {
    activeVaultLabel: "Active Vault",
    developer: "Developer",
    publisher: "Publisher",
    released: "Released",
    platforms: "Platforms",
    unknown: "Unknown",
  },

  // Home page strings
  home: {
    tagline:
      "a version controlled wiki for game documentation, pure Markdown files in a git repo.",
  },

  // Feature cards
  features: [
    {
      title: "Local First",
      description:
        "Your content lives in the 'content/' folder, no database required",
    },
    {
      title: "Markdown Native",
      description:
        "Pure .md files with wiki links, callouts, and syntax highlighting.",
    },
    {
      title: "Static & Fast",
      description:
        "Built with Next.js SSG. Lightning-fast page loads and zero overhead.",
    },
    {
      title: "Contribute",
      description:
        "Learn how to use git, edit Markdown, and maintain high-quality documentation.",
    },
  ],
};

export type StringsConfig = typeof strings;
