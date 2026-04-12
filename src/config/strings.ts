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
    activeVaultsHeader: "Active Vault",
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
      "a file based wiki for speedgames, pure Markdown files in a git repo.",
  },

  // Feature cards
  features: [
    {
      title: "Local First",
      description:
        "Your content lives in the 'content/' folder as standard .md files.",
    },
    {
      title: "Obsidian Ready",
      description:
        "Compatible with Obsidian Vaults. Support for Wikilinks and Callouts.",
    },
    {
      title: "Static & Fast",
      description:
        "Built with Next.js SSG. Lightning-fast page loads and zero overhead.",
    },
    {
      title: "Community Guidelines",
      description:
        "Learn how to contribute and maintain high-quality documentation.",
    },
  ],
};

export type StringsConfig = typeof strings;
