export const colors = {
  // Background colors
  background: {
    base: "var(--color-base)",
    mantle: "var(--color-mantle)",
    crust: "var(--color-crust)",
  },

  // Surface colors
  surface: {
    0: "var(--color-surface0)",
    1: "var(--color-surface1)",
    2: "var(--color-surface2)",
  },

  // Overlay colors
  overlay: {
    0: "var(--color-overlay0)",
    1: "var(--color-overlay1)",
    2: "var(--color-overlay2)",
  },

  // Text colors
  text: {
    default: "var(--color-text)",
    subtext1: "var(--color-subtext1)",
    subtext0: "var(--color-subtext0)",
  },

  // Accent colors (for interactive elements)
  accent: {
    default: "var(--color-mauve)",
    hover: "var(--color-lavender)",
    muted: "var(--color-overlay2)",
  },

  // Semantic colors
  semantic: {
    // Links and URLs
    link: "var(--color-blue)",
    linkHover: "var(--color-sky)",
    linkFollowed: "var(--color-lavender)",

    // Status colors
    success: "var(--color-green)",
    warning: "var(--color-yellow)",
    error: "var(--color-red)",

    // Info
    info: "var(--color-teal)",

    // Selection
    selection: "var(--color-overlay2)",

    // Cursor
    cursor: "var(--color-rosewater)",
  },

  // Syntax colors (for code)
  syntax: {
    keyword: "var(--color-mauve)",
    string: "var(--color-green)",
    number: "var(--color-peach)",
    comment: "var(--color-overlay2)",
    function: "var(--color-blue)",
    class: "var(--color-yellow)",
    operator: "var(--color-sky)",
  },

  // Rainbow palette (for highlights)
  rainbow: {
    1: "var(--color-red)",
    2: "var(--color-peach)",
    3: "var(--color-yellow)",
    4: "var(--color-green)",
    5: "var(--color-sapphire)",
    6: "var(--color-lavender)",
  },
} as const;

export type ColorsConfig = typeof colors;
