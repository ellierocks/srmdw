export const typography = {
  // Main title (e.g., wiki landing pages)
  title: {
    className:
      "text-6xl font-black text-text tracking-tighter mb-4 leading-tight text-balance",
  },

  // Page description/subtext
  description: {
    className:
      "text-xl text-subtext1 leading-relaxed max-w-2xl font-bold opacity-80",
  },

  // Article (MDX content)
  article: {
    // Base Tailwind Typography class (e.g., prose, prose-lg, prose-xl)
    baseClass: "prose-lg",

    // Custom overrides to prose
    className: `
      prose prose-invert prose-mauve max-w-none 
      prose-headings:text-text prose-headings:font-black prose-headings:tracking-tight 
      prose-p:text-subtext1 prose-p:leading-relaxed
      prose-strong:text-mauve prose-a:text-mauve prose-a:no-underline 
      prose-a:hover:underline prose-a:hover:underline-offset-4 prose-a:hover:decoration-2
      prose-blockquote:border-mauve prose-blockquote:bg-surface0/30 prose-blockquote:py-1 prose-blockquote:border-l-4 prose-blockquote:font-bold
    `,
  },

  // Metadata labels (Developer, Released, etc.)
  metadata: {
    label:
      "text-[10px] font-black text-overlay1 tracking-widest uppercase opacity-60",
    value: "text-xs font-bold text-text",
  },

  // Sidebar labels
  sidebar: {
    entry: "text-[13px] font-bold tracking-tight",
    header: "text-[10px] font-black text-overlay1 tracking-widest opacity-60",
    activeVault: {
      label:
        "text-[9px] font-black text-overlay1 tracking-widest leading-none mb-1 opacity-60",
      title: "text-[11px] font-bold text-text truncate tracking-tighter",
    },
  },

  // Breadcrumbs
  breadcrumbs: {
    className:
      "flex items-center gap-1.5 text-[10px] font-black text-overlay1 tracking-widest mb-10 opacity-60 group",
  },

  // Frontpage title
  frontpage: {
    title: "text-8xl font-black tracking-tighter text-text leading-none",
    subtext:
      "text-2xl text-subtext1 max-w-3xl mx-auto leading-relaxed text-balance opacity-80 font-bold",
  },

  // Search
  search: {
    input:
      "w-full py-6 bg-transparent text-text placeholder:text-subtext0 outline-none font-bold tracking-tight text-lg",
    empty: "py-12 text-center text-subtext1 font-bold tracking-tight text-sm",
    itemTitle: "font-bold text-sm tracking-tight text-text",
    itemSubtitle:
      "text-[10px] font-black opacity-40 tracking-widest uppercase flex items-center gap-1.5 mt-0.5",
  },
};

export type TypographyConfig = typeof typography;
